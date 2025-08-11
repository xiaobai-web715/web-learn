import require$$0 from 'util';

var lib = {};

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var Hook_1;
var hasRequiredHook;

function requireHook () {
	if (hasRequiredHook) return Hook_1;
	hasRequiredHook = 1;

	const util = require$$0;

	const deprecateContext = util.deprecate(
		() => {},
		"Hook.context is deprecated and will be removed"
	);

	const CALL_DELEGATE = function (...args) {
		this.call = this._createCall("sync");
		return this.call(...args);
	};
	const CALL_ASYNC_DELEGATE = function (...args) {
		this.callAsync = this._createCall("async");
		return this.callAsync(...args);
	};
	const PROMISE_DELEGATE = function (...args) {
		this.promise = this._createCall("promise");
		return this.promise(...args);
	};

	class Hook {
		constructor(args = [], name = undefined) {
			this._args = args;
			this.name = name;
			this.taps = [];
			this.interceptors = [];
			this._call = CALL_DELEGATE;
			this.call = CALL_DELEGATE;
			this._callAsync = CALL_ASYNC_DELEGATE;
			this.callAsync = CALL_ASYNC_DELEGATE;
			this._promise = PROMISE_DELEGATE;
			this.promise = PROMISE_DELEGATE;
			this._x = undefined;

			this.compile = this.compile;
			this.tap = this.tap;
			this.tapAsync = this.tapAsync;
			this.tapPromise = this.tapPromise;
		}

		compile(options) {
			throw new Error("Abstract: should be overridden");
		}

		_createCall(type) {
			return this.compile({
				taps: this.taps,
				interceptors: this.interceptors,
				args: this._args,
				type: type
			});
		}

		_tap(type, options, fn) {
			if (typeof options === "string") {
				options = {
					name: options.trim()
				};
			} else if (typeof options !== "object" || options === null) {
				throw new Error("Invalid tap options");
			}
			if (typeof options.name !== "string" || options.name === "") {
				throw new Error("Missing name for tap");
			}
			if (typeof options.context !== "undefined") {
				deprecateContext();
			}
			options = Object.assign({ type, fn }, options);
			options = this._runRegisterInterceptors(options);
			this._insert(options);
		}

		tap(options, fn) {
			this._tap("sync", options, fn);
		}

		tapAsync(options, fn) {
			this._tap("async", options, fn);
		}

		tapPromise(options, fn) {
			this._tap("promise", options, fn);
		}

		_runRegisterInterceptors(options) {
			for (const interceptor of this.interceptors) {
				if (interceptor.register) {
					const newOptions = interceptor.register(options);
					if (newOptions !== undefined) {
						options = newOptions;
					}
				}
			}
			return options;
		}

		withOptions(options) {
			const mergeOptions = (opt) =>
				Object.assign({}, options, typeof opt === "string" ? { name: opt } : opt);

			return {
				name: this.name,
				tap: (opt, fn) => this.tap(mergeOptions(opt), fn),
				tapAsync: (opt, fn) => this.tapAsync(mergeOptions(opt), fn),
				tapPromise: (opt, fn) => this.tapPromise(mergeOptions(opt), fn),
				intercept: (interceptor) => this.intercept(interceptor),
				isUsed: () => this.isUsed(),
				withOptions: (opt) => this.withOptions(mergeOptions(opt))
			};
		}

		isUsed() {
			return this.taps.length > 0 || this.interceptors.length > 0;
		}

		intercept(interceptor) {
			this._resetCompilation();
			this.interceptors.push(Object.assign({}, interceptor));
			if (interceptor.register) {
				for (let i = 0; i < this.taps.length; i++) {
					this.taps[i] = interceptor.register(this.taps[i]);
				}
			}
		}

		_resetCompilation() {
			this.call = this._call;
			this.callAsync = this._callAsync;
			this.promise = this._promise;
		}

		_insert(item) {
			this._resetCompilation();
			let before;
			if (typeof item.before === "string") {
				before = new Set([item.before]);
			} else if (Array.isArray(item.before)) {
				before = new Set(item.before);
			}
			let stage = 0;
			if (typeof item.stage === "number") {
				stage = item.stage;
			}
			let i = this.taps.length;
			while (i > 0) {
				i--;
				const x = this.taps[i];
				this.taps[i + 1] = x;
				const xStage = x.stage || 0;
				if (before) {
					if (before.has(x.name)) {
						before.delete(x.name);
						continue;
					}
					if (before.size > 0) {
						continue;
					}
				}
				if (xStage > stage) {
					continue;
				}
				i++;
				break;
			}
			this.taps[i] = item;
		}
	}

	Object.setPrototypeOf(Hook.prototype, null);

	Hook_1 = Hook;
	return Hook_1;
}

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var HookCodeFactory_1;
var hasRequiredHookCodeFactory;

