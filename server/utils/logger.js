export function logProvider(name) {
  console.log(`
====================================
🤖 Provider : ${name}
🕒 Time     : ${new Date().toLocaleTimeString()}
====================================
`);
}