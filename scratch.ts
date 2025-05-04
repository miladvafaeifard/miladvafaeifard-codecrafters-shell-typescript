
import * as child_process from 'child_process';

const ps = child_process.spawn('echo', ['hello'], { stdio: 'inherit' });

// console.log(ps)