function requireHookCodeFactory () {
	if (hasRequiredHookCodeFactory) return HookCodeFactory_1;
	hasRequiredHookCodeFactory = 1;

	class HookCodeFactory {
		constructor(config) {
			this.config = config;
			this.options = undefined;
			this._args = undefined;
		}

		create(options) {
			this.init(options);
			let fn;
			switch (this.options.type) {
				case "sync":
					fn = new Function(
						this.args(),
						'"use strict";\n' +
							this.header() +
							this.contentWithInterceptors({
								onError: (err) => `throw ${err};\n`,
								onResult: (result) => `return ${result};\n`,
								resultReturns: true,
								onDone: () => "",
								rethrowIfPossible: true
							})
					);
					break;
				case "async":
					fn = new Function(
						this.args({
							after: "_callback"
						}),
						'"use strict";\n' +
							this.header() +
							this.contentWithInterceptors({
								onError: (err) => `_callback(${err});\n`,
								onResult: (result) => `_callback(null, ${result});\n`,
								onDone: () => "_callback();\n"
							})
					);
					break;
				case "promise":
					let errorHelperUsed = false;
					const content = this.contentWithInterceptors({
						onError: (err) => {
							errorHelperUsed = true;
							return `_error(${err});\n`;
						},
						onResult: (result) => `_resolve(${result});\n`,
						onDone: () => "_resolve();\n"
					});
					let code = "";
					code += '"use strict";\n';
					code += this.header();
					code += "return new Promise((function(_resolve, _reject) {\n";
					if (errorHelperUsed) {
						code += "var _sync = true;\n";
						code += "function _error(_err) {\n";
						code += "if(_sync)\n";
						code +=
							"_resolve(Promise.resolve().then((function() { throw _err; })));\n";
						code += "else\n";
						code += "_reject(_err);\n";
						code += "};\n";
					}
					code += content;
					if (errorHelperUsed) {
						code += "_sync = false;\n";
					}
					code += "}));\n";
					fn = new Function(this.args(), code);
					break;
			}
			this.deinit();
			return fn;
		}

		setup(instance, options) {
			instance._x = options.taps.map((t) => t.fn);
		}

		/**
		 * @param {{ type: "sync" | "promise" | "async", taps: Array<Tap>, interceptors: Array<Interceptor> }} options
		 */
		init(options) {
			this.options = options;
			this._args = options.args.slice();
		}

		deinit() {
			this.options = undefined;
			this._args = undefined;
		}

		contentWithInterceptors(options) {
			if (this.options.interceptors.length > 0) {
				const onError = options.onError;
				const onResult = options.onResult;
				const onDone = options.onDone;
				let code = "";
				for (let i = 0; i < this.options.interceptors.length; i++) {
					const interceptor = this.options.interceptors[i];
					if (interceptor.call) {
						code += `${this.getInterceptor(i)}.call(${this.args({
							before: interceptor.context ? "_context" : undefined
						})});\n`;
					}
				}
				code += this.content(
					Object.assign(options, {
						onError:
							onError &&
							((err) => {
								let code = "";
								for (let i = 0; i < this.options.interceptors.length; i++) {
									const interceptor = this.options.interceptors[i];
									if (interceptor.error) {
										code += `${this.getInterceptor(i)}.error(${err});\n`;
									}
								}
								code += onError(err);
								return code;
							}),
						onResult:
							onResult &&
							((result) => {
								let code = "";
								for (let i = 0; i < this.options.interceptors.length; i++) {
									const interceptor = this.options.interceptors[i];
									if (interceptor.result) {
										code += `${this.getInterceptor(i)}.result(${result});\n`;
									}
								}
								code += onResult(result);
								return code;
							}),
						onDone:
							onDone &&
							(() => {
								let code = "";
								for (let i = 0; i < this.options.interceptors.length; i++) {
									const interceptor = this.options.interceptors[i];
									if (interceptor.done) {
										code += `${this.getInterceptor(i)}.done();\n`;
									}
								}
								code += onDone();
								return code;
							})
					})
				);
				return code;
			} else {
				return this.content(options);
			}
		}

		header() {
			let code = "";
			if (this.needContext()) {
				code += "var _context = {};\n";
			} else {
				code += "var _context;\n";
			}
			code += "var _x = this._x;\n";
			if (this.options.interceptors.length > 0) {
				code += "var _taps = this.taps;\n";
				code += "var _interceptors = this.interceptors;\n";
			}
			return code;
		}

		needContext() {
			for (const tap of this.options.taps) if (tap.context) return true;
			return false;
		}

		callTap(tapIndex, { onError, onResult, onDone, rethrowIfPossible }) {
			let code = "";
			let hasTapCached = false;
			for (let i = 0; i < this.options.interceptors.length; i++) {
				const interceptor = this.options.interceptors[i];
				if (interceptor.tap) {
					if (!hasTapCached) {
						code += `var _tap${tapIndex} = ${this.getTap(tapIndex)};\n`;
						hasTapCached = true;
					}
					code += `${this.getInterceptor(i)}.tap(${
						interceptor.context ? "_context, " : ""
					}_tap${tapIndex});\n`;
				}
			}
			code += `var _fn${tapIndex} = ${this.getTapFn(tapIndex)};\n`;
			const tap = this.options.taps[tapIndex];
			switch (tap.type) {
				case "sync":
					if (!rethrowIfPossible) {
						code += `var _hasError${tapIndex} = false;\n`;
						code += "try {\n";
					}
					if (onResult) {
						code += `var _result${tapIndex} = _fn${tapIndex}(${this.args({
							before: tap.context ? "_context" : undefined
						})});\n`;
					} else {
						code += `_fn${tapIndex}(${this.args({
							before: tap.context ? "_context" : undefined
						})});\n`;
					}
					if (!rethrowIfPossible) {
						code += "} catch(_err) {\n";
						code += `_hasError${tapIndex} = true;\n`;
						code += onError("_err");
						code += "}\n";
						code += `if(!_hasError${tapIndex}) {\n`;
					}
					if (onResult) {
						code += onResult(`_result${tapIndex}`);
					}
					if (onDone) {
						code += onDone();
					}
					if (!rethrowIfPossible) {
						code += "}\n";
					}
					break;
				case "async":
					let cbCode = "";
					if (onResult)
						cbCode += `(function(_err${tapIndex}, _result${tapIndex}) {\n`;
					else cbCode += `(function(_err${tapIndex}) {\n`;
					cbCode += `if(_err${tapIndex}) {\n`;
					cbCode += onError(`_err${tapIndex}`);
					cbCode += "} else {\n";
					if (onResult) {
						cbCode += onResult(`_result${tapIndex}`);
					}
					if (onDone) {
						cbCode += onDone();
					}
					cbCode += "}\n";
					cbCode += "})";
					code += `_fn${tapIndex}(${this.args({
						before: tap.context ? "_context" : undefined,
						after: cbCode
					})});\n`;
					break;
				case "promise":
					code += `var _hasResult${tapIndex} = false;\n`;
					code += `var _promise${tapIndex} = _fn${tapIndex}(${this.args({
						before: tap.context ? "_context" : undefined
					})});\n`;
					code += `if (!_promise${tapIndex} || !_promise${tapIndex}.then)\n`;
					code += `  throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise${tapIndex} + ')');\n`;
					code += `_promise${tapIndex}.then((function(_result${tapIndex}) {\n`;
					code += `_hasResult${tapIndex} = true;\n`;
					if (onResult) {
						code += onResult(`_result${tapIndex}`);
					}
					if (onDone) {
						code += onDone();
					}
					code += `}), function(_err${tapIndex}) {\n`;
					code += `if(_hasResult${tapIndex}) throw _err${tapIndex};\n`;
					code += onError(`_err${tapIndex}`);
					code += "});\n";
					break;
			}
			return code;
		}

		callTapsSeries({
			onError,
			onResult,
			resultReturns,
			onDone,
			doneReturns,
			rethrowIfPossible
		}) {
			if (this.options.taps.length === 0) return onDone();
			const firstAsync = this.options.taps.findIndex((t) => t.type !== "sync");
			const somethingReturns = resultReturns || doneReturns;
			let code = "";
			let current = onDone;
			let unrollCounter = 0;
			for (let j = this.options.taps.length - 1; j >= 0; j--) {
				const i = j;
				const unroll =
					current !== onDone &&
					(this.options.taps[i].type !== "sync" || unrollCounter++ > 20);
				if (unroll) {
					unrollCounter = 0;
					code += `function _next${i}() {\n`;
					code += current();
					code += `}\n`;
					current = () => `${somethingReturns ? "return " : ""}_next${i}();\n`;
				}
				const done = current;
				const doneBreak = (skipDone) => {
					if (skipDone) return "";
					return onDone();
				};
				const content = this.callTap(i, {
					onError: (error) => onError(i, error, done, doneBreak),
					onResult:
						onResult &&
						((result) => {
							return onResult(i, result, done, doneBreak);
						}),
					onDone: !onResult && done,
					rethrowIfPossible:
						rethrowIfPossible && (firstAsync < 0 || i < firstAsync)
				});
				current = () => content;
			}
			code += current();
			return code;
		}

		callTapsLooping({ onError, onDone, rethrowIfPossible }) {
			if (this.options.taps.length === 0) return onDone();
			const syncOnly = this.options.taps.every((t) => t.type === "sync");
			let code = "";
			if (!syncOnly) {
				code += "var _looper = (function() {\n";
				code += "var _loopAsync = false;\n";
			}
			code += "var _loop;\n";
			code += "do {\n";
			code += "_loop = false;\n";
			for (let i = 0; i < this.options.interceptors.length; i++) {
				const interceptor = this.options.interceptors[i];
				if (interceptor.loop) {
					code += `${this.getInterceptor(i)}.loop(${this.args({
						before: interceptor.context ? "_context" : undefined
					})});\n`;
				}
			}
			code += this.callTapsSeries({
				onError,
				onResult: (i, result, next, doneBreak) => {
					let code = "";
					code += `if(${result} !== undefined) {\n`;
					code += "_loop = true;\n";
					if (!syncOnly) code += "if(_loopAsync) _looper();\n";
					code += doneBreak(true);
					code += `} else {\n`;
					code += next();
					code += `}\n`;
					return code;
				},
				onDone:
					onDone &&
					(() => {
						let code = "";
						code += "if(!_loop) {\n";
						code += onDone();
						code += "}\n";
						return code;
					}),
				rethrowIfPossible: rethrowIfPossible && syncOnly
			});
			code += "} while(_loop);\n";
			if (!syncOnly) {
				code += "_loopAsync = true;\n";
				code += "});\n";
				code += "_looper();\n";
			}
			return code;
		}

		callTapsParallel({
			onError,
			onResult,
			onDone,
			rethrowIfPossible,
			onTap = (i, run) => run()
		}) {
			if (this.options.taps.length <= 1) {
				return this.callTapsSeries({
					onError,
					onResult,
					onDone,
					rethrowIfPossible
				});
			}
			let code = "";
			code += "do {\n";
			code += `var _counter = ${this.options.taps.length};\n`;
			if (onDone) {
				code += "var _done = (function() {\n";
				code += onDone();
				code += "});\n";
			}
			for (let i = 0; i < this.options.taps.length; i++) {
				const done = () => {
					if (onDone) return "if(--_counter === 0) _done();\n";
					else return "--_counter;";
				};
				const doneBreak = (skipDone) => {
					if (skipDone || !onDone) return "_counter = 0;\n";
					else return "_counter = 0;\n_done();\n";
				};
				code += "if(_counter <= 0) break;\n";
				code += onTap(
					i,
					() =>
						this.callTap(i, {
							onError: (error) => {
								let code = "";
								code += "if(_counter > 0) {\n";
								code += onError(i, error, done, doneBreak);
								code += "}\n";
								return code;
							},
							onResult:
								onResult &&
								((result) => {
									let code = "";
									code += "if(_counter > 0) {\n";
									code += onResult(i, result, done, doneBreak);
									code += "}\n";
									return code;
								}),
							onDone:
								!onResult &&
								(() => {
									return done();
								}),
							rethrowIfPossible
						}),
					done,
					doneBreak
				);
			}
			code += "} while(false);\n";
			return code;
		}

		args({ before, after } = {}) {
			let allArgs = this._args;
			if (before) allArgs = [before].concat(allArgs);
			if (after) allArgs = allArgs.concat(after);
			if (allArgs.length === 0) {
				return "";
			} else {
				return allArgs.join(", ");
			}
		}

		getTapFn(idx) {
			return `_x[${idx}]`;
		}

		getTap(idx) {
			return `_taps[${idx}]`;
		}

		getInterceptor(idx) {
			return `_interceptors[${idx}]`;
		}
	}

	HookCodeFactory_1 = HookCodeFactory;
	return HookCodeFactory_1;
}

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var SyncHook_1;
var hasRequiredSyncHook;

