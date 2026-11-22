import {resolve} from 'node:path';
import {buildLanding} from './landing.mjs';
await buildLanding(resolve(import.meta.dirname,'../site'),{accountOrigin:process.env.LAZO_ACCOUNT_ORIGIN});
console.log('Built Power Chords landing page, capability library, and portable downloads.');
