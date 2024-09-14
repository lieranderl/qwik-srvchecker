import { component$ } from '@builder.io/qwik';
import type { Connectivity, Port } from '~/models/result';
import { PortCell } from '../srv-result/port-cell';

export type ConnectivityProps = {
  connectivity: Connectivity[];
};
export const TurnConnectivity = component$<ConnectivityProps>(({ connectivity }) => {
  const filterTcp = (p: Port) => p.Proto === 'tcp' && p.Type === 'turn';
  const filterUdp = (p: Port) => p.Proto === 'udp' && p.Type === 'turn';
  return (
    <div class="card w-full bg-base-100 shadow">
      <div class="card-body">
        <h2 class="card-title">TURN Connectivity</h2>
        <table class="table table-pin-rows">
          <thead>
            <tr>
              <th>FQDN</th>
              <th>IP</th>
              <th>TCP Ports</th>
              <th>UDP Ports</th>
            </tr>
          </thead>
          <tbody>
            {connectivity.map((data) => (
              <tr key={data.Ip}>
                <td>{data.Fqdn}</td>
                <td>{data.Ip}</td>
                <td>
                  {data.Ports.filter(filterTcp).map((port, index) => (
                    <PortCell
                      key={index.toString()}
                      port={port.Num}
                      isopened={port.IsOpened}
                      proto={port.Proto}
                      type={port.Type}
                      showProto={false}
                    />
                  ))}
                </td>
                <td>
                  {data.Ports.filter(filterUdp).map((port, index) => (
                    <PortCell
                      key={index.toString()}
                      port={port.Num}
                      isopened={port.IsOpened}
                      proto={port.Proto}
                      type={port.Type}
                      showProto={false}
                    />
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
