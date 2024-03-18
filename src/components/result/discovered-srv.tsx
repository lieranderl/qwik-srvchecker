import { component$ } from "@builder.io/qwik";
import type { SrvEntry } from "~/models/result";

interface MergedSrvRecord {
  Srv: string;
  Records: SrvEntry[];
}

function mergeSrvRecords(srvRecords: SrvEntry[]): MergedSrvRecord[] {
  const recordMap: { [key: string]: SrvEntry[] } = {};

  srvRecords.forEach((record) => {
    if (!recordMap[record.Srv]) {
      recordMap[record.Srv] = [];
    }
    if (!recordMap[record.Srv].some((r) => r.Ip === record.Ip)) {
      recordMap[record.Srv].push(record);
    }
  });

  return Object.keys(recordMap).map((key) => ({
    Srv: key,
    Records: recordMap[key],
  }));
}

export const SrvTable = component$<SrvProps>(({ srventtries }) => {
  const mergedRecords = mergeSrvRecords(srventtries);
  return (
    <table class="table table-pin-rows">
      <thead>
        <tr>
          <th>Srv query</th>
          <th>Fqdn</th>
          <th>Priority</th>
          <th>Weight</th>
          <th>Ip</th>
          <th>Port</th>
          <th>SSL Certificate</th>
        </tr>
      </thead>
      <tbody>
        {mergedRecords.map((mergedRecord, index) => {
          const { Srv, Records } = mergedRecord;
          return (
            <>
              {Records.length > 0 &&
                Records.map((record, recordIndex) => (
                  <tr key={Srv + record.Fqdn + index} class="whitespace-nowrap">
                    {recordIndex === 0 && (
                      <td rowSpan={Records.length}>{Srv}</td>
                    )}
                    <td>
                      <div
                        class={
                          record.Fqdn === "SRV record not configured"
                            ? "text-error"
                            : ""
                        }
                      >
                        {record.Fqdn}
                      </div>
                    </td>
                    <td>{record.Priority}</td>
                    <td>{record.Weight}</td>
                    <td>
                      <div
                        class={
                          record.Ip === "A record not configured"
                            ? "text-error"
                            : ""
                        }
                      >
                        {record.Ip}
                      </div>
                    </td>
                    <td>
                      <PortCell
                        port={record.Port}
                        isopened={record.IsOpened}
                        proto={record.Proto}
                        type={record.ServiceName}
                        showProto={true}
                      />
                    </td>

                    <td>null</td>
                  </tr>
                ))}
            </>
          );
        })}
      </tbody>
    </table>
  );
});

export type PortProps = {
  port: number;
  isopened: boolean;
  proto: string;
  type: string;
  showProto: boolean;
};
export const PortCell = component$<PortProps>(
  ({ port, isopened, proto, type, showProto }) => {
    let tooltip;
    let badgeType;
    if (type === "turn") {
      tooltip = isopened ? "Port opened" : "Port closed";
      badgeType = isopened ? "success" : "error";
    } else {
      badgeType = proto === "udp" ? "info" : isopened ? "success" : "error";
      tooltip =
        proto === "udp"
          ? "No check for UDP port"
          : isopened
            ? "Port opened"
            : "Port closed";
    }
    const myClass = `badge badge-${badgeType} text-base-100 whitespace-nowrap overflow-hidden overflow-ellipsis me-1`;

    return (
      <div class="tooltip" data-tip={tooltip}>
        {port === 0 ? (
          ""
        ) : (
          <div class={myClass}>
            {showProto ? proto.toUpperCase() + " " + port : "" + port}
          </div>
        )}
      </div>
    );
  },
);

export type SrvProps = {
  srventtries: SrvEntry[];
};
export const DiscoveredSrv = component$<SrvProps>(({ srventtries }) => {
  return (
    <div class="card w-full bg-base-100 shadow">
      <div class="card-body">
        <h2 class="card-title">Discovered SRV records</h2>
        <SrvTable
          srventtries={srventtries.filter(
            (srv) =>
              !(
                srv.Srv.startsWith("_cisco-uds") ||
                srv.Srv.startsWith("_cuplogin")
              ),
          )}
        />
      </div>
    </div>
  );
});
