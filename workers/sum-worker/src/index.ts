import { WorkerEntrypoint } from 'cloudflare:workers';

export interface Env {}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		throw new Error("Worker only used for RPC calls, there's no default fetch handler");
	},
};

export class SumEntrypoint extends WorkerEntrypoint {
	sum(args: number[]): number {
		return args.reduce((a, b) => a + b);
	}
}