function requireSyncHook () {
	if (hasRequiredSyncHook) return SyncHook_1;
	hasRequiredSyncHook = 1;

	const Hook = requireHook();
	const HookCodeFactory = requireHookCodeFactory();

	class SyncHookCodeFactory extends HookCodeFactory {
		content({ onError, onDone, rethrowIfPossible }) {
			return this.callTapsSeries({
				onError: (i, err) => onError(err),
				onDone,
				rethrowIfPossible
			});
		}
	}

	const factory = new SyncHookCodeFactory();

	const TAP_ASYNC = () => {
		throw new Error("tapAsync is not supported on a SyncHook");
	};

	const TAP_PROMISE = () => {
		throw new Error("tapPromise is not supported on a SyncHook");
	};

	const COMPILE = function (options) {
		factory.setup(this, options);
		return factory.create(options);
	};

	function SyncHook(args = [], name = undefined) {
		const hook = new Hook(args, name);
		hook.constructor = SyncHook;
		hook.tapAsync = TAP_ASYNC;
		hook.tapPromise = TAP_PROMISE;
		hook.compile = COMPILE;
		return hook;
	}

	SyncHook.prototype = null;

	SyncHook_1 = SyncHook;
	return SyncHook_1;
}

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var SyncBailHook_1;
var hasRequiredSyncBailHook;

