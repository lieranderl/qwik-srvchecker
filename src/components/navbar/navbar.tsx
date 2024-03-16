import { Slot, component$ } from "@builder.io/qwik";
import { TitleOnToolBar } from "./title-bar";

import { ThemeToggle } from "qwik-theme-toggle";

export const Navbar = component$(() => {
  return (
    <div class="drawer">
      <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col">
        <div class="navbar sticky top-0 z-10 mx-auto h-4 bg-opacity-50 backdrop-blur-sm">
          <TitleOnToolBar />
          <div class="flex-0 gap-2">
            <ThemeToggle themeStorageKey="theme" textSize="text-3xl" />
          </div>
        </div>
        <div class="container mx-auto pt-2">
          <div class="sticky top-12 z-10 mx-auto flex h-4 items-center justify-center bg-opacity-50 backdrop-blur-sm ">
            <Slot name="domain" />
          </div>
          <Slot name="result" />
        </div>
      </div>
    </div>
  );
});
