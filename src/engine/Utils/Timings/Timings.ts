async function wait(duration: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, duration));
    return Promise.resolve();
}

export default {wait};