function requireSyncBailHook () {
	if (hasRequiredSyncBailHook) return SyncBailHook_1;
	hasRequiredSyncBailHook = 1;

	const Hook = requireHook();
	const HookCodeFactory = requireHookCodeFactory();

	class SyncBailHookCodeFactory extends HookCodeFactory {
		content({ onError, onResult, resultReturns, onDone, rethrowIfPossible }) {
			return this.callTapsSeries({
				onError: (i, err) => onError(err),
				onResult: (i, result, next) =>
					`if(${result} !== undefined) {\n${onResult(
						result
					)};\n} else {\n${next()}}\n`,
				resultReturns,
				onDone,
				rethrowIfPossible
			});
		}
	}

	const factory = new SyncBailHookCodeFactory();

	const TAP_ASYNC = () => {
		throw new Error("tapAsync is not supported on a SyncBailHook");
	};

	const TAP_PROMISE = () => {
		throw new Error("tapPromise is not supported on a SyncBailHook");
	};

	const COMPILE = function (options) {
		factory.setup(this, options);
		return factory.create(options);
	};

	function SyncBailHook(args = [], name = undefined) {
		const hook = new Hook(args, name);
		hook.constructor = SyncBailHook;
		hook.tapAsync = TAP_ASYNC;
		hook.tapPromise = TAP_PROMISE;
		hook.compile = COMPILE;
		return hook;
	}

	SyncBailHook.prototype = null;

	SyncBailHook_1 = SyncBailHook;
	return SyncBailHook_1;
}

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var SyncWaterfallHook_1;
var hasRequiredSyncWaterfallHook;

