import { component$ } from '@builder.io/qwik';
import type { Port } from '~/models/result';

export type ConPortCellProps = {
  ports: Port[];
};
export const ConnectivityPortCell = component$<ConPortCellProps>(({ ports }) => {
  return (
    <td class="flex-nowrap">
      {ports.map((port, portIndex) =>
        port.IsOpened ? (
          <div class="tooltip" data-tip="Port opened" key={portIndex.toString()}>
            <div class="badge me-1 overflow-hidden overflow-ellipsis whitespace-nowrap border-sky-500 bg-sky-500 text-base-100">
              {port.Num}
            </div>
          </div>
        ) : (
          <div class="tooltip" data-tip="Port closed" key={portIndex.toString()}>
            <div class="badge me-1 overflow-hidden overflow-ellipsis whitespace-nowrap border-sky-700 bg-sky-700 text-base-100">
              {port.Num}
            </div>
          </div>
        ),
      )}
    </td>
  );
});
