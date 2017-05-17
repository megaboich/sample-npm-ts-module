// Include polyfills to work in PhantomJS
import 'core-js';

import * as chai from 'chai'
chai.should();

(window as any).chai = chai;

/**
 * Include all TS(X) files
 * This guarantees that all package and spec files will be included
 * We need to include all files to create coverage report for them
 */
const req = (require as any).context('src/', true, /\.tsx?$/);
req.keys().forEach(req);