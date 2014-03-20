/**
 * math.js
 * https://github.com/josdejong/mathjs
 *
 * Math.js is an extensive math library for JavaScript and Node.js,
 * It features real and complex numbers, units, matrices, a large set of
 * mathematical functions, and a flexible expression parser.
 *
 * @version 0.18.1
 * @date    2014-02-15
 *
 * @license
 * Copyright (C) 2013-2014 Jos de Jong <wjosdejong@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

(function webpackUniversalModuleDefinition(root) {
	return function webpackUniversalModuleDefinitionWrapBootstrap(fn) {
		return function webpackUniversalModuleDefinitionBootstrap(modules) {
			if(typeof exports === 'object' && typeof module === 'object')
				module.exports = fn(modules);
			else if(typeof define === 'function' && define.amd)
				define(function() { return fn(modules); });
			else if(typeof exports === 'object')
				exports["mathjs"] = fn(modules);
			else
				root["mathjs"] = fn(modules);
		}
	}
})(this)
/******/ (function(modules) { // webpackBootstrap
/******/ 	// shortcut for better minimizing
/******/ 	var exports = "exports";
/******/ 	
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/ 	
/******/ 	// The require function
/******/ 	function require(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId][exports];
/******/ 		
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/ 		
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module[exports], module, module[exports], require);
/******/ 		
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 		
/******/ 		// Return the exports of the module
/******/ 		return module[exports];
/******/ 	}
/******/ 	
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	require.modules = modules;
/******/ 	
/******/ 	// expose the module cache
/******/ 	require.cache = installedModules;
/******/ 	
/******/ 	// __webpack_public_path__
/******/ 	require.p = "";
/******/ 	
/******/ 	
/******/ 	// Load entry module and return exports
/******/ 	return require(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, require) {

	module.exports = require(1);


/***/ },
/* 1 */
/***/ function(module, exports, require) {

	var object = require(2);

	/**
	 * math.js factory function.
	 *
	 * Usage:
	 *
	 *     var math = mathjs();
	 *     var math = mathjs(settings);
	 *
	 * @param {Object} [settings] Available settings:
	 *                            {String} matrix
	 *                              A string 'matrix' (default) or 'array'.
	 *                            {String} number
	 *                              A string 'number' (default) or 'bignumber'
	 *                            {Number} decimals
	 *                              The number of decimals behind the decimal
	 *                              point for BigNumber. Not applicable for Numbers.
	 */
	function mathjs (settings) {
	  // simple test for ES5 support
	  if (typeof Object.create !== 'function') {
	    throw new Error('ES5 not supported by this JavaScript engine. ' +
	        'Please load the es5-shim and es5-sham library for compatibility.');
	  }

	  // create new namespace
	  var math = {};

	  // create configuration settings. These are private
	  var _settings = {
	    // type of default matrix output. Choose 'matrix' (default) or 'array'
	    matrix: 'matrix',

	    // type of default number output. Choose 'number' (default) or 'bignumber'
	    number: 'number'
	  };

	  /**
	   * Set configuration settings for math.js, and get current settings
	   * @param {Object} [settings] Available settings:
	   *                            {String} matrix
	   *                              A string 'matrix' (default) or 'array'.
	   *                            {String} number
	   *                              A string 'number' (default) or 'bignumber'
	   *                            {Number} decimals
	   *                              The number of decimals behind the decimal
	   *                              point for BigNumber. Not applicable for Numbers.
	   * @return {Object} settings   The currently applied settings
	   */
	  math.config = function config (settings) {
	    var BigNumber = require(220);

	    if (settings) {
	      // merge settings
	      object.deepExtend(_settings, settings);

	      if (settings.decimals) {
	        BigNumber.config({
	          DECIMAL_PLACES: settings.decimals
	        });
	      }

	      // TODO: remove deprecated setting some day (deprecated since version 0.17.0)
	      if (settings.number && settings.number.defaultType) {
	        throw new Error('setting `number.defaultType` is deprecated. ' +
	            'Use `number` instead.')
	      }

	      // TODO: remove deprecated setting some day (deprecated since version 0.17.0)
	      if (settings.number && settings.number.precision) {
	        throw new Error('setting `number.precision` is deprecated. ' +
	            'Use `decimals` instead.')
	      }

	      // TODO: remove deprecated setting some day (deprecated since version 0.17.0)
	      if (settings.matrix && settings.matrix.defaultType) {
	        throw new Error('setting `matrix.defaultType` is deprecated. ' +
	            'Use `matrix` instead.')
	      }

	      // TODO: remove deprecated setting some day (deprecated since version 0.15.0)
	      if (settings.matrix && settings.matrix['default']) {
	        throw new Error('setting `matrix.default` is deprecated. ' +
	            'Use `matrix` instead.')
	      }
	    }

	    // return a clone of the settings
	    var current = object.clone(_settings);
	    current.decimals = BigNumber.config().DECIMAL_PLACES;
	    return current;
	  };

	  // apply provided configuration settings
	  math.config(settings);

	  // expression (parse, Parser, nodes, docs)
	  math.expression = {};
	  math.expression.node = require(3);
	  math.expression.parse = require(4);
	  math.expression.Scope = function () {
	    throw new Error('Scope is deprecated. Use a regular Object instead');
	  };
	  math.expression.Parser = require(5);
	  math.expression.docs = require(6);

	  // types (Matrix, Complex, Unit, ...)
	  math.type = {};
	  math.type.BigNumber = require(220);
	  math.type.Complex = require(7);
	  math.type.Range = require(8);
	  math.type.Index = require(9);
	  math.type.Matrix = require(10);
	  math.type.Unit = require(11);
	  math.type.Help = require(12);

	  math.collection = require(13);

	  // error utility functions
	  require(14)(math);

	  // expression parser
	  require(15)(math, _settings);
	  require(16)(math, _settings);
	  require(17)(math, _settings);
	  require(18)(math, _settings);

	  // functions - arithmetic
	  require(19)(math, _settings);
	  require(20)(math, _settings);
	  require(21)(math, _settings);
	  require(22)(math, _settings);
	  require(23)(math, _settings);
	  require(24)(math, _settings);
	  require(25)(math, _settings);
	  require(26)(math, _settings);
	  require(27)(math, _settings);
	  require(28)(math, _settings);
	  require(29)(math, _settings);
	  require(30)(math, _settings);
	  require(31)(math, _settings);
	  require(32)(math, _settings);
	  require(33)(math, _settings);
	  require(34)(math, _settings);
	  require(35)(math, _settings);
	  require(36)(math, _settings);
	  require(37)(math, _settings);
	  require(38)(math, _settings);
	  require(39)(math, _settings);
	  require(40)(math, _settings);
	  require(41)(math, _settings);
	  require(42)(math, _settings);
	  require(43)(math, _settings);
	  require(44)(math, _settings);
	  require(45)(math, _settings);
	  require(46)(math, _settings);
	  require(47)(math, _settings);
	  require(48)(math, _settings);
	  require(49)(math, _settings);

	  // functions - complex
	  require(50)(math, _settings);
	  require(51)(math, _settings);
	  require(52)(math, _settings);
	  require(53)(math, _settings);

	  // functions - construction
	  require(54)(math, _settings);
	  require(55)(math, _settings);
	  require(56)(math, _settings);
	  require(57)(math, _settings);
	  require(58)(math, _settings);
	  require(59)(math, _settings);
	  require(60)(math, _settings);
	  require(61)(math, _settings);
	  require(62)(math, _settings);
	  require(63)(math, _settings);

	  // functions - matrix
	  require(64)(math, _settings);
	  require(65)(math, _settings);
	  require(66)(math, _settings);
	  require(67)(math, _settings);
	  require(68)(math, _settings);
	  require(69)(math, _settings);
	  require(70)(math, _settings);
	  require(71)(math, _settings);
	  require(72)(math, _settings);
	  require(73)(math, _settings);
	  require(74)(math, _settings);
	  require(75)(math, _settings);
	  require(76)(math, _settings);

	  // functions - probability
	  require(77)(math, _settings);
	  require(78)(math, _settings);
	  require(79)(math, _settings);
	  require(80)(math, _settings);

	  // functions - statistics
	  require(81)(math, _settings);
	  require(82)(math, _settings);
	  require(83)(math, _settings);

	  // functions - trigonometry
	  require(84)(math, _settings);
	  require(85)(math, _settings);
	  require(86)(math, _settings);
	  require(87)(math, _settings);
	  require(88)(math, _settings);
	  require(89)(math, _settings);
	  require(90)(math, _settings);
	  require(91)(math, _settings);
	  require(92)(math, _settings);
	  require(93)(math, _settings);

	  // functions - units
	  require(94)(math, _settings);

	  // functions - utils
	  require(95)(math, _settings);
	  require(96)(math, _settings);
	  require(97)(math, _settings);
	  require(98)(math, _settings);
	  require(99)(math, _settings);
	  require(100)(math, _settings);
	  require(101)(math, _settings);

	  // constants
	  require(102)(math, _settings);

	  // selector (we initialize after all functions are loaded)
	  math.chaining = {};
	  math.chaining.Selector = require(103)(math, _settings);

	  // return the new instance
	  return math;
	}


	// return the mathjs factory
	module.exports = mathjs;


/***/ },
/* 2 */
/***/ function(module, exports, require) {

	/**
	 * Clone an object
	 *
	 *     clone(x)
	 *
	 * Can clone any primitive type, array, and object.
	 * If x has a function clone, this function will be invoked to clone the object.
	 *
	 * @param {*} x
	 * @return {*} clone
	 */
	exports.clone = function clone(x) {
	  var type = typeof x;

	  // immutable primitive types
	  if (type === 'number' || type === 'string' || type === 'boolean' ||
	      x === null || x === undefined) {
	    return x;
	  }

	  // use clone function of the object when available
	  if (typeof x.clone === 'function') {
	    return x.clone();
	  }

	  // array
	  if (Array.isArray(x)) {
	    return x.map(function (value) {
	      return clone(value);
	    });
	  }

	  // object
	  if (x instanceof Object) {
	    var m = {};
	    for (var key in x) {
	      if (x.hasOwnProperty(key)) {
	        m[key] = clone(x[key]);
	      }
	    }
	    return x;
	  }

	  // this should never happen
	  throw new TypeError('Cannot clone ' + x);
	};

	/**
	 * Extend object a with the properties of object b
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 */
	exports.extend = function extend (a, b) {
	  for (var prop in b) {
	    if (b.hasOwnProperty(prop)) {
	      a[prop] = b[prop];
	    }
	  }
	  return a;
	};

	/**
	 * Deep extend an object a with the properties of object b
	 * @param {Object} a
	 * @param {Object} b
	 * @returns {Object}
	 */
	exports.deepExtend = function deepExtend (a, b) {
	  for (var prop in b) {
	    if (b.hasOwnProperty(prop)) {
	      if (b[prop] && b[prop].constructor === Object) {
	        if (a[prop] === undefined) {
	          a[prop] = {};
	        }
	        if (a[prop].constructor === Object) {
	          deepExtend(a[prop], b[prop]);
	        }
	        else {
	          a[prop] = b[prop];
	        }
	      } else {
	        a[prop] = b[prop];
	      }
	    }
	  }
	  return a;
	};

	/**
	 * Deep test equality of all fields in two pairs of arrays or objects.
	 * @param {Array | Object} a
	 * @param {Array | Object} b
	 * @returns {boolean}
	 */
	exports.deepEqual = function deepEqual (a, b) {
	  var prop, i, len;
	  if (Array.isArray(a)) {
	    if (!Array.isArray(b)) {
	      return false;
	    }

	    if (a.length != b.length) {
	      return false;
	    }

	    for (i = 0, len = a.length; i < len; i++) {
	      if (!exports.deepEqual(a[i], b[i])) {
	        return false;
	      }
	    }
	    return true;
	  }
	  else if (a instanceof Object) {
	    if (Array.isArray(b) || !(b instanceof Object)) {
	      return false;
	    }

	    for (prop in a) {
	      if (a.hasOwnProperty(prop)) {
	        if (!exports.deepEqual(a[prop], b[prop])) {
	          return false;
	        }
	      }
	    }
	    for (prop in b) {
	      if (b.hasOwnProperty(prop)) {
	        if (!exports.deepEqual(a[prop], b[prop])) {
	          return false;
	        }
	      }
	    }
	    return true;
	  }
	  else {
	    return (a == b);
	  }
	};


/***/ },
/* 3 */
/***/ function(module, exports, require) {

	exports.ArrayNode = require(104);
	exports.AssignmentNode = require(105);
	exports.BlockNode = require(106);
	exports.ConstantNode = require(107);
	exports.IndexNode = require(108);
	exports.FunctionNode = require(109);
	exports.Node = require(110);
	exports.OperatorNode = require(111);
	exports.ParamsNode = require(112);
	exports.RangeNode = require(113);
	exports.SymbolNode = require(114);
	exports.UnitNode = require(115);
	exports.UpdateNode = require(116);


/***/ },
/* 4 */
/***/ function(module, exports, require) {

	var util = require(117),

	    toNumber = util.number.toNumber,
	    isString = util.string.isString,
	    isArray = Array.isArray,
	    type = util.types.type,

	    // types
	    Complex = require(7),
	    Matrix = require(10),
	    Unit = require(11),
	    collection = require(13),

	    // scope and nodes
	    ArrayNode = require(104),
	    AssignmentNode = require(105),
	    BlockNode = require(106),
	    ConstantNode = require(107),
	    FunctionNode = require(109),
	    IndexNode = require(108),
	    OperatorNode = require(111),
	    ParamsNode = require(112),
	    RangeNode = require(113),
	    SymbolNode = require(114),
	    UnitNode = require(115),
	    UpdateNode = require(116);

	/**
	 * Parse an expression. Returns a node tree, which can be evaluated by
	 * invoking node.eval();
	 *
	 * Syntax:
	 *
	 *     parse(expr)
	 *     parse(expr, nodes)
	 *     parse([expr1, expr2, expr3, ...])
	 *     parse([expr1, expr2, expr3, ...], nodes)
	 *
	 * Example:
	 *
	 *     var node = parse('sqrt(3^2 + 4^2)');
	 *     node.compile(math).eval(); // 5
	 *
	 *     var scope = {a:3, b:4}
	 *     var node = parse('a * b'); // 12
	 *     var code = node.compile(math);
	 *     code.eval(scope); // 12
	 *     scope.a = 5;
	 *     code.eval(scope); // 20
	 *
	 *     var nodes = math.parse(['a = 3', 'b = 4', 'a * b']);
	 *     nodes[2].compile(math).eval(); // 12
	 *
	 * @param {String | String[] | Matrix} expr
	 * @param {Object<String, Node>} [nodes]    An set of custom nodes
	 * @return {Node | Node[]} node
	 * @throws {Error}
	 */
	function parse (expr, nodes) {
	  if (arguments.length != 1 && arguments.length != 2) {
	    throw new SyntaxError('Wrong number of arguments: 1 or 2 expected');
	  }

	  // pass extra nodes
	  extra_nodes = (type(nodes) === 'object') ? nodes : {};

	  if (isString(expr)) {
	    // parse a single expression
	    expression = expr || '';
	    return parseStart();
	  }
	  else if (isArray(expr) || expr instanceof Matrix) {
	    // parse an array or matrix with expressions
	    return collection.deepMap(expr, function (elem) {
	      expression = elem || '';
	      return parseStart();
	    });
	  }
	  else {
	    // oops
	    throw new TypeError('String or matrix expected');
	  }
	}

	// token types enumeration
	var TOKENTYPE = {
	  NULL : 0,
	  DELIMITER : 1,
	  NUMBER : 2,
	  SYMBOL : 3,
	  UNKNOWN : 4
	};

	// map with all delimiters
	var DELIMITERS = {
	  ',': true,
	  '(': true,
	  ')': true,
	  '[': true,
	  ']': true,
	  '\"': true,
	  '\n': true,
	  ';': true,

	  '+': true,
	  '-': true,
	  '*': true,
	  '.*': true,
	  '/': true,
	  './': true,
	  '%': true,
	  '^': true,
	  '.^': true,
	  '!': true,
	  '\'': true,
	  '=': true,
	  ':': true,

	  '==': true,
	  '!=': true,
	  '<': true,
	  '>': true,
	  '<=': true,
	  '>=': true
	};

	// map with all named delimiters
	var NAMED_DELIMITERS = {
	  'mod': true,
	  'to': true,
	  'in': true
	};

	var extra_nodes = {};             // current extra nodes
	var expression = '';              // current expression
	var index = 0;                    // current index in expr
	var c = '';                       // current token character in expr
	var token = '';                   // current token
	var token_type = TOKENTYPE.NULL;  // type of the token

	/**
	 * Get the first character from the expression.
	 * The character is stored into the char c. If the end of the expression is
	 * reached, the function puts an empty string in c.
	 * @private
	 */
	function first() {
	  index = 0;
	  c = expression.charAt(0);
	}

	/**
	 * Get the next character from the expression.
	 * The character is stored into the char c. If the end of the expression is
	 * reached, the function puts an empty string in c.
	 * @private
	 */
	function next() {
	  index++;
	  c = expression.charAt(index);
	}

	/**
	 * Preview the next character from the expression.
	 * @return {String} cNext
	 * @private
	 */
	function nextPreview() {
	  return expression.charAt(index + 1);
	}

	/**
	 * Get next token in the current string expr.
	 * The token and token type are available as token and token_type
	 * @private
	 */
	function getToken() {
	  token_type = TOKENTYPE.NULL;
	  token = '';

	  // skip over whitespaces
	  while (c == ' ' || c == '\t') {  // space, tab
	    // TODO: also take '\r' carriage return as newline? Or does that give problems on mac?
	    next();
	  }

	  // skip comment
	  if (c == '#') {
	    while (c != '\n' && c != '') {
	      next();
	    }
	  }

	  // check for end of expression
	  if (c == '') {
	    // token is still empty
	    token_type = TOKENTYPE.DELIMITER;
	    return;
	  }

	  // check for delimiters consisting of 2 characters
	  var c2 = c + nextPreview();
	  if (DELIMITERS[c2]) {
	    token_type = TOKENTYPE.DELIMITER;
	    token = c2;
	    next();
	    next();
	    return;
	  }

	  // check for delimiters consisting of 1 character
	  if (DELIMITERS[c]) {
	    token_type = TOKENTYPE.DELIMITER;
	    token = c;
	    next();
	    return;
	  }

	  // check for a number
	  if (isDigitDot(c)) {
	    token_type = TOKENTYPE.NUMBER;

	    // get number, can have a single dot
	    if (c == '.') {
	      token += c;
	      next();

	      if (!isDigit(c)) {
	        // this is no legal number, it is just a dot
	        token_type = TOKENTYPE.UNKNOWN;
	      }
	    }
	    else {
	      while (isDigit(c)) {
	        token += c;
	        next();
	      }
	      if (c == '.') {
	        token += c;
	        next();
	      }
	    }
	    while (isDigit(c)) {
	      token += c;
	      next();
	    }

	    // check for exponential notation like "2.3e-4" or "1.23e50"
	    if (c == 'E' || c == 'e') {
	      token += c;
	      next();

	      if (c == '+' || c == '-') {
	        token += c;
	        next();
	      }

	      // Scientific notation MUST be followed by an exponent
	      if (!isDigit(c)) {
	        // this is no legal number, exponent is missing.
	        token_type = TOKENTYPE.UNKNOWN;
	      }

	      while (isDigit(c)) {
	        token += c;
	        next();
	      }
	    }

	    return;
	  }

	  // check for variables, functions, named operators
	  if (isAlpha(c)) {
	    while (isAlpha(c) || isDigit(c)) {
	      token += c;
	      next();
	    }

	    if (NAMED_DELIMITERS[token]) {
	      token_type = TOKENTYPE.DELIMITER;
	    }
	    else {
	      token_type = TOKENTYPE.SYMBOL;
	    }

	    return;
	  }

	  // something unknown is found, wrong characters -> a syntax error
	  token_type = TOKENTYPE.UNKNOWN;
	  while (c != '') {
	    token += c;
	    next();
	  }
	  throw createSyntaxError('Syntax error in part "' + token + '"');
	}

	/**
	 * Skip newline tokens
	 */
	function skipNewlines () {
	  while (token == '\n') {
	    getToken();
	  }
	}

	/**
	 * Check if a given name is valid
	 * if not, an error is thrown
	 * @param {String} name
	 * @return {boolean} valid
	 * @private
	 */
	  // TODO: check for valid symbol name
	function isValidSymbolName (name) {
	  for (var i = 0, iMax = name.length; i < iMax; i++) {
	    var c = name.charAt(i);
	    //var valid = (isAlpha(c) || (i > 0 && isDigit(c))); // TODO: allow digits in symbol name
	    var valid = (isAlpha(c));
	    if (!valid) {
	      return false;
	    }
	  }

	  return true;
	}

	/**
	 * checks if the given char c is a letter (upper or lower case)
	 * or underscore
	 * @param {String} c   a string with one character
	 * @return {Boolean}
	 * @private
	 */
	function isAlpha (c) {
	  return ((c >= 'a' && c <= 'z') ||
	      (c >= 'A' && c <= 'Z') ||
	      c == '_');
	}

	/**
	 * checks if the given char c is a digit or dot
	 * @param {String} c   a string with one character
	 * @return {Boolean}
	 * @private
	 */
	function isDigitDot (c) {
	  return ((c >= '0' && c <= '9') ||
	      c == '.');
	}

	/**
	 * checks if the given char c is a digit
	 * @param {String} c   a string with one character
	 * @return {Boolean}
	 * @private
	 */
	function isDigit (c) {
	  return ((c >= '0' && c <= '9'));
	}

	/**
	 * Start of the parse levels below, in order of precedence
	 * @return {Node} node
	 * @private
	 */
	function parseStart () {
	  // get the first character in expression
	  first();

	  getToken();

	  var node;
	  if (token == '') {
	    // empty expression
	    node = new ConstantNode('undefined', 'undefined');
	  }
	  else {
	    node = parseBlock();
	  }

	  // check for garbage at the end of the expression
	  // an expression ends with a empty character '' and token_type DELIMITER
	  if (token != '') {
	    if (token_type == TOKENTYPE.DELIMITER) {
	      // user entered a not existing operator like "//"

	      // TODO: give hints for aliases, for example with "<>" give as hint " did you mean != ?"
	      throw createError('Unknown operator ' + token);
	    }
	    else {
	      throw createSyntaxError('Unexpected part "' + token + '"');
	    }
	  }

	  return node;
	}

	/**
	 * Parse a block with expressions. Expressions can be separated by a newline
	 * character '\n', or by a semicolon ';'. In case of a semicolon, no output
	 * of the preceding line is returned.
	 * @return {Node} node
	 * @private
	 */
	function parseBlock () {
	  var node, block, visible;

	  if (token != '\n' && token != ';' && token != '') {
	    node = parseAns();
	  }

	  while (token == '\n' || token == ';') {
	    if (!block) {
	      // initialize the block
	      block = new BlockNode();
	      if (node) {
	        visible = (token != ';');
	        block.add(node, visible);
	      }
	    }

	    getToken();
	    if (token != '\n' && token != ';' && token != '') {
	      node = parseAns();

	      visible = (token != ';');
	      block.add(node, visible);
	    }
	  }

	  if (block) {
	    return block;
	  }

	  if (!node) {
	    node = parseAns();
	  }

	  return node;
	}

	/**
	 * Parse assignment of ans.
	 * Ans is assigned when the expression itself is no variable or function
	 * assignment
	 * @return {Node} node
	 * @private
	 */
	function parseAns () {
	  var expression = parseFunctionAssignment();

	  // create a variable definition for ans
	  var name = 'ans';
	  return new AssignmentNode(name, expression);
	}

	/**
	 * Parse a function assignment like "function f(a,b) = a*b"
	 * @return {Node} node
	 * @private
	 */
	function parseFunctionAssignment () {
	  // TODO: function assignment using keyword 'function' is deprecated since version 0.18.0, cleanup some day
	  if (token_type == TOKENTYPE.SYMBOL && token == 'function') {
	    throw new Error('Deprecated keyword "function". ' +
	        'Functions can now be assigned without it, like "f(x) = x^2".');
	  }

	  return parseAssignment();
	}

	/**
	 * Assignment of a variable, can be a variable like "a=2.3" or a updating an
	 * existing variable like "matrix(2,3:5)=[6,7,8]"
	 * @return {Node} node
	 * @private
	 */
	function parseAssignment () {
	  var name, args, expr;

	  var node = parseRange();

	  if (token == '=') {
	    if (node instanceof SymbolNode) {
	      // parse a variable assignment like 'a = 2/3'
	      name = node.name;
	      getToken();
	      expr = parseAssignment();
	      return new AssignmentNode(name, expr);
	    }
	    else if (node instanceof IndexNode) {
	      // parse a matrix subset assignment like 'A[1,2] = 4'
	      getToken();
	      expr = parseAssignment();
	      return new UpdateNode(node, expr);
	    }
	    else if (node instanceof ParamsNode) {
	      // parse function assignment like 'f(x) = x^2'
	      var valid = true;
	      args = [];
	      if (node.object instanceof SymbolNode) {
	        name = node.object.name;
	        node.params.forEach(function (param, index) {
	          if (param instanceof SymbolNode) {
	            args[index] = param.name;
	          }
	          else {
	            valid = false;
	          }
	        });
	      }
	      else {
	        valid = false;
	      }

	      if (valid) {
	        getToken();
	        expr = parseAssignment();
	        return new FunctionNode(name, args, expr);
	      }
	    }

	    throw createSyntaxError('Invalid left hand side of assignment operator =');
	  }

	  return node;
	}

	/**
	 * parse range, "start:end", "start:step:end", ":", "start:", ":end", etc
	 * @return {Node} node
	 * @private
	 */
	function parseRange () {
	  var node, params = [];

	  if (token == ':') {
	    // implicit start=1 (one-based)
	    node = new ConstantNode('number', '1');
	  }
	  else {
	    // explicit start
	    node = parseBitwiseConditions();
	  }

	  if (token == ':') {
	    params.push(node);

	    // parse step and end
	    while (token == ':') {
	      getToken();
	      if (token == ')' || token == ']' || token == ',' || token == '') {
	        // implicit end
	        params.push(new SymbolNode('end'));
	      }
	      else {
	        // explicit end
	        params.push(parseBitwiseConditions());
	      }
	    }

	    if (params.length) {
	      // swap step and end
	      if (params.length == 3) {
	        var step = params[2];
	        params[2] = params[1];
	        params[1] = step;
	      }
	      node = new RangeNode(params);
	    }
	  }

	  return node;
	}

	/**
	 * conditional operators and bitshift
	 * @return {Node} node
	 * @private
	 */
	function parseBitwiseConditions () {
	  var node = parseComparison();

	  /* TODO: implement bitwise conditions
	   var operators = {
	   '&' : 'bitwiseand',
	   '|' : 'bitwiseor',
	   // todo: bitwise xor?
	   '<<': 'bitshiftleft',
	   '>>': 'bitshiftright'
	   };
	   while (token in operators) {
	   var name = token;

	   getToken();
	   var params = [node, parseComparison()];
	   node = new OperatorNode(name, fn, params);
	   }
	   */

	  return node;
	}

	/**
	 * comparison operators
	 * @return {Node} node
	 * @private
	 */
	function parseComparison () {
	  var node, operators, name, fn, params;

	  node = parseConditions();

	  operators = {
	    '==': 'equal',
	    '!=': 'unequal',
	    '<': 'smaller',
	    '>': 'larger',
	    '<=': 'smallereq',
	    '>=': 'largereq'
	  };
	  while (token in operators) {
	    name = token;
	    fn = operators[name];

	    getToken();
	    params = [node, parseConditions()];
	    node = new OperatorNode(name, fn, params);
	  }

	  return node;
	}

	/**
	 * conditions like and, or, in
	 * @return {Node} node
	 * @private
	 */
	function parseConditions () {
	  var node, operators, name, fn, params;

	  node = parseAddSubtract();

	  // TODO: precedence of And above Or?
	  // TODO: implement a method for unit to number conversion
	  operators = {
	    'to' : 'to',
	    'in' : 'to'   // alias of to
	    /* TODO: implement conditions
	     'and' : 'and',
	     '&&' : 'and',
	     'or': 'or',
	     '||': 'or',
	     'xor': 'xor'
	     */
	  };

	  while (token in operators) {
	    name = token;
	    fn = operators[name];

	    getToken();
	    params = [node, parseAddSubtract()];
	    node = new OperatorNode(name, fn, params);
	  }

	  return node;
	}

	/**
	 * add or subtract
	 * @return {Node} node
	 * @private
	 */
	function parseAddSubtract ()  {
	  var node, operators, name, fn, params;

	  node = parseMultiplyDivide();

	  operators = {
	    '+': 'add',
	    '-': 'subtract'
	  };
	  while (token in operators) {
	    name = token;
	    fn = operators[name];

	    getToken();
	    params = [node, parseMultiplyDivide()];
	    node = new OperatorNode(name, fn, params);
	  }

	  return node;
	}

	/**
	 * multiply, divide, modulus
	 * @return {Node} node
	 * @private
	 */
	function parseMultiplyDivide () {
	  var node, operators, name, fn, params;

	  node = parseUnit();

	  operators = {
	    '*': 'multiply',
	    '.*': 'emultiply',
	    '/': 'divide',
	    './': 'edivide',
	    '%': 'mod',
	    'mod': 'mod'
	  };

	  while (token in operators) {
	    name = token;
	    fn = operators[name];

	    getToken();
	    params = [node, parseUnit()];
	    node = new OperatorNode(name, fn, params);
	  }

	  return node;
	}

	/**
	 * parse units like in '2i', '2 cm'
	 * @return {Node} node
	 * @private
	 */
	function parseUnit() {
	  var node, symbol;

	  node = parseUnary();

	  if (token_type == TOKENTYPE.SYMBOL || token == 'in') {
	    // note unit 'in' (inch) is also a conversion operator
	    symbol = token;

	    getToken();

	    node = new UnitNode(node, symbol);
	  }

	  return node;
	}

	/**
	 * Unary minus
	 * @return {Node} node
	 * @private
	 */
	function parseUnary () {
	  var name, fn, params;

	  if (token == '-') {
	    name = token;
	    fn = 'unary';
	    getToken();
	    params = [parseUnary()];

	    return new OperatorNode(name, fn, params);
	  }

	  return parsePow();
	}

	/**
	 * power
	 * Note: power operator is right associative
	 * @return {Node} node
	 * @private
	 */
	function parsePow () {
	  var node, leftNode, nodes, ops, name, fn, params;

	  nodes = [
	    parseLeftHandOperators()
	  ];
	  ops = [];

	  // stack all operands of a chained power operator (like '2^3^3')
	  while (token == '^' || token == '.^') {
	    ops.push(token);
	    getToken();
	    nodes.push(parseLeftHandOperators());
	  }

	  // evaluate the operands from right to left (right associative)
	  node = nodes.pop();
	  while (nodes.length) {
	    leftNode = nodes.pop();
	    name = ops.pop();
	    fn = (name == '^') ? 'pow' : 'epow';
	    params = [leftNode, node];
	    node = new OperatorNode(name, fn, params);
	  }

	  return node;
	}

	/**
	 * Left hand operators: factorial x!, transpose x'
	 * @return {Node} node
	 * @private
	 */
	function parseLeftHandOperators ()  {
	  var node, operators, name, fn, params;

	  node = parseCustomNodes();

	  operators = {
	    '!': 'factorial',
	    '\'': 'transpose'
	  };

	  while (token in operators) {
	    name = token;
	    fn = operators[name];

	    getToken();
	    params = [node];

	    node = new OperatorNode(name, fn, params);
	  }

	  return node;
	}

	/**
	 * Parse a custom node handler. A node handler can be used to process
	 * nodes in a custom way, for example for handling a plot.
	 *
	 * A handler must be passed as second argument of the parse function.
	 * - must extend math.expression.node.Node
	 * - must contain a function _compile(defs: Object) : String
	 * - must contain a function find(filter: Object) : Node[]
	 * - must contain a function toString() : String
	 * - the constructor is called with a single argument containing all parameters
	 *
	 * For example:
	 *
	 *     nodes = {
	 *       'plot': PlotHandler
	 *     };
	 *
	 * The constructor of the handler is called as:
	 *
	 *     node = new PlotHandler(params);
	 *
	 * The handler will be invoked when evaluating an expression like:
	 *
	 *     node = math.parse('plot(sin(x), x)', nodes);
	 *
	 * @return {Node} node
	 * @private
	 */
	function parseCustomNodes () {
	  var params, handler;

	  if (token_type == TOKENTYPE.SYMBOL && extra_nodes[token]) {
	    handler = extra_nodes[token];

	    getToken();

	    // parse parameters
	    if (token == '(') {
	      params = [];

	      getToken();

	      if (token != ')') {
	        params.push(parseRange());

	        // parse a list with parameters
	        while (token == ',') {
	          getToken();

	          params.push(parseRange());
	        }
	      }

	      if (token != ')') {
	        throw createSyntaxError('Parenthesis ) expected');
	      }
	      getToken();
	    }

	    // create a new node handler
	    //noinspection JSValidateTypes
	    return new handler(params);
	  }

	  return parseSymbol();
	}

	/**
	 * parse symbols: functions, variables, constants, units
	 * @return {Node} node
	 * @private
	 */
	function parseSymbol () {
	  var node, name;

	  if (token_type == TOKENTYPE.SYMBOL ||
	      (token_type == TOKENTYPE.DELIMITER && token in NAMED_DELIMITERS)) {
	    name = token;

	    getToken();

	    // create a symbol
	    node = new SymbolNode(name);

	    // parse parameters
	    return parseParams(node);
	  }

	  return parseString();
	}

	/**
	 * parse parameters, enclosed in parenthesis. Can be two types:
	 * - round brackets (...) will return a ParamsNode
	 * - square brackets [...] will return an IndexNode
	 * @param {Node} node    Node on which to apply the parameters. If there
	 *                       are no parameters in the expression, the node
	 *                       itself is returned
	 * @return {Node} node
	 * @private
	 */
	function parseParams (node) {
	  var bracket, params;

	  while (token == '(' || token == '[') {
	    bracket = token;
	    params = [];

	    getToken();

	    if (token != ')' && token != ']') {
	      params.push(parseRange());

	      // parse a list with parameters
	      while (token == ',') {
	        getToken();
	        params.push(parseRange());
	      }
	    }

	    if ((bracket == '(' && token != ')')) {
	      throw createSyntaxError('Parenthesis ) expected');
	    }
	    if ((bracket == '[' && token != ']')) {
	      throw createSyntaxError('Parenthesis ] expected');
	    }
	    getToken();

	    if (bracket == '(') {
	      node = new ParamsNode(node, params);
	    }
	    else {
	      node = new IndexNode(node, params);
	    }
	  }

	  return node;
	}

	/**
	 * parse a string.
	 * A string is enclosed by double quotes
	 * @return {Node} node
	 * @private
	 */
	function parseString () {
	  var node, str, tPrev;

	  if (token == '"') {
	    // string "..."
	    str = '';
	    tPrev = '';
	    while (c != '' && (c != '\"' || tPrev == '\\')) { // also handle escape character
	      str += c;
	      tPrev = c;
	      next();
	    }

	    getToken();
	    if (token != '"') {
	      throw createSyntaxError('End of string " expected');
	    }
	    getToken();

	    // create constant
	    node = new ConstantNode('string', str);

	    // parse parameters
	    node = parseParams(node);

	    return node;
	  }

	  return parseMatrix();
	}

	/**
	 * parse the matrix
	 * @return {Node} node
	 * @private
	 */
	function parseMatrix () {
	  var array, params, rows, cols;

	  if (token == '[') {
	    // matrix [...]
	    getToken();
	    skipNewlines();

	    if (token != ']') {
	      // this is a non-empty matrix
	      var row = parseRow();

	      if (token == ';') {
	        // 2 dimensional array
	        rows = 1;
	        params = [row];

	        // the rows of the matrix are separated by dot-comma's
	        while (token == ';') {
	          getToken();
	          skipNewlines();

	          params[rows] = parseRow();
	          rows++;

	          skipNewlines();
	        }

	        if (token != ']') {
	          throw createSyntaxError('End of matrix ] expected');
	        }
	        getToken();

	        // check if the number of columns matches in all rows
	        cols = (params.length > 0) ? params[0].length : 0;
	        for (var r = 1; r < rows; r++) {
	          if (params[r].length != cols) {
	            throw createError('Number of columns must match ' +
	                '(' + params[r].length + ' != ' + cols + ')');
	          }
	        }

	        array = new ArrayNode(params);
	      }
	      else {
	        // 1 dimensional vector
	        if (token != ']') {
	          throw createSyntaxError('End of matrix ] expected');
	        }
	        getToken();

	        array = row;
	      }
	    }
	    else {
	      // this is an empty matrix "[ ]"
	      getToken();
	      array = new ArrayNode([]);
	    }

	    // parse parameters
	    array = parseParams(array);

	    return array;
	  }

	  return parseNumber();
	}

	/**
	 * Parse a single comma-separated row from a matrix, like 'a, b, c'
	 * @return {ArrayNode} node
	 */
	function parseRow () {
	  var params = [parseAssignment()];
	  var len = 1;

	  while (token == ',') {
	    getToken();
	    skipNewlines();

	    // parse expression
	    params[len] = parseAssignment();
	    len++;

	    skipNewlines();
	  }

	  return new ArrayNode(params);
	}

	/**
	 * parse a number
	 * @return {Node} node
	 * @private
	 */
	function parseNumber () {
	  var node, complex, number;

	  if (token_type == TOKENTYPE.NUMBER) {
	    // this is a number
	    number = token == '.' ? '0': token;
	    getToken();

	    if (token == 'i' || token == 'I') {
	      // create a complex number
	      getToken();
	      node = new ConstantNode('complex', number);
	    }
	    else {
	      // a number
	      node = new ConstantNode('number', number);
	    }

	    // parse parameters
	    node = parseParams(node);

	    return node;
	  }

	  return parseParentheses();
	}

	/**
	 * parentheses
	 * @return {Node} node
	 * @private
	 */
	function parseParentheses () {
	  var node;

	  // check if it is a parenthesized expression
	  if (token == '(') {
	    // parentheses (...)
	    getToken();
	    node = parseAssignment(); // start again

	    if (token != ')') {
	      throw createSyntaxError('Parenthesis ) expected');
	    }
	    getToken();

	    /* TODO: implicit multiplication?
	     // TODO: how to calculate a=3; 2/2a ? is this (2/2)*a or 2/(2*a) ?
	     // check for implicit multiplication
	     if (token_type == TOKENTYPE.SYMBOL) {
	     node = multiply(node, parsePow());
	     }
	     //*/

	    // parse parameters
	    node = parseParams(node);

	    return node;
	  }

	  return parseEnd();
	}

	/**
	 * Evaluated when the expression is not yet ended but expected to end
	 * @return {Node} res
	 * @private
	 */
	function parseEnd () {
	  if (token == '') {
	    // syntax error or unexpected end of expression
	    throw createSyntaxError('Unexpected end of expression');
	  } else {
	    throw createSyntaxError('Value expected');
	  }
	}

	/**
	 * Shortcut for getting the current row value (one based)
	 * Returns the line of the currently handled expression
	 * @private
	 */
	function row () {
	  // TODO: also register row number during parsing
	  return undefined;
	}

	/**
	 * Shortcut for getting the current col value (one based)
	 * Returns the column (position) where the last token starts
	 * @private
	 */
	function col () {
	  return index - token.length + 1;
	}

	/**
	 * Build up an error message
	 * @param {String} message
	 * @return {String} message with row and column information
	 * @private
	 */
	function createErrorMessage (message) {
	  var r = row();
	  var c = col();
	  if (r === undefined) {
	    if (c === undefined) {
	      return message;
	    } else {
	      return message + ' (char ' + c + ')';
	    }
	  } else {
	    return message + ' (line ' + r + ', char ' + c + ')';
	  }
	}

	/**
	 * Create an error
	 * @param {String} message
	 * @return {SyntaxError} instantiated error
	 * @private
	 */
	function createSyntaxError (message) {
	  return new SyntaxError(createErrorMessage(message));
	}

	/**
	 * Create an error
	 * @param {String} message
	 * @return {Error} instantiated error
	 * @private
	 */
	function createError (message) {
	  return new Error(createErrorMessage(message));
	}

	module.exports = parse;


/***/ },
/* 5 */
/***/ function(module, exports, require) {

	var _parse = require(4);

	/**
	 * @constructor Parser
	 * Parser contains methods to evaluate or parse expressions, and has a number
	 * of convenience methods to get, set, and remove variables from memory. Parser
	 * keeps a scope containing variables in memory, which is used for all
	 * evaluations.
	 *
	 * Methods:
	 *    var result = parser.eval(expr);    // evaluate an expression
	 *    var value = parser.get(name);      // retrieve a variable from the parser
	 *    parser.set(name, value);           // set a variable in the parser
	 *    parser.remove(name);               // clear a variable from the
	 *                                       // parsers scope
	 *    parser.clear();                    // clear the parsers scope
	 *
	 *    // it is possible to parse an expression into a node tree:
	 *    var node = parser.parse(expr);     // parse an expression into a node tree
	 *    var code = node.compile(math);     // compile a node tree into javascript
	 *                                       // code
	 *    var code = parser.compile(expr);   // parse and compile an expression into
	 *                                       // javascript code. Equivalent of
	 *                                       // parser.parse(expr).compile(math)
	 *
	 *    // A compiled expression can be evaluated as
	 *    var result = code.eval([scope]);   // scope is an optional object
	 *
	 * Example usage:
	 *    var parser = new Parser(math);
	 *    // Note: there is a convenience method which can be used instead:
	 *    // var parser = new math.parser();
	 *
	 *    // evaluate expressions
	 *    parser.eval('sqrt(3^2 + 4^2)');         // 5
	 *    parser.eval('sqrt(-4)');                // 2i
	 *    parser.eval('2 inch in cm');            // 5.08 cm
	 *    parser.eval('cos(45 deg)');             // 0.7071067811865476
	 *
	 *    // define variables and functions
	 *    parser.eval('x = 7 / 2');               // 3.5
	 *    parser.eval('x + 3');                   // 6.5
	 *    parser.eval('function f(x, y) = x^y');  // f(x, y)
	 *    parser.eval('f(2, 3)');                 // 8
	 *
	 *    // get and set variables and functions
	 *    var x = parser.get('x');                // 7
	 *    var f = parser.get('f');                // function
	 *    var g = f(3, 2);                        // 9
	 *    parser.set('h', 500);
	 *    var i = parser.eval('h / 2');           // 250
	 *    parser.set('hello', function (name) {
	 *        return 'hello, ' + name + '!';
	 *    });
	 *    parser.eval('hello("user")');           // "hello, user!"
	 *
	 *    // clear defined functions and variables
	 *    parser.clear();
	 *
	 *
	 * @param {Object} math     Link to the math.js namespace
	 */
	function Parser(math) {
	  if (!(this instanceof Parser)) {
	    throw new SyntaxError(
	        'Parser constructor must be called with the new operator');
	  }

	  if (typeof math !== 'object') {
	    throw new TypeError('Object expected as parameter math');
	  }

	  this.math = math;
	  this.scope = {};
	}

	/**
	 * Parse an expression and return the parsed function node.
	 * The node tree can be compiled via `code = node.compile(math)`,
	 * and the compiled code can be executed as `code.eval([scope])`
	 * @param {String} expr
	 * @return {Node} node
	 * @throws {Error}
	 */
	Parser.prototype.parse = function (expr) {
	  // TODO: validate arguments
	  return _parse(expr);
	};

	/**
	 * Parse and compile an expression, return the compiled javascript code.
	 * The node can be evaluated via code.eval([scope])
	 * @param {String} expr
	 * @return {{eval: function}} code
	 * @throws {Error}
	 */
	Parser.prototype.compile = function (expr) {
	  // TODO: validate arguments
	  return _parse(expr).compile(this.math);
	};

	/**
	 * Parse and evaluate the given expression
	 * @param {String} expr   A string containing an expression, for example "2+3"
	 * @return {*} result     The result, or undefined when the expression was empty
	 * @throws {Error}
	 */
	Parser.prototype.eval = function (expr) {
	  // TODO: validate arguments
	  return _parse(expr)
	      .compile(this.math)
	      .eval(this.scope);
	};

	/**
	 * Get a variable (a function or variable) by name from the parsers scope.
	 * Returns undefined when not found
	 * @param {String} name
	 * @return {* | undefined} value
	 */
	Parser.prototype.get = function (name) {
	  // TODO: validate arguments
	  return this.scope[name];
	};

	/**
	 * Set a symbol (a function or variable) by name from the parsers scope.
	 * @param {String} name
	 * @param {* | undefined} value
	 */
	Parser.prototype.set = function (name, value) {
	  // TODO: validate arguments
	  return this.scope[name] = value;
	};

	/**
	 * Remove a variable from the parsers scope
	 * @param {String} name
	 */
	Parser.prototype.remove = function (name) {
	  // TODO: validate arguments
	  delete this.scope[name];
	};

	/**
	 * Clear the scope with variables and functions
	 */
	Parser.prototype.clear = function () {
	  for (var name in this.scope) {
	    if (this.scope.hasOwnProperty(name)) {
	      delete this.scope[name];
	    }
	  }
	};

	module.exports = Parser;


/***/ },
/* 6 */
/***/ function(module, exports, require) {

	// constants
	exports.e = require(118);
	exports.E = require(118);
	exports['false'] = require(119);
	exports.i = require(120);
	exports['Infinity'] = require(121);
	exports.LN2 = require(122);
	exports.LN10 = require(123);
	exports.LOG2E = require(124);
	exports.LOG10E = require(125);
	exports.NaN = require(126);
	exports.pi = require(127);
	exports.PI = require(127);
	exports.SQRT1_2 = require(128);
	exports.SQRT2 = require(129);
	exports.tau = require(130);
	exports['true'] = require(131);

	// functions - arithmetic
	exports.abs = require(132);
	exports.add = require(133);
	exports.ceil = require(134);
	exports.cube = require(135);
	exports.divide = require(136);
	exports.edivide = require(137);
	exports.emultiply = require(138);
	exports.epow = require(139);
	exports.equal = require(140);
	exports.exp = require(141);
	exports.fix = require(142);
	exports.floor = require(143);
	exports.gcd = require(144);
	exports.larger = require(145);
	exports.largereq = require(146);
	exports.lcm = require(147);
	exports.log = require(148);
	exports.log10 = require(149);
	exports.mod = require(150);
	exports.multiply = require(151);
	exports.pow = require(152);
	exports.round = require(153);
	exports.sign = require(154);
	exports.smaller = require(155);
	exports.smallereq = require(156);
	exports.sqrt = require(157);
	exports.square = require(158);
	exports.subtract = require(159);
	exports.unary = require(160);
	exports.unequal = require(161);
	exports.xgcd = require(162);

	// functions - complex
	exports.arg = require(163);
	exports.conj = require(164);
	exports.re = require(165);
	exports.im = require(166);

	// functions - construction
	exports.bignumber = require(167);
	exports['boolean'] = require(168);
	exports.complex = require(169);
	exports.index = require(170);
	exports.matrix = require(171);
	exports.number = require(172);
	exports.string = require(173);
	exports.unit = require(174);

	// functions - epxression
	exports['eval'] =  require(175);
	exports.help =  require(176);

	// functions - matrix
	exports.concat = require(177);
	exports.det = require(178);
	exports.diag = require(179);
	exports.eye = require(180);
	exports.inv = require(181);
	exports.ones = require(182);
	exports.range = require(183);
	exports.resize = require(184);
	exports.size = require(185);
	exports.squeeze = require(186);
	exports.subset = require(187);
	exports.transpose = require(188);
	exports.zeros = require(189);

	// functions - probability
	exports.combinations = require(190);
	exports.distribution = require(191);
	exports.factorial = require(192);
	exports.permutations = require(193);
	exports.pickRandom = require(194);
	exports.random = require(195);
	exports.randomInt = require(196);

	// functions - statistics
	exports.min = require(197);
	exports.mean = require(198);
	exports.max = require(199);

	// functions - trigonometry
	exports.acos = require(200);
	exports.asin = require(201);
	exports.atan = require(202);
	exports.atan2 = require(203);
	exports.cos = require(204);
	exports.cot = require(205);
	exports.csc = require(206);
	exports.sec = require(207);
	exports.sin = require(208);
	exports.tan = require(209);

	// functions - units
	exports.to = require(210);

	// functions - utils
	exports.clone =  require(211);
	exports.map =  require(212);
	exports.forEach =  require(213);
	exports.format =  require(214);
	// exports.print =  require('./function/utils/print'); // TODO: add documentation for print as soon as the parser supports objects.
	exports['import'] =  require(215);
	exports['typeof'] =  require(216);


/***/ },
/* 7 */
/***/ function(module, exports, require) {

	var util = require(117),
	    number = util.number,

	    isNumber = util.number.isNumber,
	    isString = util.string.isString;

	/**
	 * @constructor Complex
	 *
	 * A complex value can be constructed in the following ways:
	 *     var a = new Complex();
	 *     var b = new Complex(re, im);
	 *     var c = Complex.parse(str);
	 *
	 * Example usage:
	 *     var a = new Complex(3, -4);      // 3 - 4i
	 *     a.re = 5;                        // a = 5 - 4i
	 *     var i = a.im;                    // -4;
	 *     var b = Complex.parse('2 + 6i'); // 2 + 6i
	 *     var c = new Complex();           // 0 + 0i
	 *     var d = math.add(a, b);          // 5 + 2i
	 *
	 * @param {Number} re       The real part of the complex value
	 * @param {Number} [im]     The imaginary part of the complex value
	 */
	function Complex(re, im) {
	  if (!(this instanceof Complex)) {
	    throw new SyntaxError(
	        'Complex constructor must be called with the new operator');
	  }

	  switch (arguments.length) {
	    case 0:
	      this.re = 0;
	      this.im = 0;
	      break;

	    case 2:
	      if (!isNumber(re) || !isNumber(im)) {
	        throw new TypeError('Two numbers expected in Complex constructor');
	      }
	      this.re = re;
	      this.im = im;
	      break;

	    default:
	      if (arguments.length != 0 && arguments.length != 2) {
	        throw new SyntaxError(
	            'Two or zero arguments expected in Complex constructor');
	      }
	      break;
	  }
	}

	/**
	 * Test whether value is a Complex value
	 * @param {*} value
	 * @return {Boolean} isComplex
	 */
	Complex.isComplex = function isComplex(value) {
	  return (value instanceof Complex);
	};

	// private variables and functions for the parser
	var text, index, c;

	function skipWhitespace() {
	  while (c == ' ' || c == '\t') {
	    next();
	  }
	}

	function isDigitDot (c) {
	  return ((c >= '0' && c <= '9') || c == '.');
	}

	function isDigit (c) {
	  return ((c >= '0' && c <= '9'));
	}

	function next() {
	  index++;
	  c = text.charAt(index);
	}

	function revert(oldIndex) {
	  index = oldIndex;
	  c = text.charAt(index);
	}

	function parseNumber () {
	  var number = '';
	  var oldIndex;
	  oldIndex = index;

	  if (c == '+') {
	    next();
	  }
	  else if (c == '-') {
	    number += c;
	    next();
	  }

	  if (!isDigitDot(c)) {
	    // a + or - must be followed by a digit
	    revert(oldIndex);
	    return null;
	  }

	  // get number, can have a single dot
	  if (c == '.') {
	    number += c;
	    next();
	    if (!isDigit(c)) {
	      // this is no legal number, it is just a dot
	      revert(oldIndex);
	      return null;
	    }
	  }
	  else {
	    while (isDigit(c)) {
	      number += c;
	      next();
	    }
	    if (c == '.') {
	      number += c;
	      next();
	    }
	  }
	  while (isDigit(c)) {
	    number += c;
	    next();
	  }

	  // check for exponential notation like "2.3e-4" or "1.23e50"
	  if (c == 'E' || c == 'e') {
	    number += c;
	    next();

	    if (c == '+' || c == '-') {
	      number += c;
	      next();
	    }

	    // Scientific notation MUST be followed by an exponent
	    if (!isDigit(c)) {
	      // this is no legal number, exponent is missing.
	      revert(oldIndex);
	      return null;
	    }

	    while (isDigit(c)) {
	      number += c;
	      next();
	    }
	  }

	  return number;
	}

	function parseComplex () {
	  // check for 'i', '-i', '+i'
	  var cnext = text.charAt(index + 1);
	  if (c == 'I' || c == 'i') {
	    next();
	    return '1';
	  }
	  else if ((c == '+' || c == '-') && (cnext == 'I' || cnext == 'i')) {
	    var number = (c == '+') ? '1' : '-1';
	    next();
	    next();
	    return number;
	  }

	  return null;
	}

	/**
	 * Parse a complex number from a string. For example Complex.parse("2 + 3i")
	 * will return a Complex value where re = 2, im = 3.
	 * Returns null if provided string does not contain a valid complex number.
	 * @param {String} str
	 * @returns {Complex | null} complex
	 */
	Complex.parse = function parse (str) {
	  text = str;
	  index = -1;
	  c = '';

	  if (!isString(text)) {
	    return null;
	  }

	  next();
	  skipWhitespace();
	  var first = parseNumber();
	  if (first) {
	    if (c == 'I' || c == 'i') {
	      // pure imaginary number
	      next();
	      skipWhitespace();
	      if (c) {
	        // garbage at the end. not good.
	        return null;
	      }

	      return new Complex(0, Number(first));
	    }
	    else {
	      // complex and real part
	      skipWhitespace();
	      var separator = c;
	      if (separator != '+' && separator != '-') {
	        // pure real number
	        skipWhitespace();
	        if (c) {
	          // garbage at the end. not good.
	          return null;
	        }

	        return new Complex(Number(first), 0);
	      }
	      else {
	        // complex and real part
	        next();
	        skipWhitespace();
	        var second = parseNumber();
	        if (second) {
	          if (c != 'I' && c != 'i') {
	            // 'i' missing at the end of the complex number
	            return null;
	          }
	          next();
	        }
	        else {
	          second = parseComplex();
	          if (!second) {
	            // imaginary number missing after separator
	            return null;
	          }
	        }

	        if (separator == '-') {
	          if (second[0] == '-') {
	            second =  '+' + second.substring(1);
	          }
	          else {
	            second = '-' + second;
	          }
	        }

	        next();
	        skipWhitespace();
	        if (c) {
	          // garbage at the end. not good.
	          return null;
	        }

	        return new Complex(Number(first), Number(second));
	      }
	    }
	  }
	  else {
	    // check for 'i', '-i', '+i'
	    first = parseComplex();
	    if (first) {
	      skipWhitespace();
	      if (c) {
	        // garbage at the end. not good.
	        return null;
	      }

	      return new Complex(0, Number(first));
	    }
	  }

	  return null;
	};

	/**
	 * Create a copy of the complex value
	 * @return {Complex} clone
	 */
	Complex.prototype.clone = function clone () {
	  return new Complex(this.re, this.im);
	};

	/**
	 * Test whether this complex number equals an other complex value.
	 * Two complex numbers are equal when both their real and imaginary parts
	 * are equal.
	 * @param {Complex} other
	 * @return {boolean} isEqual
	 */
	Complex.prototype.equals = function equals (other) {
	  return (this.re === other.re) && (this.im === other.im);
	};

	/**
	 * Get a string representation of the complex number,
	 * with optional formatting options.
	 * @param {Object | Number | Function} [options]  Formatting options. See
	 *                                                lib/util/number:format for a
	 *                                                description of the available
	 *                                                options.
	 * @return {String} str
	 */
	Complex.prototype.format = function format (options) {
	  var str = '',
	      strRe = number.format(this.re, options),
	      strIm = number.format(this.im, options);

	  if (this.im == 0) {
	    // real value
	    str = strRe;
	  }
	  else if (this.re == 0) {
	    // purely complex value
	    if (this.im == 1) {
	      str = 'i';
	    }
	    else if (this.im == -1) {
	      str = '-i';
	    }
	    else {
	      str = strIm + 'i';
	    }
	  }
	  else {
	    // complex value
	    if (this.im > 0) {
	      if (this.im == 1) {
	        str = strRe + ' + i';
	      }
	      else {
	        str = strRe + ' + ' + strIm + 'i';
	      }
	    }
	    else {
	      if (this.im == -1) {
	        str = strRe + ' - i';
	      }
	      else {
	        str = strRe + ' - ' + strIm.substring(1) + 'i';
	      }
	    }
	  }

	  return str;
	};

	/**
	 * Get a string representation of the complex number.
	 * @return {String} str
	 */
	Complex.prototype.toString = function toString () {
	  return this.format();
	};

	// exports
	module.exports = Complex;

	// to trick my IDE which doesn't get it
	exports.isComplex = Complex.isComplex;
	exports.parse = Complex.parse;


/***/ },
/* 8 */
/***/ function(module, exports, require) {

	var util = require(117),

	    number = util.number,
	    string = util.string,
	    array = util.array;

	/**
	 * @constructor Range
	 * Create a range. A range has a start, step, and end, and contains functions
	 * to iterate over the range.
	 *
	 * A range can be constructed as:
	 *     var range = new Range(start, end);
	 *     var range = new Range(start, end, step);
	 *
	 * To get the result of the range:
	 *     range.forEach(function (x) {
	 *         console.log(x);
	 *     });
	 *     range.map(function (x) {
	 *         return math.sin(x);
	 *     });
	 *     range.toArray();
	 *
	 * Example usage:
	 *     var c = new Range(2, 6);         // 2:1:5
	 *     c.toArray();                     // [2, 3, 4, 5]
	 *     var d = new Range(2, -3, -1);    // 2:-1:-2
	 *     d.toArray();                     // [2, 1, 0, -1, -2]
	 *
	 * @param {Number} start  included lower bound
	 * @param {Number} end    excluded upper bound
	 * @param {Number} [step] step size, default value is 1
	 */
	function Range(start, end, step) {
	  if (!(this instanceof Range)) {
	    throw new SyntaxError(
	        'Range constructor must be called with the new operator');
	  }

	  if (start != null && !number.isNumber(start)) {
	    throw new TypeError('Parameter start must be a number');
	  }
	  if (end != null && !number.isNumber(end)) {
	    throw new TypeError('Parameter end must be a number');
	  }
	  if (step != null && !number.isNumber(step)) {
	    throw new TypeError('Parameter step must be a number');
	  }

	  this.start = (start != null) ? parseFloat(start) : 0;
	  this.end   = (end != null) ? parseFloat(end) : 0;
	  this.step  = (step != null) ? parseFloat(step) : 1;
	}

	/**
	 * Parse a string into a range,
	 * The string contains the start, optional step, and end, separated by a colon.
	 * If the string does not contain a valid range, null is returned.
	 * For example str='0:2:11'.
	 * @param {String} str
	 * @return {Range | null} range
	 */
	Range.parse = function parse (str) {
	  if (!string.isString(str)) {
	    return null;
	  }

	  var args = str.split(':');
	  var nums = args.map(function (arg) {
	    return parseFloat(arg);
	  });

	  var invalid = nums.some(function (num) {
	    return isNaN(num);
	  });
	  if(invalid) {
	    return null;
	  }

	  switch (nums.length) {
	    case 2: return new Range(nums[0], nums[1]);
	    case 3: return new Range(nums[0], nums[2], nums[1]);
	    default: return null;
	  }
	};

	/**
	 * Create a clone of the range
	 * @return {Range} clone
	 */
	Range.prototype.clone = function clone() {
	  return new Range(this.start, this.end, this.step);
	};

	/**
	 * Test whether an object is a Range
	 * @param {*} object
	 * @return {Boolean} isRange
	 */
	Range.isRange = function isRange(object) {
	  return (object instanceof Range);
	};

	/**
	 * Retrieve the size of the range.
	 * Returns an array containing one number, the number of elements in the range.
	 * @returns {Number[]} size
	 */
	Range.prototype.size = function size() {
	  var len = 0,
	      start = this.start,
	      step = this.step,
	      end = this.end,
	      diff = end - start;

	  if (number.sign(step) == number.sign(diff)) {
	    len = Math.ceil((diff) / step);
	  }
	  else if (diff == 0) {
	    len = 0;
	  }

	  if (isNaN(len)) {
	    len = 0;
	  }
	  return [len];
	};

	/**
	 * Calculate the minimum value in the range
	 * @return {Number | undefined} min
	 */
	Range.prototype.min = function min () {
	  var size = this.size()[0];

	  if (size > 0) {
	    if (this.step > 0) {
	      // positive step
	      return this.start;
	    }
	    else {
	      // negative step
	      return this.start + (size - 1) * this.step;
	    }
	  }
	  else {
	    return undefined;
	  }
	};

	/**
	 * Calculate the maximum value in the range
	 * @return {Number | undefined} max
	 */
	Range.prototype.max = function max () {
	  var size = this.size()[0];

	  if (size > 0) {
	    if (this.step > 0) {
	      // positive step
	      return this.start + (size - 1) * this.step;
	    }
	    else {
	      // negative step
	      return this.start;
	    }
	  }
	  else {
	    return undefined;
	  }
	};


	/**
	 * Execute a callback function for each value in the range.
	 * @param {function} callback   The callback method is invoked with three
	 *                              parameters: the value of the element, the index
	 *                              of the element, and the Matrix being traversed.
	 */
	Range.prototype.forEach = function forEach(callback) {
	  var x = this.start;
	  var step = this.step;
	  var end = this.end;
	  var i = 0;

	  if (step > 0) {
	    while (x < end) {
	      callback(x, i, this);
	      x += step;
	      i++;
	    }
	  }
	  else if (step < 0) {
	    while (x > end) {
	      callback(x, i, this);
	      x += step;
	      i++;
	    }
	  }
	};

	/**
	 * Execute a callback function for each value in the Range, and return the
	 * results as an array
	 * @param {function} callback   The callback method is invoked with three
	 *                              parameters: the value of the element, the index
	 *                              of the element, and the Matrix being traversed.
	 * @returns {Array} array
	 */
	Range.prototype.map = function map(callback) {
	  var array = [];
	  this.forEach(function (value, index, obj) {
	    array[index] = callback(value, index, obj);
	  });
	  return array;
	};

	/**
	 * Create an Array with a copy of the Ranges data
	 * @returns {Array} array
	 */
	Range.prototype.toArray = function toArray() {
	  var array = [];
	  this.forEach(function (value, index) {
	    array[index] = value;
	  });
	  return array;
	};

	/**
	 * Get the primitive value of the Range, a one dimensional array
	 * @returns {Array} array
	 */
	Range.prototype.valueOf = function valueOf() {
	  // TODO: implement a caching mechanism for range.valueOf()
	  return this.toArray();
	};

	/**
	 * Get a string representation of the range, with optional formatting options.
	 * Output is formatted as 'start:step:end', for example '2:6' or '0:0.2:11'
	 * @param {Object | Number | Function} [options]  Formatting options. See
	 *                                                lib/util/number:format for a
	 *                                                description of the available
	 *                                                options.
	 * @returns {String} str
	 */
	Range.prototype.format = function format(options) {
	  var str = number.format(this.start, options);

	  if (this.step != 1) {
	    str += ':' + number.format(this.step, options);
	  }
	  str += ':' + number.format(this.end, options);
	  return str;
	};

	/**
	 * Get a string representation of the range.
	 * @returns {String}
	 */
	Range.prototype.toString = function toString() {
	  return this.format();
	};

	// exports
	module.exports = Range;

	// to trick my IDE which doesn't get it
	exports.isRange = Range.isRange;
	exports.parse = Range.parse;


/***/ },
/* 9 */
/***/ function(module, exports, require) {

	var util = require(117),

	    Range = require(8),

	    number = util.number,

	    isNumber = number.isNumber,
	    isInteger = number.isInteger,
	    isArray = Array.isArray,
	    validateIndex = util.array.validateIndex;

	/**
	 * @Constructor Index
	 * Create an index. An Index can store ranges having start, step, and end
	 * for multiple dimensions.
	 * Matrix.get, Matrix.set, and math.subset accept an Index as input.
	 *
	 * Usage:
	 *     var index = new Index(range1, range2, ...);
	 *
	 * Where each range can be any of:
	 *     An array [start, end]
	 *     An array [start, end, step]
	 *     A number
	 *     An instance of Range
	 *
	 * The parameters start, end, and step must be integer numbers.
	 *
	 * @param {...*} ranges
	 */
	function Index(ranges) {
	  if (!(this instanceof Index)) {
	    throw new SyntaxError(
	        'Index constructor must be called with the new operator');
	  }

	  this._ranges = [];

	  for (var i = 0, ii = arguments.length; i < ii; i++) {
	    var arg = arguments[i];

	    if (arg instanceof Range) {
	      this._ranges.push(arg);
	    }
	    else {
	      if (arg) {
	        arg = arg.valueOf();
	      }

	      if (isArray(arg)) {
	        this._ranges.push(_createRange(arg));
	      }
	      else if (isNumber(arg)) {
	        this._ranges.push(_createRange([arg, arg + 1]));
	      }
	      // TODO: implement support for wildcard '*'
	      else {
	        throw new TypeError('Range expected as Array, Number, or String');
	      }
	    }
	  }
	}

	/**
	 * Parse an argument into a range and validate the range
	 * @param {Array} arg  An array with [start: Number, end: Number] and
	 *                     optional a third element step:Number
	 * @return {Range} range
	 * @private
	 */
	function _createRange(arg) {
	  // TODO: make function _createRange simpler/faster

	  // test whether all arguments are integers
	  var num = arg.length;
	  for (var i = 0; i < num; i++) {
	    if (!isNumber(arg[i]) || !isInteger(arg[i])) {
	      throw new TypeError('Index parameters must be integer numbers');
	    }
	  }

	  switch (arg.length) {
	    case 2:
	      return new Range(arg[0], arg[1]); // start, end
	    case 3:
	      return new Range(arg[0], arg[1], arg[2]); // start, end, step
	    default:
	      // TODO: improve error message
	      throw new SyntaxError('Wrong number of arguments in Index (2 or 3 expected)');
	  }
	}

	/**
	 * Create a clone of the index
	 * @return {Index} clone
	 */
	Index.prototype.clone = function clone () {
	  var index = new Index();
	  index._ranges = util.object.clone(this._ranges);
	  return index;
	};

	/**
	 * Test whether an object is an Index
	 * @param {*} object
	 * @return {Boolean} isIndex
	 */
	Index.isIndex = function isIndex(object) {
	  return (object instanceof Index);
	};

	/**
	 * Create an index from an array with ranges/numbers
	 * @param {Array.<Array | Number>} ranges
	 * @return {Index} index
	 * @private
	 */
	Index.create = function create(ranges) {
	  var index = new Index();
	  Index.apply(index, ranges);
	  return index;
	};

	/**
	 * Retrieve the size of the index, the number of elements for each dimension.
	 * @returns {Number[]} size
	 */
	Index.prototype.size = function size () {
	  var size = [];

	  for (var i = 0, ii = this._ranges.length; i < ii; i++) {
	    var range = this._ranges[i];

	    size[i] = range.size()[0];
	  }

	  return size;
	};

	/**
	 * Get the maximum value for each of the indexes ranges.
	 * @returns {Number[]} max
	 */
	Index.prototype.max = function max () {
	  var values = [];

	  for (var i = 0, ii = this._ranges.length; i < ii; i++) {
	    var range = this._ranges[i];
	    values[i] = range.max();
	  }

	  return values;
	};

	/**
	 * Get the minimum value for each of the indexes ranges.
	 * @returns {Number[]} min
	 */
	Index.prototype.min = function min () {
	  var values = [];

	  for (var i = 0, ii = this._ranges.length; i < ii; i++) {
	    var range = this._ranges[i];

	    values[i] = range.min();
	  }

	  return values;
	};

	/**
	 * Loop over each of the ranges of the index
	 * @param {function} callback   Called for each range with a Range as first
	 *                              argument, the dimension as second, and the
	 *                              index object as third.
	 */
	Index.prototype.forEach = function forEach(callback) {
	  for (var i = 0, ii = this._ranges.length; i < ii; i++) {
	    callback(this._ranges[i], i, this);
	  }
	};

	/**
	 * Retrieve the range for a given dimension number from the index
	 * @param {Number} dim                  Number of the dimension
	 * @returns {Range | undefined} range
	 */
	Index.prototype.range = function range (dim) {
	  return this._ranges[dim];
	};

	/**
	 * Test whether this index contains only a single value
	 * @return {boolean} isScalar
	 */
	Index.prototype.isScalar = function isScalar () {
	  var size = this.size();

	  for (var i = 0, ii = size.length; i < ii; i++) {
	    if (size[i] !== 1) {
	      return false;
	    }
	  }

	  return true;
	};

	/**
	 * Expand the Index into an array.
	 * For example new Index([0,3], [2,7]) returns [[0,1,2], [2,3,4,5,6]]
	 * @returns {Array} array
	 */
	Index.prototype.toArray = function toArray() {
	  var array = [];
	  for (var i = 0, ii = this._ranges.length; i < ii; i++) {
	    var range = this._ranges[i],
	        row = [],
	        x = range.start,
	        end = range.end,
	        step = range.step;

	    if (step > 0) {
	      while (x < end) {
	        row.push(x);
	        x += step;
	      }
	    }
	    else if (step < 0) {
	      while (x > end) {
	        row.push(x);
	        x += step;
	      }
	    }

	    array.push(row);
	  }

	  return array;
	};

	/**
	 * Get the primitive value of the Index, a two dimensional array.
	 * Equivalent to Index.toArray().
	 * @returns {Array} array
	 */
	Index.prototype.valueOf = Index.prototype.toArray;

	/**
	 * Get the string representation of the index, for example '[2:6]' or '[0:2:10, 4:7]'
	 * @returns {String} str
	 */
	Index.prototype.toString = function () {
	  var strings = [];

	  for (var i = 0, ii = this._ranges.length; i < ii; i++) {
	    var range = this._ranges[i];
	    var str = number.format(range.start);
	    if (range.step != 1) {
	      str += ':' + number.format(range.step);
	    }
	    str += ':' + number.format(range.end);
	    strings.push(str);
	  }

	  return '[' + strings.join(',') + ']';
	};

	// exports
	module.exports = Index;

	// to trick my IDE which doesn't get it
	exports.isIndex = Index.isIndex;
	exports.create = Index.create;


/***/ },
/* 10 */
/***/ function(module, exports, require) {

	var util = require(117),
	    Index = require(9),

	    number = util.number,
	    string = util.string,
	    array = util.array,
	    object = util.object,

	    isArray = Array.isArray,
	    validateIndex = array.validateIndex;

	/**
	 * @constructor Matrix
	 *
	 * A Matrix is a wrapper around an Array. A matrix can hold a multi dimensional
	 * array. A matrix can be constructed as:
	 *     var matrix = new Matrix(data)
	 *
	 * Matrix contains the functions to resize, get and set values, get the size,
	 * clone the matrix and to convert the matrix to a vector, array, or scalar.
	 * Furthermore, one can iterate over the matrix using map and forEach.
	 * The internal Array of the Matrix can be accessed using the function valueOf.
	 *
	 * Example usage:
	 *     var matrix = new Matrix([[1, 2], [3, 4]);
	 *     matix.size();              // [2, 2]
	 *     matrix.resize([3, 2], 5);
	 *     matrix.valueOf();          // [[1, 2], [3, 4], [5, 5]]
	 *     matrix.subset([1,2])       // 3 (indexes are zero-based)
	 *
	 * @param {Array | Matrix} [data]    A multi dimensional array
	 */
	function Matrix(data) {
	  if (!(this instanceof Matrix)) {
	    throw new SyntaxError(
	        'Matrix constructor must be called with the new operator');
	  }

	  if (data instanceof Matrix) {
	    // clone data from a Matrix
	    this._data = data.clone()._data;
	  }
	  else if (isArray(data)) {
	    // use array
	    // replace nested Matrices with Arrays
	    this._data = preprocess(data);
	  }
	  else if (data != null) {
	    // unsupported type
	    throw new TypeError('Unsupported type of data (' + util.types.type(data) + ')');
	  }
	  else {
	    // nothing provided
	    this._data = [];
	  }

	  // verify the size of the array
	  this._size = array.size(this._data);
	}

	/**
	 * Test whether an object is a Matrix
	 * @param {*} object
	 * @return {Boolean} isMatrix
	 */
	Matrix.isMatrix = function isMatrix(object) {
	  return (object instanceof Matrix);
	};

	/**
	 * Get a subset of the matrix, or replace a subset of the matrix.
	 *
	 * Usage:
	 *     var subset = matrix.subset(index)               // retrieve subset
	 *     var value = matrix.subset(index, replacement)   // replace subset
	 *
	 * @param {Index} index
	 * @param {Array | Matrix | *} [replacement]
	 * @param {*} [defaultValue]        Default value, filled in on new entries when
	 *                                  the matrix is resized. If not provided,
	 *                                  new matrix elements will be left undefined.
	 */
	Matrix.prototype.subset = function subset(index, replacement, defaultValue) {
	  switch (arguments.length) {
	    case 1:
	      return _get(this, index);

	    // intentional fall through
	    case 2:
	    case 3:
	      return _set(this, index, replacement, defaultValue);

	    default:
	      throw new SyntaxError('Wrong number of arguments');
	  }
	};

	/**
	 * Get a single element from the matrix.
	 * @param {Number[]} index   Zero-based index
	 * @return {*} value
	 */
	Matrix.prototype.get = function get(index) {
	  if (!isArray(index)) {
	    throw new Error('Array expected');
	  }
	  if (index.length != this._size.length) {
	    throw new RangeError('Dimension mismatch ' +
	        '(' + index.length + ' != ' + this._size.length + ')');
	  }

	  var data = this._data;
	  for (var i = 0, ii = index.length; i < ii; i++) {
	    var index_i = index[i];
	    validateIndex(index_i, data.length);
	    data = data[index_i];
	  }

	  return object.clone(data);
	};

	/**
	 * Replace a single element in the matrix.
	 * @param {Number[]} index   Zero-based index
	 * @param {*} value
	 * @param {*} [defaultValue]        Default value, filled in on new entries when
	 *                                  the matrix is resized. If not provided,
	 *                                  new matrix elements will be left undefined.
	 * @return {Matrix} self
	 */
	Matrix.prototype.set = function set (index, value, defaultValue) {
	  var i, ii;

	  // validate input type and dimensions
	  if (!isArray(index)) {
	    throw new Error('Array expected');
	  }
	  if (index.length < this._size.length) {
	    throw new RangeError('Dimension mismatch ' +
	        '(' + index.length + ' < ' + this._size.length + ')');
	  }

	  // enlarge matrix when needed
	  var size = index.map(function (i) {
	    return i + 1;
	  });
	  _fit(this, size, defaultValue);

	  // traverse over the dimensions
	  var data = this._data;
	  for (i = 0, ii = index.length - 1; i < ii; i++) {
	    var index_i = index[i];
	    validateIndex(index_i, data.length);
	    data = data[index_i];
	  }

	  // set new value
	  index_i = index[index.length - 1];
	  validateIndex(index_i, data.length);
	  data[index_i] = value;

	  return this;
	};

	/**
	 * Get a submatrix of this matrix
	 * @param {Matrix} matrix
	 * @param {Index} index   Zero-based index
	 * @private
	 */
	function _get (matrix, index) {
	  if (!(index instanceof Index)) {
	    throw new TypeError('Invalid index');
	  }

	  var isScalar = index.isScalar();
	  if (isScalar) {
	    // return a scalar
	    return matrix.get(index.min());
	  }
	  else {
	    // validate dimensions
	    var size = index.size();
	    if (size.length != matrix._size.length) {
	      throw new RangeError('Dimension mismatch ' +
	          '(' + size.length + ' != ' + matrix._size.length + ')');
	    }

	    // retrieve submatrix
	    var submatrix = new Matrix(_getSubmatrix(matrix._data, index, size.length, 0));
	    // TODO: more efficient when creating an empty matrix and setting _data and _size manually

	    // squeeze matrix output
	    while (isArray(submatrix._data) && submatrix._data.length == 1) {
	      submatrix._data = submatrix._data[0];
	      submatrix._size.shift();
	    }

	    return submatrix;
	  }
	}

	/**
	 * Recursively get a submatrix of a multi dimensional matrix.
	 * Index is not checked for correct number of dimensions.
	 * @param {Array} data
	 * @param {Index} index
	 * @param {number} dims   Total number of dimensions
	 * @param {number} dim    Current dimension
	 * @return {Array} submatrix
	 * @private
	 */
	function _getSubmatrix (data, index, dims, dim) {
	  var last = (dim == dims - 1);
	  var range = index.range(dim);

	  if (last) {
	    return range.map(function (i) {
	      validateIndex(i, data.length);
	      return data[i];
	    });
	  }
	  else {
	    return range.map(function (i) {
	      validateIndex(i, data.length);
	      var child = data[i];
	      return _getSubmatrix(child, index, dims, dim + 1);
	    });
	  }
	}

	/**
	 * Replace a submatrix in this matrix
	 * Indexes are zero-based.
	 * @param {Matrix} matrix
	 * @param {Index} index
	 * @param {Matrix | Array | *} submatrix
	 * @param {*} [defaultValue]        Default value, filled in on new entries when
	 *                                  the matrix is resized. If not provided,
	 *                                  new matrix elements will be left undefined.
	 * @return {Matrix} matrix
	 * @private
	 */
	function _set (matrix, index, submatrix, defaultValue) {
	  if (!(index instanceof Index)) {
	    throw new TypeError('Invalid index');
	  }

	  // get index size and check whether the index contains a single value
	  var iSize = index.size(),
	      isScalar = index.isScalar();

	  // calculate the size of the submatrix, and convert it into an Array if needed
	  var sSize;
	  if (submatrix instanceof Matrix) {
	    sSize = submatrix.size();
	    submatrix = submatrix.valueOf();
	  }
	  else {
	    sSize = array.size(submatrix);
	  }

	  if (isScalar) {
	    // set a scalar

	    // check whether submatrix is a scalar
	    if (sSize.length != 0) {
	      throw new TypeError('Scalar value expected');
	    }

	    matrix.set(index.min(), submatrix, defaultValue);
	  }
	  else {
	    // set a submatrix

	    // validate dimensions
	    if (iSize.length < matrix._size.length) {
	      throw new RangeError('Dimension mismatch ' +
	          '(' + iSize.length + ' < ' + matrix._size.length + ')');
	    }

	    // unsqueeze the submatrix when needed
	    for (var i = 0, ii = iSize.length - sSize.length; i < ii; i++) {
	      submatrix = [submatrix];
	      sSize.unshift(1);
	    }

	    // check whether the size of the submatrix matches the index size
	    if (!object.deepEqual(iSize, sSize)) {
	      throw new RangeError('Dimensions mismatch ' +
	          '(' + string.format(iSize) + ' != '+ string.format(sSize) + ')');
	    }

	    // enlarge matrix when needed
	    var size = index.max().map(function (i) {
	      return i + 1;
	    });
	    _fit(matrix, size, defaultValue);

	    // insert the sub matrix
	    var dims = iSize.length,
	        dim = 0;
	    _setSubmatrix (matrix._data, index, submatrix, dims, dim);
	  }

	  return matrix;
	}

	/**
	 * Replace a submatrix of a multi dimensional matrix.
	 * @param {Array} data
	 * @param {Index} index
	 * @param {Array} submatrix
	 * @param {number} dims   Total number of dimensions
	 * @param {number} dim
	 * @private
	 */
	function _setSubmatrix (data, index, submatrix, dims, dim) {
	  var last = (dim == dims - 1),
	      range = index.range(dim);

	  if (last) {
	    range.forEach(function (dataIndex, subIndex) {
	      validateIndex(dataIndex);
	      data[dataIndex] = submatrix[subIndex];
	    });
	  }
	  else {
	    range.forEach(function (dataIndex, subIndex) {
	      validateIndex(dataIndex);
	      _setSubmatrix(data[dataIndex], index, submatrix[subIndex], dims, dim + 1);
	    });
	  }
	}

	/**
	 * Resize the matrix
	 * @param {Number[]} size
	 * @param {*} [defaultValue]        Default value, filled in on new entries.
	 *                                  If not provided, the matrix elements will
	 *                                  be left undefined.
	 * @return {Matrix} self            The matrix itself is returned
	 */
	Matrix.prototype.resize = function resize(size, defaultValue) {
	  this._size = object.clone(size);
	  this._data = array.resize(this._data, this._size, defaultValue);

	  // return the matrix itself
	  return this;
	};

	/**
	 * Enlarge the matrix when it is smaller than given size.
	 * If the matrix is larger or equal sized, nothing is done.
	 * @param {Matrix} matrix           The matrix to be resized
	 * @param {Number[]} size
	 * @param {*} [defaultValue]        Default value, filled in on new entries.
	 *                                  If not provided, the matrix elements will
	 *                                  be left undefined.
	 * @private
	 */
	function _fit(matrix, size, defaultValue) {
	  if (!isArray(size)) {
	    throw new Error('Array expected');
	  }

	  var newSize = object.clone(matrix._size),
	      changed = false;

	  // add dimensions when needed
	  while (newSize.length < size.length) {
	    newSize.unshift(0);
	    changed = true;
	  }

	  // enlarge size when needed
	  for (var i = 0, ii = size.length; i < ii; i++) {
	    if (size[i] > newSize[i]) {
	      newSize[i] = size[i];
	      changed = true;
	    }
	  }

	  if (changed) {
	    // resize only when size is changed
	    matrix.resize(newSize, defaultValue);
	  }
	}

	/**
	 * Create a clone of the matrix
	 * @return {Matrix} clone
	 */
	Matrix.prototype.clone = function clone() {
	  var matrix = new Matrix();
	  matrix._data = object.clone(this._data);
	  matrix._size = object.clone(this._size);
	  return matrix;
	};

	/**
	 * Retrieve the size of the matrix.
	 * @returns {Number[]} size
	 */
	Matrix.prototype.size = function size() {
	  return this._size;
	};

	/**
	 * Create a new matrix with the results of the callback function executed on
	 * each entry of the matrix.
	 * @param {function} callback   The callback function is invoked with three
	 *                              parameters: the value of the element, the index
	 *                              of the element, and the Matrix being traversed.
	 * @return {Matrix} matrix
	 */
	Matrix.prototype.map = function map(callback) {
	  var me = this;
	  var matrix = new Matrix();
	  var index = [];
	  var recurse = function (value, dim) {
	    if (isArray(value)) {
	      return value.map(function (child, i) {
	        index[dim] = i;
	        return recurse(child, dim + 1);
	      });
	    }
	    else {
	      return callback(value, index, me);
	    }
	  };
	  matrix._data = recurse(this._data, 0);
	  matrix._size = object.clone(this._size);

	  return matrix;
	};

	/**
	 * Execute a callback function on each entry of the matrix.
	 * @param {function} callback   The callback function is invoked with three
	 *                              parameters: the value of the element, the index
	 *                              of the element, and the Matrix being traversed.
	 */
	Matrix.prototype.forEach = function forEach(callback) {
	  var me = this;
	  var index = [];
	  var recurse = function (value, dim) {
	    if (isArray(value)) {
	      value.forEach(function (child, i) {
	        index[dim] = i;
	        recurse(child, dim + 1);
	      });
	    }
	    else {
	      callback(value, index, me);
	    }
	  };
	  recurse(this._data, 0);
	};

	/**
	 * Create an Array with a copy of the data of the Matrix
	 * @returns {Array} array
	 */
	Matrix.prototype.toArray = function toArray() {
	  return object.clone(this._data);
	};

	/**
	 * Get the primitive value of the Matrix: a multidimensional array
	 * @returns {Array} array
	 */
	Matrix.prototype.valueOf = function valueOf() {
	  return this._data;
	};

	/**
	 * Get a string representation of the matrix, with optional formatting options.
	 * @param {Object | Number | Function} [options]  Formatting options. See
	 *                                                lib/util/number:format for a
	 *                                                description of the available
	 *                                                options.
	 * @returns {String} str
	 */
	Matrix.prototype.format = function format(options) {
	  return string.format(this._data, options);
	};

	/**
	 * Get a string representation of the matrix
	 * @returns {String} str
	 */
	Matrix.prototype.toString = function toString() {
	  return string.format(this._data);
	};

	/**
	 * Preprocess data, which can be an Array or Matrix with nested Arrays and
	 * Matrices. Replaces all nested Matrices with Arrays
	 * @param {Array} data
	 * @return {Array} data
	 */
	function preprocess(data) {
	  for (var i = 0, ii = data.length; i < ii; i++) {
	    var elem = data[i];
	    if (isArray(elem)) {
	      data[i] = preprocess(elem);
	    }
	    else if (elem instanceof Matrix) {
	      data[i] = preprocess(elem._data);
	    }
	  }

	  return data;
	}

	// exports
	module.exports = Matrix;

	// to trick my IDE which doesn't get it
	exports.isMatrix = Matrix.isMatrix;


/***/ },
/* 11 */
/***/ function(module, exports, require) {

	var util = require(117),

	    number = util.number,
	    string = util.string,
	    isNumber = util.number.isNumber,
	    isString = util.string.isString;

	/**
	 * @constructor Unit
	 *
	 * A unit can be constructed in the following ways:
	 *     var a = new Unit(value, unit);
	 *     var b = new Unit(null, unit);
	 *     var c = Unit.parse(str);
	 *
	 * Example usage:
	 *     var a = new Unit(5, 'cm');               // 50 mm
	 *     var b = Unit.parse('23 kg');             // 23 kg
	 *     var c = math.in(a, new Unit(null, 'm');  // 0.05 m
	 *
	 * @param {Number} [value]  A value like 5.2
	 * @param {String} [unit]   A unit like "cm" or "inch"
	 */
	function Unit(value, unit) {
	  if (!(this instanceof Unit)) {
	    throw new Error('Unit constructor must be called with the new operator');
	  }

	  if (value != null && !isNumber(value)) {
	    throw new TypeError('First parameter in Unit constructor must be a number');
	  }
	  if (unit != null && !isString(unit)) {
	    throw new TypeError('Second parameter in Unit constructor must be a string');
	  }

	  if (unit != null) {
	    // find the unit and prefix from the string
	    var res = _findUnit(unit);
	    if (!res) {
	      throw new SyntaxError('Unknown unit "' + unit + '"');
	    }
	    this.unit = res.unit;
	    this.prefix = res.prefix;
	  }
	  else {
	    this.unit = UNIT_NONE;
	    this.prefix = PREFIX_NONE;  // link to a list with supported prefixes
	  }

	  if (value != null) {
	    this.value = this._normalize(value);
	    this.fixPrefix = false;  // is set true by the methods Unit.in and math.in
	  }
	  else {
	    this.value = null;
	    this.fixPrefix = true;
	  }
	}

	// private variables and functions for the Unit parser
	var text, index, c;

	function skipWhitespace() {
	  while (c == ' ' || c == '\t') {
	    next();
	  }
	}

	function isDigitDot (c) {
	  return ((c >= '0' && c <= '9') || c == '.');
	}

	function isDigit (c) {
	  return ((c >= '0' && c <= '9'));
	}

	function next() {
	  index++;
	  c = text.charAt(index);
	}

	function revert(oldIndex) {
	  index = oldIndex;
	  c = text.charAt(index);
	}

	function parseNumber () {
	  var number = '';
	  var oldIndex;
	  oldIndex = index;

	  if (c == '+') {
	    next();
	  }
	  else if (c == '-') {
	    number += c;
	    next();
	  }

	  if (!isDigitDot(c)) {
	    // a + or - must be followed by a digit
	    revert(oldIndex);
	    return null;
	  }

	  // get number, can have a single dot
	  if (c == '.') {
	    number += c;
	    next();
	    if (!isDigit(c)) {
	      // this is no legal number, it is just a dot
	      revert(oldIndex);
	      return null;
	    }
	  }
	  else {
	    while (isDigit(c)) {
	      number += c;
	      next();
	    }
	    if (c == '.') {
	      number += c;
	      next();
	    }
	  }
	  while (isDigit(c)) {
	    number += c;
	    next();
	  }

	  // check for exponential notation like "2.3e-4" or "1.23e50"
	  if (c == 'E' || c == 'e') {
	    number += c;
	    next();

	    if (c == '+' || c == '-') {
	      number += c;
	      next();
	    }

	    // Scientific notation MUST be followed by an exponent
	    if (!isDigit(c)) {
	      // this is no legal number, exponent is missing.
	      revert(oldIndex);
	      return null;
	    }

	    while (isDigit(c)) {
	      number += c;
	      next();
	    }
	  }

	  return number;
	}

	function parseUnit() {
	  var unit = '';

	  skipWhitespace();
	  while (c && c != ' ' && c != '\t') {
	    unit += c;
	    next();
	  }

	  return unit || null;
	}

	/**
	 * Parse a string into a unit. Returns null if the provided string does not
	 * contain a valid unit.
	 * @param {String} str        A string like "5.2 inch", "4e2 kg"
	 * @return {Unit | null} unit
	 */
	Unit.parse = function parse(str) {
	  text = str;
	  index = -1;
	  c = '';

	  if (!isString(text)) {
	    return null;
	  }

	  next();
	  skipWhitespace();
	  var value = parseNumber();
	  var unit;
	  if (value) {
	    unit = parseUnit();

	    next();
	    skipWhitespace();
	    if (c) {
	      // garbage at the end. not good.
	      return null;
	    }

	    if (value && unit) {
	      return new Unit(Number(value), unit);
	    }
	  }
	  else {
	    unit = parseUnit();

	    next();
	    skipWhitespace();
	    if (c) {
	      // garbage at the end. not good.
	      return null;
	    }

	    return new Unit(null, unit)
	  }

	  return null;
	};

	/**
	 * Test whether value is of type Unit
	 * @param {*} value
	 * @return {Boolean} isUnit
	 */
	Unit.isUnit = function isUnit(value) {
	  return (value instanceof Unit);
	};

	/**
	 * create a copy of this unit
	 * @return {Unit} clone
	 */
	Unit.prototype.clone = function () {
	  var clone = new Unit();

	  for (var p in this) {
	    if (this.hasOwnProperty(p)) {
	      clone[p] = this[p];
	    }
	  }

	  return clone;
	};

	/**
	 * Normalize a value, based on its currently set unit
	 * @param {Number} value
	 * @return {Number} normalized value
	 * @private
	 */
	Unit.prototype._normalize = function(value) {
	  return (value + this.unit.offset) *
	      this.unit.value * this.prefix.value;
	};

	/**
	 * Unnormalize a value, based on its currently set unit
	 * @param {Number} value
	 * @param {Number} [prefixValue]    Optional prefix value to be used
	 * @return {Number} unnormalized value
	 * @private
	 */
	Unit.prototype._unnormalize = function (value, prefixValue) {
	  if (prefixValue == undefined) {
	    return value / this.unit.value / this.prefix.value -
	        this.unit.offset;
	  }
	  else {
	    return value / this.unit.value / prefixValue -
	        this.unit.offset;
	  }
	};

	/**
	 * Find a unit from a string
	 * @param {String} str              A string like 'cm' or 'inch'
	 * @returns {Object | null} result  When found, an object with fields unit and
	 *                                  prefix is returned. Else, null is returned.
	 * @private
	 */
	function _findUnit(str) {
	  for (var name in UNITS) {
	    if (UNITS.hasOwnProperty(name)) {
	      if (string.endsWith(str, name) ) {
	        var unit = UNITS[name];
	        var prefixLen = (str.length - name.length);
	        var prefixName = str.substring(0, prefixLen);
	        var prefix = unit.prefixes[prefixName];
	        if (prefix !== undefined) {
	          // store unit, prefix, and value
	          return {
	            unit: unit,
	            prefix: prefix
	          };
	        }
	      }
	    }
	  }

	  return null;
	}

	/**
	 * Test if the given expression is a unit.
	 * The unit can have a prefix but cannot have a value.
	 * @param {String} unit   A plain unit without value. Can have prefix, like "cm"
	 * @return {Boolean}      true if the given string is a unit
	 */
	Unit.isPlainUnit = function (unit) {
	  return (_findUnit(unit) != null);
	};

	/**
	 * check if this unit has given base unit
	 * @param {BASE_UNITS | undefined} base
	 */
	Unit.prototype.hasBase = function(base) {
	  if (this.unit.base === undefined) {
	    return (base === undefined);
	  }
	  return (this.unit.base === base);
	};

	/**
	 * Check if this unit has a base equal to another base
	 * @param {Unit} other
	 * @return {Boolean} true if equal base
	 */
	Unit.prototype.equalBase = function(other) {
	  return (this.unit.base === other.unit.base);
	};

	/**
	 * Check if this unit equals another unit
	 * @param {Unit} other
	 * @return {Boolean} true if both units are equal
	 */
	Unit.prototype.equals = function(other) {
	  return (this.equalBase(other) && this.value == other.value);
	};

	/**
	 * Create a clone of this unit with a representation
	 * @param {String | Unit} plainUnit   A plain unit, without value. Can have prefix, like "cm"
	 * @returns {Unit} unit having fixed, specified unit
	 */
	Unit.prototype.to = function (plainUnit) {
	  var other;
	  if (isString(plainUnit)) {
	    other = new Unit(null, plainUnit);

	    if (!this.equalBase(other)) {
	      throw new Error('Units do not match');
	    }

	    other.value = this.value;
	    return other;
	  }
	  else if (plainUnit instanceof Unit) {
	    if (!this.equalBase(plainUnit)) {
	      throw new Error('Units do not match');
	    }
	    if (plainUnit.value != null) {
	      throw new Error('Cannot convert to a unit with a value');
	    }
	    if (plainUnit.unit == null) {
	      throw new Error('Unit expected on the right hand side of function in');
	    }

	    other = plainUnit.clone();
	    other.value = this.value;
	    other.fixPrefix = true;
	    return other;
	  }
	  else {
	    throw new Error('String or Unit expected as parameter');
	  }
	};

	/**
	 * Return the value of the unit when represented with given plain unit
	 * @param {String | Unit} plainUnit    For example 'cm' or 'inch'
	 * @return {Number} value
	 */
	Unit.prototype.toNumber = function (plainUnit) {
	  var other = this.to(plainUnit);
	  var prefix = this.fixPrefix ? other._bestPrefix() : other.prefix;
	  return other._unnormalize(other.value, prefix.value);
	};


	/**
	 * Get a string representation of the unit.
	 * @return {String}
	 */
	Unit.prototype.toString = function toString() {
	  return this.format();
	};

	/**
	 * Get a string representation of the Unit, with optional formatting options.
	 * @param {Object | Number | Function} [options]  Formatting options. See
	 *                                                lib/util/number:format for a
	 *                                                description of the available
	 *                                                options.
	 * @return {String}
	 */
	Unit.prototype.format = function format(options) {
	  var value,
	      str;

	  if (!this.fixPrefix) {
	    var bestPrefix = this._bestPrefix();
	    value = this._unnormalize(this.value, bestPrefix.value);
	    str = (this.value != null) ? number.format(value, options) + ' ' : '';
	    str += bestPrefix.name + this.unit.name;
	  }
	  else {
	    value = this._unnormalize(this.value);
	    str = (this.value != null) ? number.format(value, options) + ' ' : '';
	    str += this.prefix.name + this.unit.name;
	  }
	  return str;
	};

	/**
	 * Calculate the best prefix using current value.
	 * @returns {Object} prefix
	 * @private
	 */
	Unit.prototype._bestPrefix = function () {
	  // find the best prefix value (resulting in the value of which
	  // the absolute value of the log10 is closest to zero,
	  // though with a little offset of 1.2 for nicer values: you get a
	  // sequence 1mm 100mm 500mm 0.6m 1m 10m 100m 500m 0.6km 1km ...
	  var absValue = Math.abs(this.value / this.unit.value);
	  var bestPrefix = PREFIX_NONE;
	  var bestDiff = Math.abs(
	      Math.log(absValue / bestPrefix.value) / Math.LN10 - 1.2);

	  var prefixes = this.unit.prefixes;
	  for (var p in prefixes) {
	    if (prefixes.hasOwnProperty(p)) {
	      var prefix = prefixes[p];
	      if (prefix.scientific) {
	        var diff = Math.abs(
	            Math.log(absValue / prefix.value) / Math.LN10 - 1.2);

	        if (diff < bestDiff) {
	          bestPrefix = prefix;
	          bestDiff = diff;
	        }
	      }
	    }
	  }

	  return bestPrefix;
	};

	var PREFIXES = {
	  'NONE': {
	    '': {'name': '', 'value': 1, 'scientific': true}
	  },
	  'SHORT': {
	    '': {'name': '', 'value': 1, 'scientific': true},

	    'da': {'name': 'da', 'value': 1e1, 'scientific': false},
	    'h': {'name': 'h', 'value': 1e2, 'scientific': false},
	    'k': {'name': 'k', 'value': 1e3, 'scientific': true},
	    'M': {'name': 'M', 'value': 1e6, 'scientific': true},
	    'G': {'name': 'G', 'value': 1e9, 'scientific': true},
	    'T': {'name': 'T', 'value': 1e12, 'scientific': true},
	    'P': {'name': 'P', 'value': 1e15, 'scientific': true},
	    'E': {'name': 'E', 'value': 1e18, 'scientific': true},
	    'Z': {'name': 'Z', 'value': 1e21, 'scientific': true},
	    'Y': {'name': 'Y', 'value': 1e24, 'scientific': true},

	    'd': {'name': 'd', 'value': 1e-1, 'scientific': false},
	    'c': {'name': 'c', 'value': 1e-2, 'scientific': false},
	    'm': {'name': 'm', 'value': 1e-3, 'scientific': true},
	    'u': {'name': 'u', 'value': 1e-6, 'scientific': true},
	    'n': {'name': 'n', 'value': 1e-9, 'scientific': true},
	    'p': {'name': 'p', 'value': 1e-12, 'scientific': true},
	    'f': {'name': 'f', 'value': 1e-15, 'scientific': true},
	    'a': {'name': 'a', 'value': 1e-18, 'scientific': true},
	    'z': {'name': 'z', 'value': 1e-21, 'scientific': true},
	    'y': {'name': 'y', 'value': 1e-24, 'scientific': true}
	  },
	  'LONG': {
	    '': {'name': '', 'value': 1, 'scientific': true},

	    'deca': {'name': 'deca', 'value': 1e1, 'scientific': false},
	    'hecto': {'name': 'hecto', 'value': 1e2, 'scientific': false},
	    'kilo': {'name': 'kilo', 'value': 1e3, 'scientific': true},
	    'mega': {'name': 'mega', 'value': 1e6, 'scientific': true},
	    'giga': {'name': 'giga', 'value': 1e9, 'scientific': true},
	    'tera': {'name': 'tera', 'value': 1e12, 'scientific': true},
	    'peta': {'name': 'peta', 'value': 1e15, 'scientific': true},
	    'exa': {'name': 'exa', 'value': 1e18, 'scientific': true},
	    'zetta': {'name': 'zetta', 'value': 1e21, 'scientific': true},
	    'yotta': {'name': 'yotta', 'value': 1e24, 'scientific': true},

	    'deci': {'name': 'deci', 'value': 1e-1, 'scientific': false},
	    'centi': {'name': 'centi', 'value': 1e-2, 'scientific': false},
	    'milli': {'name': 'milli', 'value': 1e-3, 'scientific': true},
	    'micro': {'name': 'micro', 'value': 1e-6, 'scientific': true},
	    'nano': {'name': 'nano', 'value': 1e-9, 'scientific': true},
	    'pico': {'name': 'pico', 'value': 1e-12, 'scientific': true},
	    'femto': {'name': 'femto', 'value': 1e-15, 'scientific': true},
	    'atto': {'name': 'atto', 'value': 1e-18, 'scientific': true},
	    'zepto': {'name': 'zepto', 'value': 1e-21, 'scientific': true},
	    'yocto': {'name': 'yocto', 'value': 1e-24, 'scientific': true}
	  },
	  'SQUARED': {
	    '': {'name': '', 'value': 1, 'scientific': true},

	    'da': {'name': 'da', 'value': 1e2, 'scientific': false},
	    'h': {'name': 'h', 'value': 1e4, 'scientific': false},
	    'k': {'name': 'k', 'value': 1e6, 'scientific': true},
	    'M': {'name': 'M', 'value': 1e12, 'scientific': true},
	    'G': {'name': 'G', 'value': 1e18, 'scientific': true},
	    'T': {'name': 'T', 'value': 1e24, 'scientific': true},
	    'P': {'name': 'P', 'value': 1e30, 'scientific': true},
	    'E': {'name': 'E', 'value': 1e36, 'scientific': true},
	    'Z': {'name': 'Z', 'value': 1e42, 'scientific': true},
	    'Y': {'name': 'Y', 'value': 1e48, 'scientific': true},

	    'd': {'name': 'd', 'value': 1e-2, 'scientific': false},
	    'c': {'name': 'c', 'value': 1e-4, 'scientific': false},
	    'm': {'name': 'm', 'value': 1e-6, 'scientific': true},
	    'u': {'name': 'u', 'value': 1e-12, 'scientific': true},
	    'n': {'name': 'n', 'value': 1e-18, 'scientific': true},
	    'p': {'name': 'p', 'value': 1e-24, 'scientific': true},
	    'f': {'name': 'f', 'value': 1e-30, 'scientific': true},
	    'a': {'name': 'a', 'value': 1e-36, 'scientific': true},
	    'z': {'name': 'z', 'value': 1e-42, 'scientific': true},
	    'y': {'name': 'y', 'value': 1e-42, 'scientific': true}
	  },
	  'CUBIC': {
	    '': {'name': '', 'value': 1, 'scientific': true},

	    'da': {'name': 'da', 'value': 1e3, 'scientific': false},
	    'h': {'name': 'h', 'value': 1e6, 'scientific': false},
	    'k': {'name': 'k', 'value': 1e9, 'scientific': true},
	    'M': {'name': 'M', 'value': 1e18, 'scientific': true},
	    'G': {'name': 'G', 'value': 1e27, 'scientific': true},
	    'T': {'name': 'T', 'value': 1e36, 'scientific': true},
	    'P': {'name': 'P', 'value': 1e45, 'scientific': true},
	    'E': {'name': 'E', 'value': 1e54, 'scientific': true},
	    'Z': {'name': 'Z', 'value': 1e63, 'scientific': true},
	    'Y': {'name': 'Y', 'value': 1e72, 'scientific': true},

	    'd': {'name': 'd', 'value': 1e-3, 'scientific': false},
	    'c': {'name': 'c', 'value': 1e-6, 'scientific': false},
	    'm': {'name': 'm', 'value': 1e-9, 'scientific': true},
	    'u': {'name': 'u', 'value': 1e-18, 'scientific': true},
	    'n': {'name': 'n', 'value': 1e-27, 'scientific': true},
	    'p': {'name': 'p', 'value': 1e-36, 'scientific': true},
	    'f': {'name': 'f', 'value': 1e-45, 'scientific': true},
	    'a': {'name': 'a', 'value': 1e-54, 'scientific': true},
	    'z': {'name': 'z', 'value': 1e-63, 'scientific': true},
	    'y': {'name': 'y', 'value': 1e-72, 'scientific': true}
	  },
	  'BINARY_SHORT': {
	    '': {'name': '', 'value': 1, 'scientific': true},
	    'k': {'name': 'k', 'value': 1024, 'scientific': true},
	    'M': {'name': 'M', 'value': Math.pow(1024, 2), 'scientific': true},
	    'G': {'name': 'G', 'value': Math.pow(1024, 3), 'scientific': true},
	    'T': {'name': 'T', 'value': Math.pow(1024, 4), 'scientific': true},
	    'P': {'name': 'P', 'value': Math.pow(1024, 5), 'scientific': true},
	    'E': {'name': 'E', 'value': Math.pow(1024, 6), 'scientific': true},
	    'Z': {'name': 'Z', 'value': Math.pow(1024, 7), 'scientific': true},
	    'Y': {'name': 'Y', 'value': Math.pow(1024, 8), 'scientific': true},

	    'Ki': {'name': 'Ki', 'value': 1024, 'scientific': true},
	    'Mi': {'name': 'Mi', 'value': Math.pow(1024, 2), 'scientific': true},
	    'Gi': {'name': 'Gi', 'value': Math.pow(1024, 3), 'scientific': true},
	    'Ti': {'name': 'Ti', 'value': Math.pow(1024, 4), 'scientific': true},
	    'Pi': {'name': 'Pi', 'value': Math.pow(1024, 5), 'scientific': true},
	    'Ei': {'name': 'Ei', 'value': Math.pow(1024, 6), 'scientific': true},
	    'Zi': {'name': 'Zi', 'value': Math.pow(1024, 7), 'scientific': true},
	    'Yi': {'name': 'Yi', 'value': Math.pow(1024, 8), 'scientific': true}
	  },
	  'BINARY_LONG': {
	    '': {'name': '', 'value': 1, 'scientific': true},
	    'kilo': {'name': 'kilo', 'value': 1024, 'scientific': true},
	    'mega': {'name': 'mega', 'value': Math.pow(1024, 2), 'scientific': true},
	    'giga': {'name': 'giga', 'value': Math.pow(1024, 3), 'scientific': true},
	    'tera': {'name': 'tera', 'value': Math.pow(1024, 4), 'scientific': true},
	    'peta': {'name': 'peta', 'value': Math.pow(1024, 5), 'scientific': true},
	    'exa': {'name': 'exa', 'value': Math.pow(1024, 6), 'scientific': true},
	    'zetta': {'name': 'zetta', 'value': Math.pow(1024, 7), 'scientific': true},
	    'yotta': {'name': 'yotta', 'value': Math.pow(1024, 8), 'scientific': true},

	    'kibi': {'name': 'kibi', 'value': 1024, 'scientific': true},
	    'mebi': {'name': 'mebi', 'value': Math.pow(1024, 2), 'scientific': true},
	    'gibi': {'name': 'gibi', 'value': Math.pow(1024, 3), 'scientific': true},
	    'tebi': {'name': 'tebi', 'value': Math.pow(1024, 4), 'scientific': true},
	    'pebi': {'name': 'pebi', 'value': Math.pow(1024, 5), 'scientific': true},
	    'exi': {'name': 'exi', 'value': Math.pow(1024, 6), 'scientific': true},
	    'zebi': {'name': 'zebi', 'value': Math.pow(1024, 7), 'scientific': true},
	    'yobi': {'name': 'yobi', 'value': Math.pow(1024, 8), 'scientific': true}
	  }
	};

	var PREFIX_NONE = {'name': '', 'value': 1, 'scientific': true};

	var BASE_UNITS = {
	  'NONE': {},

	  'LENGTH': {},               // meter
	  'MASS': {},                 // kilogram
	  'TIME': {},                 // second
	  'CURRENT': {},              // ampere
	  'TEMPERATURE': {},          // kelvin
	  'LUMINOUS_INTENSITY': {},   // candela
	  'AMOUNT_OF_SUBSTANCE': {},  // mole

	  'FORCE': {},        // Newton
	  'SURFACE': {},      // m2
	  'VOLUME': {},       // m3
	  'ANGLE': {},        // rad
	  'BIT': {}           // bit (digital)
	};

	BASE_UNIT_NONE = {};

	UNIT_NONE = {'name': '', 'base': BASE_UNIT_NONE, 'value': 1, 'offset': 0};

	var UNITS = {
	  // length
	  meter: {'name': 'meter', 'base': BASE_UNITS.LENGTH, 'prefixes': PREFIXES.LONG, 'value': 1, 'offset': 0},
	  inch: {'name': 'inch', 'base': BASE_UNITS.LENGTH, 'prefixes': PREFIXES.NONE, 'value': 0.0254, 'offset': 0},
	  foot: {'name': 'foot', 'base': BASE_UNITS.LENGTH, 'prefixes': PREFIXES.NONE, 'value': 0.3048, 'offset': 0},
	  yard: {'name': 'yard', 'base': BASE_UNITS.LENGTH, 'prefixes': PREFIXES.NONE, 'value': 0.9144, 'offset': 0},
	  mile: {'name': 'mile', 'base': BASE_UNITS.LENGTH, 'prefixes': PREFIXES.NONE, 'value': 1609.344, 'offset': 0},
	  link: {'name': 'link', 'base': BASE_UNITS.LENGTH, 'prefixes': PREFIXES.NONE, 'value': 0.201168, 'offset': 0},
	  rod: {'name': 'rod', 'base': BASE_UNITS.LENGTH, 'prefixes': PREFIXES.NONE, 'value': 5.029210, 'offset': 0},
	  chain: {'name': 'chain', 'base': BASE_UNITS.LENGTH, 'prefixes': PREFIXES.NONE, 'value': 20.1168, 'offset': 0},
	  angstrom: {'name': 'angstrom', 'base': BASE_UNITS.LENGTH, 'prefixes': PREFIXES.NONE, 'value': 1e-10, 'offset': 0},

	  m: {'name': 'm', 'base': BASE_UNITS.LENGTH, 'prefixes': PREFIXES.SHORT, 'value': 1, 'offset': 0},
	  'in': {'name': 'in', 'base': BASE_UNITS.LENGTH, 'prefixes': PREFIXES.NONE, 'value': 0.0254, 'offset': 0},
	  ft: {'name': 'ft', 'base': BASE_UNITS.LENGTH, 'prefixes': PREFIXES.NONE, 'value': 0.3048, 'offset': 0},
	  yd: {'name': 'yd', 'base': BASE_UNITS.LENGTH, 'prefixes': PREFIXES.NONE, 'value': 0.9144, 'offset': 0},
	  mi: {'name': 'mi', 'base': BASE_UNITS.LENGTH, 'prefixes': PREFIXES.NONE, 'value': 1609.344, 'offset': 0},
	  li: {'name': 'li', 'base': BASE_UNITS.LENGTH, 'prefixes': PREFIXES.NONE, 'value': 0.201168, 'offset': 0},
	  rd: {'name': 'rd', 'base': BASE_UNITS.LENGTH, 'prefixes': PREFIXES.NONE, 'value': 5.029210, 'offset': 0},
	  ch: {'name': 'ch', 'base': BASE_UNITS.LENGTH, 'prefixes': PREFIXES.NONE, 'value': 20.1168, 'offset': 0},
	  mil: {'name': 'mil', 'base': BASE_UNITS.LENGTH, 'prefixes': PREFIXES.NONE, 'value': 0.0000254, 'offset': 0}, // 1/1000 inch

	  // Surface
	  m2: {'name': 'm2', 'base': BASE_UNITS.SURFACE, 'prefixes': PREFIXES.SQUARED, 'value': 1, 'offset': 0},
	  sqin: {'name': 'sqin', 'base': BASE_UNITS.SURFACE, 'prefixes': PREFIXES.NONE, 'value': 0.00064516, 'offset': 0}, // 645.16 mm2
	  sqft: {'name': 'sqft', 'base': BASE_UNITS.SURFACE, 'prefixes': PREFIXES.NONE, 'value': 0.09290304, 'offset': 0}, // 0.09290304 m2
	  sqyd: {'name': 'sqyd', 'base': BASE_UNITS.SURFACE, 'prefixes': PREFIXES.NONE, 'value': 0.83612736, 'offset': 0}, // 0.83612736 m2
	  sqmi: {'name': 'sqmi', 'base': BASE_UNITS.SURFACE, 'prefixes': PREFIXES.NONE, 'value': 2589988.110336, 'offset': 0}, // 2.589988110336 km2
	  sqrd: {'name': 'sqrd', 'base': BASE_UNITS.SURFACE, 'prefixes': PREFIXES.NONE, 'value': 25.29295, 'offset': 0}, // 25.29295 m2
	  sqch: {'name': 'sqch', 'base': BASE_UNITS.SURFACE, 'prefixes': PREFIXES.NONE, 'value': 404.6873, 'offset': 0}, // 404.6873 m2
	  sqmil: {'name': 'sqmil', 'base': BASE_UNITS.SURFACE, 'prefixes': PREFIXES.NONE, 'value': 6.4516e-10, 'offset': 0}, // 6.4516 * 10^-10 m2

	  // Volume
	  m3: {'name': 'm3', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.CUBIC, 'value': 1, 'offset': 0},
	  L: {'name': 'L', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.SHORT, 'value': 0.001, 'offset': 0}, // litre
	  l: {'name': 'l', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.SHORT, 'value': 0.001, 'offset': 0}, // litre
	  litre: {'name': 'litre', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.LONG, 'value': 0.001, 'offset': 0},
	  cuin: {'name': 'cuin', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.NONE, 'value': 1.6387064e-5, 'offset': 0}, // 1.6387064e-5 m3
	  cuft: {'name': 'cuft', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.NONE, 'value': 0.028316846592, 'offset': 0}, // 28.316 846 592 L
	  cuyd: {'name': 'cuyd', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.NONE, 'value': 0.764554857984, 'offset': 0}, // 764.554 857 984 L
	  teaspoon: {'name': 'teaspoon', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.NONE, 'value': 0.000005, 'offset': 0}, // 5 mL
	  tablespoon: {'name': 'tablespoon', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.NONE, 'value': 0.000015, 'offset': 0}, // 15 mL
	  //{'name': 'cup', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.NONE, 'value': 0.000240, 'offset': 0}, // 240 mL  // not possible, we have already another cup

	  // Liquid volume
	  minim: {'name': 'minim', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.NONE, 'value': 0.00000006161152, 'offset': 0}, // 0.06161152 mL
	  fluiddram: {'name': 'fluiddram', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.NONE, 'value': 0.0000036966911, 'offset': 0},  // 3.696691 mL
	  fluidounce: {'name': 'fluidounce', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.NONE, 'value': 0.00002957353, 'offset': 0}, // 29.57353 mL
	  gill: {'name': 'gill', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.NONE, 'value': 0.0001182941, 'offset': 0}, // 118.2941 mL
	  cc: {'name': 'cc', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.NONE, 'value': 1e-6, 'offset': 0}, // 1e-6 L
	  cup: {'name': 'cup', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.NONE, 'value': 0.0002365882, 'offset': 0}, // 236.5882 mL
	  pint: {'name': 'pint', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.NONE, 'value': 0.0004731765, 'offset': 0}, // 473.1765 mL
	  quart: {'name': 'quart', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.NONE, 'value': 0.0009463529, 'offset': 0}, // 946.3529 mL
	  gallon: {'name': 'gallon', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.NONE, 'value': 0.003785412, 'offset': 0}, // 3.785412 L
	  beerbarrel: {'name': 'beerbarrel', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.NONE, 'value': 0.1173478, 'offset': 0}, // 117.3478 L
	  oilbarrel: {'name': 'oilbarrel', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.NONE, 'value': 0.1589873, 'offset': 0}, // 158.9873 L
	  hogshead: {'name': 'hogshead', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.NONE, 'value': 0.2384810, 'offset': 0}, // 238.4810 L

	  //{'name': 'min', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.NONE, 'value': 0.00000006161152, 'offset': 0}, // 0.06161152 mL // min is already in use as minute
	  fldr: {'name': 'fldr', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.NONE, 'value': 0.0000036966911, 'offset': 0},  // 3.696691 mL
	  floz: {'name': 'floz', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.NONE, 'value': 0.00002957353, 'offset': 0}, // 29.57353 mL
	  gi: {'name': 'gi', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.NONE, 'value': 0.0001182941, 'offset': 0}, // 118.2941 mL
	  cp: {'name': 'cp', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.NONE, 'value': 0.0002365882, 'offset': 0}, // 236.5882 mL
	  pt: {'name': 'pt', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.NONE, 'value': 0.0004731765, 'offset': 0}, // 473.1765 mL
	  qt: {'name': 'qt', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.NONE, 'value': 0.0009463529, 'offset': 0}, // 946.3529 mL
	  gal: {'name': 'gal', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.NONE, 'value': 0.003785412, 'offset': 0}, // 3.785412 L
	  bbl: {'name': 'bbl', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.NONE, 'value': 0.1173478, 'offset': 0}, // 117.3478 L
	  obl: {'name': 'obl', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.NONE, 'value': 0.1589873, 'offset': 0}, // 158.9873 L
	  //{'name': 'hogshead', 'base': BASE_UNITS.VOLUME, 'prefixes': PREFIXES.NONE, 'value': 0.2384810, 'offset': 0}, // 238.4810 L // TODO: hh?

	  // Mass
	  g: {'name': 'g', 'base': BASE_UNITS.MASS, 'prefixes': PREFIXES.SHORT, 'value': 0.001, 'offset': 0},
	  gram: {'name': 'gram', 'base': BASE_UNITS.MASS, 'prefixes': PREFIXES.LONG, 'value': 0.001, 'offset': 0},

	  ton: {'name': 'ton', 'base': BASE_UNITS.MASS, 'prefixes': PREFIXES.SHORT, 'value': 907.18474, 'offset': 0},
	  tonne: {'name': 'tonne', 'base': BASE_UNITS.MASS, 'prefixes': PREFIXES.SHORT, 'value': 1000, 'offset': 0},

	  grain: {'name': 'grain', 'base': BASE_UNITS.MASS, 'prefixes': PREFIXES.NONE, 'value': 64.79891e-6, 'offset': 0},
	  dram: {'name': 'dram', 'base': BASE_UNITS.MASS, 'prefixes': PREFIXES.NONE, 'value': 1.7718451953125e-3, 'offset': 0},
	  ounce: {'name': 'ounce', 'base': BASE_UNITS.MASS, 'prefixes': PREFIXES.NONE, 'value': 28.349523125e-3, 'offset': 0},
	  poundmass: {'name': 'poundmass', 'base': BASE_UNITS.MASS, 'prefixes': PREFIXES.NONE, 'value': 453.59237e-3, 'offset': 0},
	  hundredweight: {'name': 'hundredweight', 'base': BASE_UNITS.MASS, 'prefixes': PREFIXES.NONE, 'value': 45.359237, 'offset': 0},
	  stick: {'name': 'stick', 'base': BASE_UNITS.MASS, 'prefixes': PREFIXES.NONE, 'value': 115e-3, 'offset': 0},

	  gr: {'name': 'gr', 'base': BASE_UNITS.MASS, 'prefixes': PREFIXES.NONE, 'value': 64.79891e-6, 'offset': 0},
	  dr: {'name': 'dr', 'base': BASE_UNITS.MASS, 'prefixes': PREFIXES.NONE, 'value': 1.7718451953125e-3, 'offset': 0},
	  oz: {'name': 'oz', 'base': BASE_UNITS.MASS, 'prefixes': PREFIXES.NONE, 'value': 28.349523125e-3, 'offset': 0},
	  lbm: {'name': 'lbm', 'base': BASE_UNITS.MASS, 'prefixes': PREFIXES.NONE, 'value': 453.59237e-3, 'offset': 0},
	  cwt: {'name': 'cwt', 'base': BASE_UNITS.MASS, 'prefixes': PREFIXES.NONE, 'value': 45.359237, 'offset': 0},

	  // Time
	  s: {'name': 's', 'base': BASE_UNITS.TIME, 'prefixes': PREFIXES.SHORT, 'value': 1, 'offset': 0},
	  min: {'name': 'min', 'base': BASE_UNITS.TIME, 'prefixes': PREFIXES.NONE, 'value': 60, 'offset': 0},
	  h: {'name': 'h', 'base': BASE_UNITS.TIME, 'prefixes': PREFIXES.NONE, 'value': 3600, 'offset': 0},
	  second: {'name': 'second', 'base': BASE_UNITS.TIME, 'prefixes': PREFIXES.LONG, 'value': 1, 'offset': 0},
	  sec: {'name': 'sec', 'base': BASE_UNITS.TIME, 'prefixes': PREFIXES.LONG, 'value': 1, 'offset': 0},
	  minute: {'name': 'minute', 'base': BASE_UNITS.TIME, 'prefixes': PREFIXES.NONE, 'value': 60, 'offset': 0},
	  hour: {'name': 'hour', 'base': BASE_UNITS.TIME, 'prefixes': PREFIXES.NONE, 'value': 3600, 'offset': 0},
	  day: {'name': 'day', 'base': BASE_UNITS.TIME, 'prefixes': PREFIXES.NONE, 'value': 86400, 'offset': 0},

	  // Angle
	  rad: {'name': 'rad', 'base': BASE_UNITS.ANGLE, 'prefixes': PREFIXES.NONE, 'value': 1, 'offset': 0},
	  // deg = rad / (2*pi) * 360 = rad / 0.017453292519943295769236907684888
	  deg: {'name': 'deg', 'base': BASE_UNITS.ANGLE, 'prefixes': PREFIXES.NONE, 'value': 0.017453292519943295769236907684888, 'offset': 0},
	  // grad = rad / (2*pi) * 400  = rad / 0.015707963267948966192313216916399
	  grad: {'name': 'grad', 'base': BASE_UNITS.ANGLE, 'prefixes': PREFIXES.NONE, 'value': 0.015707963267948966192313216916399, 'offset': 0},
	  // cycle = rad / (2*pi) = rad / 6.2831853071795864769252867665793
	  cycle: {'name': 'cycle', 'base': BASE_UNITS.ANGLE, 'prefixes': PREFIXES.NONE, 'value': 6.2831853071795864769252867665793, 'offset': 0},

	  // Electric current
	  A: {'name': 'A', 'base': BASE_UNITS.CURRENT, 'prefixes': PREFIXES.SHORT, 'value': 1, 'offset': 0},
	  ampere: {'name': 'ampere', 'base': BASE_UNITS.CURRENT, 'prefixes': PREFIXES.LONG, 'value': 1, 'offset': 0},

	  // Temperature
	  // K(C) = °C + 273.15
	  // K(F) = (°F + 459.67) / 1.8
	  // K(R) = °R / 1.8
	  K: {'name': 'K', 'base': BASE_UNITS.TEMPERATURE, 'prefixes': PREFIXES.NONE, 'value': 1, 'offset': 0},
	  degC: {'name': 'degC', 'base': BASE_UNITS.TEMPERATURE, 'prefixes': PREFIXES.NONE, 'value': 1, 'offset': 273.15},
	  degF: {'name': 'degF', 'base': BASE_UNITS.TEMPERATURE, 'prefixes': PREFIXES.NONE, 'value': 1/1.8, 'offset': 459.67},
	  degR: {'name': 'degR', 'base': BASE_UNITS.TEMPERATURE, 'prefixes': PREFIXES.NONE, 'value': 1/1.8, 'offset': 0},
	  kelvin: {'name': 'kelvin', 'base': BASE_UNITS.TEMPERATURE, 'prefixes': PREFIXES.NONE, 'value': 1, 'offset': 0},
	  celsius: {'name': 'celsius', 'base': BASE_UNITS.TEMPERATURE, 'prefixes': PREFIXES.NONE, 'value': 1, 'offset': 273.15},
	  fahrenheit: {'name': 'fahrenheit', 'base': BASE_UNITS.TEMPERATURE, 'prefixes': PREFIXES.NONE, 'value': 1/1.8, 'offset': 459.67},
	  rankine: {'name': 'rankine', 'base': BASE_UNITS.TEMPERATURE, 'prefixes': PREFIXES.NONE, 'value': 1/1.8, 'offset': 0},

	  // amount of substance
	  mol: {'name': 'mol', 'base': BASE_UNITS.AMOUNT_OF_SUBSTANCE, 'prefixes': PREFIXES.NONE, 'value': 1, 'offset': 0},
	  mole: {'name': 'mole', 'base': BASE_UNITS.AMOUNT_OF_SUBSTANCE, 'prefixes': PREFIXES.NONE, 'value': 1, 'offset': 0},

	  // luminous intensity
	  cd: {'name': 'cd', 'base': BASE_UNITS.LUMINOUS_INTENSITY, 'prefixes': PREFIXES.NONE, 'value': 1, 'offset': 0},
	  candela: {'name': 'candela', 'base': BASE_UNITS.LUMINOUS_INTENSITY, 'prefixes': PREFIXES.NONE, 'value': 1, 'offset': 0},
	  // TODO: units STERADIAN
	  //{'name': 'sr', 'base': BASE_UNITS.STERADIAN, 'prefixes': PREFIXES.NONE, 'value': 1, 'offset': 0},
	  //{'name': 'steradian', 'base': BASE_UNITS.STERADIAN, 'prefixes': PREFIXES.NONE, 'value': 1, 'offset': 0},

	  // Force
	  N: {'name': 'N', 'base': BASE_UNITS.FORCE, 'prefixes': PREFIXES.SHORT, 'value': 1, 'offset': 0},
	  newton: {'name': 'newton', 'base': BASE_UNITS.FORCE, 'prefixes': PREFIXES.LONG, 'value': 1, 'offset': 0},
	  lbf: {'name': 'lbf', 'base': BASE_UNITS.FORCE, 'prefixes': PREFIXES.NONE, 'value': 4.4482216152605, 'offset': 0},
	  poundforce: {'name': 'poundforce', 'base': BASE_UNITS.FORCE, 'prefixes': PREFIXES.NONE, 'value': 4.4482216152605, 'offset': 0},

	  // Binary
	  b: {'name': 'b', 'base': BASE_UNITS.BIT, 'prefixes': PREFIXES.BINARY_SHORT, 'value': 1, 'offset': 0},
	  bits: {'name': 'bits', 'base': BASE_UNITS.BIT, 'prefixes': PREFIXES.BINARY_LONG, 'value': 1, 'offset': 0},
	  B: {'name': 'B', 'base': BASE_UNITS.BIT, 'prefixes': PREFIXES.BINARY_SHORT, 'value': 8, 'offset': 0},
	  bytes: {'name': 'bytes', 'base': BASE_UNITS.BIT, 'prefixes': PREFIXES.BINARY_LONG, 'value': 8, 'offset': 0}
	};

	// plurals
	var PLURALS = {
	  meters: 'meter',
	  inches: 'inch',
	  feet: 'foot',
	  yards: 'yard',
	  miles: 'mile',
	  links: 'link',
	  rods: 'rod',
	  chains: 'chain',
	  angstroms: 'angstrom',

	  litres: 'litre',
	  teaspoons: 'teaspoon',
	  tablespoons: 'tablespoon',
	  minims: 'minim',
	  fluiddrams: 'fluiddram',
	  fluidounces: 'fluidounce',
	  gills: 'gill',
	  cups: 'cup',
	  pints: 'pint',
	  quarts: 'quart',
	  gallons: 'gallon',
	  beerbarrels: 'beerbarrel',
	  oilbarrels: 'oilbarrel',
	  hogsheads: 'hogshead',

	  grams: 'gram',
	  tons: 'ton',
	  tonnes: 'tonne',
	  grains: 'grain',
	  drams: 'dram',
	  ounces: 'ounce',
	  poundmasses: 'poundmass',
	  hundredweights: 'hundredweight',
	  sticks: 'stick',

	  seconds: 'second',
	  minutes: 'minute',
	  hours: 'hour',
	  days: 'day',

	  radians: 'rad',
	  degrees: 'deg',
	  gradients: 'grad',
	  cycles: 'cycle',

	  amperes: 'ampere',
	  moles: 'mole'
	};

	for (var name in PLURALS) {
	  if (PLURALS.hasOwnProperty(name)) {
	    var unit = UNITS[PLURALS[name]];
	    var plural = Object.create(unit);
	    plural.name = name;
	    UNITS[name] = plural;
	  }
	}

	// aliases
	UNITS.lt = UNITS.l;
	UNITS.liter = UNITS.litre;
	UNITS.liters = UNITS.litres;
	UNITS.lb = UNITS.lbm;


	Unit.PREFIXES = PREFIXES;
	Unit.BASE_UNITS = BASE_UNITS;
	Unit.UNITS = UNITS;

	// end of unit aliases


	// exports
	module.exports = Unit;

	// to trick my IDE which doesn't get it
	exports.isUnit = Unit.isUnit;
	exports.isPlainUnit = Unit.isPlainUnit;
	exports.parse = Unit.parse;


/***/ },
/* 12 */
/***/ function(module, exports, require) {

	var util = require(117),
	    object = util.object,
	    string = util.string;

	/**
	 * Documentation object
	 * @param {Object} math The math.js namespace
	 * @param {Object} doc  Object containing properties:
	 *                      {String} name
	 *                      {String} category
	 *                      {String[]} syntax
	 *                      {String[]} examples
	 *                      {String[]} seealso
	 * @constructor
	 */
	function Help (math, doc) {
	  this.math = math;
	  this.doc = doc;
	}

	/**
	 * Test whether a value is an instance of Help
	 * @param {*} value
	 * @return {Boolean} isHelp
	 */
	Help.isHelp = function isHelp (value) {
	  return (value instanceof Help);
	};

	/**
	 * Generate readable description from a Help object
	 * @return {String} readableDoc
	 * @private
	 */
	Help.prototype.toString = function () {
	  var doc = this.doc || {};
	  var desc = '\n';

	  if (doc.name) {
	    desc += 'Name: ' + doc.name + '\n\n';
	  }
	  if (doc.category) {
	    desc += 'Category: ' + doc.category + '\n\n';
	  }
	  if (doc.description) {
	    desc += 'Description:\n    ' + doc.description + '\n\n';
	  }
	  if (doc.syntax) {
	    desc += 'Syntax:\n    ' + doc.syntax.join('\n    ') + '\n\n';
	  }
	  if (doc.examples) {
	    var parser = this.math.parser();
	    desc += 'Examples:\n';
	    for (var i = 0; i < doc.examples.length; i++) {
	      var expr = doc.examples[i];
	      var res;
	      try {
	        res = parser.eval(expr);
	      }
	      catch (e) {
	        res = e;
	      }
	      desc += '    ' + expr + '\n';
	      if (res && !(res instanceof Help)) {
	        desc += '        ' + string.format(res) + '\n';
	      }
	    }
	    desc += '\n';
	  }
	  if (doc.seealso) {
	    desc += 'See also: ' + doc.seealso.join(', ') + '\n';
	  }

	  return desc;
	};

	// TODO: implement a toHTML function in Help

	/**
	 * Export the help object to JSON
	 */
	Help.prototype.toJSON = function () {
	  return object.extend({}, this.doc);
	};

	// exports
	module.exports = Help;

	// to trick my IDE which doesn't get it
	exports.isHelp = Help.isHelp;


/***/ },
/* 13 */
/***/ function(module, exports, require) {

	// utility methods for arrays and matrices

	var util = require(117),

	    Matrix = require(10),

	    isArray = util.array.isArray,
	    isString = util.string.isString;

	/**
	 * Convert function arguments to an array. Arguments can have the following
	 * signature:
	 *     fn()
	 *     fn(n)
	 *     fn(m, n, p, ...)
	 *     fn([m, n, p, ...])
	 * @param {...Number | Array | Matrix} args
	 * @returns {Array} array
	 */
	exports.argsToArray = function argsToArray(args) {
	  var array;
	  if (args.length == 0) {
	    // fn()
	    array = [];
	  }
	  else if (args.length == 1) {
	    // fn(n)
	    // fn([m, n, p, ...])
	    array = args[0];
	    if (array instanceof Matrix) {
	      array = array.valueOf();
	    }
	    if (!isArray(array)) {
	      array = [array];
	    }
	  }
	  else {
	    // fn(m, n, p, ...)
	    array = Array.prototype.slice.apply(args);
	  }
	  return array;
	};


	/**
	 * Test whether a value is a collection: an Array or Matrix
	 * @param {*} x
	 * @returns {boolean} isCollection
	 */
	exports.isCollection = function isCollection (x) {
	  return (isArray(x) || (x instanceof Matrix));
	};

	/**
	 * Execute the callback function element wise for each element in array and any
	 * nested array
	 * Returns an array with the results
	 * @param {Array | Matrix} array
	 * @param {function} callback   The callback is called with two parameters:
	 *                              value1 and value2, which contain the current
	 *                              element of both arrays.
	 * @return {Array | Matrix} res
	 */
	exports.deepMap = function deepMap(array, callback) {
	  if (array && (typeof array.map === 'function')) {
	    return array.map(function (x) {
	      return deepMap(x, callback);
	    });
	  }
	  else {
	    return callback(array);
	  }
	};

	/**
	 * Execute the callback function element wise for each entry in two given arrays,
	 * and for any nested array. Objects can also be scalar objects.
	 * Returns an array with the results.
	 * @param {Array | Matrix | Object} array1
	 * @param {Array | Matrix | Object} array2
	 * @param {function} callback   The callback is called with two parameters:
	 *                              value1 and value2, which contain the current
	 *                              element of both arrays.
	 * @return {Array | Matrix} res
	 */
	exports.deepMap2 = function deepMap2(array1, array2, callback) {
	  var res, len, i;

	  if (isArray(array1)) {
	    if (isArray(array2)) {
	      // callback(array, array)
	      if (array1.length != array2.length) {
	        throw new RangeError('Dimension mismatch ' +
	            '(' +  array1.length + ' != ' + array2.length + ')');
	      }

	      res = [];
	      len = array1.length;
	      for (i = 0; i < len; i++) {
	        res[i] = deepMap2(array1[i], array2[i], callback);
	      }
	    }
	    else if (array2 instanceof Matrix) {
	      // callback(array, matrix)
	      res = deepMap2(array1, array2.valueOf(), callback);
	      return new Matrix(res);
	    }
	    else {
	      // callback(array, object)
	      res = [];
	      len = array1.length;
	      for (i = 0; i < len; i++) {
	        res[i] = deepMap2(array1[i], array2, callback);
	      }
	    }
	  }
	  else if (array1 instanceof Matrix) {
	    if (array2 instanceof Matrix) {
	      // callback(matrix, matrix)
	      res = deepMap2(array1.valueOf(), array2.valueOf(), callback);
	      return new Matrix(res);
	    }
	    else {
	      // callback(matrix, array)
	      // callback(matrix, object)
	      res = deepMap2(array1.valueOf(), array2, callback);
	      return new Matrix(res);
	    }
	  }
	  else {
	    if (isArray(array2)) {
	      // callback(object, array)
	      res = [];
	      len = array2.length;
	      for (i = 0; i < len; i++) {
	        res[i] = deepMap2(array1, array2[i], callback);
	      }
	    }
	    else if (array2 instanceof Matrix) {
	      // callback(object, matrix)
	      res = deepMap2(array1, array2.valueOf(), callback);
	      return new Matrix(res);
	    }
	    else {
	      // callback(object, object)
	      res = callback(array1, array2);
	    }
	  }

	  return res;
	};

	/**
	 * Reduce a given matrix or array to a new matrix or
	 * array with one less dimension, aplying the given
	 * callback in the selected dimension.
	 * @param {Array | Matrix} mat
	 * @param {Number} dim
	 * @param {function} callback
	 * @return {Array | Matrix} res
	 */
	exports.reduce = function reduce (mat, dim, callback) {
		if (mat instanceof Matrix) {
			return new Matrix(_reduce(mat.valueOf(), dim, callback));
		}else {
			return _reduce(mat, dim, callback);
		}
	};

	/**
	 * Recursively reduce a matrix
	 * @param {Array} mat
	 * @param {Number} dim
	 * @param {Function} callback
	 * @returns {Array} ret
	 * @private
	 */
	function _reduce(mat, dim, callback){
	  var i, ret, val, tran;

		if(dim<=0){
			if( !isArray(mat[0]) ){
				val = mat[0];
				for(i=1; i<mat.length; i++){
					val = callback(val, mat[i]);
				}
				return val;
			}else{
				tran = _switch(mat);
				ret = [];
				for(i=0; i<tran.length; i++){
					ret[i] = _reduce(tran[i], dim-1, callback);
				}
				return ret
			}
		}else{
			ret = [];
			for(i=0; i<mat.length; i++){
				ret[i] = _reduce(mat[i], dim-1, callback);
			}
			return ret;
		}
	}

	/**
	 * Transpose a matrix
	 * @param {Array} mat
	 * @returns {Array} ret
	 * @private
	 */
	function _switch(mat){
	  var I = mat.length;
	  var J = mat[0].length;
	  var i, j;
	  var ret = [];
	  for( j=0; j<J; j++) {
	    var tmp = [];
	    for( i=0; i<I; i++) {
	      tmp.push(mat[i][j]);
	    }
	    ret.push(tmp);
	  }
	  return ret;
	}

	/**
	 * Recursively loop over all elements in a given multi dimensional array
	 * and invoke the callback on each of the elements.
	 * @param {Array | Matrix} array
	 * @param {function} callback     The callback method is invoked with one
	 *                                parameter: the current element in the array
	 */
	exports.deepForEach = function deepForEach (array, callback) {
	  if (array instanceof Matrix) {
	    array = array.valueOf();
	  }

	  for (var i = 0, ii = array.length; i < ii; i++) {
	    var value = array[i];

	    if (isArray(value)) {
	      deepForEach(value, callback);
	    }
	    else {
	      callback(value);
	    }
	  }
	};


/***/ },
/* 14 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var types = require(217);

	  // export the error constructors to namespace math.error.*
	  var error = {};
	  math.error = error;

	  /**
	   * Create a TypeError with message:
	   *      'Function <fn> does not support a parameter of type <type>';
	   * @param {String} name   Function name
	   * @param {*} [value1]
	   * @param {*...} [value_n]
	   * @extends TypeError
	   */
	  // TODO: rename UnsupportedTypeError to TypeError?
	  error.UnsupportedTypeError = function UnsupportedTypeError(name, value1, value_n) {
	    if (arguments.length == 2) {
	      var type1 = math['typeof'](value1);
	      this.message = 'Function ' + name + '(' + type1 + ') not supported';
	    }
	    else if (arguments.length > 2) {
	      var values = Array.prototype.splice.call(arguments, 1);
	      var types = values.map(function (value) {
	        return math['typeof'](value);
	      });
	      this.message = 'Function ' + name + '(' + types.join(', ') + ') not supported';
	    }
	    else {
	      this.message = 'Unsupported type of argument in function ' + name;
	    }

	    this.stack = (new Error()).stack;
	  };

	  error.UnsupportedTypeError.prototype = new TypeError();
	  error.UnsupportedTypeError.prototype.constructor = TypeError;
	  error.UnsupportedTypeError.prototype.name = 'UnsupportedTypeError';

	  /**
	   * Create a syntax error with the message:
	   *     'Wrong number of arguments in function <fn> (<count> provided, <min>-<max> expected)'
	   * @param {String} name   Function name
	   * @param {Number} count  Actual argument count
	   * @param {Number} min    Minimum required argument count
	   * @param {Number} [max]  Maximum required argument count
	   * @extends SyntaxError
	   */
	  error.ArgumentsError = function ArgumentsError(name, count, min, max) {
	    this.message = 'Wrong number of arguments in function ' + name +
	        ' (' + count + ' provided, ' +
	        min + ((max != undefined) ? ('-' + max) : '') + ' expected)';

	    this.stack = (new Error()).stack;
	  };

	  error.ArgumentsError.prototype = new Error();
	  error.ArgumentsError.prototype.constructor = Error;
	  error.ArgumentsError.prototype.name = 'ArgumentError';

	  // TODO: implement a InvalidValueError?

	};

/***/ },
/* 15 */
/***/ function(module, exports, require) {

	module.exports = function (math, settings) {
	  var util = require(117),
	      _parse = require(4),

	      collection = require(13),

	      isString = util.string.isString,
	      isCollection = collection.isCollection;

	  /**
	   * Parse and compile an expression.
	   * Returns a an object with a function `eval([scope])` to evaluate the
	   * compiled expression.
	   *
	   * Syntax:
	   *
	   *     var code = math.compile(expr)
	   *     var codes = math.compile([expr1, expr2, expr3, ...])
	   *
	   * Example:
	   *
	   *     var code = math.compile('sqrt(3^2 + 4^2)');
	   *     code.eval(); // 5
	   *
	   *     var scope = {a: 3, b: 4}
	   *     var code = math.compile('a * b'); // 12
	   *     code.eval(scope); // 12
	   *     scope.a = 5;
	   *     code.eval(scope); // 20
	   *
	   *     var nodes = math.compile(['a = 3', 'b = 4', 'a * b']);
	   *     nodes[2].eval(); // 12
	   *
	   * @param {String | String[] | Matrix} expr
	   * @return {Object | Object[]} code
	   * @throws {Error}
	   */
	  math.compile = function compile (expr) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('compile', arguments.length, 1);
	    }

	    if (isString(expr)) {
	      // evaluate a single expression
	      return _parse(expr).compile(math);
	    }
	    else if (isCollection(expr)) {
	      // evaluate an array or matrix with expressions
	      return collection.deepMap(expr, function (elem) {
	        return _parse(elem).compile(math);
	      });
	    }
	    else {
	      // oops
	      throw new TypeError('String, array, or matrix expected');
	    }
	  }
	};


/***/ },
/* 16 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),
	      _parse = require(4),

	      collection = require(13),

	      isString = util.string.isString,
	      isCollection = collection.isCollection;

	  /**
	   * Evaluate an expression.
	   *
	   * Syntax:
	   *
	   *     math.eval(expr)
	   *     math.eval(expr, scope)
	   *     math.eval([expr1, expr2, expr3, ...])
	   *     math.eval([expr1, expr2, expr3, ...], scope)
	   *
	   * Example:
	   *
	   *     math.eval('(2+3)/4');                // 1.25
	   *     math.eval('sqrt(3^2 + 4^2)');        // 5
	   *     math.eval('sqrt(-4)');               // 2i
	   *     math.eval(['a=3', 'b=4', 'a*b']);,   // [3, 4, 12]
	   *
	   *     var scope = {a:3, b:4};
	   *     math.eval('a * b', scope);           // 12
	   *
	   * @param {String | String[] | Matrix} expr
	   * @param {Object} [scope]
	   * @return {*} res
	   * @throws {Error}
	   */
	  math.eval = function _eval (expr, scope) {
	    if (arguments.length != 1 && arguments.length != 2) {
	      throw new math.error.ArgumentsError('eval', arguments.length, 1, 2);
	    }

	    // instantiate a scope
	    scope = scope || {};

	    if (isString(expr)) {
	      // evaluate a single expression
	      return _parse(expr)
	          .compile(math)
	          .eval(scope);
	    }
	    else if (isCollection(expr)) {
	      // evaluate an array or matrix with expressions
	      return collection.deepMap(expr, function (elem) {
	        return _parse(elem)
	            .compile(math).eval(scope);
	      });
	    }
	    else {
	      // oops
	      throw new TypeError('String, array, or matrix expected');
	    }
	  };
	};


/***/ },
/* 17 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var Help = require(12);

	  /**
	   * Retrieve help on a function or data type.
	   * Help files are retrieved from the documentation in math.expression.docs.
	   * @param {function | string | Object} search
	   * @return {Help} help
	   */
	  math.help = function help(search) {
	    if (arguments.length != 1) {
	      throw new SyntaxError('Wrong number of arguments in function help ' +
	          '(' + arguments.length + ' provided, 1 expected)');
	    }

	    var text = null;
	    if ((search instanceof String) || (typeof(search) === 'string')) {
	      text = search;
	    }
	    else {
	      var prop;
	      for (prop in math) {
	        // search in functions and constants
	        if (math.hasOwnProperty(prop)) {
	          if (search === math[prop]) {
	            text = prop;
	            break;
	          }
	        }
	      }

	      if (!text) {
	        // search data type
	        for (prop in math.type) {
	          if (math.type.hasOwnProperty(prop)) {
	            if (search === math.type[prop]) {
	              text = prop;
	              break;
	            }
	          }
	        }
	      }
	    }

	    if (!text) {
	      throw new Error('Could not find search term "' + search + '"');
	    }
	    else {
	      var doc = math.expression.docs[text];
	      if (!doc) {
	        throw new Error('No documentation found on "' + text + '"');
	      }
	      return new Help(math, doc);
	    }
	  };
	};


/***/ },
/* 18 */
/***/ function(module, exports, require) {

	module.exports = function (math, settings) {
	  var _parse = require(4);

	  /**
	   * Parse an expression.
	   * Returns a node tree which can be compiled and evaluated.
	   *
	   * Syntax:
	   *
	   *     math.parse(expr)
	   *     math.parse(expr, nodes)
	   *     math.parse([expr1, expr2, expr3, ...])
	   *     math.parse([expr1, expr2, expr3, ...], nodes)
	   *
	   * Example:
	   *
	   *     var node = math.parse('sqrt(3^2 + 4^2)');
	   *     node.compile(math).eval(); // 5
	   *
	   *     var scope = {a: 3, b: 4}
	   *     var node = math.parse('a * b'); // 12
	   *     var code = node.compile(math);
	   *     code.eval(scope); // 12
	   *     scope.a = 5;
	   *     code.eval(scope); // 20
	   *
	   *     var nodes = math.parse(['a = 3', 'b = 4', 'a * b']);
	   *     nodes[2].compile(math).eval(); // 12
	   *
	   * @param {String | String[] | Matrix} expr
	   * @param {Object<String, Node>} [nodes]
	   * @return {Node | Node[]} node
	   * @throws {Error}
	   */
	  math.parse = function parse (expr, nodes) {
	    return _parse.apply(_parse, arguments);
	  }

	};


/***/ },
/* 19 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      Matrix = require(10),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isComplex = Complex.isComplex,
	      isCollection = collection.isCollection;

	  /**
	   * Calculate the absolute value of a value.
	   *
	   *     abs(x)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param  {Number | BigNumber | Boolean | Complex | Array | Matrix} x
	   * @return {Number | BigNumber | Complex | Array | Matrix} res
	   */
	  math.abs = function abs(x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('abs', arguments.length, 1);
	    }

	    if (isNumber(x)) {
	      return Math.abs(x);
	    }

	    if (isComplex(x)) {
	      return Math.sqrt(x.re * x.re + x.im * x.im);
	    }

	    if (x instanceof BigNumber) {
	      return x.abs();
	    }

	    if (isCollection(x)) {
	      return collection.deepMap(x, abs);
	    }

	    if (isBoolean(x)) {
	      return Math.abs(x);
	    }

	    throw new math.error.UnsupportedTypeError('abs', x);
	  };
	};


/***/ },
/* 20 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      Matrix = require(10),
	      Unit = require(11),
	      collection = require(13),

	      isBoolean = util['boolean'].isBoolean,
	      isNumber = util.number.isNumber,
	      toNumber = util.number.toNumber,
	      toBigNumber = util.number.toBigNumber,
	      isString = util.string.isString,
	      isComplex = Complex.isComplex,
	      isUnit = Unit.isUnit,
	      isCollection = collection.isCollection;

	  /**
	   * Add two values
	   *
	   *     x + y
	   *     add(x, y)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param  {Number | BigNumber | Boolean | Complex | Unit | String | Array | Matrix} x
	   * @param  {Number | BigNumber | Boolean | Complex | Unit | String | Array | Matrix} y
	   * @return {Number | BigNumber | Complex | Unit | String | Array | Matrix} res
	   */
	  math.add = function add(x, y) {
	    if (arguments.length != 2) {
	      throw new math.error.ArgumentsError('add', arguments.length, 2);
	    }

	    if (isNumber(x)) {
	      if (isNumber(y)) {
	        // number + number
	        return x + y;
	      }
	      else if (isComplex(y)) {
	        // number + complex
	        return new Complex(
	            x + y.re,
	            y.im
	        )
	      }
	    }

	    if (isComplex(x)) {
	      if (isComplex(y)) {
	        // complex + complex
	        return new Complex(
	            x.re + y.re,
	            x.im + y.im
	        );
	      }
	      else if (isNumber(y)) {
	        // complex + number
	        return new Complex(
	            x.re + y,
	            x.im
	        )
	      }
	    }

	    if (isUnit(x)) {
	      if (isUnit(y)) {
	        if (!x.equalBase(y)) {
	          throw new Error('Units do not match');
	        }

	        if (x.value == null) {
	          throw new Error('Unit on left hand side of operator + has an undefined value');
	        }

	        if (y.value == null) {
	          throw new Error('Unit on right hand side of operator + has an undefined value');
	        }

	        var res = x.clone();
	        res.value += y.value;
	        res.fixPrefix = false;
	        return res;
	      }
	    }

	    if (x instanceof BigNumber) {
	      // try to convert to big number
	      if (isNumber(y)) {
	        y = toBigNumber(y);
	      }
	      else if (isBoolean(y)) {
	        y = new BigNumber(y ? 1 : 0);
	      }

	      if (y instanceof BigNumber) {
	        return x.plus(y);
	      }

	      // downgrade to Number
	      return add(toNumber(x), y);
	    }
	    if (y instanceof BigNumber) {
	      // try to convert to big number
	      if (isNumber(x)) {
	        x = toBigNumber(x);
	      }
	      else if (isBoolean(x)) {
	        x = new BigNumber(x ? 1 : 0);
	      }

	      if (x instanceof BigNumber) {
	        return x.plus(y)
	      }

	      // downgrade to Number
	      return add(x, toNumber(y));
	    }

	    if (isString(x) || isString(y)) {
	      return x + y;
	    }

	    if (isCollection(x) || isCollection(y)) {
	      return collection.deepMap2(x, y, add);
	    }

	    if (isBoolean(x)) {
	      return add(+x, y);
	    }
	    if (isBoolean(y)) {
	      return add(x, +y);
	    }

	    throw new math.error.UnsupportedTypeError('add', x, y);
	  };
	};


/***/ },
/* 21 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isCollection =collection.isCollection,
	      isComplex = Complex.isComplex;

	  /**
	   * Round a value towards plus infinity
	   *
	   *     ceil(x)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param  {Number | BigNumber | Boolean | Complex | Array | Matrix} x
	   * @return {Number | BigNumber | Complex | Array | Matrix} res
	   */
	  math.ceil = function ceil(x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('ceil', arguments.length, 1);
	    }

	    if (isNumber(x)) {
	      return Math.ceil(x);
	    }

	    if (isComplex(x)) {
	      return new Complex (
	          Math.ceil(x.re),
	          Math.ceil(x.im)
	      );
	    }

	    if (x instanceof BigNumber) {
	      return x.ceil();
	    }

	    if (isCollection(x)) {
	      return collection.deepMap(x, ceil);
	    }

	    if (isBoolean(x)) {
	      return Math.ceil(x);
	    }

	    throw new math.error.UnsupportedTypeError('ceil', x);
	  };
	};


/***/ },
/* 22 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isComplex = Complex.isComplex,
	      isCollection = collection.isCollection;

	  /**
	   * Compute the cube of a value
	   *
	   *     x .* x .* x
	   *     cube(x)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param  {Number | BigNumber | Boolean | Complex | Array | Matrix} x
	   * @return {Number | BigNumber | Complex | Array | Matrix} res
	   */
	  math.cube = function cube(x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('cube', arguments.length, 1);
	    }

	    if (isNumber(x)) {
	      return x * x * x;
	    }

	    if (isComplex(x)) {
	      return math.multiply(math.multiply(x, x), x);
	    }

	    if (x instanceof BigNumber) {
	      return x.times(x).times(x);
	    }

	    if (isCollection(x)) {
	      return collection.deepMap(x, cube);
	    }

	    if (isBoolean(x)) {
	      return cube(+x);
	    }

	    throw new math.error.UnsupportedTypeError('cube', x);
	  };
	};


/***/ },
/* 23 */
/***/ function(module, exports, require) {

	module.exports = function(math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      Matrix = require(10),
	      Unit = require(11),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      toNumber = util.number.toNumber,
	      toBigNumber = util.number.toBigNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isComplex = Complex.isComplex,
	      isUnit = Unit.isUnit,
	      isCollection = collection.isCollection;

	  /**
	   * Divide two values.
	   *
	   *     x / y
	   *     divide(x, y)
	   *
	   * @param  {Number | BigNumber | Boolean | Complex | Unit | Array | Matrix} x
	   * @param  {Number | BigNumber | Boolean | Complex} y
	   * @return {Number | BigNumber | Complex | Unit | Array | Matrix} res
	   */
	  math.divide = function divide(x, y) {
	    if (arguments.length != 2) {
	      throw new math.error.ArgumentsError('divide', arguments.length, 2);
	    }

	    if (isNumber(x)) {
	      if (isNumber(y)) {
	        // number / number
	        return x / y;
	      }
	      else if (isComplex(y)) {
	        // number / complex
	        return _divideComplex(new Complex(x, 0), y);
	      }
	    }

	    if (isComplex(x)) {
	      if (isComplex(y)) {
	        // complex / complex
	        return _divideComplex(x, y);
	      }
	      else if (isNumber(y)) {
	        // complex / number
	        return _divideComplex(x, new Complex(y, 0));
	      }
	    }

	    if (x instanceof BigNumber) {
	      // try to convert to big number
	      if (isNumber(y)) {
	        y = toBigNumber(y);
	      }
	      else if (isBoolean(y)) {
	        y = new BigNumber(y ? 1 : 0);
	      }

	      if (y instanceof BigNumber) {
	        return x.div(y);
	      }

	      // downgrade to Number
	      return divide(toNumber(x), y);
	    }
	    if (y instanceof BigNumber) {
	      // try to convert to big number
	      if (isNumber(x)) {
	        x = toBigNumber(x);
	      }
	      else if (isBoolean(x)) {
	        x = new BigNumber(x ? 1 : 0);
	      }

	      if (x instanceof BigNumber) {
	        return x.div(y)
	      }

	      // downgrade to Number
	      return divide(x, toNumber(y));
	    }

	    if (isUnit(x)) {
	      if (isNumber(y)) {
	        var res = x.clone();
	        res.value /= y;
	        return res;
	      }
	    }

	    if (isCollection(x)) {
	      if (isCollection(y)) {
	        // TODO: implement matrix right division using pseudo inverse
	        // http://www.mathworks.nl/help/matlab/ref/mrdivide.html
	        // http://www.gnu.org/software/octave/doc/interpreter/Arithmetic-Ops.html
	        // http://stackoverflow.com/questions/12263932/how-does-gnu-octave-matrix-division-work-getting-unexpected-behaviour
	        return math.multiply(x, math.inv(y));
	      }
	      else {
	        // matrix / scalar
	        return collection.deepMap2(x, y, divide);
	      }
	    }

	    if (isCollection(y)) {
	      // TODO: implement matrix right division using pseudo inverse
	      return math.multiply(x, math.inv(y));
	    }

	    if (isBoolean(x)) {
	      return divide(+x, y);
	    }
	    if (isBoolean(y)) {
	      return divide(x, +y);
	    }

	    throw new math.error.UnsupportedTypeError('divide', x, y);
	  };

	  /**
	   * Divide two complex numbers. x / y or divide(x, y)
	   * @param {Complex} x
	   * @param {Complex} y
	   * @return {Complex} res
	   * @private
	   */
	  function _divideComplex (x, y) {
	    var den = y.re * y.re + y.im * y.im;
	    if (den != 0) {
	      return new Complex(
	          (x.re * y.re + x.im * y.im) / den,
	          (x.im * y.re - x.re * y.im) / den
	      );
	    }
	    else {
	      // both y.re and y.im are zero
	      return new Complex(
	          (x.re != 0) ? (x.re / 0) : 0,
	          (x.im != 0) ? (x.im / 0) : 0
	      );
	    }
	  }
	};


/***/ },
/* 24 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var collection = require(13);

	  /**
	   * Divide two values element wise.
	   *
	   *     x ./ y
	   *     edivide(x, y)
	   *
	   * @param  {Number | BigNumber | Boolean | Complex | Unit | Array | Matrix} x
	   * @param  {Number | BigNumber | Boolean | Complex | Unit | Array | Matrix} y
	   * @return {Number | BigNumber | Complex | Unit | Array | Matrix} res
	   */
	  math.edivide = function edivide(x, y) {
	    if (arguments.length != 2) {
	      throw new math.error.ArgumentsError('edivide', arguments.length, 2);
	    }

	    return collection.deepMap2(x, y, math.divide);
	  };
	};


/***/ },
/* 25 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var collection = require(13);

	  /**
	   * Multiply two values element wise.
	   *
	   *     x .* y
	   *     emultiply(x, y)
	   *
	   * @param  {Number | BigNumber | Boolean | Complex | Unit | Array | Matrix} x
	   * @param  {Number | BigNumber | Boolean | Complex | Unit | Array | Matrix} y
	   * @return {Number | BigNumber | Complex | Unit | Array | Matrix} res
	   */
	  math.emultiply = function emultiply(x, y) {
	    if (arguments.length != 2) {
	      throw new math.error.ArgumentsError('emultiply', arguments.length, 2);
	    }

	    return collection.deepMap2(x, y, math.multiply);
	  };
	};


/***/ },
/* 26 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var collection = require(13);

	  /**
	   * Calculates the power of x to y element wise
	   *
	   *     x .^ y
	   *     epow(x, y)
	   *
	   * @param  {Number | BigNumber | Boolean | Complex | Unit | Array | Matrix} x
	   * @param  {Number | BigNumber | Boolean | Complex | Unit | Array | Matrix} y
	   * @return {Number | BigNumber | Complex | Unit | Array | Matrix} res
	   */
	  math.epow = function epow(x, y) {
	    if (arguments.length != 2) {
	      throw new math.error.ArgumentsError('epow', arguments.length, 2);
	    }

	    return collection.deepMap2(x, y, math.pow);
	  };
	};


/***/ },
/* 27 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      Unit = require(11),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      toNumber = util.number.toNumber,
	      toBigNumber = util.number.toBigNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isString = util.string.isString,
	      isComplex = Complex.isComplex,
	      isUnit = Unit.isUnit,
	      isCollection = collection.isCollection;

	  /**
	   * Check if value x equals y,
	   *
	   *     x == y
	   *     equal(x, y)
	   *
	   * For matrices, the function is evaluated element wise.
	   * In case of complex numbers, x.re must equal y.re, and x.im must equal y.im.
	   *
	   * @param  {Number | BigNumber | Boolean | Complex | Unit | String | Array | Matrix} x
	   * @param  {Number | BigNumber | Boolean | Complex | Unit | String | Array | Matrix} y
	   * @return {Boolean | Array | Matrix} res
	   */
	  math.equal = function equal(x, y) {
	    if (arguments.length != 2) {
	      throw new math.error.ArgumentsError('equal', arguments.length, 2);
	    }

	    if (isNumber(x)) {
	      if (isNumber(y)) {
	        return x == y;
	      }
	      else if (isComplex(y)) {
	        return (x == y.re) && (y.im == 0);
	      }
	    }

	    if (isComplex(x)) {
	      if (isNumber(y)) {
	        return (x.re == y) && (x.im == 0);
	      }
	      else if (isComplex(y)) {
	        return (x.re == y.re) && (x.im == y.im);
	      }
	    }

	    if (x instanceof BigNumber) {
	      // try to convert to big number
	      if (isNumber(y)) {
	        y = toBigNumber(y);
	      }
	      else if (isBoolean(y)) {
	        y = new BigNumber(y ? 1 : 0);
	      }

	      if (y instanceof BigNumber) {
	        return x.eq(y);
	      }

	      // downgrade to Number
	      return equal(toNumber(x), y);
	    }
	    if (y instanceof BigNumber) {
	      // try to convert to big number
	      if (isNumber(x)) {
	        x = toBigNumber(x);
	      }
	      else if (isBoolean(x)) {
	        x = new BigNumber(x ? 1 : 0);
	      }

	      if (x instanceof BigNumber) {
	        return x.eq(y)
	      }

	      // downgrade to Number
	      return equal(x, toNumber(y));
	    }

	    if ((isUnit(x)) && (isUnit(y))) {
	      if (!x.equalBase(y)) {
	        throw new Error('Cannot compare units with different base');
	      }
	      return x.value == y.value;
	    }

	    if (isString(x) || isString(y)) {
	      return x == y;
	    }

	    if (isCollection(x) || isCollection(y)) {
	      return collection.deepMap2(x, y, equal);
	    }

	    if (isBoolean(x)) {
	      return equal(+x, y);
	    }
	    if (isBoolean(y)) {
	      return equal(x, +y);
	    }

	    throw new math.error.UnsupportedTypeError('equal', x, y);
	  };
	};


/***/ },
/* 28 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      Matrix = require(10),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isComplex = Complex.isComplex,
	      isCollection = collection.isCollection;

	  /**
	   * Calculate the exponent of a value
	   *
	   *     exp(x)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param {Number | Boolean | Complex | Array | Matrix} x
	   * @return {Number | Complex | Array | Matrix} res
	   */
	  math.exp = function exp (x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('exp', arguments.length, 1);
	    }

	    if (isNumber(x)) {
	      return Math.exp(x);
	    }

	    if (isComplex(x)) {
	      var r = Math.exp(x.re);
	      return new Complex(
	          r * Math.cos(x.im),
	          r * Math.sin(x.im)
	      );
	    }

	    if (x instanceof BigNumber) {
	      // TODO: implement BigNumber support
	      // downgrade to Number
	      return exp(util.number.toNumber(x));
	    }

	    if (isCollection(x)) {
	      return collection.deepMap(x, exp);
	    }

	    if (isBoolean(x)) {
	      return Math.exp(x);
	    }

	    throw new math.error.UnsupportedTypeError('exp', x);
	  };
	};


/***/ },
/* 29 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isComplex = Complex.isComplex,
	      isCollection = collection.isCollection;

	  /**
	   * Round a value towards zero
	   *
	   *     fix(x)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param {Number | Boolean | Complex | Array | Matrix} x
	   * @return {Number | Complex | Array | Matrix} res
	   */
	  math.fix = function fix(x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('fix', arguments.length, 1);
	    }

	    if (isNumber(x)) {
	      return (x > 0) ? Math.floor(x) : Math.ceil(x);
	    }

	    if (isComplex(x)) {
	      return new Complex(
	          (x.re > 0) ? Math.floor(x.re) : Math.ceil(x.re),
	          (x.im > 0) ? Math.floor(x.im) : Math.ceil(x.im)
	      );
	    }

	    if (x instanceof BigNumber) {
	      return x.isNegative() ? x.ceil() : x.floor();
	    }

	    if (isCollection(x)) {
	      return collection.deepMap(x, fix);
	    }

	    if (isBoolean(x)) {
	      return fix(+x);
	    }

	    throw new math.error.UnsupportedTypeError('fix', x);
	  };
	};


/***/ },
/* 30 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isComplex = Complex.isComplex,
	      isCollection = collection.isCollection;

	  /**
	   * Round a value towards minus infinity
	   *
	   *     floor(x)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param  {Number | BigNumber | Boolean | Complex | Array | Matrix} x
	   * @return {Number | BigNumber | Complex | Array | Matrix} res
	   */
	  math.floor = function floor(x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('floor', arguments.length, 1);
	    }

	    if (isNumber(x)) {
	      return Math.floor(x);
	    }

	    if (isComplex(x)) {
	      return new Complex (
	          Math.floor(x.re),
	          Math.floor(x.im)
	      );
	    }

	    if (x instanceof BigNumber) {
	      return x.floor();
	    }

	    if (isCollection(x)) {
	      return collection.deepMap(x, floor);
	    }

	    if (isBoolean(x)) {
	      return floor(+x);
	    }

	    throw new math.error.UnsupportedTypeError('floor', x);
	  };
	};


/***/ },
/* 31 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      toNumber = util.number.toNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isInteger = util.number.isInteger,
	      isCollection = collection.isCollection;

	  /**
	   * Calculate the greatest common divisor for two or more values or arrays.
	   *
	   *     gcd(a, b)
	   *     gcd(a, b, c, ...)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param {... Number | Boolean | Array | Matrix} args    two or more integer numbers
	   * @return {Number | Array | Matrix} greatest common divisor
	   */
	  math.gcd = function gcd(args) {
	    var a = arguments[0],
	        b = arguments[1],
	        r; // remainder

	    if (arguments.length == 2) {
	      // two arguments
	      if (isNumber(a) && isNumber(b)) {
	        if (!isInteger(a) || !isInteger(b)) {
	          throw new Error('Parameters in function gcd must be integer numbers');
	        }

	        // http://en.wikipedia.org/wiki/Euclidean_algorithm
	        while (b != 0) {
	          r = a % b;
	          a = b;
	          b = r;
	        }
	        return (a < 0) ? -a : a;
	      }

	      // evaluate gcd element wise
	      if (isCollection(a) || isCollection(b)) {
	        return collection.deepMap2(a, b, gcd);
	      }

	      // TODO: implement BigNumber support for gcd

	      // downgrade bignumbers to numbers
	      if (a instanceof BigNumber) {
	        return gcd(toNumber(a), b);
	      }
	      if (b instanceof BigNumber) {
	        return gcd(a, toNumber(b));
	      }

	      if (isBoolean(a)) {
	        return gcd(+a, b);
	      }
	      if (isBoolean(b)) {
	        return gcd(a, +b);
	      }

	      throw new math.error.UnsupportedTypeError('gcd', a, b);
	    }

	    if (arguments.length > 2) {
	      // multiple arguments. Evaluate them iteratively
	      for (var i = 1; i < arguments.length; i++) {
	        a = gcd(a, arguments[i]);
	      }
	      return a;
	    }

	    // zero or one argument
	    throw new SyntaxError('Function gcd expects two or more arguments');
	  };
	};


/***/ },
/* 32 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      Unit = require(11),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      toNumber = util.number.toNumber,
	      toBigNumber = util.number.toBigNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isString = util.string.isString,
	      isComplex = Complex.isComplex,
	      isUnit = Unit.isUnit,
	      isCollection = collection.isCollection;

	  /**
	   * Check if value x is larger y
	   *
	   *    x > y
	   *    larger(x, y)
	   *
	   * For matrices, the function is evaluated element wise.
	   * In case of complex numbers, the absolute values of a and b are compared.
	   *
	   * @param  {Number | BigNumber | Boolean | Unit | String | Array | Matrix} x
	   * @param  {Number | BigNumber | Boolean | Unit | String | Array | Matrix} y
	   * @return {Boolean | Array | Matrix} res
	   */
	  math.larger = function larger(x, y) {
	    if (arguments.length != 2) {
	      throw new math.error.ArgumentsError('larger', arguments.length, 2);
	    }

	    if (isNumber(x) && isNumber(y)) {
	      return x > y;
	    }

	    if (x instanceof BigNumber) {
	      // try to convert to big number
	      if (isNumber(y)) {
	        y = toBigNumber(y);
	      }
	      else if (isBoolean(y)) {
	        y = new BigNumber(y ? 1 : 0);
	      }

	      if (y instanceof BigNumber) {
	        return x.gt(y);
	      }

	      // downgrade to Number
	      return larger(toNumber(x), y);
	    }
	    if (y instanceof BigNumber) {
	      // try to convert to big number
	      if (isNumber(x)) {
	        x = toBigNumber(x);
	      }
	      else if (isBoolean(x)) {
	        x = new BigNumber(x ? 1 : 0);
	      }

	      if (x instanceof BigNumber) {
	        return x.gt(y)
	      }

	      // downgrade to Number
	      return larger(x, toNumber(y));
	    }

	    if ((isUnit(x)) && (isUnit(y))) {
	      if (!x.equalBase(y)) {
	        throw new Error('Cannot compare units with different base');
	      }
	      return x.value > y.value;
	    }

	    if (isString(x) || isString(y)) {
	      return x > y;
	    }

	    if (isCollection(x) || isCollection(y)) {
	      return collection.deepMap2(x, y, larger);
	    }

	    if (isBoolean(x)) {
	      return larger(+x, y);
	    }
	    if (isBoolean(y)) {
	      return larger(x, +y);
	    }

	    if (isComplex(x) || isComplex(y)) {
	      throw new TypeError('No ordering relation is defined for complex numbers');
	    }

	    throw new math.error.UnsupportedTypeError('larger', x, y);
	  };
	};


/***/ },
/* 33 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      Unit = require(11),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      toNumber = util.number.toNumber,
	      toBigNumber = util.number.toBigNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isString = util.string.isString,
	      isComplex = Complex.isComplex,
	      isUnit = Unit.isUnit,
	      isCollection = collection.isCollection;

	  /**
	   * Check if value x is larger or equal to y
	   *
	   *     x >= y
	   *     largereq(x, y)
	   *
	   * For matrices, the function is evaluated element wise.
	   * In case of complex numbers, the absolute values of a and b are compared.
	   *
	   * @param  {Number | BigNumber | Boolean | Unit | String | Array | Matrix} x
	   * @param  {Number | BigNumber | Boolean | Unit | String | Array | Matrix} y
	   * @return {Boolean | Array | Matrix} res
	   */
	  math.largereq = function largereq(x, y) {
	    if (arguments.length != 2) {
	      throw new math.error.ArgumentsError('largereq', arguments.length, 2);
	    }

	    if (isNumber(x) && isNumber(y)) {
	      return x >= y;
	    }

	    if (x instanceof BigNumber) {
	      // try to convert to big number
	      if (isNumber(y)) {
	        y = toBigNumber(y);
	      }
	      else if (isBoolean(y)) {
	        y = new BigNumber(y ? 1 : 0);
	      }

	      if (y instanceof BigNumber) {
	        return x.gte(y);
	      }

	      // downgrade to Number
	      return largereq(toNumber(x), y);
	    }
	    if (y instanceof BigNumber) {
	      // try to convert to big number
	      if (isNumber(x)) {
	        x = toBigNumber(x);
	      }
	      else if (isBoolean(x)) {
	        x = new BigNumber(x ? 1 : 0);
	      }

	      if (x instanceof BigNumber) {
	        return x.gte(y)
	      }

	      // downgrade to Number
	      return largereq(x, toNumber(y));
	    }

	    if ((isUnit(x)) && (isUnit(y))) {
	      if (!x.equalBase(y)) {
	        throw new Error('Cannot compare units with different base');
	      }
	      return x.value >= y.value;
	    }

	    if (isString(x) || isString(y)) {
	      return x >= y;
	    }

	    if (isCollection(x) || isCollection(y)) {
	      return collection.deepMap2(x, y, largereq);
	    }

	    if (isBoolean(x)) {
	      return largereq(+x, y);
	    }
	    if (isBoolean(y)) {
	      return largereq(x, +y);
	    }

	    if (isComplex(x) || isComplex(y)) {
	      throw new TypeError('No ordering relation is defined for complex numbers');
	    }

	    throw new math.error.UnsupportedTypeError('largereq', x, y);
	  };
	};


/***/ },
/* 34 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      toNumber = util.number.toNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isInteger = util.number.isInteger,
	      isCollection = collection.isCollection;

	  /**
	   * Calculate the least common multiple for two or more values or arrays.
	   *
	   *     lcm(a, b)
	   *     lcm(a, b, c, ...)
	   *
	   * lcm is defined as:
	   *     lcm(a, b) = abs(a * b) / gcd(a, b)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param {... Number | Boolean | Array | Matrix} args    two or more integer numbers
	   * @return {Number | Array | Matrix} least common multiple
	   */
	  math.lcm = function lcm(args) {
	    var a = arguments[0],
	        b = arguments[1],
	        t;

	    if (arguments.length == 2) {
	      // two arguments
	      if (isNumber(a) && isNumber(b)) {
	        if (!isInteger(a) || !isInteger(b)) {
	          throw new Error('Parameters in function lcm must be integer numbers');
	        }

	        if (a == 0 || b == 0) {
	          return 0;
	        }

	        // http://en.wikipedia.org/wiki/Euclidean_algorithm
	        // evaluate gcd here inline to reduce overhead
	        var prod = a * b;
	        while (b != 0) {
	          t = b;
	          b = a % t;
	          a = t;
	        }
	        return Math.abs(prod / a);
	      }

	      // evaluate lcm element wise
	      if (isCollection(a) || isCollection(b)) {
	        return collection.deepMap2(a, b, lcm);
	      }

	      if (isBoolean(a)) {
	        return lcm(+a, b);
	      }
	      if (isBoolean(b)) {
	        return lcm(a, +b);
	      }

	      // TODO: implement BigNumber support for lcm

	      // downgrade bignumbers to numbers
	      if (a instanceof BigNumber) {
	        return lcm(toNumber(a), b);
	      }
	      if (b instanceof BigNumber) {
	        return lcm(a, toNumber(b));
	      }

	      throw new math.error.UnsupportedTypeError('lcm', a, b);
	    }

	    if (arguments.length > 2) {
	      // multiple arguments. Evaluate them iteratively
	      for (var i = 1; i < arguments.length; i++) {
	        a = lcm(a, arguments[i]);
	      }
	      return a;
	    }

	    // zero or one argument
	    throw new SyntaxError('Function lcm expects two or more arguments');
	  };
	};


/***/ },
/* 35 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isComplex = Complex.isComplex,
	      isCollection = collection.isCollection;

	  /**
	   * Calculate the logarithm of a value
	   *
	   *     log(x)
	   *     log(x, base)
	   *
	   * base is optional. If not provided, the natural logarithm of x is calculated.
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param {Number | Boolean | Complex | Array | Matrix} x
	   * @param {Number | Boolean | Complex} [base]
	   * @return {Number | Complex | Array | Matrix} res
	   */
	  math.log = function log(x, base) {
	    if (arguments.length == 1) {
	      // calculate natural logarithm, log(x)
	      if (isNumber(x)) {
	        if (x >= 0) {
	          return Math.log(x);
	        }
	        else {
	          // negative value -> complex value computation
	          return log(new Complex(x, 0));
	        }
	      }

	      if (isComplex(x)) {
	        return new Complex (
	            Math.log(Math.sqrt(x.re * x.re + x.im * x.im)),
	            Math.atan2(x.im, x.re)
	        );
	      }

	      if (x instanceof BigNumber) {
	        // TODO: implement BigNumber support
	        // downgrade to Number
	        return log(util.number.toNumber(x));
	      }

	      if (isCollection(x)) {
	        return collection.deepMap(x, log);
	      }

	      if (isBoolean(x)) {
	        return log(+x);
	      }

	      throw new math.error.UnsupportedTypeError('log', x);
	    }
	    else if (arguments.length == 2) {
	      // calculate logarithm for a specified base, log(x, base)
	      return math.divide(log(x), log(base));
	    }
	    else {
	      throw new math.error.ArgumentsError('log', arguments.length, 1, 2);
	    }
	  };
	};


/***/ },
/* 36 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isComplex = Complex.isComplex,
	      isCollection = collection.isCollection;

	  /**
	   * Calculate the 10-base logarithm of a value
	   *
	   *     log10(x)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param {Number | Boolean | Complex | Array | Matrix} x
	   * @return {Number | Complex | Array | Matrix} res
	   */
	  math.log10 = function log10(x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('log10', arguments.length, 1);
	    }

	    if (isNumber(x)) {
	      if (x >= 0) {
	        return Math.log(x) / Math.LN10;
	      }
	      else {
	        // negative value -> complex value computation
	        return log10(new Complex(x, 0));
	      }
	    }

	    if (x instanceof BigNumber) {
	      // TODO: implement BigNumber support
	      // downgrade to Number
	      return log10(util.number.toNumber(x));
	    }

	    if (isComplex(x)) {
	      return new Complex (
	          Math.log(Math.sqrt(x.re * x.re + x.im * x.im)) / Math.LN10,
	          Math.atan2(x.im, x.re) / Math.LN10
	      );
	    }

	    if (isCollection(x)) {
	      return collection.deepMap(x, log10);
	    }

	    if (isBoolean(x)) {
	      return log10(+x);
	    }

	    throw new math.error.UnsupportedTypeError('log10', x);
	  };
	};


/***/ },
/* 37 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      toNumber = util.number.toNumber,
	      toBigNumber = util.number.toBigNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isCollection = collection.isCollection;

	  /**
	   * Calculates the modulus, the remainder of an integer division.
	   *
	   *     x % y
	   *     mod(x, y)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param  {Number | BigNumber | Boolean | Array | Matrix} x
	   * @param  {Number | BigNumber | Boolean | Array | Matrix} y
	   * @return {Number | BigNumber | Array | Matrix} res
	   */
	  math.mod = function mod(x, y) {
	    if (arguments.length != 2) {
	      throw new math.error.ArgumentsError('mod', arguments.length, 2);
	    }

	    // see http://functions.wolfram.com/IntegerFunctions/Mod/

	    if (isNumber(x)) {
	      if (isNumber(y)) {
	        // number % number
	        return _mod(x, y);
	      }
	    }

	    if (x instanceof BigNumber) {
	      // try to convert to big number
	      if (isNumber(y)) {
	        y = toBigNumber(y);
	      }
	      else if (isBoolean(y)) {
	        y = new BigNumber(y ? 1 : 0);
	      }

	      if (y instanceof BigNumber) {
	        return x.mod(y);
	      }

	      // downgrade to Number
	      return mod(toNumber(x), y);
	    }
	    if (y instanceof BigNumber) {
	      // try to convert to big number
	      if (isNumber(x)) {
	        x = toBigNumber(x);
	      }
	      else if (isBoolean(x)) {
	        x = new BigNumber(x ? 1 : 0);
	      }

	      if (x instanceof BigNumber) {
	        return x.mod(y)
	      }

	      // downgrade to Number
	      return mod(x, toNumber(y));
	    }

	    // TODO: implement mod for complex values

	    if (isCollection(x) || isCollection(y)) {
	      return collection.deepMap2(x, y, mod);
	    }

	    if (isBoolean(x)) {
	      return mod(+x, y);
	    }
	    if (isBoolean(y)) {
	      return mod(x, +y);
	    }

	    throw new math.error.UnsupportedTypeError('mod', x, y);
	  };

	  /**
	   * Calculate the modulus of two numbers
	   * @param {Number} x
	   * @param {Number} y
	   * @returns {number} res
	   * @private
	   */
	  function _mod(x, y) {
	    if (y > 0) {
	      if (x > 0) {
	        return x % y;
	      }
	      else if (x == 0) {
	        return 0;
	      }
	      else { // x < 0
	        return x - y * Math.floor(x / y);
	      }
	    }
	    else if (y == 0) {
	      return x;
	    }
	    else { // y < 0
	      // TODO: implement mod for a negative divisor
	      throw new Error('Cannot calculate mod for a negative divisor');
	    }
	  }
	};


/***/ },
/* 38 */
/***/ function(module, exports, require) {

	module.exports = function(math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      Matrix = require(10),
	      Unit = require(11),
	      collection = require(13),

	      array = util.array,
	      isNumber = util.number.isNumber,
	      toNumber = util.number.toNumber,
	      toBigNumber = util.number.toBigNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isComplex = Complex.isComplex,
	      isArray = Array.isArray,
	      isUnit = Unit.isUnit;

	  /**
	   * Multiply two values.
	   *
	   *     x * y
	   *     multiply(x, y)
	   *
	   * @param  {Number | BigNumber | Boolean | Complex | Unit | Array | Matrix} x
	   * @param  {Number | BigNumber | Boolean | Complex | Unit | Array | Matrix} y
	   * @return {Number | BigNumber | Complex | Unit | Array | Matrix} res
	   */
	  math.multiply = function multiply(x, y) {
	    if (arguments.length != 2) {
	      throw new math.error.ArgumentsError('multiply', arguments.length, 2);
	    }

	    if (isNumber(x)) {
	      if (isNumber(y)) {
	        // number * number
	        return x * y;
	      }
	      else if (isComplex(y)) {
	        // number * complex
	        return _multiplyComplex (new Complex(x, 0), y);
	      }
	      else if (isUnit(y)) {
	        res = y.clone();
	        res.value *= x;
	        return res;
	      }
	    }

	    if (isComplex(x)) {
	      if (isNumber(y)) {
	        // complex * number
	        return _multiplyComplex (x, new Complex(y, 0));
	      }
	      else if (isComplex(y)) {
	        // complex * complex
	        return _multiplyComplex (x, y);
	      }
	    }

	    if (x instanceof BigNumber) {
	      // try to convert to big number
	      if (isNumber(y)) {
	        y = toBigNumber(y);
	      }
	      else if (isBoolean(y)) {
	        y = new BigNumber(y ? 1 : 0);
	      }

	      if (y instanceof BigNumber) {
	        return x.times(y);
	      }

	      // downgrade to Number
	      return multiply(toNumber(x), y);
	    }
	    if (y instanceof BigNumber) {
	      // try to convert to big number
	      if (isNumber(x)) {
	        x = toBigNumber(x);
	      }
	      else if (isBoolean(x)) {
	        x = new BigNumber(x ? 1 : 0);
	      }

	      if (x instanceof BigNumber) {
	        return x.times(y)
	      }

	      // downgrade to Number
	      return multiply(x, toNumber(y));
	    }

	    if (isUnit(x)) {
	      if (isNumber(y)) {
	        res = x.clone();
	        res.value *= y;
	        return res;
	      }
	    }

	    if (isArray(x)) {
	      if (isArray(y)) {
	        // array * array
	        var sizeX = array.size(x);
	        var sizeY = array.size(y);

	        if (sizeX.length == 1) {
	          if (sizeY.length == 1) {
	            // vector * vector
	            if (sizeX[0] != sizeY[0]) {
	              throw new RangeError('Dimensions mismatch in multiplication. ' +
	                  'Length of A must match length of B ' +
	                  '(A is ' + sizeX[0] +
	                  ', B is ' + sizeY[0] +
	                  sizeX[0] + ' != ' + sizeY[0] + ')');
	            }

	            return _multiplyVectorVector(x, y);
	          }
	          else if (sizeY.length == 2) {
	            // vector * matrix
	            if (sizeX[0] != sizeY[0]) {
	              throw new RangeError('Dimensions mismatch in multiplication. ' +
	                  'Length of A must match rows of B ' +
	                  '(A is ' + sizeX[0] +
	                  ', B is ' + sizeY[0] + 'x' + sizeY[1] + ', ' +
	                  sizeX[0] + ' != ' + sizeY[0] + ')');
	            }

	            return _multiplyVectorMatrix(x, y);
	          }
	          else {
	            throw new Error('Can only multiply a 1 or 2 dimensional matrix ' +
	                '(B has ' + sizeY.length + ' dimensions)');
	          }
	        }
	        else if (sizeX.length == 2) {
	          if (sizeY.length == 1) {
	            // matrix * vector
	            if (sizeX[1] != sizeY[0]) {
	              throw new RangeError('Dimensions mismatch in multiplication. ' +
	                  'Columns of A must match length of B ' +
	                  '(A is ' + sizeX[0] + 'x' + sizeX[0] +
	                  ', B is ' + sizeY[0] + ', ' +
	                  sizeX[1] + ' != ' + sizeY[0] + ')');
	            }

	            return _multiplyMatrixVector(x, y);
	          }
	          else if (sizeY.length == 2) {
	            // matrix * matrix
	            if (sizeX[1] != sizeY[0]) {
	              throw new RangeError('Dimensions mismatch in multiplication. ' +
	                  'Columns of A must match rows of B ' +
	                  '(A is ' + sizeX[0] + 'x' + sizeX[1] +
	                  ', B is ' + sizeY[0] + 'x' + sizeY[1] + ', ' +
	                  sizeX[1] + ' != ' + sizeY[0] + ')');
	            }

	            return _multiplyMatrixMatrix(x, y);
	          }
	          else {
	            throw new Error('Can only multiply a 1 or 2 dimensional matrix ' +
	                '(B has ' + sizeY.length + ' dimensions)');
	          }
	        }
	        else {
	          throw new Error('Can only multiply a 1 or 2 dimensional matrix ' +
	              '(A has ' + sizeX.length + ' dimensions)');
	        }
	      }
	      else if (y instanceof Matrix) {
	        // array * matrix
	        return new Matrix(multiply(x, y.valueOf()));
	      }
	      else {
	        // array * scalar
	        return collection.deepMap2(x, y, multiply);
	      }
	    }

	    if (x instanceof Matrix) {
	      if (y instanceof Matrix) {
	        // matrix * matrix
	        return new Matrix(multiply(x.valueOf(), y.valueOf()));
	      }
	      else {
	        // matrix * array
	        // matrix * scalar
	        return new Matrix(multiply(x.valueOf(), y));
	      }
	    }

	    if (isArray(y)) {
	      // scalar * array
	      return collection.deepMap2(x, y, multiply);
	    }
	    else if (y instanceof Matrix) {
	      // scalar * matrix
	      return new Matrix(collection.deepMap2(x, y.valueOf(), multiply));
	    }

	    if (isBoolean(x)) {
	      return multiply(+x, y);
	    }
	    if (isBoolean(y)) {
	      return multiply(x, +y);
	    }

	    throw new math.error.UnsupportedTypeError('multiply', x, y);
	  };

	  /**
	   * Multiply two 2-dimensional matrices.
	   * The size of the matrices is not validated.
	   * @param {Array} x   A 2d matrix
	   * @param {Array} y   A 2d matrix
	   * @return {Array} result
	   * @private
	   */
	  function _multiplyMatrixMatrix(x, y) {
	    // TODO: performance of matrix multiplication can be improved
	    var res = [],
	        rows = x.length,
	        cols = y[0].length,
	        num = x[0].length;

	    for (var r = 0; r < rows; r++) {
	      res[r] = [];
	      for (var c = 0; c < cols; c++) {
	        var result = null;
	        for (var n = 0; n < num; n++) {
	          var p = math.multiply(x[r][n], y[n][c]);
	          result = (result === null) ? p : math.add(result, p);
	        }
	        res[r][c] = result;
	      }
	    }

	    return res;
	  }

	  /**
	   * Multiply a vector with a 2-dimensional matrix
	   * The size of the matrices is not validated.
	   * @param {Array} x   A vector
	   * @param {Array} y   A 2d matrix
	   * @return {Array} result
	   * @private
	   */
	  function _multiplyVectorMatrix(x, y) {
	    // TODO: performance of matrix multiplication can be improved
	    var res = [],
	        rows = y.length,
	        cols = y[0].length;

	    for (var c = 0; c < cols; c++) {
	      var result = null;
	      for (var r = 0; r < rows; r++) {
	        var p = math.multiply(x[r], y[r][c]);
	        result = (r === 0) ? p : math.add(result, p);
	      }
	      res[c] = result;
	    }

	    return res;
	  }

	  /**
	   * Multiply a 2-dimensional matrix with a vector
	   * The size of the matrices is not validated.
	   * @param {Array} x   A 2d matrix
	   * @param {Array} y   A vector
	   * @return {Array} result
	   * @private
	   */
	  function _multiplyMatrixVector(x, y) {
	    // TODO: performance of matrix multiplication can be improved
	    var res = [],
	        rows = x.length,
	        cols = x[0].length;

	    for (var r = 0; r < rows; r++) {
	      var result = null;
	      for (var c = 0; c < cols; c++) {
	        var p = math.multiply(x[r][c], y[c]);
	        result = (c === 0) ? p : math.add(result, p);
	      }
	      res[r] = result;
	    }

	    return res;
	  }

	  /**
	   * Multiply two vectors, calculate the dot product
	   * The size of the matrices is not validated.
	   * @param {Array} x   A vector
	   * @param {Array} y   A vector
	   * @return {Number} dotProduct
	   * @private
	   */
	  function _multiplyVectorVector(x, y) {
	    // TODO: performance of matrix multiplication can be improved
	    var len = x.length,
	        dot = null;

	    if (len) {
	      dot = 0;

	      for (var i = 0, ii = x.length; i < ii; i++) {
	        dot = math.add(dot, math.multiply(x[i], y[i]));
	      }
	    }

	    return dot;
	  }

	  /**
	   * Multiply two complex numbers. x * y or multiply(x, y)
	   * @param {Complex} x
	   * @param {Complex} y
	   * @return {Complex | Number} res
	   * @private
	   */
	  function _multiplyComplex (x, y) {
	    // Note: we test whether x or y are pure real or pure complex,
	    // to prevent unnecessary NaN values. For example, Infinity*i should
	    // result in Infinity*i, and not in NaN+Infinity*i

	    if (x.im == 0) {
	      // x is pure real
	      if (y.im == 0) {
	        // y is pure real
	        return new Complex(x.re * y.re, 0);
	      }
	      else if (y.re == 0) {
	        // y is pure complex
	        return new Complex(
	            0,
	            x.re * y.im
	        );
	      }
	      else {
	        // y has a real and complex part
	        return new Complex(
	            x.re * y.re,
	            x.re * y.im
	        );
	      }
	    }
	    else if (x.re == 0) {
	      // x is pure complex
	      if (y.im == 0) {
	        // y is pure real
	        return new Complex(
	            0,
	            x.im * y.re
	        );
	      }
	      else if (y.re == 0) {
	        // y is pure complex
	        return new Complex(-x.im * y.im, 0);
	      }
	      else {
	        // y has a real and complex part
	        return new Complex(
	            -x.im * y.im,
	            x.im * y.re
	        );
	      }
	    }
	    else {
	      // x has a real and complex part
	      if (y.im == 0) {
	        // y is pure real
	        return new Complex(
	            x.re * y.re,
	            x.im * y.re
	        );
	      }
	      else if (y.re == 0) {
	        // y is pure complex
	        return new Complex(
	            -x.im * y.im,
	            x.re * y.im
	        );
	      }
	      else {
	        // y has a real and complex part
	        return new Complex(
	            x.re * y.re - x.im * y.im,
	            x.re * y.im + x.im * y.re
	        );
	      }
	    }
	  }
	};


/***/ },
/* 39 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      Matrix = require(10),
	      collection = require(13),

	      array = util.array,
	      isNumber = util.number.isNumber,
	      toNumber = util.number.toNumber,
	      toBigNumber = util.number.toBigNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isArray = Array.isArray,
	      isInteger = util.number.isInteger,
	      isComplex = Complex.isComplex;

	  /**
	   * Calculates the power of x to y
	   *
	   *     x ^ y
	   *     pow(x, y)
	   *
	   * @param  {Number | BigNumber | Boolean | Complex | Array | Matrix} x
	   * @param  {Number | BigNumber | Boolean | Complex} y
	   * @return {Number | BigNumber | Complex | Array | Matrix} res
	   */
	  math.pow = function pow(x, y) {
	    if (arguments.length != 2) {
	      throw new math.error.ArgumentsError('pow', arguments.length, 2);
	    }

	    if (isNumber(x)) {
	      if (isNumber(y)) {
	        if (isInteger(y) || x >= 0) {
	          // real value computation
	          return Math.pow(x, y);
	        }
	        else {
	          return powComplex(new Complex(x, 0), new Complex(y, 0));
	        }
	      }
	      else if (isComplex(y)) {
	        return powComplex(new Complex(x, 0), y);
	      }
	    }

	    if (isComplex(x)) {
	      if (isNumber(y)) {
	        return powComplex(x, new Complex(y, 0));
	      }
	      else if (isComplex(y)) {
	        return powComplex(x, y);
	      }
	    }

	    // TODO: pow for complex numbers and bignumbers

	    if (x instanceof BigNumber) {
	      // try to convert to big number
	      if (isNumber(y)) {
	        y = toBigNumber(y);
	      }
	      else if (isBoolean(y)) {
	        y = new BigNumber(y ? 1 : 0);
	      }

	      if (y instanceof BigNumber) {
	        return x.pow(y);
	      }

	      // downgrade to Number
	      return pow(toNumber(x), y);
	    }
	    if (y instanceof BigNumber) {
	      // try to convert to big number
	      if (isNumber(x)) {
	        x = toBigNumber(x);
	      }
	      else if (isBoolean(x)) {
	        x = new BigNumber(x ? 1 : 0);
	      }

	      if (x instanceof BigNumber) {
	        return x.pow(y)
	      }

	      // downgrade to Number
	      return pow(x, toNumber(y));
	    }


	    if (isArray(x)) {
	      if (!isNumber(y) || !isInteger(y) || y < 0) {
	        throw new TypeError('For A^b, b must be a positive integer ' +
	            '(value is ' + y + ')');
	      }
	      // verify that A is a 2 dimensional square matrix
	      var s = array.size(x);
	      if (s.length != 2) {
	        throw new Error('For A^b, A must be 2 dimensional ' +
	            '(A has ' + s.length + ' dimensions)');
	      }
	      if (s[0] != s[1]) {
	        throw new Error('For A^b, A must be square ' +
	            '(size is ' + s[0] + 'x' + s[1] + ')');
	      }

	      // compute power of matrix
	      var res = math.eye(s[0]).valueOf();
	      var px = x;
	      while (y >= 1) {
	        if ((y & 1) == 1) {
	          res = math.multiply(px, res);
	        }
	        y >>= 1;
	        px = math.multiply(px, px);
	      }
	      return res;
	    }
	    else if (x instanceof Matrix) {
	      return new Matrix(pow(x.valueOf(), y));
	    }

	    if (isBoolean(x)) {
	      return pow(+x, y);
	    }
	    if (isBoolean(y)) {
	      return pow(x, +y);
	    }

	    throw new math.error.UnsupportedTypeError('pow', x, y);
	  };

	  /**
	   * Calculates the power of x to y, x^y, for two complex numbers.
	   * @param {Complex} x
	   * @param {Complex} y
	   * @return {Complex} res
	   * @private
	   */
	  function powComplex (x, y) {
	    // complex computation
	    // x^y = exp(log(x)*y) = exp((abs(x)+i*arg(x))*y)
	    var temp1 = math.log(x);
	    var temp2 = math.multiply(temp1, y);
	    return math.exp(temp2);
	  }
	};


/***/ },
/* 40 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      isInteger = util.number.isInteger,
	      isBoolean = util['boolean'].isBoolean,
	      isComplex = Complex.isComplex,
	      isCollection = collection.isCollection;

	  /**
	   * Round a value towards the nearest integer
	   *
	   *     round(x)
	   *     round(x, n)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param  {Number | BigNumber | Boolean | Complex | Array | Matrix} x
	   * @param  {Number | BigNumber | Boolean | Array} [n] number of decimals (by default n=0)
	   * @return {Number | BigNumber | Complex | Array | Matrix} res
	   */
	  math.round = function round(x, n) {
	    if (arguments.length != 1 && arguments.length != 2) {
	      throw new math.error.ArgumentsError('round', arguments.length, 1, 2);
	    }

	    if (n == undefined) {
	      // round (x)
	      if (isNumber(x)) {
	        return Math.round(x);
	      }

	      if (isComplex(x)) {
	        return new Complex (
	            Math.round(x.re),
	            Math.round(x.im)
	        );
	      }

	      if (x instanceof BigNumber) {
	        return x.round();
	      }

	      if (isCollection(x)) {
	        return collection.deepMap(x, round);
	      }

	      if (isBoolean(x)) {
	        return Math.round(x);
	      }

	      throw new math.error.UnsupportedTypeError('round', x);
	    }
	    else {
	      // round (x, n)
	      if (n instanceof BigNumber) {
	        n = parseFloat(n.valueOf());
	      }

	      if (!isNumber(n) || !isInteger(n)) {
	        throw new TypeError('Number of decimals in function round must be an integer');
	      }
	      if (n < 0 || n > 9) {
	        throw new Error ('Number of decimals in function round must be in te range of 0-9');
	      }

	      if (isNumber(x)) {
	        return roundNumber(x, n);
	      }

	      if (isComplex(x)) {
	        return new Complex (
	            roundNumber(x.re, n),
	            roundNumber(x.im, n)
	        );
	      }

	      if (x instanceof BigNumber) {
	        if (isNumber(n)) {
	          return x.round(n);
	        }
	      }

	      if (isCollection(x) || isCollection(n)) {
	        return collection.deepMap2(x, n, round);
	      }

	      if (isBoolean(x)) {
	        return round(+x, n);
	      }
	      if (isBoolean(n)) {
	        return round(x, +n);
	      }

	      throw new math.error.UnsupportedTypeError('round', x, n);
	    }
	  };

	  /**
	   * round a number to the given number of decimals, or to zero if decimals is
	   * not provided
	   * @param {Number} value
	   * @param {Number} [decimals]  number of decimals, between 0 and 15 (0 by default)
	   * @return {Number} roundedValue
	   */
	  function roundNumber (value, decimals) {
	    if (decimals) {
	      var p = Math.pow(10, decimals);
	      return Math.round(value * p) / p;
	    }
	    else {
	      return Math.round(value);
	    }
	  }
	};


/***/ },
/* 41 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      collection = require(13),

	      number = util.number,
	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isComplex = Complex.isComplex,
	      isCollection = collection.isCollection;

	  /**
	   * Compute the sign of a value.
	   *
	   *     sign(x)
	   *
	   * The sign of a value x is 1 when x > 1, -1 when x < 0, and 0 when x == 0
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param {Number | BigNumber | Boolean | Complex | Array | Matrix} x
	   * @return {Number | BigNumber | Complex | Array | Matrix} res
	   */
	  math.sign = function sign(x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('sign', arguments.length, 1);
	    }

	    if (isNumber(x)) {
	      return number.sign(x);
	    }

	    if (isComplex(x)) {
	      var abs = Math.sqrt(x.re * x.re + x.im * x.im);
	      return new Complex(x.re / abs, x.im / abs);
	    }

	    if (x instanceof BigNumber) {
	      return new BigNumber(x.cmp(0));
	    }

	    if (isCollection(x)) {
	      return collection.deepMap(x, sign);
	    }

	    if (isBoolean(x)) {
	      return number.sign(x);
	    }

	    throw new math.error.UnsupportedTypeError('sign', x);
	  };
	};


/***/ },
/* 42 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      Unit = require(11),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      toNumber = util.number.toNumber,
	      toBigNumber = util.number.toBigNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isString = util.string.isString,
	      isComplex = Complex.isComplex,
	      isUnit = Unit.isUnit,
	      isCollection = collection.isCollection;

	  /**
	   * Check if value x is smaller y
	   *
	   *     x < y
	   *     smaller(x, y)
	   *
	   * For matrices, the function is evaluated element wise.
	   * In case of complex numbers, the absolute values of a and b are compared.
	   *
	   * @param  {Number | BigNumber | Boolean | Unit | String | Array | Matrix} x
	   * @param  {Number | BigNumber | Boolean | Unit | String | Array | Matrix} y
	   * @return {Boolean | Array | Matrix} res
	   */
	  math.smaller = function smaller(x, y) {
	    if (arguments.length != 2) {
	      throw new math.error.ArgumentsError('smaller', arguments.length, 2);
	    }

	    if (isNumber(x) && isNumber(y)) {
	      return x < y;
	    }

	    if (x instanceof BigNumber) {
	      // try to convert to big number
	      if (isNumber(y)) {
	        y = toBigNumber(y);
	      }
	      else if (isBoolean(y)) {
	        y = new BigNumber(y ? 1 : 0);
	      }

	      if (y instanceof BigNumber) {
	        return x.lt(y);
	      }

	      // downgrade to Number
	      return smaller(toNumber(x), y);
	    }
	    if (y instanceof BigNumber) {
	      // try to convert to big number
	      if (isNumber(x)) {
	        x = toBigNumber(x);
	      }
	      else if (isBoolean(x)) {
	        x = new BigNumber(x ? 1 : 0);
	      }

	      if (x instanceof BigNumber) {
	        return x.lt(y)
	      }

	      // downgrade to Number
	      return smaller(x, toNumber(y));
	    }

	    if ((isUnit(x)) && (isUnit(y))) {
	      if (!x.equalBase(y)) {
	        throw new Error('Cannot compare units with different base');
	      }
	      return x.value < y.value;
	    }

	    if (isString(x) || isString(y)) {
	      return x < y;
	    }

	    if (isCollection(x) || isCollection(y)) {
	      return collection.deepMap2(x, y, smaller);
	    }

	    if (isBoolean(x)) {
	      return smaller(+x, y);
	    }
	    if (isBoolean(y)) {
	      return smaller(x, +y);
	    }

	    if (isComplex(x) || isComplex(y)) {
	      throw new TypeError('No ordering relation is defined for complex numbers');
	    }

	    throw new math.error.UnsupportedTypeError('smaller', x, y);
	  };
	};


/***/ },
/* 43 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      Unit = require(11),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      toNumber = util.number.toNumber,
	      toBigNumber = util.number.toBigNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isString = util.string.isString,
	      isComplex = Complex.isComplex,
	      isUnit = Unit.isUnit,
	      isCollection = collection.isCollection;

	  /**
	   * Check if value a is smaller or equal to b
	   *
	   *     a <= b
	   *     smallereq(a, b)
	   *
	   * For matrices, the function is evaluated element wise.
	   * In case of complex numbers, the absolute values of a and b are compared.
	   *
	   * @param  {Number | BigNumber | Boolean | Complex | Unit | String | Array | Matrix} x
	   * @param  {Number | BigNumber | Boolean | Complex | Unit | String | Array | Matrix} y
	   * @return {Boolean | Array | Matrix} res
	   */
	  math.smallereq = function smallereq(x, y) {
	    if (arguments.length != 2) {
	      throw new math.error.ArgumentsError('smallereq', arguments.length, 2);
	    }

	    if (isNumber(x) && isNumber(y)) {
	      return x <= y;
	    }

	    if (x instanceof BigNumber) {
	      // try to convert to big number
	      if (isNumber(y)) {
	        y = toBigNumber(y);
	      }
	      else if (isBoolean(y)) {
	        y = new BigNumber(y ? 1 : 0);
	      }

	      if (y instanceof BigNumber) {
	        return x.lte(y);
	      }

	      // downgrade to Number
	      return smallereq(toNumber(x), y);
	    }
	    if (y instanceof BigNumber) {
	      // try to convert to big number
	      if (isNumber(x)) {
	        x = toBigNumber(x);
	      }
	      else if (isBoolean(x)) {
	        x = new BigNumber(x ? 1 : 0);
	      }

	      if (x instanceof BigNumber) {
	        return x.lte(y)
	      }

	      // downgrade to Number
	      return smallereq(x, toNumber(y));
	    }

	    if ((isUnit(x)) && (isUnit(y))) {
	      if (!x.equalBase(y)) {
	        throw new Error('Cannot compare units with different base');
	      }
	      return x.value <= y.value;
	    }

	    if (isString(x) || isString(y)) {
	      return x <= y;
	    }

	    if (isCollection(x) || isCollection(y)) {
	      return collection.deepMap2(x, y, smallereq);
	    }

	    if (isBoolean(x)) {
	      return smallereq(+x, y);
	    }
	    if (isBoolean(y)) {
	      return smallereq(x, +y);
	    }

	    if (isComplex(x) || isComplex(y)) {
	      throw new TypeError('No ordering relation is defined for complex numbers');
	    }

	    throw new math.error.UnsupportedTypeError('smallereq', x, y);
	  };
	};


/***/ },
/* 44 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isComplex = Complex.isComplex,
	      isCollection = collection.isCollection;

	  /**
	   * Calculate the square root of a value
	   *
	   *     sqrt(x)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param {Number | Boolean | Complex | Array | Matrix} x
	   * @return {Number | Complex | Array | Matrix} res
	   */
	  math.sqrt = function sqrt (x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('sqrt', arguments.length, 1);
	    }

	    if (isNumber(x)) {
	      if (x >= 0) {
	        return Math.sqrt(x);
	      }
	      else {
	        return sqrt(new Complex(x, 0));
	      }
	    }

	    if (isComplex(x)) {
	      var r = Math.sqrt(x.re * x.re + x.im * x.im);
	      if (x.im >= 0) {
	        return new Complex(
	            0.5 * Math.sqrt(2.0 * (r + x.re)),
	            0.5 * Math.sqrt(2.0 * (r - x.re))
	        );
	      }
	      else {
	        return new Complex(
	            0.5 * Math.sqrt(2.0 * (r + x.re)),
	            -0.5 * Math.sqrt(2.0 * (r - x.re))
	        );
	      }
	    }

	    if (x instanceof BigNumber) {
	      return x.sqrt();
	    }

	    if (isCollection(x)) {
	      return collection.deepMap(x, sqrt);
	    }

	    if (isBoolean(x)) {
	      return sqrt(+x);
	    }

	    throw new math.error.UnsupportedTypeError('sqrt', x);
	  };
	};


/***/ },
/* 45 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isComplex = Complex.isComplex,
	      isCollection = collection.isCollection;

	  /**
	   * Compute the square of a value
	   *
	   *     x .* x
	   *     square(x)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param  {Number | BigNumber | Boolean | Complex | Array | Matrix} x
	   * @return {Number | BigNumber | Complex | Array | Matrix} res
	   */
	  math.square = function square(x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('square', arguments.length, 1);
	    }

	    if (isNumber(x)) {
	      return x * x;
	    }

	    if (isComplex(x)) {
	      return math.multiply(x, x);
	    }

	    if (x instanceof BigNumber) {
	      return x.times(x);
	    }

	    if (isCollection(x)) {
	      return collection.deepMap(x, square);
	    }

	    if (isBoolean(x)) {
	      return x * x;
	    }

	    throw new math.error.UnsupportedTypeError('square', x);
	  };
	};


/***/ },
/* 46 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      Matrix = require(10),
	      Unit = require(11),
	      collection = require(13),

	      toNumber = util.number.toNumber,
	      toBigNumber = util.number.toBigNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isNumber = util.number.isNumber,
	      isComplex = Complex.isComplex,
	      isUnit = Unit.isUnit,
	      isCollection = collection.isCollection;

	  /**
	   * Subtract two values
	   *
	   *     x - y
	   *     subtract(x, y)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param  {Number | BigNumber | Boolean | Complex | Unit | Array | Matrix} x
	   * @param  {Number | BigNumber | Boolean | Complex | Unit | Array | Matrix} y
	   * @return {Number | BigNumber | Complex | Unit | Array | Matrix} res
	   */
	  math.subtract = function subtract(x, y) {
	    if (arguments.length != 2) {
	      throw new math.error.ArgumentsError('subtract', arguments.length, 2);
	    }

	    if (isNumber(x)) {
	      if (isNumber(y)) {
	        // number - number
	        return x - y;
	      }
	      else if (isComplex(y)) {
	        // number - complex
	        return new Complex (
	            x - y.re,
	            - y.im
	        );
	      }
	    }
	    else if (isComplex(x)) {
	      if (isNumber(y)) {
	        // complex - number
	        return new Complex (
	            x.re - y,
	            x.im
	        )
	      }
	      else if (isComplex(y)) {
	        // complex - complex
	        return new Complex (
	            x.re - y.re,
	            x.im - y.im
	        )
	      }
	    }

	    if (x instanceof BigNumber) {
	      // try to convert to big number
	      if (isNumber(y)) {
	        y = toBigNumber(y);
	      }
	      else if (isBoolean(y)) {
	        y = new BigNumber(y ? 1 : 0);
	      }

	      if (y instanceof BigNumber) {
	        return x.minus(y);
	      }

	      // downgrade to Number
	      return subtract(toNumber(x), y);
	    }
	    if (y instanceof BigNumber) {
	      // try to convert to big number
	      if (isNumber(x)) {
	        x = toBigNumber(x);
	      }
	      else if (isBoolean(x)) {
	        x = new BigNumber(x ? 1 : 0);
	      }

	      if (x instanceof BigNumber) {
	        return x.minus(y)
	      }

	      // downgrade to Number
	      return subtract(x, toNumber(y));
	    }

	    if (isUnit(x)) {
	      if (isUnit(y)) {
	        if (!x.equalBase(y)) {
	          throw new Error('Units do not match');
	        }

	        if (x.value == null) {
	          throw new Error('Unit on left hand side of operator - has an undefined value');
	        }

	        if (y.value == null) {
	          throw new Error('Unit on right hand side of operator - has an undefined value');
	        }

	        var res = x.clone();
	        res.value -= y.value;
	        res.fixPrefix = false;

	        return res;
	      }
	    }

	    if (isCollection(x) || isCollection(y)) {
	      return collection.deepMap2(x, y, subtract);
	    }

	    if (isBoolean(x)) {
	      return subtract(+x, y);
	    }
	    if (isBoolean(y)) {
	      return subtract(x, +y);
	    }

	    throw new math.error.UnsupportedTypeError('subtract', x, y);
	  };
	};


/***/ },
/* 47 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      Unit = require(11),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isComplex = Complex.isComplex,
	      isUnit = Unit.isUnit,
	      isCollection = collection.isCollection;

	  /**
	   * Inverse the sign of a value.
	   *
	   *     -x
	   *     unary(x)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param  {Number | BigNumber | Boolean | Complex | Unit | Array | Matrix} x
	   * @return {Number | BigNumber | Complex | Unit | Array | Matrix} res
	   */
	  math.unary = function unary(x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('unary', arguments.length, 1);
	    }

	    if (isNumber(x)) {
	      return -x;
	    }

	    if (isComplex(x)) {
	      return new Complex(
	          -x.re,
	          -x.im
	      );
	    }

	    if (x instanceof BigNumber) {
	      return x.neg();
	    }

	    if (isUnit(x)) {
	      var res = x.clone();
	      res.value = -x.value;
	      return res;
	    }

	    if (isCollection(x)) {
	      return collection.deepMap(x, unary);
	    }

	    if (isBoolean(x)) {
	      return -x;
	    }

	    throw new math.error.UnsupportedTypeError('unary', x);
	  };
	};


/***/ },
/* 48 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      Unit = require(11),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      toNumber = util.number.toNumber,
	      toBigNumber = util.number.toBigNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isString = util.string.isString,
	      isComplex = Complex.isComplex,
	      isUnit = Unit.isUnit,
	      isCollection = collection.isCollection;

	  /**
	   * Check if value x unequals y, x != y
	   * In case of complex numbers, x.re must unequal y.re, or x.im must unequal y.im
	   * @param  {Number | BigNumber | Boolean | Complex | Unit | String | Array | Matrix} x
	   * @param  {Number | BigNumber | Boolean | Complex | Unit | String | Array | Matrix} y
	   * @return {Boolean | Array | Matrix} res
	   */
	  math.unequal = function unequal(x, y) {
	    if (arguments.length != 2) {
	      throw new math.error.ArgumentsError('unequal', arguments.length, 2);
	    }

	    if (isNumber(x)) {
	      if (isNumber(y)) {
	        return x != y;
	      }
	      else if (isComplex(y)) {
	        return (x != y.re) || (y.im != 0);
	      }
	    }

	    if (isComplex(x)) {
	      if (isNumber(y)) {
	        return (x.re != y) || (x.im != 0);
	      }
	      else if (isComplex(y)) {
	        return (x.re != y.re) || (x.im != y.im);
	      }
	    }

	    if (x instanceof BigNumber) {
	      // try to convert to big number
	      if (isNumber(y)) {
	        y = toBigNumber(y);
	      }
	      else if (isBoolean(y)) {
	        y = new BigNumber(y ? 1 : 0);
	      }

	      if (y instanceof BigNumber) {
	        return !x.eq(y);
	      }

	      // downgrade to Number
	      return unequal(toNumber(x), y);
	    }
	    if (y instanceof BigNumber) {
	      // try to convert to big number
	      if (isNumber(x)) {
	        x = toBigNumber(x);
	      }
	      else if (isBoolean(x)) {
	        x = new BigNumber(x ? 1 : 0);
	      }

	      if (x instanceof BigNumber) {
	        return !x.eq(y)
	      }

	      // downgrade to Number
	      return unequal(x, toNumber(y));
	    }

	    if ((isUnit(x)) && (isUnit(y))) {
	      if (!x.equalBase(y)) {
	        throw new Error('Cannot compare units with different base');
	      }
	      return x.value != y.value;
	    }

	    if (isString(x) || isString(y)) {
	      return x != y;
	    }

	    if (isCollection(x) || isCollection(y)) {
	      return collection.deepMap2(x, y, unequal);
	    }

	    if (isBoolean(x)) {
	      return unequal(+x, y);
	    }
	    if (isBoolean(y)) {
	      return unequal(x, +y);
	    }

	    throw new math.error.UnsupportedTypeError('unequal', x, y);
	  };
	};


/***/ },
/* 49 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),

	      toNumber = util.number.toNumber,
	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isInteger = util.number.isInteger;

	  /**
	   * Calculate the extended greatest common divisor for two values.
	   *
	   *     xgcd(a, b)
	   *
	   * @param {Number | Boolean} a  An integer number
	   * @param {Number | Boolean} b  An integer number
	   * @return {Array}              An array containing 3 integers [div, m, n]
	   *                              where div = gcd(a, b) and a*m + b*n = div
	   *
	   * @see http://en.wikipedia.org/wiki/Extended_Euclidean_algorithm
	   */
	  math.xgcd = function xgcd(a, b) {
	    if (arguments.length == 2) {
	      // two arguments
	      if (isNumber(a) && isNumber(b)) {
	        if (!isInteger(a) || !isInteger(b)) {
	          throw new Error('Parameters in function xgcd must be integer numbers');
	        }

	        return _xgcd(a, b);
	      }

	      // TODO: implement BigNumber support for xgcd

	      // downgrade bignumbers to numbers
	      if (a instanceof BigNumber) {
	        return xgcd(toNumber(a), b);
	      }
	      if (b instanceof BigNumber) {
	        return xgcd(a, toNumber(b));
	      }

	      if (isBoolean(a)) {
	        return xgcd(+a, b);
	      }
	      if (isBoolean(b)) {
	        return xgcd(a, +b);
	      }

	      throw new math.error.UnsupportedTypeError('xgcd', a, b);
	    }

	    // zero or one argument
	    throw new SyntaxError('Function xgcd expects two arguments');
	  };

	  /**
	   * Calculate xgcd for two numbers
	   * @param {Number} a
	   * @param {Number} b
	   * @private
	   */
	  function _xgcd(a, b) {
	    //*
	    // source: http://en.wikipedia.org/wiki/Extended_Euclidean_algorithm
	    var t, // used to swap two variables
	        q, // quotient
	        r, // remainder
	        x = 0, lastx = 1,
	        y = 1, lasty = 0;

	    while (b) {
	      q = Math.floor(a / b);
	      r = a % b;

	      t = x;
	      x = lastx - q * x;
	      lastx = t;

	      t = y;
	      y = lasty - q * y;
	      lasty = t;

	      a = b;
	      b = r;
	    }

	    if (a < 0) {
	      return [-a, a ? -lastx : 0, -lasty];
	    }
	    else {
	      return [a, a ? lastx : 0, lasty];
	    }
	  }
	};


/***/ },
/* 50 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isCollection = collection.isCollection,
	      isComplex = Complex.isComplex;

	  /**
	   * Compute the argument of a complex value.
	   * If x = a + bi, the argument is computed as atan2(b, a).
	   *
	   *     arg(x)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param {Number | Complex | Array | Matrix | Boolean} x
	   * @return {Number | Array | Matrix} res
	   */
	  math.arg = function arg(x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('arg', arguments.length, 1);
	    }

	    if (isNumber(x)) {
	      return Math.atan2(0, x);
	    }

	    if (isComplex(x)) {
	      return Math.atan2(x.im, x.re);
	    }

	    if (isCollection(x)) {
	      return collection.deepMap(x, arg);
	    }

	    if (isBoolean(x)) {
	      return arg(+x);
	    }

	    if (x instanceof BigNumber) {
	      // downgrade to Number
	      // TODO: implement BigNumber support
	      return arg(util.number.toNumber(x));
	    }

	    throw new math.error.UnsupportedTypeError('arg', x);
	  };
	};


/***/ },
/* 51 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      collection = require(13),

	      object = util.object,
	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isCollection =collection.isCollection,
	      isComplex = Complex.isComplex;

	  /**
	   * Compute the complex conjugate of a complex value.
	   * If x = a+bi, the complex conjugate is a-bi.
	   *
	   *     conj(x)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param {Number | BigNumber | Complex | Array | Matrix | Boolean} x
	   * @return {Number | BigNumber | Complex | Array | Matrix} res
	   */
	  math.conj = function conj(x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('conj', arguments.length, 1);
	    }

	    if (isNumber(x)) {
	      return x;
	    }

	    if (x instanceof BigNumber) {
	      return new BigNumber(x);
	    }

	    if (isComplex(x)) {
	      return new Complex(x.re, -x.im);
	    }

	    if (isCollection(x)) {
	      return collection.deepMap(x, conj);
	    }

	    if (isBoolean(x)) {
	      return +x;
	    }

	    // return a clone of the value for non-complex values
	    return object.clone(x);
	  };
	};


/***/ },
/* 52 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      collection = require(13),

	      object = util.object,
	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isCollection = collection.isCollection,
	      isComplex = Complex.isComplex;

	  /**
	   * Get the real part of a complex number.
	   *
	   *     re(x)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param {Number | BigNumber | Complex | Array | Matrix | Boolean} x
	   * @return {Number | BigNumber | Array | Matrix} re
	   */
	  math.re = function re(x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('re', arguments.length, 1);
	    }

	    if (isNumber(x)) {
	      return x;
	    }

	    if (x instanceof BigNumber) {
	      return new BigNumber(x);
	    }

	    if (isComplex(x)) {
	      return x.re;
	    }

	    if (isCollection(x)) {
	      return collection.deepMap(x, re);
	    }

	    if (isBoolean(x)) {
	      return +x;
	    }

	    // return a clone of the value itself for all non-complex values
	    return object.clone(x);
	  };
	};


/***/ },
/* 53 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isCollection =collection.isCollection,
	      isComplex = Complex.isComplex;

	  /**
	   * Get the imaginary part of a complex number.
	   *
	   *     im(x)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param {Number | BigNumber | Complex | Array | Matrix | Boolean} x
	   * @return {Number | BigNumber | Array | Matrix} im
	   */
	  math.im = function im(x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('im', arguments.length, 1);
	    }

	    if (isNumber(x)) {
	      return 0;
	    }

	    if (x instanceof BigNumber) {
	      return new BigNumber(0);
	    }

	    if (isComplex(x)) {
	      return x.im;
	    }

	    if (isCollection(x)) {
	      return collection.deepMap(x, im);
	    }

	    if (isBoolean(x)) {
	      return 0;
	    }

	    // return 0 for all non-complex values
	    return 0;
	  };
	};


/***/ },
/* 54 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      collection = require(13),

	      isCollection = collection.isCollection,
	      isNumber = util.number.isNumber,
	      isString = util.string.isString,
	      isBoolean = util['boolean'].isBoolean;

	  // extend BigNumber with a function clone
	  if (typeof BigNumber.prototype.clone !== 'function') {
	    /**
	     * Clone a bignumber
	     * @return {BigNumber} clone
	     */
	    BigNumber.prototype.clone = function clone () {
	      return new BigNumber(this);
	    };
	  }

	  /**
	   * Create a big number, which can store numbers with higher precision than
	   * a JavaScript Number.
	   * When value is a matrix, all elements will be converted to bignumber.
	   *
	   * @param {Number | String | Array | Matrix} [value]  Value for the big number,
	   *                                                    0 by default.
	   */
	  math.bignumber = function bignumber(value) {
	    if (arguments.length > 1) {
	      throw new math.error.ArgumentsError('bignumber', arguments.length, 0, 1);
	    }

	    if ((value instanceof BigNumber) || isNumber(value) || isString(value)) {
	      return new BigNumber(value);
	    }

	    if (isBoolean(value)) {
	      return new BigNumber(+value);
	    }

	    if (isCollection(value)) {
	      return collection.deepMap(value, bignumber);
	    }

	    if (arguments.length == 0) {
	      return new BigNumber(0);
	    }

	    throw new math.error.UnsupportedTypeError('bignumber', value);
	  };
	};


/***/ },
/* 55 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      collection = require(13),

	      isCollection = collection.isCollection,
	      isNumber = util.number.isNumber,
	      isString = util.string.isString;

	  /**
	   * Create a boolean or convert a string or number to a boolean.
	   * In case of a number, true is returned for non-zero numbers, and false in
	   * case of zero.
	   * Strings can be 'true' or 'false', or can contain a number.
	   * When value is a matrix, all elements will be converted to boolean.
	   * @param {String | Number | Boolean | Array | Matrix} value
	   * @return {Boolean | Array | Matrix} bool
	   */
	  math['boolean'] = function bool (value) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('boolean', arguments.length, 0, 1);
	    }

	    if (value === 'true' || value === true) {
	      return true;
	    }

	    if (value === 'false' || value === false) {
	      return false;
	    }

	    if (value instanceof Boolean) {
	      return value ? true : false;
	    }

	    if (isNumber(value)) {
	      return (value !== 0);
	    }

	    if (value instanceof BigNumber) {
	      return !value.isZero();
	    }

	    if (isString(value)) {
	      // try case insensitive
	      var lcase = value.toLowerCase();
	      if (lcase === 'true') {
	        return true;
	      }
	      else if (lcase === 'false') {
	        return false;
	      }

	      // test whether value is a valid number
	      var num = Number(value);
	      if (value != '' && !isNaN(num)) {
	        return (num !== 0);
	      }
	    }

	    if (isCollection(value)) {
	      return collection.deepMap(value, bool);
	    }

	    throw new SyntaxError(value.toString() + ' is no valid boolean');
	  };
	};


/***/ },
/* 56 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      collection = require(13),

	      isCollection = collection.isCollection,
	      isNumber = util.number.isNumber,
	      toNumber = util.number.toNumber,
	      isString = util.string.isString,
	      isComplex = Complex.isComplex;

	  /**
	   * Create a complex value or convert a value to a complex value.
	   *
	   * The method accepts the following arguments:
	   *     complex()                           creates a complex value with zero
	   *                                         as real and imaginary part.
	   *     complex(re : number, im : string)   creates a complex value with provided
	   *                                         values for real and imaginary part.
	   *     complex(re : number)                creates a complex value with provided
	   *                                         real value and zero imaginary part.
	   *     complex(complex : Complex)          clones the provided complex value.
	   *     complex(arg : string)               parses a string into a complex value.
	   *     complex(array : Array)              converts the elements of the array
	   *                                         or matrix element wise into a
	   *                                         complex value.
	   *
	   * Example usage:
	   *     var a = math.complex(3, -4);     // 3 - 4i
	   *     a.re = 5;                        // a = 5 - 4i
	   *     var i = a.im;                    // -4;
	   *     var b = math.complex('2 + 6i');  // 2 + 6i
	   *     var c = math.complex();          // 0 + 0i
	   *     var d = math.add(a, b);          // 5 + 2i
	   *
	   * @param {* | Array | Matrix} [args]
	   * @return {Complex | Array | Matrix} value
	   */
	  math.complex = function complex(args) {
	    switch (arguments.length) {
	      case 0:
	        // no parameters. Set re and im zero
	        return new Complex(0, 0);
	        break;

	      case 1:
	        // parse string into a complex number
	        var arg = arguments[0];

	        if (isNumber(arg)) {
	          return new Complex(arg, 0);
	        }

	        if (arg instanceof BigNumber) {
	          // convert to Number
	          return new Complex(toNumber(arg), 0);
	        }

	        if (isComplex(arg)) {
	          // create a clone
	          return arg.clone();
	        }

	        if (isString(arg)) {
	          var c = Complex.parse(arg);
	          if (c) {
	            return c;
	          }
	          else {
	            throw new SyntaxError('String "' + arg + '" is no valid complex number');
	          }
	        }

	        if (isCollection(arg)) {
	          return collection.deepMap(arg, complex);
	        }

	        throw new TypeError(
	            'Two numbers or a single string expected in function complex');
	        break;

	      case 2:
	        // re and im provided
	        var re = arguments[0],
	            im = arguments[1];

	        // convert re to number
	        if (re instanceof BigNumber) {
	          re = toNumber(re);
	        }

	        // convert im to number
	        if (im instanceof BigNumber) {
	          im = toNumber(im);
	        }

	        if (isNumber(re) && isNumber(im)) {
	          return new Complex(re, im);
	        }
	        else {
	          throw new TypeError(
	              'Two numbers or a single string expected in function complex');
	        }

	        break;

	      default:
	        throw new math.error.ArgumentsError('complex', arguments.length, 0, 2);
	    }
	  };
	};


/***/ },
/* 57 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Index = require(9),

	      toNumber = util.number.toNumber;

	  /**
	   * Create an index. An Index can store ranges having start, step, and end
	   * for multiple dimensions.
	   * Matrix.get, Matrix.set, and math.subset accept an Index as input.
	   *
	   * Usage:
	   *     var index = math.index(range1, range2, ...);
	   *
	   * Where each range can be any of:
	   *     An array [start, end]
	   *     An array [start, end, step]
	   *     A number
	   *     null, this will create select the whole dimension
	   *
	   * The parameters start, end, and step must be integer numbers.
	   *
	   * @param {...*} ranges
	   */
	  math.index = function matrix(ranges) {
	    var i = new Index();

	    // downgrade BigNumber to Number
	    var args = Array.prototype.slice.apply(arguments).map(function (arg) {
	      if (arg instanceof BigNumber) {
	        return toNumber(arg);
	      }
	      else if (Array.isArray(arg)) {
	        return arg.map(function (elem) {
	          return (elem instanceof BigNumber) ? toNumber (elem) : elem;
	        });
	      }
	      else {
	        return arg;
	      }
	    });

	    Index.apply(i, args);
	    return i;
	  };
	};


/***/ },
/* 58 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var Matrix = require(10);

	  /**
	   * Create a matrix. The function creates a new math.type.Matrix object.
	   *
	   * The method accepts the following arguments:
	   *     matrix()       creates an empty matrix
	   *     matrix(data)   creates a matrix with initial data.
	   *
	   * Example usage:
	   *     var m = matrix([[1, 2], [3, 4]);
	   *     m.size();                        // [2, 2]
	   *     m.resize([3, 2], 5);
	   *     m.valueOf();                     // [[1, 2], [3, 4], [5, 5]]
	   *     m.get([1, 0])                    // 3
	   *
	   * @param {Array | Matrix} [data]    A multi dimensional array
	   * @return {Matrix} matrix
	   */
	  math.matrix = function matrix(data) {
	    if (arguments.length > 1) {
	      throw new math.error.ArgumentsError('matrix', arguments.length, 0, 1);
	    }

	    return new Matrix(data);
	  };
	};


/***/ },
/* 59 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      collection = require(13),

	      isCollection = collection.isCollection,
	      toNumber = util.number.toNumber,
	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isString = util.string.isString;

	  /**
	   * Create a number or convert a string to a number.
	   * When value is a matrix, all elements will be converted to number.
	   * @param {String | Number | Boolean | Array | Matrix} [value]
	   * @return {Number | Array | Matrix} num
	   */
	  math.number = function number (value) {
	    switch (arguments.length) {
	      case 0:
	        return 0;

	      case 1:
	        if (isCollection(value)) {
	          return collection.deepMap(value, number);
	        }

	        if (value instanceof BigNumber) {
	          return toNumber(value);
	        }

	        if (isString(value)) {
	          var num = Number(value);
	          if (isNaN(num)) {
	            num = Number(value.valueOf());
	          }
	          if (isNaN(num)) {
	            throw new SyntaxError(value.toString() + ' is no valid number');
	          }
	          return num;
	        }

	        if (isBoolean(value)) {
	          return value + 0;
	        }

	        if (isNumber(value)) {
	          return value;
	        }

	        throw new math.error.UnsupportedTypeError('number', value);

	      default:
	        throw new math.error.ArgumentsError('number', arguments.length, 0, 1);
	    }
	  };
	};


/***/ },
/* 60 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var Parser = require(5);

	  /**
	   * Create a parser. The function creates a new math.expression.Parser object.
	   *
	   *    parser()
	   *
	   * Example usage:
	   *     var parser = new math.parser();
	   *
	   *     // evaluate expressions
	   *     var a = parser.eval('sqrt(3^2 + 4^2)'); // 5
	   *     var b = parser.eval('sqrt(-4)');        // 2i
	   *     var c = parser.eval('2 inch in cm');    // 5.08 cm
	   *     var d = parser.eval('cos(45 deg)');     // 0.7071067811865476
	   *
	   *     // define variables and functions
	   *     parser.eval('x = 7 / 2');               // 3.5
	   *     parser.eval('x + 3');                   // 6.5
	   *     parser.eval('function f(x, y) = x^y');  // f(x, y)
	   *     parser.eval('f(2, 3)');                 // 8
	   *
	   *     // get and set variables and functions
	   *     var x = parser.get('x');                // 7
	   *     var f = parser.get('f');                // function
	   *     var g = f(3, 2);                        // 9
	   *     parser.set('h', 500);
	   *     var i = parser.eval('h / 2');           // 250
	   *     parser.set('hello', function (name) {
	 *         return 'hello, ' + name + '!';
	 *     });
	   *     parser.eval('hello("user")');           // "hello, user!"
	   *
	   *     // clear defined functions and variables
	   *     parser.clear();
	   *
	   * @return {Parser} Parser
	   */
	  math.parser = function parser() {
	    return new Parser(math);
	  };
	};


/***/ },
/* 61 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  /**
	   * Wrap any value in a Selector, allowing to perform chained operations on
	   * the value.
	   *
	   * All methods available in the math.js library can be called upon the selector,
	   * and then will be evaluated with the value itself as first argument.
	   * The selector can be closed by executing selector.done(), which will return
	   * the final value.
	   *
	   * Example usage:
	   *     math.select(3)
	   *         .add(4)
	   *         .subtract(2)
	   *         .done();     // 5
	   *     math.select( [[1, 2], [3, 4]] )
	   *         .set([1, 1], 8)
	   *         .multiply(3)
	   *         .done();     // [[24, 6], [9, 12]]
	   *
	   * The Selector has a number of special functions:
	   * - done()     Finalize the chained operation and return the selectors value.
	   * - valueOf()  The same as done()
	   * - toString() Executes math.format() onto the selectors value, returning
	   *              a string representation of the value.
	   * - get(...)   Get a subselection of the selectors value. Only applicable when
	   *              the value has a method get, for example when value is a Matrix
	   *              or Array.
	   * - set(...)   Replace a subselection of the selectors value. Only applicable
	   *              when the value has a method get, for example when value is a
	   *              Matrix or Array.
	   *
	   * @param {*} value
	   * @return {math.chaining.Selector} selector
	   */
	  math.select = function select(value) {
	    // TODO: check number of arguments
	    return new math.chaining.Selector(value);
	  };
	};


/***/ },
/* 62 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      collection = require(13),

	      number = util.number,
	      isNumber = util.number.isNumber,
	      isCollection = collection.isCollection;

	  /**
	   * Create a string or convert any object into a string.
	   * Elements of Arrays and Matrices are processed element wise
	   * @param {* | Array | Matrix} [value]
	   * @return {String | Array | Matrix} str
	   */
	  math.string = function string (value) {
	    switch (arguments.length) {
	      case 0:
	        return '';

	      case 1:
	        if (isNumber(value)) {
	          return number.format(value);
	        }

	        if (isCollection(value)) {
	          return collection.deepMap(value, string);
	        }

	        if (value === null) {
	          return 'null';
	        }

	        return value.toString();

	      default:
	        throw new math.error.ArgumentsError('string', arguments.length, 0, 1);
	    }
	  };
	};


/***/ },
/* 63 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Unit = require(11),
	      collection = require(13),

	      isCollection = collection.isCollection,
	      toNumber = util.number.toNumber,
	      isString = util.string.isString;

	  /**
	   * Create a unit. Depending on the passed arguments, the function
	   * will create and return a new math.type.Unit object.
	   * When a matrix is provided, all elements will be converted to units.
	   *
	   * The method accepts the following arguments:
	   *     unit(unit : string)
	   *     unit(value : number, unit : string)
	   *
	   * Example usage:
	   *     var a = math.unit(5, 'cm');          // 50 mm
	   *     var b = math.unit('23 kg');          // 23 kg
	   *     var c = math.in(a, math.unit('m');   // 0.05 m
	   *
	   * @param {* | Array | Matrix} args
	   * @return {Unit | Array | Matrix} value
	   */
	  math.unit = function unit(args) {
	    switch(arguments.length) {
	      case 1:
	        // parse a string
	        var arg = arguments[0];

	        if (arg instanceof Unit) {
	          // create a clone of the unit
	          return arg.clone();
	        }

	        if (isString(arg)) {
	          if (Unit.isPlainUnit(arg)) {
	            return new Unit(null, arg); // a pure unit
	          }

	          var u = Unit.parse(arg);        // a unit with value, like '5cm'
	          if (u) {
	            return u;
	          }

	          throw new SyntaxError('String "' + arg + '" is no valid unit');
	        }

	        if (isCollection(args)) {
	          return collection.deepMap(args, unit);
	        }

	        throw new TypeError('A string or a number and string expected in function unit');
	        break;

	      case 2:
	        // a number and a unit

	        if (arguments[0] instanceof BigNumber) {
	          // convert value to number
	          return new Unit(toNumber(arguments[0]), arguments[1]);
	        }
	        else {
	          return new Unit(arguments[0], arguments[1]);
	        }
	        break;

	      default:
	        throw new math.error.ArgumentsError('unit', arguments.length, 1, 2);
	    }
	  };
	};


/***/ },
/* 64 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      Matrix = require(10),
	      collection = require(13),

	      object = util.object,
	      array = util.array,
	      isNumber = util.number.isNumber,
	      isInteger = util.number.isInteger,
	      isCollection = collection.isCollection;

	  /**
	   * Concatenate two or more matrices
	   * Usage:
	   *     math.concat(A, B, C, ...)
	   *     math.concat(A, B, C, ..., dim)
	   *
	   * Where the optional dim is the zero-based number of the dimension to be
	   * concatenated.
	   *
	   * @param {... Array | Matrix} args
	   * @return {Array | Matrix} res
	   */
	  math.concat = function concat (args) {
	    var i,
	        len = arguments.length,
	        dim = -1,  // zero-based dimension
	        prevDim,
	        asMatrix = false,
	        matrices = [];  // contains multi dimensional arrays

	    for (i = 0; i < len; i++) {
	      var arg = arguments[i];

	      // test whether we need to return a Matrix (if not we return an Array)
	      if (arg instanceof Matrix) {
	        asMatrix = true;
	      }

	      if ((i == len - 1) && isNumber(arg)) {
	        // last argument contains the dimension on which to concatenate
	        prevDim = dim;
	        dim = arg;

	        if (!isInteger(dim) || dim < 0) {
	          throw new TypeError('Dimension number must be a positive integer ' +
	              '(dim = ' + dim + ')');
	        }

	        if (i > 0 && dim > prevDim) {
	          throw new RangeError('Dimension out of range ' +
	              '(' + dim + ' > ' + prevDim + ')');
	        }
	      }
	      else if (isCollection(arg)) {
	        // this is a matrix or array
	        var matrix = object.clone(arg).valueOf();
	        var size = array.size(arg.valueOf());
	        matrices[i] = matrix;
	        prevDim = dim;
	        dim = size.length - 1;

	        // verify whether each of the matrices has the same number of dimensions
	        if (i > 0 && dim != prevDim) {
	          throw new RangeError('Dimension mismatch ' +
	              '(' + prevDim + ' != ' + dim + ')');
	        }
	      }
	      else {
	        throw new math.error.UnsupportedTypeError('concat', arg);
	      }
	    }

	    if (matrices.length == 0) {
	      throw new SyntaxError('At least one matrix expected');
	    }

	    var res = matrices.shift();
	    while (matrices.length) {
	      res = _concat(res, matrices.shift(), dim, 0);
	    }

	    return asMatrix ? new Matrix(res) : res;
	  };

	  /**
	   * Recursively concatenate two matrices.
	   * The contents of the matrices is not cloned.
	   * @param {Array} a             Multi dimensional array
	   * @param {Array} b             Multi dimensional array
	   * @param {Number} concatDim    The dimension on which to concatenate (zero-based)
	   * @param {Number} dim          The current dim (zero-based)
	   * @return {Array} c            The concatenated matrix
	   * @private
	   */
	  function _concat(a, b, concatDim, dim) {
	    if (dim < concatDim) {
	      // recurse into next dimension
	      if (a.length != b.length) {
	        throw new Error('Dimensions mismatch (' + a.length + ' != ' + b.length + ')');
	      }

	      var c = [];
	      for (var i = 0; i < a.length; i++) {
	        c[i] = _concat(a[i], b[i], concatDim, dim + 1);
	      }
	      return c;
	    }
	    else {
	      // concatenate this dimension
	      return a.concat(b);
	    }
	  }
	};


/***/ },
/* 65 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      Matrix = require(10),

	      object = util.object,
	      array = util.array,
	      string = util.string;

	  /**
	   * @constructor det
	   * Calculate the determinant of a matrix
	   *
	   *     det(x)
	   *
	   * @param {Array | Matrix} x
	   * @return {Number} determinant
	   */
	  math.det = function det (x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('det', arguments.length, 1);
	    }

	    if (!(x instanceof Matrix)) {
	      if (x instanceof Array) {
	        x = new Matrix(x);
	      } else {
	        throw new TypeError('Determinant is only defined for Matrix or Array.');
	      }
	    } 

	    var size = x.size();

	    switch (size.length) {
	      case 0:
	        // scalar
	        return object.clone(x);
	        break;

	      case 1:
	        // vector
	        if (size[0] == 1) {
	          return object.clone(x.valueOf()[0]);
	        }
	        else {
	          throw new RangeError('Matrix must be square ' +
	              '(size: ' + string.format(size) + ')');
	        }
	        break;

	      case 2:
	        // two dimensional array
	        var rows = size[0];
	        var cols = size[1];
	        if (rows == cols) {
	          return _det(x.clone().valueOf(), rows, cols);
	        }
	        else {
	          throw new RangeError('Matrix must be square ' +
	              '(size: ' + string.format(size) + ')');
	        }
	        break;

	      default:
	        // multi dimensional array
	        throw new RangeError('Matrix must be two dimensional ' +
	            '(size: ' + string.format(size) + ')');
	    }
	  };

	  /**
	   * Calculate the determinant of a matrix
	   * @param {Array[]} matrix  A square, two dimensional matrix
	   * @param {Number} rows     Number of rows of the matrix (zero-based)
	   * @param {Number} cols     Number of columns of the matrix (zero-based)
	   * @returns {Number} det
	   * @private
	   */
	  function _det (matrix, rows, cols) {
	    if (rows == 1) {
	      // this is a 1 x 1 matrix
	      return matrix[0][0];
	    }
	    else if (rows == 2) {
	      // this is a 2 x 2 matrix
	      // the determinant of [a11,a12;a21,a22] is det = a11*a22-a21*a12
	      return math.subtract(
	          math.multiply(matrix[0][0], matrix[1][1]),
	          math.multiply(matrix[1][0], matrix[0][1])
	      );
	    }
	    else {
	      // this is an n x n matrix
	      var d = 1;
	      var lead = 0;
	      for (var r = 0; r < rows; r++) {
	        if (lead >= cols) {
	          break;
	        }
	        var i = r;
	        // Find the pivot element.
	        while (matrix[i][lead] == 0) {
	          i++;
	          if (i == rows) {
	            i = r;
	            lead++;
	            if (lead == cols) {
	              // We found the last pivot.
	              if (object.deepEqual(matrix, math.eye(rows).valueOf())) {
	                return math.round(d, 6);
	              } else {
	                return 0;
	              }
	            }
	          }
	        }
	        if (i != r) {
	          // Swap rows i and r, which negates the determinant.
	          for (var a = 0; a < cols; a++) {
	            var temp = matrix[i][a];
	            matrix[i][a] = matrix[r][a];
	            matrix[r][a] = temp;
	          }
	          d *= -1;
	        }
	        // Scale row r and the determinant simultaneously.
	        var div = matrix[r][lead];
	        for (var a = 0; a < cols; a++) {
	          matrix[r][a] = matrix[r][a] / div;
	        }
	        d *= div;
	        // Back-substitute upwards.
	        for (var j = 0; j < rows; j++) {
	          if (j != r) {
	            // Taking linear combinations does not change the det.
	            var c = matrix[j][lead];
	            for (var a = 0; a < cols; a++) {
	              matrix[j][a] = matrix[j][a] - matrix[r][a] * c;
	            }
	          }
	        }
	        lead++; // Now looking for a pivot further right.
	      }
	      // If reduction did not result in the identity, the matrix is singular.
	      if (object.deepEqual(matrix, math.eye(rows).valueOf())) {
	        return math.round(d, 6);
	      } else {
	        return 0;
	      }
	    }
	  }
	};


/***/ },
/* 66 */
/***/ function(module, exports, require) {

	module.exports = function (math, settings) {
	  var util = require(117),

	      Matrix = require(10),
	      collection = require(13),

	      object = util.object,
	      isArray = util.array.isArray,
	      isNumber = util.number.isNumber,
	      isInteger = util.number.isInteger;

	  /**
	   * Create a diagonal matrix or retrieve the diagonal of a matrix
	   *
	   *     diag(v)
	   *     diag(v, k)
	   *     diag(X)
	   *     diag(X, k)
	   *
	   * TODO: more documentation on diag
	   *
	   * @param {Matrix | Array} x
	   * @param {Number} [k]
	   * @return {Matrix | Array} matrix
	   */
	  math.diag = function diag (x, k) {
	    var data, vector, i, iMax;

	    if (arguments.length != 1 && arguments.length != 2) {
	      throw new math.error.ArgumentsError('diag', arguments.length, 1, 2);
	    }

	    if (k) {
	      if (!isNumber(k) || !isInteger(k)) {
	        throw new TypeError ('Second parameter in function diag must be an integer');
	      }
	    }
	    else {
	      k = 0;
	    }
	    var kSuper = k > 0 ? k : 0;
	    var kSub = k < 0 ? -k : 0;

	    // check type of input
	    if (x instanceof Matrix) {
	      // nice, nothing to do
	    }
	    else if (isArray(x)) {
	      // convert to matrix
	      x = new Matrix(x);
	    }
	    else {
	      throw new TypeError ('First parameter in function diag must be a Matrix or Array');
	    }

	    var s = x.size();
	    switch (s.length) {
	      case 1:
	        // x is a vector. create diagonal matrix
	        vector = x.valueOf();
	        var matrix = new Matrix();
	        var defaultValue = 0;
	        matrix.resize([vector.length + kSub, vector.length + kSuper], defaultValue);
	        data = matrix.valueOf();
	        iMax = vector.length;
	        for (i = 0; i < iMax; i++) {
	          data[i + kSub][i + kSuper] = object.clone(vector[i]);
	        }
	        return (settings.matrix === 'array') ? matrix.valueOf() : matrix;
	        break;

	      case 2:
	        // x is a matrix get diagonal from matrix
	        vector = [];
	        data = x.valueOf();
	        iMax = Math.min(s[0] - kSub, s[1] - kSuper);
	        for (i = 0; i < iMax; i++) {
	          vector[i] = object.clone(data[i + kSub][i + kSuper]);
	        }
	        return (settings.matrix === 'array') ? vector : new Matrix(vector);
	        break;

	      default:
	        throw new RangeError('Matrix for function diag must be 2 dimensional');
	    }
	  };
	};


/***/ },
/* 67 */
/***/ function(module, exports, require) {

	module.exports = function (math, settings) {
	  var util = require(117),

	      BigNumber = require(220),
	      Matrix = require(10),
	      collection = require(13),

	      toNumber = util.number.toNumber,
	      isNumber = util.number.isNumber,
	      isInteger = util.number.isInteger,
	      isArray = Array.isArray;

	  /**
	   * Create a 2-dimensional identity matrix with size m x n or n x n
	   *
	   *     eye(n)
	   *     eye(m, n)
	   *     eye([m, n])
	   *
	   * TODO: more documentation on eye
	   *
	   * @param {...Number | Matrix | Array} size
	   * @return {Matrix | Array | Number} matrix
	   */
	  math.eye = function eye (size) {
	    var args = collection.argsToArray(arguments),
	        asMatrix = (size instanceof Matrix) ? true :
	        (isArray(size) ? false : (settings.matrix === 'matrix'));


	    if (args.length == 0) {
	      // return an empty array
	      return asMatrix ? new Matrix() : [];
	    }
	    else if (args.length == 1) {
	      // change to a 2-dimensional square
	      args[1] = args[0];
	    }
	    else if (args.length > 2) {
	      // error in case of an n-dimensional size
	      throw new math.error.ArgumentsError('eye', args.length, 0, 2);
	    }

	    var asBigNumber = args[0] instanceof BigNumber,
	        rows = args[0],
	        cols = args[1];

	    if (rows instanceof BigNumber) {
	      rows = toNumber(rows);
	    }
	    if (cols instanceof BigNumber) {
	      cols = toNumber(cols);
	    }

	    if (!isNumber(rows) || !isInteger(rows) || rows < 1) {
	      throw new Error('Parameters in function eye must be positive integers');
	    }
	    if (cols) {
	      if (!isNumber(cols) || !isInteger(cols) || cols < 1) {
	        throw new Error('Parameters in function eye must be positive integers');
	      }
	    }

	    // create and args the matrix
	    var matrix = new Matrix();
	    var one = asBigNumber ? new BigNumber(1) : 1;
	    var defaultValue = asBigNumber ? new BigNumber(0) : 0;
	    matrix.resize(args.map(toNumber), defaultValue);

	    // fill in ones on the diagonal
	    var minimum = math.min(args);
	    var data = matrix.valueOf();
	    for (var d = 0; d < minimum; d++) {
	      data[d][d] = one;
	    }

	    return asMatrix ? matrix : matrix.valueOf();
	  };
	};


/***/ },
/* 68 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var string = require(218),

	      Matrix = require(10),
	      collection = require(13);

	  /**
	   * Calculate the inverse of a matrix
	   *
	   *     inv(x)
	   *
	   * TODO: more documentation on inv
	   *
	   * @param {Number | Complex | Array | Matrix} x
	   * @return {Number | Complex | Array | Matrix} inv
	   */
	  math.inv = function inv (x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('inv', arguments.length, 1);
	    }
	    var size = math.size(x).valueOf();
	    switch (size.length) {
	      case 0:
	        // scalar
	        return math.divide(1, x);
	        break;

	      case 1:
	        // vector
	        if (size[0] == 1) {
	          if (x instanceof Matrix) {
	            return new Matrix([
	              math.divide(1, x.valueOf()[0])
	            ]);
	          }
	          else {
	            return [
	              math.divide(1, x[0])
	            ];
	          }
	        }
	        else {
	          throw new RangeError('Matrix must be square ' +
	              '(size: ' + string.format(size) + ')');
	        }
	        break;

	      case 2:
	        // two dimensional array
	        var rows = size[0];
	        var cols = size[1];
	        if (rows == cols) {
	          if (x instanceof Matrix) {
	            return new Matrix(
	                _inv(x.valueOf(), rows, cols)
	            );
	          }
	          else {
	            // return an Array
	            return _inv(x, rows, cols);
	          }
	        }
	        else {
	          throw new RangeError('Matrix must be square ' +
	              '(size: ' + string.format(size) + ')');
	        }
	        break;

	      default:
	        // multi dimensional array
	        throw new RangeError('Matrix must be two dimensional ' +
	            '(size: ' + string.format(size) + ')');
	    }
	  };

	  /**
	   * Calculate the inverse of a square matrix
	   * @param {Array[]} matrix  A square matrix
	   * @param {Number} rows     Number of rows
	   * @param {Number} cols     Number of columns, must equal rows
	   * @return {Array[]} inv    Inverse matrix
	   * @private
	   */
	  function _inv (matrix, rows, cols){
	    var r, s, f, value, temp;

	    if (rows == 1) {
	      // this is a 1 x 1 matrix
	      value = matrix[0][0];
	      if (value == 0) {
	        throw Error('Cannot calculate inverse, determinant is zero');
	      }
	      return [[
	        math.divide(1, value)
	      ]];
	    }
	    else if (rows == 2) {
	      // this is a 2 x 2 matrix
	      var d = math.det(matrix);
	      if (d == 0) {
	        throw Error('Cannot calculate inverse, determinant is zero');
	      }
	      return [
	        [
	          math.divide(matrix[1][1], d),
	          math.divide(math.unary(matrix[0][1]), d)
	        ],
	        [
	          math.divide(math.unary(matrix[1][0]), d),
	          math.divide(matrix[0][0], d)
	        ]
	      ];
	    }
	    else {
	      // this is a matrix of 3 x 3 or larger
	      // calculate inverse using gauss-jordan elimination
	      //      http://en.wikipedia.org/wiki/Gaussian_elimination
	      //      http://mathworld.wolfram.com/MatrixInverse.html
	      //      http://math.uww.edu/~mcfarlat/inverse.htm

	      // make a copy of the matrix (only the arrays, not of the elements)
	      var A = matrix.concat();
	      for (r = 0; r < rows; r++) {
	        A[r] = A[r].concat();
	      }

	      // create an identity matrix which in the end will contain the
	      // matrix inverse
	      var B = math.eye(rows).valueOf();

	      // loop over all columns, and perform row reductions
	      for (var c = 0; c < cols; c++) {
	        // element Acc should be non zero. if not, swap content
	        // with one of the lower rows
	        r = c;
	        while (r < rows && A[r][c] == 0) {
	          r++;
	        }
	        if (r == rows || A[r][c] == 0) {
	          throw Error('Cannot calculate inverse, determinant is zero');
	        }
	        if (r != c) {
	          temp = A[c]; A[c] = A[r]; A[r] = temp;
	          temp = B[c]; B[c] = B[r]; B[r] = temp;
	        }

	        // eliminate non-zero values on the other rows at column c
	        var Ac = A[c],
	            Bc = B[c];
	        for (r = 0; r < rows; r++) {
	          var Ar = A[r],
	              Br = B[r];
	          if(r != c) {
	            // eliminate value at column c and row r
	            if (Ar[c] != 0) {
	              f = math.divide(math.unary(Ar[c]), Ac[c]);

	              // add (f * row c) to row r to eliminate the value
	              // at column c
	              for (s = c; s < cols; s++) {
	                Ar[s] = math.add(Ar[s], math.multiply(f, Ac[s]));
	              }
	              for (s = 0; s < cols; s++) {
	                Br[s] = math.add(Br[s],  math.multiply(f, Bc[s]));
	              }
	            }
	          }
	          else {
	            // normalize value at Acc to 1,
	            // divide each value on row r with the value at Acc
	            f = Ac[c];
	            for (s = c; s < cols; s++) {
	              Ar[s] = math.divide(Ar[s], f);
	            }
	            for (s = 0; s < cols; s++) {
	              Br[s] = math.divide(Br[s], f);
	            }
	          }
	        }
	      }
	      return B;
	    }
	  }
	};


/***/ },
/* 69 */
/***/ function(module, exports, require) {

	module.exports = function (math, settings) {
	  var util = require(117),

	      BigNumber = require(220),
	      Matrix = require(10),
	      collection = require(13),

	      array = util.array,

	      toNumber = util.number.toNumber,
	      isArray = Array.isArray;

	  /**
	   * Create a matrix filled with ones
	   *
	   *     ones(m)
	   *     ones(m, n)
	   *     ones([m, n])
	   *     ones([m, n, p, ...])
	   *
	   * @param {...Number | Array} size
	   * @return {Array | Matrix | Number} matrix
	   */
	  math.ones = function ones (size) {
	    var args = collection.argsToArray(arguments);
	    var asMatrix = (size instanceof Matrix) ? true :
	        (isArray(size) ? false : (settings.matrix === 'matrix'));

	    if (args.length == 0) {
	      // output an empty matrix
	      return asMatrix ? new Matrix() : [];
	    }
	    else {
	      // output an array or matrix
	      var res = [];
	      var defaultValue = (args[0] instanceof BigNumber) ? new BigNumber(1) : 1;
	      res = array.resize(res, args.map(toNumber), defaultValue);

	      return asMatrix ? new Matrix(res) : res;
	    }
	  };
	};


/***/ },
/* 70 */
/***/ function(module, exports, require) {

	module.exports = function (math, settings) {
	  var util = require(117),

	      BigNumber = require(220),
	      Matrix = require(10),
	      collection = require(13),

	      isBoolean = util['boolean'].isBoolean,
	      isString = util.string.isString,
	      isNumber = util.number.isNumber,
	      toNumber = util.number.toNumber,
	      toBigNumber = util.number.toBigNumber;

	  /**
	   * Create an array from a range.
	   * By default, the range end is excluded. This can be customized by providing
	   * an extra parameter `includeEnd`.
	   *
	   * The method accepts the following arguments
	   *     range(str [, includeEnd])              Create a range from a string,
	   *                                            where the string contains the
	   *                                            start, optional step, and end,
	   *                                            separated by a colon.
	   *     range(start, end [, includeEnd])       Create a range with start and
	   *                                            end and a step size of 1.
	   *     range(start, end, step [, includeEnd]) Create a range with start, step,
	   *                                            and end.
	   *
	   * Where:
	   *     {String} str
	   *     {Number | BigNumber} start   Start of the range
	   *     {Number | BigNumber} end     End of the range, excluded by default,
	   *                                  included when parameter includeEnd=true
	   *     {Number | BigNumber} step=1  Step size.
	   *     {boolean} includeEnd=false   Option to specify whether to include
	   *                                  the end or not.
	   *
	   * Example usage:
	   *     math.range(2, 6);        // [2,3,4,5]
	   *     math.range(2, -3, -1);   // [2,1,0,-1,-2]
	   *     math.range('2:1:6');     // [2,3,4,5]
	   *     math.range(2, 6, true);  // [2,3,4,5,6]
	   *
	   * @param {...*} args
	   * @return {Array | Matrix} range
	   */
	  math.range = function range(args) {
	    var params = Array.prototype.slice.call(arguments),
	        start,
	        end,
	        step,
	        includeEnd = false;

	    // read the includeEnd parameter
	    if (isBoolean(params[params.length - 1])) {
	      includeEnd = params.pop() ? true : false;
	    }

	    switch (params.length) {
	      case 1:
	        // range(str)
	        // parse string into a range
	        if (isString(params[0])) {
	          var r = _parse(params[0]);
	          if (!r){
	            throw new SyntaxError('String "' + r + '" is no valid range');
	          }

	          start = r.start;
	          end = r.end;
	          step = r.step;
	        }
	        else {
	          throw new TypeError(
	              'Two or three numbers or a single string expected in function range');
	        }
	        break;

	      case 2:
	        // range(str, end)
	        // range(start, end)
	        start = params[0];
	        end = params[1];
	        step = 1;
	        break;

	      case 3:
	        // range(start, end, step)
	        start = params[0];
	        end = params[1];
	        step = params[2];
	        break;

	      default:
	        throw new math.error.ArgumentsError('range', arguments.length, 2, 4);
	    }

	    // verify type of parameters
	    if (!isNumber(start) && !(start instanceof BigNumber)) {
	      throw new TypeError('Parameter start must be a number');
	    }
	    if (!isNumber(end) && !(end instanceof BigNumber)) {
	      throw new TypeError('Parameter end must be a number');
	    }
	    if (!isNumber(step) && !(step instanceof BigNumber)) {
	      throw new TypeError('Parameter step must be a number');
	    }
	    if (!isBoolean(includeEnd)) {
	      throw new TypeError('Parameter includeEnd must be a boolean');
	    }

	    // go big
	    if (start instanceof BigNumber || end instanceof BigNumber || step instanceof BigNumber) {
	      // create a range with big numbers
	      var asBigNumber = true;

	      // convert start, end, step to BigNumber
	      if (!(start instanceof BigNumber)) {
	        start = toBigNumber(start);
	      }
	      if (!(end instanceof BigNumber)) {
	        end = toBigNumber(end);
	      }
	      if (!(step instanceof BigNumber)) {
	        step = toBigNumber(step);
	      }

	      if (!(start instanceof BigNumber) || !(end instanceof BigNumber) || !(step instanceof BigNumber)) {
	        // not all values can be converted to big number :(
	        // fall back to numbers
	        asBigNumber = false;
	        start = toNumber(start);
	        end   = toNumber(end);
	        step  = toNumber(step);
	      }
	    }

	    // generate the range
	    var fn = asBigNumber ?
	        (includeEnd ? _bigRangeInc : _bigRange) :
	        (includeEnd ? _rangeInc    : _range);
	    var array = fn(start, end, step);

	    // return as array or matrix
	    return (settings.matrix === 'array') ? array : new Matrix(array);
	  };

	  /**
	   * Create a range with numbers. End is excluded
	   * @param {Number} start
	   * @param {Number} end
	   * @param {Number} step
	   * @returns {Array} range
	   * @private
	   */
	  function _range (start, end, step) {
	    var array = [],
	        x = start;
	    if (step > 0) {
	      while (x < end) {
	        array.push(x);
	        x += step;
	      }
	    }
	    else if (step < 0) {
	      while (x > end) {
	        array.push(x);
	        x += step;
	      }
	    }

	    return array;
	  }

	  /**
	   * Create a range with numbers. End is included
	   * @param {Number} start
	   * @param {Number} end
	   * @param {Number} step
	   * @returns {Array} range
	   * @private
	   */
	  function _rangeInc (start, end, step) {
	    var array = [],
	        x = start;
	    if (step > 0) {
	      while (x <= end) {
	        array.push(x);
	        x += step;
	      }
	    }
	    else if (step < 0) {
	      while (x >= end) {
	        array.push(x);
	        x += step;
	      }
	    }

	    return array;
	  }

	  /**
	   * Create a range with big numbers. End is excluded
	   * @param {BigNumber} start
	   * @param {BigNumber} end
	   * @param {BigNumber} step
	   * @returns {Array} range
	   * @private
	   */
	  function _bigRange (start, end, step) {
	    var array = [],
	        x = start.clone(),
	        zero = new BigNumber(0);
	    if (step.gt(zero)) {
	      while (x.lt(end)) {
	        array.push(x);
	        x = x.plus(step);
	      }
	    }
	    else if (step.lt(zero)) {
	      while (x.gt(end)) {
	        array.push(x);
	        x = x.plus(step);
	      }
	    }

	    return array;
	  }

	  /**
	   * Create a range with big numbers. End is included
	   * @param {BigNumber} start
	   * @param {BigNumber} end
	   * @param {BigNumber} step
	   * @returns {Array} range
	   * @private
	   */
	  function _bigRangeInc (start, end, step) {
	    var array = [],
	        x = start.clone(),
	        zero = new BigNumber(0);
	    if (step.gt(zero)) {
	      while (x.lte(end)) {
	        array.push(x);
	        x = x.plus(step);
	      }
	    }
	    else if (step.lt(zero)) {
	      while (x.gte(end)) {
	        array.push(x);
	        x = x.plus(step);
	      }
	    }

	    return array;
	  }

	  /**
	   * Parse a string into a range,
	   * The string contains the start, optional step, and end, separated by a colon.
	   * If the string does not contain a valid range, null is returned.
	   * For example str='0:2:11'.
	   * @param {String} str
	   * @return {Object | null} range Object containing properties start, end, step
	   * @private
	   */
	  function _parse (str) {
	    var args = str.split(':'),
	        nums = null;

	    if (settings.number === 'bignumber') {
	      // bignumber
	      try {
	        nums = args.map(function (arg) {
	          return new BigNumber(arg);
	        });
	      }
	      catch (err) {
	        return null;
	      }
	    }
	    else {
	      // number
	      nums = args.map(function (arg) {
	        return parseFloat(arg);
	      });

	      var invalid = nums.some(function (num) {
	        return isNaN(num);
	      });
	      if(invalid) {
	        return null;
	      }
	    }

	    switch (nums.length) {
	      case 2:
	        return {
	          start: nums[0],
	          end: nums[1],
	          step: 1
	        };

	      case 3:
	        return {
	          start: nums[0],
	          end: nums[2],
	          step: nums[1]
	        };

	      default:
	        return null;
	    }
	  }

	};


/***/ },
/* 71 */
/***/ function(module, exports, require) {

	module.exports = function (math, settings) {
	  var util = require(117),

	      BigNumber = require(220),
	      Matrix = require(10),

	      array = util.array,
	      clone = util.object.clone,
	      isString = util.string.isString,
	      toNumber = util.number.toNumber,
	      isNumber = util.number.isNumber,
	      isInteger = util.number.isInteger,
	      isArray = array.isArray;

	  /**
	   * Resize a matrix
	   *
	   *     resize(x, size)
	   *     resize(x, size, defaultValue)
	   *
	   * @param {* | Array | Matrix} x
	   * @param {Array | Matrix} size             One dimensional array with numbers
	   * @param {Number | String} [defaultValue]  Undefined by default, except in
	   *                                          case of a string, in that case
	   *                                          defaultValue = ' '
	   * @return {* | Array | Matrix} res
	   */
	  math.resize = function resize (x, size, defaultValue) {
	    if (arguments.length != 2 && arguments.length != 3) {
	      throw new math.error.ArgumentsError('resize', arguments.length, 2, 3);
	    }

	    var asMatrix = (x instanceof Matrix) ? true : isArray(x) ? false : (settings.matrix !== 'array');

	    if (x instanceof Matrix) {
	      x = x.valueOf(); // get Array
	    }
	    if (size instanceof Matrix) {
	      size = size.valueOf(); // get Array
	    }

	    if (size.length && size[0] instanceof BigNumber) {
	      // convert bignumbers to numbers
	      size = size.map(toNumber);
	    }

	    if (isString(x)) {
	      return _resizeString(x, size, defaultValue);
	    }
	    else {
	      if (size.length == 0) {
	        // output a scalar
	        while (isArray(x)) {
	          x = x[0];
	        }

	        return clone(x);
	      }
	      else {
	        // output an array/matrix
	        if (!isArray(x)) {
	          x = [x];
	        }
	        x = clone(x);

	        var res = array.resize(x, size, defaultValue);
	        return asMatrix ? new Matrix(res) : res;
	      }
	    }
	  };

	  /**
	   * Resize a string
	   * @param {String} str
	   * @param {Number[]} size
	   * @param {string} defaultChar
	   * @private
	   */
	  function _resizeString(str, size, defaultChar) {
	    if (defaultChar !== undefined) {
	      if (!isString(defaultChar) || defaultChar.length !== 1) {
	        throw new TypeError('Single character expected as defaultValue');
	      }
	    }
	    else {
	      defaultChar = ' ';
	    }

	    if (size.length !== 1) {
	      throw new Error('Dimension mismatch: (' + size.length + ' != 1)');
	    }
	    var len = size[0];
	    if (!isNumber(len) || !isInteger(len)) {
	      throw new TypeError('Size must contain numbers');
	    }

	    if (str.length > len) {
	      return str.substring(0, len);
	    }
	    else if (str.length < len) {
	      var res = str;
	      for (var i = 0, ii = len - str.length; i < ii; i++) {
	        res += defaultChar;
	      }
	      return res;
	    }
	    else {
	      return str;
	    }
	  }
	};


/***/ },
/* 72 */
/***/ function(module, exports, require) {

	module.exports = function (math, settings) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      Unit = require(11),
	      Matrix = require(10),

	      array = util.array,
	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isString = util.string.isString,
	      isComplex = Complex.isComplex,
	      isUnit = Unit.isUnit;

	  /**
	   * Calculate the size of a matrix or scalar
	   *
	   *     size(x)
	   *
	   * @param {Boolean | Number | Complex | Unit | String | Array | Matrix} x
	   * @return {Array | Matrix} res
	   */
	  math.size = function size (x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('size', arguments.length, 1);
	    }

	    var asArray = (settings.matrix === 'array');

	    if (isNumber(x) || isComplex(x) || isUnit(x) || isBoolean(x) ||
	        x == null || x instanceof BigNumber) {
	      return asArray ? [] : new Matrix([]);
	    }

	    if (isString(x)) {
	      return asArray ? [x.length] : new Matrix([x.length]);
	    }

	    if (Array.isArray(x)) {
	      return array.size(x);
	    }

	    if (x instanceof Matrix) {
	      return new Matrix(x.size());
	    }

	    throw new math.error.UnsupportedTypeError('size', x);
	  };
	};


/***/ },
/* 73 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      Matrix = require(10),

	      object = util.object,
	      array = util.array,
	      isArray = Array.isArray;

	  /**
	   * Remove singleton dimensions from a matrix
	   *
	   *     squeeze(x)
	   *
	   * @param {Matrix | Array} x
	   * @return {Matrix | Array} res
	   */
	  math.squeeze = function squeeze (x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('squeeze', arguments.length, 1);
	    }

	    if (isArray(x)) {
	      return array.squeeze(object.clone(x));
	    }
	    else if (x instanceof Matrix) {
	      var res = array.squeeze(x.toArray());
	      return isArray(res) ? new Matrix(res) : res;
	    }
	    else {
	      // scalar
	      return object.clone(x);
	    }
	  };
	};


/***/ },
/* 74 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      Matrix = require(10),
	      Index = require(9),

	      array = util.array,
	      isString = util.string.isString,
	      isArray = Array.isArray;

	  /**
	   * Get or set a subset of a matrix or string
	   *
	   * Usage:
	   *     // retrieve subset:
	   *     var subset = math.subset(value, index)
	   *
	   *     // replace subset:
	   *     var value = math.subset(value, index, replacement [, defaultValue])
	   *
	   * Where:
	   *     {Array | Matrix | String} value  An array, matrix, or string
	   *     {Index} index                    An index containing ranges for each
	   *                                      dimension
	   *     {*} replacement                  An array, matrix, or scalar
	   *     {*} [defaultValue]        Default value, filled in on new entries when
	   *                               the matrix is resized. If not provided,
	   *                               new matrix elements will be left undefined.
	   * @param args
	   * @return res
	   */
	  math.subset = function subset (args) {
	    switch (arguments.length) {
	      case 2: // get subset
	        return _getSubset(arguments[0], arguments[1]);

	      // intentional fall through
	      case 3: // set subset
	      case 4: // set subset with default value
	        return _setSubset(arguments[0], arguments[1], arguments[2], arguments[3]);

	      default: // wrong number of arguments
	        throw new math.error.ArgumentsError('subset', arguments.length, 2, 4);
	    }
	  };

	  /**
	   * Retrieve a subset of an value such as an Array, Matrix, or String
	   * @param {Array | Matrix | String} value Object from which to get a subset
	   * @param {Index} index                   An index containing ranges for each
	   *                                        dimension
	   * @returns {Array | Matrix | *} subset
	   * @private
	   */
	  function _getSubset(value, index) {
	    var m, subset;

	    if (isArray(value)) {
	      m = new Matrix(value);
	      subset = m.subset(index);
	      return subset.valueOf();
	    }
	    else if (value instanceof Matrix) {
	      return value.subset(index);
	    }
	    else if (isString(value)) {
	      return _getSubstring(value, index);
	    }
	    else {
	      throw new math.error.UnsupportedTypeError('subset', value);
	    }
	  }

	  /**
	   * Retrieve a subset of a string
	   * @param {String} str            String from which to get a substring
	   * @param {Index} index           An index containing ranges for each dimension
	   * @returns {string} substring
	   * @private
	   */
	  function _getSubstring(str, index) {
	    if (!(index instanceof Index)) {
	      // TODO: better error message
	      throw new TypeError('Index expected');
	    }
	    if (index.size().length != 1) {
	      throw new RangeError('Dimension mismatch (' + index.size().length + ' != 1)');
	    }

	    var range = index.range(0);

	    var substr = '';
	    var strLen = str.length;
	    range.forEach(function (v) {
	      array.validateIndex(v, strLen);
	      substr += str.charAt(v);
	    });

	    return substr;
	  }

	  /**
	   * Replace a subset in an value such as an Array, Matrix, or String
	   * @param {Array | Matrix | String} value Object to be replaced
	   * @param {Index} index                   An index containing ranges for each
	   *                                        dimension
	   * @param {Array | Matrix | *} replacement
	   * @param {*} [defaultValue]        Default value, filled in on new entries when
	   *                                  the matrix is resized. If not provided,
	   *                                  new matrix elements will be left undefined.
	   * @returns {*} result
	   * @private
	   */
	  function _setSubset(value, index, replacement, defaultValue) {
	    var m;

	    if (isArray(value)) {
	      m = new Matrix(math.clone(value));
	      m.subset(index, replacement, defaultValue);
	      return m.valueOf();
	    }
	    else if (value instanceof Matrix) {
	      return value.clone().subset(index, replacement, defaultValue);
	    }
	    else if (isString(value)) {
	      return _setSubstring(value, index, replacement, defaultValue);
	    }
	    else {
	      throw new math.error.UnsupportedTypeError('subset', value);
	    }
	  }

	  /**
	   * Replace a substring in a string
	   * @param {String} str            String to be replaced
	   * @param {Index} index           An index containing ranges for each dimension
	   * @param {String} replacement    Replacement string
	   * @param {String} [defaultValue] Default value to be uses when resizing
	   *                                the string. is ' ' by default
	   * @returns {string} result
	   * @private
	   */
	  function _setSubstring(str, index, replacement, defaultValue) {
	    if (!(index instanceof Index)) {
	      // TODO: better error message
	      throw new TypeError('Index expected');
	    }
	    if (index.size().length != 1) {
	      throw new RangeError('Dimension mismatch (' + index.size().length + ' != 1)');
	    }
	    if (defaultValue !== undefined) {
	      if (!isString(defaultValue) || defaultValue.length !== 1) {
	        throw new TypeError('Single character expected as defaultValue');
	      }
	    }
	    else {
	      defaultValue = ' ';
	    }

	    var range = index.range(0);
	    var len = range.size()[0];

	    if (len != replacement.length) {
	      throw new RangeError('Dimension mismatch ' +
	          '(' + range.size()[0] + ' != ' + replacement.length + ')');
	    }

	    // copy the string into an array with characters
	    var strLen = str.length;
	    var chars = [];
	    for (var i = 0; i < strLen; i++) {
	      chars[i] = str.charAt(i);
	    }

	    range.forEach(function (v, i) {
	      array.validateIndex(v);
	      chars[v] = replacement.charAt(i);
	    });

	    // initialize undefined characters with a space
	    if (chars.length > strLen) {
	      for (i = strLen - 1, len = chars.length; i < len; i++) {
	        if (!chars[i]) {
	          chars[i] = defaultValue;
	        }
	      }
	    }

	    return chars.join('');
	  }
	};


/***/ },
/* 75 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      Matrix = require(10),
	      collection = require(13),

	      object = util.object,
	      string = util.string;

	  /**
	   * Create the transpose of a matrix
	   *
	   *     transpose(x)
	   *
	   * @param {Array | Matrix} x
	   * @return {Array | Matrix} transpose
	   */
	  math.transpose = function transpose (x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('transpose', arguments.length, 1);
	    }

	    var size = math.size(x).valueOf();
	    switch (size.length) {
	      case 0:
	        // scalar
	        return object.clone(x);
	        break;

	      case 1:
	        // vector
	        return object.clone(x);
	        break;

	      case 2:
	        // two dimensional array
	        var rows = size[1],
	            cols = size[0],
	            asMatrix = (x instanceof Matrix),
	            data = x.valueOf(),
	            transposed = [],
	            transposedRow,
	            clone = object.clone;

	        if (rows === 0) {
	          // whoops
	          throw new RangeError('Cannot transpose a 2D matrix with no rows' +
	              '(size: ' + string.format(size) + ')');
	        }

	        for (var r = 0; r < rows; r++) {
	          transposedRow = transposed[r] = [];
	          for (var c = 0; c < cols; c++) {
	            transposedRow[c] = clone(data[c][r]);
	          }
	        }
	        if (cols == 0) {
	          transposed[0] = [];
	        }

	        return asMatrix ? new Matrix(transposed) : transposed;
	        break;

	      default:
	        // multi dimensional array
	        throw new RangeError('Matrix must be two dimensional ' +
	            '(size: ' + string.format(size) + ')');
	    }
	  };
	};


/***/ },
/* 76 */
/***/ function(module, exports, require) {

	module.exports = function (math, settings) {
	  var util = require(117),

	      BigNumber = require(220),
	      Matrix = require(10),
	      collection = require(13),

	      array = util.array,
	      toNumber = util.number.toNumber,
	      isArray = Array.isArray;

	  /**
	   * create a matrix filled with zeros
	   *
	   *     zeros(m)
	   *     zeros(m, n)
	   *     zeros([m, n])
	   *     zeros([m, n, p, ...])
	   *
	   * @param {...Number | Array} size
	   * @return {Array | Matrix | Number} matrix
	   */
	  math.zeros = function zeros (size) {
	    var args = collection.argsToArray(arguments);
	    var asMatrix = (size instanceof Matrix) ? true :
	        (isArray(size) ? false : (settings.matrix === 'matrix'));

	    if (args.length == 0) {
	      // output an empty matrix
	      return asMatrix ? new Matrix() : [];
	    }
	    else {
	      // output an array or matrix
	      var res = [];
	      var defaultValue = (args[0] instanceof BigNumber) ? new BigNumber(0) : 0;
	      res = array.resize(res, args.map(toNumber), defaultValue);

	      return asMatrix ? new Matrix(res) : res;
	    }
	  };
	};


/***/ },
/* 77 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isInteger = util.number.isInteger,
	      isCollection = collection.isCollection;

	  /**
	   * Compute the factorial of a value
	   *
	   *     n!
	   *     factorial(n)
	   *
	   * Factorial only supports an integer value as argument.
	   * For matrices, the function is evaluated element wise.
	   *
	   * @Param {Number | BigNumber | Array | Matrix} n
	   * @return {Number | BigNumber | Array | Matrix} res
	   */
	  math.factorial = function factorial (n) {
	    var value, res;

	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('factorial', arguments.length, 1);
	    }

	    if (isNumber(n)) {
	      if (!isInteger(n) || n < 0) {
	        throw new TypeError('Positive integer value expected in function factorial');
	      }

	      value = n - 1;
	      res = n;
	      while (value > 1) {
	        res *= value;
	        value--;
	      }

	      if (res == 0) {
	        res = 1;        // 0! is per definition 1
	      }

	      return res;
	    }

	    if (n instanceof BigNumber) {
	      if (!(isPositiveInteger(n))) {
	        throw new TypeError('Positive integer value expected in function factorial');
	      }

	      var one = new BigNumber(1);

	      value = n.minus(one);
	      res = n;
	      while (value.gt(one)) {
	        res = res.times(value);
	        value = value.minus(one);
	      }

	      if (res.equals(0)) {
	        res = one;        // 0! is per definition 1
	      }

	      return res;
	    }

	    if (isBoolean(n)) {
	      return 1; // factorial(1) = 1, factorial(0) = 1
	    }

	    if (isCollection(n)) {
	      return collection.deepMap(n, factorial);
	    }

	    throw new math.error.UnsupportedTypeError('factorial', n);
	  };

	  /**
	   * Test whether BigNumber n is a positive integer
	   * @param {BigNumber} n
	   * @returns {boolean} isPositiveInteger
	   */
	  var isPositiveInteger = function(n) {
	    return n.round().equals(n) && n.gte(0);
	  };
	};


/***/ },
/* 78 */
/***/ function(module, exports, require) {

	module.exports = function (math, settings) {
	  var Matrix = require(10),
	      collection = require(13);

	  // TODO: implement BigNumber support for random

	  /**
	   * Return a random number between 0 and 1
	   *
	   *     random()
	   *
	   * @return {Number} res
	   */

	  // Each distribution is a function that takes no argument and when called returns
	  // a number between 0 and 1.
	  var distributions = {

	    uniform: function() {
	      return Math.random;
	    },

	    // Implementation of normal distribution using Box-Muller transform
	    // ref : http://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
	    // We take : mean = 0.5, standard deviation = 1/6
	    // so that 99.7% values are in [0, 1].
	    normal: function() {
	      return function() {
	        var u1, u2,
	            picked = -1;
	        // We reject values outside of the interval [0, 1]
	        // TODO: check if it is ok to do that?
	        while (picked < 0 || picked > 1) {
	          u1 = Math.random();
	          u2 = Math.random();
	          picked = 1/6 * Math.pow(-2 * Math.log(u1), 0.5) * Math.cos(2 * Math.PI * u2) + 0.5;
	        }
	        return picked;
	      }
	    }
	  };

	  /**
	   * Create a distribution object.
	   * @param {String} name           Name of a distribution.
	   *                                Choose from 'uniform', 'normal'.
	   * @return {Object} distribution  A distribution object containing functions:
	   *                                    random([size, min, max])
	   *                                    randomInt([min, max])
	   *                                    pickRandom(array)
	   */
	  math.distribution = function(name) {
	    if (!distributions.hasOwnProperty(name))
	      throw new Error('unknown distribution ' + name);

	    var args = Array.prototype.slice.call(arguments, 1),
	        distribution = distributions[name].apply(this, args);

	    return (function(distribution) {

	      // This is the public API for all distributions
	      var randFunctions = {

	        random: function(arg1, arg2, arg3) {
	          var size, min, max;
	          if (arguments.length > 3) {
	            throw new math.error.ArgumentsError('random', arguments.length, 0, 3);

	          // `random(max)` or `random(size)`
	          } else if (arguments.length === 1) {
	            if (Array.isArray(arg1))
	              size = arg1;
	            else
	              max = arg1;
	          // `random(min, max)` or `random(size, max)`
	          } else if (arguments.length === 2) {
	            if (Array.isArray(arg1))
	              size = arg1;
	            else {
	              min = arg1;
	              max = arg2;
	            }
	          // `random(size, min, max)`
	          } else {
	            size = arg1;
	            min = arg2;
	            max = arg3;
	          }

	          if (max === undefined) max = 1;
	          if (min === undefined) min = 0;
	          if (size !== undefined) {
	            var res = _randomDataForMatrix(size, min, max, _random);
	            return (settings.matrix === 'array') ? res : new Matrix(res);
	          }
	          else return _random(min, max);
	        },

	        randomInt: function(arg1, arg2, arg3) {
	          var size, min, max;
	          if (arguments.length > 3 || arguments.length < 1)
	            throw new math.error.ArgumentsError('randomInt', arguments.length, 1, 3);

	          // `randomInt(max)`
	          else if (arguments.length === 1) max = arg1;
	          // `randomInt(min, max)` or `randomInt(size, max)`
	          else if (arguments.length === 2) {
	            if (Object.prototype.toString.call(arg1) === '[object Array]')
	              size = arg1;
	            else {
	              min = arg1;
	              max = arg2;
	            }
	          // `randomInt(size, min, max)`
	          } else {
	            size = arg1;
	            min = arg2;
	            max = arg3;
	          }

	          if (min === undefined) min = 0;
	          if (size !== undefined) {
	            var res = _randomDataForMatrix(size, min, max, _randomInt);
	            return (settings.matrix === 'array') ? res : new Matrix(res);
	          }
	          else return _randomInt(min, max);
	        },

	        pickRandom: function(possibles) {
	          if (arguments.length !== 1) {
	            throw new math.error.ArgumentsError('pickRandom', arguments.length, 1);
	          }
	          if (!Array.isArray(possibles)) {
	            throw new math.error.UnsupportedTypeError('pickRandom', possibles);
	          }

	          // TODO: add support for matrices
	          return possibles[Math.floor(Math.random() * possibles.length)];
	        }

	      };

	      var _random = function(min, max) {
	        return min + distribution() * (max - min);
	      };

	      var _randomInt = function(min, max) {
	        return Math.floor(min + distribution() * (max - min));
	      };

	      // This is a function for generating a random matrix recursively.
	      var _randomDataForMatrix = function(size, min, max, randFunc) {
	        var data = [], length, i;
	        size = size.slice(0);

	        if (size.length > 1) {
	          for (i = 0, length = size.shift(); i < length; i++)
	            data.push(_randomDataForMatrix(size, min, max, randFunc));
	        } else {
	          for (i = 0, length = size.shift(); i < length; i++)
	            data.push(randFunc(min, max));
	        }

	        return data;
	      };

	      return randFunctions;

	    })(distribution);

	  };

	  // Default random functions use uniform distribution
	  // TODO: put random functions in separate files?
	  var uniformRandFunctions = math.distribution('uniform');
	  math.random = uniformRandFunctions.random;
	  math.randomInt = uniformRandFunctions.randomInt;
	  math.pickRandom = uniformRandFunctions.pickRandom;
	};


/***/ },
/* 79 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),

	      isNumber = util.number.isNumber,
	      isInteger = util.number.isInteger,
	      toBigNumber = util.number.toBigNumber;

	  /**
	   * Compute the number of permutations of n items taken k at a time
	   *
	   *     permutations(n)
	   *     permutations(n, k)
	   *
	   * permutations only takes integer arguments
	   * the following condition must be enforced: k <= n
	   *
	   * @Param {Number | BigNumber} n
	   * @Param {Number | BigNumber} k
	   * @return {Number | BigNumber} permutations
	   */
	  math.permutations = function permutations (n, k) {
	    var result, i;

	    var arity = arguments.length;
	    if (arity > 2) {
	      throw new math.error.ArgumentsError('permutations', arguments.length, 2);
	    }

	    if (isNumber(n)) {
	      if (!isInteger(n) || n < 0) {
	        throw new TypeError('Positive integer value expected in function permutations');
	      }
	      
	      // Permute n objects
	      if (arity == 1) {
	        return math.factorial(n);
	      }
	      
	      // Permute n objects, k at a time
	      if (arity == 2) {
	        if (isNumber(k)) {
	          if (!isInteger(k) || k < 0) {
	            throw new TypeError('Positive integer value expected in function permutations');
	          }
	          if (k > n) {
	            throw new TypeError('second argument k must be less than or equal to first argument n');
	          }

	          result = 1;
	          for (i = n - k + 1; i <= n; i++) {
	            result = result * i;
	          }
	          return result;
	        }
	      }
	    }

	    if (n instanceof BigNumber) {
	      if (k === undefined && isPositiveInteger(n)) {
	        return math.factorial(n);
	      }

	      // make sure k is a BigNumber as well
	      // not all numbers can be converted to BigNumber
	      k = toBigNumber(k);

	      if (!(k instanceof BigNumber) || !isPositiveInteger(n) || !isPositiveInteger(k)) {
	        throw new TypeError('Positive integer value expected in function permutations');
	      }
	      if (k.gt(n)) {
	        throw new TypeError('second argument k must be less than or equal to first argument n');
	      }

	      result = new BigNumber(1);
	      for (i = n.minus(k).plus(1); i.lte(n); i = i.plus(1)) {
	        result = result.times(i);
	      }
	      return result;
	    }

	    throw new math.error.UnsupportedTypeError('permutations', n);
	  };

	  /**
	   * Test whether BigNumber n is a positive integer
	   * @param {BigNumber} n
	   * @returns {boolean} isPositiveInteger
	   */
	  var isPositiveInteger = function(n) {
	    return n.round().equals(n) && n.gte(0);
	  };
	};


/***/ },
/* 80 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      isInteger = util.number.isInteger,
	      toBigNumber = util.number.toBigNumber;

	  /**
	   * Compute the number of combinations of n items taken k at a time
	   *
	   *     combinations(n, k)
	   *
	   * combinations only takes integer arguments
	   * the following condition must be enforced: k <= n
	   *
	   * @Param {Number | BigNumber} n
	   * @Param {Number | BigNumber} k
	   * @return {Number | BigNumber} combinations
	   */
	  math.combinations = function combinations (n, k) {
	    var max, result, i,ii;

	    var arity = arguments.length;
	    if (arity != 2) {
	      throw new math.error.ArgumentsError('combinations', arguments.length, 2);
	    }

	    if (isNumber(n)) {
	      if (!isInteger(n) || n < 0) {
	        throw new TypeError('Positive integer value enpected in function combinations');
	      }
	      if (k > n) {
	        throw new TypeError('k must be less than or equal to n');
	      }

	      max = Math.max(k, n - k);
	      result = 1;
	      for (i = 1; i <= n - max; i++) {
	        result = result * (max + i) / i;
	      }
	      return result;
	    }

	    if (n instanceof BigNumber) {
	      // make sure k is a BigNumber as well
	      // not all numbers can be converted to BigNumber
	      k = toBigNumber(k);

	      if (!(k instanceof BigNumber) || !isPositiveInteger(n) || !isPositiveInteger(k)) {
	        throw new TypeError('Positive integer value expected in function combinations');
	      }
	      if (k.gt(n)) {
	        throw new TypeError('k must be less than n in function combinations');
	      }

	      max = n.minus(k);
	      if (k.lt(max)) max = k;
	      result = new BigNumber(1);
	      for (i = new BigNumber(1), ii = n.minus(max); i.lte(ii); i = i.plus(1)) {
	        result = result.times(max.plus(i)).dividedBy(i);
	      }
	      return result;
	    }

	    throw new math.error.UnsupportedTypeError('combinations', n);
	  };

	  /**
	   * Test whether BigNumber n is a positive integer
	   * @param {BigNumber} n
	   * @returns {boolean} isPositiveInteger
	   */
	  var isPositiveInteger = function(n) {
	    return n.round().equals(n) && n.gte(0);
	  };
	};


/***/ },
/* 81 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var Matrix = require(10),
	      collection = require(13),

	      isCollection = collection.isCollection;

	  /**
	   * Compute the minimum value of a list of values.
	   * In case of a multi dimensional array, the minimum of the flattened array
	   * will be calculated. When dim is provided, the maximum over the selected
	   * dimension will be calculated.
	   *
	   *     min(a, b, c, ...)
	   *     min(A)
	   *     min(A, dim)
	   *
	   * @param {... *} args  A single matrix or multiple scalar values
	   * @return {*} res
	   */
	  math.min = function min(args) {
	    if (arguments.length == 0) {
	      throw new SyntaxError('Function min requires one or more parameters (0 provided)');
	    }

	    if (isCollection(args)) {
	      if (arguments.length == 1) {
	        // min([a, b, c, d, ...])
	        return _min(args);
	      }
	      else if (arguments.length == 2) {
	        // min([a, b, c, d, ...], dim)
	        return collection.reduce(arguments[0], arguments[1], _getsmaller);
	      }
	      else {
	        throw new SyntaxError('Wrong number of parameters');
	      }
	    }
	    else {
	      // min(a, b, c, d, ...)
	      return _min(arguments);
	    }
	  };

	  function _getsmaller(x, y){
		  if( math.smaller(x,y) )
			  return x;
		  else
			  return y;
	  }

	  /**
	   * Recursively calculate the minimum value in an n-dimensional array
	   * @param {Array} array
	   * @return {Number} min
	   * @private
	   */
	  function _min(array) {
	    var min = null;

	    collection.deepForEach(array, function (value) {
	      if (min === null || math.smaller(value, min)) {
	        min = value;
	      }
	    });

	    if (min === null) {
	      throw new Error('Cannot calculate min of an empty array');
	    }

	    return min;
	  }
	};


/***/ },
/* 82 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var Matrix = require(10),
	      collection = require(13),

	      isCollection = collection.isCollection;

	  /**
	   * Compute the maximum value of a list of values
	   * In case of a multi dimensional array, the maximum of the flattened array
	   * will be calculated. When dim is provided, the maximum over the selected
	   * dimension will be calculated.
	   *
	   *     max(a, b, c, ...)
	   *     max(A)
	   *     max(A, dim)
	   *
	   * @param {... *} args  A single matrix or or multiple scalar values
	   * @return {*} res
	   */
	  math.max = function max(args) {
	    if (arguments.length == 0) {
	      throw new SyntaxError('Function max requires one or more parameters (0 provided)');
	    }

	    if (isCollection(args)) {
	      if (arguments.length == 1) {
	        // max([a, b, c, d, ...])
	        return _max(args);
	      }
	      else if (arguments.length == 2) {
	        // max([a, b, c, d, ...], dim)
	        return collection.reduce(arguments[0], arguments[1], _getlarger);
	      }
	      else {
	        throw new SyntaxError('Wrong number of parameters');
	      }
	    }
	    else {
	      // max(a, b, c, d, ...)
	      return _max(arguments);
	    }
	  };

	  function _getlarger(x, y){
		  if( math.larger(x,y) )
			  return x;
		  else
			  return y;
	  }

	  /**
	   * Recursively calculate the maximum value in an n-dimensional array
	   * @param {Array} array
	   * @return {Number} max
	   * @private
	   */
	  function _max(array) {
	    var max = null;

	    collection.deepForEach(array, function (value) {
	      if (max === null || math.larger(value, max)) {
	        max = value;
	      }
	    });

	    if (max === null) {
	      throw new Error('Cannot calculate max of an empty array');
	    }

	    return max;
	  }
	};


/***/ },
/* 83 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var Matrix = require(10),
	      collection = require(13),

	      isCollection = collection.isCollection;

	  /**
	   * Compute the mean value of a list of values
	   * In case of a multi dimensional array, the mean of the flattened array
	   * will be calculated. When dim is provided, the maximum over the selected
	   * dimension will be calculated.
	   *
	   *     mean(a, b, c, ...)
	   *     mean(A)
	   *     mean(A, dim)
	   *
	   * @param {... *} args  A single matrix or or multiple scalar values
	   * @return {*} res
	   */
	  math.mean = function mean(args) {
	    if (arguments.length == 0) {
	      throw new SyntaxError('Function mean requires one or more parameters (0 provided)');
	    }

	    if (isCollection(args)) {
	      if (arguments.length == 1) {
	        // mean([a, b, c, d, ...])
	        return _mean(args);
	      }
	      else if (arguments.length == 2) {
	        // mean([a, b, c, d, ...], dim)
	        return _nmean(arguments[0], arguments[1]);
	      }
	      else {
	        throw new SyntaxError('Wrong number of parameters');
	      }
	    }
	    else {
	      // mean(a, b, c, d, ...)
	      return _mean(arguments);
	    }
	  };

	  /**
	   * Calculate the mean value in an n-dimensional array, returning a
	   * n-1 dimensional array
	   * @param {Array} array
	   * @param {Number} dim
	   * @return {Number} mean
	   * @private
	   */
	  function _nmean(array, dim){
		  var sum;
		  sum = collection.reduce(array, dim, math.add);
		  return math.divide(sum, size(array)[dim]);
	  };

	  /**
	   * Recursively calculate the mean value in an n-dimensional array
	   * @param {Array} array
	   * @return {Number} mean
	   * @private
	   */
	  function _mean(array) {
	    var sum = 0;
	    var num = 0;

	    collection.deepForEach(array, function (value) {
	      sum = math.add(sum, value);
	      num++;
	    });

	    if (num === 0) {
	      throw new Error('Cannot calculate mean of an empty array');
	    }

	    return math.divide(sum, num);
	  }
	};


/***/ },
/* 84 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isComplex = Complex.isComplex,
	      isCollection = collection.isCollection;

	  /**
	   * Calculate the inverse cosine of a value
	   *
	   *     acos(x)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param {Number | Boolean | Complex | Array | Matrix} x
	   * @return {Number | Complex | Array | Matrix} res
	   *
	   * @see http://mathworld.wolfram.com/InverseCosine.html
	   */
	  math.acos = function acos(x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('acos', arguments.length, 1);
	    }

	    if (isNumber(x)) {
	      if (x >= -1 && x <= 1) {
	        return Math.acos(x);
	      }
	      else {
	        return acos(new Complex(x, 0));
	      }
	    }

	    if (isComplex(x)) {
	      // acos(z) = 0.5*pi + i*log(iz + sqrt(1-z^2))
	      var temp1 = new Complex(
	          x.im * x.im - x.re * x.re + 1.0,
	          -2.0 * x.re * x.im
	      );
	      var temp2 = math.sqrt(temp1);
	      var temp3;
	      if (temp2 instanceof Complex) {
	        temp3 = new Complex(
	            temp2.re - x.im,
	            temp2.im + x.re
	        )
	      }
	      else {
	        temp3 = new Complex(
	            temp2 - x.im,
	            x.re
	        )
	      }
	      var temp4 = math.log(temp3);

	      // 0.5*pi = 1.5707963267948966192313216916398
	      if (temp4 instanceof Complex) {
	        return new Complex(
	            1.57079632679489661923 - temp4.im,
	            temp4.re
	        );
	      }
	      else {
	        return new Complex(
	            1.57079632679489661923,
	            temp4
	        );
	      }
	    }

	    if (isCollection(x)) {
	      return collection.deepMap(x, acos);
	    }

	    if (isBoolean(x)) {
	      return Math.acos(x);
	    }

	    if (x instanceof BigNumber) {
	      // TODO: implement BigNumber support
	      // downgrade to Number
	      return acos(util.number.toNumber(x));
	    }

	    throw new math.error.UnsupportedTypeError('acos', x);
	  };
	};


/***/ },
/* 85 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isComplex = Complex.isComplex,
	      isCollection = collection.isCollection;

	  /**
	   * Calculate the inverse sine of a value
	   *
	   *     asin(x)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param {Number | Boolean | Complex | Array | Matrix} x
	   * @return {Number | Complex | Array | Matrix} res
	   *
	   * @see http://mathworld.wolfram.com/InverseSine.html
	   */
	  math.asin = function asin(x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('asin', arguments.length, 1);
	    }

	    if (isNumber(x)) {
	      if (x >= -1 && x <= 1) {
	        return Math.asin(x);
	      }
	      else {
	        return asin(new Complex(x, 0));
	      }
	    }

	    if (isComplex(x)) {
	      // asin(z) = -i*log(iz + sqrt(1-z^2))
	      var re = x.re;
	      var im = x.im;
	      var temp1 = new Complex(
	          im * im - re * re + 1.0,
	          -2.0 * re * im
	      );

	      var temp2 = math.sqrt(temp1);
	      var temp3;
	      if (temp2 instanceof Complex) {
	        temp3 = new Complex(
	            temp2.re - im,
	            temp2.im + re
	        );
	      }
	      else {
	        temp3 = new Complex(
	            temp2 - im,
	            re
	        );
	      }

	      var temp4 = math.log(temp3);

	      if (temp4 instanceof Complex) {
	        return new Complex(temp4.im, -temp4.re);
	      }
	      else {
	        return new Complex(0, -temp4);
	      }
	    }

	    if (isCollection(x)) {
	      return collection.deepMap(x, asin);
	    }

	    if (isBoolean(x)) {
	      return Math.asin(x);
	    }

	    if (x instanceof BigNumber) {
	      // TODO: implement BigNumber support
	      // downgrade to Number
	      return asin(util.number.toNumber(x));
	    }

	    throw new math.error.UnsupportedTypeError('asin', x);
	  };
	};


/***/ },
/* 86 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isComplex = Complex.isComplex,
	      isCollection = collection.isCollection;

	  /**
	   * Calculate the inverse tangent of a value
	   *
	   *     atan(x)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param {Number | Boolean | Complex | Array | Matrix} x
	   * @return {Number | Complex | Array | Matrix} res
	   *
	   * @see http://mathworld.wolfram.com/InverseTangent.html
	   */
	  math.atan = function atan(x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('atan', arguments.length, 1);
	    }

	    if (isNumber(x)) {
	      return Math.atan(x);
	    }

	    if (isComplex(x)) {
	      // atan(z) = 1/2 * i * (ln(1-iz) - ln(1+iz))
	      var re = x.re;
	      var im = x.im;
	      var den = re * re + (1.0 - im) * (1.0 - im);

	      var temp1 = new Complex(
	          (1.0 - im * im - re * re) / den,
	          (-2.0 * re) / den
	      );
	      var temp2 = math.log(temp1);

	      if (temp2 instanceof Complex) {
	        return new Complex(
	            -0.5 * temp2.im,
	            0.5 * temp2.re
	        );
	      }
	      else {
	        return new Complex(
	            0,
	            0.5 * temp2
	        );
	      }
	    }

	    if (isCollection(x)) {
	      return collection.deepMap(x, atan);
	    }

	    if (isBoolean(x)) {
	      return Math.atan(x);
	    }

	    if (x instanceof BigNumber) {
	      // TODO: implement BigNumber support
	      // downgrade to Number
	      return atan(util.number.toNumber(x));
	    }

	    throw new math.error.UnsupportedTypeError('atan', x);
	  };
	};


/***/ },
/* 87 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      collection = require(13),

	      toNumber = util.number.toNumber,
	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isComplex = Complex.isComplex,
	      isCollection = collection.isCollection;

	  /**
	   * Computes the principal value of the arc tangent of y/x in radians
	   *
	   *     atan2(y, x)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param {Number | Boolean | Complex | Array | Matrix} y
	   * @param {Number | Boolean | Complex | Array | Matrix} x
	   * @return {Number | Complex | Array | Matrix} res
	   *
	   * @see http://mathworld.wolfram.com/InverseTangent.html
	   */
	  math.atan2 = function atan2(y, x) {
	    if (arguments.length != 2) {
	      throw new math.error.ArgumentsError('atan2', arguments.length, 2);
	    }

	    if (isNumber(y)) {
	      if (isNumber(x)) {
	        return Math.atan2(y, x);
	      }
	      /* TODO: support for complex computation of atan2
	       else if (isComplex(x)) {
	       return Math.atan2(y.re, x.re);
	       }
	       */
	    }
	    else if (isComplex(y)) {
	      if (isNumber(x)) {
	        return Math.atan2(y.re, x);
	      }
	      /* TODO: support for complex computation of atan2
	       else if (isComplex(x)) {
	       return Math.atan2(y.re, x.re);
	       }
	       */
	    }

	    if (isCollection(y) || isCollection(x)) {
	      return collection.deepMap2(y, x, atan2);
	    }

	    if (isBoolean(y)) {
	      return atan2(+y, x);
	    }
	    if (isBoolean(x)) {
	      return atan2(y, +x);
	    }

	    // TODO: implement bignumber support
	    if (y instanceof BigNumber) {
	      return atan2(toNumber(y), x);
	    }
	    if (x instanceof BigNumber) {
	      return atan2(y, toNumber(x));
	    }

	    throw new math.error.UnsupportedTypeError('atan2', y, x);
	  };
	};


/***/ },
/* 88 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      Unit = require(11),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isComplex = Complex.isComplex,
	      isUnit = Unit.isUnit,
	      isCollection = collection.isCollection;

	  /**
	   * Calculate the cosine of a value
	   *
	   *     cos(x)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param {Number | Boolean | Complex | Unit | Array | Matrix} x
	   * @return {Number | Complex | Array | Matrix} res
	   *
	   * @see http://mathworld.wolfram.com/Cosine.html
	   */
	  math.cos = function cos(x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('cos', arguments.length, 1);
	    }

	    if (isNumber(x)) {
	      return Math.cos(x);
	    }

	    if (isComplex(x)) {
	      // cos(z) = (exp(iz) + exp(-iz)) / 2
	      return new Complex(
	          0.5 * Math.cos(x.re) * (Math.exp(-x.im) + Math.exp(x.im)),
	          0.5 * Math.sin(x.re) * (Math.exp(-x.im) - Math.exp(x.im))
	      );
	    }

	    if (isUnit(x)) {
	      if (!x.hasBase(Unit.BASE_UNITS.ANGLE)) {
	        throw new TypeError ('Unit in function cos is no angle');
	      }
	      return Math.cos(x.value);
	    }

	    if (isCollection(x)) {
	      return collection.deepMap(x, cos);
	    }

	    if (isBoolean(x)) {
	      return Math.cos(x);
	    }

	    if (x instanceof BigNumber) {
	      // TODO: implement BigNumber support
	      // downgrade to Number
	      return cos(util.number.toNumber(x));
	    }

	    throw new math.error.UnsupportedTypeError('cos', x);
	  };
	};


/***/ },
/* 89 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      Unit = require(11),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isComplex = Complex.isComplex,
	      isUnit = Unit.isUnit,
	      isCollection = collection.isCollection;

	  /**
	   * Calculate the cotangent of a value. cot(x) is defined as 1 / tan(x)
	   *
	   *     cot(x)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param {Number | Boolean | Complex | Unit | Array | Matrix} x
	   * @return {Number | Complex | Array | Matrix} res
	   */
	  math.cot = function cot(x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('cot', arguments.length, 1);
	    }

	    if (isNumber(x)) {
	      return 1 / Math.tan(x);
	    }

	    if (isComplex(x)) {
	      var den = Math.exp(-4.0 * x.im) -
	          2.0 * Math.exp(-2.0 * x.im) * Math.cos(2.0 * x.re) + 1.0;

	      return new Complex(
	          2.0 * Math.exp(-2.0 * x.im) * Math.sin(2.0 * x.re) / den,
	          (Math.exp(-4.0 * x.im) - 1.0) / den
	      );
	    }

	    if (isUnit(x)) {
	      if (!x.hasBase(Unit.BASE_UNITS.ANGLE)) {
	        throw new TypeError ('Unit in function cot is no angle');
	      }
	      return 1 / Math.tan(x.value);
	    }

	    if (isCollection(x)) {
	      return collection.deepMap(x, cot);
	    }

	    if (isBoolean(x)) {
	      return cot(+x);
	    }

	    if (x instanceof BigNumber) {
	      // TODO: implement BigNumber support
	      // downgrade to Number
	      return cot(util.number.toNumber(x));
	    }

	    throw new math.error.UnsupportedTypeError('cot', x);
	  };
	};


/***/ },
/* 90 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      Unit = require(11),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isComplex = Complex.isComplex,
	      isUnit = Unit.isUnit,
	      isCollection = collection.isCollection;

	  /**
	   * Calculate the cosecant of a value, csc(x) = 1/sin(x)
	   *
	   *     csc(x)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param {Number | Boolean | Complex | Unit | Array | Matrix} x
	   * @return {Number | Complex | Array | Matrix} res
	   */
	  math.csc = function csc(x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('csc', arguments.length, 1);
	    }

	    if (isNumber(x)) {
	      return 1 / Math.sin(x);
	    }

	    if (isComplex(x)) {
	      // csc(z) = 1/sin(z) = (2i) / (exp(iz) - exp(-iz))
	      var den = 0.25 * (Math.exp(-2.0 * x.im) + Math.exp(2.0 * x.im)) -
	          0.5 * Math.cos(2.0 * x.re);

	      return new Complex (
	          0.5 * Math.sin(x.re) * (Math.exp(-x.im) + Math.exp(x.im)) / den,
	          0.5 * Math.cos(x.re) * (Math.exp(-x.im) - Math.exp(x.im)) / den
	      );
	    }

	    if (isUnit(x)) {
	      if (!x.hasBase(Unit.BASE_UNITS.ANGLE)) {
	        throw new TypeError ('Unit in function csc is no angle');
	      }
	      return 1 / Math.sin(x.value);
	    }

	    if (isCollection(x)) {
	      return collection.deepMap(x, csc);
	    }

	    if (isBoolean(x)) {
	      return csc(+x);
	    }

	    if (x instanceof BigNumber) {
	      // TODO: implement BigNumber support
	      // downgrade to Number
	      return csc(util.number.toNumber(x));
	    }

	    throw new math.error.UnsupportedTypeError('csc', x);
	  };
	};


/***/ },
/* 91 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      Unit = require(11),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isComplex = Complex.isComplex,
	      isUnit = Unit.isUnit,
	      isCollection = collection.isCollection;

	  /**
	   * Calculate the secant of a value, sec(x) = 1/cos(x)
	   *
	   *     sec(x)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param {Number | Boolean | Complex | Unit | Array | Matrix} x
	   * @return {Number | Complex | Array | Matrix} res
	   */
	  math.sec = function sec(x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('sec', arguments.length, 1);
	    }

	    if (isNumber(x)) {
	      return 1 / Math.cos(x);
	    }

	    if (isComplex(x)) {
	      // sec(z) = 1/cos(z) = 2 / (exp(iz) + exp(-iz))
	      var den = 0.25 * (Math.exp(-2.0 * x.im) + Math.exp(2.0 * x.im)) +
	          0.5 * Math.cos(2.0 * x.re);
	      return new Complex(
	          0.5 * Math.cos(x.re) * (Math.exp(-x.im) + Math.exp( x.im)) / den,
	          0.5 * Math.sin(x.re) * (Math.exp( x.im) - Math.exp(-x.im)) / den
	      );
	    }

	    if (isUnit(x)) {
	      if (!x.hasBase(Unit.BASE_UNITS.ANGLE)) {
	        throw new TypeError ('Unit in function sec is no angle');
	      }
	      return 1 / Math.cos(x.value);
	    }

	    if (isCollection(x)) {
	      return collection.deepMap(x, sec);
	    }

	    if (isBoolean(x)) {
	      return sec(+x);
	    }

	    if (x instanceof BigNumber) {
	      // TODO: implement BigNumber support
	      // downgrade to Number
	      return sec(util.number.toNumber(x));
	    }

	    throw new math.error.UnsupportedTypeError('sec', x);
	  };
	};


/***/ },
/* 92 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      Unit = require(11),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isComplex = Complex.isComplex,
	      isUnit = Unit.isUnit,
	      isCollection = collection.isCollection;

	  /**
	   * Calculate the sine of a value
	   *
	   *     sin(x)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param {Number | Boolean | Complex | Unit | Array | Matrix} x
	   * @return {Number | Complex | Array | Matrix} res
	   *
	   * @see http://mathworld.wolfram.com/Sine.html
	   */
	  math.sin = function sin(x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('sin', arguments.length, 1);
	    }

	    if (isNumber(x)) {
	      return Math.sin(x);
	    }

	    if (isComplex(x)) {
	      return new Complex(
	          0.5 * Math.sin(x.re) * (Math.exp(-x.im) + Math.exp( x.im)),
	          0.5 * Math.cos(x.re) * (Math.exp( x.im) - Math.exp(-x.im))
	      );
	    }

	    if (isUnit(x)) {
	      if (!x.hasBase(Unit.BASE_UNITS.ANGLE)) {
	        throw new TypeError ('Unit in function sin is no angle');
	      }
	      return Math.sin(x.value);
	    }

	    if (isCollection(x)) {
	      return collection.deepMap(x, sin);
	    }

	    if (isBoolean(x)) {
	      return Math.sin(x);
	    }

	    if (x instanceof BigNumber) {
	      // TODO: implement BigNumber support
	      // downgrade to Number
	      return sin(util.number.toNumber(x));
	    }

	    throw new math.error.UnsupportedTypeError('sin', x);
	  };
	};


/***/ },
/* 93 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      BigNumber = require(220),
	      Complex = require(7),
	      Unit = require(11),
	      collection = require(13),

	      isNumber = util.number.isNumber,
	      isBoolean = util['boolean'].isBoolean,
	      isComplex = Complex.isComplex,
	      isUnit = Unit.isUnit,
	      isCollection = collection.isCollection;

	  /**
	   * Calculate the tangent of a value
	   *
	   *     tan(x)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param {Number | Boolean | Complex | Unit | Array | Matrix} x
	   * @return {Number | Complex | Array | Matrix} res
	   *
	   * @see http://mathworld.wolfram.com/Tangent.html
	   */
	  math.tan = function tan(x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('tan', arguments.length, 1);
	    }

	    if (isNumber(x)) {
	      return Math.tan(x);
	    }

	    if (isComplex(x)) {
	      var den = Math.exp(-4.0 * x.im) +
	          2.0 * Math.exp(-2.0 * x.im) * Math.cos(2.0 * x.re) +
	          1.0;

	      return new Complex(
	          2.0 * Math.exp(-2.0 * x.im) * Math.sin(2.0 * x.re) / den,
	          (1.0 - Math.exp(-4.0 * x.im)) / den
	      );
	    }

	    if (isUnit(x)) {
	      if (!x.hasBase(Unit.BASE_UNITS.ANGLE)) {
	        throw new TypeError ('Unit in function tan is no angle');
	      }
	      return Math.tan(x.value);
	    }

	    if (isCollection(x)) {
	      return collection.deepMap(x, tan);
	    }

	    if (isBoolean(x)) {
	      return Math.tan(x);
	    }

	    if (x instanceof BigNumber) {
	      // TODO: implement BigNumber support
	      // downgrade to Number
	      return tan(util.number.toNumber(x));
	    }

	    throw new math.error.UnsupportedTypeError('tan', x);
	  };
	};


/***/ },
/* 94 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      Unit = require(11),
	      collection = require(13),

	      isString = util.string.isString,
	      isUnit = Unit.isUnit,
	      isCollection = collection.isCollection;

	  /**
	   * Change the unit of a value.
	   *
	   *     x to unit
	   *     to(x, unit)
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * @param {Unit | Array | Matrix} x
	   * @param {Unit | Array | Matrix} unit
	   * @return {Unit | Array | Matrix} res
	   */
	  math.to = function to(x, unit) {
	    if (arguments.length != 2) {
	      throw new math.error.ArgumentsError('to', arguments.length, 2);
	    }

	    if (isUnit(x)) {
	      if (isUnit(unit) || isString(unit)) {
	        return x.to(unit);
	      }
	    }

	    // TODO: add support for string, in that case, convert to unit

	    if (isCollection(x) || isCollection(unit)) {
	      return collection.deepMap2(x, unit, to);
	    }

	    throw new math.error.UnsupportedTypeError('to', x, unit);
	  };
	};


/***/ },
/* 95 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var object = require(2);

	  /**
	   * Clone an object
	   *
	   *     clone(x)
	   *
	   * @param {*} x
	   * @return {*} clone
	   */
	  math.clone = function clone (x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('clone', arguments.length, 1);
	    }

	    return object.clone(x);
	  };
	};


/***/ },
/* 96 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var string = require(218);

	  /**
	   * Format a value of any type into a string.
	   *
	   * Syntax:
	   *
	   *    format(value)
	   *    format(value, options)
	   *    format(value, precision)
	   *    format(value, fn)
	   *
	   * Where:
	   *
	   *    {*} value        The value to be formatted
	   *    {Object} options An object with formatting options. Available options:
	   *                     {String} notation
	   *                         Number notation. Choose from:
	   *                         'fixed'          Always use regular number notation.
	   *                                          For example '123.40' and '14000000'
	   *                         'exponential'    Always use exponential notation.
	   *                                          For example '1.234e+2' and '1.4e+7'
	   *                         'auto' (default) Regular number notation for numbers
	   *                                          having an absolute value between
	   *                                          `lower` and `upper` bounds, and uses
	   *                                          exponential notation elsewhere.
	   *                                          Lower bound is included, upper bound
	   *                                          is excluded.
	   *                                          For example '123.4' and '1.4e7'.
	   *                     {Number} precision   A number between 0 and 16 to round
	   *                                          the digits of the number.
	   *                                          In case of notations 'exponential' and
	   *                                          'auto', `precision` defines the total
	   *                                          number of significant digits returned
	   *                                          and is undefined by default.
	   *                                          In case of notation 'fixed',
	   *                                          `precision` defines the number of
	   *                                          significant digits after the decimal
	   *                                          point, and is 0 by default.
	   *                     {Object} exponential An object containing two parameters,
	   *                                          {Number} lower and {Number} upper,
	   *                                          used by notation 'auto' to determine
	   *                                          when to return exponential notation.
	   *                                          Default values are `lower=1e-3` and
	   *                                          `upper=1e5`.
	   *                                          Only applicable for notation `auto`.
	   *    {Function} fn    A custom formatting function. Can be used to override the
	   *                     built-in notations. Function `fn` is called with `value` as
	   *                     parameter and must return a string. Is useful for example to
	   *                     format all values inside a matrix in a particular way.
	   *
	   * Examples:
	   *
	   *    format(6.4);                                        // '6.4'
	   *    format(1240000);                                    // '1.24e6'
	   *    format(1/3);                                        // '0.3333333333333333'
	   *    format(1/3, 3);                                     // '0.333'
	   *    format(21385, 2);                                   // '21000'
	   *    format(12.071, {notation: 'fixed'});                // '12'
	   *    format(2.3,    {notation: 'fixed', precision: 2});  // '2.30'
	   *    format(52.8,   {notation: 'exponential'});          // '5.28e+1'
	   *
	   * @param {*} value             Value to be stringified
	   * @param {Object | Function | Number} [options]
	   * @return {String} str The formatted value
	   */
	  math.format = function format (value, options) {
	    var num = arguments.length;
	    if (num !== 1 && num !== 2) {
	      throw new math.error.ArgumentsError('format', num, 1, 2);
	    }

	    return string.format(value, options);
	  };
	};


/***/ },
/* 97 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var util = require(117),

	      Complex = require(7),
	      Unit = require(11),

	      isNumber = util.number.isNumber,
	      isString = util.string.isString,
	      isComplex = Complex.isComplex,
	      isUnit = Unit.isUnit;

	  /**
	   * Import functions from an object or a file
	   * @param {function | String | Object} object
	   * @param {Object} [options]        Available options:
	   *                                  {Boolean} override
	   *                                      If true, existing functions will be
	   *                                      overwritten. False by default.
	   *                                  {Boolean} wrap
	   *                                      If true (default), the functions will
	   *                                      be wrapped in a wrapper function which
	   *                                      converts data types like Matrix to
	   *                                      primitive data types like Array.
	   *                                      The wrapper is needed when extending
	   *                                      math.js with libraries which do not
	   *                                      support the math.js data types.
	   */
	// TODO: return status information
	  math['import'] = function math_import(object, options) {
	    var name;
	    var opts = {
	      override: false,
	      wrap: true
	    };
	    if (options && options instanceof Object) {
	      util.object.extend(opts, options);
	    }

	    if (isString(object)) {
	      // a string with a filename
	      if (true) {
	        // load the file using require
	        var _module = require(219)(object);
	        math_import(_module);
	      }
	      else {
	        throw new Error('Cannot load file: require not available.');
	      }
	    }
	    else if (isSupportedType(object)) {
	      // a single function
	      name = object.name;
	      if (name) {
	        if (opts.override || math[name] === undefined) {
	          _import(name, object, opts);
	        }
	      }
	      else {
	        throw new Error('Cannot import an unnamed function or object');
	      }
	    }
	    else if (object instanceof Object) {
	      // a map with functions
	      for (name in object) {
	        if (object.hasOwnProperty(name)) {
	          var value = object[name];
	          if (isSupportedType(value)) {
	            _import(name, value, opts);
	          }
	          else {
	            math_import(value);
	          }
	        }
	      }
	    }
	  };

	  /**
	   * Add a property to the math namespace and create a chain proxy for it.
	   * @param {String} name
	   * @param {*} value
	   * @param {Object} options  See import for a description of the options
	   * @private
	   */
	  function _import(name, value, options) {
	    if (options.override || math[name] === undefined) {
	      // add to math namespace
	      if (options.wrap && typeof value === 'function') {
	        // create a wrapper around the function
	        math[name] = function () {
	          var args = [];
	          for (var i = 0, len = arguments.length; i < len; i++) {
	            args[i] = arguments[i].valueOf();
	          }
	          return value.apply(math, args);
	        };
	      }
	      else {
	        // just create a link to the function or value
	        math[name] = value;
	      }

	      // create a proxy for the Selector
	      math.chaining.Selector.createProxy(name, value);
	    }
	  }

	  /**
	   * Check whether given object is a supported type
	   * @param object
	   * @return {Boolean}
	   * @private
	   */
	  function isSupportedType(object) {
	    return (typeof object == 'function') ||
	        isNumber(object) || isString(object) ||
	        isComplex(object) || isUnit(object);
	    // TODO: add boolean?
	  }
	};


/***/ },
/* 98 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var isMatrix = require(10).isMatrix;

	  /**
	   * Create a new matrix or array with the results of the callback function executed on
	   * each entry of the matrix/array.
	   * @param {Matrix/array} x      The container to iterate on.
	   * @param {function} callback   The callback method is invoked with three
	   *                              parameters: the value of the element, the index
	   *                              of the element, and the Matrix being traversed.
	   * @return {Matrix/array} container
	   */
	  math.map = function (x, callback) {
	    if (arguments.length != 2) {
	      throw new math.error.ArgumentsError('map', arguments.length, 2);
	    }

	    if (Array.isArray(x)) {
	      return _mapArray(x, callback);
	    } else if (isMatrix(x)) {
	      return x.map(callback);
	    } else {
	      throw new math.error.UnsupportedTypeError('map', x);
	    }
	  };

	  function _mapArray (arrayIn, callback) {
	    var index = [];
	    var recurse = function (value, dim) {
	      if (Array.isArray(value)) {
	        return value.map(function (child, i) {
	          index[dim] = i;
	          return recurse(child, dim + 1);
	        });
	      }
	      else {
	        return callback(value, index, arrayIn);
	      }
	    };

	    return recurse(arrayIn, 0);
	  };
	};


/***/ },
/* 99 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var string = require(218),

	      isString = string.isString;

	  /**
	   * Interpolate values into a string template.
	   *     math.print(template, values)
	   *     math.print(template, values, precision)
	   *
	   * Example usage:
	   *
	   *     // the following outputs: 'The value of pi is 3.141592654'
	   *     math.format('The value of pi is $pi', {pi: math.pi}, 10);
	   *
	   *     // the following outputs: 'hello Mary! The date is 2013-03-23'
	   *     math.format('Hello $user.name! The date is $date', {
	   *       user: {
	   *         name: 'Mary',
	   *       },
	   *       date: new Date().toISOString().substring(0, 10)
	   *     });
	   *
	   * @param {String} template
	   * @param {Object} values
	   * @param {Number} [precision]  Number of digits to format numbers.
	   *                              If not provided, the value will not be rounded.
	   * @return {String} str
	   */
	  math.print = function print (template, values, precision) {
	    var num = arguments.length;
	    if (num != 2 && num != 3) {
	      throw new math.error.ArgumentsError('print', num, 2, 3);
	    }

	    if (!isString(template)) {
	      throw new TypeError('String expected as first parameter in function format');
	    }
	    if (!(values instanceof Object)) {
	      throw new TypeError('Object expected as second parameter in function format');
	    }

	    // format values into a string
	    return template.replace(/\$([\w\.]+)/g, function (original, key) {
	          var keys = key.split('.');
	          var value = values[keys.shift()];
	          while (keys.length && value !== undefined) {
	            var k = keys.shift();
	            value = k ? value[k] : value + '.';
	          }

	          if (value !== undefined) {
	            if (!isString(value)) {
	              return math.format(value, precision);
	            }
	            else {
	              return value;
	            }
	          }

	          return original;
	        }
	    );
	  };
	};


/***/ },
/* 100 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var types = require(217),

	      BigNumber = require(220),
	      Complex = require(7),
	      Matrix = require(10),
	      Unit = require(11),
	      Index = require(9),
	      Range = require(8),
	      Help = require(12);

	  /**
	   * Determine the type of a variable
	   *
	   *     typeof(x)
	   *
	   * @param {*} x
	   * @return {String} type  Lower case type, for example 'number', 'string',
	   *                        'array'.
	   */
	  math['typeof'] = function _typeof (x) {
	    if (arguments.length != 1) {
	      throw new math.error.ArgumentsError('typeof', arguments.length, 1);
	    }

	    // JavaScript types
	    var type = types.type(x);

	    // math.js types
	    if (type === 'object') {
	      if (x instanceof Complex) return 'complex';
	      if (x instanceof BigNumber) return 'bignumber';
	      if (x instanceof Matrix) return 'matrix';
	      if (x instanceof Unit) return 'unit';
	      if (x instanceof Index) return 'index';
	      if (x instanceof Range) return 'range';
	      if (x instanceof Help) return 'matrix';

	      if (x instanceof math.chaining.Selector) return 'selector';
	    }

	    return type;
	  };
	};


/***/ },
/* 101 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var isMatrix = require(10).isMatrix;

	  /**
	   * Execute a callback method on each entry of the matrix or the array.
	   * @param {Matrix/array} x      The container to iterate on.
	   * @param {function} callback   The callback method is invoked with three
	   *                              parameters: the value of the element, the index
	   *                              of the element, and the Matrix/array being traversed.
	   */
	  math.forEach = function (x, callback) {
	    if (arguments.length != 2) {
	      throw new math.error.ArgumentsError('forEach', arguments.length, 2);
	    }

	    if (Array.isArray(x)) {
	      return _forEachArray(x, callback);
	    } else if (isMatrix(x)) {
	      return x.forEach(callback);
	    } else {
	      throw new math.error.UnsupportedTypeError('forEach', x);
	    }
	  };

	  function _forEachArray (array, callback) {
	    var index = [];
	    var recurse = function (value, dim) {
	      if (Array.isArray(value)) {
	        value.forEach(function (child, i) {
	          index[dim] = i; // zero-based index
	          recurse(child, dim + 1);
	        });
	      }
	      else {
	        callback(value, index, array);
	      }
	    };
	    recurse(array, 0);
	  };

	};

/***/ },
/* 102 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var Complex = require(7);

	  math.pi          = Math.PI;
	  math.e           = Math.E;
	  math.tau         = Math.PI * 2;
	  math.i           = new Complex(0, 1);

	  math['Infinity'] = Infinity;
	  math['NaN']      = NaN;
	  math['true']     = true;
	  math['false']    = false;

	  // uppercase constants (for compatibility with built-in Math)
	  math.E           = Math.E;
	  math.LN2         = Math.LN2;
	  math.LN10        = Math.LN10;
	  math.LOG2E       = Math.LOG2E;
	  math.LOG10E      = Math.LOG10E;
	  math.PI          = Math.PI;
	  math.SQRT1_2     = Math.SQRT1_2;
	  math.SQRT2       = Math.SQRT2;
	};


/***/ },
/* 103 */
/***/ function(module, exports, require) {

	module.exports = function (math) {
	  var string = require(218);

	  /**
	   * @constructor Selector
	   * Wrap any value in a Selector, allowing to perform chained operations on
	   * the value.
	   *
	   * All methods available in the math.js library can be called upon the selector,
	   * and then will be evaluated with the value itself as first argument.
	   * The selector can be closed by executing selector.done(), which will return
	   * the final value.
	   *
	   * The Selector has a number of special functions:
	   * - done()             Finalize the chained operation and return the
	   *                      selectors value.
	   * - valueOf()          The same as done()
	   * - toString()         Returns a string representation of the selectors value.
	   *
	   * @param {*} [value]
	   */
	  function Selector (value) {
	    if (!(this instanceof Selector)) {
	      throw new SyntaxError(
	          'Selector constructor must be called with the new operator');
	    }

	    if (value instanceof Selector) {
	      this.value = value.value;
	    }
	    else {
	      this.value = value;
	    }
	  }

	  /**
	   * Close the selector. Returns the final value.
	   * Does the same as method valueOf()
	   * @returns {*} value
	   */
	  Selector.prototype.done = function () {
	    return this.value;
	  };

	  /**
	   * Close the selector. Returns the final value.
	   * Does the same as method done()
	   * @returns {*} value
	   */
	  Selector.prototype.valueOf = function () {
	    return this.value;
	  };

	  /**
	   * Get a string representation of the value in the selector
	   * @returns {String}
	   */
	  Selector.prototype.toString = function () {
	    return string.format(this.value);
	  };

	  /**
	   * Create a proxy method for the selector
	   * @param {String} name
	   * @param {*} value       The value or function to be proxied
	   */
	  function createProxy(name, value) {
	    var slice = Array.prototype.slice;
	    if (typeof value === 'function') {
	      // a function
	      Selector.prototype[name] = function () {
	        var args = [this.value].concat(slice.call(arguments, 0));
	        return new Selector(value.apply(this, args));
	      }
	    }
	    else {
	      // a constant
	      Selector.prototype[name] = new Selector(value);
	    }
	  }

	  Selector.createProxy = createProxy;

	  /**
	   * initialise the Chain prototype with all functions and constants in math
	   */
	  for (var prop in math) {
	    if (math.hasOwnProperty(prop) && prop) {
	      createProxy(prop, math[prop]);
	    }
	  }

	  return Selector;
	};


/***/ },
/* 104 */
/***/ function(module, exports, require) {

	var Node = require(110),
	    object = require(2),
	    string = require(218),
	    collection = require(13),
	    Matrix = require(10);

	/**
	 * @constructor ArrayNode
	 * @extends {Node}
	 * Holds an 1-dimensional array with nodes
	 * @param {Array} nodes    1 dimensional array with nodes
	 */
	function ArrayNode(nodes) {
	  this.nodes = nodes || [];
	}

	ArrayNode.prototype = new Node();

	/**
	 * Compile the node to javascript code
	 * @param {Object} defs     Object which can be used to define functions
	 *                          or constants globally available for the compiled
	 *                          expression
	 * @private
	 */
	ArrayNode.prototype._compile = function (defs) {
	  var asMatrix = (defs.math.config().matrix !== 'array');

	  var nodes = this.nodes.map(function (node) {
	    return node._compile(defs);
	  });

	  return (asMatrix ? 'math.matrix([' : '[') +
	      nodes.join(',') +
	      (asMatrix ? '])' : ']');
	};

	/**
	 * Find all nodes matching given filter
	 * @param {Object} filter  See Node.find for a description of the filter settings
	 * @returns {Node[]} nodes
	 */
	ArrayNode.prototype.find = function (filter) {
	  var results = [];

	  // check itself
	  if (this.match(filter)) {
	    results.push(this);
	  }

	  // search in all nodes
	  var nodes = this.nodes;
	  for (var r = 0, rows = nodes.length; r < rows; r++) {
	    var nodes_r = nodes[r];
	    for (var c = 0, cols = nodes_r.length; c < cols; c++) {
	      results = results.concat(nodes_r[c].find(filter));
	    }
	  }

	  return results;
	};

	/**
	 * Get string representation
	 * @return {String} str
	 * @override
	 */
	ArrayNode.prototype.toString = function() {
	  return string.format(this.nodes);
	};

	module.exports = ArrayNode;


/***/ },
/* 105 */
/***/ function(module, exports, require) {

	var Node = require(110);

	/**
	 * @constructor AssignmentNode
	 * @extends {Node}
	 * Define a symbol, like "a = 3.2"
	 *
	 * @param {String} name       Symbol name
	 * @param {Node} expr         The expression defining the symbol
	 */
	function AssignmentNode(name, expr) {
	  this.name = name;
	  this.expr = expr;
	}

	AssignmentNode.prototype = new Node();

	/**
	 * Compile the node to javascript code
	 * @param {Object} defs     Object which can be used to define functions
	 *                          or constants globally available for the compiled
	 *                          expression
	 * @private
	 */
	AssignmentNode.prototype._compile = function (defs) {
	  return 'scope["' + this.name + '"] = ' + this.expr._compile(defs) + '';
	};

	/**
	 * Find all nodes matching given filter
	 * @param {Object} filter  See Node.find for a description of the filter settings
	 * @returns {Node[]} nodes
	 */
	AssignmentNode.prototype.find = function (filter) {
	  var nodes = [];

	  // check itself
	  if (this.match(filter)) {
	    nodes.push(this);
	  }

	  // search in expression
	  if (this.expr) {
	    nodes = nodes.concat(this.expr.find(filter));
	  }

	  return nodes;
	};

	/**
	 * Get string representation
	 * @return {String}
	 */
	AssignmentNode.prototype.toString = function() {
	  return this.name + ' = ' + this.expr.toString();
	};

	module.exports = AssignmentNode;

/***/ },
/* 106 */
/***/ function(module, exports, require) {

	var Node = require(110);

	/**
	 * @constructor BlockNode
	 * @extends {Node}
	 * Holds a set with nodes
	 */
	function BlockNode() {
	  this.params = [];
	}

	BlockNode.prototype = new Node();

	/**
	 * Add a parameter
	 * @param {Node} node
	 * @param {Boolean} [visible]   true by default
	 */
	BlockNode.prototype.add = function (node, visible) {
	  var index = this.params.length;
	  this.params[index] = {
	    node: node,
	    visible: (visible != undefined) ? visible : true
	  };
	};

	/**
	 * Compile the node to javascript code
	 * @param {Object} defs     Object which can be used to define functions
	 *                          or constants globally available for the compiled
	 *                          expression
	 * @return {String} js
	 * @private
	 */
	BlockNode.prototype._compile = function (defs) {
	  var params = this.params.map(function (param) {
	    var js = param.node._compile(defs);
	    if (param.visible) {
	      return 'results.push(' + js + ');';
	    }
	    else {
	      return js + ';';
	    }
	  });

	  return '(function () {' +
	      'var results = [];' +
	      params.join('') +
	      'return results;' +
	      '})()';
	};

	/**
	 * Find all nodes matching given filter
	 * @param {Object} filter  See Node.find for a description of the filter settings
	 * @returns {Node[]} nodes
	 */
	BlockNode.prototype.find = function (filter) {
	  var nodes = [];

	  // check itself
	  if (this.match(filter)) {
	    nodes.push(this);
	  }

	  // search in parameters
	  var params = this.params;
	  if (params) {
	    for (var i = 0, len = params.length; i < len; i++) {
	      nodes = nodes.concat(params[i].node.find(filter));
	    }
	  }

	  return nodes;
	};

	/**
	 * Get string representation
	 * @return {String} str
	 * @override
	 */
	BlockNode.prototype.toString = function() {
	  return this.params.map(function (param) {
	    return param.node.toString() + (param.visible ? '' : ';');
	  }).join('\n');
	};

	module.exports = BlockNode;


/***/ },
/* 107 */
/***/ function(module, exports, require) {

	var Node = require(110),
	    Complex = require(7),
	    BigNumber = require(220),
	    string = require(218),
	    isString = string.isString;

	/**
	 * @constructor ConstantNode
	 * @extends {Node}
	 * @param {String} type   Choose from 'number', 'string', 'complex', 'boolean',
	 *                        'undefined', 'null'
	 * @param {String} value  Value is an uninterpreted string containing the value
	 */
	function ConstantNode(type, value) {
	  if (!isString(type)) {
	    throw new TypeError('Constant type must be a string')
	  }

	  if (!isString(value)) {
	    throw new TypeError('Constant value must be a string')
	  }

	  this.type = type;
	  this.value = value;
	}

	ConstantNode.prototype = new Node();

	/**
	 * Compile the node to javascript code
	 * @param {Object} defs     Object which can be used to define functions
	 *                          or constants globally available for the compiled
	 *                          expression
	 * @return {String} js
	 * @private
	 */
	ConstantNode.prototype._compile = function (defs) {
	  switch (this.type) {
	    case 'number':
	      if (defs.math.config().number === 'bignumber') {
	        return 'math.bignumber("' + this.value + '")';
	      }
	      else {
	        // remove leading zeros like '003.2'
	        return this.value.replace(/^(0*)[0-9]/, function (match, zeros) {
	          return match.substring(zeros.length);
	        });
	      }

	    case 'string':
	      return '"' + this.value + '"';

	    case 'complex':
	      return 'math.complex(0, ' + this.value + ')';

	    case 'boolean':
	      return this.value;

	    case 'undefined':
	      return this.value;

	    case 'null':
	      return this.value;

	    default:
	      throw new TypeError('Unsupported type of constant "' + this.type + '"');
	  }
	};

	/**
	 * Get string representation
	 * @return {String} str
	 */
	ConstantNode.prototype.toString = function() {
	  switch (this.type) {
	    case 'string':
	      return '"' + this.value + '"';

	    case 'complex':
	      return this.value + 'i';

	    default:
	      return this.value;
	  }
	};

	module.exports = ConstantNode;


/***/ },
/* 108 */
/***/ function(module, exports, require) {

	var number= require(221),

	    Node = require(110),
	    RangeNode = require(113),
	    SymbolNode = require(114),

	    BigNumber = require(220),
	    Index = require(9),
	    Range = require(8),

	    isNumber = number.isNumber,
	    toNumber = number.toNumber;

	/**
	 * @constructor IndexNode
	 * get a subset of a matrix
	 * @param {Node} object
	 * @param {Node[]} ranges
	 */
	function IndexNode (object, ranges) {
	  this.object = object;
	  this.ranges = ranges;
	}

	IndexNode.prototype = new Node();

	/**
	 * Compile the node to javascript code
	 * @param {Object} defs     Object which can be used to define functions
	 *                          or constants globally available for the compiled
	 *                          expression
	 * @return {String} js
	 * @private
	 */
	IndexNode.prototype._compile = function (defs) {
	  return this.compileSubset(defs);
	};

	/**
	 * Compile the node to javascript code
	 * @param {Object} defs           Object which can be used to define functions
	 *                                or constants globally available for the
	 *                                compiled expression
	 * @param {String} [replacement]  If provided, the function returns
	 *                                  "math.subset(obj, math.index(...), replacement)"
	 *                                Else, the function returns
	 *                                  "math.subset(obj, math.index(...))"
	 * @return {String} js
	 * @returns {string}
	 */
	IndexNode.prototype.compileSubset = function compileIndex (defs, replacement) {
	  // check whether any of the ranges expressions uses the context symbol 'end'
	  var filter = {
	    type: SymbolNode,
	    properties: {
	      name: 'end'
	    }
	  };
	  var rangesUseEnd = this.ranges.map(function (range) {
	    return range.find(filter).length > 0;
	  });

	  // TODO: implement support for bignumber (currently bignumbers are silently
	  //       reduced to numbers when changing the value to zero-based)

	  // TODO: Optimization: when the range values are ConstantNodes,
	  //       we can beforehand resolve the zero-based value

	  var ranges = this.ranges.map(function(range, i) {
	    var useEnd = rangesUseEnd[i];
	    if (range instanceof RangeNode) {
	      if (useEnd) {
	        // resolve end and create range (change from one based to zero based)
	        return '(function (scope) {' +
	            '  scope = Object.create(scope); ' +
	            '  scope["end"] = size[' + i + '];' +
	            '  var step = ' + (range.step ? range.step._compile(defs) : '1') + ';' +
	            '  return [' +
	            '    ' + range.start._compile(defs) + ' - 1, ' +
	            '    ' + range.end._compile(defs) + ' - (step > 0 ? 0 : 2), ' +
	            '    step' +
	            '  ];' +
	            '})(scope)';
	      }
	      else {
	        // create range (change from one based to zero based)
	        return '(function () {' +
	            '  var step = ' + (range.step ? range.step._compile(defs) : '1') + ';' +
	            '  return [' +
	            '    ' + range.start._compile(defs) + ' - 1, ' +
	            '    ' + range.end._compile(defs) + ' - (step > 0 ? 0 : 2), ' +
	            '    step' +
	            '  ];' +
	            '})()';
	      }
	    }
	    else {
	      if (useEnd) {
	        // resolve the parameter 'end', adjust the index value to zero-based
	        return '(function (scope) {' +
	            '  scope = Object.create(scope); ' +
	            '  scope["end"] = size[' + i + '];' +
	            '  return ' + range._compile(defs) + ' - 1;' +
	            '})(scope)'
	      }
	      else {
	        // just evaluate the expression, and change from one-based to zero-based
	        return range._compile(defs) + ' - 1';
	      }
	    }
	  });

	  // if some parameters use the 'end' parameter, we need to calculate the size
	  var someUseEnd = ranges.some(function (useEnd) {
	    return useEnd;
	  });
	  if (someUseEnd) {
	    return '(function () {' +
	        '  var obj = ' + this.object._compile(defs) + ';' +
	        '  var size = math.size(obj).valueOf();' +
	        '  return math.subset(' +
	        '    obj, ' +
	        '    math.index(' + ranges.join(', ') + ')' +
	        '    ' + (replacement ? (', ' + replacement) : '') +
	        '  );' +
	        '})()';
	  }
	  else {
	    return 'math.subset(' +
	        this.object._compile(defs) + ',' +
	        'math.index(' + ranges.join(', ') +
	        (replacement ? (', ' + replacement) : '') +
	        ')';
	  }
	};

	/**
	 * Find all nodes matching given filter
	 * @param {Object} filter  See Node.find for a description of the filter options
	 * @returns {Node[]} nodes
	 */
	IndexNode.prototype.find = function (filter) {
	  var nodes = [];

	  // check itself
	  if (this.match(filter)) {
	    nodes.push(this);
	  }

	  // search object
	  if (this.object) {
	    nodes = nodes.concat(this.object.find(filter));
	  }

	  // search in parameters
	  var ranges = this.ranges;
	  if (ranges) {
	    for (var i = 0, len = ranges.length; i < len; i++) {
	      nodes = nodes.concat(ranges[i].find(filter));
	    }
	  }

	  return nodes;
	};

	/**
	 * Get the name of the object linked to this IndexNode
	 * @return {string} name
	 */
	IndexNode.prototype.objectName = function objectName () {
	  return this.object.name;
	};

	/**
	 * Get string representation
	 * @return {String} str
	 */
	IndexNode.prototype.toString = function() {
	  // format the parameters like "[1, 0:5]"
	  var str = this.object ? this.object.toString() : '';
	  if (this.ranges) {
	    str += '[' + this.ranges.join(', ') + ']';
	  }
	  return str;
	};

	module.exports = IndexNode;

/***/ },
/* 109 */
/***/ function(module, exports, require) {

	var Node = require(110);

	/**
	 * @constructor FunctionNode
	 * @extends {Node}
	 * Function assignment
	 *
	 * @param {String} name           Function name
	 * @param {String[]} args         Function arguments
	 * @param {Node} expr             The function expression
	 */
	function FunctionNode(name, args, expr) {
	  this.name = name;
	  this.args = args;
	  this.expr = expr;
	}

	FunctionNode.prototype = new Node();

	/**
	 * Evaluate the function assignment
	 * @return {function} fn
	 */
	// TODO: cleanup
	FunctionNode.prototype._eval = function() {
	  // put the definition in the scope
	  this.scope.set(this.name, this.fn);

	  return this.fn;
	};

	/**
	 * Compile the node to javascript code
	 * @param {Object} defs     Object which can be used to define functions
	 *                          or constants globally available for the compiled
	 *                          expression
	 * @return {String} js
	 * @private
	 */
	FunctionNode.prototype._compile = function (defs) {

	  // TODO: validate whether name and all arguments are strings

	  return 'scope["' + this.name + '"] = ' +
	      '  (function (scope) {' +
	      '    scope = Object.create(scope); ' +
	      '    var fn = function ' + this.name + '(' + this.args.join(',') + ') {' +
	      '      if (arguments.length != ' + this.args.length + ') {' +
	      '        throw new SyntaxError("Wrong number of arguments in function ' + this.name + ' (" + arguments.length + " provided, ' + this.args.length + ' expected)");' +
	      '      }' +
	      this.args.map(function (variable, index) {
	        return 'scope["' + variable + '"] = arguments[' + index + '];';
	      }).join('') +
	      '      return ' + this.expr._compile(defs) + '' +
	      '    };' +
	      '    fn.syntax = "' + this.name + '(' + this.args.join(', ') + ')";' +
	      '    return fn;' +
	      '  })(scope);';
	};

	/**
	 * Find all nodes matching given filter
	 * @param {Object} filter  See Node.find for a description of the filter settings
	 * @returns {Node[]} nodes
	 */
	FunctionNode.prototype.find = function (filter) {
	  var nodes = [];

	  // check itself
	  if (this.match(filter)) {
	    nodes.push(this);
	  }

	  // search in expression
	  if (this.expr) {
	    nodes = nodes.concat(this.expr.find(filter));
	  }

	  return nodes;
	};

	/**
	 * get string representation
	 * @return {String} str
	 */
	FunctionNode.prototype.toString = function() {
	  return 'function ' + this.name +
	      '(' + this.args.join(', ') + ') = ' +
	      this.expr.toString();
	};

	module.exports = FunctionNode;


/***/ },
/* 110 */
/***/ function(module, exports, require) {

	/**
	 * Node
	 */
	function Node() {}

	/**
	 * Evaluate the node
	 * @return {*} result
	 */
	// TODO: cleanup deprecated code one day. Deprecated since version 0.19.0
	Node.prototype.eval = function () {
	  throw new Error('Node.eval is deprecated. ' +
	      'Use Node.compile(math).eval([scope]) instead.');
	};

	/**
	 * Compile the node to javascript code
	 * @param {Object} math             math.js instance
	 * @return {{eval: function}} expr  Returns an object with a function 'eval',
	 *                                  which can be invoked as expr.eval([scope]),
	 *                                  where scope is an optional object with
	 *                                  variables.
	 */
	Node.prototype.compile = function (math) {
	  if (typeof math !== 'object') {
	    throw new TypeError('Object expected as parameter math');
	  }

	  // definitions globally available inside the closure of the compiled expressions
	  var defs = {
	    math: math
	  };

	  var code = this._compile(defs);

	  var defsCode = Object.keys(defs).map(function (name) {
	    return '    var ' + name + ' = defs["' + name + '"];';
	  });

	  var factoryCode =
	      defsCode.join(' ') +
	      'return {' +
	      '  "eval": function (scope) {' +
	      '    scope = scope || {};' +
	      '    return ' + code + ';' +
	      '  }' +
	      '};';

	  var factory = new Function ('defs', factoryCode);
	  return factory(defs);
	};

	/**
	 * Compile the node to javascript code
	 * @param {Object} defs     Object which can be used to define functions
	 *                          and constants globally available inside the closure
	 *                          of the compiled expression
	 * @return {String} js
	 * @private
	 */
	Node.prototype._compile = function (defs) {
	  throw new Error('Cannot compile a Node interface');
	};

	/**
	 * Find any node in the node tree matching given filter. For example, to
	 * find all nodes of type SymbolNode having name 'x':
	 *
	 *     var results = Node.find({
	 *         type: SymbolNode,
	 *         properties: {
	 *             name: 'x'
	 *         }
	 *     });
	 *
	 * @param {Object} filter       Available parameters:
	 *                                  {Function} type
	 *                                  {Object<String, String>} properties
	 * @return {Node[]} nodes       An array with nodes matching given filter criteria
	 */
	Node.prototype.find = function (filter) {
	  return this.match(filter) ? [this] : [];
	};

	/**
	 * Test if this object matches given filter
	 * @param {Object} filter       Available parameters:
	 *                              {Function} type
	 *                              {Object<String, String>} properties
	 * @return {Boolean} matches    True if there is a match
	 */
	Node.prototype.match = function (filter) {
	  var match = true;

	  if (filter) {
	    if (filter.type && !(this instanceof filter.type)) {
	      match = false;
	    }
	    if (match && filter.properties) {
	      for (var prop in filter.properties) {
	        if (filter.properties.hasOwnProperty(prop)) {
	          if (this[prop] != filter.properties[prop]) {
	            match = false;
	            break;
	          }
	        }
	      }
	    }
	  }

	  return match;
	};

	/**
	 * Get string representation
	 * @return {String}
	 */
	Node.prototype.toString = function() {
	  return '';
	};

	module.exports = Node;


/***/ },
/* 111 */
/***/ function(module, exports, require) {

	var Node = require(110);

	/**
	 * @constructor OperatorNode
	 * @extends {Node}
	 * An operator with two arguments, like 2+3
	 *
	 * @param {String} op       Operator name, for example '+'
	 * @param {String} fn       Function name, for example 'add'
	 * @param {Node[]} params   Parameters
	 */
	function OperatorNode (op, fn, params) {
	  this.op = op;
	  this.fn = fn;
	  this.params = params;
	}

	OperatorNode.prototype = new Node();

	/**
	 * Compile the node to javascript code
	 * @param {Object} defs     Object which can be used to define functions
	 *                          or constants globally available for the compiled
	 *                          expression
	 * @return {String} js
	 * @private
	 */
	OperatorNode.prototype._compile = function (defs) {
	  if (!(this.fn in defs.math)) {
	    throw new Error('Function ' + this.fn + ' missing in provided namespace "math"');
	  }

	  var params = this.params.map(function (param) {
	    return param._compile(defs);
	  });
	  return 'math.' + this.fn + '(' + params.join(', ') + ')';
	};

	/**
	 * Find all nodes matching given filter
	 * @param {Object} filter  See Node.find for a description of the filter settings
	 * @returns {Node[]} nodes
	 */
	OperatorNode.prototype.find = function (filter) {
	  var nodes = [];

	  // check itself
	  if (this.match(filter)) {
	    nodes.push(this);
	  }

	  // search in parameters
	  var params = this.params;
	  if (params) {
	    for (var i = 0, len = params.length; i < len; i++) {
	      nodes = nodes.concat(params[i].find(filter));
	    }
	  }

	  return nodes;
	};

	/**
	 * Get string representation
	 * @return {String} str
	 */
	OperatorNode.prototype.toString = function() {
	  var params = this.params;

	  switch (params.length) {
	    case 1:
	      if (this.op == '-') {
	        // special case: unary minus
	        return '-' + params[0].toString();
	      }
	      else {
	        // for example '5!'
	        return params[0].toString() + this.op;
	      }

	    case 2: // for example '2+3'
	      var lhs = params[0].toString();
	      if (params[0] instanceof OperatorNode) {
	        lhs = '(' + lhs + ')';
	      }
	      var rhs = params[1].toString();
	      if (params[1] instanceof OperatorNode) {
	        rhs = '(' + rhs + ')';
	      }
	      return lhs + ' ' + this.op + ' ' + rhs;

	    default: // this should occur. format as a function call
	      return this.op + '(' + this.params.join(', ') + ')';
	  }
	};

	module.exports = OperatorNode;


/***/ },
/* 112 */
/***/ function(module, exports, require) {

	var number= require(221),

	    Node = require(110),
	    RangeNode = require(113),
	    SymbolNode = require(114),

	    BigNumber = require(220),
	    Index = require(9),
	    Range = require(8),

	    isNumber = number.isNumber,
	    toNumber = number.toNumber;

	/**
	 * @constructor ParamsNode
	 * @extends {Node}
	 * invoke a list with parameters on a node
	 * @param {Node} object
	 * @param {Node[]} params
	 */
	function ParamsNode (object, params) {
	  this.object = object;
	  this.params = params;
	}

	ParamsNode.prototype = new Node();

	/**
	 * Compile the node to javascript code
	 * @param {Object} defs     Object which can be used to define functions
	 *                          or constants globally available for the compiled
	 *                          expression
	 * @return {String} js
	 * @private
	 */
	ParamsNode.prototype._compile = function (defs) {
	  // TODO: implement support for matrix indexes and ranges
	  var params = this.params.map(function (param) {
	    return param._compile(defs);
	  });

	  return this.object._compile(defs) + '(' + params.join(', ') + ')';
	};

	/**
	 * Find all nodes matching given filter
	 * @param {Object} filter  See Node.find for a description of the filter settings
	 * @returns {Node[]} nodes
	 */
	ParamsNode.prototype.find = function (filter) {
	  var nodes = [];

	  // check itself
	  if (this.match(filter)) {
	    nodes.push(this);
	  }

	  // search object
	  if (this.object) {
	    nodes = nodes.concat(this.object.find(filter));
	  }

	  // search in parameters
	  var params = this.params;
	  if (params) {
	    for (var i = 0, len = params.length; i < len; i++) {
	      nodes = nodes.concat(params[i].find(filter));
	    }
	  }

	  return nodes;
	};

	/**
	 * Get string representation
	 * @return {String} str
	 */
	ParamsNode.prototype.toString = function() {
	  // format the parameters like "(2, 4.2)"
	  var str = this.object ? this.object.toString() : '';
	  if (this.params) {
	    str += '(' + this.params.join(', ') + ')';
	  }
	  return str;
	};

	module.exports = ParamsNode;


/***/ },
/* 113 */
/***/ function(module, exports, require) {

	var number = require(221),
	    Node = require(110),

	    BigNumber = require(220),
	    Range = require(8),
	    Matrix = require(10),

	    toNumber = number.toNumber;

	/**
	 * @constructor RangeNode
	 * @extends {Node}
	 * create a range
	 * @param {Node[]} params           Array [start, end] or [start, end, step]
	 */
	function RangeNode (params) {
	  if (params.length != 2 && params.length != 3) {
	    throw new SyntaxError('Wrong number of arguments. ' +
	        'Expected [start, end] or [start, end, step]');
	  }

	  this.start = params[0];  // included lower-bound
	  this.end   = params[1];  // included upper-bound
	  this.step  = params[2];  // optional step
	}

	RangeNode.prototype = new Node();

	/**
	 * Compile the node to javascript code
	 * @param {Object} defs     Object which can be used to define functions
	 *                          or constants globally available for the compiled
	 *                          expression
	 * @return {String} js
	 * @private
	 */
	RangeNode.prototype._compile = function (defs) {
	  return 'math.range(' +
	      this.start._compile(defs) + ', ' +
	      this.end._compile(defs) + ', ' +
	      (this.step ? (this.step._compile(defs) + ', ') : '') +
	      'true)'; // parameter includeEnd = true
	};

	/**
	 * Find all nodes matching given filter
	 * @param {Object} filter  See Node.find for a description of the filter settings
	 * @returns {Node[]} nodes
	 */
	RangeNode.prototype.find = function (filter) {
	  var nodes = [];

	  // check itself
	  if (this.match(filter)) {
	    nodes.push(this);
	  }

	  // search in parameters
	  if (this.start) {
	    nodes = nodes.concat(this.start.find(filter));
	  }
	  if (this.step) {
	    nodes = nodes.concat(this.step.find(filter));
	  }
	  if (this.end) {
	    nodes = nodes.concat(this.end.find(filter));
	  }

	  return nodes;
	};

	/**
	 * Get string representation
	 * @return {String} str
	 */
	RangeNode.prototype.toString = function() {
	  // format the range like "start:step:end"
	  var str = this.start.toString();
	  if (this.step) {
	    str += ':' + this.step.toString();
	  }
	  str += ':' + this.end.toString();

	  return str;
	};

	module.exports = RangeNode;


/***/ },
/* 114 */
/***/ function(module, exports, require) {

	var Node = require(110),
	    Unit = require(11);

	/**
	 * @constructor SymbolNode
	 * @extends {Node}
	 * A symbol node can hold and resolve a symbol
	 * @param {String} name
	 * @extends {Node}
	 */
	function SymbolNode(name) {
	  this.name = name;
	}

	SymbolNode.prototype = new Node();

	/**
	 * Compile the node to javascript code
	 * @param {Object} defs     Object which can be used to define functions
	 *                          or constants globally available for the compiled
	 *                          expression
	 * @return {String} js
	 * @private
	 */
	SymbolNode.prototype._compile = function (defs) {
	  // add a function to the definitions
	  defs['undef'] = undef;
	  defs['Unit'] = Unit;

	  return '(' +
	      'scope["' + this.name + '"] !== undefined ? scope["' + this.name + '"] : ' +
	      'math["' + this.name + '"] !== undefined ? math["' + this.name + '"] : ' +
	      (Unit.isPlainUnit(this.name) ?
	        'new Unit(null, "' + this.name + '")' :
	        'undef("' + this.name + '")') +
	      ')';
	};

	/**
	 * Throws an error 'Undefined symbol {name}'
	 * @param {String} name
	 */
	function undef (name) {
	  throw new Error('Undefined symbol ' + name);
	}

	/**
	 * Get string representation
	 * @return {String} str
	 * @override
	 */
	SymbolNode.prototype.toString = function() {
	  return this.name;
	};

	module.exports = SymbolNode;


/***/ },
/* 115 */
/***/ function(module, exports, require) {

	var Node = require(110),

	    BigNumber = require(220),
	    Complex = require(7),
	    Unit = require(11),

	    number = require(221),
	    toNumber = number.toNumber;

	/**
	 * @constructor UnitNode
	 * @extends {Node}
	 * Construct a unit, like '3 cm'
	 * @param {Node} value
	 * @param {String} unit     Unit name, for example  'meter' 'kg'
	 */
	function UnitNode (value, unit) {
	  this.value = value;
	  this.unit = unit;
	}

	UnitNode.prototype = new Node();

	/**
	 * Compile the node to javascript code
	 * @param {Object} defs     Object which can be used to define functions
	 *                          or constants globally available for the compiled
	 *                          expression
	 * @return {String} js
	 * @private
	 */
	UnitNode.prototype._compile = function (defs) {
	  return 'math.unit(' + this.value._compile(defs) + ', "' + this.unit + '")';
	};

	/**
	 * Find all nodes matching given filter
	 * @param {Object} filter  See Node.find for a description of the filter settings
	 * @returns {Node[]} nodes
	 */
	UnitNode.prototype.find = function (filter) {
	  var nodes = [];

	  // check itself
	  if (this.match(filter)) {
	    nodes.push(this);
	  }

	  // check value
	  nodes = nodes.concat(this.value.find(filter));

	  return nodes;
	};

	/**
	 * Get string representation
	 * @return {String} str
	 */
	UnitNode.prototype.toString = function() {
	  return this.value + ' ' + this.unit;
	};

	module.exports = UnitNode;


/***/ },
/* 116 */
/***/ function(module, exports, require) {

	var number= require(221),

	    Node = require(110),
	    RangeNode = require(113),
	    IndexNode = require(108),
	    SymbolNode = require(114),

	    BigNumber = require(220),
	    Index = require(9),
	    Range = require(8),

	    isNumber = number.isNumber,
	    toNumber = number.toNumber;

	/**
	 * @constructor UpdateNode
	 * @extends {Node}
	 * Update a symbol value, like a(2,3) = 4.5
	 *
	 * @param {IndexNode} index             IndexNode containing symbol and ranges
	 * @param {Node} expr                   The expression defining the symbol
	 */
	function UpdateNode(index, expr) {
	  if (!(index instanceof IndexNode)) {
	    throw new TypeError('index mus be an IndexNode');
	  }

	  this.index = index;
	  this.expr = expr;
	}

	UpdateNode.prototype = new Node();

	/**
	 * Compile the node to javascript code
	 * @param {Object} defs     Object which can be used to define functions
	 *                          or constants globally available for the compiled
	 *                          expression
	 * @return {String} js
	 * @private
	 */
	UpdateNode.prototype._compile = function (defs) {
	  return 'scope["' + this.index.objectName() + '\"] = ' +
	      this.index.compileSubset(defs,  this.expr._compile(defs));
	};

	/**
	 * Find all nodes matching given filter
	 * @param {Object} filter  See Node.find for a description of the filter settings
	 * @returns {Node[]} nodes
	 */
	UpdateNode.prototype.find = function (filter) {
	  var nodes = [];

	  // check itself
	  if (this.match(filter)) {
	    nodes.push(this);
	  }

	  // search in parameters
	  var ranges = this.ranges;
	  if (ranges) {
	    for (var i = 0, len = ranges.length; i < len; i++) {
	      nodes = nodes.concat(ranges[i].find(filter));
	    }
	  }

	  // search in expression
	  if (this.expr) {
	    nodes = nodes.concat(this.expr.find(filter));
	  }

	  return nodes;
	};

	/**
	 * Get string representation
	 * @return {String}
	 */
	UpdateNode.prototype.toString = function() {
	  return this.index.toString() + ' = ' + this.expr.toString();
	};

	module.exports = UpdateNode;


/***/ },
/* 117 */
/***/ function(module, exports, require) {

	exports.array = require(222);
	exports['boolean'] = require(223);
	exports.number = require(221);
	exports.object = require(2);
	exports.string = require(218);
	exports.types = require(217);


/***/ },
/* 118 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'e',
	  'category': 'Constants',
	  'syntax': [
	    'e'
	  ],
	  'description': 'Euler\'s number, the base of the natural logarithm. Approximately equal to 2.71828',
	  'examples': [
	    'e',
	    'e ^ 2',
	    'exp(2)',
	    'log(e)'
	  ],
	  'seealso': ['exp']
	};


/***/ },
/* 119 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'false',
	  'category': 'Constants',
	  'syntax': [
	    'false'
	  ],
	  'description': 'Boolean value false',
	  'examples': [
	    'false'
	  ],
	  'seealso': ['true']
	};


/***/ },
/* 120 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'i',
	  'category': 'Constants',
	  'syntax': [
	    'i'
	  ],
	  'description': 'Imaginary unit, defined as i*i=-1. A complex number is described as a + b*i, where a is the real part, and b is the imaginary part.',
	  'examples': [
	    'i',
	    'i * i',
	    'sqrt(-1)'
	  ],
	  'seealso': []
	};


/***/ },
/* 121 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'Infinity',
	  'category': 'Constants',
	  'syntax': [
	    'Infinity'
	  ],
	  'description': 'Infinity, a number which is larger than the maximum number that can be handled by a floating point number.',
	  'examples': [
	    'Infinity',
	    '1 / 0'
	  ],
	  'seealso': []
	};


/***/ },
/* 122 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'LN2',
	  'category': 'Constants',
	  'syntax': [
	    'LN2'
	  ],
	  'description': 'Returns the natural logarithm of 2, approximately equal to 0.693',
	  'examples': [
	    'LN2',
	    'log(2)'
	  ],
	  'seealso': []
	};


/***/ },
/* 123 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'LN10',
	  'category': 'Constants',
	  'syntax': [
	    'LN10'
	  ],
	  'description': 'Returns the natural logarithm of 10, approximately equal to 2.302',
	  'examples': [
	    'LN10',
	    'log(10)'
	  ],
	  'seealso': []
	};


/***/ },
/* 124 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'LOG2E',
	  'category': 'Constants',
	  'syntax': [
	    'LOG2E'
	  ],
	  'description': 'Returns the base-2 logarithm of E, approximately equal to 1.442',
	  'examples': [
	    'LOG2E',
	    'log(e, 2)'
	  ],
	  'seealso': []
	};


/***/ },
/* 125 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'LOG10E',
	  'category': 'Constants',
	  'syntax': [
	    'LOG10E'
	  ],
	  'description': 'Returns the base-10 logarithm of E, approximately equal to 0.434',
	  'examples': [
	    'LOG10E',
	    'log(e, 10)'
	  ],
	  'seealso': []
	};


/***/ },
/* 126 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'NaN',
	  'category': 'Constants',
	  'syntax': [
	    'NaN'
	  ],
	  'description': 'Not a number',
	  'examples': [
	    'NaN',
	    '0 / 0'
	  ],
	  'seealso': []
	};


/***/ },
/* 127 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'pi',
	  'category': 'Constants',
	  'syntax': [
	    'pi'
	  ],
	  'description': 'The number pi is a mathematical constant that is the ratio of a circle\'s circumference to its diameter, and is approximately equal to 3.14159',
	  'examples': [
	    'pi',
	    'sin(pi/2)'
	  ],
	  'seealso': ['tau']
	};


/***/ },
/* 128 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'SQRT1_2',
	  'category': 'Constants',
	  'syntax': [
	    'SQRT1_2'
	  ],
	  'description': 'Returns the square root of 1/2, approximately equal to 0.707',
	  'examples': [
	    'SQRT1_2',
	    'sqrt(1/2)'
	  ],
	  'seealso': []
	};


/***/ },
/* 129 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'SQRT2',
	  'category': 'Constants',
	  'syntax': [
	    'SQRT2'
	  ],
	  'description': 'Returns the square root of 2, approximately equal to 1.414',
	  'examples': [
	    'SQRT2',
	    'sqrt(2)'
	  ],
	  'seealso': []
	};


/***/ },
/* 130 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'tau',
	  'category': 'Constants',
	  'syntax': [
	    'pi'
	  ],
	  'description': 'Tau is the ratio constant of a circle\'s circumference to radius, equal to 2 * pi, approximately 6.2832.',
	  'examples': [
	    'tau',
	    '2 * pi'
	  ],
	  'seealso': ['pi']
	};


/***/ },
/* 131 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'true',
	  'category': 'Constants',
	  'syntax': [
	    'true'
	  ],
	  'description': 'Boolean value true',
	  'examples': [
	    'true'
	  ],
	  'seealso': ['false']
	};


/***/ },
/* 132 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'abs',
	  'category': 'Arithmetic',
	  'syntax': [
	    'abs(x)'
	  ],
	  'description': 'Compute the absolute value.',
	  'examples': [
	    'abs(3.5)',
	    'abs(-4.2)'
	  ],
	  'seealso': ['sign']
	};


/***/ },
/* 133 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'add',
	  'category': 'Operators',
	  'syntax': [
	    'x + y',
	    'add(x, y)'
	  ],
	  'description': 'Add two values.',
	  'examples': [
	    '2.1 + 3.6',
	    'ans - 3.6',
	    '3 + 2i',
	    '"hello" + " world"',
	    '3 cm + 2 inch'
	  ],
	  'seealso': [
	    'subtract'
	  ]
	};


/***/ },
/* 134 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'ceil',
	  'category': 'Arithmetic',
	  'syntax': [
	    'ceil(x)'
	  ],
	  'description':
	      'Round a value towards plus infinity.If x is complex, both real and imaginary part are rounded towards plus infinity.',
	  'examples': [
	    'ceil(3.2)',
	    'ceil(3.8)',
	    'ceil(-4.2)'
	  ],
	  'seealso': ['floor', 'fix', 'round']
	};


/***/ },
/* 135 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'cube',
	  'category': 'Arithmetic',
	  'syntax': [
	    'cube(x)'
	  ],
	  'description': 'Compute the cube of a value. The cube of x is x * x * x.',
	  'examples': [
	    'cube(2)',
	    '2^3',
	    '2 * 2 * 2'
	  ],
	  'seealso': [
	    'multiply',
	    'square',
	    'pow'
	  ]
	};


/***/ },
/* 136 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'divide',
	  'category': 'Operators',
	  'syntax': [
	    'x / y',
	    'divide(x, y)'
	  ],
	  'description': 'Divide two values.',
	  'examples': [
	    '2 / 3',
	    'ans * 3',
	    '4.5 / 2',
	    '3 + 4 / 2',
	    '(3 + 4) / 2',
	    '18 km / 4.5'
	  ],
	  'seealso': [
	    'multiply'
	  ]
	};


/***/ },
/* 137 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'edivide',
	  'category': 'Operators',
	  'syntax': [
	    'x ./ y',
	    'edivide(x, y)'
	  ],
	  'description': 'divide two values element wise.',
	  'examples': [
	    'a = [1, 2, 3; 4, 5, 6]',
	    'b = [2, 1, 1; 3, 2, 5]',
	    'a ./ b'
	  ],
	  'seealso': [
	    'multiply',
	    'emultiply',
	    'divide'
	  ]
	};


/***/ },
/* 138 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'emultiply',
	  'category': 'Operators',
	  'syntax': [
	    'x .* y',
	    'emultiply(x, y)'
	  ],
	  'description': 'multiply two values element wise.',
	  'examples': [
	    'a = [1, 2, 3; 4, 5, 6]',
	    'b = [2, 1, 1; 3, 2, 5]',
	    'a .* b'
	  ],
	  'seealso': [
	    'multiply',
	    'divide',
	    'edivide'
	  ]
	};


/***/ },
/* 139 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'epow',
	  'category': 'Operators',
	  'syntax': [
	    'x .^ y',
	    'epow(x, y)'
	  ],
	  'description':
	      'Calculates the power of x to y element wise.',
	  'examples': [
	    'a = [1, 2, 3; 4, 5, 6]',
	    'a .^ 2'
	  ],
	  'seealso': [
	    'pow'
	  ]
	};


/***/ },
/* 140 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'equal',
	  'category': 'Operators',
	  'syntax': [
	    'x == y',
	    'equal(x, y)'
	  ],
	  'description':
	      'Check equality of two values. Returns 1 if the values are equal, and 0 if not.',
	  'examples': [
	    '2+2 == 3',
	    '2+2 == 4',
	    'a = 3.2',
	    'b = 6-2.8',
	    'a == b',
	    '50cm == 0.5m'
	  ],
	  'seealso': [
	    'unequal', 'smaller', 'larger', 'smallereq', 'largereq'
	  ]
	};


/***/ },
/* 141 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'exp',
	  'category': 'Arithmetic',
	  'syntax': [
	    'exp(x)'
	  ],
	  'description': 'Calculate the exponent of a value.',
	  'examples': [
	    'exp(1.3)',
	    'e ^ 1.3',
	    'log(exp(1.3))',
	    'x = 2.4',
	    '(exp(i*x) == cos(x) + i*sin(x))   # Euler\'s formula'
	  ],
	  'seealso': [
	    'square',
	    'multiply',
	    'log'
	  ]
	};


/***/ },
/* 142 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'fix',
	  'category': 'Arithmetic',
	  'syntax': [
	    'fix(x)'
	  ],
	  'description':
	      'Round a value towards zero.If x is complex, both real and imaginary part are rounded towards zero.',
	  'examples': [
	    'fix(3.2)',
	    'fix(3.8)',
	    'fix(-4.2)',
	    'fix(-4.8)'
	  ],
	  'seealso': ['ceil', 'floor', 'round']
	};


/***/ },
/* 143 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'floor',
	  'category': 'Arithmetic',
	  'syntax': [
	    'floor(x)'
	  ],
	  'description':
	      'Round a value towards minus infinity.If x is complex, both real and imaginary part are rounded towards minus infinity.',
	  'examples': [
	    'floor(3.2)',
	    'floor(3.8)',
	    'floor(-4.2)'
	  ],
	  'seealso': ['ceil', 'fix', 'round']
	};


/***/ },
/* 144 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'gcd',
	  'category': 'Arithmetic',
	  'syntax': [
	    'gcd(a, b)',
	    'gcd(a, b, c, ...)'
	  ],
	  'description': 'Compute the greatest common divisor.',
	  'examples': [
	    'gcd(8, 12)',
	    'gcd(-4, 6)',
	    'gcd(25, 15, -10)'
	  ],
	  'seealso': [ 'lcm', 'xgcd' ]
	};


/***/ },
/* 145 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'larger',
	  'category': 'Operators',
	  'syntax': [
	    'x > y',
	    'larger(x, y)'
	  ],
	  'description':
	      'Check if value x is larger than y. Returns 1 if x is larger than y, and 0 if not.',
	  'examples': [
	    '2 > 3',
	    '5 > 2*2',
	    'a = 3.3',
	    'b = 6-2.8',
	    '(a > b)',
	    '(b < a)',
	    '5 cm > 2 inch'
	  ],
	  'seealso': [
	    'equal', 'unequal', 'smaller', 'smallereq', 'largereq'
	  ]
	};


/***/ },
/* 146 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'largereq',
	  'category': 'Operators',
	  'syntax': [
	    'x >= y',
	    'largereq(x, y)'
	  ],
	  'description':
	      'Check if value x is larger or equal to y. Returns 1 if x is larger or equal to y, and 0 if not.',
	  'examples': [
	    '2 > 1+1',
	    '2 >= 1+1',
	    'a = 3.2',
	    'b = 6-2.8',
	    '(a > b)'
	  ],
	  'seealso': [
	    'equal', 'unequal', 'smallereq', 'smaller', 'largereq'
	  ]
	};


/***/ },
/* 147 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'lcm',
	  'category': 'Arithmetic',
	  'syntax': [
	    'lcm(x, y)'
	  ],
	  'description': 'Compute the least common multiple.',
	  'examples': [
	    'lcm(4, 6)',
	    'lcm(6, 21)',
	    'lcm(6, 21, 5)'
	  ],
	  'seealso': [ 'gcd' ]
	};


/***/ },
/* 148 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'log',
	  'category': 'Arithmetic',
	  'syntax': [
	    'log(x)',
	    'log(x, base)'
	  ],
	  'description': 'Compute the logarithm of a value. If no base is provided, the natural logarithm of x is calculated. If base if provided, the logarithm is calculated for the specified base. log(x, base) is defined as log(x) / log(base).',
	  'examples': [
	    'log(3.5)',
	    'a = log(2.4)',
	    'exp(a)',
	    '10 ^ 3',
	    'log(1000, 10)',
	    'log(1000) / log(10)',
	    'b = logb(1024, 2)',
	    '2 ^ b'
	  ],
	  'seealso': [
	    'exp',
	    'log10'
	  ]
	};

/***/ },
/* 149 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'log10',
	  'category': 'Arithmetic',
	  'syntax': [
	    'log10(x)'
	  ],
	  'description': 'Compute the 10-base logarithm of a value.',
	  'examples': [
	    'log10(1000)',
	    '10 ^ 3',
	    'log10(0.01)',
	    'log(1000) / log(10)',
	    'log(1000, 10)'
	  ],
	  'seealso': [
	    'exp',
	    'log'
	  ]
	};


/***/ },
/* 150 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'mod',
	  'category': 'Operators',
	  'syntax': [
	    'x % y',
	    'x mod y',
	    'mod(x, y)'
	  ],
	  'description':
	      'Calculates the modulus, the remainder of an integer division.',
	  'examples': [
	    '7 % 3',
	    '11 % 2',
	    '10 mod 4',
	    'function isOdd(x) = x % 2',
	    'isOdd(2)',
	    'isOdd(3)'
	  ],
	  'seealso': []
	};


/***/ },
/* 151 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'multiply',
	  'category': 'Operators',
	  'syntax': [
	    'x * y',
	    'multiply(x, y)'
	  ],
	  'description': 'multiply two values.',
	  'examples': [
	    '2.1 * 3.6',
	    'ans / 3.6',
	    '2 * 3 + 4',
	    '2 * (3 + 4)',
	    '3 * 2.1 km'
	  ],
	  'seealso': [
	    'divide'
	  ]
	};


/***/ },
/* 152 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'pow',
	  'category': 'Operators',
	  'syntax': [
	    'x ^ y',
	    'pow(x, y)'
	  ],
	  'description':
	      'Calculates the power of x to y, x^y.',
	  'examples': [
	    '2^3 = 8',
	    '2*2*2',
	    '1 + e ^ (pi * i)'
	  ],
	  'seealso': [
	    'unequal', 'smaller', 'larger', 'smallereq', 'largereq'
	  ]
	};


/***/ },
/* 153 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'round',
	  'category': 'Arithmetic',
	  'syntax': [
	    'round(x)',
	    'round(x, n)'
	  ],
	  'description':
	      'round a value towards the nearest integer.If x is complex, both real and imaginary part are rounded towards the nearest integer. When n is specified, the value is rounded to n decimals.',
	  'examples': [
	    'round(3.2)',
	    'round(3.8)',
	    'round(-4.2)',
	    'round(-4.8)',
	    'round(pi, 3)',
	    'round(123.45678, 2)'
	  ],
	  'seealso': ['ceil', 'floor', 'fix']
	};


/***/ },
/* 154 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'sign',
	  'category': 'Arithmetic',
	  'syntax': [
	    'sign(x)'
	  ],
	  'description':
	      'Compute the sign of a value. The sign of a value x is 1 when x>1, -1 when x<0, and 0 when x=0.',
	  'examples': [
	    'sign(3.5)',
	    'sign(-4.2)',
	    'sign(0)'
	  ],
	  'seealso': [
	    'abs'
	  ]
	};


/***/ },
/* 155 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'smaller',
	  'category': 'Operators',
	  'syntax': [
	    'x < y',
	    'smaller(x, y)'
	  ],
	  'description':
	      'Check if value x is smaller than value y. Returns 1 if x is smaller than y, and 0 if not.',
	  'examples': [
	    '2 < 3',
	    '5 < 2*2',
	    'a = 3.3',
	    'b = 6-2.8',
	    '(a < b)',
	    '5 cm < 2 inch'
	  ],
	  'seealso': [
	    'equal', 'unequal', 'larger', 'smallereq', 'largereq'
	  ]
	};


/***/ },
/* 156 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'smallereq',
	  'category': 'Operators',
	  'syntax': [
	    'x <= y',
	    'smallereq(x, y)'
	  ],
	  'description':
	      'Check if value x is smaller or equal to value y. Returns 1 if x is smaller than y, and 0 if not.',
	  'examples': [
	    '2 < 1+1',
	    '2 <= 1+1',
	    'a = 3.2',
	    'b = 6-2.8',
	    '(a < b)'
	  ],
	  'seealso': [
	    'equal', 'unequal', 'larger', 'smaller', 'largereq'
	  ]
	};


/***/ },
/* 157 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'sqrt',
	  'category': 'Arithmetic',
	  'syntax': [
	    'sqrt(x)'
	  ],
	  'description':
	      'Compute the square root value. If x = y * y, then y is the square root of x.',
	  'examples': [
	    'sqrt(25)',
	    '5 * 5',
	    'sqrt(-1)'
	  ],
	  'seealso': [
	    'square',
	    'multiply'
	  ]
	};


/***/ },
/* 158 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'square',
	  'category': 'Arithmetic',
	  'syntax': [
	    'square(x)'
	  ],
	  'description':
	      'Compute the square of a value. The square of x is x * x.',
	  'examples': [
	    'square(3)',
	    'sqrt(9)',
	    '3^2',
	    '3 * 3'
	  ],
	  'seealso': [
	    'multiply',
	    'pow',
	    'sqrt',
	    'cube'
	  ]
	};


/***/ },
/* 159 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'subtract',
	  'category': 'Operators',
	  'syntax': [
	    'x - y',
	    'subtract(x, y)'
	  ],
	  'description': 'subtract two values.',
	  'examples': [
	    '5.3 - 2',
	    'ans + 2',
	    '2/3 - 1/6',
	    '2 * 3 - 3',
	    '2.1 km - 500m'
	  ],
	  'seealso': [
	    'add'
	  ]
	};


/***/ },
/* 160 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'unary',
	  'category': 'Operators',
	  'syntax': [
	    '-x',
	    'unary(x)'
	  ],
	  'description':
	      'Inverse the sign of a value.',
	  'examples': [
	    '-4.5',
	    '-(-5.6)'
	  ],
	  'seealso': [
	    'add', 'subtract'
	  ]
	};


/***/ },
/* 161 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'unequal',
	  'category': 'Operators',
	  'syntax': [
	    'x != y',
	    'unequal(x, y)'
	  ],
	  'description':
	      'Check unequality of two values. Returns 1 if the values are unequal, and 0 if they are equal.',
	  'examples': [
	    '2+2 != 3',
	    '2+2 != 4',
	    'a = 3.2',
	    'b = 6-2.8',
	    'a != b',
	    '50cm != 0.5m',
	    '5 cm != 2 inch'
	  ],
	  'seealso': [
	    'equal', 'smaller', 'larger', 'smallereq', 'largereq'
	  ]
	};


/***/ },
/* 162 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'xgcd',
	  'category': 'Arithmetic',
	  'syntax': [
	    'xgcd(a, b)'
	  ],
	  'description': 'Calculate the extended greatest common divisor for two values',
	  'examples': [
	    'xgcd(8, 12)',
	    'gcd(8, 12)',
	    'xgcd(36163, 21199)'
	  ],
	  'seealso': [ 'gcd', 'lcm' ]
	};


/***/ },
/* 163 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'arg',
	  'category': 'Complex',
	  'syntax': [
	    'arg(x)'
	  ],
	  'description':
	      'Compute the argument of a complex value. If x = a+bi, the argument is computed as atan2(b, a).',
	  'examples': [
	    'arg(2 + 2i)',
	    'atan2(3, 2)',
	    'arg(2 - 3i)'
	  ],
	  'seealso': [
	    're',
	    'im',
	    'conj',
	    'abs'
	  ]
	};


/***/ },
/* 164 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'conj',
	  'category': 'Complex',
	  'syntax': [
	    'conj(x)'
	  ],
	  'description':
	      'Compute the complex conjugate of a complex value. If x = a+bi, the complex conjugate is a-bi.',
	  'examples': [
	    'conj(2 + 3i)',
	    'conj(2 - 3i)',
	    'conj(-5.2i)'
	  ],
	  'seealso': [
	    're',
	    'im',
	    'abs',
	    'arg'
	  ]
	};


/***/ },
/* 165 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 're',
	  'category': 'Complex',
	  'syntax': [
	    're(x)'
	  ],
	  'description': 'Get the real part of a complex number.',
	  'examples': [
	    're(2 + 3i)',
	    'im(2 + 3i)',
	    're(-5.2i)',
	    're(2.4)'
	  ],
	  'seealso': [
	    'im',
	    'conj',
	    'abs',
	    'arg'
	  ]
	};


/***/ },
/* 166 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'im',
	  'category': 'Complex',
	  'syntax': [
	    'im(x)'
	  ],
	  'description': 'Get the imaginary part of a complex number.',
	  'examples': [
	    'im(2 + 3i)',
	    're(2 + 3i)',
	    'im(-5.2i)',
	    'im(2.4)'
	  ],
	  'seealso': [
	    're',
	    'conj',
	    'abs',
	    'arg'
	  ]
	};


/***/ },
/* 167 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'bignumber',
	  'category': 'Type',
	  'syntax': [
	    'bignumber(x)'
	  ],
	  'description':
	      'Create a big number from a number or string.',
	  'examples': [
	    '0.1 + 0.2',
	    'bignumber(0.1) + bignumber(0.2)',
	    'bignumber("7.2")',
	    'bignumber("7.2e500")',
	    'bignumber([0.1, 0.2, 0.3])'
	  ],
	  'seealso': [
	    'boolean', 'complex', 'index', 'matrix', 'string', 'unit'
	  ]
	};


/***/ },
/* 168 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'boolean',
	  'category': 'Type',
	  'syntax': [
	    'x',
	    'boolean(x)'
	  ],
	  'description':
	      'Convert a string or number into a boolean.',
	  'examples': [
	    'boolean(0)',
	    'boolean(1)',
	    'boolean(3)',
	    'boolean("true")',
	    'boolean("false")',
	    'boolean([1, 0, 1, 1])'
	  ],
	  'seealso': [
	    'bignumber', 'complex', 'index', 'matrix', 'number', 'string', 'unit'
	  ]
	};


/***/ },
/* 169 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'complex',
	  'category': 'Type',
	  'syntax': [
	    'complex()',
	    'complex(re, im)',
	    'complex(string)'
	  ],
	  'description':
	      'Create a complex number.',
	  'examples': [
	    'complex()',
	    'complex(2, 3)',
	    'complex("7 - 2i")'
	  ],
	  'seealso': [
	    'bignumber', 'boolean', 'index', 'matrix', 'number', 'string', 'unit'
	  ]
	};


/***/ },
/* 170 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'index',
	  'category': 'Type',
	  'syntax': [
	    '[start]',
	    '[start:end]',
	    '[start:step:end]',
	    '[start1, start 2, ...]',
	    '[start1:end1, start2:end2, ...]',
	    '[start1:step1:end1, start2:step2:end2, ...]'
	  ],
	  'description':
	      'Create an index to get or replace a subset of a matrix',
	  'examples': [
	    '[]',
	    '[1, 2, 3]',
	    'A = [1, 2, 3; 4, 5, 6]',
	    'A[1, :]',
	    'A[1, 2] = 50',
	    'A[0:2, 0:2] = ones(2, 2)'
	  ],
	  'seealso': [
	    'bignumber', 'boolean', 'complex', 'matrix,', 'number', 'range', 'string', 'unit'
	  ]
	};


/***/ },
/* 171 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'matrix',
	  'category': 'Type',
	  'syntax': [
	    '[]',
	    '[a1, b1, ...; a2, b2, ...]',
	    'matrix()',
	    'matrix([...])'
	  ],
	  'description':
	      'Create a matrix.',
	  'examples': [
	    '[]',
	    '[1, 2, 3]',
	    '[1, 2, 3; 4, 5, 6]',
	    'matrix()',
	    'matrix([3, 4])'
	  ],
	  'seealso': [
	    'bignumber', 'boolean', 'complex', 'index', 'number', 'string', 'unit'
	  ]
	};


/***/ },
/* 172 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'number',
	  'category': 'Type',
	  'syntax': [
	    'x',
	    'number(x)'
	  ],
	  'description':
	      'Create a number or convert a string or boolean into a number.',
	  'examples': [
	    '2',
	    '2e3',
	    '4.05',
	    'number(2)',
	    'number("7.2")',
	    'number(true)',
	    'number([true, false, true, true])'
	  ],
	  'seealso': [
	    'bignumber', 'boolean', 'complex', 'index', 'matrix', 'string', 'unit'
	  ]
	};


/***/ },
/* 173 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'string',
	  'category': 'Type',
	  'syntax': [
	    '"text"',
	    'string(x)'
	  ],
	  'description':
	      'Create a string or convert a value to a string',
	  'examples': [
	    '"Hello World!"',
	    'string(4.2)',
	    'string(3 + 2i)'
	  ],
	  'seealso': [
	    'bignumber', 'boolean', 'complex', 'index', 'matrix', 'number', 'unit'
	  ]
	};


/***/ },
/* 174 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'unit',
	  'category': 'Type',
	  'syntax': [
	    'value unit',
	    'unit(value, unit)',
	    'unit(string)'
	  ],
	  'description':
	      'Create a unit.',
	  'examples': [
	    '5.5 mm',
	    '3 inch',
	    'unit(7.1, "kilogram")',
	    'unit("23 deg")'
	  ],
	  'seealso': [
	    'bignumber', 'boolean', 'complex', 'index', 'matrix', 'number', 'string'
	  ]
	};


/***/ },
/* 175 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'eval',
	  'category': 'Expression',
	  'syntax': [
	    'eval(expression)',
	    'eval([expr1, expr2, expr3, ...])'
	  ],
	  'description': 'Evaluate an expression or an array with expressions.',
	  'examples': [
	    'eval("2 + 3")',
	    'eval("sqrt(" + 4 + ")")'
	  ],
	  'seealso': []
	};


/***/ },
/* 176 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'help',
	  'category': 'Expression',
	  'syntax': [
	    'help(object)',
	    'help(string)'
	  ],
	  'description': 'Display documentation on a function or data type.',
	  'examples': [
	    'help(sqrt)',
	    'help("complex")'
	  ],
	  'seealso': []
	};


/***/ },
/* 177 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'concat',
	  'category': 'Matrix',
	  'syntax': [
	    'concat(a, b, c, ...)',
	    'concat(a, b, c, ..., dim)'
	  ],
	  'description': 'Concatenate matrices. By default, the matrices are concatenated by the first dimension. The dimension on which to concatenate can be provided as last argument.',
	  'examples': [
	    'a = [1, 2; 5, 6]',
	    'b = [3, 4; 7, 8]',
	    'concat(a, b)',
	    '[a, b]',
	    'concat(a, b, 2)',
	    '[a; b]'
	  ],
	  'seealso': [
	    'det', 'diag', 'eye', 'inv', 'ones', 'range', 'size', 'squeeze', 'subset', 'transpose', 'zeros'
	  ]
	};


/***/ },
/* 178 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'det',
	  'category': 'Matrix',
	  'syntax': [
	    'det(x)'
	  ],
	  'description': 'Calculate the determinant of a matrix',
	  'examples': [
	    'det([1, 2; 3, 4])',
	    'det([-2, 2, 3; -1, 1, 3; 2, 0, -1])'
	  ],
	  'seealso': [
	    'concat', 'diag', 'eye', 'inv', 'ones', 'range', 'size', 'squeeze', 'subset', 'transpose', 'zeros'
	  ]
	};


/***/ },
/* 179 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'diag',
	  'category': 'Matrix',
	  'syntax': [
	    'diag(x)',
	    'diag(x, k)'
	  ],
	  'description': 'Create a diagonal matrix or retrieve the diagonal of a matrix. When x is a vector, a matrix with the vector values on the diagonal will be returned. When x is a matrix, a vector with the diagonal values of the matrix is returned.When k is provided, the k-th diagonal will be filled in or retrieved, if k is positive, the values are placed on the super diagonal. When k is negative, the values are placed on the sub diagonal.',
	  'examples': [
	    'diag(1:3)',
	    'diag(1:3, 1)',
	    'a = [1, 2, 3; 4, 5, 6; 7, 8, 9]',
	    'diag(a)'
	  ],
	  'seealso': [
	    'concat', 'det', 'eye', 'inv', 'ones', 'range', 'size', 'squeeze', 'subset', 'transpose', 'zeros'
	  ]
	};


/***/ },
/* 180 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'eye',
	  'category': 'Matrix',
	  'syntax': [
	    'eye(n)',
	    'eye(m, n)',
	    'eye([m, n])',
	    'eye'
	  ],
	  'description': 'Returns the identity matrix with size m-by-n. The matrix has ones on the diagonal and zeros elsewhere.',
	  'examples': [
	    'eye(3)',
	    'eye(3, 5)',
	    'a = [1, 2, 3; 4, 5, 6]',
	    'eye(size(a))'
	  ],
	  'seealso': [
	    'concat', 'det', 'diag', 'inv', 'ones', 'range', 'size', 'squeeze', 'subset', 'transpose', 'zeros'
	  ]
	};


/***/ },
/* 181 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'inv',
	  'category': 'Matrix',
	  'syntax': [
	    'inv(x)'
	  ],
	  'description': 'Calculate the inverse of a matrix',
	  'examples': [
	    'inv([1, 2; 3, 4])',
	    'inv(4)',
	    '1 / 4'
	  ],
	  'seealso': [
	    'concat', 'det', 'diag', 'eye', 'ones', 'range', 'size', 'squeeze', 'subset', 'transpose', 'zeros'
	  ]
	};


/***/ },
/* 182 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'ones',
	  'category': 'Matrix',
	  'syntax': [
	    'ones(m)',
	    'ones(m, n)',
	    'ones(m, n, p, ...)',
	    'ones([m])',
	    'ones([m, n])',
	    'ones([m, n, p, ...])',
	    'ones'
	  ],
	  'description': 'Create a matrix containing ones.',
	  'examples': [
	    'ones(3)',
	    'ones(3, 5)',
	    'ones([2,3]) * 4.5',
	    'a = [1, 2, 3; 4, 5, 6]',
	    'ones(size(a))'
	  ],
	  'seealso': [
	    'concat', 'det', 'diag', 'eye', 'inv', 'range', 'size', 'squeeze', 'subset', 'transpose', 'zeros'
	  ]
	};


/***/ },
/* 183 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'range',
	  'category': 'Type',
	  'syntax': [
	    'start:end',
	    'start:step:end',
	    'range(start, end)',
	    'range(start, end, step)',
	    'range(string)'
	  ],
	  'description':
	      'Create a range. Lower bound of the range is included, upper bound is excluded.',
	  'examples': [
	    '1:5',
	    '3:-1:-3',
	    'range(3, 7)',
	    'range(0, 12, 2)',
	    'range("4:10")',
	    'a = [1, 2, 3, 4; 5, 6, 7, 8]',
	    'a[1:2, 1:2]'
	  ],
	  'seealso': [
	    'concat', 'det', 'diag', 'eye', 'inv', 'ones', 'size', 'squeeze', 'subset', 'transpose', 'zeros'
	  ]
	};


/***/ },
/* 184 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'resize',
	  'category': 'Matrix',
	  'syntax': [
	    'resize(x, size)',
	    'resize(x, size, defaultValue)'
	  ],
	  'description': 'Resize a matrix.',
	  'examples': [
	    'resize([1,2,3,4,5], [3])',
	    'resize([1,2,3], [5], 0)',
	    'resize(2, [2, 3], 0)',
	    'resize("hello", [8], "!")'
	  ],
	  'seealso': [
	    'size', 'subset', 'squeeze'
	  ]
	};


/***/ },
/* 185 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'size',
	  'category': 'Matrix',
	  'syntax': [
	    'size(x)'
	  ],
	  'description': 'Calculate the size of a matrix.',
	  'examples': [
	    'size(2.3)',
	    'size("hello world")',
	    'a = [1, 2; 3, 4; 5, 6]',
	    'size(a)',
	    'size(1:6)'
	  ],
	  'seealso': [
	    'concat', 'det', 'diag', 'eye', 'inv', 'ones', 'range', 'squeeze', 'subset', 'transpose', 'zeros'
	  ]
	};


/***/ },
/* 186 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'squeeze',
	  'category': 'Matrix',
	  'syntax': [
	    'squeeze(x)'
	  ],
	  'description': 'Remove singleton dimensions from a matrix.',
	  'examples': [
	    'a = zeros(1,3,2)',
	    'size(squeeze(a))',
	    'b = zeros(3,1,1)',
	    'size(squeeze(b))'
	  ],
	  'seealso': [
	    'concat', 'det', 'diag', 'eye', 'inv', 'ones', 'range', 'size', 'subset', 'transpose', 'zeros'
	  ]
	};


/***/ },
/* 187 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'subset',
	  'category': 'Matrix',
	  'syntax': [
	    'value(index)',
	    'value(index) = replacement',
	    'subset(value, [index])',
	    'subset(value, [index], replacement)'
	  ],
	  'description': 'Get or set a subset of a matrix or string. ' +
	      'Indexes are one-based. ' +
	      'Both the ranges lower-bound and upper-bound are included.',
	  'examples': [
	    'd = [1, 2; 3, 4]',
	    'e = []',
	    'e[1, 1:2] = [5, 6]',
	    'e[2, :] = [7, 8]',
	    'f = d * e',
	    'f[2, 1]',
	    'f[:, 1]'
	  ],
	  'seealso': [
	    'concat', 'det', 'diag', 'eye', 'inv', 'ones', 'range', 'size', 'squeeze', 'transpose', 'zeros'
	  ]
	};


/***/ },
/* 188 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'transpose',
	  'category': 'Matrix',
	  'syntax': [
	    'x\'',
	    'transpose(x)'
	  ],
	  'description': 'Transpose a matrix',
	  'examples': [
	    'a = [1, 2, 3; 4, 5, 6]',
	    'a\'',
	    'transpose(a)'
	  ],
	  'seealso': [
	    'concat', 'det', 'diag', 'eye', 'inv', 'ones', 'range', 'size', 'squeeze', 'subset', 'zeros'
	  ]
	};


/***/ },
/* 189 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'zeros',
	  'category': 'Matrix',
	  'syntax': [
	    'zeros(m)',
	    'zeros(m, n)',
	    'zeros(m, n, p, ...)',
	    'zeros([m])',
	    'zeros([m, n])',
	    'zeros([m, n, p, ...])',
	    'zeros'
	  ],
	  'description': 'Create a matrix containing zeros.',
	  'examples': [
	    'zeros(3)',
	    'zeros(3, 5)',
	    'a = [1, 2, 3; 4, 5, 6]',
	    'zeros(size(a))'
	  ],
	  'seealso': [
	    'concat', 'det', 'diag', 'eye', 'inv', 'ones', 'range', 'size', 'squeeze', 'subset', 'transpose'
	  ]
	};


/***/ },
/* 190 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'combinations',
	  'category': 'Probability',
	  'syntax': [
	    'combinations(n, k)'
	  ],
	  'description': 'Compute the number of combinations of n items taken k at a time',
	  'examples': [
	    'combinations(7, 5)'
	  ],
	  'seealso': ['permutations', 'factorial']
	};


/***/ },
/* 191 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'distribution',
	  'category': 'Probability',
	  'syntax': [
	    'distribution(name)',
	    'distribution(name, arg1, arg2, ...)'
	  ],
	  'description':
	      'Create a distribution object of a specific type. ' +
	          'A distribution object contains functions `random([size,] [min,] [max])`, ' +
	          '`randomInt([size,] [min,] [max])`, and `pickRandom(array)`. ' +
	          'Available types of distributions: "uniform", "normal". ' +
	          'Note that the function distribution is currently not available via the expression parser.',
	  'examples': [
	  ],
	  'seealso': ['random', 'randomInt']
	};


/***/ },
/* 192 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'factorial',
	  'category': 'Probability',
	  'syntax': [
	    'n!',
	    'factorial(n)'
	  ],
	  'description': 'Compute the factorial of a value',
	  'examples': [
	    '5!',
	    '5*4*3*2*1',
	    '3!'
	  ],
	  'seealso': []
	};


/***/ },
/* 193 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'permutations',
	  'category': 'Probability',
	  'syntax': [
	    'permutations(n)',
	    'permutations(n, k)'
	  ],
	  'description': 'Compute the number of permutations of n items taken k at a time',
	  'examples': [
	    'permutations(5)',
	    'permutations(5, 4)'
	  ],
	  'seealso': ['combinations', 'factorial']
	};


/***/ },
/* 194 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'pickRandom',
	  'category': 'Probability',
	  'syntax': [
	    'pickRandom(array)'
	  ],
	  'description':
	      'Pick a random entry from a given array.',
	  'examples': [
	    'pickRandom(0:10)',
	    'pickRandom([1, 3, 1, 6])'
	  ],
	  'seealso': ['distribution', 'random', 'randomInt']
	};


/***/ },
/* 195 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'random',
	  'category': 'Probability',
	  'syntax': [
	    'random()',
	    'random(max)',
	    'random(min, max)',
	    'random(size)',
	    'random(size, max)',
	    'random(size, min, max)'
	  ],
	  'description':
	      'Return a random number.',
	  'examples': [
	    'random()',
	    'random(10, 20)',
	    'random([2, 3])'
	  ],
	  'seealso': ['distribution', 'pickRandom', 'randomInt']
	};


/***/ },
/* 196 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'randInt',
	  'category': 'Probability',
	  'syntax': [
	    'randInt()',
	    'randInt(max)',
	    'randInt(min, max)',
	    'randInt(size)',
	    'randInt(size, max)',
	    'randInt(size, min, max)'
	  ],
	  'description':
	      'Return a random integer number',
	  'examples': [
	    'randInt()',
	    'randInt(10, 20)',
	    'randInt([2, 3], 10)'
	  ],
	  'seealso': ['distribution', 'pickRandom', 'random']
	};

/***/ },
/* 197 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'min',
	  'category': 'Statistics',
	  'syntax': [
	    'min(a, b, c, ...)',
	    'min(A)',
	    'min(A, dim)'
	  ],
	  'description': 'Compute the minimum value of a list of values.',
	  'examples': [
	    'min(2, 3, 4, 1)',
	    'min([2, 3, 4, 1])',
	    'min([2, 5; 4, 3], 0)',
	    'min([2, 5; 4, 3], 1)',
	    'min(2.7, 7.1, -4.5, 2.0, 4.1)',
	    'max(2.7, 7.1, -4.5, 2.0, 4.1)'
	  ],
	  'seealso': [
	    //'sum',
	    //'prod',
	    //'avg',
	    //'var',
	    //'std',
	    'max',
	    'mean',
	    //'median',
	    'min'
	  ]
	};


/***/ },
/* 198 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'mean',
	  'category': 'Statistics',
	  'syntax': [
	    'mean(a, b, c, ...)',
	    'mean(A)',
	    'mean(A, dim)'
	  ],
	  'description': 'Compute the arithmetic mean of a list of values.',
	  'examples': [
	    'mean(2, 3, 4, 1)',
	    'mean([2, 3, 4, 1])',
	    'mean([2, 5; 4, 3], 0)',
	    'mean([2, 5; 4, 3], 1)',
	    'mean([1.0, 2.7, 3.2, 4.0])'
	  ],
	  'seealso': [
	    //'sum',
	    //'prod',
	    //'avg',
	    //'var',
	    //'std',
		  'max',
	    'min'
	    //'median'
	  ]
	};


/***/ },
/* 199 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'max',
	  'category': 'Statistics',
	  'syntax': [
	    'max(a, b, c, ...)',
	    'max(A)',
	    'max(A, dim)'
	  ],
	  'description': 'Compute the maximum value of a list of values.',
	  'examples': [
	    'max(2, 3, 4, 1)',
	    'max([2, 3, 4, 1])',
	    'max([2, 5; 4, 3], 0)',
	    'max([2, 5; 4, 3], 1)',
	    'max(2.7, 7.1, -4.5, 2.0, 4.1)',
	    'min(2.7, 7.1, -4.5, 2.0, 4.1)'
	  ],
	  'seealso': [
	    //'sum',
	    //'prod',
	    //'avg',
	    //'var',
	    //'std',
	    'mean',
	    //'median',
	    'min'
	  ]
	};


/***/ },
/* 200 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'acos',
	  'category': 'Trigonometry',
	  'syntax': [
	    'acos(x)'
	  ],
	  'description': 'Compute the inverse cosine of a value in radians.',
	  'examples': [
	    'acos(0.5)',
	    'acos(cos(2.3))'
	  ],
	  'seealso': [
	    'cos',
	    'acos',
	    'asin'
	  ]
	};


/***/ },
/* 201 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'asin',
	  'category': 'Trigonometry',
	  'syntax': [
	    'asin(x)'
	  ],
	  'description': 'Compute the inverse sine of a value in radians.',
	  'examples': [
	    'asin(0.5)',
	    'asin(sin(2.3))'
	  ],
	  'seealso': [
	    'sin',
	    'acos',
	    'asin'
	  ]
	};


/***/ },
/* 202 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'atan',
	  'category': 'Trigonometry',
	  'syntax': [
	    'atan(x)'
	  ],
	  'description': 'Compute the inverse tangent of a value in radians.',
	  'examples': [
	    'atan(0.5)',
	    'atan(tan(2.3))'
	  ],
	  'seealso': [
	    'tan',
	    'acos',
	    'asin'
	  ]
	};


/***/ },
/* 203 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'atan2',
	  'category': 'Trigonometry',
	  'syntax': [
	    'atan2(y, x)'
	  ],
	  'description':
	      'Computes the principal value of the arc tangent of y/x in radians.',
	  'examples': [
	    'atan2(2, 2) / pi',
	    'angle = 60 deg in rad',
	    'x = cos(angle)',
	    'y = sin(angle)',
	    'atan2(y, x)'
	  ],
	  'seealso': [
	    'sin',
	    'cos',
	    'tan'
	  ]
	};


/***/ },
/* 204 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'cos',
	  'category': 'Trigonometry',
	  'syntax': [
	    'cos(x)'
	  ],
	  'description': 'Compute the cosine of x in radians.',
	  'examples': [
	    'cos(2)',
	    'cos(pi / 4) ^ 2',
	    'cos(180 deg)',
	    'cos(60 deg)',
	    'sin(0.2)^2 + cos(0.2)^2'
	  ],
	  'seealso': [
	    'acos',
	    'sin',
	    'tan'
	  ]
	};


/***/ },
/* 205 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'cot',
	  'category': 'Trigonometry',
	  'syntax': [
	    'cot(x)'
	  ],
	  'description': 'Compute the cotangent of x in radians. Defined as 1/tan(x)',
	  'examples': [
	    'cot(2)',
	    '1 / tan(2)'
	  ],
	  'seealso': [
	    'sec',
	    'csc',
	    'tan'
	  ]
	};


/***/ },
/* 206 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'csc',
	  'category': 'Trigonometry',
	  'syntax': [
	    'csc(x)'
	  ],
	  'description': 'Compute the cosecant of x in radians. Defined as 1/sin(x)',
	  'examples': [
	    'csc(2)',
	    '1 / sin(2)'
	  ],
	  'seealso': [
	    'sec',
	    'cot',
	    'sin'
	  ]
	};


/***/ },
/* 207 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'sec',
	  'category': 'Trigonometry',
	  'syntax': [
	    'sec(x)'
	  ],
	  'description': 'Compute the secant of x in radians. Defined as 1/cos(x)',
	  'examples': [
	    'sec(2)',
	    '1 / cos(2)'
	  ],
	  'seealso': [
	    'cot',
	    'csc',
	    'cos'
	  ]
	};


/***/ },
/* 208 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'sin',
	  'category': 'Trigonometry',
	  'syntax': [
	    'sin(x)'
	  ],
	  'description': 'Compute the sine of x in radians.',
	  'examples': [
	    'sin(2)',
	    'sin(pi / 4) ^ 2',
	    'sin(90 deg)',
	    'sin(30 deg)',
	    'sin(0.2)^2 + cos(0.2)^2'
	  ],
	  'seealso': [
	    'asin',
	    'cos',
	    'tan'
	  ]
	};


/***/ },
/* 209 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'tan',
	  'category': 'Trigonometry',
	  'syntax': [
	    'tan(x)'
	  ],
	  'description': 'Compute the tangent of x in radians.',
	  'examples': [
	    'tan(0.5)',
	    'sin(0.5) / cos(0.5)',
	    'tan(pi / 4)',
	    'tan(45 deg)'
	  ],
	  'seealso': [
	    'atan',
	    'sin',
	    'cos'
	  ]
	};


/***/ },
/* 210 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'to',
	  'category': 'Units',
	  'syntax': [
	    'x to unit',
	    'to(x, unit)'
	  ],
	  'description': 'Change the unit of a value.',
	  'examples': [
	    '5 inch in cm',
	    '3.2kg in g',
	    '16 bytes in bits'
	  ],
	  'seealso': []
	};


/***/ },
/* 211 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'clone',
	  'category': 'Utils',
	  'syntax': [
	    'clone(x)'
	  ],
	  'description': 'Clone a variable. Creates a copy of primitive variables,and a deep copy of matrices',
	  'examples': [
	    'clone(3.5)',
	    'clone(2 - 4i)',
	    'clone(45 deg)',
	    'clone([1, 2; 3, 4])',
	    'clone("hello world")'
	  ],
	  'seealso': []
	};


/***/ },
/* 212 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'map',
	  'category': 'Utils',
	  'syntax': [
	    'map(x, callback)'
	  ],
	  'description': 'Create a new matrix or array with the results of the callback function executed on each entry of the matrix/array.',
	  'examples': [
	    'map([1, 2, 3], function(val) { return math.max(val, 1.5) })'
	  ],
	  'seealso': []
	};


/***/ },
/* 213 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'forEach',
	  'category': 'Utils',
	  'syntax': [
	    'forEach(x, callback)'
	  ],
	  'description': 'Iterates over all elements of a matrix/array, and executes the given callback.',
	  'examples': [
	    'forEach([1, 2, 3], function(val) { console.log(val) })'
	  ],
	  'seealso': []
	};


/***/ },
/* 214 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'format',
	  'category': 'Utils',
	  'syntax': [
	    'format(value)',
	    'format(value, precision)'
	  ],
	  'description': 'Format a value of any type as string.',
	  'examples': [
	    'format(2.3)',
	    'format(3 - 4i)',
	    'format([])',
	    'format(pi, 3)'
	  ],
	  'seealso': ['print']
	};


/***/ },
/* 215 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'import',
	  'category': 'Utils',
	  'syntax': [
	    'import(string)'
	  ],
	  'description': 'Import functions from a file.',
	  'examples': [
	    'import("numbers")',
	    'import("./mylib.js")'
	  ],
	  'seealso': []
	};


/***/ },
/* 216 */
/***/ function(module, exports, require) {

	module.exports = {
	  'name': 'typeof',
	  'category': 'Utils',
	  'syntax': [
	    'typeof(x)'
	  ],
	  'description': 'Get the type of a variable.',
	  'examples': [
	    'typeof(3.5)',
	    'typeof(2 - 4i)',
	    'typeof(45 deg)',
	    'typeof("hello world")'
	  ],
	  'seealso': []
	};


/***/ },
/* 217 */
/***/ function(module, exports, require) {

	/**
	 * Determine the type of a variable
	 *
	 *     typeof(x)
	 *
	 * @param {*} x
	 * @return {String} type  Lower case type, for example 'number', 'string',
	 *                        'array', 'date'.
	 */
	exports.type = function type (x) {
	  var type = typeof x;

	  if (type === 'object') {
	    if (x === null) {
	      return 'null';
	    }
	    if (x instanceof Boolean) {
	      return 'boolean';
	    }
	    if (x instanceof Number) {
	      return 'number';
	    }
	    if (x instanceof String) {
	      return 'string';
	    }
	    if (Array.isArray(x)) {
	      return 'array';
	    }
	    if (x instanceof Date) {
	      return 'date';
	    }
	  }

	  return type;
	};


/***/ },
/* 218 */
/***/ function(module, exports, require) {

	var number = require(221),
	    BigNumber = require(220);

	/**
	 * Test whether value is a String
	 * @param {*} value
	 * @return {Boolean} isString
	 */
	exports.isString = function isString(value) {
	  return (value instanceof String) || (typeof value == 'string');
	};

	/**
	 * Check if a text ends with a certain string.
	 * @param {String} text
	 * @param {String} search
	 */
	exports.endsWith = function endsWith(text, search) {
	  var start = text.length - search.length;
	  var end = text.length;
	  return (text.substring(start, end) === search);
	};

	/**
	 * Format a value of any type into a string.
	 *
	 * Usage:
	 *     math.format(value)
	 *     math.format(value, precision)
	 *
	 * If value is a function, the returned string is 'function' unless the function
	 * has a property `description`, in that case this properties value is returned.
	 *
	 * Example usage:
	 *     math.format(2/7);                // '0.2857142857142857'
	 *     math.format(math.pi, 3);         // '3.14'
	 *     math.format(new Complex(2, 3));  // '2 + 3i'
	 *     math.format('hello');            // '"hello"'
	 *
	 * @param {*} value             Value to be stringified
	 * @param {Object | Number | Function} [options]  Formatting options. See
	 *                                                lib/util/number:format for a
	 *                                                description of the available
	 *                                                options.
	 * @return {String} str
	 */
	exports.format = function format(value, options) {
	  if (number.isNumber(value) || value instanceof BigNumber) {
	    return number.format(value, options);
	  }

	  if (Array.isArray(value)) {
	    return formatArray(value, options);
	  }

	  if (exports.isString(value)) {
	    return '"' + value + '"';
	  }

	  if (typeof value === 'function') {
	    return value.syntax ? value.syntax + '' : 'function';
	  }

	  if (value instanceof Object) {
	    if (typeof value.format === 'function') {
	      return value.format(options);
	    }
	    else {
	      return value.toString();
	    }
	  }

	  return String(value);
	};

	/**
	 * Recursively format an n-dimensional matrix
	 * Example output: "[[1, 2], [3, 4]]"
	 * @param {Array} array
	 * @param {Object | Number | Function} [options]  Formatting options. See
	 *                                                lib/util/number:format for a
	 *                                                description of the available
	 *                                                options.
	 * @returns {String} str
	 */
	function formatArray (array, options) {
	  if (Array.isArray(array)) {
	    var str = '[';
	    var len = array.length;
	    for (var i = 0; i < len; i++) {
	      if (i != 0) {
	        str += ', ';
	      }
	      str += formatArray(array[i], options);
	    }
	    str += ']';
	    return str;
	  }
	  else {
	    return exports.format(array, options);
	  }
	}


/***/ },
/* 219 */
/***/ function(module, exports, require) {

	var map = {
		"./clone": 95,
		"./clone.js": 95,
		"./forEach": 101,
		"./forEach.js": 101,
		"./format": 96,
		"./format.js": 96,
		"./import": 97,
		"./import.js": 97,
		"./map": 98,
		"./map.js": 98,
		"./print": 99,
		"./print.js": 99,
		"./typeof": 100,
		"./typeof.js": 100
	};
	function webpackContext(req) {
		return require(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;


/***/ },
/* 220 */
/***/ function(module, exports, require) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* bignumber.js v1.3.0 https://github.com/MikeMcl/bignumber.js/LICENCE */

	/*jslint ass: true, bitwise: true, eqeq: true, plusplus: true, sub: true, white: true, maxerr: 500 */
	/*global module, define */

	;(function ( global ) {
	    'use strict';

	    /*
	      bignumber.js v1.3.0
	      A JavaScript library for arbitrary-precision arithmetic.
	      https://github.com/MikeMcl/bignumber.js
	      Copyright (c) 2012 Michael Mclaughlin <M8ch88l@gmail.com>
	      MIT Expat Licence
	    */

	    /*********************************** DEFAULTS ************************************/

	    /*
	     * The default values below must be integers within the stated ranges (inclusive).
	     * Most of these values can be changed during run-time using BigNumber.config().
	     */

	    /*
	     * The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP,
	     * MAX_EXP, and the argument to toFixed, toPrecision and toExponential, beyond
	     * which an exception is thrown (if ERRORS is true).
	     */
	    var MAX = 1E9,                                   // 0 to 1e+9

	        // Limit of magnitude of exponent argument to toPower.
	        MAX_POWER = 1E6,                             // 1 to 1e+6

	        // The maximum number of decimal places for operations involving division.
	        DECIMAL_PLACES = 20,                         // 0 to MAX

	        /*
	         * The rounding mode used when rounding to the above decimal places, and when
	         * using toFixed, toPrecision and toExponential, and round (default value).
	         * UP         0 Away from zero.
	         * DOWN       1 Towards zero.
	         * CEIL       2 Towards +Infinity.
	         * FLOOR      3 Towards -Infinity.
	         * HALF_UP    4 Towards nearest neighbour. If equidistant, up.
	         * HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
	         * HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
	         * HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
	         * HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
	         */
	        ROUNDING_MODE = 4,                           // 0 to 8

	        // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]

	        // The exponent value at and beneath which toString returns exponential notation.
	        // Number type: -7
	        TO_EXP_NEG = -7,                             // 0 to -MAX

	        // The exponent value at and above which toString returns exponential notation.
	        // Number type: 21
	        TO_EXP_POS = 21,                             // 0 to MAX

	        // RANGE : [MIN_EXP, MAX_EXP]

	        // The minimum exponent value, beneath which underflow to zero occurs.
	        // Number type: -324  (5e-324)
	        MIN_EXP = -MAX,                              // -1 to -MAX

	        // The maximum exponent value, above which overflow to Infinity occurs.
	        // Number type:  308  (1.7976931348623157e+308)
	        MAX_EXP = MAX,                               // 1 to MAX

	        // Whether BigNumber Errors are ever thrown.
	        // CHANGE parseInt to parseFloat if changing ERRORS to false.
	        ERRORS = true,                               // true or false
	        parse = parseInt,                            // parseInt or parseFloat

	    /***********************************************************************************/

	        P = BigNumber.prototype,
	        DIGITS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_',
	        outOfRange,
	        id = 0,
	        isValid = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
	        trim = String.prototype.trim || function () {return this.replace(/^\s+|\s+$/g, '')},
	        ONE = BigNumber(1);


	    // CONSTRUCTOR


	    /*
	     * The exported function.
	     * Create and return a new instance of a BigNumber object.
	     *
	     * n {number|string|BigNumber} A numeric value.
	     * [b] {number} The base of n. Integer, 2 to 64 inclusive.
	     */
	    function BigNumber( n, b ) {
	        var e, i, isNum, digits, valid, orig,
	            x = this;

	        // Enable constructor usage without new.
	        if ( !(x instanceof BigNumber) ) {
	            return new BigNumber( n, b )
	        }

	        // Duplicate.
	        if ( n instanceof BigNumber ) {
	            id = 0;

	            // e is undefined.
	            if ( b !== e ) {
	                n += ''
	            } else {
	                x['s'] = n['s'];
	                x['e'] = n['e'];
	                x['c'] = ( n = n['c'] ) ? n.slice() : n;
	                return;
	            }
	        }

	        // If number, check if minus zero.
	        if ( typeof n != 'string' ) {
	            n = ( isNum = typeof n == 'number' ||
	                Object.prototype.toString.call(n) == '[object Number]' ) &&
	                    n === 0 && 1 / n < 0 ? '-0' : n + '';
	        }

	        orig = n;

	        if ( b === e && isValid.test(n) ) {

	            // Determine sign.
	            x['s'] = n.charAt(0) == '-' ? ( n = n.slice(1), -1 ) : 1;

	        // Either n is not a valid BigNumber or a base has been specified.
	        } else {

	            // Enable exponential notation to be used with base 10 argument.
	            // Ensure return value is rounded to DECIMAL_PLACES as with other bases.
	            if ( b == 10 ) {

	                return setMode( n, DECIMAL_PLACES, ROUNDING_MODE );
	            }

	            n = trim.call(n).replace( /^\+(?!-)/, '' );

	            x['s'] = n.charAt(0) == '-' ? ( n = n.replace( /^-(?!-)/, '' ), -1 ) : 1;

	            if ( b != null ) {

	                if ( ( b == (b | 0) || !ERRORS ) &&
	                  !( outOfRange = !( b >= 2 && b < 65 ) ) ) {

	                    digits = '[' + DIGITS.slice( 0, b = b | 0 ) + ']+';

	                    // Before non-decimal number validity test and base conversion
	                    // remove the `.` from e.g. '1.', and replace e.g. '.1' with '0.1'.
	                    n = n.replace( /\.$/, '' ).replace( /^\./, '0.' );

	                    // Any number in exponential form will fail due to the e+/-.
	                    if ( valid = new RegExp(
	                      '^' + digits + '(?:\\.' + digits + ')?$', b < 37 ? 'i' : '' ).test(n) ) {

	                        if ( isNum ) {

	                            if ( n.replace( /^0\.0*|\./, '' ).length > 15 ) {

	                                // 'new BigNumber() number type has more than 15 significant digits: {n}'
	                                ifExceptionsThrow( orig, 0 );
	                            }

	                            // Prevent later check for length on converted number.
	                            isNum = !isNum;
	                        }
	                        n = convert( n, 10, b, x['s'] );

	                    } else if ( n != 'Infinity' && n != 'NaN' ) {

	                        // 'new BigNumber() not a base {b} number: {n}'
	                        ifExceptionsThrow( orig, 1, b );
	                        n = 'NaN';
	                    }
	                } else {

	                    // 'new BigNumber() base not an integer: {b}'
	                    // 'new BigNumber() base out of range: {b}'
	                    ifExceptionsThrow( b, 2 );

	                    // Ignore base.
	                    valid = isValid.test(n);
	                }
	            } else {
	                valid = isValid.test(n);
	            }

	            if ( !valid ) {

	                // Infinity/NaN
	                x['c'] = x['e'] = null;

	                // NaN
	                if ( n != 'Infinity' ) {

	                    // No exception on NaN.
	                    if ( n != 'NaN' ) {

	                        // 'new BigNumber() not a number: {n}'
	                        ifExceptionsThrow( orig, 3 );
	                    }
	                    x['s'] = null;
	                }
	                id = 0;

	                return;
	            }
	        }

	        // Decimal point?
	        if ( ( e = n.indexOf('.') ) > -1 ) {
	            n = n.replace( '.', '' );
	        }

	        // Exponential form?
	        if ( ( i = n.search( /e/i ) ) > 0 ) {

	            // Determine exponent.
	            if ( e < 0 ) {
	                e = i;
	            }
	            e += +n.slice( i + 1 );
	            n = n.substring( 0, i );

	        } else if ( e < 0 ) {

	            // Integer.
	            e = n.length;
	        }

	        // Determine leading zeros.
	        for ( i = 0; n.charAt(i) == '0'; i++ ) {
	        }

	        b = n.length;

	        // Disallow numbers with over 15 significant digits if number type.
	        if ( isNum && b > 15 && n.slice(i).length > 15 ) {

	            // 'new BigNumber() number type has more than 15 significant digits: {n}'
	            ifExceptionsThrow( orig, 0 );
	        }
	        id = 0;

	        // Overflow?
	        if ( ( e -= i + 1 ) > MAX_EXP ) {

	            // Infinity.
	            x['c'] = x['e'] = null;

	        // Zero or underflow?
	        } else if ( i == b || e < MIN_EXP ) {

	            // Zero.
	            x['c'] = [ x['e'] = 0 ];
	        } else {

	            // Determine trailing zeros.
	            for ( ; n.charAt(--b) == '0'; ) {
	            }

	            x['e'] = e;
	            x['c'] = [];

	            // Convert string to array of digits (without leading and trailing zeros).
	            for ( e = 0; i <= b; x['c'][e++] = +n.charAt(i++) ) {
	            }
	        }
	    }


	    // CONSTRUCTOR PROPERTIES/METHODS


	    BigNumber['ROUND_UP'] = 0;
	    BigNumber['ROUND_DOWN'] = 1;
	    BigNumber['ROUND_CEIL'] = 2;
	    BigNumber['ROUND_FLOOR'] = 3;
	    BigNumber['ROUND_HALF_UP'] = 4;
	    BigNumber['ROUND_HALF_DOWN'] = 5;
	    BigNumber['ROUND_HALF_EVEN'] = 6;
	    BigNumber['ROUND_HALF_CEIL'] = 7;
	    BigNumber['ROUND_HALF_FLOOR'] = 8;


	    /*
	     * Configure infrequently-changing library-wide settings.
	     *
	     * Accept an object or an argument list, with one or many of the following
	     * properties or parameters respectively:
	     * [ DECIMAL_PLACES [, ROUNDING_MODE [, EXPONENTIAL_AT [, RANGE [, ERRORS ]]]]]
	     *
	     * E.g.
	     * BigNumber.config(20, 4) is equivalent to
	     * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
	     * Ignore properties/parameters set to null or undefined.
	     *
	     * Return an object with the properties current values.
	     */
	    BigNumber['config'] = function () {
	        var v, p,
	            i = 0,
	            r = {},
	            a = arguments,
	            o = a[0],
	            c = 'config',
	            inRange = function ( n, lo, hi ) {
	              return !( ( outOfRange = n < lo || n > hi ) ||
	                parse(n) != n && n !== 0 );
	            },
	            has = o && typeof o == 'object'
	              ? function () {if ( o.hasOwnProperty(p) ) return ( v = o[p] ) != null}
	              : function () {if ( a.length > i ) return ( v = a[i++] ) != null};

	        // [DECIMAL_PLACES] {number} Integer, 0 to MAX inclusive.
	        if ( has( p = 'DECIMAL_PLACES' ) ) {

	            if ( inRange( v, 0, MAX ) ) {
	                DECIMAL_PLACES = v | 0;
	            } else {

	                // 'config() DECIMAL_PLACES not an integer: {v}'
	                // 'config() DECIMAL_PLACES out of range: {v}'
	                ifExceptionsThrow( v, p, c );
	            }
	        }
	        r[p] = DECIMAL_PLACES;

	        // [ROUNDING_MODE] {number} Integer, 0 to 8 inclusive.
	        if ( has( p = 'ROUNDING_MODE' ) ) {

	            if ( inRange( v, 0, 8 ) ) {
	                ROUNDING_MODE = v | 0;
	            } else {

	                // 'config() ROUNDING_MODE not an integer: {v}'
	                // 'config() ROUNDING_MODE out of range: {v}'
	                ifExceptionsThrow( v, p, c );
	            }
	        }
	        r[p] = ROUNDING_MODE;

	        /*
	         * [EXPONENTIAL_AT] {number|number[]} Integer, -MAX to MAX inclusive or
	         * [ integer -MAX to 0 inclusive, 0 to MAX inclusive ].
	         */
	        if ( has( p = 'EXPONENTIAL_AT' ) ) {

	            if ( inRange( v, -MAX, MAX ) ) {
	                TO_EXP_NEG = -( TO_EXP_POS = ~~( v < 0 ? -v : +v ) );
	            } else if ( !outOfRange && v && inRange( v[0], -MAX, 0 ) &&
	              inRange( v[1], 0, MAX ) ) {
	                TO_EXP_NEG = ~~v[0];
	                TO_EXP_POS = ~~v[1];
	            } else {

	                // 'config() EXPONENTIAL_AT not an integer or not [integer, integer]: {v}'
	                // 'config() EXPONENTIAL_AT out of range or not [negative, positive: {v}'
	                ifExceptionsThrow( v, p, c, 1 );
	            }
	        }
	        r[p] = [ TO_EXP_NEG, TO_EXP_POS ];

	        /*
	         * [RANGE][ {number|number[]} Non-zero integer, -MAX to MAX inclusive or
	         * [ integer -MAX to -1 inclusive, integer 1 to MAX inclusive ].
	         */
	        if ( has( p = 'RANGE' ) ) {

	            if ( inRange( v, -MAX, MAX ) && ~~v ) {
	                MIN_EXP = -( MAX_EXP = ~~( v < 0 ? -v : +v ) );
	            } else if ( !outOfRange && v && inRange( v[0], -MAX, -1 ) &&
	              inRange( v[1], 1, MAX ) ) {
	                MIN_EXP = ~~v[0], MAX_EXP = ~~v[1];
	            } else {

	                // 'config() RANGE not a non-zero integer or not [integer, integer]: {v}'
	                // 'config() RANGE out of range or not [negative, positive: {v}'
	                ifExceptionsThrow( v, p, c, 1, 1 );
	            }
	        }
	        r[p] = [ MIN_EXP, MAX_EXP ];

	        // [ERRORS] {boolean|number} true, false, 1 or 0.
	        if ( has( p = 'ERRORS' ) ) {

	            if ( v === !!v || v === 1 || v === 0 ) {
	                parse = ( outOfRange = id = 0, ERRORS = !!v )
	                  ? parseInt
	                  : parseFloat;
	            } else {

	                // 'config() ERRORS not a boolean or binary digit: {v}'
	                ifExceptionsThrow( v, p, c, 0, 0, 1 );
	            }
	        }
	        r[p] = ERRORS;

	        return r;
	    };


	    // PRIVATE FUNCTIONS


	    // Assemble error messages. Throw BigNumber Errors.
	    function ifExceptionsThrow( arg, i, j, isArray, isRange, isErrors) {

	        if ( ERRORS ) {
	            var error,
	                method = ['new BigNumber', 'cmp', 'div', 'eq', 'gt', 'gte', 'lt',
	                     'lte', 'minus', 'mod', 'plus', 'times', 'toFr'
	                    ][ id ? id < 0 ? -id : id : 1 / id < 0 ? 1 : 0 ] + '()',
	                message = outOfRange ? ' out of range' : ' not a' +
	                  ( isRange ? ' non-zero' : 'n' ) + ' integer';

	            message = ( [
	                method + ' number type has more than 15 significant digits',
	                method + ' not a base ' + j + ' number',
	                method + ' base' + message,
	                method + ' not a number' ][i] ||
	                  j + '() ' + i + ( isErrors
	                    ? ' not a boolean or binary digit'
	                    : message + ( isArray
	                      ? ' or not [' + ( outOfRange
	                        ? ' negative, positive'
	                        : ' integer, integer' ) + ' ]'
	                      : '' ) ) ) + ': ' + arg;

	            outOfRange = id = 0;
	            error = new Error(message);
	            error['name'] = 'BigNumber Error';

	            throw error;
	        }
	    }


	    /*
	     * Convert a numeric string of baseIn to a numeric string of baseOut.
	     */
	    function convert( nStr, baseOut, baseIn, sign ) {
	        var e, dvs, dvd, nArr, fracArr, fracBN;

	        // Convert string of base bIn to an array of numbers of baseOut.
	        // Eg. strToArr('255', 10) where baseOut is 16, returns [15, 15].
	        // Eg. strToArr('ff', 16)  where baseOut is 10, returns [2, 5, 5].
	        function strToArr( str, bIn ) {
	            var j,
	                i = 0,
	                strL = str.length,
	                arrL,
	                arr = [0];

	            for ( bIn = bIn || baseIn; i < strL; i++ ) {

	                for ( arrL = arr.length, j = 0; j < arrL; arr[j] *= bIn, j++ ) {
	                }

	                for ( arr[0] += DIGITS.indexOf( str.charAt(i) ), j = 0;
	                      j < arr.length;
	                      j++ ) {

	                    if ( arr[j] > baseOut - 1 ) {

	                        if ( arr[j + 1] == null ) {
	                            arr[j + 1] = 0;
	                        }
	                        arr[j + 1] += arr[j] / baseOut ^ 0;
	                        arr[j] %= baseOut;
	                    }
	                }
	            }

	            return arr.reverse();
	        }

	        // Convert array to string.
	        // E.g. arrToStr( [9, 10, 11] ) becomes '9ab' (in bases above 11).
	        function arrToStr( arr ) {
	            var i = 0,
	                arrL = arr.length,
	                str = '';

	            for ( ; i < arrL; str += DIGITS.charAt( arr[i++] ) ) {
	            }

	            return str;
	        }

	        if ( baseIn < 37 ) {
	            nStr = nStr.toLowerCase();
	        }

	        /*
	         * If non-integer convert integer part and fraction part separately.
	         * Convert the fraction part as if it is an integer than use division to
	         * reduce it down again to a value less than one.
	         */
	        if ( ( e = nStr.indexOf( '.' ) ) > -1 ) {

	            /*
	             * Calculate the power to which to raise the base to get the number
	             * to divide the fraction part by after it has been converted as an
	             * integer to the required base.
	             */
	            e = nStr.length - e - 1;

	            // Use toFixed to avoid possible exponential notation.
	            dvs = strToArr( new BigNumber(baseIn)['pow'](e)['toF'](), 10 );

	            nArr = nStr.split('.');

	            // Convert the base of the fraction part (as integer).
	            dvd = strToArr( nArr[1] );

	            // Convert the base of the integer part.
	            nArr = strToArr( nArr[0] );

	            // Result will be a BigNumber with a value less than 1.
	            fracBN = divide( dvd, dvs, dvd.length - dvs.length, sign, baseOut,
	              // Is least significant digit of integer part an odd number?
	              nArr[nArr.length - 1] & 1 );

	            fracArr = fracBN['c'];

	            // e can be <= 0  ( if e == 0, fracArr is [0] or [1] ).
	            if ( e = fracBN['e'] ) {

	                // Append zeros according to the exponent of the result.
	                for ( ; ++e; fracArr.unshift(0) ) {
	                }

	                // Append the fraction part to the converted integer part.
	                nStr = arrToStr(nArr) + '.' + arrToStr(fracArr);

	            // fracArr is [1].
	            // Fraction digits rounded up, so increment last digit of integer part.
	            } else if ( fracArr[0] ) {

	                if ( nArr[ e = nArr.length - 1 ] < baseOut - 1 ) {
	                    ++nArr[e];
	                    nStr = arrToStr(nArr);
	                } else {
	                    nStr = new BigNumber( arrToStr(nArr),
	                      baseOut )['plus'](ONE)['toS'](baseOut);
	                }

	            // fracArr is [0]. No fraction digits.
	            } else {
	                nStr = arrToStr(nArr);
	            }
	        } else {

	            // Simple integer. Convert base.
	            nStr = arrToStr( strToArr(nStr) );
	        }

	        return nStr;
	    }


	    // Perform division in the specified base. Called by div and convert.
	    function divide( dvd, dvs, exp, s, base, isOdd ) {
	        var dvsL, dvsT, next, cmp, remI,
	            dvsZ = dvs.slice(),
	            dvdI = dvsL = dvs.length,
	            dvdL = dvd.length,
	            rem = dvd.slice( 0, dvsL ),
	            remL = rem.length,
	            quo = new BigNumber(ONE),
	            qc = quo['c'] = [],
	            qi = 0,
	            dig = DECIMAL_PLACES + ( quo['e'] = exp ) + 1;

	        quo['s'] = s;
	        s = dig < 0 ? 0 : dig;

	        // Add zeros to make remainder as long as divisor.
	        for ( ; remL++ < dvsL; rem.push(0) ) {
	        }

	        // Create version of divisor with leading zero.
	        dvsZ.unshift(0);

	        do {

	            // 'next' is how many times the divisor goes into the current remainder.
	            for ( next = 0; next < base; next++ ) {

	                // Compare divisor and remainder.
	                if ( dvsL != ( remL = rem.length ) ) {
	                    cmp = dvsL > remL ? 1 : -1;
	                } else {
	                    for ( remI = -1, cmp = 0; ++remI < dvsL; ) {

	                        if ( dvs[remI] != rem[remI] ) {
	                            cmp = dvs[remI] > rem[remI] ? 1 : -1;
	                            break;
	                        }
	                    }
	                }

	                // Subtract divisor from remainder (if divisor < remainder).
	                if ( cmp < 0 ) {

	                    // Remainder cannot be more than one digit longer than divisor.
	                    // Equalise lengths using divisor with extra leading zero?
	                    for ( dvsT = remL == dvsL ? dvs : dvsZ; remL; ) {

	                        if ( rem[--remL] < dvsT[remL] ) {

	                            for ( remI = remL;
	                              remI && !rem[--remI];
	                                rem[remI] = base - 1 ) {
	                            }
	                            --rem[remI];
	                            rem[remL] += base;
	                        }
	                        rem[remL] -= dvsT[remL];
	                    }
	                    for ( ; !rem[0]; rem.shift() ) {
	                    }
	                } else {
	                    break;
	                }
	            }

	            // Add the 'next' digit to the result array.
	            qc[qi++] = cmp ? next : ++next;

	            // Update the remainder.
	            rem[0] && cmp
	              ? ( rem[remL] = dvd[dvdI] || 0 )
	              : ( rem = [ dvd[dvdI] ] );

	        } while ( ( dvdI++ < dvdL || rem[0] != null ) && s-- );

	        // Leading zero? Do not remove if result is simply zero (qi == 1).
	        if ( !qc[0] && qi != 1 ) {

	            // There can't be more than one zero.
	            --quo['e'];
	            qc.shift();
	        }

	        // Round?
	        if ( qi > dig ) {
	            rnd( quo, DECIMAL_PLACES, base, isOdd, rem[0] != null );
	        }

	        // Overflow?
	        if ( quo['e'] > MAX_EXP ) {

	            // Infinity.
	            quo['c'] = quo['e'] = null;

	        // Underflow?
	        } else if ( quo['e'] < MIN_EXP ) {

	            // Zero.
	            quo['c'] = [quo['e'] = 0];
	        }

	        return quo;
	    }


	    /*
	     * Return a string representing the value of BigNumber n in normal or
	     * exponential notation rounded to the specified decimal places or
	     * significant digits.
	     * Called by toString, toExponential (exp 1), toFixed, and toPrecision (exp 2).
	     * d is the index (with the value in normal notation) of the digit that may be
	     * rounded up.
	     */
	    function format( n, d, exp ) {

	        // Initially, i is the number of decimal places required.
	        var i = d - (n = new BigNumber(n))['e'],
	            c = n['c'];

	        // +-Infinity or NaN?
	        if ( !c ) {
	            return n['toS']();
	        }

	        // Round?
	        if ( c.length > ++d ) {
	            rnd( n, i, 10 );
	        }

	        // Recalculate d if toFixed as n['e'] may have changed if value rounded up.
	        i = c[0] == 0 ? i + 1 : exp ? d : n['e'] + i + 1;

	        // Append zeros?
	        for ( ; c.length < i; c.push(0) ) {
	        }
	        i = n['e'];

	        /*
	         * toPrecision returns exponential notation if the number of significant
	         * digits specified is less than the number of digits necessary to
	         * represent the integer part of the value in normal notation.
	         */
	        return exp == 1 || exp == 2 && ( --d < i || i <= TO_EXP_NEG )

	          // Exponential notation.
	          ? ( n['s'] < 0 && c[0] ? '-' : '' ) + ( c.length > 1
	            ? ( c.splice( 1, 0, '.' ), c.join('') )
	            : c[0] ) + ( i < 0 ? 'e' : 'e+' ) + i

	          // Normal notation.
	          : n['toS']();
	    }


	    // Round if necessary.
	    // Called by divide, format, setMode and sqrt.
	    function rnd( x, dp, base, isOdd, r ) {
	        var xc = x['c'],
	            isNeg = x['s'] < 0,
	            half = base / 2,
	            i = x['e'] + dp + 1,

	            // 'next' is the digit after the digit that may be rounded up.
	            next = xc[i],

	            /*
	             * 'more' is whether there are digits after 'next'.
	             * E.g.
	             * 0.005 (e = -3) to be rounded to 0 decimal places (dp = 0) gives i = -2
	             * The 'next' digit is zero, and there ARE 'more' digits after it.
	             * 0.5 (e = -1) dp = 0 gives i = 0
	             * The 'next' digit is 5 and there are no 'more' digits after it.
	             */
	            more = r || i < 0 || xc[i + 1] != null;

	        r = ROUNDING_MODE < 4
	          ? ( next != null || more ) &&
	            ( ROUNDING_MODE == 0 ||
	               ROUNDING_MODE == 2 && !isNeg ||
	                 ROUNDING_MODE == 3 && isNeg )
	          : next > half || next == half &&
	            ( ROUNDING_MODE == 4 || more ||

	              /*
	               * isOdd is used in base conversion and refers to the least significant
	               * digit of the integer part of the value to be converted. The fraction
	               * part is rounded by this method separately from the integer part.
	               */
	              ROUNDING_MODE == 6 && ( xc[i - 1] & 1 || !dp && isOdd ) ||
	                ROUNDING_MODE == 7 && !isNeg ||
	                  ROUNDING_MODE == 8 && isNeg );

	        if ( i < 1 || !xc[0] ) {
	            xc.length = 0;
	            xc.push(0);

	            if ( r ) {

	                // 1, 0.1, 0.01, 0.001, 0.0001 etc.
	                xc[0] = 1;
	                x['e'] = -dp;
	            } else {

	                // Zero.
	                x['e'] = 0;
	            }

	            return x;
	        }

	        // Remove any digits after the required decimal places.
	        xc.length = i--;

	        // Round up?
	        if ( r ) {

	            // Rounding up may mean the previous digit has to be rounded up and so on.
	            for ( --base; ++xc[i] > base; ) {
	                xc[i] = 0;

	                if ( !i-- ) {
	                    ++x['e'];
	                    xc.unshift(1);
	                }
	            }
	        }

	        // Remove trailing zeros.
	        for ( i = xc.length; !xc[--i]; xc.pop() ) {
	        }

	        return x;
	    }


	    // Round after setting the appropriate rounding mode.
	    // Handles ceil, floor and round.
	    function setMode( x, dp, rm ) {
	        var r = ROUNDING_MODE;

	        ROUNDING_MODE = rm;
	        x = new BigNumber(x);
	        x['c'] && rnd( x, dp, 10 );
	        ROUNDING_MODE = r;

	        return x;
	    }


	    // PROTOTYPE/INSTANCE METHODS


	    /*
	     * Return a new BigNumber whose value is the absolute value of this BigNumber.
	     */
	    P['abs'] = P['absoluteValue'] = function () {
	        var x = new BigNumber(this);

	        if ( x['s'] < 0 ) {
	            x['s'] = 1;
	        }

	        return x;
	    };


	    /*
	     * Return a new BigNumber whose value is the value of this BigNumber
	     * rounded to a whole number in the direction of Infinity.
	     */
	    P['ceil'] = function () {
	        return setMode( this, 0, 2 );
	    };


	    /*
	     * Return
	     * 1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
	     * -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
	     * 0 if they have the same value,
	     * or null if the value of either is NaN.
	     */
	    P['comparedTo'] = P['cmp'] = function ( y, b ) {
	        var a,
	            x = this,
	            xc = x['c'],
	            yc = ( id = -id, y = new BigNumber( y, b ) )['c'],
	            i = x['s'],
	            j = y['s'],
	            k = x['e'],
	            l = y['e'];

	        // Either NaN?
	        if ( !i || !j ) {
	            return null;
	        }

	        a = xc && !xc[0], b = yc && !yc[0];

	        // Either zero?
	        if ( a || b ) {
	            return a ? b ? 0 : -j : i;
	        }

	        // Signs differ?
	        if ( i != j ) {
	            return i;
	        }

	        // Either Infinity?
	        if ( a = i < 0, b = k == l, !xc || !yc ) {
	            return b ? 0 : !xc ^ a ? 1 : -1;
	        }

	        // Compare exponents.
	        if ( !b ) {
	            return k > l ^ a ? 1 : -1;
	        }

	        // Compare digit by digit.
	        for ( i = -1,
	              j = ( k = xc.length ) < ( l = yc.length ) ? k : l;
	              ++i < j; ) {

	            if ( xc[i] != yc[i] ) {
	                return xc[i] > yc[i] ^ a ? 1 : -1;
	            }
	        }
	        // Compare lengths.
	        return k == l ? 0 : k > l ^ a ? 1 : -1;
	    };


	    /*
	     *  n / 0 = I
	     *  n / N = N
	     *  n / I = 0
	     *  0 / n = 0
	     *  0 / 0 = N
	     *  0 / N = N
	     *  0 / I = 0
	     *  N / n = N
	     *  N / 0 = N
	     *  N / N = N
	     *  N / I = N
	     *  I / n = I
	     *  I / 0 = I
	     *  I / N = N
	     *  I / I = N
	     *
	     * Return a new BigNumber whose value is the value of this BigNumber
	     * divided by the value of BigNumber(y, b), rounded according to
	     * DECIMAL_PLACES and ROUNDING_MODE.
	     */
	    P['dividedBy'] = P['div'] = function ( y, b ) {
	        var xc = this['c'],
	            xe = this['e'],
	            xs = this['s'],
	            yc = ( id = 2, y = new BigNumber( y, b ) )['c'],
	            ye = y['e'],
	            ys = y['s'],
	            s = xs == ys ? 1 : -1;

	        // Either NaN/Infinity/0?
	        return !xe && ( !xc || !xc[0] ) || !ye && ( !yc || !yc[0] )

	          // Either NaN?
	          ? new BigNumber( !xs || !ys ||

	            // Both 0 or both Infinity?
	            ( xc ? yc && xc[0] == yc[0] : !yc )

	              // Return NaN.
	              ? NaN

	              // x is 0 or y is Infinity?
	              : xc && xc[0] == 0 || !yc

	                // Return +-0.
	                ? s * 0

	                // y is 0. Return +-Infinity.
	                : s / 0 )

	          : divide( xc, yc, xe - ye, s, 10 );
	    };


	    /*
	     * Return true if the value of this BigNumber is equal to the value of
	     * BigNumber(n, b), otherwise returns false.
	     */
	    P['equals'] = P['eq'] = function ( n, b ) {
	        id = 3;
	        return this['cmp']( n, b ) === 0;
	    };


	    /*
	     * Return a new BigNumber whose value is the value of this BigNumber
	     * rounded to a whole number in the direction of -Infinity.
	     */
	    P['floor'] = function () {
	        return setMode( this, 0, 3 );
	    };


	    /*
	     * Return true if the value of this BigNumber is greater than the value of
	     * BigNumber(n, b), otherwise returns false.
	     */
	    P['greaterThan'] = P['gt'] = function ( n, b ) {
	        id = 4;
	        return this['cmp']( n, b ) > 0;
	    };


	    /*
	     * Return true if the value of this BigNumber is greater than or equal to
	     * the value of BigNumber(n, b), otherwise returns false.
	     */
	    P['greaterThanOrEqualTo'] = P['gte'] = function ( n, b ) {
	        id = 5;
	        return ( b = this['cmp']( n, b ) ) == 1 || b === 0;
	    };


	    /*
	     * Return true if the value of this BigNumber is a finite number, otherwise
	     * returns false.
	     */
	    P['isFinite'] = P['isF'] = function () {
	        return !!this['c'];
	    };


	    /*
	     * Return true if the value of this BigNumber is NaN, otherwise returns
	     * false.
	     */
	    P['isNaN'] = function () {
	        return !this['s'];
	    };


	    /*
	     * Return true if the value of this BigNumber is negative, otherwise
	     * returns false.
	     */
	    P['isNegative'] = P['isNeg'] = function () {
	        return this['s'] < 0;
	    };


	    /*
	     * Return true if the value of this BigNumber is 0 or -0, otherwise returns
	     * false.
	     */
	    P['isZero'] = P['isZ'] = function () {
	        return !!this['c'] && this['c'][0] == 0;
	    };


	    /*
	     * Return true if the value of this BigNumber is less than the value of
	     * BigNumber(n, b), otherwise returns false.
	     */
	    P['lessThan'] = P['lt'] = function ( n, b ) {
	        id = 6;
	        return this['cmp']( n, b ) < 0;
	    };


	    /*
	     * Return true if the value of this BigNumber is less than or equal to the
	     * value of BigNumber(n, b), otherwise returns false.
	     */
	    P['lessThanOrEqualTo'] = P['lte'] = function ( n, b ) {
	        id = 7;
	        return ( b = this['cmp']( n, b ) ) == -1 || b === 0;
	    };


	    /*
	     *  n - 0 = n
	     *  n - N = N
	     *  n - I = -I
	     *  0 - n = -n
	     *  0 - 0 = 0
	     *  0 - N = N
	     *  0 - I = -I
	     *  N - n = N
	     *  N - 0 = N
	     *  N - N = N
	     *  N - I = N
	     *  I - n = I
	     *  I - 0 = I
	     *  I - N = N
	     *  I - I = N
	     *
	     * Return a new BigNumber whose value is the value of this BigNumber minus
	     * the value of BigNumber(y, b).
	     */
	    P['minus'] = function ( y, b ) {
	        var d, i, j, xLTy,
	            x = this,
	            a = x['s'];

	        b = ( id = 8, y = new BigNumber( y, b ) )['s'];

	        // Either NaN?
	        if ( !a || !b ) {
	            return new BigNumber(NaN);
	        }

	        // Signs differ?
	        if ( a != b ) {
	            return y['s'] = -b, x['plus'](y);
	        }

	        var xc = x['c'],
	            xe = x['e'],
	            yc = y['c'],
	            ye = y['e'];

	        if ( !xe || !ye ) {

	            // Either Infinity?
	            if ( !xc || !yc ) {
	                return xc ? ( y['s'] = -b, y ) : new BigNumber( yc ? x : NaN );
	            }

	            // Either zero?
	            if ( !xc[0] || !yc[0] ) {

	                // y is non-zero?
	                return yc[0]
	                  ? ( y['s'] = -b, y )

	                  // x is non-zero?
	                  : new BigNumber( xc[0]
	                    ? x

	                    // Both are zero.
	                    // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
	                    : ROUNDING_MODE == 3 ? -0 : 0 );
	            }
	        }

	        // Determine which is the bigger number.
	        // Prepend zeros to equalise exponents.
	        if ( xc = xc.slice(), a = xe - ye ) {
	            d = ( xLTy = a < 0 ) ? ( a = -a, xc ) : ( ye = xe, yc );

	            for ( d.reverse(), b = a; b--; d.push(0) ) {
	            }
	            d.reverse();
	        } else {

	            // Exponents equal. Check digit by digit.
	            j = ( ( xLTy = xc.length < yc.length ) ? xc : yc ).length;

	            for ( a = b = 0; b < j; b++ ) {

	                if ( xc[b] != yc[b] ) {
	                    xLTy = xc[b] < yc[b];
	                    break;
	                }
	            }
	        }

	        // x < y? Point xc to the array of the bigger number.
	        if ( xLTy ) {
	            d = xc, xc = yc, yc = d;
	            y['s'] = -y['s'];
	        }

	        /*
	         * Append zeros to xc if shorter. No need to add zeros to yc if shorter
	         * as subtraction only needs to start at yc.length.
	         */
	        if ( ( b = -( ( j = xc.length ) - yc.length ) ) > 0 ) {

	            for ( ; b--; xc[j++] = 0 ) {
	            }
	        }

	        // Subtract yc from xc.
	        for ( b = yc.length; b > a; ){

	            if ( xc[--b] < yc[b] ) {

	                for ( i = b; i && !xc[--i]; xc[i] = 9 ) {
	                }
	                --xc[i];
	                xc[b] += 10;
	            }
	            xc[b] -= yc[b];
	        }

	        // Remove trailing zeros.
	        for ( ; xc[--j] == 0; xc.pop() ) {
	        }

	        // Remove leading zeros and adjust exponent accordingly.
	        for ( ; xc[0] == 0; xc.shift(), --ye ) {
	        }

	        /*
	         * No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
	         * when neither x or y are Infinity.
	         */

	        // Underflow?
	        if ( ye < MIN_EXP || !xc[0] ) {

	            /*
	             * Following IEEE 754 (2008) 6.3,
	             * n - n = +0  but  n - n = -0 when rounding towards -Infinity.
	             */
	            if ( !xc[0] ) {
	                y['s'] = ROUNDING_MODE == 3 ? -1 : 1;
	            }

	            // Result is zero.
	            xc = [ye = 0];
	        }

	        return y['c'] = xc, y['e'] = ye, y;
	    };


	    /*
	     *   n % 0 =  N
	     *   n % N =  N
	     *   0 % n =  0
	     *  -0 % n = -0
	     *   0 % 0 =  N
	     *   0 % N =  N
	     *   N % n =  N
	     *   N % 0 =  N
	     *   N % N =  N
	     *
	     * Return a new BigNumber whose value is the value of this BigNumber modulo
	     * the value of BigNumber(y, b).
	     */
	    P['modulo'] = P['mod'] = function ( y, b ) {
	        var x = this,
	            xc = x['c'],
	            yc = ( id = 9, y = new BigNumber( y, b ) )['c'],
	            i = x['s'],
	            j = y['s'];

	        // Is x or y NaN, or y zero?
	        b = !i || !j || yc && !yc[0];

	        if ( b || xc && !xc[0] ) {
	            return new BigNumber( b ? NaN : x );
	        }

	        x['s'] = y['s'] = 1;
	        b = y['cmp'](x) == 1;
	        x['s'] = i, y['s'] = j;

	        return b
	          ? new BigNumber(x)
	          : ( i = DECIMAL_PLACES, j = ROUNDING_MODE,
	            DECIMAL_PLACES = 0, ROUNDING_MODE = 1,
	              x = x['div'](y),
	                DECIMAL_PLACES = i, ROUNDING_MODE = j,
	                  this['minus']( x['times'](y) ) );
	    };


	    /*
	     * Return a new BigNumber whose value is the value of this BigNumber
	     * negated, i.e. multiplied by -1.
	     */
	    P['negated'] = P['neg'] = function () {
	        var x = new BigNumber(this);

	        return x['s'] = -x['s'] || null, x;
	    };


	    /*
	     *  n + 0 = n
	     *  n + N = N
	     *  n + I = I
	     *  0 + n = n
	     *  0 + 0 = 0
	     *  0 + N = N
	     *  0 + I = I
	     *  N + n = N
	     *  N + 0 = N
	     *  N + N = N
	     *  N + I = N
	     *  I + n = I
	     *  I + 0 = I
	     *  I + N = N
	     *  I + I = I
	     *
	     * Return a new BigNumber whose value is the value of this BigNumber plus
	     * the value of BigNumber(y, b).
	     */
	    P['plus'] = function ( y, b ) {
	        var d,
	            x = this,
	            a = x['s'];

	        b = ( id = 10, y = new BigNumber( y, b ) )['s'];

	        // Either NaN?
	        if ( !a || !b ) {
	            return new BigNumber(NaN);
	        }

	        // Signs differ?
	        if ( a != b ) {
	            return y['s'] = -b, x['minus'](y);
	        }

	        var xe = x['e'],
	            xc = x['c'],
	            ye = y['e'],
	            yc = y['c'];

	        if ( !xe || !ye ) {

	            // Either Infinity?
	            if ( !xc || !yc ) {

	                // Return +-Infinity.
	                return new BigNumber( a / 0 );
	            }

	            // Either zero?
	            if ( !xc[0] || !yc[0] ) {

	                // y is non-zero?
	                return yc[0]
	                  ? y

	                  // x is non-zero?
	                  : new BigNumber( xc[0]
	                    ? x

	                    // Both are zero. Return zero.
	                    : a * 0 );
	            }
	        }

	        // Prepend zeros to equalise exponents.
	        // Note: Faster to use reverse then do unshifts.
	        if ( xc = xc.slice(), a = xe - ye ) {
	            d = a > 0 ? ( ye = xe, yc ) : ( a = -a, xc );

	            for ( d.reverse(); a--; d.push(0) ) {
	            }
	            d.reverse();
	        }

	        // Point xc to the longer array.
	        if ( xc.length - yc.length < 0 ) {
	            d = yc, yc = xc, xc = d;
	        }

	        /*
	         * Only start adding at yc.length - 1 as the
	         * further digits of xc can be left as they are.
	         */
	        for ( a = yc.length, b = 0; a;
	             b = ( xc[--a] = xc[a] + yc[a] + b ) / 10 ^ 0, xc[a] %= 10 ) {
	        }

	        // No need to check for zero, as +x + +y != 0 && -x + -y != 0

	        if ( b ) {
	            xc.unshift(b);

	            // Overflow? (MAX_EXP + 1 possible)
	            if ( ++ye > MAX_EXP ) {

	                // Infinity.
	                xc = ye = null;
	            }
	        }

	         // Remove trailing zeros.
	        for ( a = xc.length; xc[--a] == 0; xc.pop() ) {
	        }

	        return y['c'] = xc, y['e'] = ye, y;
	    };


	    /*
	     * Return a BigNumber whose value is the value of this BigNumber raised to
	     * the power e. If e is negative round according to DECIMAL_PLACES and
	     * ROUNDING_MODE.
	     *
	     * e {number} Integer, -MAX_POWER to MAX_POWER inclusive.
	     */
	    P['toPower'] = P['pow'] = function ( e ) {

	        // e to integer, avoiding NaN or Infinity becoming 0.
	        var i = e * 0 == 0 ? e | 0 : e,
	            x = new BigNumber(this),
	            y = new BigNumber(ONE);

	        // Use Math.pow?
	        // Pass +-Infinity for out of range exponents.
	        if ( ( ( ( outOfRange = e < -MAX_POWER || e > MAX_POWER ) &&
	          (i = e * 1 / 0) ) ||

	             /*
	              * Any exponent that fails the parse becomes NaN.
	              *
	              * Include 'e !== 0' because on Opera -0 == parseFloat(-0) is false,
	              * despite -0 === parseFloat(-0) && -0 == parseFloat('-0') is true.
	              */
	             parse(e) != e && e !== 0 && !(i = NaN) ) &&

	              // 'pow() exponent not an integer: {e}'
	              // 'pow() exponent out of range: {e}'
	              !ifExceptionsThrow( e, 'exponent', 'pow' ) ||

	                // Pass zero to Math.pow, as any value to the power zero is 1.
	                !i ) {

	            // i is +-Infinity, NaN or 0.
	            return new BigNumber( Math.pow( x['toS'](), i ) );
	        }

	        for ( i = i < 0 ? -i : i; ; ) {

	            if ( i & 1 ) {
	                y = y['times'](x);
	            }
	            i >>= 1;

	            if ( !i ) {
	                break;
	            }
	            x = x['times'](x);
	        }

	        return e < 0 ? ONE['div'](y) : y;
	    };


	    /*
	     * Return a new BigNumber whose value is the value of this BigNumber
	     * rounded to a maximum of dp decimal places using rounding mode rm, or to
	     * 0 and ROUNDING_MODE respectively if omitted.
	     *
	     * [dp] {number} Integer, 0 to MAX inclusive.
	     * [rm] {number} Integer, 0 to 8 inclusive.
	     */
	    P['round'] = function ( dp, rm ) {

	        dp = dp == null || ( ( ( outOfRange = dp < 0 || dp > MAX ) ||
	          parse(dp) != dp ) &&

	            // 'round() decimal places out of range: {dp}'
	            // 'round() decimal places not an integer: {dp}'
	            !ifExceptionsThrow( dp, 'decimal places', 'round' ) )
	              ? 0
	              : dp | 0;

	        rm = rm == null || ( ( ( outOfRange = rm < 0 || rm > 8 ) ||

	          // Include '&& rm !== 0' because with Opera -0 == parseFloat(-0) is false.
	          parse(rm) != rm && rm !== 0 ) &&

	            // 'round() mode not an integer: {rm}'
	            // 'round() mode out of range: {rm}'
	            !ifExceptionsThrow( rm, 'mode', 'round' ) )
	              ? ROUNDING_MODE
	              : rm | 0;

	        return setMode( this, dp, rm );
	    };


	    /*
	     *  sqrt(-n) =  N
	     *  sqrt( N) =  N
	     *  sqrt(-I) =  N
	     *  sqrt( I) =  I
	     *  sqrt( 0) =  0
	     *  sqrt(-0) = -0
	     *
	     * Return a new BigNumber whose value is the square root of the value of
	     * this BigNumber, rounded according to DECIMAL_PLACES and ROUNDING_MODE.
	     */
	    P['squareRoot'] = P['sqrt'] = function () {
	        var n, r, re, t,
	            x = this,
	            c = x['c'],
	            s = x['s'],
	            e = x['e'],
	            dp = DECIMAL_PLACES,
	            rm = ROUNDING_MODE,
	            half = new BigNumber('0.5');

	        // Negative/NaN/Infinity/zero?
	        if ( s !== 1 || !c || !c[0] ) {

	            return new BigNumber( !s || s < 0 && ( !c || c[0] )
	              ? NaN
	              : c ? x : 1 / 0 );
	        }

	        // Initial estimate.
	        s = Math.sqrt( x['toS']() );
	        ROUNDING_MODE = 1;

	        /*
	          Math.sqrt underflow/overflow?
	          Pass x to Math.sqrt as integer, then adjust the exponent of the result.
	         */
	        if ( s == 0 || s == 1 / 0 ) {
	            n = c.join('');

	            if ( !( n.length + e & 1 ) ) {
	                n += '0';
	            }
	            r = new BigNumber( Math.sqrt(n) + '' );

	            // r may still not be finite.
	            if ( !r['c'] ) {
	                r['c'] = [1];
	            }
	            r['e'] = ( ( ( e + 1 ) / 2 ) | 0 ) - ( e < 0 || e & 1 );
	        } else {
	            r = new BigNumber( n = s.toString() );
	        }
	        re = r['e'];
	        s = re + ( DECIMAL_PLACES += 4 );

	        if ( s < 3 ) {
	            s = 0;
	        }
	        e = s;

	        // Newton-Raphson iteration.
	        for ( ; ; ) {
	            t = r;
	            r = half['times']( t['plus']( x['div'](t) ) );

	            if ( t['c'].slice( 0, s ).join('') === r['c'].slice( 0, s ).join('') ) {
	                c = r['c'];

	                /*
	                  The exponent of r may here be one less than the final result
	                  exponent (re), e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust
	                  s so the rounding digits are indexed correctly.
	                 */
	                s = s - ( n && r['e'] < re );

	                /*
	                  The 4th rounding digit may be in error by -1 so if the 4 rounding
	                  digits are 9999 or 4999 (i.e. approaching a rounding boundary)
	                  continue the iteration.
	                 */
	                if ( c[s] == 9 && c[s - 1] == 9 && c[s - 2] == 9 &&
	                        ( c[s - 3] == 9 || n && c[s - 3] == 4 ) ) {

	                    /*
	                      If 9999 on first run through, check to see if rounding up
	                      gives the exact result as the nines may infinitely repeat.
	                     */
	                    if ( n && c[s - 3] == 9 ) {
	                        t = r['round']( dp, 0 );

	                        if ( t['times'](t)['eq'](x) ) {
	                            ROUNDING_MODE = rm;
	                            DECIMAL_PLACES = dp;

	                            return t;
	                        }
	                    }
	                    DECIMAL_PLACES += 4;
	                    s += 4;
	                    n = '';
	                } else {

	                    /*
	                      If the rounding digits are null, 0000 or 5000, check for an
	                      exact result. If not, then there are further digits so
	                      increment the 1st rounding digit to ensure correct rounding.
	                     */
	                    if ( !c[e] && !c[e - 1] && !c[e - 2] &&
	                            ( !c[e - 3] || c[e - 3] == 5 ) ) {

	                        // Truncate to the first rounding digit.
	                        if ( c.length > e - 2 ) {
	                            c.length = e - 2;
	                        }

	                        if ( !r['times'](r)['eq'](x) ) {

	                            while ( c.length < e - 3 ) {
	                                c.push(0);
	                            }
	                            c[e - 3]++;
	                        }
	                    }
	                    ROUNDING_MODE = rm;
	                    rnd( r, DECIMAL_PLACES = dp, 10 );

	                    return r;
	                }
	            }
	        }
	    };


	    /*
	     *  n * 0 = 0
	     *  n * N = N
	     *  n * I = I
	     *  0 * n = 0
	     *  0 * 0 = 0
	     *  0 * N = N
	     *  0 * I = N
	     *  N * n = N
	     *  N * 0 = N
	     *  N * N = N
	     *  N * I = N
	     *  I * n = I
	     *  I * 0 = N
	     *  I * N = N
	     *  I * I = I
	     *
	     * Return a new BigNumber whose value is the value of this BigNumber times
	     * the value of BigNumber(y, b).
	     */
	    P['times'] = function ( y, b ) {
	        var c,
	            x = this,
	            xc = x['c'],
	            yc = ( id = 11, y = new BigNumber( y, b ) )['c'],
	            i = x['e'],
	            j = y['e'],
	            a = x['s'];

	        y['s'] = a == ( b = y['s'] ) ? 1 : -1;

	        // Either NaN/Infinity/0?
	        if ( !i && ( !xc || !xc[0] ) || !j && ( !yc || !yc[0] ) ) {

	            // Either NaN?
	            return new BigNumber( !a || !b ||

	              // x is 0 and y is Infinity  or  y is 0 and x is Infinity?
	              xc && !xc[0] && !yc || yc && !yc[0] && !xc

	                // Return NaN.
	                ? NaN

	                // Either Infinity?
	                : !xc || !yc

	                  // Return +-Infinity.
	                  ? y['s'] / 0

	                  // x or y is 0. Return +-0.
	                  : y['s'] * 0 );
	        }
	        y['e'] = i + j;

	        if ( ( a = xc.length ) < ( b = yc.length ) ) {
	            c = xc, xc = yc, yc = c, j = a, a = b, b = j;
	        }

	        for ( j = a + b, c = []; j--; c.push(0) ) {
	        }

	        // Multiply!
	        for ( i = b - 1; i > -1; i-- ) {

	            for ( b = 0, j = a + i;
	                  j > i;
	                  b = c[j] + yc[i] * xc[j - i - 1] + b,
	                  c[j--] = b % 10 | 0,
	                  b = b / 10 | 0 ) {
	            }

	            if ( b ) {
	                c[j] = ( c[j] + b ) % 10;
	            }
	        }

	        b && ++y['e'];

	        // Remove any leading zero.
	        !c[0] && c.shift();

	        // Remove trailing zeros.
	        for ( j = c.length; !c[--j]; c.pop() ) {
	        }

	        // No zero check needed as only x * 0 == 0 etc.

	        // Overflow?
	        y['c'] = y['e'] > MAX_EXP

	          // Infinity.
	          ? ( y['e'] = null )

	          // Underflow?
	          : y['e'] < MIN_EXP

	            // Zero.
	            ? [ y['e'] = 0 ]

	            // Neither.
	            : c;

	        return y;
	    };


	    /*
	     * Return a string representing the value of this BigNumber in exponential
	     * notation to dp fixed decimal places and rounded using ROUNDING_MODE if
	     * necessary.
	     *
	     * [dp] {number} Integer, 0 to MAX inclusive.
	     */
	    P['toExponential'] = P['toE'] = function ( dp ) {

	        return format( this,
	          ( dp == null || ( ( outOfRange = dp < 0 || dp > MAX ) ||

	            /*
	             * Include '&& dp !== 0' because with Opera -0 == parseFloat(-0) is
	             * false, despite -0 == parseFloat('-0') && 0 == -0 being true.
	             */
	            parse(dp) != dp && dp !== 0 ) &&

	              // 'toE() decimal places not an integer: {dp}'
	              // 'toE() decimal places out of range: {dp}'
	              !ifExceptionsThrow( dp, 'decimal places', 'toE' ) ) && this['c']
	                ? this['c'].length - 1
	                : dp | 0, 1 );
	    };


	    /*
	     * Return a string representing the value of this BigNumber in normal
	     * notation to dp fixed decimal places and rounded using ROUNDING_MODE if
	     * necessary.
	     *
	     * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
	     * but e.g. (-0.00001).toFixed(0) is '-0'.
	     *
	     * [dp] {number} Integer, 0 to MAX inclusive.
	     */
	    P['toFixed'] = P['toF'] = function ( dp ) {
	        var n, str, d,
	            x = this;

	        if ( !( dp == null || ( ( outOfRange = dp < 0 || dp > MAX ) ||
	            parse(dp) != dp && dp !== 0 ) &&

	            // 'toF() decimal places not an integer: {dp}'
	            // 'toF() decimal places out of range: {dp}'
	            !ifExceptionsThrow( dp, 'decimal places', 'toF' ) ) ) {
	              d = x['e'] + ( dp | 0 );
	        }

	        n = TO_EXP_NEG, dp = TO_EXP_POS;
	        TO_EXP_NEG = -( TO_EXP_POS = 1 / 0 );

	        // Note: str is initially undefined.
	        if ( d == str ) {
	            str = x['toS']();
	        } else {
	            str = format( x, d );

	            // (-0).toFixed() is '0', but (-0.1).toFixed() is '-0'.
	            // (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
	            if ( x['s'] < 0 && x['c'] ) {

	                // As e.g. -0 toFixed(3), will wrongly be returned as -0.000 from toString.
	                if ( !x['c'][0] ) {
	                    str = str.replace(/^-/, '');

	                // As e.g. -0.5 if rounded to -0 will cause toString to omit the minus sign.
	                } else if ( str.indexOf('-') < 0 ) {
	                    str = '-' + str;
	                }
	            }
	        }
	        TO_EXP_NEG = n, TO_EXP_POS = dp;

	        return str;
	    };


	    /*
	     * Return a string array representing the value of this BigNumber as a
	     * simple fraction with an integer numerator and an integer denominator.
	     * The denominator will be a positive non-zero value less than or equal to
	     * the specified maximum denominator. If a maximum denominator is not
	     * specified, the denominator will be the lowest value necessary to
	     * represent the number exactly.
	     *
	     * [maxD] {number|string|BigNumber} Integer >= 1 and < Infinity.
	     */
	    P['toFraction'] = P['toFr'] = function ( maxD ) {
	        var q, frac, n0, d0, d2, n, e,
	            n1 = d0 = new BigNumber(ONE),
	            d1 = n0 = new BigNumber('0'),
	            x = this,
	            xc = x['c'],
	            exp = MAX_EXP,
	            dp = DECIMAL_PLACES,
	            rm = ROUNDING_MODE,
	            d = new BigNumber(ONE);

	        // NaN, Infinity.
	        if ( !xc ) {
	            return x['toS']();
	        }

	        e = d['e'] = xc.length - x['e'] - 1;

	        // If max denominator is undefined or null...
	        if ( maxD == null ||

	             // or NaN...
	             ( !( id = 12, n = new BigNumber(maxD) )['s'] ||

	               // or less than 1, or Infinity...
	               ( outOfRange = n['cmp'](n1) < 0 || !n['c'] ) ||

	                 // or not an integer...
	                 ( ERRORS && n['e'] < n['c'].length - 1 ) ) &&

	                   // 'toFr() max denominator not an integer: {maxD}'
	                   // 'toFr() max denominator out of range: {maxD}'
	                   !ifExceptionsThrow( maxD, 'max denominator', 'toFr' ) ||

	                     // or greater than the maxD needed to specify the value exactly...
	                     ( maxD = n )['cmp'](d) > 0 ) {

	            // d is e.g. 10, 100, 1000, 10000... , n1 is 1.
	            maxD = e > 0 ? d : n1;
	        }

	        MAX_EXP = 1 / 0;
	        n = new BigNumber( xc.join('') );

	        for ( DECIMAL_PLACES = 0, ROUNDING_MODE = 1; ; )  {
	            q = n['div'](d);
	            d2 = d0['plus']( q['times'](d1) );

	            if ( d2['cmp'](maxD) == 1 ) {
	                break;
	            }

	            d0 = d1, d1 = d2;

	            n1 = n0['plus']( q['times']( d2 = n1 ) );
	            n0 = d2;

	            d = n['minus']( q['times']( d2 = d ) );
	            n = d2;
	        }

	        d2 = maxD['minus'](d0)['div'](d1);
	        n0 = n0['plus']( d2['times'](n1) );
	        d0 = d0['plus']( d2['times'](d1) );

	        n0['s'] = n1['s'] = x['s'];

	        DECIMAL_PLACES = e * 2;
	        ROUNDING_MODE = rm;

	        // Determine which fraction is closer to x, n0 / d0 or n1 / d1?
	        frac = n1['div'](d1)['minus'](x)['abs']()['cmp'](
	          n0['div'](d0)['minus'](x)['abs']() ) < 1
	          ? [ n1['toS'](), d1['toS']() ]
	          : [ n0['toS'](), d0['toS']() ];

	        return MAX_EXP = exp, DECIMAL_PLACES = dp, frac;
	    };


	    /*
	     * Return a string representing the value of this BigNumber to sd significant
	     * digits and rounded using ROUNDING_MODE if necessary.
	     * If sd is less than the number of digits necessary to represent the integer
	     * part of the value in normal notation, then use exponential notation.
	     *
	     * sd {number} Integer, 1 to MAX inclusive.
	     */
	    P['toPrecision'] = P['toP'] = function ( sd ) {

	        /*
	         * ERRORS true: Throw if sd not undefined, null or an integer in range.
	         * ERRORS false: Ignore sd if not a number or not in range.
	         * Truncate non-integers.
	         */
	        return sd == null || ( ( ( outOfRange = sd < 1 || sd > MAX ) ||
	          parse(sd) != sd ) &&

	            // 'toP() precision not an integer: {sd}'
	            // 'toP() precision out of range: {sd}'
	            !ifExceptionsThrow( sd, 'precision', 'toP' ) )
	              ? this['toS']()
	              : format( this, --sd | 0, 2 );
	    };


	    /*
	     * Return a string representing the value of this BigNumber in base b, or
	     * base 10 if b is omitted. If a base is specified, including base 10,
	     * round according to DECIMAL_PLACES and ROUNDING_MODE.
	     * If a base is not specified, and this BigNumber has a positive exponent
	     * that is equal to or greater than TO_EXP_POS, or a negative exponent equal
	     * to or less than TO_EXP_NEG, return exponential notation.
	     *
	     * [b] {number} Integer, 2 to 64 inclusive.
	     */
	    P['toString'] = P['toS'] = function ( b ) {
	        var u, str, strL,
	            x = this,
	            xe = x['e'];

	        // Infinity or NaN?
	        if ( xe === null ) {
	            str = x['s'] ? 'Infinity' : 'NaN';

	        // Exponential format?
	        } else if ( b === u && ( xe <= TO_EXP_NEG || xe >= TO_EXP_POS ) ) {
	            return format( x, x['c'].length - 1, 1 );
	        } else {
	            str = x['c'].join('');

	            // Negative exponent?
	            if ( xe < 0 ) {

	                // Prepend zeros.
	                for ( ; ++xe; str = '0' + str ) {
	                }
	                str = '0.' + str;

	            // Positive exponent?
	            } else if ( strL = str.length, xe > 0 ) {

	                if ( ++xe > strL ) {

	                    // Append zeros.
	                    for ( xe -= strL; xe-- ; str += '0' ) {
	                    }
	                } else if ( xe < strL ) {
	                    str = str.slice( 0, xe ) + '.' + str.slice(xe);
	                }

	            // Exponent zero.
	            } else {
	                if ( u = str.charAt(0), strL > 1 ) {
	                    str = u + '.' + str.slice(1);

	                // Avoid '-0'
	                } else if ( u == '0' ) {
	                    return u;
	                }
	            }

	            if ( b != null ) {

	                if ( !( outOfRange = !( b >= 2 && b < 65 ) ) &&
	                  ( b == (b | 0) || !ERRORS ) ) {
	                    str = convert( str, b | 0, 10, x['s'] );

	                    // Avoid '-0'
	                    if ( str == '0' ) {
	                        return str;
	                    }
	                } else {

	                    // 'toS() base not an integer: {b}'
	                    // 'toS() base out of range: {b}'
	                    ifExceptionsThrow( b, 'base', 'toS' );
	                }
	            }

	        }

	        return x['s'] < 0 ? '-' + str : str;
	    };


	    /*
	     * Return as toString, but do not accept a base argument.
	     */
	    P['valueOf'] = function () {
	        return this['toS']();
	    };


	    // Add aliases for BigDecimal methods.
	    //P['add'] = P['plus'];
	    //P['subtract'] = P['minus'];
	    //P['multiply'] = P['times'];
	    //P['divide'] = P['div'];
	    //P['remainder'] = P['mod'];
	    //P['compareTo'] = P['cmp'];
	    //P['negate'] = P['neg'];


	    // EXPORT


	    // Node and other CommonJS-like environments that support module.exports.
	    if ( typeof module !== 'undefined' && module.exports ) {
	        module.exports = BigNumber;

	    //AMD.
	    } else if ( true ) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	            return BigNumber;
	        }.call(exports, require, exports, module)), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	    //Browser.
	    } else {
	        global['BigNumber'] = BigNumber;
	    }

	})( this );


/***/ },
/* 221 */
/***/ function(module, exports, require) {

	var BigNumber = require(220);

	/**
	 * Test whether value is a Number
	 * @param {*} value
	 * @return {Boolean} isNumber
	 */
	exports.isNumber = function isNumber(value) {
	  return (value instanceof Number) || (typeof value == 'number');
	};

	/**
	 * Check if a number is integer
	 * @param {Number | Boolean} value
	 * @return {Boolean} isInteger
	 */
	exports.isInteger = function isInteger(value) {
	  return (value == Math.round(value));
	  // Note: we use ==, not ===, as we can have Booleans as well
	};

	/**
	 * Calculate the sign of a number
	 * @param {Number} x
	 * @returns {*}
	 */
	exports.sign = function sign (x) {
	  if (x > 0) {
	    return 1;
	  }
	  else if (x < 0) {
	    return -1;
	  }
	  else {
	    return 0;
	  }
	};

	/**
	 * Convert a number to a formatted string representation.
	 *
	 * Syntax:
	 *
	 *    format(value)
	 *    format(value, options)
	 *    format(value, precision)
	 *    format(value, fn)
	 *
	 * Where:
	 *
	 *    {Number} value   The value to be formatted
	 *    {Object} options An object with formatting options. Available options:
	 *                     {String} notation
	 *                         Number notation. Choose from:
	 *                         'fixed'          Always use regular number notation.
	 *                                          For example '123.40' and '14000000'
	 *                         'exponential'    Always use exponential notation.
	 *                                          For example '1.234e+2' and '1.4e+7'
	 *                         'auto' (default) Regular number notation for numbers
	 *                                          having an absolute value between
	 *                                          `lower` and `upper` bounds, and uses
	 *                                          exponential notation elsewhere.
	 *                                          Lower bound is included, upper bound
	 *                                          is excluded.
	 *                                          For example '123.4' and '1.4e7'.
	 *                     {Number} precision   A number between 0 and 16 to round
	 *                                          the digits of the number.
	 *                                          In case of notations 'exponential' and
	 *                                          'auto', `precision` defines the total
	 *                                          number of significant digits returned
	 *                                          and is undefined by default.
	 *                                          In case of notation 'fixed',
	 *                                          `precision` defines the number of
	 *                                          significant digits after the decimal
	 *                                          point, and is 0 by default.
	 *                     {Object} exponential An object containing two parameters,
	 *                                          {Number} lower and {Number} upper,
	 *                                          used by notation 'auto' to determine
	 *                                          when to return exponential notation.
	 *                                          Default values are `lower=1e-3` and
	 *                                          `upper=1e5`.
	 *                                          Only applicable for notation `auto`.
	 *    {Function} fn    A custom formatting function. Can be used to override the
	 *                     built-in notations. Function `fn` is called with `value` as
	 *                     parameter and must return a string. Is useful for example to
	 *                     format all values inside a matrix in a particular way.
	 *
	 * Examples:
	 *
	 *    format(6.4);                                        // '6.4'
	 *    format(1240000);                                    // '1.24e6'
	 *    format(1/3);                                        // '0.3333333333333333'
	 *    format(1/3, 3);                                     // '0.333'
	 *    format(21385, 2);                                   // '21000'
	 *    format(12.071, {notation: 'fixed'});                // '12'
	 *    format(2.3,    {notation: 'fixed', precision: 2});  // '2.30'
	 *    format(52.8,   {notation: 'exponential'});          // '5.28e+1'
	 *
	 * @param {Number | BigNumber} value
	 * @param {Object | Function | Number} [options]
	 * @return {String} str The formatted value
	 */
	exports.format = function format(value, options) {
	  if (typeof options === 'function') {
	    // handle format(value, fn)
	    return options(value);
	  }

	  // handle special cases
	  if (value === Infinity) {
	    return 'Infinity';
	  }
	  else if (value === -Infinity) {
	    return '-Infinity';
	  }
	  else if (isNaN(value)) {
	    return 'NaN';
	  }

	  // default values for options
	  var notation = 'auto';
	  var precision = undefined;

	  if (options !== undefined) {
	    // determine notation from options
	    if (options.notation) {
	      notation = options.notation;
	    }

	    // determine precision from options
	    if (options) {
	      if (exports.isNumber(options)) {
	        precision = options;
	      }
	      else if (options.precision) {
	        precision = options.precision;
	      }
	    }
	  }

	  // handle the various notations
	  switch (notation) {
	    case 'fixed':
	      return exports.toFixed(value, precision);

	    // TODO: notation 'scientific' is deprecated since version 0.16.0, remove this some day
	    case 'scientific':
	      throw new Error('Format notation "scientific" is deprecated. Use "exponential" instead.');

	    case 'exponential':
	      return exports.toExponential(value, precision);

	    case 'auto':
	      // determine lower and upper bound for exponential notation.
	        // TODO: implement support for upper and lower to be BigNumbers themselves
	      var lower = 1e-3;
	      var upper = 1e5;
	      if (options && options.exponential) {
	        if (options.exponential.lower !== undefined) {
	          lower = options.exponential.lower;
	        }
	        if (options.exponential.upper !== undefined) {
	          upper = options.exponential.upper;
	        }
	      }
	      else if (options && options.scientific) {
	        // TODO: 'options.scientific' is deprecated since version 0.16.0, remove this some day
	        throw new Error('options.scientific is deprecated, use options.exponential instead.');
	      }

	      // adjust BigNumber configuration
	      var isBigNumber = value instanceof BigNumber;
	      if (isBigNumber) {
	        var oldScientific = BigNumber.config().EXPONENTIAL_AT;
	        BigNumber.config({
	          EXPONENTIAL_AT: [
	            Math.round(Math.log(lower) / Math.LN10),
	            Math.round(Math.log(upper) / Math.LN10)
	          ]
	        });
	      }

	      // handle special case zero
	      if (_isZero(value)) {
	        return '0';
	      }

	      // determine whether or not to output exponential notation
	      var str;
	      if (_isBetween(value, lower, upper)) {
	        // normal number notation
	        if (isBigNumber) {
	          str = new BigNumber(value.toPrecision(precision)).toString();
	        }
	        else { // Number
	          // Note: IE7 does not allow value.toPrecision(undefined)
	          var valueStr = precision ?
	              value.toPrecision(Math.min(precision, 21)) :
	              value.toPrecision();
	          str = parseFloat(valueStr) + '';
	        }
	      }
	      else {
	        // exponential notation
	        str = exports.toExponential(value, precision);
	      }

	      // restore BigNumber configuration
	      if (isBigNumber) {
	        BigNumber.config({EXPONENTIAL_AT: oldScientific});
	      }

	      // remove trailing zeros after the decimal point
	      return str.replace(/((\.\d*?)(0+))($|e)/, function () {
	        var digits = arguments[2];
	        var e = arguments[4];
	        return (digits !== '.') ? digits + e : e;
	      });

	    default:
	      throw new Error('Unknown notation "' + notation + '". ' +
	          'Choose "auto", "exponential", or "fixed".');
	  }
	};

	/**
	 * Test whether a value is zero
	 * @param {Number | BigNumber} value
	 * @return {boolean} isZero
	 * @private
	 */
	function _isZero (value) {
	  return (value instanceof BigNumber) ? value.isZero() : (value === 0);
	}

	/**
	 * Test whether a value is inside a range:
	 *
	 *   lower >= value < upper
	 *
	 * @param {Number | BigNumber} value
	 * @param {Number} lower  Included lower bound
	 * @param {Number} upper  Excluded upper bound
	 * @return {boolean} isBetween
	 * @private
	 */
	function _isBetween(value, lower, upper) {
	  var abs;
	  if (value instanceof BigNumber) {
	    abs = value.abs();
	    return (abs.gte(lower) && abs.lt(upper));
	  }
	  else {
	    abs = Math.abs(value);
	    return (abs >= lower && abs < upper);
	  }
	}

	/**
	 * Format a number in exponential notation. Like '1.23e+5', '2.3e+0', '3.500e-3'
	 * @param {Number | BigNumber} value
	 * @param {Number} [precision]  Number of digits in formatted output.
	 *                              If not provided, the maximum available digits
	 *                              is used.
	 * @returns {string} str
	 */
	exports.toExponential = function toExponential (value, precision) {
	  if (precision !== undefined) {
	    if (value instanceof BigNumber) {
	      return value.toExponential(precision - 1);
	    }
	    else { // Number
	      return value.toExponential(Math.min(precision - 1, 20));
	    }
	  }
	  else {
	    return value.toExponential();
	  }
	};

	/**
	 * Format a number with fixed notation.
	 * @param {Number | BigNumber} value
	 * @param {Number} [precision=0]        Optional number of decimals after the
	 *                                      decimal point. Zero by default.
	 */
	exports.toFixed = function toFixed (value, precision) {
	  if (value instanceof BigNumber) {
	    return value.toFixed(precision || 0);
	    // Note: the (precision || 0) is needed as the toFixed of BigNumber has an
	    // undefined default precision instead of 0.
	  }
	  else { // Number
	    return value.toFixed(Math.min(precision, 20));
	  }
	};

	/**
	 * Count the number of significant digits of a number.
	 *
	 * For example:
	 *   2.34 returns 3
	 *   0.0034 returns 2
	 *   120.5e+3 returns 4
	 *
	 * @param {Number} value
	 * @return {Number} digits   Number of significant digits
	 */
	exports.digits = function digits (value) {
	  return value
	      .toExponential()
	      .replace(/e[\+\-0-9]*$/, '')  // remove exponential notation
	      .replace( /^0\.0*|\./, '')    // remove decimal point and leading zeros
	      .length
	};

	/**
	 * Convert a Number in to a BigNumber. If the number has 15 or mor significant
	 * digits, the Number cannot be converted to BigNumber and will return the
	 * original number.
	 * @param {Number} number
	 * @return {BigNumber | Number} bignumber
	 */
	exports.toBigNumber = function toBigNumber (number) {
	  if (exports.digits(number) > 15) {
	    return number;
	  }
	  else {
	    return new BigNumber(number);
	  }
	};

	/**
	 * Convert a BigNumber into a Number. If the number is out of range, it will
	 * get the value Infinity or 0.
	 * @param {BigNumber} bignumber
	 * @return {Number} number
	 */
	exports.toNumber = function toNumber (bignumber) {
	  return parseFloat(bignumber.valueOf());
	};


/***/ },
/* 222 */
/***/ function(module, exports, require) {

	var number = require(221),
	    string = require(218),
	    object = require(2),
	    types = require(217),
	    isArray = Array.isArray;

	/**
	 * Calculate the size of a multi dimensional array.
	 * @param {Array} x
	 * @Return {Number[]} size
	 * @private
	 */
	function _size(x) {
	  var size = [];

	  while (isArray(x)) {
	    size.push(x.length);
	    x = x[0];
	  }

	  return size;
	}

	/**
	 * Calculate the size of a multi dimensional array.
	 * All elements in the array are checked for matching dimensions using the
	 * method validate
	 * @param {Array} x
	 * @Return {Number[]} size
	 * @throws RangeError
	 */
	exports.size = function size (x) {
	  // calculate the size
	  var s = _size(x);

	  // verify the size
	  exports.validate(x, s);
	  // TODO: don't validate here? only in a Matrix constructor?

	  return s;
	};

	/**
	 * Recursively validate whether each element in a multi dimensional array
	 * has a size corresponding to the provided size array.
	 * @param {Array} array    Array to be validated
	 * @param {Number[]} size  Array with the size of each dimension
	 * @param {Number} dim   Current dimension
	 * @throws RangeError
	 * @private
	 */
	function _validate(array, size, dim) {
	  var i;
	  var len = array.length;

	  if (len != size[dim]) {
	    throw new RangeError('Dimension mismatch (' + len + ' != ' + size[dim] + ')');
	  }

	  if (dim < size.length - 1) {
	    // recursively validate each child array
	    var dimNext = dim + 1;
	    for (i = 0; i < len; i++) {
	      var child = array[i];
	      if (!isArray(child)) {
	        throw new RangeError('Dimension mismatch ' +
	            '(' + (size.length - 1) + ' < ' + size.length + ')');
	      }
	      _validate(array[i], size, dimNext);
	    }
	  }
	  else {
	    // last dimension. none of the childs may be an array
	    for (i = 0; i < len; i++) {
	      if (isArray(array[i])) {
	        throw new RangeError('Dimension mismatch ' +
	            '(' + (size.length + 1) + ' > ' + size.length + ')');
	      }
	    }
	  }
	}

	/**
	 * Validate whether each element in a multi dimensional array has
	 * a size corresponding to the provided size array.
	 * @param {Array} array    Array to be validated
	 * @param {Number[]} size  Array with the size of each dimension
	 * @throws RangeError
	 */
	exports.validate = function validate(array, size) {
	  var isScalar = (size.length == 0);
	  if (isScalar) {
	    // scalar
	    if (isArray(array)) {
	      throw new RangeError('Dimension mismatch (' + array.length + ' != 0)');
	    }
	  }
	  else {
	    // array
	    _validate(array, size, 0);
	  }
	};

	/**
	 * Test whether index is an integer number with index >= 0 and index < length
	 * @param {*} index         Zero-based index
	 * @param {Number} [length] Length of the array
	 */
	exports.validateIndex = function validateIndex (index, length) {
	  if (!number.isNumber(index) || !number.isInteger(index)) {
	    throw new TypeError('Index must be an integer (value: ' + index + ')');
	  }
	  if (index < 0) {
	    throw new RangeError('Index out of range (' + index + ' < 0)');
	  }
	  if (length !== undefined && index >= length) {
	    throw new RangeError('Index out of range (' + index + ' > ' + (length - 1) +  ')');
	  }
	};

	/**
	 * Resize a multi dimensional array. The resized array is returned.
	 * @param {Array} array         Array to be resized
	 * @param {Array.<Number>} size Array with the size of each dimension
	 * @param {*} [defaultValue]    Value to be filled in in new entries,
	 *                              undefined by default
	 * @return {Array} array         The resized array
	 */
	exports.resize = function resize(array, size, defaultValue) {
	  // TODO: add support for scalars, having size=[] ?

	  // check the type of the arguments
	  if (!isArray(array) || !isArray(size)) {
	    throw new TypeError('Array expected');
	  }
	  if (size.length === 0) {
	    throw new Error('Resizing to scalar is not supported');
	  }

	  // check whether size contains positive integers
	  size.forEach(function (value) {
	    if (!number.isNumber(value) || !number.isInteger(value) || value < 0) {
	      throw new TypeError('Invalid size, must contain positive integers ' +
	          '(size: ' + string.format(size) + ')');
	    }
	  });

	  // count the current number of dimensions
	  var dims = 1;
	  var elem = array[0];
	  while (isArray(elem)) {
	    dims++;
	    elem = elem[0];
	  }

	  // adjust the number of dimensions when needed
	  while (dims < size.length) { // add dimensions
	    array = [array];
	    dims++;
	  }
	  while (dims > size.length) { // remove dimensions
	    array = array[0];
	    dims--;
	  }

	  // recursively resize the array
	  _resize(array, size, 0, defaultValue);

	  return array;
	};

	/**
	 * Recursively resize a multi dimensional array
	 * @param {Array} array         Array to be resized
	 * @param {Number[]} size       Array with the size of each dimension
	 * @param {Number} dim          Current dimension
	 * @param {*} [defaultValue]    Value to be filled in in new entries,
	 *                              undefined by default.
	 * @private
	 */
	function _resize (array, size, dim, defaultValue) {
	  if (!isArray(array)) {
	    throw Error('Array expected');
	  }

	  var i, elem,
	      oldLen = array.length,
	      newLen = size[dim],
	      minLen = Math.min(oldLen, newLen);

	  // apply new length
	  array.length = newLen;

	  if (dim < size.length - 1) {
	    // non-last dimension
	    var dimNext = dim + 1;

	    // resize existing child arrays
	    for (i = 0; i < minLen; i++) {
	      // resize child array
	      elem = array[i];
	      _resize(elem, size, dimNext, defaultValue);
	    }

	    // create new child arrays
	    for (i = minLen; i < newLen; i++) {
	      // get child array
	      elem = [];
	      array[i] = elem;

	      // resize new child array
	      _resize(elem, size, dimNext, defaultValue);
	    }
	  }
	  else {
	    // last dimension
	    if(defaultValue !== undefined) {
	      // fill new elements with the default value
	      for (i = oldLen; i < newLen; i++) {
	        array[i] = object.clone(defaultValue);
	      }
	    }
	  }
	}

	/**
	 * Squeeze a multi dimensional array
	 * @param {Array} array
	 * @return {Array} array
	 * @private
	 */
	exports.squeeze = function squeeze(array) {
	  while(isArray(array) && array.length === 1) {
	    array = array[0];
	  }

	  return array;
	};

	/**
	 * Unsqueeze a multi dimensional array: add dimensions when missing
	 * @param {Array} array
	 * @param {Number} dims   Number of desired dimensions
	 * @return {Array} array
	 * @private
	 */
	exports.unsqueeze = function unsqueeze(array, dims) {
	  var size = exports.size(array);

	  for (var i = 0, ii = (dims - size.length); i < ii; i++) {
	    array = [array];
	  }

	  return array;
	};

	/**
	 * Test whether an object is an array
	 * @param {*} value
	 * @return {Boolean} isArray
	 */
	exports.isArray = isArray;

/***/ },
/* 223 */
/***/ function(module, exports, require) {

	/**
	 * Test whether value is a Boolean
	 * @param {*} value
	 * @return {Boolean} isBoolean
	 */
	exports.isBoolean = function isBoolean(value) {
	  return (value instanceof Boolean) || (typeof value == 'boolean');
	};


/***/ }
/******/ ])