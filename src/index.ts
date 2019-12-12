import AsyncQueue from "./AsyncQueue"

export default (maxConcurrency: number = 1): AsyncQueue => new AsyncQueue({
    maxConcurrency,
})
