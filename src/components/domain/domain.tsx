import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { DomainProps } from "~/routes";



export const Domain = component$<DomainProps>(({action}) => {
  
  return (
    <div>
      <Form class="flex gap-2 justify-center items-center" action={action}>
        <label class="input input-sm input-bordered flex items-center gap-2">
          Domain
          <input name="domain" type="text" class="grow" placeholder="site.com" />
        </label>
        <button class="btn btn-sm btn-outline btn-primary" type="submit">Submit</button>
      </Form>
    </div>
  );
});
