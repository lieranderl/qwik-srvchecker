import { component$ } from "@builder.io/qwik";
import type { Connectivity, Port } from "~/models/result";
import { ConnectivityPortCell } from "./connectivity-port-cell";

export type ConnectivityProps = {
  connectivity: Connectivity[];
};
export const AdminConnectivity = component$<ConnectivityProps>(
  ({ connectivity }) => {
    const filter_admin = (p: Port) => p.Proto === "tcp" && p.Type === "admin";
    const filter_traversal = (p: Port) =>
      p.Proto === "tcp" && p.Type === "traversal";
    return (
      <div class="card w-full bg-base-100 shadow">
        <div class="card-body">
          <h2 class="card-title">TCP connectivity on service ports</h2>
          <table class="table table-pin-rows">
            <thead>
              <tr>
                <th>FQDN</th>
                <th>IP address</th>
                <th>Admin ports</th>
                <th>Traversal service ports</th>
              </tr>
            </thead>
            <tbody>
              {connectivity.map((data) => (
                <tr key={data.Ip}>
                  <td>{data.Fqdn}</td>
                  <td>{data.Ip}</td>
                  <ConnectivityPortCell
                    ports={data.Ports.filter(filter_admin)}
                  />
                  <ConnectivityPortCell
                    ports={data.Ports.filter(filter_traversal)}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
);
