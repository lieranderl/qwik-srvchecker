import { component$ } from "@builder.io/qwik";
import type { Connectivity, Port } from "~/models/result";
import { PortCell } from "../srv-result/port-cell";
import { HiExclamationCircleSolid } from "@qwikest/icons/heroicons";

export type ConnectivityProps = {
  connectivity: Connectivity[];
  srv_filter: string;
};
export const TcpConnectivity = component$<ConnectivityProps>(
  ({ connectivity, srv_filter }) => {
    const filterTcp = srv_filter
      ? (p: Port) =>
          p.Proto === "tcp" &&
          p.Type !== "admin" &&
          p.Type !== "traversal" &&
          p.Type !== "turn" &&
          p.ServiceName === srv_filter
      : (p: Port) =>
          p.Proto === "tcp" &&
          p.Type !== "admin" &&
          p.Type !== "traversal" &&
          p.Type !== "turn";

    const show_tcp_table = connectivity
      .map((data) => data.Ports.filter(filterTcp).length > 0)
      .includes(true);

    return (
      <div class="card w-full bg-base-100 shadow">
        <div class="card-body">
          <h2 class="card-title">TCP Connectivity</h2>
          {show_tcp_table ? (
            <table class="table table-pin-rows">
              <thead>
                <tr>
                  <th>FQDN</th>
                  <th>IP</th>
                  <th>Port</th>
                </tr>
              </thead>
              <tbody>
                {connectivity.map((data) => (
                  <>
                    {data.Ports.filter(filterTcp).length > 0 && (
                      <tr key={data.Ip}>
                        <td>{data.Fqdn}</td>
                        <td>{data.Ip}</td>
                        <td>
                          {data.Ports.filter(filterTcp).map((port, index) => (
                            <PortCell
                              key={index}
                              port={port.Num}
                              isopened={port.IsOpened}
                              proto={port.Proto}
                              type={port.Type}
                              showProto={false}
                            />
                          ))}
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          ) : (
            <div class="flex flex-nowrap items-center gap-1">
              <HiExclamationCircleSolid class="text-xl text-info" />
              <div>
                Could not check port connectivity because no hosts were resolved
                through SRV records.
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);
