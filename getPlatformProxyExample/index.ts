import { getPlatformProxy } from 'wrangler';

const { env, dispose } = await getPlatformProxy<Env>();

const helloWorkerResp = await env.HELLO_WORKER.fetch('http://localhost');
const helloWorkerRespText = await helloWorkerResp.text();
console.log(`The text response from the bound hello worker is: "${helloWorkerRespText}"`);

console.log('');
await dispose();