import { component$, useContext, useSignal, useTask$ } from '@builder.io/qwik';
import { ToastManagerContext } from 'qwik-toasts';
import type { CheckResult } from '~/models/result';
import { useQuery } from '~/routes/layout';
import { urlUpdateQueries } from '~/utils/functions';
import { AdminConnectivity } from './connectivity/admin-ports-connectivity';
import { TcpConnectivity } from './connectivity/tcp-connectivity';
import { TurnConnectivity } from './connectivity/turn-connectivity';
import { DiscoveredSrv } from './srv-result/discovered-srv';

export type ResultProps = {
  result: CheckResult;
};
export const Result = component$<ResultProps>(({ result }) => {
  const toastManager = useContext(ToastManagerContext);
  const queries = useQuery();
  const srv_filter = useSignal<string>(
    !['mra', 'b2b', 'xmpp_fed', 'cma', 'spark', 'mssip', 'webexmessage', 'mail', 'ftps', 'admin', 'turn'].includes(
      queries.value.filter,
    )
      ? ''
      : queries.value.filter,
  );

  useTask$(() => {
    toastManager.addToast({
      message: `All checks done in ${result.elapsedTime}`,
      type: 'success',
      autocloseTime: 10000,
    });
  });

  return (
    <div class="mt-4 flex flex-col gap-4">
      <div>
        <div class="label">
          <span class="label-text">Filter by service</span>
        </div>
        <select
          class="select select-bordered select-sm w-full max-w-xs"
          bind:value={srv_filter}
          onChange$={() => {
            urlUpdateQueries('filter', srv_filter.value);
          }}
        >
          <option selected value="">
            All
          </option>
          <option value="mra">Mobile and Remote access</option>
          <option value="b2b">B2B calls</option>
          <option value="xmpp_fed">XMPP federation</option>
          <option value="cma">XMPP Client</option>
          <option value="spark">Spark Hybrid calls</option>
          <option value="mssip">Microsoft SIP federation</option>
          <option value="webexmessage">Webex Messages</option>
          <option value="mail">Mail services</option>
          <option value="ftps">FTPS</option>
          <option value="admin">Service ports</option>
          <option value="turn">TURN services</option>
        </select>
      </div>

      {srv_filter.value !== 'admin' && srv_filter.value !== 'turn' && (
        <>
          <DiscoveredSrv srventtries={result.srv} srv_filter={srv_filter.value} />
          <TcpConnectivity connectivity={result.connectivity} srv_filter={srv_filter.value} />
        </>
      )}

      {(srv_filter.value === '' || srv_filter.value === 'admin') && (
        <AdminConnectivity connectivity={result.connectivity} />
      )}

      {(srv_filter.value === '' || srv_filter.value === 'turn') && (
        <TurnConnectivity connectivity={result.connectivity} />
      )}
    </div>
  );
});
