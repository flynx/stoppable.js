# stoppable.js
Utility library implementing tooling to make stoppable functions...


- [stoppable.js](#stoppablejs)
  - [Install / import](#install--import)
  - [Components](#components)
    - [`stoppable(..)`](#stoppable)
    - [`stoppable.STOP / stoppable.STOP(..)`](#stoppablestop--stoppablestop)
  - [Examples](#examples)
    - [Function](#function)
    - [Async function](#async-function)
    - [Generator](#generator)
    - [Async generator](#async-generator)
  - [License](#license)



## Install / import

```shell
$ npm install --save ig-stoppable
```

```javascript
var stoppable = require('ig-stoppable')
```


## Components

### `stoppable(..)`

Create a wrapper for the input function/generator.

```bnf
stoppable(<function>)
    -> <function>

stoppable(<async-function>)
    -> <async-function>

stoppable(<generator>)
    -> <generator>

stoppable(<async-generator>)
    -> <async-generator>
```


### `stoppable.STOP / stoppable.STOP(..)`

A special object/constructor that can be either returned/thrown _as-is_ or 
used to create an _instance_ to be returned thrown.

```bnf
stoppable.STOP

stoppable.STOP()
stoppable.STOP(<value>)
    -> <stop-object>
```

This will get intercepted by `stoppable(..)` and appropriately handled merging 
it into the return/yield value and stopping the function/iterator.

`<stop-object>` can contain a value that will get handled by `stoppable(..)` (default: `undefined`).


## Examples



### Function

```javascript
var func = stoppable(function(){
    // ...

    throw stoppable.STOP('something')

    // ...
})

var value = func() // -> 'something'
```


### Async function
```javascript
var func = stoppable(async function(){
    // ...

    throw stoppable.STOP('something')

    // ...
})

var value = await func() // -> 'something'
```


### Generator 

```javascript
var gen = stoppable(function*(){
    // ...

    throw stoppable.STOP('something')

    // ...
})

var value = [...gen()] // -> ['somthing']
```


### Async generator

```javascript
var agen = stoppable(async function*(){
    // ...

    throw stoppable.STOP('something')

    // ...
})

var value = awat agen() // -> ['something']
```


## License

[BSD 3-Clause License](./LICENSE)

Copyright (c) 2022-, Alex A. Naanou,  
All rights reserved.


<!-- vim:set ts=4 sw=4 spell : -->
