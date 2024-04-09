// The interface that your server-side entrypoint implements.
// (This would probably be imported from a .d.ts file generated

import type { WorkerEntrypoint } from 'cloudflare:workers';

declare class MyEntrypointType extends WorkerEntrypoint {
	sum(args: number[]): number;
}

// Define an interface Env specifying the bindings your client-side
// worker expects.
interface Env {
	SUM: Service<MyEntrypointType>;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const path = url.pathname;

		const numsRegex = /^\/((\d+)\/?){2,}$/;

		const match = path.match(numsRegex);

		if (!match) {
			return env.SUM.fetch(request);
			// return new Response('ERROR: the request path should be comprised of numbers (e.g. /123/4/56)', { status: 500 });
		}

		const nums = path
			.replace(/^\//, '')
			.replace(/\/$/, '')
			.split('/')
			.map((numStr) => +numStr);

		const result = await env.SUM.sum(nums);
		// debugger;
		return new Response(`${nums.join(' + ')} = ${result}`);
	},
};
