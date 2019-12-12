'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var events = require('events');

var AsyncQueue = (function () {
    function AsyncQueue(props) {
        this.concurrency = 0;
        this.queue = [];
        this.maxConcurrency = props.maxConcurrency || 1;
        this.eventEmitter = new events.EventEmitter();
    }
    AsyncQueue.prototype.push = function (func) {
        this.queue.push(func);
        this.flushIfRequired();
    };
    AsyncQueue.prototype.flushIfRequired = function () {
        if (this.concurrency < this.maxConcurrency) {
            this.flush();
        }
    };
    AsyncQueue.prototype.flush = function () {
        var func = this.queue.shift();
        if (func) {
            this.concurrency++;
            this.eventEmitter.emit("entry");
            func.call(null, this.done);
        }
    };
    AsyncQueue.prototype.done = function (error) {
        this.concurrency--;
        this.eventEmitter.emit("exit");
        if (error) {
            this.eventEmitter.emit("error", error);
        }
        if (!this.queue.length && !this.concurrency) {
            this.eventEmitter.emit("drain");
        }
        this.flushIfRequired();
    };
    return AsyncQueue;
}());

var index = (function (maxConcurrency) {
    if (maxConcurrency === void 0) { maxConcurrency = 1; }
    return new AsyncQueue({
        maxConcurrency: maxConcurrency,
    });
});

exports.default = index;
//# sourceMappingURL=index.js.map
