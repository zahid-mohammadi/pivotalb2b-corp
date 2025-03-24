import { exec } from 'child_process';

console.log('Cleanup process starting...');

// Single check for port availability
const port = process.env.PORT || 3000;
exec(`lsof -i :${port}`, (error) => {
  if (!error) {
    console.log(`Found process on port ${port}, attempting cleanup...`);
    exec(`kill $(lsof -t -i:${port})`);
  }
  console.log('Cleanup complete');
});