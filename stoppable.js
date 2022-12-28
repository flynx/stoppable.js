/**********************************************************************
* 
* stoppable.js
*
* Utility library implementing tooling to make stoppable functions...
*
*
* Repo and docs:
* 	https://github.com/flynx/stoppable.js
*
*
***********************************************/ /* c8 ignore next 2 */
((typeof define)[0]=='u'?function(f){module.exports=f(require)}:define)
(function(require){ var module={} // make module AMD/node compatible...
/*********************************************************************/


//---------------------------------------------------------------------

// need to expose some types that JS hides from us...
var AsyncFunction =
	(async function(){}).constructor

var Generator = 
	(function*(){}).constructor

var AsyncGenerator =
	(async function*(){}).constructor



//---------------------------------------------------------------------

// Wrap a callable in a STOP handler
//
// 	stoppable(func)
// 		-> func
//
// 	stoppable(gen)
// 		-> gen
//
// 	stoppable(asyncgen)
// 		-> asyncgen
//
//
// The client callable can be one of:
// 	- function
// 	- async function
// 	- generator
// 	- async generator
//
// The returned callable will be of the same type as the input callable.
//
// The wrapper handles STOP slightly differently if the client is a 
// function or if it is a generator / async generator:
// 	- function
// 		STOP returned / thrown
// 			-> return undefined
// 		STOP(value) returned / thrown
// 			-> return value
// 	- generator / async generator
// 		STOP yielded / thrown
// 			-> iteration stops
// 		STOP(value) yielded / thrown
// 			-> value yielded and iteration stops
//
//
// NOTE: this repeats the same code at lest twice, not sure yet how to avoid 
// 		this...
// XXX need to give onstop(..) access to the actual call context...
module =
function(func, onstop){
	return Object.assign(
		// NOTE: the below implementations are almost the same, the main 
		// 		differences being the respective generator/async mechanics...
		// generator...
		func instanceof Generator ?
			function*(){
				try{
					for(var res of func.call(this, ...arguments)){
						if(res === module.STOP){
							onstop 
								&& onstop.call(this)
							return }
						if(res instanceof module.STOP){
							onstop 
								&& onstop.call(this, res.value)
							yield res.value
							return }
						yield res }
				} catch(err){
					if(err === module.STOP){
						onstop 
							&& onstop.call(this)
						return
					} else if(err instanceof module.STOP){
						onstop 
							&& onstop.call(this, err.value)
						yield err.value
						return }
					throw err } }
		// async generator...
		: func instanceof AsyncGenerator ?
			async function*(){
				try{
					for await(var res of func.call(this, ...arguments)){
						if(res === module.STOP){
							onstop 
								&& onstop.call(this)
							return }
						if(res instanceof module.STOP){
							onstop 
								&& onstop.call(this, res.value)
							yield res.value
							return }
						yield res }
				} catch(err){
					if(err === module.STOP){
						onstop 
							&& onstop.call(this)
						return
					} else if(err instanceof module.STOP){
						onstop 
							&& onstop.call(this, err.value)
						yield err.value
						return }
					throw err } }
		// async function...
		: func instanceof AsyncFunction ?
			async function(){
				try{
					var res = await func.call(this, ...arguments)
					// NOTE: this is here for uniformity...
					if(res === module.STOP){
						onstop 
							&& onstop.call(this)
						return }
					if(res instanceof module.STOP){
						onstop 
							&& onstop.call(this, res.value)
						return res.value }
					return res
				} catch(err){
					if(err === module.STOP){
						onstop 
							&& onstop.call(this)
						return
					} else if(err instanceof module.STOP){
						onstop 
							&& onstop.call(this, err.value)
						return err.value }
					throw err } }
		// function...
		: function(){
			try{
				var res = func.call(this, ...arguments)
				// NOTE: this is here for uniformity...
				if(res === module.STOP){
					onstop 
						&& onstop.call(this)
					return }
				if(res instanceof module.STOP){
					onstop 
						&& onstop.call(this, res.value)
					return res.value }
				return res
			} catch(err){
				if(err === module.STOP){
					onstop 
						&& onstop.call(this)
					return
				} else if(err instanceof module.STOP){
					onstop 
						&& onstop.call(this, err.value)
					return err.value }
				throw err } },
		{ toString: function(){
			return func.toString() }, }) }



//---------------------------------------------------------------------

module.STOP = 
function(value){
	return {
		__proto__: module.STOP.prototype,

		doc: 'stop iteration.',
		value,
	} }



/**********************************************************************
* vim:set ts=4 sw=4 nowrap :                        */ return module })
