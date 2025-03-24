import { exec, execSync } from 'child_process';
import * as fs from 'fs';

console.log('Cleanup process starting...');

// Function to forcefully clean up ports
const cleanupPort = (port: number) => {
  try {
    // Check if port is in use
    exec(`lsof -i :${port}`, (error, stdout) => {
      if (!error && stdout) {
        console.log(`Found process on port ${port}, attempting cleanup...`);
        
        try {
          // Get the PIDs using this port
          const pids = stdout
            .split('\n')
            .filter(line => line.includes('LISTEN'))
            .map(line => {
              const parts = line.trim().split(/\s+/);
              return parts[1]; // PID is usually in the second column
            })
            .filter(Boolean);
            
          if (pids.length > 0) {
            console.log(`Killing processes with PIDs: ${pids.join(', ')}`);
            
            // Kill each process individually
            pids.forEach(pid => {
              try {
                execSync(`kill -9 ${pid}`);
                console.log(`Successfully killed process ${pid}`);
              } catch (killError) {
                console.log(`Failed to kill process ${pid}: ${killError}`);
              }
            });
          }
        } catch (processError) {
          console.log(`Error processing port ${port} cleanup: ${processError}`);
        }
      }
    });
  } catch (error) {
    console.log(`Error checking port ${port}: ${error}`);
  }
};

// Use an alternative port if 3000 is persistently occupied
const setupPortFile = () => {
  const portFile = './.port';
  let port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  
  // Try to clean up the default port
  cleanupPort(port);
  
  // If we have a port file from a previous run, try an alternative port
  if (fs.existsSync(portFile)) {
    try {
      const prevPort = parseInt(fs.readFileSync(portFile, 'utf8'));
      if (prevPort !== port && prevPort >= 3000 && prevPort < 4000) {
        console.log(`Previous port ${prevPort} found, will try an alternative port`);
        port = prevPort + 1;
        if (port >= 4000) port = 3001; // Wrap around
      }
    } catch (err) {
      console.log('Error reading port file, will use default port');
    }
  }
  
  // Try to clean up the alternative port too
  if (port !== 3000) {
    cleanupPort(port);
  }
  
  // Save the port we're going to use
  fs.writeFileSync(portFile, port.toString());
  console.log(`Server will try to use port: ${port}`);
  
  // Make the port available to the server via environment
  process.env.PORT = port.toString();
};

setupPortFile();
console.log('Cleanup complete');