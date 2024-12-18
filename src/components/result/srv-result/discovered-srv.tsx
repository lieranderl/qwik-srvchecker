import { component$ } from "@builder.io/qwik";
import type { SrvEntry } from "~/models/result";
import { CertificateInfo } from "./certificate-info";
import { PortCell } from "./port-cell";

interface MergedSrvRecord {
	Srv: string;
	Records: SrvEntry[];
}

function mergeSrvRecords(srvRecords: SrvEntry[]): MergedSrvRecord[] {
	const recordMap: { [key: string]: SrvEntry[] } = {};

	for (const record of srvRecords) {
		if (!recordMap[record.Srv]) {
			recordMap[record.Srv] = [];
		}

		if (!recordMap[record.Srv].some((r) => r.Ip === record.Ip)) {
			recordMap[record.Srv].push(record);
		}
	}

	return Object.keys(recordMap).map((key) => ({
		Srv: key,
		Records: recordMap[key],
	}));
}

export type SrvTableProps = {
	srventtries: SrvEntry[];
};
export const SrvTable = component$<SrvTableProps>(({ srventtries }) => {
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
						// biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
						<>
							{Records.length > 0 &&
								Records.map((record, recordIndex) => (
									<tr
										key={Srv + record.Fqdn + index.toString()}
										class="whitespace-nowrap"
									>
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

										<td>
											<CertificateInfo
												certs={record.CertsChain}
												ip={record.Ip}
											/>
										</td>
									</tr>
								))}
						</>
					);
				})}
			</tbody>
		</table>
	);
});

export type SrvProps = {
	srventtries: SrvEntry[];
	srv_filter: string;
};
export const DiscoveredSrv = component$<SrvProps>(
	({ srventtries, srv_filter }) => {
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
								) && srv.ServiceName.includes(srv_filter),
						)}
					/>
				</div>
			</div>
		);
	},
);