function requireSyncWaterfallHook () {
	if (hasRequiredSyncWaterfallHook) return SyncWaterfallHook_1;
	hasRequiredSyncWaterfallHook = 1;

	const Hook = requireHook();
	const HookCodeFactory = requireHookCodeFactory();

	class SyncWaterfallHookCodeFactory extends HookCodeFactory {
		content({ onError, onResult, resultReturns, rethrowIfPossible }) {
			return this.callTapsSeries({
				onError: (i, err) => onError(err),
				onResult: (i, result, next) => {
					let code = "";
					code += `if(${result} !== undefined) {\n`;
					code += `${this._args[0]} = ${result};\n`;
					code += `}\n`;
					code += next();
					return code;
				},
				onDone: () => onResult(this._args[0]),
				doneReturns: resultReturns,
				rethrowIfPossible
			});
		}
	}

	const factory = new SyncWaterfallHookCodeFactory();

	const TAP_ASYNC = () => {
		throw new Error("tapAsync is not supported on a SyncWaterfallHook");
	};

	const TAP_PROMISE = () => {
		throw new Error("tapPromise is not supported on a SyncWaterfallHook");
	};

	const COMPILE = function (options) {
		factory.setup(this, options);
		return factory.create(options);
	};

	function SyncWaterfallHook(args = [], name = undefined) {
		if (args.length < 1)
			throw new Error("Waterfall hooks must have at least one argument");
		const hook = new Hook(args, name);
		hook.constructor = SyncWaterfallHook;
		hook.tapAsync = TAP_ASYNC;
		hook.tapPromise = TAP_PROMISE;
		hook.compile = COMPILE;
		return hook;
	}

	SyncWaterfallHook.prototype = null;

	SyncWaterfallHook_1 = SyncWaterfallHook;
	return SyncWaterfallHook_1;
}

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var SyncLoopHook_1;
var hasRequiredSyncLoopHook;

function requireSyncLoopHook () {
	if (hasRequiredSyncLoopHook) return SyncLoopHook_1;
	hasRequiredSyncLoopHook = 1;

	const Hook = requireHook();
	const HookCodeFactory = requireHookCodeFactory();

	class SyncLoopHookCodeFactory extends HookCodeFactory {
		content({ onError, onDone, rethrowIfPossible }) {
			return this.callTapsLooping({
				onError: (i, err) => onError(err),
				onDone,
				rethrowIfPossible
			});
		}
	}

	const factory = new SyncLoopHookCodeFactory();

	const TAP_ASYNC = () => {
		throw new Error("tapAsync is not supported on a SyncLoopHook");
	};

	const TAP_PROMISE = () => {
		throw new Error("tapPromise is not supported on a SyncLoopHook");
	};

	const COMPILE = function (options) {
		factory.setup(this, options);
		return factory.create(options);
	};

	function SyncLoopHook(args = [], name = undefined) {
		const hook = new Hook(args, name);
		hook.constructor = SyncLoopHook;
		hook.tapAsync = TAP_ASYNC;
		hook.tapPromise = TAP_PROMISE;
		hook.compile = COMPILE;
		return hook;
	}

	SyncLoopHook.prototype = null;

	SyncLoopHook_1 = SyncLoopHook;
	return SyncLoopHook_1;
}

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var AsyncParallelHook_1;
var hasRequiredAsyncParallelHook;

