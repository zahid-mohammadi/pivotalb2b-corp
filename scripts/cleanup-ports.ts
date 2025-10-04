import { existsSync, readFileSync, unlinkSync } from 'fs';
import { join } from 'path';

console.log('Cleanup process starting...');

const pidFile = join(process.cwd(), '.server.pid');

// Check if PID file exists
if (existsSync(pidFile)) {
  try {
    const pid = parseInt(readFileSync(pidFile, 'utf-8').trim());
    console.log(`Found PID file with process ID: ${pid}`);

    // Check if process is still alive
    try {
      process.kill(pid, 0); // Signal 0 checks if process exists without killing it
      console.log(`Process ${pid} is still running. Attempting to terminate...`);

      // Try SIGTERM first (graceful shutdown)
      try {
        process.kill(pid, 'SIGTERM');
        console.log(`Sent SIGTERM to process ${pid}`);
        
        // Wait a moment for graceful shutdown
        setTimeout(() => {
          try {
            process.kill(pid, 0); // Check if still alive
            // Still alive, use SIGKILL
            process.kill(pid, 'SIGKILL');
            console.log(`Sent SIGKILL to process ${pid}`);
          } catch {
            console.log(`Process ${pid} terminated successfully`);
          }
        }, 1000);
      } catch (killError: any) {
        if (killError.code === 'ESRCH') {
          console.log(`Process ${pid} no longer exists`);
        } else {
          console.error(`Error killing process ${pid}:`, killError);
        }
      }
    } catch (checkError: any) {
      if (checkError.code === 'ESRCH') {
        console.log(`Process ${pid} is not running (stale PID file)`);
      } else {
        throw checkError;
      }
    }

    // Clean up PID file
    unlinkSync(pidFile);
    console.log('Removed PID file');
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
} else {
  console.log('No PID file found - assuming clean state');
}

// Give the system a moment to release the port
setTimeout(() => {
  console.log('Cleanup complete');
}, 1500);
