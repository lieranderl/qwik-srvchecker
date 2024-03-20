import {
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { CheckResult } from "~/models/result";
import { DiscoveredSrv } from "./srv-result/discovered-srv";
import { TcpConnectivity } from "./connectivity/tcp-connectivity";
import { AdminConnectivity } from "./connectivity/admin-ports-connectivity";
import { TurnConnectivity } from "./connectivity/turn-connectivity";
import { ToastManagerContext } from "qwik-toasts";

export type ResultProps = {
  result: CheckResult;
};
export const Result = component$<ResultProps>(({ result }) => {
  const toastManager = useContext(ToastManagerContext);

  const srv_filter = useSignal<string>("");

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    toastManager.addToast({
      message: `All checks done in ${result.elapsedTime}`,
      type: "success",
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
          <option value="admin">Service ports</option>
          <option value="turn">TURN services</option>
        </select>
      </div>

      {srv_filter.value !== "admin" && srv_filter.value !== "turn" && (
        <>
          <DiscoveredSrv
            srventtries={result.srv}
            srv_filter={srv_filter.value}
          />
          <TcpConnectivity
            connectivity={result.connectivity}
            srv_filter={srv_filter.value}
          />
        </>
      )}

      {(srv_filter.value === "" || srv_filter.value === "admin") && (
        <AdminConnectivity connectivity={result.connectivity} />
      )}

      {(srv_filter.value === "" || srv_filter.value === "turn") && (
        <TurnConnectivity connectivity={result.connectivity} />
      )}
    </div>
  );
});
