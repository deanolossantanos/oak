import { createApp } from "https://deno.land/x/servest/mod.ts";

const app = createApp();

app.handle("/", (req) => {
  req.respond({ body: "Hello from Servest!" });
});

export default app.fetch;
