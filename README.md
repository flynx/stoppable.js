# stoppable.js
Utility library implementing tooling to make stoppable functions...

```shell
$ npm install --save ig-stoppable
```

```javascript
var stoppable = require('ig-stoppable')
```


```javascript
var func = stoppable(function(){
    // ...

    throw stoppable.STOP('something')

    // ...
})

var value = func() // -> 'something'
```

```javascript
var gen = stoppable(function*(){
    // ...

    throw stoppable.STOP('something')

    // ...
})

var value = [...gen()] // -> ['somthing']
```

```javascript
var agen = stoppable(async function*(){
    // ...

    throw stoppable.STOP('something')

    // ...
})

var value = awat agen() // -> ['something']
```