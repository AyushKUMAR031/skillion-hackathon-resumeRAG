Server is running on port: 5000
MongoDB connected
Inside ask function
(node:22948) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
(Use `node --trace-warnings ...` to show where the warning was created)
Error in ask function: D:\work\skillion-hackathon\resumeRAG\backend\ml\embedding.js:1
import { pipeline } from '@xenova/transformers';
^^^^^^

SyntaxError: Cannot use import statement outside a module
    at internalCompileFunction (node:internal/vm:128:18)
    at wrapSafe (node:internal/modules/cjs/loader:1280:20)
    at Module._compile (node:internal/modules/cjs/loader:1332:27)
    at Module._extensions..js (node:internal/modules/cjs/loader:1427:10)
    at Module.load (node:internal/modules/cjs/loader:1206:32)
    at Module._load (node:internal/modules/cjs/loader:1022:12)
    at cjsLoader (node:internal/modules/esm/translators:366:17)
    at ModuleWrap.<anonymous> (node:internal/modules/esm/translators:315:7)
    at ModuleJob.run (node:internal/modules/esm/module_job:222:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:323:24)