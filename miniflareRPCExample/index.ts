import { Miniflare, Request } from "miniflare";

const mf = new Miniflare({
  script: ``,
  workers: [
    {
      modules: true,
      compatibilityDate: "2024-04-03",
      script: `
                export default {
                    async fetch(req, env) {
                        const sum = await env.SUM.sum([1, 2, 3]);
                        return new Response(\`The sum of 1 + 2 + 3 is \${sum}\`);
                    }
                }

            `,
      serviceBindings: {
        SUM: {
          name: "sum-worker",
          entrypoint: "SumEntrypoint",
        },
      },
    },
    {
      modules: true,
      compatibilityDate: "2024-04-03",
      name: "sum-worker",
      script: `
                import { WorkerEntrypoint } from 'cloudflare:workers';

                export default {
                    async fetch(request, env, ctx) {
                        throw new Error("Worker only used for RPC calls, there's no default fetch handler");
                    },
                };
    
                export class SumEntrypoint extends WorkerEntrypoint {
                    sum(args) {
                        return args.reduce((a, b) => a + b);
                    }
                }
                `,
    },
  ],
});

const resp = await mf.dispatchFetch(new Request("http://localhost"));
const text = await resp.text();

console.log(`${text}\n`);

await mf.dispose();
