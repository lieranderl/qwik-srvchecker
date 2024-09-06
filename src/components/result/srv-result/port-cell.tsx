import { component$ } from "@builder.io/qwik";

export type PortProps = {
	port: number;
	isopened: boolean;
	proto: string;
	type: string;
	showProto: boolean;
};
export const PortCell = component$<PortProps>(
	({ port, isopened, proto, type, showProto }) => {
		const badgeInfo =
			"badge badge-info text-base-100 whitespace-nowrap overflow-hidden overflow-ellipsis me-1";
		const badgeSuccess =
			"badge badge-success text-base-100 whitespace-nowrap overflow-hidden overflow-ellipsis me-1";
		const badgeError =
			"badge badge-error text-base-100 whitespace-nowrap overflow-hidden overflow-ellipsis me-1";
		let tooltip = "";
		let myClass = "";
		if (type === "turn") {
			tooltip = isopened ? "Port opened" : "Port closed";
			myClass = isopened ? badgeSuccess : badgeError;
		} else {
			myClass =
				proto === "udp" ? badgeInfo : isopened ? badgeSuccess : badgeError;
			tooltip =
				proto === "udp"
					? "No check for UDP port"
					: isopened
						? "Port opened"
						: "Port closed";
		}

		return (
			<div class="tooltip" data-tip={tooltip}>
				{port === 0 ? (
					""
				) : (
					<div class={myClass}>
						{showProto ? `${proto.toUpperCase()} ${port}` : `${port}`}
					</div>
				)}
			</div>
		);
	},
);
