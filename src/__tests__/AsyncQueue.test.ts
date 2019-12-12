import { setTimeout } from "timers"
import Queue from ".."

const wait = (ms: number) => (callback: (...args: any[]) => void) => {
    setTimeout(callback, ms)
}

describe("Async Queue Test", () => {
    it("can be created with no arguments", (done) => {
        Queue()
        done()
    })

    it("can be created with a concurrency argument", (done) => {
        Queue(2)
        done()
    })

    it("works with concurrency", (done) => {
        let concurrency = 0
        let doneCount = 0
        const queue = Queue(2)

        queue.event().on("entry", onEntry)
        queue.event().on("exit", onExit)
        queue.event().on("drain", onDrain)

        queue.push(wait(100))
        queue.push(wait(100))
        queue.push(wait(100))
        queue.push(wait(100))

        function onEntry() {
            concurrency++

            expect(concurrency).toBeLessThanOrEqual(2)
        }

        function onExit() {
            concurrency--
            doneCount++
        }

        function onDrain() {
            expect(concurrency).toBe(0)
            expect(doneCount).toBe(4)
            done()
        }
    })

    it("can handle error callback", (done) => {
        const queue = Queue(2)
        const errorMessage = "Test Error"

        queue.push((callback) => {
            setTimeout(callback, 100, new Error(errorMessage))
        })

        queue.event().once("error", (error) => {
            expect(error.message).toBe(errorMessage)

            done()
        })
    })
})
