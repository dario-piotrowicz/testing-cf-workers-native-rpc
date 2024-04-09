import { getPlatformProxy } from 'wrangler';

const { env, dispose } = await getPlatformProxy<Env>();

const helloWorkerResp = await env.HELLO_WORKER.fetch('http://localhost');
const helloWorkerRespText = await helloWorkerResp.text();
console.log(`The text response from the bound hello worker is: "${helloWorkerRespText}"\n`);

const sumWorkerResp = await env.SUM_CONSUMER.fetch('http://localhost/1/2/3');
const sumWorkerRespText = await sumWorkerResp.text();
console.log(`The text response from the bound sum consumer worker is: "${sumWorkerRespText}"\n`);

console.log('');
await dispose();