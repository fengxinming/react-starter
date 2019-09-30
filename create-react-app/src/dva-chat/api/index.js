import sleep from 'celia/sleep';

const data = require('./mock-data')
const LATENCY = 16

export async function getAllMessages() {
  await sleep(LATENCY);
  return data;
}

export async function createMessage({ text, thread }) {
  const timestamp = Date.now();
  const id = 'm_' + timestamp;
  const message = {
    id,
    text,
    timestamp,
    threadID: thread.id,
    threadName: thread.name,
    authorName: 'Jesse'
  }
  await sleep(LATENCY);
  return message;
}
