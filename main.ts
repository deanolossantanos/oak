import { router as rutt } from "https://deno.land/x/rutt/mod.ts";

const defs = [];

function route(definition) {
  defs.push(definition);
}

route({
  method: "GET",
  path: "/hello",
  handler: () => "Hello from Pogo",
});

const table = compileToRutt(defs);
const handle = rutt(table);

Deno.serve(handle);


function compileToRutt(defs) {
  const table = {};

  for (const def of defs) {
    const { method, path, handler } = def;

    const methods = Array.isArray(method) ? method : [method];

    for (const m of methods) {
      table[m] ??= {};
      table[m][path] = () => new Response(handler());
    }
  }

  return table;
}
