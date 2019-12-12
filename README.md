# async-queue

Simple queuing functionality with event emitter async call.

Forked and Inspired from [async-function-queue](https://github.com/pgte/async-function-queue)

## Installation

```sh
$ yarn add queueable-js

or,
$ npm install queueable-js
```

## Usage

```js
import Queue from "queueable-js"

const concurrency = 2

// create a queue, defining concurrency
const queue = Queue(concurrency)

// push a function that accepts a callback
// as sole argument
queue.push(function(cb) {
  setTimeout(cb, 1000)
});
```

## Events
```js
// Some emitted events

// queue.event() will returns an instance of EventEmitter
 
queue.event().on('entry', function() {
  console.log('starting to execute function')
})
 
queue.event().on('exit', function() {
  console.log('finished executing function')
})

queue.event().on('drain', function() {
  console.log('queue has drained')
})
```
