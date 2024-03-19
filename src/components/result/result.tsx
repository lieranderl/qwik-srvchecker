import { component$, useContext, useVisibleTask$ } from "@builder.io/qwik";
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
      <DiscoveredSrv srventtries={result.srv} />
      <TcpConnectivity connectivity={result.connectivity} />
      <AdminConnectivity connectivity={result.connectivity} />
      <TurnConnectivity connectivity={result.connectivity} />
    </div>
  );
});
