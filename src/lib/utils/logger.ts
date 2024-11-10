const enabled = true;

export const log = (...params: any) => {
    if (enabled) {
        console.log(...params);
    }
}

export default {
    log,
}

if (enabled) {
    log('logger enabled');
}
