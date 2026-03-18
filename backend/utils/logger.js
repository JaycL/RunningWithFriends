export function log(scope, message) {
    const date = new Date().toISOString();
    console.log(`${date} [${scope}] ${message}`);
}