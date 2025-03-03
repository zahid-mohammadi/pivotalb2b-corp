
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Cleaning up potentially conflicting processes...');

// Kill any existing server processes
try {
  // Check if we have a PID file from a previous server
  const pidFile = path.join(process.cwd(), '.server.pid');
  if (fs.existsSync(pidFile)) {
    const pid = fs.readFileSync(pidFile, 'utf-8').trim();
    console.log(`Found previous server PID: ${pid}, attempting to terminate...`);
    try {
      execSync(`kill ${pid}`);
      console.log(`Successfully terminated PID: ${pid}`);
    } catch (error) {
      console.log(`Could not terminate PID: ${pid}, it may have already exited`);
    }
    fs.unlinkSync(pidFile);
  }

  // Kill any tsx or node processes that might be holding onto port 3000
  console.log('Looking for potentially conflicting processes on port 3000...');
  const portProcesses = execSync('lsof -i:3000 -t').toString().trim().split('\n');
  
  if (portProcesses[0]) {
    console.log(`Found ${portProcesses.length} processes using port 3000, terminating...`);
    for (const pid of portProcesses) {
      if (pid) {
        try {
          execSync(`kill ${pid}`);
          console.log(`Terminated process ${pid}`);
        } catch (error) {
          console.log(`Failed to terminate process ${pid}`);
        }
      }
    }
    console.log('Waiting for port to be released...');
    // Give some time for the port to be released
    setTimeout(() => {
      console.log('Port cleanup completed.');
    }, 1000);
  } else {
    console.log('No processes found using port 3000.');
  }
} catch (error) {
  // lsof might not be available or no processes found
  console.log('No conflicting processes found or command not supported.');
}

console.log('Cleanup process complete, server can now start safely.');
