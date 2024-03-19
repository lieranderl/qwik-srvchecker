import { Slot, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { HiMagnifyingGlassSolid } from "@qwikest/icons/heroicons";
import type { Cert } from "~/models/result";

export type CertsProps = {
  certs: Cert[] | null;
  ip: string;
};
export const CertificateInfo = component$<CertsProps>(({ certs, ip }) => {
  const cert_modal = useSignal<HTMLDialogElement | null>(null);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    cert_modal.value = document.getElementById(
      "cert_modal_" + ip,
    ) as HTMLDialogElement;
  });

  return (
    <>
      {certs && certs.length > 0 && (
        <div>
          <button
            class="btn btn-outline btn-primary btn-xs flex-nowrap"
            onClick$={() => {
              cert_modal.value?.showModal();
            }}
          >
            <HiMagnifyingGlassSolid class="text-lg" />
            Show Chain
          </button>
          <CertChainModal cert_data_id={ip}>
            {certs.map((c) => (
              <CertificateOutput key={c.Cn} cert={c} />
            ))}
          </CertChainModal>
        </div>
      )}
    </>
  );
});

export type CertProps = {
  cert: Cert;
};
export const CertificateOutput = component$<CertProps>(({ cert }) => {
  return (
    <div class="card bordered">
      <div class="card-body whitespace-normal">
        <div class="collapse collapse-arrow bg-base-200">
          <input type="checkbox" />
          <div class="collapse-title font-medium">Certificate text</div>
          <div class="collapse-content">
            <div class="whitespace-pre-wrap">{cert.Txt}</div>
          </div>
        </div>

        <div class="grid grid-cols-[auto_minmax(0,_1fr)] gap-x-4 gap-y-1">
          <strong class="text-right">CN:</strong>
          <div>{cert.Cn}</div>

          <strong class="text-right">Subject:</strong>
          <div>{cert.Subject}</div>

          <strong class="text-right">SAN:</strong>
          <div>{cert.San}</div>

          <strong class="text-right">Key Usage:</strong>
          <div>
            {cert.KeyUsage && cert.KeyUsage.length > 0
              ? cert.KeyUsage.join(", ")
              : ""}
          </div>

          <strong class="text-right">Extended Key Usage:</strong>
          <div>
            {cert.ExtKeyUsage && cert.ExtKeyUsage.length > 0
              ? cert.ExtKeyUsage.join(", ")
              : ""}
          </div>

          <strong class="text-right">Issuer:</strong>
          <div>{cert.Issuer}</div>

          <strong class="text-right">Valid From:</strong>
          <div>{cert.NotBefore}</div>

          <strong class="text-right">Valid Until:</strong>
          <div>{cert.NotAfter}</div>
        </div>
      </div>
    </div>
  );
});

export type CertChainModalPros = {
  cert_data_id: string;
};
export const CertChainModal = component$<CertChainModalPros>(
  ({ cert_data_id }) => {
    return (
      <dialog id={"cert_modal_" + cert_data_id} class="modal">
        <div class="modal-box min-h-fit min-w-[80%]">
          <form method="dialog">
            <button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 class="text-xl font-bold">Certificates Chain</h3>
          <div class="flex flex-col justify-center gap-1">
            <Slot></Slot>
          </div>
        </div>
      </dialog>
    );
  },
);