function requireAsyncParallelHook () {
	if (hasRequiredAsyncParallelHook) return AsyncParallelHook_1;
	hasRequiredAsyncParallelHook = 1;

	const Hook = requireHook();
	const HookCodeFactory = requireHookCodeFactory();

	class AsyncParallelHookCodeFactory extends HookCodeFactory {
		content({ onError, onDone }) {
			return this.callTapsParallel({
				onError: (i, err, done, doneBreak) => onError(err) + doneBreak(true),
				onDone
			});
		}
	}

	const factory = new AsyncParallelHookCodeFactory();

	const COMPILE = function (options) {
		factory.setup(this, options);
		return factory.create(options);
	};

	function AsyncParallelHook(args = [], name = undefined) {
		const hook = new Hook(args, name);
		hook.constructor = AsyncParallelHook;
		hook.compile = COMPILE;
		hook._call = undefined;
		hook.call = undefined;
		return hook;
	}

	AsyncParallelHook.prototype = null;

	AsyncParallelHook_1 = AsyncParallelHook;
	return AsyncParallelHook_1;
}

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var AsyncParallelBailHook_1;
var hasRequiredAsyncParallelBailHook;

function requireAsyncParallelBailHook () {
	if (hasRequiredAsyncParallelBailHook) return AsyncParallelBailHook_1;
	hasRequiredAsyncParallelBailHook = 1;

	const Hook = requireHook();
	const HookCodeFactory = requireHookCodeFactory();

	class AsyncParallelBailHookCodeFactory extends HookCodeFactory {
		content({ onError, onResult, onDone }) {
			let code = "";
			code += `var _results = new Array(${this.options.taps.length});\n`;
			code += "var _checkDone = function() {\n";
			code += "for(var i = 0; i < _results.length; i++) {\n";
			code += "var item = _results[i];\n";
			code += "if(item === undefined) return false;\n";
			code += "if(item.result !== undefined) {\n";
			code += onResult("item.result");
			code += "return true;\n";
			code += "}\n";
			code += "if(item.error) {\n";
			code += onError("item.error");
			code += "return true;\n";
			code += "}\n";
			code += "}\n";
			code += "return false;\n";
			code += "}\n";
			code += this.callTapsParallel({
				onError: (i, err, done, doneBreak) => {
					let code = "";
					code += `if(${i} < _results.length && ((_results.length = ${
						i + 1
					}), (_results[${i}] = { error: ${err} }), _checkDone())) {\n`;
					code += doneBreak(true);
					code += "} else {\n";
					code += done();
					code += "}\n";
					return code;
				},
				onResult: (i, result, done, doneBreak) => {
					let code = "";
					code += `if(${i} < _results.length && (${result} !== undefined && (_results.length = ${
						i + 1
					}), (_results[${i}] = { result: ${result} }), _checkDone())) {\n`;
					code += doneBreak(true);
					code += "} else {\n";
					code += done();
					code += "}\n";
					return code;
				},
				onTap: (i, run, done, doneBreak) => {
					let code = "";
					if (i > 0) {
						code += `if(${i} >= _results.length) {\n`;
						code += done();
						code += "} else {\n";
					}
					code += run();
					if (i > 0) code += "}\n";
					return code;
				},
				onDone
			});
			return code;
		}
	}

	const factory = new AsyncParallelBailHookCodeFactory();

	const COMPILE = function (options) {
		factory.setup(this, options);
		return factory.create(options);
	};

	function AsyncParallelBailHook(args = [], name = undefined) {
		const hook = new Hook(args, name);
		hook.constructor = AsyncParallelBailHook;
		hook.compile = COMPILE;
		hook._call = undefined;
		hook.call = undefined;
		return hook;
	}

	AsyncParallelBailHook.prototype = null;

	AsyncParallelBailHook_1 = AsyncParallelBailHook;
	return AsyncParallelBailHook_1;
}

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var AsyncSeriesHook_1;
var hasRequiredAsyncSeriesHook;

function requireAsyncSeriesHook () {
	if (hasRequiredAsyncSeriesHook) return AsyncSeriesHook_1;
	hasRequiredAsyncSeriesHook = 1;

	const Hook = requireHook();
	const HookCodeFactory = requireHookCodeFactory();

	class AsyncSeriesHookCodeFactory extends HookCodeFactory {
		content({ onError, onDone }) {
			return this.callTapsSeries({
				onError: (i, err, next, doneBreak) => onError(err) + doneBreak(true),
				onDone
			});
		}
	}

	const factory = new AsyncSeriesHookCodeFactory();

	const COMPILE = function (options) {
		factory.setup(this, options);
		return factory.create(options);
	};

	function AsyncSeriesHook(args = [], name = undefined) {
		const hook = new Hook(args, name);
		hook.constructor = AsyncSeriesHook;
		hook.compile = COMPILE;
		hook._call = undefined;
		hook.call = undefined;
		return hook;
	}

	AsyncSeriesHook.prototype = null;

	AsyncSeriesHook_1 = AsyncSeriesHook;
	return AsyncSeriesHook_1;
}

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var AsyncSeriesBailHook_1;
var hasRequiredAsyncSeriesBailHook;

