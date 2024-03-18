import { component$ } from "@builder.io/qwik";
import type { CheckResult } from "~/models/result";
import { DiscoveredSrv } from "./discovered-srv";
import { TcpConnectivity } from "./tcp-connectivity";
import { AdminConnectivity } from "./admin-ports-connectivity";
import { TurnConnectivity } from "./turn-connectivity";

export type ResultProps = {
  result: CheckResult;
};
export const Result = component$<ResultProps>(({ result }) => {
  return (
    <div class="mt-4 flex flex-col gap-4">
      <DiscoveredSrv srventtries={result.srv} />
      <TcpConnectivity connectivity={result.connectivity} />
      <AdminConnectivity connectivity={result.connectivity} />
      <TurnConnectivity connectivity={result.connectivity} />
    </div>
  );
});
