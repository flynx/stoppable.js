# stoppable.js

Utility library implementing tooling to make stoppable functions...

This library enables the user to drop out of a function/generator without the 
need to thread the result through the call stack. This is in concept similar to
executing `return ..` from a nested loop to terminate and return from a function
but `stoppable.js` allows us to do the same from a nested set of function calls.
This is also similar to _Python_'s `raise StopIteration` approach to stopping 
iteration.

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

A special object/constructor that can either be returned/thrown _as-is_ or 
used to create an _instance_ to be returned thrown.

```bnf
stoppable.STOP

stoppable.STOP()
stoppable.STOP(<value>)
    -> <stop-object>
```

This will get intercepted by `stoppable(..)` and appropriately handled, stopping 
the function iterator and merging the value into the yields of a generator or 
returning it from a function depending on the wrapper type.

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

Dropping out of recursion avoiding threading the result up the chain:
```javascript

// Note that we split the recursive part and the interface part, this is done
// to keep the STOP catching only to the top level and thus avoid threading 
// the result back up the recursion...
var _find = function(L, e){
    if(L.length == 0){
        throw stoppable.STOP(false) }
    if(L[0] == e){
        throw stoppable.STOP(true) }
    // look further down...
    _find(L.slice(1), e) }

var find = stoppable(_find)

find([1,2,3,4,5,6,7], 6) // -> true
```

For more examples see [`type.js`' `Array.prototype.smap(..)` and friends](https://github.com/flynx/types.js#arraysmap--arraysfilter--arraysreduce--arraysforeach).



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