function requireAsyncSeriesBailHook () {
	if (hasRequiredAsyncSeriesBailHook) return AsyncSeriesBailHook_1;
	hasRequiredAsyncSeriesBailHook = 1;

	const Hook = requireHook();
	const HookCodeFactory = requireHookCodeFactory();

	class AsyncSeriesBailHookCodeFactory extends HookCodeFactory {
		content({ onError, onResult, resultReturns, onDone }) {
			return this.callTapsSeries({
				onError: (i, err, next, doneBreak) => onError(err) + doneBreak(true),
				onResult: (i, result, next) =>
					`if(${result} !== undefined) {\n${onResult(
						result
					)}\n} else {\n${next()}}\n`,
				resultReturns,
				onDone
			});
		}
	}

	const factory = new AsyncSeriesBailHookCodeFactory();

	const COMPILE = function (options) {
		factory.setup(this, options);
		return factory.create(options);
	};

	function AsyncSeriesBailHook(args = [], name = undefined) {
		const hook = new Hook(args, name);
		hook.constructor = AsyncSeriesBailHook;
		hook.compile = COMPILE;
		hook._call = undefined;
		hook.call = undefined;
		return hook;
	}

	AsyncSeriesBailHook.prototype = null;

	AsyncSeriesBailHook_1 = AsyncSeriesBailHook;
	return AsyncSeriesBailHook_1;
}

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var AsyncSeriesLoopHook_1;
var hasRequiredAsyncSeriesLoopHook;

function requireAsyncSeriesLoopHook () {
	if (hasRequiredAsyncSeriesLoopHook) return AsyncSeriesLoopHook_1;
	hasRequiredAsyncSeriesLoopHook = 1;

	const Hook = requireHook();
	const HookCodeFactory = requireHookCodeFactory();

	class AsyncSeriesLoopHookCodeFactory extends HookCodeFactory {
		content({ onError, onDone }) {
			return this.callTapsLooping({
				onError: (i, err, next, doneBreak) => onError(err) + doneBreak(true),
				onDone
			});
		}
	}

	const factory = new AsyncSeriesLoopHookCodeFactory();

	const COMPILE = function (options) {
		factory.setup(this, options);
		return factory.create(options);
	};

	function AsyncSeriesLoopHook(args = [], name = undefined) {
		const hook = new Hook(args, name);
		hook.constructor = AsyncSeriesLoopHook;
		hook.compile = COMPILE;
		hook._call = undefined;
		hook.call = undefined;
		return hook;
	}

	AsyncSeriesLoopHook.prototype = null;

	AsyncSeriesLoopHook_1 = AsyncSeriesLoopHook;
	return AsyncSeriesLoopHook_1;
}

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var AsyncSeriesWaterfallHook_1;
var hasRequiredAsyncSeriesWaterfallHook;

function requireAsyncSeriesWaterfallHook () {
	if (hasRequiredAsyncSeriesWaterfallHook) return AsyncSeriesWaterfallHook_1;
	hasRequiredAsyncSeriesWaterfallHook = 1;

	const Hook = requireHook();
	const HookCodeFactory = requireHookCodeFactory();

	class AsyncSeriesWaterfallHookCodeFactory extends HookCodeFactory {
		content({ onError, onResult, onDone }) {
			return this.callTapsSeries({
				onError: (i, err, next, doneBreak) => onError(err) + doneBreak(true),
				onResult: (i, result, next) => {
					let code = "";
					code += `if(${result} !== undefined) {\n`;
					code += `${this._args[0]} = ${result};\n`;
					code += `}\n`;
					code += next();
					return code;
				},
				onDone: () => onResult(this._args[0])
			});
		}
	}

	const factory = new AsyncSeriesWaterfallHookCodeFactory();

	const COMPILE = function (options) {
		factory.setup(this, options);
		return factory.create(options);
	};

	function AsyncSeriesWaterfallHook(args = [], name = undefined) {
		if (args.length < 1)
			throw new Error("Waterfall hooks must have at least one argument");
		const hook = new Hook(args, name);
		hook.constructor = AsyncSeriesWaterfallHook;
		hook.compile = COMPILE;
		hook._call = undefined;
		hook.call = undefined;
		return hook;
	}

	AsyncSeriesWaterfallHook.prototype = null;

	AsyncSeriesWaterfallHook_1 = AsyncSeriesWaterfallHook;
	return AsyncSeriesWaterfallHook_1;
}

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var HookMap_1;
var hasRequiredHookMap;

