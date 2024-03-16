import { component$ } from "@builder.io/qwik";
import type { CheckResult } from "~/models/result";

export type ResultProps = {
  result: CheckResult;
};
export const Result = component$<ResultProps>(({ result }) => {
  return (
    <>
    <div class="card bg-base-100 w-full shadow">
      <div class="card-body">
        <h2 class="card-title">Result:</h2>
        <p>{result.elapsedTime}</p>
      </div>
    </div>

    </>
    
  );
});
