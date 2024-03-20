import { component$ } from "@builder.io/qwik";
// import { CiscoIcon } from "./cisco-icon";

export const TitleOnToolBar = component$(() => {
  return (
    <>
      <div class="flex flex-1">
        {/* <CiscoIcon></CiscoIcon> */}
        <a href="/" class="mx-2 flex-none px-2 text-xl">
          SRV Checker
        </a>
      </div>
    </>
  );
});
