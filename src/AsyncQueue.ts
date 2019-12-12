import { EventEmitter } from "events"

interface AsyncQueueProps {
    maxConcurrency?: number
}

type QueueableFunction = (params: any) => void

class AsyncQueue {
    private readonly maxConcurrency: number
    private concurrency: number = 0
    private queue: Array<QueueableFunction> = []
    private readonly eventEmitter: EventEmitter

    constructor(props: AsyncQueueProps) {
        this.maxConcurrency = props.maxConcurrency || 1
        this.eventEmitter = new EventEmitter()

        this.done = this.done.bind(this)
    }

    public push(func: QueueableFunction) {
        this.queue.push(func)

        this.flushIfRequired()
    }

    public event(): EventEmitter {
        return this.eventEmitter
    }

    private flushIfRequired() {
        if (this.concurrency < this.maxConcurrency) {
            this.flush()
        }
    }

    private flush() {
        const func = this.queue.shift()

        if (func) {
            this.concurrency++
            this.eventEmitter.emit("entry")
            func.call(null, this.done)
        }
    }

    private done(error: any) {
        this.concurrency--
        this.eventEmitter.emit("exit")
        if (error) {
            this.eventEmitter.emit("error", error)
        }

        if (!this.queue.length && !this.concurrency) {
            this.eventEmitter.emit("drain")
        }

        this.flushIfRequired()
    }
}

export default AsyncQueue