function requireHookMap () {
	if (hasRequiredHookMap) return HookMap_1;
	hasRequiredHookMap = 1;

	const util = require$$0;

	const defaultFactory = (key, hook) => hook;

	class HookMap {
		constructor(factory, name = undefined) {
			this._map = new Map();
			this.name = name;
			this._factory = factory;
			this._interceptors = [];
		}

		get(key) {
			return this._map.get(key);
		}

		for(key) {
			const hook = this.get(key);
			if (hook !== undefined) {
				return hook;
			}
			let newHook = this._factory(key);
			const interceptors = this._interceptors;
			for (let i = 0; i < interceptors.length; i++) {
				newHook = interceptors[i].factory(key, newHook);
			}
			this._map.set(key, newHook);
			return newHook;
		}

		intercept(interceptor) {
			this._interceptors.push(
				Object.assign(
					{
						factory: defaultFactory
					},
					interceptor
				)
			);
		}
	}

	HookMap.prototype.tap = util.deprecate(function (key, options, fn) {
		return this.for(key).tap(options, fn);
	}, "HookMap#tap(key,…) is deprecated. Use HookMap#for(key).tap(…) instead.");

	HookMap.prototype.tapAsync = util.deprecate(function (key, options, fn) {
		return this.for(key).tapAsync(options, fn);
	}, "HookMap#tapAsync(key,…) is deprecated. Use HookMap#for(key).tapAsync(…) instead.");

	HookMap.prototype.tapPromise = util.deprecate(function (key, options, fn) {
		return this.for(key).tapPromise(options, fn);
	}, "HookMap#tapPromise(key,…) is deprecated. Use HookMap#for(key).tapPromise(…) instead.");

	HookMap_1 = HookMap;
	return HookMap_1;
}

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var MultiHook_1;
var hasRequiredMultiHook;

function requireMultiHook () {
	if (hasRequiredMultiHook) return MultiHook_1;
	hasRequiredMultiHook = 1;

	requireHook();

	class MultiHook {
		constructor(hooks, name = undefined) {
			this.hooks = hooks;
			this.name = name;
		}

		tap(options, fn) {
			for (const hook of this.hooks) {
				hook.tap(options, fn);
			}
		}

		tapAsync(options, fn) {
			for (const hook of this.hooks) {
				hook.tapAsync(options, fn);
			}
		}

		tapPromise(options, fn) {
			for (const hook of this.hooks) {
				hook.tapPromise(options, fn);
			}
		}

		isUsed() {
			for (const hook of this.hooks) {
				if (hook.isUsed()) return true;
			}
			return false;
		}

		intercept(interceptor) {
			for (const hook of this.hooks) {
				hook.intercept(interceptor);
			}
		}

		withOptions(options) {
			return new MultiHook(
				this.hooks.map((h) => h.withOptions(options)),
				this.name
			);
		}
	}

	MultiHook_1 = MultiHook;
	return MultiHook_1;
}

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var hasRequiredLib;

function requireLib () {
	if (hasRequiredLib) return lib;
	hasRequiredLib = 1;

	lib.__esModule = true;
	lib.SyncHook = requireSyncHook();
	lib.SyncBailHook = requireSyncBailHook();
	lib.SyncWaterfallHook = requireSyncWaterfallHook();
	lib.SyncLoopHook = requireSyncLoopHook();
	lib.AsyncParallelHook = requireAsyncParallelHook();
	lib.AsyncParallelBailHook = requireAsyncParallelBailHook();
	lib.AsyncSeriesHook = requireAsyncSeriesHook();
	lib.AsyncSeriesBailHook = requireAsyncSeriesBailHook();
	lib.AsyncSeriesLoopHook = requireAsyncSeriesLoopHook();
	lib.AsyncSeriesWaterfallHook = requireAsyncSeriesWaterfallHook();
	lib.HookMap = requireHookMap();
	lib.MultiHook = requireMultiHook();
	return lib;
}

var libExports = requireLib();

class Car {
    hooks;
    constructor() {
        this.hooks = {
            accelerate: new libExports.SyncHook(['newSpeed']),
            brake: new libExports.SyncHook(['b']),
            calculateRoutes: new libExports.AsyncParallelHook(['source', 'target', 'routesList']),
        };
    }
}
const myCar = new Car();
console.log('myCar.hooks.accelerate', myCar.hooks.accelerate);
myCar.hooks.brake.tap('WarningLampPlugin', (a) => console.log('WarningLampPlugin', a));
myCar.hooks.brake.call('哈哈哈');
myCar.hooks.accelerate.tap('LoggerPlugin', (newSpeed) => console.log(`Accelerating to ${newSpeed}`));
myCar.hooks.accelerate.call('刘兴华');
