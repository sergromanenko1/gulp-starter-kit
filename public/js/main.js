(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v3.7.0
 * https://jquery.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-05-11T18:29Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket trac-14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var flat = arr.flat ? function( array ) {
	return arr.flat.call( array );
} : function( array ) {
	return arr.concat.apply( [], array );
};


var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

		// Support: Chrome <=57, Firefox <=52
		// In some browsers, typeof returns "function" for HTML <object> elements
		// (i.e., `typeof document.createElement( "object" ) === "function"`).
		// We don't want to classify *any* DOM node as a function.
		// Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
		// Plus for old WebKit, typeof returns "function" for HTML collections
		// (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
		return typeof obj === "function" && typeof obj.nodeType !== "number" &&
			typeof obj.item !== "function";
	};


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};


var document = window.document;



	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var version = "3.7.0",

	rhtmlSuffix = /HTML$/i,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	even: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return ( i + 1 ) % 2;
		} ) );
	},

	odd: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return i % 2;
		} ) );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a provided context; falls back to the global one
	// if not specified.
	globalEval: function( code, options, doc ) {
		DOMEval( code, { nonce: options && options.nonce }, doc );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},


	// Retrieve the text value of an array of DOM nodes
	text: function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {

			// If no nodeType, this is expected to be an array
			while ( ( node = elem[ i++ ] ) ) {

				// Do not traverse comment nodes
				ret += jQuery.text( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			return elem.textContent;
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}

		// Do not include comment or processing instruction nodes

		return ret;
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
						[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	isXMLDoc: function( elem ) {
		var namespace = elem && elem.namespaceURI,
			docElem = elem && ( elem.ownerDocument || elem ).documentElement;

		// Assume HTML when documentElement doesn't yet exist, such as inside
		// document fragments.
		return !rhtmlSuffix.test( namespace || docElem && docElem.nodeName || "HTML" );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return flat( ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( _i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}


function nodeName( elem, name ) {

	return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

}
var pop = arr.pop;


var sort = arr.sort;


var splice = arr.splice;


var whitespace = "[\\x20\\t\\r\\n\\f]";


var rtrimCSS = new RegExp(
	"^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$",
	"g"
);




// Note: an element does not contain itself
jQuery.contains = function( a, b ) {
	var bup = b && b.parentNode;

	return a === bup || !!( bup && bup.nodeType === 1 && (

		// Support: IE 9 - 11+
		// IE doesn't have `contains` on SVG.
		a.contains ?
			a.contains( bup ) :
			a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
	) );
};




// CSS string/identifier serialization
// https://drafts.csswg.org/cssom/#common-serializing-idioms
var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;

function fcssescape( ch, asCodePoint ) {
	if ( asCodePoint ) {

		// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
		if ( ch === "\0" ) {
			return "\uFFFD";
		}

		// Control characters and (dependent upon position) numbers get escaped as code points
		return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
	}

	// Other potentially-special ASCII characters get backslash-escaped
	return "\\" + ch;
}

jQuery.escapeSelector = function( sel ) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
};




var preferredDoc = document,
	pushNative = push;

( function() {

var i,
	Expr,
	outermostContext,
	sortInput,
	hasDuplicate,
	push = pushNative,

	// Local document vars
	document,
	documentElement,
	documentIsHTML,
	rbuggyQSA,
	matches,

	// Instance-specific data
	expando = jQuery.expando,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|" +
		"loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
	identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

	// Attribute selectors: https://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +

		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
		whitespace + "*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +

		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rleadingCombinator = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" +
		whitespace + "*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		ID: new RegExp( "^#(" + identifier + ")" ),
		CLASS: new RegExp( "^\\.(" + identifier + ")" ),
		TAG: new RegExp( "^(" + identifier + "|[*])" ),
		ATTR: new RegExp( "^" + attributes ),
		PSEUDO: new RegExp( "^" + pseudos ),
		CHILD: new RegExp(
			"^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
				whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
				whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		bool: new RegExp( "^(?:" + booleans + ")$", "i" ),

		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		needsContext: new RegExp( "^" + whitespace +
			"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
			"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// https://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\([^\\r\\n\\f])", "g" ),
	funescape = function( escape, nonHex ) {
		var high = "0x" + escape.slice( 1 ) - 0x10000;

		if ( nonHex ) {

			// Strip the backslash prefix from a non-hex escape sequence
			return nonHex;
		}

		// Replace a hexadecimal escape sequence with the encoded Unicode code point
		// Support: IE <=11+
		// For values outside the Basic Multilingual Plane (BMP), manually construct a
		// surrogate pair
		return high < 0 ?
			String.fromCharCode( high + 0x10000 ) :
			String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes; see `setDocument`.
	// Support: IE 9 - 11+, Edge 12 - 18+
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE/Edge.
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && nodeName( elem, "fieldset" );
		},
		{ dir: "parentNode", next: "legend" }
	);

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		( arr = slice.call( preferredDoc.childNodes ) ),
		preferredDoc.childNodes
	);

	// Support: Android <=4.0
	// Detect silently failing push.apply
	// eslint-disable-next-line no-unused-expressions
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = {
		apply: function( target, els ) {
			pushNative.apply( target, slice.call( els ) );
		},
		call: function( target ) {
			pushNative.apply( target, slice.call( arguments, 1 ) );
		}
	};
}

function find( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {
		setDocument( context );
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

				// ID selector
				if ( ( m = match[ 1 ] ) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( ( elem = context.getElementById( m ) ) ) {

							// Support: IE 9 only
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								push.call( results, elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE 9 only
						// getElementById can match elements by name instead of ID
						if ( newContext && ( elem = newContext.getElementById( m ) ) &&
							find.contains( context, elem ) &&
							elem.id === m ) {

							push.call( results, elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[ 2 ] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( ( m = match[ 3 ] ) && context.getElementsByClassName ) {
					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( !nonnativeSelectorCache[ selector + " " ] &&
				( !rbuggyQSA || !rbuggyQSA.test( selector ) ) ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// The technique has to be used as well when a leading combinator is used
				// as such selectors are not recognized by querySelectorAll.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 &&
					( rdescend.test( selector ) || rleadingCombinator.test( selector ) ) ) {

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;

					// We can use :scope instead of the ID hack if the browser
					// supports it & if we're not changing the context.
					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when
					// strict-comparing two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( newContext != context || !support.scope ) {

						// Capture the context ID, setting it first if necessary
						if ( ( nid = context.getAttribute( "id" ) ) ) {
							nid = jQuery.escapeSelector( nid );
						} else {
							context.setAttribute( "id", ( nid = expando ) );
						}
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
							toSelector( groups[ i ] );
					}
					newSelector = groups.join( "," );
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrimCSS, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {

		// Use (key + " ") to avoid collision with native prototype properties
		// (see https://github.com/jquery/sizzle/issues/157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {

			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return ( cache[ key + " " ] = value );
	}
	return cache;
}

/**
 * Mark a function for special use by jQuery selector module
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement( "fieldset" );

	try {
		return !!fn( el );
	} catch ( e ) {
		return false;
	} finally {

		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}

		// release memory in IE
		el = null;
	}
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		return nodeName( elem, "input" ) && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		return ( nodeName( elem, "input" ) || nodeName( elem, "button" ) ) &&
			elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11+
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					elem.isDisabled !== !disabled &&
						inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction( function( argument ) {
		argument = +argument;
		return markFunction( function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
					seed[ j ] = !( matches[ j ] = seed[ j ] );
				}
			}
		} );
	} );
}

/**
 * Checks a node for validity as a jQuery selector context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [node] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
function setDocument( node ) {
	var subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	documentElement = document.documentElement;
	documentIsHTML = !jQuery.isXMLDoc( document );

	// Support: iOS 7 only, IE 9 - 11+
	// Older browsers didn't support unprefixed `matches`.
	matches = documentElement.matches ||
		documentElement.webkitMatchesSelector ||
		documentElement.msMatchesSelector;

	// Support: IE 9 - 11+, Edge 12 - 18+
	// Accessing iframe documents after unload throws "permission denied" errors (see trac-13936)
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( preferredDoc != document &&
		( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

		// Support: IE 9 - 11+, Edge 12 - 18+
		subWindow.addEventListener( "unload", unloadHandler );
	}

	// Support: IE <10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert( function( el ) {
		documentElement.appendChild( el ).id = jQuery.expando;
		return !document.getElementsByName ||
			!document.getElementsByName( jQuery.expando ).length;
	} );

	// Support: IE 9 only
	// Check to see if it's possible to do matchesSelector
	// on a disconnected node.
	support.disconnectedMatch = assert( function( el ) {
		return matches.call( el, "*" );
	} );

	// Support: IE 9 - 11+, Edge 12 - 18+
	// IE/Edge don't support the :scope pseudo-class.
	support.scope = assert( function() {
		return document.querySelectorAll( ":scope" );
	} );

	// Support: Chrome 105 - 111 only, Safari 15.4 - 16.3 only
	// Make sure the `:has()` argument is parsed unforgivingly.
	// We include `*` in the test to detect buggy implementations that are
	// _selectively_ forgiving (specifically when the list includes at least
	// one valid selector).
	// Note that we treat complete lack of support for `:has()` as if it were
	// spec-compliant support, which is fine because use of `:has()` in such
	// environments will fail in the qSA path and fall back to jQuery traversal
	// anyway.
	support.cssHas = assert( function() {
		try {
			document.querySelector( ":has(*,:jqfake)" );
			return false;
		} catch ( e ) {
			return true;
		}
	} );

	// ID filter and find
	if ( support.getById ) {
		Expr.filter.ID = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute( "id" ) === attrId;
			};
		};
		Expr.find.ID = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter.ID =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode( "id" );
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find.ID = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode( "id" );
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( ( elem = elems[ i++ ] ) ) {
						node = elem.getAttributeNode( "id" );
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find.TAG = function( tag, context ) {
		if ( typeof context.getElementsByTagName !== "undefined" ) {
			return context.getElementsByTagName( tag );

		// DocumentFragment nodes don't have gEBTN
		} else {
			return context.querySelectorAll( tag );
		}
	};

	// Class
	Expr.find.CLASS = function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	rbuggyQSA = [];

	// Build QSA regex
	// Regex strategy adopted from Diego Perini
	assert( function( el ) {

		var input;

		documentElement.appendChild( el ).innerHTML =
			"<a id='" + expando + "' href='' disabled='disabled'></a>" +
			"<select id='" + expando + "-\r\\' disabled='disabled'>" +
			"<option selected=''></option></select>";

		// Support: iOS <=7 - 8 only
		// Boolean attributes and "value" are not treated correctly in some XML documents
		if ( !el.querySelectorAll( "[selected]" ).length ) {
			rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
		}

		// Support: iOS <=7 - 8 only
		if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
			rbuggyQSA.push( "~=" );
		}

		// Support: iOS 8 only
		// https://bugs.webkit.org/show_bug.cgi?id=136851
		// In-page `selector#id sibling-combinator selector` fails
		if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
			rbuggyQSA.push( ".#.+[+~]" );
		}

		// Support: Chrome <=105+, Firefox <=104+, Safari <=15.4+
		// In some of the document kinds, these selectors wouldn't work natively.
		// This is probably OK but for backwards compatibility we want to maintain
		// handling them through jQuery traversal in jQuery 3.x.
		if ( !el.querySelectorAll( ":checked" ).length ) {
			rbuggyQSA.push( ":checked" );
		}

		// Support: Windows 8 Native Apps
		// The type and name attributes are restricted during .innerHTML assignment
		input = document.createElement( "input" );
		input.setAttribute( "type", "hidden" );
		el.appendChild( input ).setAttribute( "name", "D" );

		// Support: IE 9 - 11+
		// IE's :disabled selector does not pick up the children of disabled fieldsets
		// Support: Chrome <=105+, Firefox <=104+, Safari <=15.4+
		// In some of the document kinds, these selectors wouldn't work natively.
		// This is probably OK but for backwards compatibility we want to maintain
		// handling them through jQuery traversal in jQuery 3.x.
		documentElement.appendChild( el ).disabled = true;
		if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
			rbuggyQSA.push( ":enabled", ":disabled" );
		}

		// Support: IE 11+, Edge 15 - 18+
		// IE 11/Edge don't find elements on a `[name='']` query in some cases.
		// Adding a temporary attribute to the document before the selection works
		// around the issue.
		// Interestingly, IE 10 & older don't seem to have the issue.
		input = document.createElement( "input" );
		input.setAttribute( "name", "" );
		el.appendChild( input );
		if ( !el.querySelectorAll( "[name='']" ).length ) {
			rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
				whitespace + "*(?:''|\"\")" );
		}
	} );

	if ( !support.cssHas ) {

		// Support: Chrome 105 - 110+, Safari 15.4 - 16.3+
		// Our regular `try-catch` mechanism fails to detect natively-unsupported
		// pseudo-classes inside `:has()` (such as `:has(:contains("Foo"))`)
		// in browsers that parse the `:has()` argument as a forgiving selector list.
		// https://drafts.csswg.org/selectors/#relational now requires the argument
		// to be parsed unforgivingly, but browsers have not yet fully adjusted.
		rbuggyQSA.push( ":has" );
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

			// Choose the first element that is related to our preferred document
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( a === document || a.ownerDocument == preferredDoc &&
				find.contains( preferredDoc, a ) ) {
				return -1;
			}

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( b === document || b.ownerDocument == preferredDoc &&
				find.contains( preferredDoc, b ) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	};

	return document;
}

find.matches = function( expr, elements ) {
	return find( expr, null, null, elements );
};

find.matchesSelector = function( elem, expr ) {
	setDocument( elem );

	if ( documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyQSA || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||

					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch ( e ) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return find( expr, document, null, [ elem ] ).length > 0;
};

find.contains = function( context, elem ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( context.ownerDocument || context ) != document ) {
		setDocument( context );
	}
	return jQuery.contains( context, elem );
};


find.attr = function( elem, name ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( elem.ownerDocument || elem ) != document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],

		// Don't get fooled by Object.prototype properties (see trac-13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	if ( val !== undefined ) {
		return val;
	}

	return elem.getAttribute( name );
};

find.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
jQuery.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	//
	// Support: Android <=4.0+
	// Testing for detecting duplicates is unpredictable so instead assume we can't
	// depend on duplicate detection in all browsers without a stable sort.
	hasDuplicate = !support.sortStable;
	sortInput = !support.sortStable && slice.call( results, 0 );
	sort.call( results, sortOrder );

	if ( hasDuplicate ) {
		while ( ( elem = results[ i++ ] ) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			splice.call( results, duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

jQuery.fn.uniqueSort = function() {
	return this.pushStack( jQuery.uniqueSort( slice.apply( this ) ) );
};

Expr = jQuery.expr = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		ATTR: function( match ) {
			match[ 1 ] = match[ 1 ].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[ 3 ] = ( match[ 3 ] || match[ 4 ] || match[ 5 ] || "" )
				.replace( runescape, funescape );

			if ( match[ 2 ] === "~=" ) {
				match[ 3 ] = " " + match[ 3 ] + " ";
			}

			return match.slice( 0, 4 );
		},

		CHILD: function( match ) {

			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[ 1 ] = match[ 1 ].toLowerCase();

			if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

				// nth-* requires argument
				if ( !match[ 3 ] ) {
					find.error( match[ 0 ] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[ 4 ] = +( match[ 4 ] ?
					match[ 5 ] + ( match[ 6 ] || 1 ) :
					2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" )
				);
				match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

			// other types prohibit arguments
			} else if ( match[ 3 ] ) {
				find.error( match[ 0 ] );
			}

			return match;
		},

		PSEUDO: function( match ) {
			var excess,
				unquoted = !match[ 6 ] && match[ 2 ];

			if ( matchExpr.CHILD.test( match[ 0 ] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[ 3 ] ) {
				match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&

				// Get excess from tokenize (recursively)
				( excess = tokenize( unquoted, true ) ) &&

				// advance to the next closing parenthesis
				( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

				// excess is a negative index
				match[ 0 ] = match[ 0 ].slice( 0, excess );
				match[ 2 ] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		TAG: function( nodeNameSelector ) {
			var expectedNodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() {
					return true;
				} :
				function( elem ) {
					return nodeName( elem, expectedNodeName );
				};
		},

		CLASS: function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				( pattern = new RegExp( "(^|" + whitespace + ")" + className +
					"(" + whitespace + "|$)" ) ) &&
				classCache( className, function( elem ) {
					return pattern.test(
						typeof elem.className === "string" && elem.className ||
							typeof elem.getAttribute !== "undefined" &&
								elem.getAttribute( "class" ) ||
							""
					);
				} );
		},

		ATTR: function( name, operator, check ) {
			return function( elem ) {
				var result = find.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				if ( operator === "=" ) {
					return result === check;
				}
				if ( operator === "!=" ) {
					return result !== check;
				}
				if ( operator === "^=" ) {
					return check && result.indexOf( check ) === 0;
				}
				if ( operator === "*=" ) {
					return check && result.indexOf( check ) > -1;
				}
				if ( operator === "$=" ) {
					return check && result.slice( -check.length ) === check;
				}
				if ( operator === "~=" ) {
					return ( " " + result.replace( rwhitespace, " " ) + " " )
						.indexOf( check ) > -1;
				}
				if ( operator === "|=" ) {
					return result === check || result.slice( 0, check.length + 1 ) === check + "-";
				}

				return false;
			};
		},

		CHILD: function( type, what, _argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, _context, xml ) {
					var cache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( ( node = node[ dir ] ) ) {
									if ( ofType ?
										nodeName( node, name ) :
										node.nodeType === 1 ) {

										return false;
									}
								}

								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || ( parent[ expando ] = {} );
							cache = outerCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( ( node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								( diff = nodeIndex = 0 ) || start.pop() ) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {

							// Use previously-cached element index if available
							if ( useCache ) {
								outerCache = elem[ expando ] || ( elem[ expando ] = {} );
								cache = outerCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {

								// Use the same loop as above to seek `elem` from the start
								while ( ( node = ++nodeIndex && node && node[ dir ] ||
									( diff = nodeIndex = 0 ) || start.pop() ) ) {

									if ( ( ofType ?
										nodeName( node, name ) :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] ||
												( node[ expando ] = {} );
											outerCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		PSEUDO: function( pseudo, argument ) {

			// pseudo-class names are case-insensitive
			// https://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					find.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as jQuery does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction( function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[ i ] );
							seed[ idx ] = !( matches[ idx ] = matched[ i ] );
						}
					} ) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {

		// Potentially complex pseudos
		not: markFunction( function( selector ) {

			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrimCSS, "$1" ) );

			return matcher[ expando ] ?
				markFunction( function( seed, matches, _context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( ( elem = unmatched[ i ] ) ) {
							seed[ i ] = !( matches[ i ] = elem );
						}
					}
				} ) :
				function( elem, _context, xml ) {
					input[ 0 ] = elem;
					matcher( input, null, xml, results );

					// Don't keep the element
					// (see https://github.com/jquery/sizzle/issues/299)
					input[ 0 ] = null;
					return !results.pop();
				};
		} ),

		has: markFunction( function( selector ) {
			return function( elem ) {
				return find( selector, elem ).length > 0;
			};
		} ),

		contains: markFunction( function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || jQuery.text( elem ) ).indexOf( text ) > -1;
			};
		} ),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// https://www.w3.org/TR/selectors/#lang-pseudo
		lang: markFunction( function( lang ) {

			// lang value must be a valid identifier
			if ( !ridentifier.test( lang || "" ) ) {
				find.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( ( elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
				return false;
			};
		} ),

		// Miscellaneous
		target: function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		root: function( elem ) {
			return elem === documentElement;
		},

		focus: function( elem ) {
			return elem === safeActiveElement() &&
				document.hasFocus() &&
				!!( elem.type || elem.href || ~elem.tabIndex );
		},

		// Boolean properties
		enabled: createDisabledPseudo( false ),
		disabled: createDisabledPseudo( true ),

		checked: function( elem ) {

			// In CSS3, :checked should return both checked and selected elements
			// https://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			return ( nodeName( elem, "input" ) && !!elem.checked ) ||
				( nodeName( elem, "option" ) && !!elem.selected );
		},

		selected: function( elem ) {

			// Support: IE <=11+
			// Accessing the selectedIndex property
			// forces the browser to treat the default option as
			// selected when in an optgroup.
			if ( elem.parentNode ) {
				// eslint-disable-next-line no-unused-expressions
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		empty: function( elem ) {

			// https://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		parent: function( elem ) {
			return !Expr.pseudos.empty( elem );
		},

		// Element/input types
		header: function( elem ) {
			return rheader.test( elem.nodeName );
		},

		input: function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		button: function( elem ) {
			return nodeName( elem, "input" ) && elem.type === "button" ||
				nodeName( elem, "button" );
		},

		text: function( elem ) {
			var attr;
			return nodeName( elem, "input" ) && elem.type === "text" &&

				// Support: IE <10 only
				// New HTML5 attribute values (e.g., "search") appear
				// with elem.type === "text"
				( ( attr = elem.getAttribute( "type" ) ) == null ||
					attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		first: createPositionalPseudo( function() {
			return [ 0 ];
		} ),

		last: createPositionalPseudo( function( _matchIndexes, length ) {
			return [ length - 1 ];
		} ),

		eq: createPositionalPseudo( function( _matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		} ),

		even: createPositionalPseudo( function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		odd: createPositionalPseudo( function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		lt: createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i;

			if ( argument < 0 ) {
				i = argument + length;
			} else if ( argument > length ) {
				i = length;
			} else {
				i = argument;
			}

			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		gt: createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} )
	}
};

Expr.pseudos.nth = Expr.pseudos.eq;

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
			if ( match ) {

				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[ 0 ].length ) || soFar;
			}
			groups.push( ( tokens = [] ) );
		}

		matched = false;

		// Combinators
		if ( ( match = rleadingCombinator.exec( soFar ) ) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,

				// Cast descendant combinators to space
				type: match[ 0 ].replace( rtrimCSS, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
				( match = preFilters[ type ]( match ) ) ) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	if ( parseOnly ) {
		return soFar.length;
	}

	return soFar ?
		find.error( selector ) :

		// Cache the tokens
		tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[ i ].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?

		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( ( elem = elem[ dir ] ) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || ( elem[ expando ] = {} );

						if ( skip && nodeName( elem, skip ) ) {
							elem = elem[ dir ] || elem;
						} else if ( ( oldCache = outerCache[ key ] ) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return ( newCache[ 2 ] = oldCache[ 2 ] );
						} else {

							// Reuse newcache so results back-propagate to previous elements
							outerCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[ i ]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[ 0 ];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		find( selector, contexts[ i ], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( ( elem = unmatched[ i ] ) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction( function( seed, results, context, xml ) {
		var temp, i, elem, matcherOut,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed ||
				multipleContexts( selector || "*",
					context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems;

		if ( matcher ) {

			// If we have a postFinder, or filtered seed, or non-seed postFilter
			// or preexisting results,
			matcherOut = postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

				// ...intermediate processing is necessary
				[] :

				// ...otherwise use results directly
				results;

			// Find primary matches
			matcher( matcherIn, matcherOut, context, xml );
		} else {
			matcherOut = matcherIn;
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( ( elem = temp[ i ] ) ) {
					matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {

					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( ( elem = matcherOut[ i ] ) ) {

							// Restore matcherIn since elem is not yet a final match
							temp.push( ( matcherIn[ i ] = elem ) );
						}
					}
					postFinder( null, ( matcherOut = [] ), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( ( elem = matcherOut[ i ] ) &&
						( temp = postFinder ? indexOf.call( seed, elem ) : preMap[ i ] ) > -1 ) {

						seed[ temp ] = !( results[ temp ] = elem );
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	} );
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[ 0 ].type ],
		implicitRelative = leadingRelative || Expr.relative[ " " ],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			var ret = ( !leadingRelative && ( xml || context != outermostContext ) ) || (
				( checkContext = context ).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );

			// Avoid hanging onto element
			// (see https://github.com/jquery/sizzle/issues/299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {

				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[ j ].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(

						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 )
							.concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
					).replace( rtrimCSS, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find.TAG( "*", outermost ),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
				len = elems.length;

			if ( outermost ) {

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				outermostContext = context == document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: iOS <=7 - 9 only
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching
			// elements by id. (see trac-14142)
			for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( !context && elem.ownerDocument != document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( ( matcher = elementMatchers[ j++ ] ) ) {
						if ( matcher( elem, context || document, xml ) ) {
							push.call( results, elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {

					// They will have gone through all possible matchers
					if ( ( elem = !matcher && elem ) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( ( matcher = setMatchers[ j++ ] ) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {

					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
								setMatched[ i ] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					jQuery.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

function compile( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {

		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[ i ] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector,
			matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
}

/**
 * A low-level selection function that works with jQuery's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with jQuery selector compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( ( selector = compiled.selector || selector ) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[ 0 ] = match[ 0 ].slice( 0 );
		if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

			context = ( Expr.find.ID(
				token.matches[ 0 ].replace( runescape, funescape ),
				context
			) || [] )[ 0 ];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr.needsContext.test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[ i ];

			// Abort if we hit a combinator
			if ( Expr.relative[ ( type = token.type ) ] ) {
				break;
			}
			if ( ( find = Expr.find[ type ] ) ) {

				// Search, expanding context for leading sibling combinators
				if ( ( seed = find(
					token.matches[ 0 ].replace( runescape, funescape ),
					rsibling.test( tokens[ 0 ].type ) &&
						testContext( context.parentNode ) || context
				) ) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
}

// One-time assignments

// Support: Android <=4.0 - 4.1+
// Sort stability
support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;

// Initialize against the default document
setDocument();

// Support: Android <=4.0 - 4.1+
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert( function( el ) {

	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
} );

jQuery.find = find;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.unique = jQuery.uniqueSort;

// These have always been private, but they used to be documented
// as part of Sizzle so let's maintain them in the 3.x line
// for backwards compatibility purposes.
find.compile = compile;
find.select = select;
find.setDocument = setDocument;

find.escape = jQuery.escapeSelector;
find.getText = jQuery.text;
find.isXML = jQuery.isXMLDoc;
find.selectors = jQuery.expr;
find.support = jQuery.support;
find.uniqueSort = jQuery.uniqueSort;

	/* eslint-enable */

} )();


var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (trac-9521)
	// Strict HTML recognition (trac-11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to jQuery#find
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, _i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, _i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, _i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( elem.contentDocument != null &&

			// Support: IE 11+
			// <object> elements with no `data` attribute has an object
			// `contentDocument` with a `null` prototype.
			getProto( elem.contentDocument ) ) {

			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( _i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.error );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the error, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getErrorHook ) {
									process.error = jQuery.Deferred.getErrorHook();

								// The deprecated alias of the above. While the name suggests
								// returning the stack, not an error instance, jQuery just passes
								// it directly to `console.warn` so both will work; an instance
								// just better cooperates with source maps.
								} else if ( jQuery.Deferred.getStackHook ) {
									process.error = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the primary Deferred
			primary = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						primary.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, primary.done( updateFunc( i ) ).resolve, primary.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( primary.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return primary.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), primary.reject );
		}

		return primary.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

// If `jQuery.Deferred.getErrorHook` is defined, `asyncError` is an error
// captured before the async barrier to get the original error cause
// which may otherwise be hidden.
jQuery.Deferred.exceptionHook = function( error, asyncError ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message,
			error.stack, asyncError );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See trac-6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, _key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( _all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (trac-9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see trac-8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (trac-14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (trac-11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (trac-14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// Support: IE <=9 only
	// IE <=9 replaces <option> tags with their contents when inserted outside of
	// the select element.
	div.innerHTML = "<option></option>";
	support.option = !!div.lastChild;
} )();


// We have to close these tags to support XHTML (trac-13200)
var wrapMap = {

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: IE <=9 only
if ( !support.option ) {
	wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
}


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (trac-15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (trac-12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Only attach events to objects that accept data
		if ( !acceptData( elem ) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = Object.create( null );
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( nativeEvent ),

			handlers = (
				dataPriv.get( this, "events" ) || Object.create( null )
			)[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (trac-13208)
				// Don't process clicks on disabled elements (trac-6911, trac-8165, trac-11382, trac-11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (trac-13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
						return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
						return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", true );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, isSetup ) {

	// Missing `isSetup` indicates a trigger call, which must force setup through jQuery.event.add
	if ( !isSetup ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				if ( !saved ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					this[ type ]();
					result = dataPriv.get( this, type );
					dataPriv.set( this, type, false );

					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();

						return result;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering
				// the native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved ) {

				// ...and capture the result
				dataPriv.set( this, type, jQuery.event.trigger(
					saved[ 0 ],
					saved.slice( 1 ),
					this
				) );

				// Abort handling of the native event by all jQuery handlers while allowing
				// native handlers on the same element to run. On target, this is achieved
				// by stopping immediate propagation just on the jQuery event. However,
				// the native event is re-wrapped by a jQuery one on each level of the
				// propagation so the only way to stop it for jQuery is to stop it for
				// everyone via native `stopPropagation()`. This is not a problem for
				// focus/blur which don't bubble, but it does also stop click on checkboxes
				// and radios. We accept this limitation.
				event.stopPropagation();
				event.isImmediatePropagationStopped = returnTrue;
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (trac-504, trac-13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,
	which: true
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {

	function focusMappedHandler( nativeEvent ) {
		if ( document.documentMode ) {

			// Support: IE 11+
			// Attach a single focusin/focusout handler on the document while someone wants
			// focus/blur. This is because the former are synchronous in IE while the latter
			// are async. In other browsers, all those handlers are invoked synchronously.

			// `handle` from private data would already wrap the event, but we need
			// to change the `type` here.
			var handle = dataPriv.get( this, "handle" ),
				event = jQuery.event.fix( nativeEvent );
			event.type = nativeEvent.type === "focusin" ? "focus" : "blur";
			event.isSimulated = true;

			// First, handle focusin/focusout
			handle( nativeEvent );

			// ...then, handle focus/blur
			//
			// focus/blur don't bubble while focusin/focusout do; simulate the former by only
			// invoking the handler at the lower level.
			if ( event.target === event.currentTarget ) {

				// The setup part calls `leverageNative`, which, in turn, calls
				// `jQuery.event.add`, so event handle will already have been set
				// by this point.
				handle( event );
			}
		} else {

			// For non-IE browsers, attach a single capturing handler on the document
			// while someone wants focusin/focusout.
			jQuery.event.simulate( delegateType, nativeEvent.target,
				jQuery.event.fix( nativeEvent ) );
		}
	}

	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			var attaches;

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, true );

			if ( document.documentMode ) {

				// Support: IE 9 - 11+
				// We use the same native handler for focusin & focus (and focusout & blur)
				// so we need to coordinate setup & teardown parts between those events.
				// Use `delegateType` as the key as `type` is already used by `leverageNative`.
				attaches = dataPriv.get( this, delegateType );
				if ( !attaches ) {
					this.addEventListener( delegateType, focusMappedHandler );
				}
				dataPriv.set( this, delegateType, ( attaches || 0 ) + 1 );
			} else {

				// Return false to allow normal processing in the caller
				return false;
			}
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		teardown: function() {
			var attaches;

			if ( document.documentMode ) {
				attaches = dataPriv.get( this, delegateType ) - 1;
				if ( !attaches ) {
					this.removeEventListener( delegateType, focusMappedHandler );
					dataPriv.remove( this, delegateType );
				} else {
					dataPriv.set( this, delegateType, attaches );
				}
			} else {

				// Return false to indicate standard teardown should be applied
				return false;
			}
		},

		// Suppress native focus or blur if we're currently inside
		// a leveraged native-event stack
		_default: function( event ) {
			return dataPriv.get( event.target, type );
		},

		delegateType: delegateType
	};

	// Support: Firefox <=44
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
	//
	// Support: IE 9 - 11+
	// To preserve relative focusin/focus & focusout/blur event order guaranteed on the 3.x branch,
	// attach a single handler for both events in IE.
	jQuery.event.special[ delegateType ] = {
		setup: function() {

			// Handle: regular nodes (via `this.ownerDocument`), window
			// (via `this.document`) & document (via `this`).
			var doc = this.ownerDocument || this.document || this,
				dataHolder = document.documentMode ? this : doc,
				attaches = dataPriv.get( dataHolder, delegateType );

			// Support: IE 9 - 11+
			// We use the same native handler for focusin & focus (and focusout & blur)
			// so we need to coordinate setup & teardown parts between those events.
			// Use `delegateType` as the key as `type` is already used by `leverageNative`.
			if ( !attaches ) {
				if ( document.documentMode ) {
					this.addEventListener( delegateType, focusMappedHandler );
				} else {
					doc.addEventListener( type, focusMappedHandler, true );
				}
			}
			dataPriv.set( dataHolder, delegateType, ( attaches || 0 ) + 1 );
		},
		teardown: function() {
			var doc = this.ownerDocument || this.document || this,
				dataHolder = document.documentMode ? this : doc,
				attaches = dataPriv.get( dataHolder, delegateType ) - 1;

			if ( !attaches ) {
				if ( document.documentMode ) {
					this.removeEventListener( delegateType, focusMappedHandler );
				} else {
					doc.removeEventListener( type, focusMappedHandler, true );
				}
				dataPriv.remove( dataHolder, delegateType );
			} else {
				dataPriv.set( dataHolder, delegateType, attaches );
			}
		}
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,

	rcleanScript = /^\s*<!\[CDATA\[|\]\]>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.get( src );
		events = pdataOld.events;

		if ( events ) {
			dataPriv.remove( dest, "handle events" );

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = flat( args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (trac-8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								}, doc );
							}
						} else {

							// Unwrap a CDATA section containing script contents. This shouldn't be
							// needed as in XML documents they're already not visible when
							// inspecting element contents and in HTML documents they have no
							// meaning but we're preserving that logic for backwards compatibility.
							// This will be removed completely in 4.0. See gh-4904.
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html;
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew jQuery#find here for performance reasons:
			// https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var rcustomProp = /^--/;


var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (trac-15098, trac-14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.call( elem );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableTrDimensionsVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (trac-8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		},

		// Support: IE 9 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Behavior in IE 9 is more subtle than in newer versions & it passes
		// some versions of this test; make sure not to make it pass there!
		//
		// Support: Firefox 70+
		// Only Firefox includes border widths
		// in computed dimensions. (gh-4529)
		reliableTrDimensions: function() {
			var table, tr, trChild, trStyle;
			if ( reliableTrDimensionsVal == null ) {
				table = document.createElement( "table" );
				tr = document.createElement( "tr" );
				trChild = document.createElement( "div" );

				table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
				tr.style.cssText = "border:1px solid";

				// Support: Chrome 86+
				// Height set through cssText does not get applied.
				// Computed height then comes back as 0.
				tr.style.height = "1px";
				trChild.style.height = "9px";

				// Support: Android 8 Chrome 86+
				// In our bodyBackground.html iframe,
				// display for all div elements is set to "inline",
				// which causes a problem only in Android 8 Chrome 86.
				// Ensuring the div is display: block
				// gets around this issue.
				trChild.style.display = "block";

				documentElement
					.appendChild( table )
					.appendChild( tr )
					.appendChild( trChild );

				trStyle = window.getComputedStyle( tr );
				reliableTrDimensionsVal = ( parseInt( trStyle.height, 10 ) +
					parseInt( trStyle.borderTopWidth, 10 ) +
					parseInt( trStyle.borderBottomWidth, 10 ) ) === tr.offsetHeight;

				documentElement.removeChild( table );
			}
			return reliableTrDimensionsVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		isCustomProp = rcustomProp.test( name ),

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, trac-12537)
	//   .css('--customProperty) (gh-3144)
	if ( computed ) {

		// Support: IE <=9 - 11+
		// IE only supports `"float"` in `getPropertyValue`; in computed styles
		// it's only available as `"cssFloat"`. We no longer modify properties
		// sent to `.css()` apart from camelCasing, so we need to check both.
		// Normally, this would create difference in behavior: if
		// `getPropertyValue` returns an empty string, the value returned
		// by `.css()` would be `undefined`. This is usually the case for
		// disconnected elements. However, in IE even disconnected elements
		// with no styles return `"none"` for `getPropertyValue( "float" )`
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( isCustomProp && ret ) {

			// Support: Firefox 105+, Chrome <=105+
			// Spec requires trimming whitespace for custom properties (gh-4926).
			// Firefox only trims leading whitespace. Chrome just collapses
			// both leading & trailing whitespace to a single space.
			//
			// Fall back to `undefined` if empty string returned.
			// This collapses a missing definition with property defined
			// and set to an empty string but there's no standard API
			// allowing us to differentiate them without a performance penalty
			// and returning `undefined` aligns with older jQuery.
			//
			// rtrimCSS treats U+000D CARRIAGE RETURN and U+000C FORM FEED
			// as whitespace while CSS does not, but this is not a problem
			// because CSS preprocessing replaces them with U+000A LINE FEED
			// (which *is* CSS whitespace)
			// https://www.w3.org/TR/css-syntax-3/#input-preprocessing
			ret = ret.replace( rtrimCSS, "$1" ) || undefined;
		}

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( _elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0,
		marginDelta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		// Count margin delta separately to only add it after scroll gutter adjustment.
		// This is needed to make negative margins work with `outerHeight( true )` (gh-3982).
		if ( box === "margin" ) {
			marginDelta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta + marginDelta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Support: IE 9 - 11 only
	// Use offsetWidth/offsetHeight for when box sizing is unreliable.
	// In those cases, the computed value can be trusted to be border-box.
	if ( ( !support.boxSizingReliable() && isBorderBox ||

		// Support: IE 10 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Interestingly, in some cases IE 9 doesn't suffer from this issue.
		!support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

		// Fall back to offsetWidth/offsetHeight when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		val === "auto" ||

		// Support: Android <=4.1 - 4.3 only
		// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

		// Make sure the element is visible & connected
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		animationIterationCount: true,
		aspectRatio: true,
		borderImageSlice: true,
		columnCount: true,
		flexGrow: true,
		flexShrink: true,
		fontWeight: true,
		gridArea: true,
		gridColumn: true,
		gridColumnEnd: true,
		gridColumnStart: true,
		gridRow: true,
		gridRowEnd: true,
		gridRowStart: true,
		lineHeight: true,
		opacity: true,
		order: true,
		orphans: true,
		scale: true,
		widows: true,
		zIndex: true,
		zoom: true,

		// SVG-related
		fillOpacity: true,
		floodOpacity: true,
		stopOpacity: true,
		strokeMiterlimit: true,
		strokeOpacity: true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (trac-7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug trac-9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (trac-7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( _i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
					swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, dimension, extra );
					} ) :
					getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
				jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

				/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (trac-12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
					animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};

		doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// Use proper attribute retrieval (trac-12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classNames, cur, curValue, className, i, finalValue;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classNames = classesToArray( value );

		if ( classNames.length ) {
			return this.each( function() {
				curValue = getClass( this );
				cur = this.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					for ( i = 0; i < classNames.length; i++ ) {
						className = classNames[ i ];
						if ( cur.indexOf( " " + className + " " ) < 0 ) {
							cur += className + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						this.setAttribute( "class", finalValue );
					}
				}
			} );
		}

		return this;
	},

	removeClass: function( value ) {
		var classNames, cur, curValue, className, i, finalValue;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classNames = classesToArray( value );

		if ( classNames.length ) {
			return this.each( function() {
				curValue = getClass( this );

				// This expression is here for better compressibility (see addClass)
				cur = this.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					for ( i = 0; i < classNames.length; i++ ) {
						className = classNames[ i ];

						// Remove *all* instances
						while ( cur.indexOf( " " + className + " " ) > -1 ) {
							cur = cur.replace( " " + className + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						this.setAttribute( "class", finalValue );
					}
				}
			} );
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var classNames, className, i, self,
			type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		classNames = classesToArray( value );

		return this.each( function() {
			if ( isValidValue ) {

				// Toggle individual class names
				self = jQuery( this );

				for ( i = 0; i < classNames.length; i++ ) {
					className = classNames[ i ];

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (trac-14686, trac-14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (trac-2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion
var location = window.location;

var nonce = { guid: Date.now() };

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, parserErrorElem;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {}

	parserErrorElem = xml && xml.getElementsByTagName( "parsererror" )[ 0 ];
	if ( !xml || parserErrorElem ) {
		jQuery.error( "Invalid XML: " + (
			parserErrorElem ?
				jQuery.map( parserErrorElem.childNodes, function( el ) {
					return el.textContent;
				} ).join( "\n" ) :
				data
		) );
	}
	return xml;
};


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (trac-9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (trac-9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || Object.create( null ) )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (trac-6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} ).filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} ).map( function( _i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// trac-7653, trac-8125, trac-8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (trac-10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );

originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes trac-9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (trac-10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket trac-12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (trac-15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// trac-9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
					uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Use a noop converter for missing script but not if jsonp
			if ( !isSuccess &&
				jQuery.inArray( "script", s.dataTypes ) > -1 &&
				jQuery.inArray( "json", s.dataTypes ) < 0 ) {
				s.converters[ "text script" ] = function() {};
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( _i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );

jQuery.ajaxPrefilter( function( s ) {
	var i;
	for ( i in s.headers ) {
		if ( i.toLowerCase() === "content-type" ) {
			s.contentType = s.headers[ i ] || "";
		}
	}
} );


jQuery._evalUrl = function( url, options, doc ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (trac-11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options, doc );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// trac-1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see trac-8605, trac-14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// trac-14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( _i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( {
		padding: "inner" + name,
		content: type,
		"": "outer" + name
	}, function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( _i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );

jQuery.each(
	( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( _i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	}
);




// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
// Require that the "whitespace run" starts from a non-whitespace
// to avoid O(N^2) behavior when the engine would try matching "\s+$" at each space position.
var rtrim = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};

jQuery.trim = function( text ) {
	return text == null ?
		"" :
		( text + "" ).replace( rtrim, "$1" );
};



// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (trac-7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (trac-13566)
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*!
  * PhotoSwipe Lightbox 5.3.8 - https://photoswipe.com
  * (c) 2023 Dmytro Semenov
  */
function t(t, i, s) {
  const h = document.createElement(i);
  return t && (h.className = t), s && s.appendChild(h), h;
}
function i(t, i, s) {
  t.style.width = "number" == typeof i ? `${i}px` : i, t.style.height = "number" == typeof s ? `${s}px` : s;
}
const s = "idle",
  h = "loading",
  e = "loaded",
  n = "error";
function o(t, i, s = document) {
  let h = [];
  if (t instanceof Element) h = [t];else if (t instanceof NodeList || Array.isArray(t)) h = Array.from(t);else {
    const e = "string" == typeof t ? t : i;
    e && (h = Array.from(s.querySelectorAll(e)));
  }
  return h;
}
function r() {
  return !(!navigator.vendor || !navigator.vendor.match(/apple/i));
}
class a {
  constructor(t, i) {
    this.type = t, this.defaultPrevented = !1, i && Object.assign(this, i);
  }
  preventDefault() {
    this.defaultPrevented = !0;
  }
}
class c {
  constructor(i, s) {
    if (this.element = t("pswp__img pswp__img--placeholder", i ? "img" : "div", s), i) {
      const t = this.element;
      t.decoding = "async", t.alt = "", t.src = i, t.setAttribute("role", "presentation");
    }
    this.element.setAttribute("aria-hidden", "true");
  }
  setDisplayedSize(t, s) {
    this.element && ("IMG" === this.element.tagName ? (i(this.element, 250, "auto"), this.element.style.transformOrigin = "0 0", this.element.style.transform = function (t, i, s) {
      let h = `translate3d(${t}px,${i || 0}px,0)`;
      return void 0 !== s && (h += ` scale3d(${s},${s},1)`), h;
    }(0, 0, t / 250)) : i(this.element, t, s));
  }
  destroy() {
    this.element?.parentNode && this.element.remove(), this.element = null;
  }
}
class l {
  constructor(t, i, h) {
    this.instance = i, this.data = t, this.index = h, this.element = void 0, this.placeholder = void 0, this.slide = void 0, this.displayedImageWidth = 0, this.displayedImageHeight = 0, this.width = Number(this.data.w) || Number(this.data.width) || 0, this.height = Number(this.data.h) || Number(this.data.height) || 0, this.isAttached = !1, this.hasSlide = !1, this.isDecoding = !1, this.state = s, this.data.type ? this.type = this.data.type : this.data.src ? this.type = "image" : this.type = "html", this.instance.dispatch("contentInit", {
      content: this
    });
  }
  removePlaceholder() {
    this.placeholder && !this.keepPlaceholder() && setTimeout(() => {
      this.placeholder && (this.placeholder.destroy(), this.placeholder = void 0);
    }, 1e3);
  }
  load(i, s) {
    if (this.slide && this.usePlaceholder()) if (this.placeholder) {
      const t = this.placeholder.element;
      t && !t.parentElement && this.slide.container.prepend(t);
    } else {
      const t = this.instance.applyFilters("placeholderSrc", !(!this.data.msrc || !this.slide.isFirstSlide) && this.data.msrc, this);
      this.placeholder = new c(t, this.slide.container);
    }
    this.element && !s || this.instance.dispatch("contentLoad", {
      content: this,
      isLazy: i
    }).defaultPrevented || (this.isImageContent() ? (this.element = t("pswp__img", "img"), this.displayedImageWidth && this.loadImage(i)) : (this.element = t("pswp__content", "div"), this.element.innerHTML = this.data.html || ""), s && this.slide && this.slide.updateContentSize(!0));
  }
  loadImage(t) {
    if (!this.isImageContent() || !this.element || this.instance.dispatch("contentLoadImage", {
      content: this,
      isLazy: t
    }).defaultPrevented) return;
    const i = this.element;
    this.updateSrcsetSizes(), this.data.srcset && (i.srcset = this.data.srcset), i.src = this.data.src ?? "", i.alt = this.data.alt ?? "", this.state = h, i.complete ? this.onLoaded() : (i.onload = () => {
      this.onLoaded();
    }, i.onerror = () => {
      this.onError();
    });
  }
  setSlide(t) {
    this.slide = t, this.hasSlide = !0, this.instance = t.pswp;
  }
  onLoaded() {
    this.state = e, this.slide && this.element && (this.instance.dispatch("loadComplete", {
      slide: this.slide,
      content: this
    }), this.slide.isActive && this.slide.heavyAppended && !this.element.parentNode && (this.append(), this.slide.updateContentSize(!0)), this.state !== e && this.state !== n || this.removePlaceholder());
  }
  onError() {
    this.state = n, this.slide && (this.displayError(), this.instance.dispatch("loadComplete", {
      slide: this.slide,
      isError: !0,
      content: this
    }), this.instance.dispatch("loadError", {
      slide: this.slide,
      content: this
    }));
  }
  isLoading() {
    return this.instance.applyFilters("isContentLoading", this.state === h, this);
  }
  isError() {
    return this.state === n;
  }
  isImageContent() {
    return "image" === this.type;
  }
  setDisplayedSize(t, s) {
    if (this.element && (this.placeholder && this.placeholder.setDisplayedSize(t, s), !this.instance.dispatch("contentResize", {
      content: this,
      width: t,
      height: s
    }).defaultPrevented && (i(this.element, t, s), this.isImageContent() && !this.isError()))) {
      const i = !this.displayedImageWidth && t;
      this.displayedImageWidth = t, this.displayedImageHeight = s, i ? this.loadImage(!1) : this.updateSrcsetSizes(), this.slide && this.instance.dispatch("imageSizeChange", {
        slide: this.slide,
        width: t,
        height: s,
        content: this
      });
    }
  }
  isZoomable() {
    return this.instance.applyFilters("isContentZoomable", this.isImageContent() && this.state !== n, this);
  }
  updateSrcsetSizes() {
    if (!this.isImageContent() || !this.element || !this.data.srcset) return;
    const t = this.element,
      i = this.instance.applyFilters("srcsetSizesWidth", this.displayedImageWidth, this);
    (!t.dataset.largestUsedSize || i > parseInt(t.dataset.largestUsedSize, 10)) && (t.sizes = i + "px", t.dataset.largestUsedSize = String(i));
  }
  usePlaceholder() {
    return this.instance.applyFilters("useContentPlaceholder", this.isImageContent(), this);
  }
  lazyLoad() {
    this.instance.dispatch("contentLazyLoad", {
      content: this
    }).defaultPrevented || this.load(!0);
  }
  keepPlaceholder() {
    return this.instance.applyFilters("isKeepingPlaceholder", this.isLoading(), this);
  }
  destroy() {
    this.hasSlide = !1, this.slide = void 0, this.instance.dispatch("contentDestroy", {
      content: this
    }).defaultPrevented || (this.remove(), this.placeholder && (this.placeholder.destroy(), this.placeholder = void 0), this.isImageContent() && this.element && (this.element.onload = null, this.element.onerror = null, this.element = void 0));
  }
  displayError() {
    if (this.slide) {
      let i = t("pswp__error-msg", "div");
      i.innerText = this.instance.options?.errorMsg ?? "", i = this.instance.applyFilters("contentErrorElement", i, this), this.element = t("pswp__content pswp__error-msg-container", "div"), this.element.appendChild(i), this.slide.container.innerText = "", this.slide.container.appendChild(this.element), this.slide.updateContentSize(!0), this.removePlaceholder();
    }
  }
  append() {
    if (this.isAttached || !this.element) return;
    if (this.isAttached = !0, this.state === n) return void this.displayError();
    if (this.instance.dispatch("contentAppend", {
      content: this
    }).defaultPrevented) return;
    const t = ("decode" in this.element);
    this.isImageContent() ? t && this.slide && (!this.slide.isActive || r()) ? (this.isDecoding = !0, this.element.decode().catch(() => {}).finally(() => {
      this.isDecoding = !1, this.appendImage();
    })) : this.appendImage() : this.slide && !this.element.parentNode && this.slide.container.appendChild(this.element);
  }
  activate() {
    !this.instance.dispatch("contentActivate", {
      content: this
    }).defaultPrevented && this.slide && (this.isImageContent() && this.isDecoding && !r() ? this.appendImage() : this.isError() && this.load(!1, !0), this.slide.holderElement && this.slide.holderElement.setAttribute("aria-hidden", "false"));
  }
  deactivate() {
    this.instance.dispatch("contentDeactivate", {
      content: this
    }), this.slide && this.slide.holderElement && this.slide.holderElement.setAttribute("aria-hidden", "true");
  }
  remove() {
    this.isAttached = !1, this.instance.dispatch("contentRemove", {
      content: this
    }).defaultPrevented || (this.element && this.element.parentNode && this.element.remove(), this.placeholder && this.placeholder.element && this.placeholder.element.remove());
  }
  appendImage() {
    this.isAttached && (this.instance.dispatch("contentAppendImage", {
      content: this
    }).defaultPrevented || (this.slide && this.element && !this.element.parentNode && this.slide.container.appendChild(this.element), this.state !== e && this.state !== n || this.removePlaceholder()));
  }
}
function d(t, i, s, h, e) {
  let n = 0;
  if (i.paddingFn) n = i.paddingFn(s, h, e)[t];else if (i.padding) n = i.padding[t];else {
    const s = "padding" + t[0].toUpperCase() + t.slice(1);
    i[s] && (n = i[s]);
  }
  return Number(n) || 0;
}
class u {
  constructor(t, i, s, h) {
    this.pswp = h, this.options = t, this.itemData = i, this.index = s, this.panAreaSize = null, this.elementSize = null, this.fit = 1, this.fill = 1, this.vFill = 1, this.initial = 1, this.secondary = 1, this.max = 1, this.min = 1;
  }
  update(t, i, s) {
    const h = {
      x: t,
      y: i
    };
    this.elementSize = h, this.panAreaSize = s;
    const e = s.x / h.x,
      n = s.y / h.y;
    this.fit = Math.min(1, e < n ? e : n), this.fill = Math.min(1, e > n ? e : n), this.vFill = Math.min(1, n), this.initial = this.t(), this.secondary = this.i(), this.max = Math.max(this.initial, this.secondary, this.o()), this.min = Math.min(this.fit, this.initial, this.secondary), this.pswp && this.pswp.dispatch("zoomLevelsUpdate", {
      zoomLevels: this,
      slideData: this.itemData
    });
  }
  l(t) {
    const i = t + "ZoomLevel",
      s = this.options[i];
    if (s) return "function" == typeof s ? s(this) : "fill" === s ? this.fill : "fit" === s ? this.fit : Number(s);
  }
  i() {
    let t = this.l("secondary");
    return t || (t = Math.min(1, 3 * this.fit), this.elementSize && t * this.elementSize.x > 4e3 && (t = 4e3 / this.elementSize.x), t);
  }
  t() {
    return this.l("initial") || this.fit;
  }
  o() {
    return this.l("max") || Math.max(1, 4 * this.fit);
  }
}
function p(t, i, s) {
  const h = i.createContentFromData(t, s);
  let e;
  const {
    options: n
  } = i;
  if (n) {
    let o;
    e = new u(n, t, -1), o = i.pswp ? i.pswp.viewportSize : function (t, i) {
      if (t.getViewportSizeFn) {
        const s = t.getViewportSizeFn(t, i);
        if (s) return s;
      }
      return {
        x: document.documentElement.clientWidth,
        y: window.innerHeight
      };
    }(n, i);
    const r = function (t, i, s, h) {
      return {
        x: i.x - d("left", t, i, s, h) - d("right", t, i, s, h),
        y: i.y - d("top", t, i, s, h) - d("bottom", t, i, s, h)
      };
    }(n, o, t, s);
    e.update(h.width, h.height, r);
  }
  return h.lazyLoad(), e && h.setDisplayedSize(Math.ceil(h.width * e.initial), Math.ceil(h.height * e.initial)), h;
}
class m extends class extends class {
  constructor() {
    this.u = {}, this.p = {}, this.pswp = void 0, this.options = void 0;
  }
  addFilter(t, i, s = 100) {
    this.p[t] || (this.p[t] = []), this.p[t]?.push({
      fn: i,
      priority: s
    }), this.p[t]?.sort((t, i) => t.priority - i.priority), this.pswp?.addFilter(t, i, s);
  }
  removeFilter(t, i) {
    this.p[t] && (this.p[t] = this.p[t].filter(t => t.fn !== i)), this.pswp && this.pswp.removeFilter(t, i);
  }
  applyFilters(t, ...i) {
    return this.p[t]?.forEach(t => {
      i[0] = t.fn.apply(this, i);
    }), i[0];
  }
  on(t, i) {
    this.u[t] || (this.u[t] = []), this.u[t]?.push(i), this.pswp?.on(t, i);
  }
  off(t, i) {
    this.u[t] && (this.u[t] = this.u[t].filter(t => i !== t)), this.pswp?.off(t, i);
  }
  dispatch(t, i) {
    if (this.pswp) return this.pswp.dispatch(t, i);
    const s = new a(t, i);
    return this.u[t]?.forEach(t => {
      t.call(this, s);
    }), s;
  }
} {
  getNumItems() {
    let t = 0;
    const i = this.options?.dataSource;
    i && "length" in i ? t = i.length : i && "gallery" in i && (i.items || (i.items = this.m(i.gallery)), i.items && (t = i.items.length));
    const s = this.dispatch("numItems", {
      dataSource: i,
      numItems: t
    });
    return this.applyFilters("numItems", s.numItems, i);
  }
  createContentFromData(t, i) {
    return new l(t, this, i);
  }
  getItemData(t) {
    const i = this.options?.dataSource;
    let s = {};
    Array.isArray(i) ? s = i[t] : i && "gallery" in i && (i.items || (i.items = this.m(i.gallery)), s = i.items[t]);
    let h = s;
    h instanceof Element && (h = this.g(h));
    const e = this.dispatch("itemData", {
      itemData: h || {},
      index: t
    });
    return this.applyFilters("itemData", e.itemData, t);
  }
  m(t) {
    return this.options?.children || this.options?.childSelector ? o(this.options.children, this.options.childSelector, t) || [] : [t];
  }
  g(t) {
    const i = {
        element: t
      },
      s = "A" === t.tagName ? t : t.querySelector("a");
    if (s) {
      i.src = s.dataset.pswpSrc || s.href, s.dataset.pswpSrcset && (i.srcset = s.dataset.pswpSrcset), i.width = s.dataset.pswpWidth ? parseInt(s.dataset.pswpWidth, 10) : 0, i.height = s.dataset.pswpHeight ? parseInt(s.dataset.pswpHeight, 10) : 0, i.w = i.width, i.h = i.height, s.dataset.pswpType && (i.type = s.dataset.pswpType);
      const h = t.querySelector("img");
      h && (i.msrc = h.currentSrc || h.src, i.alt = h.getAttribute("alt") ?? ""), (s.dataset.pswpCropped || s.dataset.cropped) && (i.thumbCropped = !0);
    }
    return this.applyFilters("domItemData", i, t, s);
  }
  lazyLoadData(t, i) {
    return p(t, this, i);
  }
} {
  constructor(t) {
    super(), this.options = t || {}, this.v = 0, this.shouldOpen = !1, this._ = void 0, this.onThumbnailsClick = this.onThumbnailsClick.bind(this);
  }
  init() {
    o(this.options.gallery, this.options.gallerySelector).forEach(t => {
      t.addEventListener("click", this.onThumbnailsClick, !1);
    });
  }
  onThumbnailsClick(t) {
    if (function (t) {
      return "button" in t && 1 === t.button || t.ctrlKey || t.metaKey || t.altKey || t.shiftKey;
    }(t) || window.pswp) return;
    let i = {
      x: t.clientX,
      y: t.clientY
    };
    i.x || i.y || (i = null);
    let s = this.getClickedIndex(t);
    s = this.applyFilters("clickedIndex", s, t, this);
    const h = {
      gallery: t.currentTarget
    };
    s >= 0 && (t.preventDefault(), this.loadAndOpen(s, h, i));
  }
  getClickedIndex(t) {
    if (this.options.getClickedIndexFn) return this.options.getClickedIndexFn.call(this, t);
    const i = t.target,
      s = o(this.options.children, this.options.childSelector, t.currentTarget).findIndex(t => t === i || t.contains(i));
    return -1 !== s ? s : this.options.children || this.options.childSelector ? -1 : 0;
  }
  loadAndOpen(t, i, s) {
    return !window.pswp && (this.options.index = t, this.options.initialPointerPos = s, this.shouldOpen = !0, this.preload(t, i), !0);
  }
  preload(t, i) {
    const {
      options: s
    } = this;
    i && (s.dataSource = i);
    const h = [],
      e = typeof s.pswpModule;
    if ("function" == typeof (n = s.pswpModule) && n.prototype && n.prototype.goTo) h.push(Promise.resolve(s.pswpModule));else {
      if ("string" === e) throw new Error("pswpModule as string is no longer supported");
      if ("function" !== e) throw new Error("pswpModule is not valid");
      h.push(s.pswpModule());
    }
    var n;
    "function" == typeof s.openPromise && h.push(s.openPromise()), !1 !== s.preloadFirstSlide && t >= 0 && (this._ = function (t, i) {
      const s = i.getItemData(t);
      if (!i.dispatch("lazyLoadSlide", {
        index: t,
        itemData: s
      }).defaultPrevented) return p(s, i, t);
    }(t, this));
    const o = ++this.v;
    Promise.all(h).then(t => {
      if (this.shouldOpen) {
        const i = t[0];
        this.I(i, o);
      }
    });
  }
  I(t, i) {
    if (i !== this.v && this.shouldOpen) return;
    if (this.shouldOpen = !1, window.pswp) return;
    const s = "object" == typeof t ? new t.default(this.options) : new t(this.options);
    this.pswp = s, window.pswp = s, Object.keys(this.u).forEach(t => {
      this.u[t]?.forEach(i => {
        s.on(t, i);
      });
    }), Object.keys(this.p).forEach(t => {
      this.p[t]?.forEach(i => {
        s.addFilter(t, i.fn, i.priority);
      });
    }), this._ && (s.contentLoader.addToCache(this._), this._ = void 0), s.on("destroy", () => {
      this.pswp = void 0, delete window.pswp;
    }), s.init();
  }
  destroy() {
    this.pswp?.destroy(), this.shouldOpen = !1, this.u = {}, o(this.options.gallery, this.options.gallerySelector).forEach(t => {
      t.removeEventListener("click", this.onThumbnailsClick, !1);
    });
  }
}
exports.default = m;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*!
  * PhotoSwipe 5.3.8 - https://photoswipe.com
  * (c) 2023 Dmytro Semenov
  */
function t(t, i, s) {
  const h = document.createElement(i);
  return t && (h.className = t), s && s.appendChild(h), h;
}
function i(t, i) {
  return t.x = i.x, t.y = i.y, void 0 !== i.id && (t.id = i.id), t;
}
function s(t) {
  t.x = Math.round(t.x), t.y = Math.round(t.y);
}
function h(t, i) {
  const s = Math.abs(t.x - i.x),
    h = Math.abs(t.y - i.y);
  return Math.sqrt(s * s + h * h);
}
function e(t, i) {
  return t.x === i.x && t.y === i.y;
}
function n(t, i, s) {
  return Math.min(Math.max(t, i), s);
}
function o(t, i, s) {
  let h = `translate3d(${t}px,${i || 0}px,0)`;
  return void 0 !== s && (h += ` scale3d(${s},${s},1)`), h;
}
function r(t, i, s, h) {
  t.style.transform = o(i, s, h);
}
function a(t, i, s, h) {
  t.style.transition = i ? `${i} ${s}ms ${h || "cubic-bezier(.4,0,.22,1)"}` : "none";
}
function c(t, i, s) {
  t.style.width = "number" == typeof i ? `${i}px` : i, t.style.height = "number" == typeof s ? `${s}px` : s;
}
const l = "idle",
  p = "loading",
  u = "loaded",
  d = "error";
function m() {
  return !(!navigator.vendor || !navigator.vendor.match(/apple/i));
}
let f = !1;
try {
  window.addEventListener("test", null, Object.defineProperty({}, "passive", {
    get: () => {
      f = !0;
    }
  }));
} catch (t) {}
class w {
  constructor() {
    this.t = [];
  }
  add(t, i, s, h) {
    this.i(t, i, s, h);
  }
  remove(t, i, s, h) {
    this.i(t, i, s, h, !0);
  }
  removeAll() {
    this.t.forEach(t => {
      this.i(t.target, t.type, t.listener, t.passive, !0, !0);
    }), this.t = [];
  }
  i(t, i, s, h, e, n) {
    if (!t) return;
    const o = e ? "removeEventListener" : "addEventListener";
    i.split(" ").forEach(i => {
      if (i) {
        n || (e ? this.t = this.t.filter(h => h.type !== i || h.listener !== s || h.target !== t) : this.t.push({
          target: t,
          type: i,
          listener: s,
          passive: h
        }));
        const r = !!f && {
          passive: h || !1
        };
        t[o](i, s, r);
      }
    });
  }
}
function g(t, i) {
  if (t.getViewportSizeFn) {
    const s = t.getViewportSizeFn(t, i);
    if (s) return s;
  }
  return {
    x: document.documentElement.clientWidth,
    y: window.innerHeight
  };
}
function v(t, i, s, h, e) {
  let n = 0;
  if (i.paddingFn) n = i.paddingFn(s, h, e)[t];else if (i.padding) n = i.padding[t];else {
    const s = "padding" + t[0].toUpperCase() + t.slice(1);
    i[s] && (n = i[s]);
  }
  return Number(n) || 0;
}
function y(t, i, s, h) {
  return {
    x: i.x - v("left", t, i, s, h) - v("right", t, i, s, h),
    y: i.y - v("top", t, i, s, h) - v("bottom", t, i, s, h)
  };
}
class _ {
  constructor(t) {
    this.slide = t, this.currZoomLevel = 1, this.center = {
      x: 0,
      y: 0
    }, this.max = {
      x: 0,
      y: 0
    }, this.min = {
      x: 0,
      y: 0
    };
  }
  update(t) {
    this.currZoomLevel = t, this.slide.width ? (this.o("x"), this.o("y"), this.slide.pswp.dispatch("calcBounds", {
      slide: this.slide
    })) : this.reset();
  }
  o(t) {
    const {
        pswp: i
      } = this.slide,
      s = this.slide["x" === t ? "width" : "height"] * this.currZoomLevel,
      h = v("x" === t ? "left" : "top", i.options, i.viewportSize, this.slide.data, this.slide.index),
      e = this.slide.panAreaSize[t];
    this.center[t] = Math.round((e - s) / 2) + h, this.max[t] = s > e ? Math.round(e - s) + h : this.center[t], this.min[t] = s > e ? h : this.center[t];
  }
  reset() {
    this.center.x = 0, this.center.y = 0, this.max.x = 0, this.max.y = 0, this.min.x = 0, this.min.y = 0;
  }
  correctPan(t, i) {
    return n(i, this.max[t], this.min[t]);
  }
}
class x {
  constructor(t, i, s, h) {
    this.pswp = h, this.options = t, this.itemData = i, this.index = s, this.panAreaSize = null, this.elementSize = null, this.fit = 1, this.fill = 1, this.vFill = 1, this.initial = 1, this.secondary = 1, this.max = 1, this.min = 1;
  }
  update(t, i, s) {
    const h = {
      x: t,
      y: i
    };
    this.elementSize = h, this.panAreaSize = s;
    const e = s.x / h.x,
      n = s.y / h.y;
    this.fit = Math.min(1, e < n ? e : n), this.fill = Math.min(1, e > n ? e : n), this.vFill = Math.min(1, n), this.initial = this.l(), this.secondary = this.p(), this.max = Math.max(this.initial, this.secondary, this.u()), this.min = Math.min(this.fit, this.initial, this.secondary), this.pswp && this.pswp.dispatch("zoomLevelsUpdate", {
      zoomLevels: this,
      slideData: this.itemData
    });
  }
  m(t) {
    const i = t + "ZoomLevel",
      s = this.options[i];
    if (s) return "function" == typeof s ? s(this) : "fill" === s ? this.fill : "fit" === s ? this.fit : Number(s);
  }
  p() {
    let t = this.m("secondary");
    return t || (t = Math.min(1, 3 * this.fit), this.elementSize && t * this.elementSize.x > 4e3 && (t = 4e3 / this.elementSize.x), t);
  }
  l() {
    return this.m("initial") || this.fit;
  }
  u() {
    return this.m("max") || Math.max(1, 4 * this.fit);
  }
}
class b {
  constructor(i, s, h) {
    this.data = i, this.index = s, this.pswp = h, this.isActive = s === h.currIndex, this.currentResolution = 0, this.panAreaSize = {
      x: 0,
      y: 0
    }, this.pan = {
      x: 0,
      y: 0
    }, this.isFirstSlide = this.isActive && !h.opener.isOpen, this.zoomLevels = new x(h.options, i, s, h), this.pswp.dispatch("gettingData", {
      slide: this,
      data: this.data,
      index: s
    }), this.content = this.pswp.contentLoader.getContentBySlide(this), this.container = t("pswp__zoom-wrap", "div"), this.holderElement = null, this.currZoomLevel = 1, this.width = this.content.width, this.height = this.content.height, this.heavyAppended = !1, this.bounds = new _(this), this.prevDisplayedWidth = -1, this.prevDisplayedHeight = -1, this.pswp.dispatch("slideInit", {
      slide: this
    });
  }
  setIsActive(t) {
    t && !this.isActive ? this.activate() : !t && this.isActive && this.deactivate();
  }
  append(t) {
    this.holderElement = t, this.container.style.transformOrigin = "0 0", this.data && (this.calculateSize(), this.load(), this.updateContentSize(), this.appendHeavy(), this.holderElement.appendChild(this.container), this.zoomAndPanToInitial(), this.pswp.dispatch("firstZoomPan", {
      slide: this
    }), this.applyCurrentZoomPan(), this.pswp.dispatch("afterSetContent", {
      slide: this
    }), this.isActive && this.activate());
  }
  load() {
    this.content.load(!1), this.pswp.dispatch("slideLoad", {
      slide: this
    });
  }
  appendHeavy() {
    const {
      pswp: t
    } = this;
    !this.heavyAppended && t.opener.isOpen && !t.mainScroll.isShifted() && (this.isActive, 1) && (this.pswp.dispatch("appendHeavy", {
      slide: this
    }).defaultPrevented || (this.heavyAppended = !0, this.content.append(), this.pswp.dispatch("appendHeavyContent", {
      slide: this
    })));
  }
  activate() {
    this.isActive = !0, this.appendHeavy(), this.content.activate(), this.pswp.dispatch("slideActivate", {
      slide: this
    });
  }
  deactivate() {
    this.isActive = !1, this.content.deactivate(), this.currZoomLevel !== this.zoomLevels.initial && this.calculateSize(), this.currentResolution = 0, this.zoomAndPanToInitial(), this.applyCurrentZoomPan(), this.updateContentSize(), this.pswp.dispatch("slideDeactivate", {
      slide: this
    });
  }
  destroy() {
    this.content.hasSlide = !1, this.content.remove(), this.container.remove(), this.pswp.dispatch("slideDestroy", {
      slide: this
    });
  }
  resize() {
    this.currZoomLevel !== this.zoomLevels.initial && this.isActive ? (this.calculateSize(), this.bounds.update(this.currZoomLevel), this.panTo(this.pan.x, this.pan.y)) : (this.calculateSize(), this.currentResolution = 0, this.zoomAndPanToInitial(), this.applyCurrentZoomPan(), this.updateContentSize());
  }
  updateContentSize(t) {
    const i = this.currentResolution || this.zoomLevels.initial;
    if (!i) return;
    const s = Math.round(this.width * i) || this.pswp.viewportSize.x,
      h = Math.round(this.height * i) || this.pswp.viewportSize.y;
    (this.sizeChanged(s, h) || t) && this.content.setDisplayedSize(s, h);
  }
  sizeChanged(t, i) {
    return (t !== this.prevDisplayedWidth || i !== this.prevDisplayedHeight) && (this.prevDisplayedWidth = t, this.prevDisplayedHeight = i, !0);
  }
  getPlaceholderElement() {
    return this.content.placeholder?.element;
  }
  zoomTo(t, i, h, e) {
    const {
      pswp: o
    } = this;
    if (!this.isZoomable() || o.mainScroll.isShifted()) return;
    o.dispatch("beforeZoomTo", {
      destZoomLevel: t,
      centerPoint: i,
      transitionDuration: h
    }), o.animations.stopAllPan();
    const r = this.currZoomLevel;
    e || (t = n(t, this.zoomLevels.min, this.zoomLevels.max)), this.setZoomLevel(t), this.pan.x = this.calculateZoomToPanOffset("x", i, r), this.pan.y = this.calculateZoomToPanOffset("y", i, r), s(this.pan);
    const a = () => {
      this.g(t), this.applyCurrentZoomPan();
    };
    h ? o.animations.startTransition({
      isPan: !0,
      name: "zoomTo",
      target: this.container,
      transform: this.getCurrentTransform(),
      onComplete: a,
      duration: h,
      easing: o.options.easing
    }) : a();
  }
  toggleZoom(t) {
    this.zoomTo(this.currZoomLevel === this.zoomLevels.initial ? this.zoomLevels.secondary : this.zoomLevels.initial, t, this.pswp.options.zoomAnimationDuration);
  }
  setZoomLevel(t) {
    this.currZoomLevel = t, this.bounds.update(this.currZoomLevel);
  }
  calculateZoomToPanOffset(t, i, s) {
    if (0 === this.bounds.max[t] - this.bounds.min[t]) return this.bounds.center[t];
    i || (i = this.pswp.getViewportCenterPoint()), s || (s = this.zoomLevels.initial);
    const h = this.currZoomLevel / s;
    return this.bounds.correctPan(t, (this.pan[t] - i[t]) * h + i[t]);
  }
  panTo(t, i) {
    this.pan.x = this.bounds.correctPan("x", t), this.pan.y = this.bounds.correctPan("y", i), this.applyCurrentZoomPan();
  }
  isPannable() {
    return Boolean(this.width) && this.currZoomLevel > this.zoomLevels.fit;
  }
  isZoomable() {
    return Boolean(this.width) && this.content.isZoomable();
  }
  applyCurrentZoomPan() {
    this.v(this.pan.x, this.pan.y, this.currZoomLevel), this === this.pswp.currSlide && this.pswp.dispatch("zoomPanUpdate", {
      slide: this
    });
  }
  zoomAndPanToInitial() {
    this.currZoomLevel = this.zoomLevels.initial, this.bounds.update(this.currZoomLevel), i(this.pan, this.bounds.center), this.pswp.dispatch("initialZoomPan", {
      slide: this
    });
  }
  v(t, i, s) {
    s /= this.currentResolution || this.zoomLevels.initial, r(this.container, t, i, s);
  }
  calculateSize() {
    const {
      pswp: t
    } = this;
    i(this.panAreaSize, y(t.options, t.viewportSize, this.data, this.index)), this.zoomLevels.update(this.width, this.height, this.panAreaSize), t.dispatch("calcSlideSize", {
      slide: this
    });
  }
  getCurrentTransform() {
    const t = this.currZoomLevel / (this.currentResolution || this.zoomLevels.initial);
    return o(this.pan.x, this.pan.y, t);
  }
  g(t) {
    t !== this.currentResolution && (this.currentResolution = t, this.updateContentSize(), this.pswp.dispatch("resolutionChanged"));
  }
}
class S {
  constructor(t) {
    this.gestures = t, this.pswp = t.pswp, this.startPan = {
      x: 0,
      y: 0
    };
  }
  start() {
    this.pswp.currSlide && i(this.startPan, this.pswp.currSlide.pan), this.pswp.animations.stopAll();
  }
  change() {
    const {
        p1: t,
        prevP1: i,
        dragAxis: h
      } = this.gestures,
      {
        currSlide: e
      } = this.pswp;
    if ("y" === h && this.pswp.options.closeOnVerticalDrag && e && e.currZoomLevel <= e.zoomLevels.fit && !this.gestures.isMultitouch) {
      const s = e.pan.y + (t.y - i.y);
      if (!this.pswp.dispatch("verticalDrag", {
        panY: s
      }).defaultPrevented) {
        this._("y", s, .6);
        const t = 1 - Math.abs(this.S(e.pan.y));
        this.pswp.applyBgOpacity(t), e.applyCurrentZoomPan();
      }
    } else {
      this.M("x") || (this.M("y"), e && (s(e.pan), e.applyCurrentZoomPan()));
    }
  }
  end() {
    const {
        velocity: t
      } = this.gestures,
      {
        mainScroll: i,
        currSlide: s
      } = this.pswp;
    let h = 0;
    if (this.pswp.animations.stopAll(), i.isShifted()) {
      const s = (i.x - i.getCurrSlideX()) / this.pswp.viewportSize.x;
      t.x < -.5 && s < 0 || t.x < .1 && s < -.5 ? (h = 1, t.x = Math.min(t.x, 0)) : (t.x > .5 && s > 0 || t.x > -.1 && s > .5) && (h = -1, t.x = Math.max(t.x, 0)), i.moveIndexBy(h, !0, t.x);
    }
    s && s.currZoomLevel > s.zoomLevels.max || this.gestures.isMultitouch ? this.gestures.zoomLevels.correctZoomPan(!0) : (this.P("x"), this.P("y"));
  }
  P(t) {
    const {
        velocity: i
      } = this.gestures,
      {
        currSlide: s
      } = this.pswp;
    if (!s) return;
    const {
        pan: h,
        bounds: e
      } = s,
      o = h[t],
      r = this.pswp.bgOpacity < 1 && "y" === t,
      a = o + function (t, i) {
        return t * i / (1 - i);
      }(i[t], .995);
    if (r) {
      const t = this.S(o),
        i = this.S(a);
      if (t < 0 && i < -.4 || t > 0 && i > .4) return void this.pswp.close();
    }
    const c = e.correctPan(t, a);
    if (o === c) return;
    const l = c === a ? 1 : .82,
      p = this.pswp.bgOpacity,
      u = c - o;
    this.pswp.animations.startSpring({
      name: "panGesture" + t,
      isPan: !0,
      start: o,
      end: c,
      velocity: i[t],
      dampingRatio: l,
      onUpdate: i => {
        if (r && this.pswp.bgOpacity < 1) {
          const t = 1 - (c - i) / u;
          this.pswp.applyBgOpacity(n(p + (1 - p) * t, 0, 1));
        }
        h[t] = Math.floor(i), s.applyCurrentZoomPan();
      }
    });
  }
  M(t) {
    const {
        p1: i,
        dragAxis: s,
        prevP1: h,
        isMultitouch: e
      } = this.gestures,
      {
        currSlide: n,
        mainScroll: o
      } = this.pswp,
      r = i[t] - h[t],
      a = o.x + r;
    if (!r || !n) return !1;
    if ("x" === t && !n.isPannable() && !e) return o.moveTo(a, !0), !0;
    const {
        bounds: c
      } = n,
      l = n.pan[t] + r;
    if (this.pswp.options.allowPanToNext && "x" === s && "x" === t && !e) {
      const i = o.getCurrSlideX(),
        s = o.x - i,
        h = r > 0,
        e = !h;
      if (l > c.min[t] && h) {
        if (c.min[t] <= this.startPan[t]) return o.moveTo(a, !0), !0;
        this._(t, l);
      } else if (l < c.max[t] && e) {
        if (this.startPan[t] <= c.max[t]) return o.moveTo(a, !0), !0;
        this._(t, l);
      } else if (0 !== s) {
        if (s > 0) return o.moveTo(Math.max(a, i), !0), !0;
        if (s < 0) return o.moveTo(Math.min(a, i), !0), !0;
      } else this._(t, l);
    } else "y" === t && (o.isShifted() || c.min.y === c.max.y) || this._(t, l);
    return !1;
  }
  S(t) {
    return (t - (this.pswp.currSlide?.bounds.center.y ?? 0)) / (this.pswp.viewportSize.y / 3);
  }
  _(t, i, s) {
    const {
      currSlide: h
    } = this.pswp;
    if (!h) return;
    const {
      pan: e,
      bounds: n
    } = h;
    if (n.correctPan(t, i) !== i || s) {
      const h = Math.round(i - e[t]);
      e[t] += h * (s || .35);
    } else e[t] = i;
  }
}
function z(t, i, s) {
  return t.x = (i.x + s.x) / 2, t.y = (i.y + s.y) / 2, t;
}
class M {
  constructor(t) {
    this.gestures = t, this.C = {
      x: 0,
      y: 0
    }, this.T = {
      x: 0,
      y: 0
    }, this.A = {
      x: 0,
      y: 0
    }, this.D = !1, this.I = 1;
  }
  start() {
    const {
      currSlide: t
    } = this.gestures.pswp;
    t && (this.I = t.currZoomLevel, i(this.C, t.pan)), this.gestures.pswp.animations.stopAllPan(), this.D = !1;
  }
  change() {
    const {
        p1: t,
        startP1: i,
        p2: s,
        startP2: e,
        pswp: n
      } = this.gestures,
      {
        currSlide: o
      } = n;
    if (!o) return;
    const r = o.zoomLevels.min,
      a = o.zoomLevels.max;
    if (!o.isZoomable() || n.mainScroll.isShifted()) return;
    z(this.T, i, e), z(this.A, t, s);
    let c = 1 / h(i, e) * h(t, s) * this.I;
    if (c > o.zoomLevels.initial + o.zoomLevels.initial / 15 && (this.D = !0), c < r) {
      if (n.options.pinchToClose && !this.D && this.I <= o.zoomLevels.initial) {
        const t = 1 - (r - c) / (r / 1.2);
        n.dispatch("pinchClose", {
          bgOpacity: t
        }).defaultPrevented || n.applyBgOpacity(t);
      } else c = r - .15 * (r - c);
    } else c > a && (c = a + .05 * (c - a));
    o.pan.x = this.L("x", c), o.pan.y = this.L("y", c), o.setZoomLevel(c), o.applyCurrentZoomPan();
  }
  end() {
    const {
        pswp: t
      } = this.gestures,
      {
        currSlide: i
      } = t;
    (!i || i.currZoomLevel < i.zoomLevels.initial) && !this.D && t.options.pinchToClose ? t.close() : this.correctZoomPan();
  }
  L(t, i) {
    const s = i / this.I;
    return this.A[t] - (this.T[t] - this.C[t]) * s;
  }
  correctZoomPan(t) {
    const {
        pswp: s
      } = this.gestures,
      {
        currSlide: h
      } = s;
    if (!h?.isZoomable()) return;
    0 === this.A.x && (t = !0);
    const o = h.currZoomLevel;
    let r,
      a = !0;
    o < h.zoomLevels.initial ? r = h.zoomLevels.initial : o > h.zoomLevels.max ? r = h.zoomLevels.max : (a = !1, r = o);
    const c = s.bgOpacity,
      l = s.bgOpacity < 1,
      p = i({
        x: 0,
        y: 0
      }, h.pan);
    let u = i({
      x: 0,
      y: 0
    }, p);
    t && (this.A.x = 0, this.A.y = 0, this.T.x = 0, this.T.y = 0, this.I = o, i(this.C, p)), a && (u = {
      x: this.L("x", r),
      y: this.L("y", r)
    }), h.setZoomLevel(r), u = {
      x: h.bounds.correctPan("x", u.x),
      y: h.bounds.correctPan("y", u.y)
    }, h.setZoomLevel(o);
    const d = !e(u, p);
    if (!d && !a && !l) return h.g(r), void h.applyCurrentZoomPan();
    s.animations.stopAllPan(), s.animations.startSpring({
      isPan: !0,
      start: 0,
      end: 1e3,
      velocity: 0,
      dampingRatio: 1,
      naturalFrequency: 40,
      onUpdate: t => {
        if (t /= 1e3, d || a) {
          if (d && (h.pan.x = p.x + (u.x - p.x) * t, h.pan.y = p.y + (u.y - p.y) * t), a) {
            const i = o + (r - o) * t;
            h.setZoomLevel(i);
          }
          h.applyCurrentZoomPan();
        }
        l && s.bgOpacity < 1 && s.applyBgOpacity(n(c + (1 - c) * t, 0, 1));
      },
      onComplete: () => {
        h.g(r), h.applyCurrentZoomPan();
      }
    });
  }
}
function P(t) {
  return !!t.target.closest(".pswp__container");
}
class C {
  constructor(t) {
    this.gestures = t;
  }
  click(t, i) {
    const s = i.target.classList,
      h = s.contains("pswp__img"),
      e = s.contains("pswp__item") || s.contains("pswp__zoom-wrap");
    h ? this.k("imageClick", t, i) : e && this.k("bgClick", t, i);
  }
  tap(t, i) {
    P(i) && this.k("tap", t, i);
  }
  doubleTap(t, i) {
    P(i) && this.k("doubleTap", t, i);
  }
  k(t, i, s) {
    const {
        pswp: h
      } = this.gestures,
      {
        currSlide: e
      } = h,
      n = t + "Action",
      o = h.options[n];
    if (!h.dispatch(n, {
      point: i,
      originalEvent: s
    }).defaultPrevented) if ("function" != typeof o) switch (o) {
      case "close":
      case "next":
        h[o]();
        break;
      case "zoom":
        e?.toggleZoom(i);
        break;
      case "zoom-or-close":
        e?.isZoomable() && e.zoomLevels.secondary !== e.zoomLevels.initial ? e.toggleZoom(i) : h.options.clickToCloseNonZoomable && h.close();
        break;
      case "toggle-controls":
        this.gestures.pswp.element?.classList.toggle("pswp--ui-visible");
    } else o.call(h, i, s);
  }
}
class T {
  constructor(t) {
    this.pswp = t, this.dragAxis = null, this.p1 = {
      x: 0,
      y: 0
    }, this.p2 = {
      x: 0,
      y: 0
    }, this.prevP1 = {
      x: 0,
      y: 0
    }, this.prevP2 = {
      x: 0,
      y: 0
    }, this.startP1 = {
      x: 0,
      y: 0
    }, this.startP2 = {
      x: 0,
      y: 0
    }, this.velocity = {
      x: 0,
      y: 0
    }, this.Z = {
      x: 0,
      y: 0
    }, this.B = {
      x: 0,
      y: 0
    }, this.F = 0, this.O = [], this.R = "ontouchstart" in window, this.N = !!window.PointerEvent, this.supportsTouch = this.R || this.N && navigator.maxTouchPoints > 1, this.F = 0, this.U = 0, this.V = !1, this.isMultitouch = !1, this.isDragging = !1, this.isZooming = !1, this.raf = null, this.G = null, this.supportsTouch || (t.options.allowPanToNext = !1), this.drag = new S(this), this.zoomLevels = new M(this), this.tapHandler = new C(this), t.on("bindEvents", () => {
      t.events.add(t.scrollWrap, "click", this.$.bind(this)), this.N ? this.q("pointer", "down", "up", "cancel") : this.R ? (this.q("touch", "start", "end", "cancel"), t.scrollWrap && (t.scrollWrap.ontouchmove = () => {}, t.scrollWrap.ontouchend = () => {})) : this.q("mouse", "down", "up");
    });
  }
  q(t, i, s, h) {
    const {
        pswp: e
      } = this,
      {
        events: n
      } = e,
      o = h ? t + h : "";
    n.add(e.scrollWrap, t + i, this.onPointerDown.bind(this)), n.add(window, t + "move", this.onPointerMove.bind(this)), n.add(window, t + s, this.onPointerUp.bind(this)), o && n.add(e.scrollWrap, o, this.onPointerUp.bind(this));
  }
  onPointerDown(t) {
    const s = "mousedown" === t.type || "mouse" === t.pointerType;
    if (s && t.button > 0) return;
    const {
      pswp: h
    } = this;
    h.opener.isOpen ? h.dispatch("pointerDown", {
      originalEvent: t
    }).defaultPrevented || (s && (h.mouseDetected(), this.H(t)), h.animations.stopAll(), this.K(t, "down"), 1 === this.F && (this.dragAxis = null, i(this.startP1, this.p1)), this.F > 1 ? (this.W(), this.isMultitouch = !0) : this.isMultitouch = !1) : t.preventDefault();
  }
  onPointerMove(t) {
    t.preventDefault(), this.F && (this.K(t, "move"), this.pswp.dispatch("pointerMove", {
      originalEvent: t
    }).defaultPrevented || (1 !== this.F || this.isDragging ? this.F > 1 && !this.isZooming && (this.j(), this.isZooming = !0, this.X(), this.zoomLevels.start(), this.Y(), this.J()) : (this.dragAxis || this.tt(), this.dragAxis && !this.isDragging && (this.isZooming && (this.isZooming = !1, this.zoomLevels.end()), this.isDragging = !0, this.W(), this.X(), this.U = Date.now(), this.V = !1, i(this.B, this.p1), this.velocity.x = 0, this.velocity.y = 0, this.drag.start(), this.Y(), this.J()))));
  }
  j() {
    this.isDragging && (this.isDragging = !1, this.V || this.it(!0), this.drag.end(), this.dragAxis = null);
  }
  onPointerUp(t) {
    this.F && (this.K(t, "up"), this.pswp.dispatch("pointerUp", {
      originalEvent: t
    }).defaultPrevented || (0 === this.F && (this.Y(), this.isDragging ? this.j() : this.isZooming || this.isMultitouch || this.st(t)), this.F < 2 && this.isZooming && (this.isZooming = !1, this.zoomLevels.end(), 1 === this.F && (this.dragAxis = null, this.X()))));
  }
  J() {
    (this.isDragging || this.isZooming) && (this.it(), this.isDragging ? e(this.p1, this.prevP1) || this.drag.change() : e(this.p1, this.prevP1) && e(this.p2, this.prevP2) || this.zoomLevels.change(), this.ht(), this.raf = requestAnimationFrame(this.J.bind(this)));
  }
  it(t) {
    const s = Date.now(),
      h = s - this.U;
    h < 50 && !t || (this.velocity.x = this.et("x", h), this.velocity.y = this.et("y", h), this.U = s, i(this.B, this.p1), this.V = !0);
  }
  st(t) {
    const {
      mainScroll: s
    } = this.pswp;
    if (s.isShifted()) return void s.moveIndexBy(0, !0);
    if (t.type.indexOf("cancel") > 0) return;
    if ("mouseup" === t.type || "mouse" === t.pointerType) return void this.tapHandler.click(this.startP1, t);
    const e = this.pswp.options.doubleTapAction ? 300 : 0;
    this.G ? (this.W(), h(this.Z, this.startP1) < 25 && this.tapHandler.doubleTap(this.startP1, t)) : (i(this.Z, this.startP1), this.G = setTimeout(() => {
      this.tapHandler.tap(this.startP1, t), this.W();
    }, e));
  }
  W() {
    this.G && (clearTimeout(this.G), this.G = null);
  }
  et(t, i) {
    const s = this.p1[t] - this.B[t];
    return Math.abs(s) > 1 && i > 5 ? s / i : 0;
  }
  Y() {
    this.raf && (cancelAnimationFrame(this.raf), this.raf = null);
  }
  H(t) {
    t.preventDefault();
  }
  K(t, s) {
    if (this.N) {
      const h = t,
        e = this.O.findIndex(t => t.id === h.pointerId);
      "up" === s && e > -1 ? this.O.splice(e, 1) : "down" === s && -1 === e ? this.O.push(this.nt(h, {
        x: 0,
        y: 0
      })) : e > -1 && this.nt(h, this.O[e]), this.F = this.O.length, this.F > 0 && i(this.p1, this.O[0]), this.F > 1 && i(this.p2, this.O[1]);
    } else {
      const i = t;
      this.F = 0, i.type.indexOf("touch") > -1 ? i.touches && i.touches.length > 0 && (this.nt(i.touches[0], this.p1), this.F++, i.touches.length > 1 && (this.nt(i.touches[1], this.p2), this.F++)) : (this.nt(t, this.p1), "up" === s ? this.F = 0 : this.F++);
    }
  }
  ht() {
    i(this.prevP1, this.p1), i(this.prevP2, this.p2);
  }
  X() {
    i(this.startP1, this.p1), i(this.startP2, this.p2), this.ht();
  }
  tt() {
    if (this.pswp.mainScroll.isShifted()) this.dragAxis = "x";else {
      const t = Math.abs(this.p1.x - this.startP1.x) - Math.abs(this.p1.y - this.startP1.y);
      if (0 !== t) {
        const i = t > 0 ? "x" : "y";
        Math.abs(this.p1[i] - this.startP1[i]) >= 10 && (this.dragAxis = i);
      }
    }
  }
  nt(t, i) {
    return i.x = t.pageX - this.pswp.offset.x, i.y = t.pageY - this.pswp.offset.y, "pointerId" in t ? i.id = t.pointerId : void 0 !== t.identifier && (i.id = t.identifier), i;
  }
  $(t) {
    this.pswp.mainScroll.isShifted() && (t.preventDefault(), t.stopPropagation());
  }
}
class A {
  constructor(t) {
    this.pswp = t, this.x = 0, this.slideWidth = 0, this.ot = 0, this.rt = 0, this.ct = -1, this.itemHolders = [];
  }
  resize(t) {
    const {
        pswp: i
      } = this,
      s = Math.round(i.viewportSize.x + i.viewportSize.x * i.options.spacing),
      h = s !== this.slideWidth;
    h && (this.slideWidth = s, this.moveTo(this.getCurrSlideX())), this.itemHolders.forEach((i, s) => {
      h && r(i.el, (s + this.ct) * this.slideWidth), t && i.slide && i.slide.resize();
    });
  }
  resetPosition() {
    this.ot = 0, this.rt = 0, this.slideWidth = 0, this.ct = -1;
  }
  appendHolders() {
    this.itemHolders = [];
    for (let i = 0; i < 3; i++) {
      const s = t("pswp__item", "div", this.pswp.container);
      s.setAttribute("role", "group"), s.setAttribute("aria-roledescription", "slide"), s.setAttribute("aria-hidden", "true"), s.style.display = 1 === i ? "block" : "none", this.itemHolders.push({
        el: s
      });
    }
  }
  canBeSwiped() {
    return this.pswp.getNumItems() > 1;
  }
  moveIndexBy(t, i, s) {
    const {
      pswp: h
    } = this;
    let e = h.potentialIndex + t;
    const n = h.getNumItems();
    if (h.canLoop()) {
      e = h.getLoopedIndex(e);
      const i = (t + n) % n;
      t = i <= n / 2 ? i : i - n;
    } else e < 0 ? e = 0 : e >= n && (e = n - 1), t = e - h.potentialIndex;
    h.potentialIndex = e, this.ot -= t, h.animations.stopMainScroll();
    const o = this.getCurrSlideX();
    if (i) {
      h.animations.startSpring({
        isMainScroll: !0,
        start: this.x,
        end: o,
        velocity: s || 0,
        naturalFrequency: 30,
        dampingRatio: 1,
        onUpdate: t => {
          this.moveTo(t);
        },
        onComplete: () => {
          this.updateCurrItem(), h.appendHeavy();
        }
      });
      let t = h.potentialIndex - h.currIndex;
      if (h.canLoop()) {
        const i = (t + n) % n;
        t = i <= n / 2 ? i : i - n;
      }
      Math.abs(t) > 1 && this.updateCurrItem();
    } else this.moveTo(o), this.updateCurrItem();
    return Boolean(t);
  }
  getCurrSlideX() {
    return this.slideWidth * this.ot;
  }
  isShifted() {
    return this.x !== this.getCurrSlideX();
  }
  updateCurrItem() {
    const {
        pswp: t
      } = this,
      i = this.rt - this.ot;
    if (!i) return;
    this.rt = this.ot, t.currIndex = t.potentialIndex;
    let s,
      h = Math.abs(i);
    h >= 3 && (this.ct += i + (i > 0 ? -3 : 3), h = 3);
    for (let e = 0; e < h; e++) i > 0 ? (s = this.itemHolders.shift(), s && (this.itemHolders[2] = s, this.ct++, r(s.el, (this.ct + 2) * this.slideWidth), t.setContent(s, t.currIndex - h + e + 2))) : (s = this.itemHolders.pop(), s && (this.itemHolders.unshift(s), this.ct--, r(s.el, this.ct * this.slideWidth), t.setContent(s, t.currIndex + h - e - 2)));
    Math.abs(this.ct) > 50 && !this.isShifted() && (this.resetPosition(), this.resize()), t.animations.stopAllPan(), this.itemHolders.forEach((t, i) => {
      t.slide && t.slide.setIsActive(1 === i);
    }), t.currSlide = this.itemHolders[1]?.slide, t.contentLoader.updateLazy(i), t.currSlide && t.currSlide.applyCurrentZoomPan(), t.dispatch("change");
  }
  moveTo(t, i) {
    if (!this.pswp.canLoop() && i) {
      let i = (this.slideWidth * this.ot - t) / this.slideWidth;
      i += this.pswp.currIndex;
      const s = Math.round(t - this.x);
      (i < 0 && s > 0 || i >= this.pswp.getNumItems() - 1 && s < 0) && (t = this.x + .35 * s);
    }
    this.x = t, this.pswp.container && r(this.pswp.container, t), this.pswp.dispatch("moveMainScroll", {
      x: t,
      dragging: i ?? !1
    });
  }
}
const D = {
    Escape: 27,
    z: 90,
    ArrowLeft: 37,
    ArrowUp: 38,
    ArrowRight: 39,
    ArrowDown: 40,
    Tab: 9
  },
  I = (t, i) => i ? t : D[t];
class E {
  constructor(t) {
    this.pswp = t, this.lt = !1, t.on("bindEvents", () => {
      t.options.initialPointerPos || this.ut(), t.events.add(document, "focusin", this.dt.bind(this)), t.events.add(document, "keydown", this.ft.bind(this));
    });
    const i = document.activeElement;
    t.on("destroy", () => {
      t.options.returnFocus && i && this.lt && i.focus();
    });
  }
  ut() {
    !this.lt && this.pswp.element && (this.pswp.element.focus(), this.lt = !0);
  }
  ft(t) {
    const {
      pswp: i
    } = this;
    if (i.dispatch("keydown", {
      originalEvent: t
    }).defaultPrevented) return;
    if (function (t) {
      return "button" in t && 1 === t.button || t.ctrlKey || t.metaKey || t.altKey || t.shiftKey;
    }(t)) return;
    let s,
      h,
      e = !1;
    const n = ("key" in t);
    switch (n ? t.key : t.keyCode) {
      case I("Escape", n):
        i.options.escKey && (s = "close");
        break;
      case I("z", n):
        s = "toggleZoom";
        break;
      case I("ArrowLeft", n):
        h = "x";
        break;
      case I("ArrowUp", n):
        h = "y";
        break;
      case I("ArrowRight", n):
        h = "x", e = !0;
        break;
      case I("ArrowDown", n):
        e = !0, h = "y";
        break;
      case I("Tab", n):
        this.ut();
    }
    if (h) {
      t.preventDefault();
      const {
        currSlide: n
      } = i;
      i.options.arrowKeys && "x" === h && i.getNumItems() > 1 ? s = e ? "next" : "prev" : n && n.currZoomLevel > n.zoomLevels.fit && (n.pan[h] += e ? -80 : 80, n.panTo(n.pan.x, n.pan.y));
    }
    s && (t.preventDefault(), i[s]());
  }
  dt(t) {
    const {
      template: i
    } = this.pswp;
    i && document !== t.target && i !== t.target && !i.contains(t.target) && i.focus();
  }
}
const L = "cubic-bezier(.4,0,.22,1)";
class k {
  constructor(t) {
    this.props = t;
    const {
      target: i,
      onComplete: s,
      transform: h,
      onFinish: e = () => {},
      duration: n = 333,
      easing: o = L
    } = t;
    this.onFinish = e;
    const r = h ? "transform" : "opacity",
      c = t[r] ?? "";
    this.wt = i, this.gt = s, this.vt = !1, this.yt = this.yt.bind(this), this._t = setTimeout(() => {
      a(i, r, n, o), this._t = setTimeout(() => {
        i.addEventListener("transitionend", this.yt, !1), i.addEventListener("transitioncancel", this.yt, !1), this._t = setTimeout(() => {
          this.xt();
        }, n + 500), i.style[r] = c;
      }, 30);
    }, 0);
  }
  yt(t) {
    t.target === this.wt && this.xt();
  }
  xt() {
    this.vt || (this.vt = !0, this.onFinish(), this.gt && this.gt());
  }
  destroy() {
    this._t && clearTimeout(this._t), a(this.wt), this.wt.removeEventListener("transitionend", this.yt, !1), this.wt.removeEventListener("transitioncancel", this.yt, !1), this.vt || this.xt();
  }
}
class Z {
  constructor(t, i, s) {
    this.velocity = 1e3 * t, this.bt = i || .75, this.St = s || 12, this.zt = this.St, this.bt < 1 && (this.zt *= Math.sqrt(1 - this.bt * this.bt));
  }
  easeFrame(t, i) {
    let s,
      h = 0;
    i /= 1e3;
    const e = Math.E ** (-this.bt * this.St * i);
    if (1 === this.bt) s = this.velocity + this.St * t, h = (t + s * i) * e, this.velocity = h * -this.St + s * e;else if (this.bt < 1) {
      s = 1 / this.zt * (this.bt * this.St * t + this.velocity);
      const n = Math.cos(this.zt * i),
        o = Math.sin(this.zt * i);
      h = e * (t * n + s * o), this.velocity = h * -this.St * this.bt + e * (-this.zt * t * o + this.zt * s * n);
    }
    return h;
  }
}
class B {
  constructor(t) {
    this.props = t, this.Mt = 0;
    const {
      start: i,
      end: s,
      velocity: h,
      onUpdate: e,
      onComplete: n,
      onFinish: o = () => {},
      dampingRatio: r,
      naturalFrequency: a
    } = t;
    this.onFinish = o;
    const c = new Z(h, r, a);
    let l = Date.now(),
      p = i - s;
    const u = () => {
      this.Mt && (p = c.easeFrame(p, Date.now() - l), Math.abs(p) < 1 && Math.abs(c.velocity) < 50 ? (e(s), n && n(), this.onFinish()) : (l = Date.now(), e(p + s), this.Mt = requestAnimationFrame(u)));
    };
    this.Mt = requestAnimationFrame(u);
  }
  destroy() {
    this.Mt >= 0 && cancelAnimationFrame(this.Mt), this.Mt = 0;
  }
}
class F {
  constructor() {
    this.activeAnimations = [];
  }
  startSpring(t) {
    this.Pt(t, !0);
  }
  startTransition(t) {
    this.Pt(t);
  }
  Pt(t, i) {
    const s = i ? new B(t) : new k(t);
    return this.activeAnimations.push(s), s.onFinish = () => this.stop(s), s;
  }
  stop(t) {
    t.destroy();
    const i = this.activeAnimations.indexOf(t);
    i > -1 && this.activeAnimations.splice(i, 1);
  }
  stopAll() {
    this.activeAnimations.forEach(t => {
      t.destroy();
    }), this.activeAnimations = [];
  }
  stopAllPan() {
    this.activeAnimations = this.activeAnimations.filter(t => !t.props.isPan || (t.destroy(), !1));
  }
  stopMainScroll() {
    this.activeAnimations = this.activeAnimations.filter(t => !t.props.isMainScroll || (t.destroy(), !1));
  }
  isPanRunning() {
    return this.activeAnimations.some(t => t.props.isPan);
  }
}
class O {
  constructor(t) {
    this.pswp = t, t.events.add(t.element, "wheel", this.Ct.bind(this));
  }
  Ct(t) {
    t.preventDefault();
    const {
      currSlide: i
    } = this.pswp;
    let {
      deltaX: s,
      deltaY: h
    } = t;
    if (i && !this.pswp.dispatch("wheel", {
      originalEvent: t
    }).defaultPrevented) if (t.ctrlKey || this.pswp.options.wheelToZoom) {
      if (i.isZoomable()) {
        let s = -h;
        1 === t.deltaMode ? s *= .05 : s *= t.deltaMode ? 1 : .002, s = 2 ** s;
        const e = i.currZoomLevel * s;
        i.zoomTo(e, {
          x: t.clientX,
          y: t.clientY
        });
      }
    } else i.isPannable() && (1 === t.deltaMode && (s *= 18, h *= 18), i.panTo(i.pan.x - s, i.pan.y - h));
  }
}
class R {
  constructor(i, s) {
    const h = s.name || s.className;
    let e = s.html;
    if (!1 === i.options[h]) return;
    "string" == typeof i.options[h + "SVG"] && (e = i.options[h + "SVG"]), i.dispatch("uiElementCreate", {
      data: s
    });
    let n = "";
    s.isButton ? (n += "pswp__button ", n += s.className || `pswp__button--${s.name}`) : n += s.className || `pswp__${s.name}`;
    let o = s.isButton ? s.tagName || "button" : s.tagName || "div";
    o = o.toLowerCase();
    const r = t(n, o);
    if (s.isButton) {
      "button" === o && (r.type = "button");
      let {
        title: t
      } = s;
      const {
        ariaLabel: e
      } = s;
      "string" == typeof i.options[h + "Title"] && (t = i.options[h + "Title"]), t && (r.title = t);
      const n = e || t;
      n && r.setAttribute("aria-label", n);
    }
    r.innerHTML = function (t) {
      if ("string" == typeof t) return t;
      if (!t || !t.isCustomSVG) return "";
      const i = t;
      let s = '<svg aria-hidden="true" class="pswp__icn" viewBox="0 0 %d %d" width="%d" height="%d">';
      return s = s.split("%d").join(i.size || 32), i.outlineID && (s += '<use class="pswp__icn-shadow" xlink:href="#' + i.outlineID + '"/>'), s += i.inner, s += "</svg>", s;
    }(e), s.onInit && s.onInit(r, i), s.onClick && (r.onclick = t => {
      "string" == typeof s.onClick ? i[s.onClick]() : "function" == typeof s.onClick && s.onClick(t, r, i);
    });
    const a = s.appendTo || "bar";
    let c = i.element;
    "bar" === a ? (i.topBar || (i.topBar = t("pswp__top-bar pswp__hide-on-close", "div", i.scrollWrap)), c = i.topBar) : (r.classList.add("pswp__hide-on-close"), "wrapper" === a && (c = i.scrollWrap)), c?.appendChild(i.applyFilters("uiElement", r, s));
  }
}
function N(t, i, s) {
  t.classList.add("pswp__button--arrow"), t.setAttribute("aria-controls", "pswp__items"), i.on("change", () => {
    i.options.loop || (t.disabled = s ? !(i.currIndex < i.getNumItems() - 1) : !(i.currIndex > 0));
  });
}
const U = {
    name: "arrowPrev",
    className: "pswp__button--arrow--prev",
    title: "Previous",
    order: 10,
    isButton: !0,
    appendTo: "wrapper",
    html: {
      isCustomSVG: !0,
      size: 60,
      inner: '<path d="M29 43l-3 3-16-16 16-16 3 3-13 13 13 13z" id="pswp__icn-arrow"/>',
      outlineID: "pswp__icn-arrow"
    },
    onClick: "prev",
    onInit: N
  },
  V = {
    name: "arrowNext",
    className: "pswp__button--arrow--next",
    title: "Next",
    order: 11,
    isButton: !0,
    appendTo: "wrapper",
    html: {
      isCustomSVG: !0,
      size: 60,
      inner: '<use xlink:href="#pswp__icn-arrow"/>',
      outlineID: "pswp__icn-arrow"
    },
    onClick: "next",
    onInit: (t, i) => {
      N(t, i, !0);
    }
  },
  G = {
    name: "close",
    title: "Close",
    order: 20,
    isButton: !0,
    html: {
      isCustomSVG: !0,
      inner: '<path d="M24 10l-2-2-6 6-6-6-2 2 6 6-6 6 2 2 6-6 6 6 2-2-6-6z" id="pswp__icn-close"/>',
      outlineID: "pswp__icn-close"
    },
    onClick: "close"
  },
  $ = {
    name: "zoom",
    title: "Zoom",
    order: 10,
    isButton: !0,
    html: {
      isCustomSVG: !0,
      inner: '<path d="M17.426 19.926a6 6 0 1 1 1.5-1.5L23 22.5 21.5 24l-4.074-4.074z" id="pswp__icn-zoom"/><path fill="currentColor" class="pswp__zoom-icn-bar-h" d="M11 16v-2h6v2z"/><path fill="currentColor" class="pswp__zoom-icn-bar-v" d="M13 12h2v6h-2z"/>',
      outlineID: "pswp__icn-zoom"
    },
    onClick: "toggleZoom"
  },
  q = {
    name: "preloader",
    appendTo: "bar",
    order: 7,
    html: {
      isCustomSVG: !0,
      inner: '<path fill-rule="evenodd" clip-rule="evenodd" d="M21.2 16a5.2 5.2 0 1 1-5.2-5.2V8a8 8 0 1 0 8 8h-2.8Z" id="pswp__icn-loading"/>',
      outlineID: "pswp__icn-loading"
    },
    onInit: (t, i) => {
      let s,
        h = null;
      const e = i => {
          var h, e;
          s !== i && (s = i, h = "active", e = i, t.classList.toggle("pswp__preloader--" + h, e));
        },
        n = () => {
          if (!i.currSlide?.content.isLoading()) return e(!1), void (h && (clearTimeout(h), h = null));
          h || (h = setTimeout(() => {
            e(Boolean(i.currSlide?.content.isLoading())), h = null;
          }, i.options.preloaderDelay));
        };
      i.on("change", n), i.on("loadComplete", t => {
        i.currSlide === t.slide && n();
      }), i.ui && (i.ui.updatePreloaderVisibility = n);
    }
  },
  H = {
    name: "counter",
    order: 5,
    onInit: (t, i) => {
      i.on("change", () => {
        t.innerText = i.currIndex + 1 + i.options.indexIndicatorSep + i.getNumItems();
      });
    }
  };
function K(t, i) {
  t.classList.toggle("pswp--zoomed-in", i);
}
class W {
  constructor(t) {
    this.pswp = t, this.isRegistered = !1, this.uiElementsData = [], this.items = [], this.updatePreloaderVisibility = () => {}, this.Tt = void 0;
  }
  init() {
    const {
      pswp: t
    } = this;
    this.isRegistered = !1, this.uiElementsData = [G, U, V, $, q, H], t.dispatch("uiRegister"), this.uiElementsData.sort((t, i) => (t.order || 0) - (i.order || 0)), this.items = [], this.isRegistered = !0, this.uiElementsData.forEach(t => {
      this.registerElement(t);
    }), t.on("change", () => {
      t.element?.classList.toggle("pswp--one-slide", 1 === t.getNumItems());
    }), t.on("zoomPanUpdate", () => this.At());
  }
  registerElement(t) {
    this.isRegistered ? this.items.push(new R(this.pswp, t)) : this.uiElementsData.push(t);
  }
  At() {
    const {
      template: t,
      currSlide: i,
      options: s
    } = this.pswp;
    if (this.pswp.opener.isClosing || !t || !i) return;
    let {
      currZoomLevel: h
    } = i;
    if (this.pswp.opener.isOpen || (h = i.zoomLevels.initial), h === this.Tt) return;
    this.Tt = h;
    const e = i.zoomLevels.initial - i.zoomLevels.secondary;
    if (Math.abs(e) < .01 || !i.isZoomable()) return K(t, !1), void t.classList.remove("pswp--zoom-allowed");
    t.classList.add("pswp--zoom-allowed");
    K(t, (h === i.zoomLevels.initial ? i.zoomLevels.secondary : i.zoomLevels.initial) <= h), "zoom" !== s.imageClickAction && "zoom-or-close" !== s.imageClickAction || t.classList.add("pswp--click-to-zoom");
  }
}
class j {
  constructor(t, i) {
    this.type = t, this.defaultPrevented = !1, i && Object.assign(this, i);
  }
  preventDefault() {
    this.defaultPrevented = !0;
  }
}
class X {
  constructor(i, s) {
    if (this.element = t("pswp__img pswp__img--placeholder", i ? "img" : "div", s), i) {
      const t = this.element;
      t.decoding = "async", t.alt = "", t.src = i, t.setAttribute("role", "presentation");
    }
    this.element.setAttribute("aria-hidden", "true");
  }
  setDisplayedSize(t, i) {
    this.element && ("IMG" === this.element.tagName ? (c(this.element, 250, "auto"), this.element.style.transformOrigin = "0 0", this.element.style.transform = o(0, 0, t / 250)) : c(this.element, t, i));
  }
  destroy() {
    this.element?.parentNode && this.element.remove(), this.element = null;
  }
}
class Y {
  constructor(t, i, s) {
    this.instance = i, this.data = t, this.index = s, this.element = void 0, this.placeholder = void 0, this.slide = void 0, this.displayedImageWidth = 0, this.displayedImageHeight = 0, this.width = Number(this.data.w) || Number(this.data.width) || 0, this.height = Number(this.data.h) || Number(this.data.height) || 0, this.isAttached = !1, this.hasSlide = !1, this.isDecoding = !1, this.state = l, this.data.type ? this.type = this.data.type : this.data.src ? this.type = "image" : this.type = "html", this.instance.dispatch("contentInit", {
      content: this
    });
  }
  removePlaceholder() {
    this.placeholder && !this.keepPlaceholder() && setTimeout(() => {
      this.placeholder && (this.placeholder.destroy(), this.placeholder = void 0);
    }, 1e3);
  }
  load(i, s) {
    if (this.slide && this.usePlaceholder()) if (this.placeholder) {
      const t = this.placeholder.element;
      t && !t.parentElement && this.slide.container.prepend(t);
    } else {
      const t = this.instance.applyFilters("placeholderSrc", !(!this.data.msrc || !this.slide.isFirstSlide) && this.data.msrc, this);
      this.placeholder = new X(t, this.slide.container);
    }
    this.element && !s || this.instance.dispatch("contentLoad", {
      content: this,
      isLazy: i
    }).defaultPrevented || (this.isImageContent() ? (this.element = t("pswp__img", "img"), this.displayedImageWidth && this.loadImage(i)) : (this.element = t("pswp__content", "div"), this.element.innerHTML = this.data.html || ""), s && this.slide && this.slide.updateContentSize(!0));
  }
  loadImage(t) {
    if (!this.isImageContent() || !this.element || this.instance.dispatch("contentLoadImage", {
      content: this,
      isLazy: t
    }).defaultPrevented) return;
    const i = this.element;
    this.updateSrcsetSizes(), this.data.srcset && (i.srcset = this.data.srcset), i.src = this.data.src ?? "", i.alt = this.data.alt ?? "", this.state = p, i.complete ? this.onLoaded() : (i.onload = () => {
      this.onLoaded();
    }, i.onerror = () => {
      this.onError();
    });
  }
  setSlide(t) {
    this.slide = t, this.hasSlide = !0, this.instance = t.pswp;
  }
  onLoaded() {
    this.state = u, this.slide && this.element && (this.instance.dispatch("loadComplete", {
      slide: this.slide,
      content: this
    }), this.slide.isActive && this.slide.heavyAppended && !this.element.parentNode && (this.append(), this.slide.updateContentSize(!0)), this.state !== u && this.state !== d || this.removePlaceholder());
  }
  onError() {
    this.state = d, this.slide && (this.displayError(), this.instance.dispatch("loadComplete", {
      slide: this.slide,
      isError: !0,
      content: this
    }), this.instance.dispatch("loadError", {
      slide: this.slide,
      content: this
    }));
  }
  isLoading() {
    return this.instance.applyFilters("isContentLoading", this.state === p, this);
  }
  isError() {
    return this.state === d;
  }
  isImageContent() {
    return "image" === this.type;
  }
  setDisplayedSize(t, i) {
    if (this.element && (this.placeholder && this.placeholder.setDisplayedSize(t, i), !this.instance.dispatch("contentResize", {
      content: this,
      width: t,
      height: i
    }).defaultPrevented && (c(this.element, t, i), this.isImageContent() && !this.isError()))) {
      const s = !this.displayedImageWidth && t;
      this.displayedImageWidth = t, this.displayedImageHeight = i, s ? this.loadImage(!1) : this.updateSrcsetSizes(), this.slide && this.instance.dispatch("imageSizeChange", {
        slide: this.slide,
        width: t,
        height: i,
        content: this
      });
    }
  }
  isZoomable() {
    return this.instance.applyFilters("isContentZoomable", this.isImageContent() && this.state !== d, this);
  }
  updateSrcsetSizes() {
    if (!this.isImageContent() || !this.element || !this.data.srcset) return;
    const t = this.element,
      i = this.instance.applyFilters("srcsetSizesWidth", this.displayedImageWidth, this);
    (!t.dataset.largestUsedSize || i > parseInt(t.dataset.largestUsedSize, 10)) && (t.sizes = i + "px", t.dataset.largestUsedSize = String(i));
  }
  usePlaceholder() {
    return this.instance.applyFilters("useContentPlaceholder", this.isImageContent(), this);
  }
  lazyLoad() {
    this.instance.dispatch("contentLazyLoad", {
      content: this
    }).defaultPrevented || this.load(!0);
  }
  keepPlaceholder() {
    return this.instance.applyFilters("isKeepingPlaceholder", this.isLoading(), this);
  }
  destroy() {
    this.hasSlide = !1, this.slide = void 0, this.instance.dispatch("contentDestroy", {
      content: this
    }).defaultPrevented || (this.remove(), this.placeholder && (this.placeholder.destroy(), this.placeholder = void 0), this.isImageContent() && this.element && (this.element.onload = null, this.element.onerror = null, this.element = void 0));
  }
  displayError() {
    if (this.slide) {
      let i = t("pswp__error-msg", "div");
      i.innerText = this.instance.options?.errorMsg ?? "", i = this.instance.applyFilters("contentErrorElement", i, this), this.element = t("pswp__content pswp__error-msg-container", "div"), this.element.appendChild(i), this.slide.container.innerText = "", this.slide.container.appendChild(this.element), this.slide.updateContentSize(!0), this.removePlaceholder();
    }
  }
  append() {
    if (this.isAttached || !this.element) return;
    if (this.isAttached = !0, this.state === d) return void this.displayError();
    if (this.instance.dispatch("contentAppend", {
      content: this
    }).defaultPrevented) return;
    const t = ("decode" in this.element);
    this.isImageContent() ? t && this.slide && (!this.slide.isActive || m()) ? (this.isDecoding = !0, this.element.decode().catch(() => {}).finally(() => {
      this.isDecoding = !1, this.appendImage();
    })) : this.appendImage() : this.slide && !this.element.parentNode && this.slide.container.appendChild(this.element);
  }
  activate() {
    !this.instance.dispatch("contentActivate", {
      content: this
    }).defaultPrevented && this.slide && (this.isImageContent() && this.isDecoding && !m() ? this.appendImage() : this.isError() && this.load(!1, !0), this.slide.holderElement && this.slide.holderElement.setAttribute("aria-hidden", "false"));
  }
  deactivate() {
    this.instance.dispatch("contentDeactivate", {
      content: this
    }), this.slide && this.slide.holderElement && this.slide.holderElement.setAttribute("aria-hidden", "true");
  }
  remove() {
    this.isAttached = !1, this.instance.dispatch("contentRemove", {
      content: this
    }).defaultPrevented || (this.element && this.element.parentNode && this.element.remove(), this.placeholder && this.placeholder.element && this.placeholder.element.remove());
  }
  appendImage() {
    this.isAttached && (this.instance.dispatch("contentAppendImage", {
      content: this
    }).defaultPrevented || (this.slide && this.element && !this.element.parentNode && this.slide.container.appendChild(this.element), this.state !== u && this.state !== d || this.removePlaceholder()));
  }
}
function J(t, i, s) {
  const h = i.createContentFromData(t, s);
  let e;
  const {
    options: n
  } = i;
  if (n) {
    let o;
    e = new x(n, t, -1), o = i.pswp ? i.pswp.viewportSize : g(n, i);
    const r = y(n, o, t, s);
    e.update(h.width, h.height, r);
  }
  return h.lazyLoad(), e && h.setDisplayedSize(Math.ceil(h.width * e.initial), Math.ceil(h.height * e.initial)), h;
}
class Q {
  constructor(t) {
    this.pswp = t, this.limit = Math.max(t.options.preload[0] + t.options.preload[1] + 1, 5), this.Dt = [];
  }
  updateLazy(t) {
    const {
      pswp: i
    } = this;
    if (i.dispatch("lazyLoad").defaultPrevented) return;
    const {
        preload: s
      } = i.options,
      h = void 0 === t || t >= 0;
    let e;
    for (e = 0; e <= s[1]; e++) this.loadSlideByIndex(i.currIndex + (h ? e : -e));
    for (e = 1; e <= s[0]; e++) this.loadSlideByIndex(i.currIndex + (h ? -e : e));
  }
  loadSlideByIndex(t) {
    const i = this.pswp.getLoopedIndex(t);
    let s = this.getContentByIndex(i);
    s || (s = function (t, i) {
      const s = i.getItemData(t);
      if (!i.dispatch("lazyLoadSlide", {
        index: t,
        itemData: s
      }).defaultPrevented) return J(s, i, t);
    }(i, this.pswp), s && this.addToCache(s));
  }
  getContentBySlide(t) {
    let i = this.getContentByIndex(t.index);
    return i || (i = this.pswp.createContentFromData(t.data, t.index), this.addToCache(i)), i.setSlide(t), i;
  }
  addToCache(t) {
    if (this.removeByIndex(t.index), this.Dt.push(t), this.Dt.length > this.limit) {
      const t = this.Dt.findIndex(t => !t.isAttached && !t.hasSlide);
      if (-1 !== t) {
        this.Dt.splice(t, 1)[0].destroy();
      }
    }
  }
  removeByIndex(t) {
    const i = this.Dt.findIndex(i => i.index === t);
    -1 !== i && this.Dt.splice(i, 1);
  }
  getContentByIndex(t) {
    return this.Dt.find(i => i.index === t);
  }
  destroy() {
    this.Dt.forEach(t => t.destroy()), this.Dt = [];
  }
}
class tt {
  constructor(t) {
    this.pswp = t, this.isClosed = !0, this.isOpen = !1, this.isClosing = !1, this.isOpening = !1, this.It = void 0, this.Et = !1, this.Lt = !1, this.kt = !1, this.Zt = !1, this.Bt = void 0, this.Ft = void 0, this.Ot = void 0, this.Rt = void 0, this.Nt = void 0, this.Ut = this.Ut.bind(this), t.on("firstZoomPan", this.Ut);
  }
  open() {
    this.Ut(), this.Pt();
  }
  close() {
    if (this.isClosed || this.isClosing || this.isOpening) return;
    const t = this.pswp.currSlide;
    this.isOpen = !1, this.isOpening = !1, this.isClosing = !0, this.It = this.pswp.options.hideAnimationDuration, t && t.currZoomLevel * t.width >= this.pswp.options.maxWidthToAnimate && (this.It = 0), this.Vt(), setTimeout(() => {
      this.Pt();
    }, this.Lt ? 30 : 0);
  }
  Ut() {
    if (this.pswp.off("firstZoomPan", this.Ut), !this.isOpening) {
      const t = this.pswp.currSlide;
      this.isOpening = !0, this.isClosing = !1, this.It = this.pswp.options.showAnimationDuration, t && t.zoomLevels.initial * t.width >= this.pswp.options.maxWidthToAnimate && (this.It = 0), this.Vt();
    }
  }
  Vt() {
    const {
        pswp: t
      } = this,
      i = this.pswp.currSlide,
      {
        options: s
      } = t;
    if ("fade" === s.showHideAnimationType ? (s.showHideOpacity = !0, this.Nt = void 0) : "none" === s.showHideAnimationType ? (s.showHideOpacity = !1, this.It = 0, this.Nt = void 0) : this.isOpening && t.Gt ? this.Nt = t.Gt : this.Nt = this.pswp.getThumbBounds(), this.Bt = i?.getPlaceholderElement(), t.animations.stopAll(), this.Et = Boolean(this.It && this.It > 50), this.$t = Boolean(this.Nt) && i?.content.usePlaceholder() && (!this.isClosing || !t.mainScroll.isShifted()), this.$t ? this.kt = s.showHideOpacity ?? !1 : (this.kt = !0, this.isOpening && i && (i.zoomAndPanToInitial(), i.applyCurrentZoomPan())), this.Zt = !this.kt && this.pswp.options.bgOpacity > .003, this.Ft = this.kt ? t.element : t.bg, !this.Et) return this.It = 0, this.$t = !1, this.Zt = !1, this.kt = !0, void (this.isOpening && (t.element && (t.element.style.opacity = String(.003)), t.applyBgOpacity(1)));
    this.$t && this.Nt && this.Nt.innerRect ? (this.Lt = !0, this.Ot = this.pswp.container, this.Rt = this.pswp.currSlide?.holderElement, t.container && (t.container.style.overflow = "hidden", t.container.style.width = t.viewportSize.x + "px")) : this.Lt = !1, this.isOpening ? (this.kt ? (t.element && (t.element.style.opacity = String(.003)), t.applyBgOpacity(1)) : (this.Zt && t.bg && (t.bg.style.opacity = String(.003)), t.element && (t.element.style.opacity = "1")), this.$t && (this.qt(), this.Bt && (this.Bt.style.willChange = "transform", this.Bt.style.opacity = String(.003)))) : this.isClosing && (t.mainScroll.itemHolders[0] && (t.mainScroll.itemHolders[0].el.style.display = "none"), t.mainScroll.itemHolders[2] && (t.mainScroll.itemHolders[2].el.style.display = "none"), this.Lt && 0 !== t.mainScroll.x && (t.mainScroll.resetPosition(), t.mainScroll.resize()));
  }
  Pt() {
    this.isOpening && this.Et && this.Bt && "IMG" === this.Bt.tagName ? new Promise(t => {
      let i = !1,
        s = !0;
      var h;
      (h = this.Bt, "decode" in h ? h.decode().catch(() => {}) : h.complete ? Promise.resolve(h) : new Promise((t, i) => {
        h.onload = () => t(h), h.onerror = i;
      })).finally(() => {
        i = !0, s || t(!0);
      }), setTimeout(() => {
        s = !1, i && t(!0);
      }, 50), setTimeout(t, 250);
    }).finally(() => this.Ht()) : this.Ht();
  }
  Ht() {
    this.pswp.element?.style.setProperty("--pswp-transition-duration", this.It + "ms"), this.pswp.dispatch(this.isOpening ? "openingAnimationStart" : "closingAnimationStart"), this.pswp.dispatch("initialZoom" + (this.isOpening ? "In" : "Out")), this.pswp.element?.classList.toggle("pswp--ui-visible", this.isOpening), this.isOpening ? (this.Bt && (this.Bt.style.opacity = "1"), this.Kt()) : this.isClosing && this.Wt(), this.Et || this.jt();
  }
  jt() {
    const {
      pswp: t
    } = this;
    this.isOpen = this.isOpening, this.isClosed = this.isClosing, this.isOpening = !1, this.isClosing = !1, t.dispatch(this.isOpen ? "openingAnimationEnd" : "closingAnimationEnd"), t.dispatch("initialZoom" + (this.isOpen ? "InEnd" : "OutEnd")), this.isClosed ? t.destroy() : this.isOpen && (this.$t && t.container && (t.container.style.overflow = "visible", t.container.style.width = "100%"), t.currSlide?.applyCurrentZoomPan());
  }
  Kt() {
    const {
      pswp: t
    } = this;
    this.$t && (this.Lt && this.Ot && this.Rt && (this.Xt(this.Ot, "transform", "translate3d(0,0,0)"), this.Xt(this.Rt, "transform", "none")), t.currSlide && (t.currSlide.zoomAndPanToInitial(), this.Xt(t.currSlide.container, "transform", t.currSlide.getCurrentTransform()))), this.Zt && t.bg && this.Xt(t.bg, "opacity", String(t.options.bgOpacity)), this.kt && t.element && this.Xt(t.element, "opacity", "1");
  }
  Wt() {
    const {
      pswp: t
    } = this;
    this.$t && this.qt(!0), this.Zt && t.bgOpacity > .01 && t.bg && this.Xt(t.bg, "opacity", "0"), this.kt && t.element && this.Xt(t.element, "opacity", "0");
  }
  qt(t) {
    if (!this.Nt) return;
    const {
        pswp: s
      } = this,
      {
        innerRect: h
      } = this.Nt,
      {
        currSlide: e,
        viewportSize: n
      } = s;
    if (this.Lt && h && this.Ot && this.Rt) {
      const i = -n.x + (this.Nt.x - h.x) + h.w,
        s = -n.y + (this.Nt.y - h.y) + h.h,
        e = n.x - h.w,
        a = n.y - h.h;
      t ? (this.Xt(this.Ot, "transform", o(i, s)), this.Xt(this.Rt, "transform", o(e, a))) : (r(this.Ot, i, s), r(this.Rt, e, a));
    }
    e && (i(e.pan, h || this.Nt), e.currZoomLevel = this.Nt.w / e.width, t ? this.Xt(e.container, "transform", e.getCurrentTransform()) : e.applyCurrentZoomPan());
  }
  Xt(t, i, s) {
    if (!this.It) return void (t.style[i] = s);
    const {
        animations: h
      } = this.pswp,
      e = {
        duration: this.It,
        easing: this.pswp.options.easing,
        onComplete: () => {
          h.activeAnimations.length || this.jt();
        },
        target: t
      };
    e[i] = s, h.startTransition(e);
  }
}
const it = {
  allowPanToNext: !0,
  spacing: .1,
  loop: !0,
  pinchToClose: !0,
  closeOnVerticalDrag: !0,
  hideAnimationDuration: 333,
  showAnimationDuration: 333,
  zoomAnimationDuration: 333,
  escKey: !0,
  arrowKeys: !0,
  returnFocus: !0,
  maxWidthToAnimate: 4e3,
  clickToCloseNonZoomable: !0,
  imageClickAction: "zoom-or-close",
  bgClickAction: "close",
  tapAction: "toggle-controls",
  doubleTapAction: "zoom",
  indexIndicatorSep: " / ",
  preloaderDelay: 2e3,
  bgOpacity: .8,
  index: 0,
  errorMsg: "The image cannot be loaded",
  preload: [1, 2],
  easing: "cubic-bezier(.4,0,.22,1)"
};
class st extends class extends class {
  constructor() {
    this.Yt = {}, this.Jt = {}, this.pswp = void 0, this.options = void 0;
  }
  addFilter(t, i, s = 100) {
    this.Jt[t] || (this.Jt[t] = []), this.Jt[t]?.push({
      fn: i,
      priority: s
    }), this.Jt[t]?.sort((t, i) => t.priority - i.priority), this.pswp?.addFilter(t, i, s);
  }
  removeFilter(t, i) {
    this.Jt[t] && (this.Jt[t] = this.Jt[t].filter(t => t.fn !== i)), this.pswp && this.pswp.removeFilter(t, i);
  }
  applyFilters(t, ...i) {
    return this.Jt[t]?.forEach(t => {
      i[0] = t.fn.apply(this, i);
    }), i[0];
  }
  on(t, i) {
    this.Yt[t] || (this.Yt[t] = []), this.Yt[t]?.push(i), this.pswp?.on(t, i);
  }
  off(t, i) {
    this.Yt[t] && (this.Yt[t] = this.Yt[t].filter(t => i !== t)), this.pswp?.off(t, i);
  }
  dispatch(t, i) {
    if (this.pswp) return this.pswp.dispatch(t, i);
    const s = new j(t, i);
    return this.Yt[t]?.forEach(t => {
      t.call(this, s);
    }), s;
  }
} {
  getNumItems() {
    let t = 0;
    const i = this.options?.dataSource;
    i && "length" in i ? t = i.length : i && "gallery" in i && (i.items || (i.items = this.Qt(i.gallery)), i.items && (t = i.items.length));
    const s = this.dispatch("numItems", {
      dataSource: i,
      numItems: t
    });
    return this.applyFilters("numItems", s.numItems, i);
  }
  createContentFromData(t, i) {
    return new Y(t, this, i);
  }
  getItemData(t) {
    const i = this.options?.dataSource;
    let s = {};
    Array.isArray(i) ? s = i[t] : i && "gallery" in i && (i.items || (i.items = this.Qt(i.gallery)), s = i.items[t]);
    let h = s;
    h instanceof Element && (h = this.ti(h));
    const e = this.dispatch("itemData", {
      itemData: h || {},
      index: t
    });
    return this.applyFilters("itemData", e.itemData, t);
  }
  Qt(t) {
    return this.options?.children || this.options?.childSelector ? function (t, i, s = document) {
      let h = [];
      if (t instanceof Element) h = [t];else if (t instanceof NodeList || Array.isArray(t)) h = Array.from(t);else {
        const e = "string" == typeof t ? t : i;
        e && (h = Array.from(s.querySelectorAll(e)));
      }
      return h;
    }(this.options.children, this.options.childSelector, t) || [] : [t];
  }
  ti(t) {
    const i = {
        element: t
      },
      s = "A" === t.tagName ? t : t.querySelector("a");
    if (s) {
      i.src = s.dataset.pswpSrc || s.href, s.dataset.pswpSrcset && (i.srcset = s.dataset.pswpSrcset), i.width = s.dataset.pswpWidth ? parseInt(s.dataset.pswpWidth, 10) : 0, i.height = s.dataset.pswpHeight ? parseInt(s.dataset.pswpHeight, 10) : 0, i.w = i.width, i.h = i.height, s.dataset.pswpType && (i.type = s.dataset.pswpType);
      const h = t.querySelector("img");
      h && (i.msrc = h.currentSrc || h.src, i.alt = h.getAttribute("alt") ?? ""), (s.dataset.pswpCropped || s.dataset.cropped) && (i.thumbCropped = !0);
    }
    return this.applyFilters("domItemData", i, t, s);
  }
  lazyLoadData(t, i) {
    return J(t, this, i);
  }
} {
  constructor(t) {
    super(), this.options = this.ii(t || {}), this.offset = {
      x: 0,
      y: 0
    }, this.si = {
      x: 0,
      y: 0
    }, this.viewportSize = {
      x: 0,
      y: 0
    }, this.bgOpacity = 1, this.currIndex = 0, this.potentialIndex = 0, this.isOpen = !1, this.isDestroying = !1, this.hasMouse = !1, this.hi = {}, this.Gt = void 0, this.topBar = void 0, this.element = void 0, this.template = void 0, this.container = void 0, this.scrollWrap = void 0, this.currSlide = void 0, this.events = new w(), this.animations = new F(), this.mainScroll = new A(this), this.gestures = new T(this), this.opener = new tt(this), this.keyboard = new E(this), this.contentLoader = new Q(this);
  }
  init() {
    if (this.isOpen || this.isDestroying) return !1;
    this.isOpen = !0, this.dispatch("init"), this.dispatch("beforeOpen"), this.ei();
    let t = "pswp--open";
    return this.gestures.supportsTouch && (t += " pswp--touch"), this.options.mainClass && (t += " " + this.options.mainClass), this.element && (this.element.className += " " + t), this.currIndex = this.options.index || 0, this.potentialIndex = this.currIndex, this.dispatch("firstUpdate"), this.scrollWheel = new O(this), (Number.isNaN(this.currIndex) || this.currIndex < 0 || this.currIndex >= this.getNumItems()) && (this.currIndex = 0), this.gestures.supportsTouch || this.mouseDetected(), this.updateSize(), this.offset.y = window.pageYOffset, this.hi = this.getItemData(this.currIndex), this.dispatch("gettingData", {
      index: this.currIndex,
      data: this.hi,
      slide: void 0
    }), this.Gt = this.getThumbBounds(), this.dispatch("initialLayout"), this.on("openingAnimationEnd", () => {
      const {
        itemHolders: t
      } = this.mainScroll;
      t[0] && (t[0].el.style.display = "block", this.setContent(t[0], this.currIndex - 1)), t[2] && (t[2].el.style.display = "block", this.setContent(t[2], this.currIndex + 1)), this.appendHeavy(), this.contentLoader.updateLazy(), this.events.add(window, "resize", this.ni.bind(this)), this.events.add(window, "scroll", this.oi.bind(this)), this.dispatch("bindEvents");
    }), this.mainScroll.itemHolders[1] && this.setContent(this.mainScroll.itemHolders[1], this.currIndex), this.dispatch("change"), this.opener.open(), this.dispatch("afterInit"), !0;
  }
  getLoopedIndex(t) {
    const i = this.getNumItems();
    return this.options.loop && (t > i - 1 && (t -= i), t < 0 && (t += i)), n(t, 0, i - 1);
  }
  appendHeavy() {
    this.mainScroll.itemHolders.forEach(t => {
      t.slide?.appendHeavy();
    });
  }
  goTo(t) {
    this.mainScroll.moveIndexBy(this.getLoopedIndex(t) - this.potentialIndex);
  }
  next() {
    this.goTo(this.potentialIndex + 1);
  }
  prev() {
    this.goTo(this.potentialIndex - 1);
  }
  zoomTo(...t) {
    this.currSlide?.zoomTo(...t);
  }
  toggleZoom() {
    this.currSlide?.toggleZoom();
  }
  close() {
    this.opener.isOpen && !this.isDestroying && (this.isDestroying = !0, this.dispatch("close"), this.events.removeAll(), this.opener.close());
  }
  destroy() {
    if (!this.isDestroying) return this.options.showHideAnimationType = "none", void this.close();
    this.dispatch("destroy"), this.Yt = {}, this.scrollWrap && (this.scrollWrap.ontouchmove = null, this.scrollWrap.ontouchend = null), this.element?.remove(), this.mainScroll.itemHolders.forEach(t => {
      t.slide?.destroy();
    }), this.contentLoader.destroy(), this.events.removeAll();
  }
  refreshSlideContent(t) {
    this.contentLoader.removeByIndex(t), this.mainScroll.itemHolders.forEach((i, s) => {
      let h = (this.currSlide?.index ?? 0) - 1 + s;
      this.canLoop() && (h = this.getLoopedIndex(h)), h === t && (this.setContent(i, t, !0), 1 === s && (this.currSlide = i.slide, i.slide?.setIsActive(!0)));
    }), this.dispatch("change");
  }
  setContent(t, i, s) {
    if (this.canLoop() && (i = this.getLoopedIndex(i)), t.slide) {
      if (t.slide.index === i && !s) return;
      t.slide.destroy(), t.slide = void 0;
    }
    if (!this.canLoop() && (i < 0 || i >= this.getNumItems())) return;
    const h = this.getItemData(i);
    t.slide = new b(h, i, this), i === this.currIndex && (this.currSlide = t.slide), t.slide.append(t.el);
  }
  getViewportCenterPoint() {
    return {
      x: this.viewportSize.x / 2,
      y: this.viewportSize.y / 2
    };
  }
  updateSize(t) {
    if (this.isDestroying) return;
    const s = g(this.options, this);
    !t && e(s, this.si) || (i(this.si, s), this.dispatch("beforeResize"), i(this.viewportSize, this.si), this.oi(), this.dispatch("viewportSize"), this.mainScroll.resize(this.opener.isOpen), !this.hasMouse && window.matchMedia("(any-hover: hover)").matches && this.mouseDetected(), this.dispatch("resize"));
  }
  applyBgOpacity(t) {
    this.bgOpacity = Math.max(t, 0), this.bg && (this.bg.style.opacity = String(this.bgOpacity * this.options.bgOpacity));
  }
  mouseDetected() {
    this.hasMouse || (this.hasMouse = !0, this.element?.classList.add("pswp--has_mouse"));
  }
  ni() {
    this.updateSize(), /iPhone|iPad|iPod/i.test(window.navigator.userAgent) && setTimeout(() => {
      this.updateSize();
    }, 500);
  }
  oi() {
    this.setScrollOffset(0, window.pageYOffset);
  }
  setScrollOffset(t, i) {
    this.offset.x = t, this.offset.y = i, this.dispatch("updateScrollOffset");
  }
  ei() {
    this.element = t("pswp", "div"), this.element.setAttribute("tabindex", "-1"), this.element.setAttribute("role", "dialog"), this.template = this.element, this.bg = t("pswp__bg", "div", this.element), this.scrollWrap = t("pswp__scroll-wrap", "section", this.element), this.container = t("pswp__container", "div", this.scrollWrap), this.scrollWrap.setAttribute("aria-roledescription", "carousel"), this.container.setAttribute("aria-live", "off"), this.container.setAttribute("id", "pswp__items"), this.mainScroll.appendHolders(), this.ui = new W(this), this.ui.init(), (this.options.appendToEl || document.body).appendChild(this.element);
  }
  getThumbBounds() {
    return function (t, i, s) {
      const h = s.dispatch("thumbBounds", {
        index: t,
        itemData: i,
        instance: s
      });
      if (h.thumbBounds) return h.thumbBounds;
      const {
        element: e
      } = i;
      let n, o;
      if (e && !1 !== s.options.thumbSelector) {
        const t = s.options.thumbSelector || "img";
        o = e.matches(t) ? e : e.querySelector(t);
      }
      return o = s.applyFilters("thumbEl", o, i, t), o && (n = i.thumbCropped ? function (t, i, s) {
        const h = t.getBoundingClientRect(),
          e = h.width / i,
          n = h.height / s,
          o = e > n ? e : n,
          r = (h.width - i * o) / 2,
          a = (h.height - s * o) / 2,
          c = {
            x: h.left + r,
            y: h.top + a,
            w: i * o
          };
        return c.innerRect = {
          w: h.width,
          h: h.height,
          x: r,
          y: a
        }, c;
      }(o, i.width || i.w || 0, i.height || i.h || 0) : function (t) {
        const i = t.getBoundingClientRect();
        return {
          x: i.left,
          y: i.top,
          w: i.width
        };
      }(o)), s.applyFilters("thumbBounds", n, i, t);
    }(this.currIndex, this.currSlide ? this.currSlide.data : this.hi, this);
  }
  canLoop() {
    return this.options.loop && this.getNumItems() > 2;
  }
  ii(t) {
    return window.matchMedia("(prefers-reduced-motion), (update: slow)").matches && (t.showHideAnimationType = "none", t.zoomAnimationDuration = 0), {
      ...it,
      ...t
    };
  }
}
exports.default = st;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = A11y;
var _classesToSelectorMin = require("../shared/classes-to-selector.min.mjs");
var _utilsMin = require("../shared/utils.min.mjs");
function A11y(e) {
  let {
    swiper: a,
    extendParams: t,
    on: i
  } = e;
  t({
    a11y: {
      enabled: !0,
      notificationClass: "swiper-notification",
      prevSlideMessage: "Previous slide",
      nextSlideMessage: "Next slide",
      firstSlideMessage: "This is the first slide",
      lastSlideMessage: "This is the last slide",
      paginationBulletMessage: "Go to slide {{index}}",
      slideLabelMessage: "{{index}} / {{slidesLength}}",
      containerMessage: null,
      containerRoleDescriptionMessage: null,
      itemRoleDescriptionMessage: null,
      slideRole: "group",
      id: null
    }
  }), a.a11y = {
    clicked: !1
  };
  let n = null;
  function s(e) {
    const a = n;
    0 !== a.length && (a.innerHTML = "", a.innerHTML = e);
  }
  const r = e => (Array.isArray(e) ? e : [e]).filter(e => !!e);
  function o(e) {
    (e = r(e)).forEach(e => {
      e.setAttribute("tabIndex", "0");
    });
  }
  function l(e) {
    (e = r(e)).forEach(e => {
      e.setAttribute("tabIndex", "-1");
    });
  }
  function c(e, a) {
    (e = r(e)).forEach(e => {
      e.setAttribute("role", a);
    });
  }
  function d(e, a) {
    (e = r(e)).forEach(e => {
      e.setAttribute("aria-roledescription", a);
    });
  }
  function p(e, a) {
    (e = r(e)).forEach(e => {
      e.setAttribute("aria-label", a);
    });
  }
  function g(e) {
    (e = r(e)).forEach(e => {
      e.setAttribute("aria-disabled", !0);
    });
  }
  function u(e) {
    (e = r(e)).forEach(e => {
      e.setAttribute("aria-disabled", !1);
    });
  }
  function f(e) {
    if (13 !== e.keyCode && 32 !== e.keyCode) return;
    const t = a.params.a11y,
      i = e.target;
    a.pagination && a.pagination.el && (i === a.pagination.el || a.pagination.el.contains(e.target)) && !e.target.matches((0, _classesToSelectorMin.c)(a.params.pagination.bulletClass)) || (a.navigation && a.navigation.nextEl && i === a.navigation.nextEl && (a.isEnd && !a.params.loop || a.slideNext(), a.isEnd ? s(t.lastSlideMessage) : s(t.nextSlideMessage)), a.navigation && a.navigation.prevEl && i === a.navigation.prevEl && (a.isBeginning && !a.params.loop || a.slidePrev(), a.isBeginning ? s(t.firstSlideMessage) : s(t.prevSlideMessage)), a.pagination && i.matches((0, _classesToSelectorMin.c)(a.params.pagination.bulletClass)) && i.click());
  }
  function m() {
    return a.pagination && a.pagination.bullets && a.pagination.bullets.length;
  }
  function v() {
    return m() && a.params.pagination.clickable;
  }
  const E = (e, a, t) => {
      o(e), "BUTTON" !== e.tagName && (c(e, "button"), e.addEventListener("keydown", f)), p(e, t), function (e, a) {
        (e = r(e)).forEach(e => {
          e.setAttribute("aria-controls", a);
        });
      }(e, a);
    },
    b = () => {
      a.a11y.clicked = !0;
    },
    h = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          a.destroyed || (a.a11y.clicked = !1);
        });
      });
    },
    y = e => {
      if (a.a11y.clicked) return;
      const t = e.target.closest(`.${a.params.slideClass}, swiper-slide`);
      if (!t || !a.slides.includes(t)) return;
      const i = a.slides.indexOf(t) === a.activeIndex,
        n = a.params.watchSlidesProgress && a.visibleSlides && a.visibleSlides.includes(t);
      i || n || e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents || (a.isHorizontal() ? a.el.scrollLeft = 0 : a.el.scrollTop = 0, a.slideTo(a.slides.indexOf(t), 0));
    },
    M = () => {
      const e = a.params.a11y;
      e.itemRoleDescriptionMessage && d(a.slides, e.itemRoleDescriptionMessage), e.slideRole && c(a.slides, e.slideRole);
      const t = a.slides.length;
      e.slideLabelMessage && a.slides.forEach((i, n) => {
        const s = a.params.loop ? parseInt(i.getAttribute("data-swiper-slide-index"), 10) : n;
        p(i, e.slideLabelMessage.replace(/\{\{index\}\}/, s + 1).replace(/\{\{slidesLength\}\}/, t));
      });
    },
    A = () => {
      const e = a.params.a11y;
      a.el.append(n);
      const t = a.el;
      e.containerRoleDescriptionMessage && d(t, e.containerRoleDescriptionMessage), e.containerMessage && p(t, e.containerMessage);
      const i = a.wrapperEl,
        s = e.id || i.getAttribute("id") || `swiper-wrapper-${(o = 16, void 0 === o && (o = 16), "x".repeat(o).replace(/x/g, () => Math.round(16 * Math.random()).toString(16)))}`;
      var o;
      const l = a.params.autoplay && a.params.autoplay.enabled ? "off" : "polite";
      var c;
      c = s, r(i).forEach(e => {
        e.setAttribute("id", c);
      }), function (e, a) {
        (e = r(e)).forEach(e => {
          e.setAttribute("aria-live", a);
        });
      }(i, l), M();
      let {
        nextEl: g,
        prevEl: u
      } = a.navigation ? a.navigation : {};
      if (g = r(g), u = r(u), g && g.forEach(a => E(a, s, e.nextSlideMessage)), u && u.forEach(a => E(a, s, e.prevSlideMessage)), v()) {
        (Array.isArray(a.pagination.el) ? a.pagination.el : [a.pagination.el]).forEach(e => {
          e.addEventListener("keydown", f);
        });
      }
      a.el.addEventListener("focus", y, !0), a.el.addEventListener("pointerdown", b, !0), a.el.addEventListener("pointerup", h, !0);
    };
  i("beforeInit", () => {
    n = (0, _utilsMin.c)("span", a.params.a11y.notificationClass), n.setAttribute("aria-live", "assertive"), n.setAttribute("aria-atomic", "true");
  }), i("afterInit", () => {
    a.params.a11y.enabled && A();
  }), i("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => {
    a.params.a11y.enabled && M();
  }), i("fromEdge toEdge afterInit lock unlock", () => {
    a.params.a11y.enabled && function () {
      if (a.params.loop || a.params.rewind || !a.navigation) return;
      const {
        nextEl: e,
        prevEl: t
      } = a.navigation;
      t && (a.isBeginning ? (g(t), l(t)) : (u(t), o(t))), e && (a.isEnd ? (g(e), l(e)) : (u(e), o(e)));
    }();
  }), i("paginationUpdate", () => {
    a.params.a11y.enabled && function () {
      const e = a.params.a11y;
      m() && a.pagination.bullets.forEach(t => {
        a.params.pagination.clickable && (o(t), a.params.pagination.renderBullet || (c(t, "button"), p(t, e.paginationBulletMessage.replace(/\{\{index\}\}/, (0, _utilsMin.g)(t) + 1)))), t.matches((0, _classesToSelectorMin.c)(a.params.pagination.bulletActiveClass)) ? t.setAttribute("aria-current", "true") : t.removeAttribute("aria-current");
      });
    }();
  }), i("destroy", () => {
    a.params.a11y.enabled && function () {
      n && n.remove();
      let {
        nextEl: e,
        prevEl: t
      } = a.navigation ? a.navigation : {};
      e = r(e), t = r(t), e && e.forEach(e => e.removeEventListener("keydown", f)), t && t.forEach(e => e.removeEventListener("keydown", f)), v() && (Array.isArray(a.pagination.el) ? a.pagination.el : [a.pagination.el]).forEach(e => {
        e.removeEventListener("keydown", f);
      });
      a.el.removeEventListener("focus", y, !0), a.el.removeEventListener("pointerdown", b, !0), a.el.removeEventListener("pointerup", h, !0);
    }();
  });
}

},{"../shared/classes-to-selector.min.mjs":27,"../shared/utils.min.mjs":35}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Autoplay;
var _ssrWindowEsmMin = require("../shared/ssr-window.esm.min.mjs");
function Autoplay(e) {
  let a,
    t,
    {
      swiper: n,
      extendParams: r,
      on: i,
      emit: o,
      params: s
    } = e;
  n.autoplay = {
    running: !1,
    paused: !1,
    timeLeft: 0
  }, r({
    autoplay: {
      enabled: !1,
      delay: 3e3,
      waitForTransition: !0,
      disableOnInteraction: !0,
      stopOnLastSlide: !1,
      reverseDirection: !1,
      pauseOnMouseEnter: !1
    }
  });
  let p,
    l,
    u,
    d,
    y,
    m,
    c,
    g = s && s.autoplay ? s.autoplay.delay : 3e3,
    v = s && s.autoplay ? s.autoplay.delay : 3e3,
    T = new Date().getTime;
  function w(e) {
    n && !n.destroyed && n.wrapperEl && e.target === n.wrapperEl && (n.wrapperEl.removeEventListener("transitionend", w), O());
  }
  const E = () => {
      if (n.destroyed || !n.autoplay.running) return;
      n.autoplay.paused ? l = !0 : l && (v = p, l = !1);
      const e = n.autoplay.paused ? p : T + v - new Date().getTime();
      n.autoplay.timeLeft = e, o("autoplayTimeLeft", e, e / g), t = requestAnimationFrame(() => {
        E();
      });
    },
    f = e => {
      if (n.destroyed || !n.autoplay.running) return;
      cancelAnimationFrame(t), E();
      let r = void 0 === e ? n.params.autoplay.delay : e;
      g = n.params.autoplay.delay, v = n.params.autoplay.delay;
      const i = (() => {
        let e;
        if (e = n.virtual && n.params.virtual.enabled ? n.slides.filter(e => e.classList.contains("swiper-slide-active"))[0] : n.slides[n.activeIndex], !e) return;
        return parseInt(e.getAttribute("data-swiper-autoplay"), 10);
      })();
      !Number.isNaN(i) && i > 0 && void 0 === e && (r = i, g = i, v = i), p = r;
      const s = n.params.speed,
        l = () => {
          n && !n.destroyed && (n.params.autoplay.reverseDirection ? !n.isBeginning || n.params.loop || n.params.rewind ? (n.slidePrev(s, !0, !0), o("autoplay")) : n.params.autoplay.stopOnLastSlide || (n.slideTo(n.slides.length - 1, s, !0, !0), o("autoplay")) : !n.isEnd || n.params.loop || n.params.rewind ? (n.slideNext(s, !0, !0), o("autoplay")) : n.params.autoplay.stopOnLastSlide || (n.slideTo(0, s, !0, !0), o("autoplay")), n.params.cssMode && (T = new Date().getTime(), requestAnimationFrame(() => {
            f();
          })));
        };
      return r > 0 ? (clearTimeout(a), a = setTimeout(() => {
        l();
      }, r)) : requestAnimationFrame(() => {
        l();
      }), r;
    },
    b = () => {
      n.autoplay.running = !0, f(), o("autoplayStart");
    },
    L = () => {
      n.autoplay.running = !1, clearTimeout(a), cancelAnimationFrame(t), o("autoplayStop");
    },
    D = (e, t) => {
      if (n.destroyed || !n.autoplay.running) return;
      clearTimeout(a), e || (c = !0);
      const r = () => {
        o("autoplayPause"), n.params.autoplay.waitForTransition ? n.wrapperEl.addEventListener("transitionend", w) : O();
      };
      if (n.autoplay.paused = !0, t) return m && (p = n.params.autoplay.delay), m = !1, void r();
      const i = p || n.params.autoplay.delay;
      p = i - (new Date().getTime() - T), n.isEnd && p < 0 && !n.params.loop || (p < 0 && (p = 0), r());
    },
    O = () => {
      n.isEnd && p < 0 && !n.params.loop || n.destroyed || !n.autoplay.running || (T = new Date().getTime(), c ? (c = !1, f(p)) : f(), n.autoplay.paused = !1, o("autoplayResume"));
    },
    A = () => {
      if (n.destroyed || !n.autoplay.running) return;
      const e = (0, _ssrWindowEsmMin.g)();
      "hidden" === e.visibilityState && (c = !0, D(!0)), "visible" === e.visibilityState && O();
    },
    F = e => {
      "mouse" === e.pointerType && (c = !0, D(!0));
    },
    S = e => {
      "mouse" === e.pointerType && n.autoplay.paused && O();
    };
  i("init", () => {
    n.params.autoplay.enabled && (n.params.autoplay.pauseOnMouseEnter && (n.el.addEventListener("pointerenter", F), n.el.addEventListener("pointerleave", S)), (0, _ssrWindowEsmMin.g)().addEventListener("visibilitychange", A), T = new Date().getTime(), b());
  }), i("destroy", () => {
    n.el.removeEventListener("pointerenter", F), n.el.removeEventListener("pointerleave", S), (0, _ssrWindowEsmMin.g)().removeEventListener("visibilitychange", A), n.autoplay.running && L();
  }), i("beforeTransitionStart", (e, a, t) => {
    !n.destroyed && n.autoplay.running && (t || !n.params.autoplay.disableOnInteraction ? D(!0, !0) : L());
  }), i("sliderFirstMove", () => {
    !n.destroyed && n.autoplay.running && (n.params.autoplay.disableOnInteraction ? L() : (u = !0, d = !1, c = !1, y = setTimeout(() => {
      c = !0, d = !0, D(!0);
    }, 200)));
  }), i("touchEnd", () => {
    if (!n.destroyed && n.autoplay.running && u) {
      if (clearTimeout(y), clearTimeout(a), n.params.autoplay.disableOnInteraction) return d = !1, void (u = !1);
      d && n.params.cssMode && O(), d = !1, u = !1;
    }
  }), i("slideChange", () => {
    !n.destroyed && n.autoplay.running && (m = !0);
  }), Object.assign(n.autoplay, {
    start: b,
    stop: L,
    pause: D,
    resume: O
  });
}

},{"../shared/ssr-window.esm.min.mjs":33}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Controller;
var _utilsMin = require("../shared/utils.min.mjs");
function Controller(t) {
  let {
    swiper: e,
    extendParams: n,
    on: r
  } = t;
  function o(t, e) {
    const n = function () {
      let t, e, n;
      return (r, o) => {
        for (e = -1, t = r.length; t - e > 1;) n = t + e >> 1, r[n] <= o ? e = n : t = n;
        return t;
      };
    }();
    let r, o;
    return this.x = t, this.y = e, this.lastIndex = t.length - 1, this.interpolate = function (t) {
      return t ? (o = n(this.x, t), r = o - 1, (t - this.x[r]) * (this.y[o] - this.y[r]) / (this.x[o] - this.x[r]) + this.y[r]) : 0;
    }, this;
  }
  function l() {
    e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline);
  }
  n({
    controller: {
      control: void 0,
      inverse: !1,
      by: "slide"
    }
  }), e.controller = {
    control: void 0
  }, r("beforeInit", () => {
    if ("undefined" != typeof window && ("string" == typeof e.params.controller.control || e.params.controller.control instanceof HTMLElement)) {
      const t = document.querySelector(e.params.controller.control);
      if (t && t.swiper) e.controller.control = t.swiper;else if (t) {
        const n = r => {
          e.controller.control = r.detail[0], e.update(), t.removeEventListener("init", n);
        };
        t.addEventListener("init", n);
      }
    } else e.controller.control = e.params.controller.control;
  }), r("update", () => {
    l();
  }), r("resize", () => {
    l();
  }), r("observerUpdate", () => {
    l();
  }), r("setTranslate", (t, n, r) => {
    e.controller.control && !e.controller.control.destroyed && e.controller.setTranslate(n, r);
  }), r("setTransition", (t, n, r) => {
    e.controller.control && !e.controller.control.destroyed && e.controller.setTransition(n, r);
  }), Object.assign(e.controller, {
    setTranslate: function (t, n) {
      const r = e.controller.control;
      let l, s;
      const i = e.constructor;
      function a(t) {
        if (t.destroyed) return;
        const n = e.rtlTranslate ? -e.translate : e.translate;
        "slide" === e.params.controller.by && (!function (t) {
          e.controller.spline = e.params.loop ? new o(e.slidesGrid, t.slidesGrid) : new o(e.snapGrid, t.snapGrid);
        }(t), s = -e.controller.spline.interpolate(-n)), s && "container" !== e.params.controller.by || (l = (t.maxTranslate() - t.minTranslate()) / (e.maxTranslate() - e.minTranslate()), !Number.isNaN(l) && Number.isFinite(l) || (l = 1), s = (n - e.minTranslate()) * l + t.minTranslate()), e.params.controller.inverse && (s = t.maxTranslate() - s), t.updateProgress(s), t.setTranslate(s, e), t.updateActiveIndex(), t.updateSlidesClasses();
      }
      if (Array.isArray(r)) for (let t = 0; t < r.length; t += 1) r[t] !== n && r[t] instanceof i && a(r[t]);else r instanceof i && n !== r && a(r);
    },
    setTransition: function (t, n) {
      const r = e.constructor,
        o = e.controller.control;
      let l;
      function s(n) {
        n.destroyed || (n.setTransition(t, e), 0 !== t && (n.transitionStart(), n.params.autoHeight && (0, _utilsMin.n)(() => {
          n.updateAutoHeight();
        }), (0, _utilsMin.i)(n.wrapperEl, () => {
          o && n.transitionEnd();
        })));
      }
      if (Array.isArray(o)) for (l = 0; l < o.length; l += 1) o[l] !== n && o[l] instanceof r && s(o[l]);else o instanceof r && n !== o && s(o);
    }
  });
}

},{"../shared/utils.min.mjs":35}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EffectCards;
var _createShadowMin = require("../shared/create-shadow.min.mjs");
var _effectInitMin = require("../shared/effect-init.min.mjs");
var _effectTargetMin = require("../shared/effect-target.min.mjs");
var _effectVirtualTransitionEndMin = require("../shared/effect-virtual-transition-end.min.mjs");
var _utilsMin = require("../shared/utils.min.mjs");
function EffectCards(e) {
  let {
    swiper: t,
    extendParams: a,
    on: s
  } = e;
  a({
    cardsEffect: {
      slideShadows: !0,
      rotate: !0,
      perSlideRotate: 2,
      perSlideOffset: 8
    }
  });
  (0, _effectInitMin.e)({
    effect: "cards",
    swiper: t,
    on: s,
    setTranslate: () => {
      const {
          slides: e,
          activeIndex: a,
          rtlTranslate: s
        } = t,
        r = t.params.cardsEffect,
        {
          startTranslate: i,
          isTouched: n
        } = t.touchEventsData,
        o = s ? -t.translate : t.translate;
      for (let l = 0; l < e.length; l += 1) {
        const d = e[l],
          f = d.progress,
          c = Math.min(Math.max(f, -4), 4);
        let m = d.swiperSlideOffset;
        t.params.centeredSlides && !t.params.cssMode && (t.wrapperEl.style.transform = `translateX(${t.minTranslate()}px)`), t.params.centeredSlides && t.params.cssMode && (m -= e[0].swiperSlideOffset);
        let p = t.params.cssMode ? -m - t.translate : -m,
          h = 0;
        const M = -100 * Math.abs(c);
        let u = 1,
          w = -r.perSlideRotate * c,
          S = r.perSlideOffset - .75 * Math.abs(c);
        const $ = t.virtual && t.params.virtual.enabled ? t.virtual.from + l : l,
          E = ($ === a || $ === a - 1) && c > 0 && c < 1 && (n || t.params.cssMode) && o < i,
          T = ($ === a || $ === a + 1) && c < 0 && c > -1 && (n || t.params.cssMode) && o > i;
        if (E || T) {
          const e = (1 - Math.abs((Math.abs(c) - .5) / .5)) ** .5;
          w += -28 * c * e, u += -.5 * e, S += 96 * e, h = -25 * e * Math.abs(c) + "%";
        }
        if (p = c < 0 ? `calc(${p}px ${s ? "-" : "+"} (${S * Math.abs(c)}%))` : c > 0 ? `calc(${p}px ${s ? "-" : "+"} (-${S * Math.abs(c)}%))` : `${p}px`, !t.isHorizontal()) {
          const e = h;
          h = p, p = e;
        }
        const x = c < 0 ? "" + (1 + (1 - u) * c) : "" + (1 - (1 - u) * c),
          b = `\n        translate3d(${p}, ${h}, ${M}px)\n        rotateZ(${r.rotate ? s ? -w : w : 0}deg)\n        scale(${x})\n      `;
        if (r.slideShadows) {
          let e = d.querySelector(".swiper-slide-shadow");
          e || (e = (0, _createShadowMin.c)("cards", d)), e && (e.style.opacity = Math.min(Math.max((Math.abs(c) - .5) / .5, 0), 1));
        }
        d.style.zIndex = -Math.abs(Math.round(f)) + e.length;
        (0, _effectTargetMin.e)(r, d).style.transform = b;
      }
    },
    setTransition: e => {
      const a = t.slides.map(e => (0, _utilsMin.k)(e));
      a.forEach(t => {
        t.style.transitionDuration = `${e}ms`, t.querySelectorAll(".swiper-slide-shadow").forEach(t => {
          t.style.transitionDuration = `${e}ms`;
        });
      }), (0, _effectVirtualTransitionEndMin.e)({
        swiper: t,
        duration: e,
        transformElements: a
      });
    },
    perspective: () => !0,
    overwriteParams: () => ({
      watchSlidesProgress: !0,
      virtualTranslate: !t.params.cssMode
    })
  });
}

},{"../shared/create-shadow.min.mjs":29,"../shared/effect-init.min.mjs":30,"../shared/effect-target.min.mjs":31,"../shared/effect-virtual-transition-end.min.mjs":32,"../shared/utils.min.mjs":35}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EffectCoverflow;
var _createShadowMin = require("../shared/create-shadow.min.mjs");
var _effectInitMin = require("../shared/effect-init.min.mjs");
var _effectTargetMin = require("../shared/effect-target.min.mjs");
var _utilsMin = require("../shared/utils.min.mjs");
function EffectCoverflow(e) {
  let {
    swiper: t,
    extendParams: s,
    on: r
  } = e;
  s({
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      scale: 1,
      modifier: 1,
      slideShadows: !0
    }
  });
  (0, _effectInitMin.e)({
    effect: "coverflow",
    swiper: t,
    on: r,
    setTranslate: () => {
      const {
          width: e,
          height: s,
          slides: r,
          slidesSizesGrid: o
        } = t,
        a = t.params.coverflowEffect,
        i = t.isHorizontal(),
        l = t.translate,
        f = i ? e / 2 - l : s / 2 - l,
        d = i ? a.rotate : -a.rotate,
        c = a.depth;
      for (let e = 0, t = r.length; e < t; e += 1) {
        const t = r[e],
          s = o[e],
          l = (f - t.swiperSlideOffset - s / 2) / s,
          h = "function" == typeof a.modifier ? a.modifier(l) : l * a.modifier;
        let n = i ? d * h : 0,
          w = i ? 0 : d * h,
          p = -c * Math.abs(h),
          m = a.stretch;
        "string" == typeof m && -1 !== m.indexOf("%") && (m = parseFloat(a.stretch) / 100 * s);
        let y = i ? 0 : m * h,
          S = i ? m * h : 0,
          g = 1 - (1 - a.scale) * Math.abs(h);
        Math.abs(S) < .001 && (S = 0), Math.abs(y) < .001 && (y = 0), Math.abs(p) < .001 && (p = 0), Math.abs(n) < .001 && (n = 0), Math.abs(w) < .001 && (w = 0), Math.abs(g) < .001 && (g = 0);
        const b = `translate3d(${S}px,${y}px,${p}px)  rotateX(${w}deg) rotateY(${n}deg) scale(${g})`;
        if ((0, _effectTargetMin.e)(a, t).style.transform = b, t.style.zIndex = 1 - Math.abs(Math.round(h)), a.slideShadows) {
          let e = i ? t.querySelector(".swiper-slide-shadow-left") : t.querySelector(".swiper-slide-shadow-top"),
            s = i ? t.querySelector(".swiper-slide-shadow-right") : t.querySelector(".swiper-slide-shadow-bottom");
          e || (e = (0, _createShadowMin.c)("coverflow", t, i ? "left" : "top")), s || (s = (0, _createShadowMin.c)("coverflow", t, i ? "right" : "bottom")), e && (e.style.opacity = h > 0 ? h : 0), s && (s.style.opacity = -h > 0 ? -h : 0);
        }
      }
    },
    setTransition: e => {
      t.slides.map(e => (0, _utilsMin.k)(e)).forEach(t => {
        t.style.transitionDuration = `${e}ms`, t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(t => {
          t.style.transitionDuration = `${e}ms`;
        });
      });
    },
    perspective: () => !0,
    overwriteParams: () => ({
      watchSlidesProgress: !0
    })
  });
}

},{"../shared/create-shadow.min.mjs":29,"../shared/effect-init.min.mjs":30,"../shared/effect-target.min.mjs":31,"../shared/utils.min.mjs":35}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EffectCreative;
var _createShadowMin = require("../shared/create-shadow.min.mjs");
var _effectInitMin = require("../shared/effect-init.min.mjs");
var _effectTargetMin = require("../shared/effect-target.min.mjs");
var _effectVirtualTransitionEndMin = require("../shared/effect-virtual-transition-end.min.mjs");
var _utilsMin = require("../shared/utils.min.mjs");
function EffectCreative(e) {
  let {
    swiper: t,
    extendParams: s,
    on: r
  } = e;
  s({
    creativeEffect: {
      limitProgress: 1,
      shadowPerProgress: !1,
      progressMultiplier: 1,
      perspective: !0,
      prev: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1
      },
      next: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1
      }
    }
  });
  const a = e => "string" == typeof e ? e : `${e}px`;
  (0, _effectInitMin.e)({
    effect: "creative",
    swiper: t,
    on: r,
    setTranslate: () => {
      const {
          slides: e,
          wrapperEl: s,
          slidesSizesGrid: r
        } = t,
        i = t.params.creativeEffect,
        {
          progressMultiplier: o
        } = i,
        l = t.params.centeredSlides;
      if (l) {
        const e = r[0] / 2 - t.params.slidesOffsetBefore || 0;
        s.style.transform = `translateX(calc(50% - ${e}px))`;
      }
      for (let s = 0; s < e.length; s += 1) {
        const r = e[s],
          n = r.progress,
          c = Math.min(Math.max(r.progress, -i.limitProgress), i.limitProgress);
        let f = c;
        l || (f = Math.min(Math.max(r.originalProgress, -i.limitProgress), i.limitProgress));
        const m = r.swiperSlideOffset,
          p = [t.params.cssMode ? -m - t.translate : -m, 0, 0],
          d = [0, 0, 0];
        let h = !1;
        t.isHorizontal() || (p[1] = p[0], p[0] = 0);
        let g = {
          translate: [0, 0, 0],
          rotate: [0, 0, 0],
          scale: 1,
          opacity: 1
        };
        c < 0 ? (g = i.next, h = !0) : c > 0 && (g = i.prev, h = !0), p.forEach((e, t) => {
          p[t] = `calc(${e}px + (${a(g.translate[t])} * ${Math.abs(c * o)}))`;
        }), d.forEach((e, t) => {
          d[t] = g.rotate[t] * Math.abs(c * o);
        }), r.style.zIndex = -Math.abs(Math.round(n)) + e.length;
        const w = p.join(", "),
          y = `rotateX(${d[0]}deg) rotateY(${d[1]}deg) rotateZ(${d[2]}deg)`,
          u = f < 0 ? `scale(${1 + (1 - g.scale) * f * o})` : `scale(${1 - (1 - g.scale) * f * o})`,
          v = f < 0 ? 1 + (1 - g.opacity) * f * o : 1 - (1 - g.opacity) * f * o,
          E = `translate3d(${w}) ${y} ${u}`;
        if (h && g.shadow || !h) {
          let e = r.querySelector(".swiper-slide-shadow");
          if (!e && g.shadow && (e = (0, _createShadowMin.c)("creative", r)), e) {
            const t = i.shadowPerProgress ? c * (1 / i.limitProgress) : c;
            e.style.opacity = Math.min(Math.max(Math.abs(t), 0), 1);
          }
        }
        const M = (0, _effectTargetMin.e)(i, r);
        M.style.transform = E, M.style.opacity = v, g.origin && (M.style.transformOrigin = g.origin);
      }
    },
    setTransition: e => {
      const s = t.slides.map(e => (0, _utilsMin.k)(e));
      s.forEach(t => {
        t.style.transitionDuration = `${e}ms`, t.querySelectorAll(".swiper-slide-shadow").forEach(t => {
          t.style.transitionDuration = `${e}ms`;
        });
      }), (0, _effectVirtualTransitionEndMin.e)({
        swiper: t,
        duration: e,
        transformElements: s,
        allSlides: !0
      });
    },
    perspective: () => t.params.creativeEffect.perspective,
    overwriteParams: () => ({
      watchSlidesProgress: !0,
      virtualTranslate: !t.params.cssMode
    })
  });
}

},{"../shared/create-shadow.min.mjs":29,"../shared/effect-init.min.mjs":30,"../shared/effect-target.min.mjs":31,"../shared/effect-virtual-transition-end.min.mjs":32,"../shared/utils.min.mjs":35}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EffectCube;
var _effectInitMin = require("../shared/effect-init.min.mjs");
var _utilsMin = require("../shared/utils.min.mjs");
function EffectCube(e) {
  let {
    swiper: t,
    extendParams: s,
    on: a
  } = e;
  s({
    cubeEffect: {
      slideShadows: !0,
      shadow: !0,
      shadowOffset: 20,
      shadowScale: .94
    }
  });
  const r = (e, t, s) => {
    let a = s ? e.querySelector(".swiper-slide-shadow-left") : e.querySelector(".swiper-slide-shadow-top"),
      r = s ? e.querySelector(".swiper-slide-shadow-right") : e.querySelector(".swiper-slide-shadow-bottom");
    a || (a = (0, _utilsMin.c)("div", ("swiper-slide-shadow-cube swiper-slide-shadow-" + (s ? "left" : "top")).split(" ")), e.append(a)), r || (r = (0, _utilsMin.c)("div", ("swiper-slide-shadow-cube swiper-slide-shadow-" + (s ? "right" : "bottom")).split(" ")), e.append(r)), a && (a.style.opacity = Math.max(-t, 0)), r && (r.style.opacity = Math.max(t, 0));
  };
  (0, _effectInitMin.e)({
    effect: "cube",
    swiper: t,
    on: a,
    setTranslate: () => {
      const {
          el: e,
          wrapperEl: s,
          slides: a,
          width: o,
          height: i,
          rtlTranslate: l,
          size: d,
          browser: n
        } = t,
        p = t.params.cubeEffect,
        c = t.isHorizontal(),
        w = t.virtual && t.params.virtual.enabled;
      let h,
        f = 0;
      p.shadow && (c ? (h = t.wrapperEl.querySelector(".swiper-cube-shadow"), h || (h = (0, _utilsMin.c)("div", "swiper-cube-shadow"), t.wrapperEl.append(h)), h.style.height = `${o}px`) : (h = e.querySelector(".swiper-cube-shadow"), h || (h = (0, _utilsMin.c)("div", "swiper-cube-shadow"), e.append(h))));
      for (let e = 0; e < a.length; e += 1) {
        const t = a[e];
        let s = e;
        w && (s = parseInt(t.getAttribute("data-swiper-slide-index"), 10));
        let o = 90 * s,
          i = Math.floor(o / 360);
        l && (o = -o, i = Math.floor(-o / 360));
        const n = Math.max(Math.min(t.progress, 1), -1);
        let h = 0,
          m = 0,
          u = 0;
        s % 4 == 0 ? (h = 4 * -i * d, u = 0) : (s - 1) % 4 == 0 ? (h = 0, u = 4 * -i * d) : (s - 2) % 4 == 0 ? (h = d + 4 * i * d, u = d) : (s - 3) % 4 == 0 && (h = -d, u = 3 * d + 4 * d * i), l && (h = -h), c || (m = h, h = 0);
        const b = `rotateX(${c ? 0 : -o}deg) rotateY(${c ? o : 0}deg) translate3d(${h}px, ${m}px, ${u}px)`;
        n <= 1 && n > -1 && (f = 90 * s + 90 * n, l && (f = 90 * -s - 90 * n)), t.style.transform = b, p.slideShadows && r(t, n, c);
      }
      if (s.style.transformOrigin = `50% 50% -${d / 2}px`, s.style["-webkit-transform-origin"] = `50% 50% -${d / 2}px`, p.shadow) if (c) h.style.transform = `translate3d(0px, ${o / 2 + p.shadowOffset}px, ${-o / 2}px) rotateX(90deg) rotateZ(0deg) scale(${p.shadowScale})`;else {
        const e = Math.abs(f) - 90 * Math.floor(Math.abs(f) / 90),
          t = 1.5 - (Math.sin(2 * e * Math.PI / 360) / 2 + Math.cos(2 * e * Math.PI / 360) / 2),
          s = p.shadowScale,
          a = p.shadowScale / t,
          r = p.shadowOffset;
        h.style.transform = `scale3d(${s}, 1, ${a}) translate3d(0px, ${i / 2 + r}px, ${-i / 2 / a}px) rotateX(-90deg)`;
      }
      const m = (n.isSafari || n.isWebView) && n.needPerspectiveFix ? -d / 2 : 0;
      s.style.transform = `translate3d(0px,0,${m}px) rotateX(${t.isHorizontal() ? 0 : f}deg) rotateY(${t.isHorizontal() ? -f : 0}deg)`, s.style.setProperty("--swiper-cube-translate-z", `${m}px`);
    },
    setTransition: e => {
      const {
        el: s,
        slides: a
      } = t;
      if (a.forEach(t => {
        t.style.transitionDuration = `${e}ms`, t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(t => {
          t.style.transitionDuration = `${e}ms`;
        });
      }), t.params.cubeEffect.shadow && !t.isHorizontal()) {
        const t = s.querySelector(".swiper-cube-shadow");
        t && (t.style.transitionDuration = `${e}ms`);
      }
    },
    recreateShadows: () => {
      const e = t.isHorizontal();
      t.slides.forEach(t => {
        const s = Math.max(Math.min(t.progress, 1), -1);
        r(t, s, e);
      });
    },
    getEffectParams: () => t.params.cubeEffect,
    perspective: () => !0,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: !0,
      resistanceRatio: 0,
      spaceBetween: 0,
      centeredSlides: !1,
      virtualTranslate: !0
    })
  });
}

},{"../shared/effect-init.min.mjs":30,"../shared/utils.min.mjs":35}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EffectFade;
var _effectInitMin = require("../shared/effect-init.min.mjs");
var _effectTargetMin = require("../shared/effect-target.min.mjs");
var _effectVirtualTransitionEndMin = require("../shared/effect-virtual-transition-end.min.mjs");
var _utilsMin = require("../shared/utils.min.mjs");
function EffectFade(e) {
  let {
    swiper: t,
    extendParams: s,
    on: a
  } = e;
  s({
    fadeEffect: {
      crossFade: !1
    }
  });
  (0, _effectInitMin.e)({
    effect: "fade",
    swiper: t,
    on: a,
    setTranslate: () => {
      const {
          slides: e
        } = t,
        s = t.params.fadeEffect;
      for (let a = 0; a < e.length; a += 1) {
        const e = t.slides[a];
        let r = -e.swiperSlideOffset;
        t.params.virtualTranslate || (r -= t.translate);
        let i = 0;
        t.isHorizontal() || (i = r, r = 0);
        const f = t.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(e.progress), 0) : 1 + Math.min(Math.max(e.progress, -1), 0),
          n = (0, _effectTargetMin.e)(s, e);
        n.style.opacity = f, n.style.transform = `translate3d(${r}px, ${i}px, 0px)`;
      }
    },
    setTransition: e => {
      const s = t.slides.map(e => (0, _utilsMin.k)(e));
      s.forEach(t => {
        t.style.transitionDuration = `${e}ms`;
      }), (0, _effectVirtualTransitionEndMin.e)({
        swiper: t,
        duration: e,
        transformElements: s,
        allSlides: !0
      });
    },
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: !0,
      spaceBetween: 0,
      virtualTranslate: !t.params.cssMode
    })
  });
}

},{"../shared/effect-init.min.mjs":30,"../shared/effect-target.min.mjs":31,"../shared/effect-virtual-transition-end.min.mjs":32,"../shared/utils.min.mjs":35}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EffectFlip;
var _createShadowMin = require("../shared/create-shadow.min.mjs");
var _effectInitMin = require("../shared/effect-init.min.mjs");
var _effectTargetMin = require("../shared/effect-target.min.mjs");
var _effectVirtualTransitionEndMin = require("../shared/effect-virtual-transition-end.min.mjs");
var _utilsMin = require("../shared/utils.min.mjs");
function EffectFlip(e) {
  let {
    swiper: t,
    extendParams: s,
    on: r
  } = e;
  s({
    flipEffect: {
      slideShadows: !0,
      limitRotation: !0
    }
  });
  const a = (e, s) => {
    let r = t.isHorizontal() ? e.querySelector(".swiper-slide-shadow-left") : e.querySelector(".swiper-slide-shadow-top"),
      a = t.isHorizontal() ? e.querySelector(".swiper-slide-shadow-right") : e.querySelector(".swiper-slide-shadow-bottom");
    r || (r = (0, _createShadowMin.c)("flip", e, t.isHorizontal() ? "left" : "top")), a || (a = (0, _createShadowMin.c)("flip", e, t.isHorizontal() ? "right" : "bottom")), r && (r.style.opacity = Math.max(-s, 0)), a && (a.style.opacity = Math.max(s, 0));
  };
  (0, _effectInitMin.e)({
    effect: "flip",
    swiper: t,
    on: r,
    setTranslate: () => {
      const {
          slides: e,
          rtlTranslate: s
        } = t,
        r = t.params.flipEffect;
      for (let i = 0; i < e.length; i += 1) {
        const o = e[i];
        let l = o.progress;
        t.params.flipEffect.limitRotation && (l = Math.max(Math.min(o.progress, 1), -1));
        const f = o.swiperSlideOffset;
        let n = -180 * l,
          p = 0,
          d = t.params.cssMode ? -f - t.translate : -f,
          m = 0;
        t.isHorizontal() ? s && (n = -n) : (m = d, d = 0, p = -n, n = 0), o.style.zIndex = -Math.abs(Math.round(l)) + e.length, r.slideShadows && a(o, l);
        const c = `translate3d(${d}px, ${m}px, 0px) rotateX(${p}deg) rotateY(${n}deg)`;
        (0, _effectTargetMin.e)(r, o).style.transform = c;
      }
    },
    setTransition: e => {
      const s = t.slides.map(e => (0, _utilsMin.k)(e));
      s.forEach(t => {
        t.style.transitionDuration = `${e}ms`, t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(t => {
          t.style.transitionDuration = `${e}ms`;
        });
      }), (0, _effectVirtualTransitionEndMin.e)({
        swiper: t,
        duration: e,
        transformElements: s
      });
    },
    recreateShadows: () => {
      t.params.flipEffect, t.slides.forEach(e => {
        let s = e.progress;
        t.params.flipEffect.limitRotation && (s = Math.max(Math.min(e.progress, 1), -1)), a(e, s);
      });
    },
    getEffectParams: () => t.params.flipEffect,
    perspective: () => !0,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: !0,
      spaceBetween: 0,
      virtualTranslate: !t.params.cssMode
    })
  });
}

},{"../shared/create-shadow.min.mjs":29,"../shared/effect-init.min.mjs":30,"../shared/effect-target.min.mjs":31,"../shared/effect-virtual-transition-end.min.mjs":32,"../shared/utils.min.mjs":35}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = freeMode;
var _utilsMin = require("../shared/utils.min.mjs");
function freeMode(e) {
  let {
    swiper: t,
    extendParams: o,
    emit: n,
    once: s
  } = e;
  o({
    freeMode: {
      enabled: !1,
      momentum: !0,
      momentumRatio: 1,
      momentumBounce: !0,
      momentumBounceRatio: 1,
      momentumVelocityRatio: 1,
      sticky: !1,
      minimumVelocity: .02
    }
  }), Object.assign(t, {
    freeMode: {
      onTouchStart: function () {
        if (t.params.cssMode) return;
        const e = t.getTranslate();
        t.setTranslate(e), t.setTransition(0), t.touchEventsData.velocities.length = 0, t.freeMode.onTouchEnd({
          currentPos: t.rtl ? t.translate : -t.translate
        });
      },
      onTouchMove: function () {
        if (t.params.cssMode) return;
        const {
          touchEventsData: e,
          touches: o
        } = t;
        0 === e.velocities.length && e.velocities.push({
          position: o[t.isHorizontal() ? "startX" : "startY"],
          time: e.touchStartTime
        }), e.velocities.push({
          position: o[t.isHorizontal() ? "currentX" : "currentY"],
          time: (0, _utilsMin.d)()
        });
      },
      onTouchEnd: function (e) {
        let {
          currentPos: o
        } = e;
        if (t.params.cssMode) return;
        const {
            params: i,
            wrapperEl: a,
            rtlTranslate: r,
            snapGrid: l,
            touchEventsData: m
          } = t,
          c = (0, _utilsMin.d)() - m.touchStartTime;
        if (o < -t.minTranslate()) t.slideTo(t.activeIndex);else if (o > -t.maxTranslate()) t.slides.length < l.length ? t.slideTo(l.length - 1) : t.slideTo(t.slides.length - 1);else {
          if (i.freeMode.momentum) {
            if (m.velocities.length > 1) {
              const e = m.velocities.pop(),
                o = m.velocities.pop(),
                n = e.position - o.position,
                s = e.time - o.time;
              t.velocity = n / s, t.velocity /= 2, Math.abs(t.velocity) < i.freeMode.minimumVelocity && (t.velocity = 0), (s > 150 || (0, _utilsMin.d)() - e.time > 300) && (t.velocity = 0);
            } else t.velocity = 0;
            t.velocity *= i.freeMode.momentumVelocityRatio, m.velocities.length = 0;
            let e = 1e3 * i.freeMode.momentumRatio;
            const o = t.velocity * e;
            let c = t.translate + o;
            r && (c = -c);
            let d,
              u = !1;
            const f = 20 * Math.abs(t.velocity) * i.freeMode.momentumBounceRatio;
            let p;
            if (c < t.maxTranslate()) i.freeMode.momentumBounce ? (c + t.maxTranslate() < -f && (c = t.maxTranslate() - f), d = t.maxTranslate(), u = !0, m.allowMomentumBounce = !0) : c = t.maxTranslate(), i.loop && i.centeredSlides && (p = !0);else if (c > t.minTranslate()) i.freeMode.momentumBounce ? (c - t.minTranslate() > f && (c = t.minTranslate() + f), d = t.minTranslate(), u = !0, m.allowMomentumBounce = !0) : c = t.minTranslate(), i.loop && i.centeredSlides && (p = !0);else if (i.freeMode.sticky) {
              let e;
              for (let t = 0; t < l.length; t += 1) if (l[t] > -c) {
                e = t;
                break;
              }
              c = Math.abs(l[e] - c) < Math.abs(l[e - 1] - c) || "next" === t.swipeDirection ? l[e] : l[e - 1], c = -c;
            }
            if (p && s("transitionEnd", () => {
              t.loopFix();
            }), 0 !== t.velocity) {
              if (e = r ? Math.abs((-c - t.translate) / t.velocity) : Math.abs((c - t.translate) / t.velocity), i.freeMode.sticky) {
                const o = Math.abs((r ? -c : c) - t.translate),
                  n = t.slidesSizesGrid[t.activeIndex];
                e = o < n ? i.speed : o < 2 * n ? 1.5 * i.speed : 2.5 * i.speed;
              }
            } else if (i.freeMode.sticky) return void t.slideToClosest();
            i.freeMode.momentumBounce && u ? (t.updateProgress(d), t.setTransition(e), t.setTranslate(c), t.transitionStart(!0, t.swipeDirection), t.animating = !0, (0, _utilsMin.i)(a, () => {
              t && !t.destroyed && m.allowMomentumBounce && (n("momentumBounce"), t.setTransition(i.speed), setTimeout(() => {
                t.setTranslate(d), (0, _utilsMin.i)(a, () => {
                  t && !t.destroyed && t.transitionEnd();
                });
              }, 0));
            })) : t.velocity ? (n("_freeModeNoMomentumRelease"), t.updateProgress(c), t.setTransition(e), t.setTranslate(c), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, (0, _utilsMin.i)(a, () => {
              t && !t.destroyed && t.transitionEnd();
            }))) : t.updateProgress(c), t.updateActiveIndex(), t.updateSlidesClasses();
          } else {
            if (i.freeMode.sticky) return void t.slideToClosest();
            i.freeMode && n("_freeModeNoMomentumRelease");
          }
          (!i.freeMode.momentum || c >= i.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses());
        }
      }
    }
  });
}

},{"../shared/utils.min.mjs":35}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Grid;
function Grid(e) {
  let r,
    t,
    a,
    {
      swiper: l,
      extendParams: i
    } = e;
  i({
    grid: {
      rows: 1,
      fill: "column"
    }
  });
  const o = () => {
    let e = l.params.spaceBetween;
    return "string" == typeof e && e.indexOf("%") >= 0 ? e = parseFloat(e.replace("%", "")) / 100 * l.size : "string" == typeof e && (e = parseFloat(e)), e;
  };
  l.grid = {
    initSlides: e => {
      const {
          slidesPerView: i
        } = l.params,
        {
          rows: o,
          fill: s
        } = l.params.grid;
      a = Math.floor(e / o), r = Math.floor(e / o) === e / o ? e : Math.ceil(e / o) * o, "auto" !== i && "row" === s && (r = Math.max(r, i * o)), t = r / o;
    },
    updateSlide: (e, i, s, p) => {
      const {
          slidesPerGroup: n
        } = l.params,
        d = o(),
        {
          rows: f,
          fill: h
        } = l.params.grid;
      let u, c, m;
      if ("row" === h && n > 1) {
        const t = Math.floor(e / (n * f)),
          a = e - f * n * t,
          l = 0 === t ? n : Math.min(Math.ceil((s - t * f * n) / f), n);
        m = Math.floor(a / l), c = a - m * l + t * n, u = c + m * r / f, i.style.order = u;
      } else "column" === h ? (c = Math.floor(e / f), m = e - c * f, (c > a || c === a && m === f - 1) && (m += 1, m >= f && (m = 0, c += 1))) : (m = Math.floor(e / t), c = e - m * t);
      i.row = m, i.column = c, i.style[p("margin-top")] = 0 !== m ? d && `${d}px` : "";
    },
    updateWrapperSize: (e, t, a) => {
      const {
          centeredSlides: i,
          roundLengths: s
        } = l.params,
        p = o(),
        {
          rows: n
        } = l.params.grid;
      if (l.virtualSize = (e + p) * r, l.virtualSize = Math.ceil(l.virtualSize / n) - p, l.wrapperEl.style[a("width")] = `${l.virtualSize + p}px`, i) {
        const e = [];
        for (let r = 0; r < t.length; r += 1) {
          let a = t[r];
          s && (a = Math.floor(a)), t[r] < l.virtualSize + t[0] && e.push(a);
        }
        t.splice(0, t.length), t.push(...e);
      }
    }
  };
}

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HashNavigation;
var _ssrWindowEsmMin = require("../shared/ssr-window.esm.min.mjs");
var _utilsMin = require("../shared/utils.min.mjs");
function HashNavigation(a) {
  let {
      swiper: e,
      extendParams: t,
      emit: s,
      on: i
    } = a,
    n = !1;
  const r = (0, _ssrWindowEsmMin.g)(),
    h = (0, _ssrWindowEsmMin.a)();
  t({
    hashNavigation: {
      enabled: !1,
      replaceState: !1,
      watchState: !1,
      getSlideIndex(a, t) {
        if (e.virtual && e.params.virtual.enabled) {
          const a = e.slides.filter(a => a.getAttribute("data-hash") === t)[0];
          if (!a) return 0;
          return parseInt(a.getAttribute("data-swiper-slide-index"), 10);
        }
        return e.getSlideIndex((0, _utilsMin.e)(e.slidesEl, `.${e.params.slideClass}[data-hash="${t}"], swiper-slide[data-hash="${t}"]`)[0]);
      }
    }
  });
  const d = () => {
      s("hashChange");
      const a = r.location.hash.replace("#", ""),
        t = e.virtual && e.params.virtual.enabled ? e.slidesEl.querySelector(`[data-swiper-slide-index="${e.activeIndex}"]`) : e.slides[e.activeIndex];
      if (a !== (t ? t.getAttribute("data-hash") : "")) {
        const t = e.params.hashNavigation.getSlideIndex(e, a);
        if (void 0 === t || Number.isNaN(t)) return;
        e.slideTo(t);
      }
    },
    l = () => {
      if (!n || !e.params.hashNavigation.enabled) return;
      const a = e.virtual && e.params.virtual.enabled ? e.slidesEl.querySelector(`[data-swiper-slide-index="${e.activeIndex}"]`) : e.slides[e.activeIndex],
        t = a ? a.getAttribute("data-hash") || a.getAttribute("data-history") : "";
      e.params.hashNavigation.replaceState && h.history && h.history.replaceState ? (h.history.replaceState(null, null, `#${t}` || ""), s("hashSet")) : (r.location.hash = t || "", s("hashSet"));
    };
  i("init", () => {
    e.params.hashNavigation.enabled && (() => {
      if (!e.params.hashNavigation.enabled || e.params.history && e.params.history.enabled) return;
      n = !0;
      const a = r.location.hash.replace("#", "");
      if (a) {
        const t = 0,
          s = e.params.hashNavigation.getSlideIndex(e, a);
        e.slideTo(s || 0, t, e.params.runCallbacksOnInit, !0);
      }
      e.params.hashNavigation.watchState && h.addEventListener("hashchange", d);
    })();
  }), i("destroy", () => {
    e.params.hashNavigation.enabled && e.params.hashNavigation.watchState && h.removeEventListener("hashchange", d);
  }), i("transitionEnd _freeModeNoMomentumRelease", () => {
    n && l();
  }), i("slideChange", () => {
    n && e.params.cssMode && l();
  });
}

},{"../shared/ssr-window.esm.min.mjs":33,"../shared/utils.min.mjs":35}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = History;
var _ssrWindowEsmMin = require("../shared/ssr-window.esm.min.mjs");
function History(e) {
  let {
    swiper: t,
    extendParams: a,
    on: s
  } = e;
  a({
    history: {
      enabled: !1,
      root: "",
      replaceState: !1,
      key: "slides",
      keepQuery: !1
    }
  });
  let r = !1,
    i = {};
  const o = e => e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, ""),
    l = e => {
      const t = (0, _ssrWindowEsmMin.a)();
      let a;
      a = e ? new URL(e) : t.location;
      const s = a.pathname.slice(1).split("/").filter(e => "" !== e),
        r = s.length;
      return {
        key: s[r - 2],
        value: s[r - 1]
      };
    },
    n = (e, a) => {
      const s = (0, _ssrWindowEsmMin.a)();
      if (!r || !t.params.history.enabled) return;
      let i;
      i = t.params.url ? new URL(t.params.url) : s.location;
      const l = t.slides[a];
      let n = o(l.getAttribute("data-history"));
      if (t.params.history.root.length > 0) {
        let a = t.params.history.root;
        "/" === a[a.length - 1] && (a = a.slice(0, a.length - 1)), n = `${a}/${e ? `${e}/` : ""}${n}`;
      } else i.pathname.includes(e) || (n = `${e ? `${e}/` : ""}${n}`);
      t.params.history.keepQuery && (n += i.search);
      const p = s.history.state;
      p && p.value === n || (t.params.history.replaceState ? s.history.replaceState({
        value: n
      }, null, n) : s.history.pushState({
        value: n
      }, null, n));
    },
    p = (e, a, s) => {
      if (a) for (let r = 0, i = t.slides.length; r < i; r += 1) {
        const i = t.slides[r];
        if (o(i.getAttribute("data-history")) === a) {
          const a = t.getSlideIndex(i);
          t.slideTo(a, e, s);
        }
      } else t.slideTo(0, e, s);
    },
    d = () => {
      i = l(t.params.url), p(t.params.speed, i.value, !1);
    };
  s("init", () => {
    t.params.history.enabled && (() => {
      const e = (0, _ssrWindowEsmMin.a)();
      if (t.params.history) {
        if (!e.history || !e.history.pushState) return t.params.history.enabled = !1, void (t.params.hashNavigation.enabled = !0);
        r = !0, i = l(t.params.url), i.key || i.value ? (p(0, i.value, t.params.runCallbacksOnInit), t.params.history.replaceState || e.addEventListener("popstate", d)) : t.params.history.replaceState || e.addEventListener("popstate", d);
      }
    })();
  }), s("destroy", () => {
    t.params.history.enabled && (() => {
      const e = (0, _ssrWindowEsmMin.a)();
      t.params.history.replaceState || e.removeEventListener("popstate", d);
    })();
  }), s("transitionEnd _freeModeNoMomentumRelease", () => {
    r && n(t.params.history.key, t.activeIndex);
  }), s("slideChange", () => {
    r && t.params.cssMode && n(t.params.history.key, t.activeIndex);
  });
}

},{"../shared/ssr-window.esm.min.mjs":33}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Keyboard;
var _ssrWindowEsmMin = require("../shared/ssr-window.esm.min.mjs");
var _utilsMin = require("../shared/utils.min.mjs");
function Keyboard(e) {
  let {
    swiper: t,
    extendParams: n,
    on: a,
    emit: r
  } = e;
  const l = (0, _ssrWindowEsmMin.g)(),
    i = (0, _ssrWindowEsmMin.a)();
  function o(e) {
    if (!t.enabled) return;
    const {
      rtlTranslate: n
    } = t;
    let a = e;
    a.originalEvent && (a = a.originalEvent);
    const o = a.keyCode || a.charCode,
      s = t.params.keyboard.pageUpDown,
      d = s && 33 === o,
      f = s && 34 === o,
      m = 37 === o,
      b = 39 === o,
      c = 38 === o,
      p = 40 === o;
    if (!t.allowSlideNext && (t.isHorizontal() && b || t.isVertical() && p || f)) return !1;
    if (!t.allowSlidePrev && (t.isHorizontal() && m || t.isVertical() && c || d)) return !1;
    if (!(a.shiftKey || a.altKey || a.ctrlKey || a.metaKey || l.activeElement && l.activeElement.nodeName && ("input" === l.activeElement.nodeName.toLowerCase() || "textarea" === l.activeElement.nodeName.toLowerCase()))) {
      if (t.params.keyboard.onlyInViewport && (d || f || m || b || c || p)) {
        let e = !1;
        if ((0, _utilsMin.a)(t.el, `.${t.params.slideClass}, swiper-slide`).length > 0 && 0 === (0, _utilsMin.a)(t.el, `.${t.params.slideActiveClass}`).length) return;
        const a = t.el,
          r = a.clientWidth,
          l = a.clientHeight,
          o = i.innerWidth,
          s = i.innerHeight,
          d = (0, _utilsMin.b)(a);
        n && (d.left -= a.scrollLeft);
        const f = [[d.left, d.top], [d.left + r, d.top], [d.left, d.top + l], [d.left + r, d.top + l]];
        for (let t = 0; t < f.length; t += 1) {
          const n = f[t];
          if (n[0] >= 0 && n[0] <= o && n[1] >= 0 && n[1] <= s) {
            if (0 === n[0] && 0 === n[1]) continue;
            e = !0;
          }
        }
        if (!e) return;
      }
      t.isHorizontal() ? ((d || f || m || b) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), ((f || b) && !n || (d || m) && n) && t.slideNext(), ((d || m) && !n || (f || b) && n) && t.slidePrev()) : ((d || f || c || p) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), (f || p) && t.slideNext(), (d || c) && t.slidePrev()), r("keyPress", o);
    }
  }
  function s() {
    t.keyboard.enabled || (l.addEventListener("keydown", o), t.keyboard.enabled = !0);
  }
  function d() {
    t.keyboard.enabled && (l.removeEventListener("keydown", o), t.keyboard.enabled = !1);
  }
  t.keyboard = {
    enabled: !1
  }, n({
    keyboard: {
      enabled: !1,
      onlyInViewport: !0,
      pageUpDown: !0
    }
  }), a("init", () => {
    t.params.keyboard.enabled && s();
  }), a("destroy", () => {
    t.keyboard.enabled && d();
  }), Object.assign(t.keyboard, {
    enable: s,
    disable: d
  });
}

},{"../shared/ssr-window.esm.min.mjs":33,"../shared/utils.min.mjs":35}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Manipulation;
function appendSlide(e) {
  const l = this,
    {
      params: o,
      slidesEl: i
    } = l;
  o.loop && l.loopDestroy();
  const t = e => {
    if ("string" == typeof e) {
      const l = document.createElement("div");
      l.innerHTML = e, i.append(l.children[0]), l.innerHTML = "";
    } else i.append(e);
  };
  if ("object" == typeof e && "length" in e) for (let l = 0; l < e.length; l += 1) e[l] && t(e[l]);else t(e);
  l.recalcSlides(), o.loop && l.loopCreate(), o.observer && !l.isElement || l.update();
}
function prependSlide(e) {
  const l = this,
    {
      params: o,
      activeIndex: i,
      slidesEl: t
    } = l;
  o.loop && l.loopDestroy();
  let n = i + 1;
  const d = e => {
    if ("string" == typeof e) {
      const l = document.createElement("div");
      l.innerHTML = e, t.prepend(l.children[0]), l.innerHTML = "";
    } else t.prepend(e);
  };
  if ("object" == typeof e && "length" in e) {
    for (let l = 0; l < e.length; l += 1) e[l] && d(e[l]);
    n = i + e.length;
  } else d(e);
  l.recalcSlides(), o.loop && l.loopCreate(), o.observer && !l.isElement || l.update(), l.slideTo(n, 0, !1);
}
function addSlide(e, l) {
  const o = this,
    {
      params: i,
      activeIndex: t,
      slidesEl: n
    } = o;
  let d = t;
  i.loop && (d -= o.loopedSlides, o.loopDestroy(), o.recalcSlides());
  const s = o.slides.length;
  if (e <= 0) return void o.prependSlide(l);
  if (e >= s) return void o.appendSlide(l);
  let p = d > e ? d + 1 : d;
  const r = [];
  for (let l = s - 1; l >= e; l -= 1) {
    const e = o.slides[l];
    e.remove(), r.unshift(e);
  }
  if ("object" == typeof l && "length" in l) {
    for (let e = 0; e < l.length; e += 1) l[e] && n.append(l[e]);
    p = d > e ? d + l.length : d;
  } else n.append(l);
  for (let e = 0; e < r.length; e += 1) n.append(r[e]);
  o.recalcSlides(), i.loop && o.loopCreate(), i.observer && !o.isElement || o.update(), i.loop ? o.slideTo(p + o.loopedSlides, 0, !1) : o.slideTo(p, 0, !1);
}
function removeSlide(e) {
  const l = this,
    {
      params: o,
      activeIndex: i
    } = l;
  let t = i;
  o.loop && (t -= l.loopedSlides, l.loopDestroy());
  let n,
    d = t;
  if ("object" == typeof e && "length" in e) {
    for (let o = 0; o < e.length; o += 1) n = e[o], l.slides[n] && l.slides[n].remove(), n < d && (d -= 1);
    d = Math.max(d, 0);
  } else n = e, l.slides[n] && l.slides[n].remove(), n < d && (d -= 1), d = Math.max(d, 0);
  l.recalcSlides(), o.loop && l.loopCreate(), o.observer && !l.isElement || l.update(), o.loop ? l.slideTo(d + l.loopedSlides, 0, !1) : l.slideTo(d, 0, !1);
}
function removeAllSlides() {
  const e = this,
    l = [];
  for (let o = 0; o < e.slides.length; o += 1) l.push(o);
  e.removeSlide(l);
}
function Manipulation(e) {
  let {
    swiper: l
  } = e;
  Object.assign(l, {
    appendSlide: appendSlide.bind(l),
    prependSlide: prependSlide.bind(l),
    addSlide: addSlide.bind(l),
    removeSlide: removeSlide.bind(l),
    removeAllSlides: removeAllSlides.bind(l)
  });
}

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Mousewheel;
var _ssrWindowEsmMin = require("../shared/ssr-window.esm.min.mjs");
var _utilsMin = require("../shared/utils.min.mjs");
function Mousewheel(e) {
  let {
    swiper: t,
    extendParams: a,
    on: s,
    emit: n
  } = e;
  const l = (0, _ssrWindowEsmMin.a)();
  let i;
  a({
    mousewheel: {
      enabled: !1,
      releaseOnEdges: !1,
      invert: !1,
      forceToAxis: !1,
      sensitivity: 1,
      eventsTarget: "container",
      thresholdDelta: null,
      thresholdTime: null,
      noMousewheelClass: "swiper-no-mousewheel"
    }
  }), t.mousewheel = {
    enabled: !1
  };
  let r,
    o = (0, _utilsMin.d)();
  const d = [];
  function m() {
    t.enabled && (t.mouseEntered = !0);
  }
  function p() {
    t.enabled && (t.mouseEntered = !1);
  }
  function u(e) {
    return !(t.params.mousewheel.thresholdDelta && e.delta < t.params.mousewheel.thresholdDelta) && !(t.params.mousewheel.thresholdTime && (0, _utilsMin.d)() - o < t.params.mousewheel.thresholdTime) && (e.delta >= 6 && (0, _utilsMin.d)() - o < 60 || (e.direction < 0 ? t.isEnd && !t.params.loop || t.animating || (t.slideNext(), n("scroll", e.raw)) : t.isBeginning && !t.params.loop || t.animating || (t.slidePrev(), n("scroll", e.raw)), o = new l.Date().getTime(), !1));
  }
  function h(e) {
    let a = e,
      s = !0;
    if (!t.enabled) return;
    if (e.target.closest(`.${t.params.mousewheel.noMousewheelClass}`)) return;
    const l = t.params.mousewheel;
    t.params.cssMode && a.preventDefault();
    let o = t.el;
    "container" !== t.params.mousewheel.eventsTarget && (o = document.querySelector(t.params.mousewheel.eventsTarget));
    const m = o && o.contains(a.target);
    if (!t.mouseEntered && !m && !l.releaseOnEdges) return !0;
    a.originalEvent && (a = a.originalEvent);
    let p = 0;
    const h = t.rtlTranslate ? -1 : 1,
      c = function (e) {
        let t = 0,
          a = 0,
          s = 0,
          n = 0;
        return "detail" in e && (a = e.detail), "wheelDelta" in e && (a = -e.wheelDelta / 120), "wheelDeltaY" in e && (a = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = a, a = 0), s = 10 * t, n = 10 * a, "deltaY" in e && (n = e.deltaY), "deltaX" in e && (s = e.deltaX), e.shiftKey && !s && (s = n, n = 0), (s || n) && e.deltaMode && (1 === e.deltaMode ? (s *= 40, n *= 40) : (s *= 800, n *= 800)), s && !t && (t = s < 1 ? -1 : 1), n && !a && (a = n < 1 ? -1 : 1), {
          spinX: t,
          spinY: a,
          pixelX: s,
          pixelY: n
        };
      }(a);
    if (l.forceToAxis) {
      if (t.isHorizontal()) {
        if (!(Math.abs(c.pixelX) > Math.abs(c.pixelY))) return !0;
        p = -c.pixelX * h;
      } else {
        if (!(Math.abs(c.pixelY) > Math.abs(c.pixelX))) return !0;
        p = -c.pixelY;
      }
    } else p = Math.abs(c.pixelX) > Math.abs(c.pixelY) ? -c.pixelX * h : -c.pixelY;
    if (0 === p) return !0;
    l.invert && (p = -p);
    let w = t.getTranslate() + p * l.sensitivity;
    if (w >= t.minTranslate() && (w = t.minTranslate()), w <= t.maxTranslate() && (w = t.maxTranslate()), s = !!t.params.loop || !(w === t.minTranslate() || w === t.maxTranslate()), s && t.params.nested && a.stopPropagation(), t.params.freeMode && t.params.freeMode.enabled) {
      const e = {
          time: (0, _utilsMin.d)(),
          delta: Math.abs(p),
          direction: Math.sign(p)
        },
        s = r && e.time < r.time + 500 && e.delta <= r.delta && e.direction === r.direction;
      if (!s) {
        r = void 0;
        let o = t.getTranslate() + p * l.sensitivity;
        const m = t.isBeginning,
          u = t.isEnd;
        if (o >= t.minTranslate() && (o = t.minTranslate()), o <= t.maxTranslate() && (o = t.maxTranslate()), t.setTransition(0), t.setTranslate(o), t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses(), (!m && t.isBeginning || !u && t.isEnd) && t.updateSlidesClasses(), t.params.loop && t.loopFix({
          direction: e.direction < 0 ? "next" : "prev",
          byMousewheel: !0
        }), t.params.freeMode.sticky) {
          clearTimeout(i), i = void 0, d.length >= 15 && d.shift();
          const a = d.length ? d[d.length - 1] : void 0,
            s = d[0];
          if (d.push(e), a && (e.delta > a.delta || e.direction !== a.direction)) d.splice(0);else if (d.length >= 15 && e.time - s.time < 500 && s.delta - e.delta >= 1 && e.delta <= 6) {
            const a = p > 0 ? .8 : .2;
            r = e, d.splice(0), i = (0, _utilsMin.n)(() => {
              t.slideToClosest(t.params.speed, !0, void 0, a);
            }, 0);
          }
          i || (i = (0, _utilsMin.n)(() => {
            r = e, d.splice(0), t.slideToClosest(t.params.speed, !0, void 0, .5);
          }, 500));
        }
        if (s || n("scroll", a), t.params.autoplay && t.params.autoplayDisableOnInteraction && t.autoplay.stop(), l.releaseOnEdges && (o === t.minTranslate() || o === t.maxTranslate())) return !0;
      }
    } else {
      const a = {
        time: (0, _utilsMin.d)(),
        delta: Math.abs(p),
        direction: Math.sign(p),
        raw: e
      };
      d.length >= 2 && d.shift();
      const s = d.length ? d[d.length - 1] : void 0;
      if (d.push(a), s ? (a.direction !== s.direction || a.delta > s.delta || a.time > s.time + 150) && u(a) : u(a), function (e) {
        const a = t.params.mousewheel;
        if (e.direction < 0) {
          if (t.isEnd && !t.params.loop && a.releaseOnEdges) return !0;
        } else if (t.isBeginning && !t.params.loop && a.releaseOnEdges) return !0;
        return !1;
      }(a)) return !0;
    }
    return a.preventDefault ? a.preventDefault() : a.returnValue = !1, !1;
  }
  function c(e) {
    let a = t.el;
    "container" !== t.params.mousewheel.eventsTarget && (a = document.querySelector(t.params.mousewheel.eventsTarget)), a[e]("mouseenter", m), a[e]("mouseleave", p), a[e]("wheel", h);
  }
  function w() {
    return t.params.cssMode ? (t.wrapperEl.removeEventListener("wheel", h), !0) : !t.mousewheel.enabled && (c("addEventListener"), t.mousewheel.enabled = !0, !0);
  }
  function f() {
    return t.params.cssMode ? (t.wrapperEl.addEventListener(event, h), !0) : !!t.mousewheel.enabled && (c("removeEventListener"), t.mousewheel.enabled = !1, !0);
  }
  s("init", () => {
    !t.params.mousewheel.enabled && t.params.cssMode && f(), t.params.mousewheel.enabled && w();
  }), s("destroy", () => {
    t.params.cssMode && w(), t.mousewheel.enabled && f();
  }), Object.assign(t.mousewheel, {
    enable: w,
    disable: f
  });
}

},{"../shared/ssr-window.esm.min.mjs":33,"../shared/utils.min.mjs":35}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Navigation;
var _createElementIfNotDefinedMin = require("../shared/create-element-if-not-defined.min.mjs");
function Navigation(a) {
  let {
    swiper: n,
    extendParams: e,
    on: i,
    emit: t
  } = a;
  e({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: !1,
      disabledClass: "swiper-button-disabled",
      hiddenClass: "swiper-button-hidden",
      lockClass: "swiper-button-lock",
      navigationDisabledClass: "swiper-navigation-disabled"
    }
  }), n.navigation = {
    nextEl: null,
    prevEl: null
  };
  const s = a => (Array.isArray(a) ? a : [a]).filter(a => !!a);
  function l(a) {
    let e;
    return a && "string" == typeof a && n.isElement && (e = n.el.querySelector(a), e) ? e : (a && ("string" == typeof a && (e = [...document.querySelectorAll(a)]), n.params.uniqueNavElements && "string" == typeof a && e.length > 1 && 1 === n.el.querySelectorAll(a).length && (e = n.el.querySelector(a))), a && !e ? a : e);
  }
  function o(a, e) {
    const i = n.params.navigation;
    (a = s(a)).forEach(a => {
      a && (a.classList[e ? "add" : "remove"](...i.disabledClass.split(" ")), "BUTTON" === a.tagName && (a.disabled = e), n.params.watchOverflow && n.enabled && a.classList[n.isLocked ? "add" : "remove"](i.lockClass));
    });
  }
  function r() {
    const {
      nextEl: a,
      prevEl: e
    } = n.navigation;
    if (n.params.loop) return o(e, !1), void o(a, !1);
    o(e, n.isBeginning && !n.params.rewind), o(a, n.isEnd && !n.params.rewind);
  }
  function d(a) {
    a.preventDefault(), (!n.isBeginning || n.params.loop || n.params.rewind) && (n.slidePrev(), t("navigationPrev"));
  }
  function c(a) {
    a.preventDefault(), (!n.isEnd || n.params.loop || n.params.rewind) && (n.slideNext(), t("navigationNext"));
  }
  function p() {
    const a = n.params.navigation;
    if (n.params.navigation = (0, _createElementIfNotDefinedMin.c)(n, n.originalParams.navigation, n.params.navigation, {
      nextEl: "swiper-button-next",
      prevEl: "swiper-button-prev"
    }), !a.nextEl && !a.prevEl) return;
    let e = l(a.nextEl),
      i = l(a.prevEl);
    Object.assign(n.navigation, {
      nextEl: e,
      prevEl: i
    }), e = s(e), i = s(i);
    const t = (e, i) => {
      e && e.addEventListener("click", "next" === i ? c : d), !n.enabled && e && e.classList.add(...a.lockClass.split(" "));
    };
    e.forEach(a => t(a, "next")), i.forEach(a => t(a, "prev"));
  }
  function v() {
    let {
      nextEl: a,
      prevEl: e
    } = n.navigation;
    a = s(a), e = s(e);
    const i = (a, e) => {
      a.removeEventListener("click", "next" === e ? c : d), a.classList.remove(...n.params.navigation.disabledClass.split(" "));
    };
    a.forEach(a => i(a, "next")), e.forEach(a => i(a, "prev"));
  }
  i("init", () => {
    !1 === n.params.navigation.enabled ? g() : (p(), r());
  }), i("toEdge fromEdge lock unlock", () => {
    r();
  }), i("destroy", () => {
    v();
  }), i("enable disable", () => {
    let {
      nextEl: a,
      prevEl: e
    } = n.navigation;
    a = s(a), e = s(e), [...a, ...e].filter(a => !!a).forEach(a => a.classList[n.enabled ? "remove" : "add"](n.params.navigation.lockClass));
  }), i("click", (a, e) => {
    let {
      nextEl: i,
      prevEl: l
    } = n.navigation;
    i = s(i), l = s(l);
    const o = e.target;
    if (n.params.navigation.hideOnClick && !l.includes(o) && !i.includes(o)) {
      if (n.pagination && n.params.pagination && n.params.pagination.clickable && (n.pagination.el === o || n.pagination.el.contains(o))) return;
      let a;
      i.length ? a = i[0].classList.contains(n.params.navigation.hiddenClass) : l.length && (a = l[0].classList.contains(n.params.navigation.hiddenClass)), t(!0 === a ? "navigationShow" : "navigationHide"), [...i, ...l].filter(a => !!a).forEach(a => a.classList.toggle(n.params.navigation.hiddenClass));
    }
  });
  const g = () => {
    n.el.classList.add(...n.params.navigation.navigationDisabledClass.split(" ")), v();
  };
  Object.assign(n.navigation, {
    enable: () => {
      n.el.classList.remove(...n.params.navigation.navigationDisabledClass.split(" ")), p(), r();
    },
    disable: g,
    update: r,
    init: p,
    destroy: v
  });
}

},{"../shared/create-element-if-not-defined.min.mjs":28}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Pagination;
var _classesToSelectorMin = require("../shared/classes-to-selector.min.mjs");
var _createElementIfNotDefinedMin = require("../shared/create-element-if-not-defined.min.mjs");
var _utilsMin = require("../shared/utils.min.mjs");
function Pagination(e) {
  let {
    swiper: a,
    extendParams: l,
    on: s,
    emit: t
  } = e;
  const i = "swiper-pagination";
  let n;
  l({
    pagination: {
      el: null,
      bulletElement: "span",
      clickable: !1,
      hideOnClick: !1,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: !1,
      type: "bullets",
      dynamicBullets: !1,
      dynamicMainBullets: 1,
      formatFractionCurrent: e => e,
      formatFractionTotal: e => e,
      bulletClass: `${i}-bullet`,
      bulletActiveClass: `${i}-bullet-active`,
      modifierClass: `${i}-`,
      currentClass: `${i}-current`,
      totalClass: `${i}-total`,
      hiddenClass: `${i}-hidden`,
      progressbarFillClass: `${i}-progressbar-fill`,
      progressbarOppositeClass: `${i}-progressbar-opposite`,
      clickableClass: `${i}-clickable`,
      lockClass: `${i}-lock`,
      horizontalClass: `${i}-horizontal`,
      verticalClass: `${i}-vertical`,
      paginationDisabledClass: `${i}-disabled`
    }
  }), a.pagination = {
    el: null,
    bullets: []
  };
  let r = 0;
  const o = e => (Array.isArray(e) ? e : [e]).filter(e => !!e);
  function p() {
    return !a.params.pagination.el || !a.pagination.el || Array.isArray(a.pagination.el) && 0 === a.pagination.el.length;
  }
  function c(e, l) {
    const {
      bulletActiveClass: s
    } = a.params.pagination;
    e && (e = e[("prev" === l ? "previous" : "next") + "ElementSibling"]) && (e.classList.add(`${s}-${l}`), (e = e[("prev" === l ? "previous" : "next") + "ElementSibling"]) && e.classList.add(`${s}-${l}-${l}`));
  }
  function d(e) {
    const l = e.target.closest((0, _classesToSelectorMin.c)(a.params.pagination.bulletClass));
    if (!l) return;
    e.preventDefault();
    const s = (0, _utilsMin.g)(l) * a.params.slidesPerGroup;
    if (a.params.loop) {
      if (a.realIndex === s) return;
      const e = a.getSlideIndexByData(s),
        l = a.getSlideIndexByData(a.realIndex);
      e > a.slides.length - a.loopedSlides && a.loopFix({
        direction: e > l ? "next" : "prev",
        activeSlideIndex: e,
        slideTo: !1
      }), a.slideToLoop(s);
    } else a.slideTo(s);
  }
  function u() {
    const e = a.rtl,
      l = a.params.pagination;
    if (p()) return;
    let s,
      i,
      d = a.pagination.el;
    d = o(d);
    const u = a.virtual && a.params.virtual.enabled ? a.virtual.slides.length : a.slides.length,
      g = a.params.loop ? Math.ceil(u / a.params.slidesPerGroup) : a.snapGrid.length;
    if (a.params.loop ? (i = a.previousRealIndex || 0, s = a.params.slidesPerGroup > 1 ? Math.floor(a.realIndex / a.params.slidesPerGroup) : a.realIndex) : void 0 !== a.snapIndex ? (s = a.snapIndex, i = a.previousSnapIndex) : (i = a.previousIndex || 0, s = a.activeIndex || 0), "bullets" === l.type && a.pagination.bullets && a.pagination.bullets.length > 0) {
      const t = a.pagination.bullets;
      let o, p, u;
      if (l.dynamicBullets && (n = (0, _utilsMin.f)(t[0], a.isHorizontal() ? "width" : "height", !0), d.forEach(e => {
        e.style[a.isHorizontal() ? "width" : "height"] = n * (l.dynamicMainBullets + 4) + "px";
      }), l.dynamicMainBullets > 1 && void 0 !== i && (r += s - (i || 0), r > l.dynamicMainBullets - 1 ? r = l.dynamicMainBullets - 1 : r < 0 && (r = 0)), o = Math.max(s - r, 0), p = o + (Math.min(t.length, l.dynamicMainBullets) - 1), u = (p + o) / 2), t.forEach(e => {
        const a = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map(e => `${l.bulletActiveClass}${e}`)].map(e => "string" == typeof e && e.includes(" ") ? e.split(" ") : e).flat();
        e.classList.remove(...a);
      }), d.length > 1) t.forEach(e => {
        const t = (0, _utilsMin.g)(e);
        t === s ? e.classList.add(...l.bulletActiveClass.split(" ")) : a.isElement && e.setAttribute("part", "bullet"), l.dynamicBullets && (t >= o && t <= p && e.classList.add(...`${l.bulletActiveClass}-main`.split(" ")), t === o && c(e, "prev"), t === p && c(e, "next"));
      });else {
        const e = t[s];
        if (e && e.classList.add(...l.bulletActiveClass.split(" ")), a.isElement && t.forEach((e, a) => {
          e.setAttribute("part", a === s ? "bullet-active" : "bullet");
        }), l.dynamicBullets) {
          const e = t[o],
            a = t[p];
          for (let e = o; e <= p; e += 1) t[e] && t[e].classList.add(...`${l.bulletActiveClass}-main`.split(" "));
          c(e, "prev"), c(a, "next");
        }
      }
      if (l.dynamicBullets) {
        const s = Math.min(t.length, l.dynamicMainBullets + 4),
          i = (n * s - n) / 2 - u * n,
          r = e ? "right" : "left";
        t.forEach(e => {
          e.style[a.isHorizontal() ? r : "top"] = `${i}px`;
        });
      }
    }
    d.forEach((e, i) => {
      if ("fraction" === l.type && (e.querySelectorAll((0, _classesToSelectorMin.c)(l.currentClass)).forEach(e => {
        e.textContent = l.formatFractionCurrent(s + 1);
      }), e.querySelectorAll((0, _classesToSelectorMin.c)(l.totalClass)).forEach(e => {
        e.textContent = l.formatFractionTotal(g);
      })), "progressbar" === l.type) {
        let t;
        t = l.progressbarOpposite ? a.isHorizontal() ? "vertical" : "horizontal" : a.isHorizontal() ? "horizontal" : "vertical";
        const i = (s + 1) / g;
        let n = 1,
          r = 1;
        "horizontal" === t ? n = i : r = i, e.querySelectorAll((0, _classesToSelectorMin.c)(l.progressbarFillClass)).forEach(e => {
          e.style.transform = `translate3d(0,0,0) scaleX(${n}) scaleY(${r})`, e.style.transitionDuration = `${a.params.speed}ms`;
        });
      }
      "custom" === l.type && l.renderCustom ? (e.innerHTML = l.renderCustom(a, s + 1, g), 0 === i && t("paginationRender", e)) : (0 === i && t("paginationRender", e), t("paginationUpdate", e)), a.params.watchOverflow && a.enabled && e.classList[a.isLocked ? "add" : "remove"](l.lockClass);
    });
  }
  function g() {
    const e = a.params.pagination;
    if (p()) return;
    const l = a.virtual && a.params.virtual.enabled ? a.virtual.slides.length : a.slides.length;
    let s = a.pagination.el;
    s = o(s);
    let i = "";
    if ("bullets" === e.type) {
      let s = a.params.loop ? Math.ceil(l / a.params.slidesPerGroup) : a.snapGrid.length;
      a.params.freeMode && a.params.freeMode.enabled && s > l && (s = l);
      for (let l = 0; l < s; l += 1) e.renderBullet ? i += e.renderBullet.call(a, l, e.bulletClass) : i += `<${e.bulletElement} ${a.isElement ? 'part="bullet"' : ""} class="${e.bulletClass}"></${e.bulletElement}>`;
    }
    "fraction" === e.type && (i = e.renderFraction ? e.renderFraction.call(a, e.currentClass, e.totalClass) : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`), "progressbar" === e.type && (i = e.renderProgressbar ? e.renderProgressbar.call(a, e.progressbarFillClass) : `<span class="${e.progressbarFillClass}"></span>`), a.pagination.bullets = [], s.forEach(l => {
      "custom" !== e.type && (l.innerHTML = i || ""), "bullets" === e.type && a.pagination.bullets.push(...l.querySelectorAll((0, _classesToSelectorMin.c)(e.bulletClass)));
    }), "custom" !== e.type && t("paginationRender", s[0]);
  }
  function m() {
    a.params.pagination = (0, _createElementIfNotDefinedMin.c)(a, a.originalParams.pagination, a.params.pagination, {
      el: "swiper-pagination"
    });
    const e = a.params.pagination;
    if (!e.el) return;
    let l;
    "string" == typeof e.el && a.isElement && (l = a.el.querySelector(e.el)), l || "string" != typeof e.el || (l = [...document.querySelectorAll(e.el)]), l || (l = e.el), l && 0 !== l.length && (a.params.uniqueNavElements && "string" == typeof e.el && Array.isArray(l) && l.length > 1 && (l = [...a.el.querySelectorAll(e.el)], l.length > 1 && (l = l.filter(e => (0, _utilsMin.a)(e, ".swiper")[0] === a.el)[0])), Array.isArray(l) && 1 === l.length && (l = l[0]), Object.assign(a.pagination, {
      el: l
    }), l = o(l), l.forEach(l => {
      "bullets" === e.type && e.clickable && l.classList.add(e.clickableClass), l.classList.add(e.modifierClass + e.type), l.classList.add(a.isHorizontal() ? e.horizontalClass : e.verticalClass), "bullets" === e.type && e.dynamicBullets && (l.classList.add(`${e.modifierClass}${e.type}-dynamic`), r = 0, e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)), "progressbar" === e.type && e.progressbarOpposite && l.classList.add(e.progressbarOppositeClass), e.clickable && l.addEventListener("click", d), a.enabled || l.classList.add(e.lockClass);
    }));
  }
  function b() {
    const e = a.params.pagination;
    if (p()) return;
    let l = a.pagination.el;
    l && (l = o(l), l.forEach(l => {
      l.classList.remove(e.hiddenClass), l.classList.remove(e.modifierClass + e.type), l.classList.remove(a.isHorizontal() ? e.horizontalClass : e.verticalClass), e.clickable && l.removeEventListener("click", d);
    })), a.pagination.bullets && a.pagination.bullets.forEach(a => a.classList.remove(...e.bulletActiveClass.split(" ")));
  }
  s("changeDirection", () => {
    if (!a.pagination || !a.pagination.el) return;
    const e = a.params.pagination;
    let {
      el: l
    } = a.pagination;
    l = o(l), l.forEach(l => {
      l.classList.remove(e.horizontalClass, e.verticalClass), l.classList.add(a.isHorizontal() ? e.horizontalClass : e.verticalClass);
    });
  }), s("init", () => {
    !1 === a.params.pagination.enabled ? f() : (m(), g(), u());
  }), s("activeIndexChange", () => {
    void 0 === a.snapIndex && u();
  }), s("snapIndexChange", () => {
    u();
  }), s("snapGridLengthChange", () => {
    g(), u();
  }), s("destroy", () => {
    b();
  }), s("enable disable", () => {
    let {
      el: e
    } = a.pagination;
    e && (e = o(e), e.forEach(e => e.classList[a.enabled ? "remove" : "add"](a.params.pagination.lockClass)));
  }), s("lock unlock", () => {
    u();
  }), s("click", (e, l) => {
    const s = l.target,
      i = o(a.pagination.el);
    if (a.params.pagination.el && a.params.pagination.hideOnClick && i && i.length > 0 && !s.classList.contains(a.params.pagination.bulletClass)) {
      if (a.navigation && (a.navigation.nextEl && s === a.navigation.nextEl || a.navigation.prevEl && s === a.navigation.prevEl)) return;
      const e = i[0].classList.contains(a.params.pagination.hiddenClass);
      t(!0 === e ? "paginationShow" : "paginationHide"), i.forEach(e => e.classList.toggle(a.params.pagination.hiddenClass));
    }
  });
  const f = () => {
    a.el.classList.add(a.params.pagination.paginationDisabledClass);
    let {
      el: e
    } = a.pagination;
    e && (e = o(e), e.forEach(e => e.classList.add(a.params.pagination.paginationDisabledClass))), b();
  };
  Object.assign(a.pagination, {
    enable: () => {
      a.el.classList.remove(a.params.pagination.paginationDisabledClass);
      let {
        el: e
      } = a.pagination;
      e && (e = o(e), e.forEach(e => e.classList.remove(a.params.pagination.paginationDisabledClass))), m(), g(), u();
    },
    disable: f,
    render: g,
    update: u,
    init: m,
    destroy: b
  });
}

},{"../shared/classes-to-selector.min.mjs":27,"../shared/create-element-if-not-defined.min.mjs":28,"../shared/utils.min.mjs":35}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Parallax;
var _utilsMin = require("../shared/utils.min.mjs");
function Parallax(a) {
  let {
    swiper: r,
    extendParams: e,
    on: t
  } = a;
  e({
    parallax: {
      enabled: !1
    }
  });
  const l = (a, e) => {
      const {
          rtl: t
        } = r,
        l = t ? -1 : 1,
        s = a.getAttribute("data-swiper-parallax") || "0";
      let p = a.getAttribute("data-swiper-parallax-x"),
        i = a.getAttribute("data-swiper-parallax-y");
      const d = a.getAttribute("data-swiper-parallax-scale"),
        n = a.getAttribute("data-swiper-parallax-opacity"),
        o = a.getAttribute("data-swiper-parallax-rotate");
      if (p || i ? (p = p || "0", i = i || "0") : r.isHorizontal() ? (p = s, i = "0") : (i = s, p = "0"), p = p.indexOf("%") >= 0 ? parseInt(p, 10) * e * l + "%" : p * e * l + "px", i = i.indexOf("%") >= 0 ? parseInt(i, 10) * e + "%" : i * e + "px", null != n) {
        const r = n - (n - 1) * (1 - Math.abs(e));
        a.style.opacity = r;
      }
      let x = `translate3d(${p}, ${i}, 0px)`;
      if (null != d) {
        x += ` scale(${d - (d - 1) * (1 - Math.abs(e))})`;
      }
      if (o && null != o) {
        x += ` rotate(${o * e * -1}deg)`;
      }
      a.style.transform = x;
    },
    s = () => {
      const {
        el: a,
        slides: e,
        progress: t,
        snapGrid: s
      } = r;
      (0, _utilsMin.e)(a, "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").forEach(a => {
        l(a, t);
      }), e.forEach((a, e) => {
        let p = a.progress;
        r.params.slidesPerGroup > 1 && "auto" !== r.params.slidesPerView && (p += Math.ceil(e / 2) - t * (s.length - 1)), p = Math.min(Math.max(p, -1), 1), a.querySelectorAll("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale], [data-swiper-parallax-rotate]").forEach(a => {
          l(a, p);
        });
      });
    };
  t("beforeInit", () => {
    r.params.parallax.enabled && (r.params.watchSlidesProgress = !0, r.originalParams.watchSlidesProgress = !0);
  }), t("init", () => {
    r.params.parallax.enabled && s();
  }), t("setTranslate", () => {
    r.params.parallax.enabled && s();
  }), t("setTransition", (a, e) => {
    r.params.parallax.enabled && function (a) {
      void 0 === a && (a = r.params.speed);
      const {
        el: e
      } = r;
      e.querySelectorAll("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").forEach(r => {
        let e = parseInt(r.getAttribute("data-swiper-parallax-duration"), 10) || a;
        0 === a && (e = 0), r.style.transitionDuration = `${e}ms`;
      });
    }(e);
  });
}

},{"../shared/utils.min.mjs":35}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Scrollbar;
var _ssrWindowEsmMin = require("../shared/ssr-window.esm.min.mjs");
var _utilsMin = require("../shared/utils.min.mjs");
var _createElementIfNotDefinedMin = require("../shared/create-element-if-not-defined.min.mjs");
function Scrollbar(l) {
  let {
    swiper: s,
    extendParams: r,
    on: a,
    emit: e
  } = l;
  const t = (0, _ssrWindowEsmMin.g)();
  let o,
    n,
    i,
    c,
    p = !1,
    d = null,
    m = null;
  function b() {
    if (!s.params.scrollbar.el || !s.scrollbar.el) return;
    const {
        scrollbar: l,
        rtlTranslate: r
      } = s,
      {
        dragEl: a,
        el: e
      } = l,
      t = s.params.scrollbar,
      o = s.params.loop ? s.progressLoop : s.progress;
    let c = n,
      p = (i - n) * o;
    r ? (p = -p, p > 0 ? (c = n - p, p = 0) : -p + n > i && (c = i + p)) : p < 0 ? (c = n + p, p = 0) : p + n > i && (c = i - p), s.isHorizontal() ? (a.style.transform = `translate3d(${p}px, 0, 0)`, a.style.width = `${c}px`) : (a.style.transform = `translate3d(0px, ${p}px, 0)`, a.style.height = `${c}px`), t.hide && (clearTimeout(d), e.style.opacity = 1, d = setTimeout(() => {
      e.style.opacity = 0, e.style.transitionDuration = "400ms";
    }, 1e3));
  }
  function u() {
    if (!s.params.scrollbar.el || !s.scrollbar.el) return;
    const {
        scrollbar: l
      } = s,
      {
        dragEl: r,
        el: a
      } = l;
    r.style.width = "", r.style.height = "", i = s.isHorizontal() ? a.offsetWidth : a.offsetHeight, c = s.size / (s.virtualSize + s.params.slidesOffsetBefore - (s.params.centeredSlides ? s.snapGrid[0] : 0)), n = "auto" === s.params.scrollbar.dragSize ? i * c : parseInt(s.params.scrollbar.dragSize, 10), s.isHorizontal() ? r.style.width = `${n}px` : r.style.height = `${n}px`, a.style.display = c >= 1 ? "none" : "", s.params.scrollbar.hide && (a.style.opacity = 0), s.params.watchOverflow && s.enabled && l.el.classList[s.isLocked ? "add" : "remove"](s.params.scrollbar.lockClass);
  }
  function f(l) {
    return s.isHorizontal() ? l.clientX : l.clientY;
  }
  function g(l) {
    const {
        scrollbar: r,
        rtlTranslate: a
      } = s,
      {
        el: e
      } = r;
    let t;
    t = (f(l) - (0, _utilsMin.b)(e)[s.isHorizontal() ? "left" : "top"] - (null !== o ? o : n / 2)) / (i - n), t = Math.max(Math.min(t, 1), 0), a && (t = 1 - t);
    const c = s.minTranslate() + (s.maxTranslate() - s.minTranslate()) * t;
    s.updateProgress(c), s.setTranslate(c), s.updateActiveIndex(), s.updateSlidesClasses();
  }
  function y(l) {
    const r = s.params.scrollbar,
      {
        scrollbar: a,
        wrapperEl: t
      } = s,
      {
        el: n,
        dragEl: i
      } = a;
    p = !0, o = l.target === i ? f(l) - l.target.getBoundingClientRect()[s.isHorizontal() ? "left" : "top"] : null, l.preventDefault(), l.stopPropagation(), t.style.transitionDuration = "100ms", i.style.transitionDuration = "100ms", g(l), clearTimeout(m), n.style.transitionDuration = "0ms", r.hide && (n.style.opacity = 1), s.params.cssMode && (s.wrapperEl.style["scroll-snap-type"] = "none"), e("scrollbarDragStart", l);
  }
  function h(l) {
    const {
        scrollbar: r,
        wrapperEl: a
      } = s,
      {
        el: t,
        dragEl: o
      } = r;
    p && (l.preventDefault ? l.preventDefault() : l.returnValue = !1, g(l), a.style.transitionDuration = "0ms", t.style.transitionDuration = "0ms", o.style.transitionDuration = "0ms", e("scrollbarDragMove", l));
  }
  function v(l) {
    const r = s.params.scrollbar,
      {
        scrollbar: a,
        wrapperEl: t
      } = s,
      {
        el: o
      } = a;
    p && (p = !1, s.params.cssMode && (s.wrapperEl.style["scroll-snap-type"] = "", t.style.transitionDuration = ""), r.hide && (clearTimeout(m), m = (0, _utilsMin.n)(() => {
      o.style.opacity = 0, o.style.transitionDuration = "400ms";
    }, 1e3)), e("scrollbarDragEnd", l), r.snapOnRelease && s.slideToClosest());
  }
  function D(l) {
    const {
        scrollbar: r,
        params: a
      } = s,
      e = r.el;
    if (!e) return;
    const o = e,
      n = !!a.passiveListeners && {
        passive: !1,
        capture: !1
      },
      i = !!a.passiveListeners && {
        passive: !0,
        capture: !1
      };
    if (!o) return;
    const c = "on" === l ? "addEventListener" : "removeEventListener";
    o[c]("pointerdown", y, n), t[c]("pointermove", h, n), t[c]("pointerup", v, i);
  }
  function C() {
    const {
      scrollbar: l,
      el: r
    } = s;
    s.params.scrollbar = (0, _createElementIfNotDefinedMin.c)(s, s.originalParams.scrollbar, s.params.scrollbar, {
      el: "swiper-scrollbar"
    });
    const a = s.params.scrollbar;
    if (!a.el) return;
    let e, o;
    "string" == typeof a.el && s.isElement && (e = s.el.querySelector(a.el)), e || "string" != typeof a.el ? e || (e = a.el) : e = t.querySelectorAll(a.el), s.params.uniqueNavElements && "string" == typeof a.el && e.length > 1 && 1 === r.querySelectorAll(a.el).length && (e = r.querySelector(a.el)), e.length > 0 && (e = e[0]), e.classList.add(s.isHorizontal() ? a.horizontalClass : a.verticalClass), e && (o = e.querySelector(`.${s.params.scrollbar.dragClass}`), o || (o = (0, _utilsMin.c)("div", s.params.scrollbar.dragClass), e.append(o))), Object.assign(l, {
      el: e,
      dragEl: o
    }), a.draggable && s.params.scrollbar.el && s.scrollbar.el && D("on"), e && e.classList[s.enabled ? "remove" : "add"](s.params.scrollbar.lockClass);
  }
  function E() {
    const l = s.params.scrollbar,
      r = s.scrollbar.el;
    r && r.classList.remove(s.isHorizontal() ? l.horizontalClass : l.verticalClass), s.params.scrollbar.el && s.scrollbar.el && D("off");
  }
  r({
    scrollbar: {
      el: null,
      dragSize: "auto",
      hide: !1,
      draggable: !1,
      snapOnRelease: !0,
      lockClass: "swiper-scrollbar-lock",
      dragClass: "swiper-scrollbar-drag",
      scrollbarDisabledClass: "swiper-scrollbar-disabled",
      horizontalClass: "swiper-scrollbar-horizontal",
      verticalClass: "swiper-scrollbar-vertical"
    }
  }), s.scrollbar = {
    el: null,
    dragEl: null
  }, a("init", () => {
    !1 === s.params.scrollbar.enabled ? w() : (C(), u(), b());
  }), a("update resize observerUpdate lock unlock", () => {
    u();
  }), a("setTranslate", () => {
    b();
  }), a("setTransition", (l, r) => {
    !function (l) {
      s.params.scrollbar.el && s.scrollbar.el && (s.scrollbar.dragEl.style.transitionDuration = `${l}ms`);
    }(r);
  }), a("enable disable", () => {
    const {
      el: l
    } = s.scrollbar;
    l && l.classList[s.enabled ? "remove" : "add"](s.params.scrollbar.lockClass);
  }), a("destroy", () => {
    E();
  });
  const w = () => {
    s.el.classList.add(s.params.scrollbar.scrollbarDisabledClass), s.scrollbar.el && s.scrollbar.el.classList.add(s.params.scrollbar.scrollbarDisabledClass), E();
  };
  Object.assign(s.scrollbar, {
    enable: () => {
      s.el.classList.remove(s.params.scrollbar.scrollbarDisabledClass), s.scrollbar.el && s.scrollbar.el.classList.remove(s.params.scrollbar.scrollbarDisabledClass), C(), u(), b();
    },
    disable: w,
    updateSize: u,
    setTranslate: b,
    init: C,
    destroy: E
  });
}

},{"../shared/create-element-if-not-defined.min.mjs":28,"../shared/ssr-window.esm.min.mjs":33,"../shared/utils.min.mjs":35}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Thumb;
var _ssrWindowEsmMin = require("../shared/ssr-window.esm.min.mjs");
var _utilsMin = require("../shared/utils.min.mjs");
function Thumb(e) {
  let {
    swiper: s,
    extendParams: i,
    on: t
  } = e;
  i({
    thumbs: {
      swiper: null,
      multipleActiveThumbs: !0,
      autoScrollOffset: 0,
      slideThumbActiveClass: "swiper-slide-thumb-active",
      thumbsContainerClass: "swiper-thumbs"
    }
  });
  let r = !1,
    a = !1;
  function l() {
    const e = s.thumbs.swiper;
    if (!e || e.destroyed) return;
    const i = e.clickedIndex,
      t = e.clickedSlide;
    if (t && t.classList.contains(s.params.thumbs.slideThumbActiveClass)) return;
    if (null == i) return;
    let r;
    r = e.params.loop ? parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10) : i, s.params.loop ? s.slideToLoop(r) : s.slideTo(r);
  }
  function n() {
    const {
      thumbs: e
    } = s.params;
    if (r) return !1;
    r = !0;
    const i = s.constructor;
    if (e.swiper instanceof i) s.thumbs.swiper = e.swiper, Object.assign(s.thumbs.swiper.originalParams, {
      watchSlidesProgress: !0,
      slideToClickedSlide: !1
    }), Object.assign(s.thumbs.swiper.params, {
      watchSlidesProgress: !0,
      slideToClickedSlide: !1
    }), s.thumbs.swiper.update();else if ((0, _utilsMin.j)(e.swiper)) {
      const t = Object.assign({}, e.swiper);
      Object.assign(t, {
        watchSlidesProgress: !0,
        slideToClickedSlide: !1
      }), s.thumbs.swiper = new i(t), a = !0;
    }
    return s.thumbs.swiper.el.classList.add(s.params.thumbs.thumbsContainerClass), s.thumbs.swiper.on("tap", l), !0;
  }
  function d(e) {
    const i = s.thumbs.swiper;
    if (!i || i.destroyed) return;
    const t = "auto" === i.params.slidesPerView ? i.slidesPerViewDynamic() : i.params.slidesPerView;
    let r = 1;
    const a = s.params.thumbs.slideThumbActiveClass;
    if (s.params.slidesPerView > 1 && !s.params.centeredSlides && (r = s.params.slidesPerView), s.params.thumbs.multipleActiveThumbs || (r = 1), r = Math.floor(r), i.slides.forEach(e => e.classList.remove(a)), i.params.loop || i.params.virtual && i.params.virtual.enabled) for (let e = 0; e < r; e += 1) (0, _utilsMin.e)(i.slidesEl, `[data-swiper-slide-index="${s.realIndex + e}"]`).forEach(e => {
      e.classList.add(a);
    });else for (let e = 0; e < r; e += 1) i.slides[s.realIndex + e] && i.slides[s.realIndex + e].classList.add(a);
    const l = s.params.thumbs.autoScrollOffset,
      n = l && !i.params.loop;
    if (s.realIndex !== i.realIndex || n) {
      const r = i.activeIndex;
      let a, d;
      if (i.params.loop) {
        const e = i.slides.filter(e => e.getAttribute("data-swiper-slide-index") === `${s.realIndex}`)[0];
        a = i.slides.indexOf(e), d = s.activeIndex > s.previousIndex ? "next" : "prev";
      } else a = s.realIndex, d = a > s.previousIndex ? "next" : "prev";
      n && (a += "next" === d ? l : -1 * l), i.visibleSlidesIndexes && i.visibleSlidesIndexes.indexOf(a) < 0 && (i.params.centeredSlides ? a = a > r ? a - Math.floor(t / 2) + 1 : a + Math.floor(t / 2) - 1 : a > r && i.params.slidesPerGroup, i.slideTo(a, e ? 0 : void 0));
    }
  }
  s.thumbs = {
    swiper: null
  }, t("beforeInit", () => {
    const {
      thumbs: e
    } = s.params;
    if (e && e.swiper) if ("string" == typeof e.swiper || e.swiper instanceof HTMLElement) {
      const i = (0, _ssrWindowEsmMin.g)(),
        t = () => {
          const t = "string" == typeof e.swiper ? i.querySelector(e.swiper) : e.swiper;
          if (t && t.swiper) e.swiper = t.swiper, n(), d(!0);else if (t) {
            const i = r => {
              e.swiper = r.detail[0], t.removeEventListener("init", i), n(), d(!0), e.swiper.update(), s.update();
            };
            t.addEventListener("init", i);
          }
          return t;
        },
        r = () => {
          if (s.destroyed) return;
          t() || requestAnimationFrame(r);
        };
      requestAnimationFrame(r);
    } else n(), d(!0);
  }), t("slideChange update resize observerUpdate", () => {
    d();
  }), t("setTransition", (e, i) => {
    const t = s.thumbs.swiper;
    t && !t.destroyed && t.setTransition(i);
  }), t("beforeDestroy", () => {
    const e = s.thumbs.swiper;
    e && !e.destroyed && a && e.destroy();
  }), Object.assign(s.thumbs, {
    init: n,
    update: d
  });
}

},{"../shared/ssr-window.esm.min.mjs":33,"../shared/utils.min.mjs":35}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Virtual;
var _ssrWindowEsmMin = require("../shared/ssr-window.esm.min.mjs");
var _utilsMin = require("../shared/utils.min.mjs");
function Virtual(e) {
  let s,
    {
      swiper: r,
      extendParams: t,
      on: i,
      emit: l
    } = e;
  t({
    virtual: {
      enabled: !1,
      slides: [],
      cache: !0,
      renderSlide: null,
      renderExternal: null,
      renderExternalUpdate: !0,
      addSlidesBefore: 0,
      addSlidesAfter: 0
    }
  });
  const a = (0, _ssrWindowEsmMin.g)();
  r.virtual = {
    cache: {},
    from: void 0,
    to: void 0,
    slides: [],
    offset: 0,
    slidesGrid: []
  };
  const d = a.createElement("div");
  function n(e, s) {
    const t = r.params.virtual;
    if (t.cache && r.virtual.cache[s]) return r.virtual.cache[s];
    let i;
    return t.renderSlide ? (i = t.renderSlide.call(r, e, s), "string" == typeof i && (d.innerHTML = i, i = d.children[0])) : i = r.isElement ? (0, _utilsMin.c)("swiper-slide") : (0, _utilsMin.c)("div", r.params.slideClass), i.setAttribute("data-swiper-slide-index", s), t.renderSlide || (i.innerHTML = e), t.cache && (r.virtual.cache[s] = i), i;
  }
  function o(e) {
    const {
        slidesPerView: s,
        slidesPerGroup: t,
        centeredSlides: i,
        loop: a
      } = r.params,
      {
        addSlidesBefore: d,
        addSlidesAfter: o
      } = r.params.virtual,
      {
        from: c,
        to: u,
        slides: p,
        slidesGrid: f,
        offset: h
      } = r.virtual;
    r.params.cssMode || r.updateActiveIndex();
    const m = r.activeIndex || 0;
    let v, g, E;
    v = r.rtlTranslate ? "right" : r.isHorizontal() ? "left" : "top", i ? (g = Math.floor(s / 2) + t + o, E = Math.floor(s / 2) + t + d) : (g = s + (t - 1) + o, E = (a ? s : t) + d);
    let S = m - E,
      x = m + g;
    a || (S = Math.max(S, 0), x = Math.min(x, p.length - 1));
    let w = (r.slidesGrid[S] || 0) - (r.slidesGrid[0] || 0);
    function A() {
      r.updateSlides(), r.updateProgress(), r.updateSlidesClasses(), l("virtualUpdate");
    }
    if (a && m >= E ? (S -= E, i || (w += r.slidesGrid[0])) : a && m < E && (S = -E, i && (w += r.slidesGrid[0])), Object.assign(r.virtual, {
      from: S,
      to: x,
      offset: w,
      slidesGrid: r.slidesGrid,
      slidesBefore: E,
      slidesAfter: g
    }), c === S && u === x && !e) return r.slidesGrid !== f && w !== h && r.slides.forEach(e => {
      e.style[v] = w - Math.abs(r.cssOverflowAdjustment()) + "px";
    }), r.updateProgress(), void l("virtualUpdate");
    if (r.params.virtual.renderExternal) return r.params.virtual.renderExternal.call(r, {
      offset: w,
      from: S,
      to: x,
      slides: function () {
        const e = [];
        for (let s = S; s <= x; s += 1) e.push(p[s]);
        return e;
      }()
    }), void (r.params.virtual.renderExternalUpdate ? A() : l("virtualUpdate"));
    const b = [],
      M = [],
      y = e => {
        let s = e;
        return e < 0 ? s = p.length + e : s >= p.length && (s -= p.length), s;
      };
    if (e) r.slidesEl.querySelectorAll(`.${r.params.slideClass}, swiper-slide`).forEach(e => {
      e.remove();
    });else for (let e = c; e <= u; e += 1) if (e < S || e > x) {
      const s = y(e);
      r.slidesEl.querySelectorAll(`.${r.params.slideClass}[data-swiper-slide-index="${s}"], swiper-slide[data-swiper-slide-index="${s}"]`).forEach(e => {
        e.remove();
      });
    }
    const P = a ? -p.length : 0,
      C = a ? 2 * p.length : p.length;
    for (let s = P; s < C; s += 1) if (s >= S && s <= x) {
      const r = y(s);
      void 0 === u || e ? M.push(r) : (s > u && M.push(r), s < c && b.push(r));
    }
    if (M.forEach(e => {
      r.slidesEl.append(n(p[e], e));
    }), a) for (let e = b.length - 1; e >= 0; e -= 1) {
      const s = b[e];
      r.slidesEl.prepend(n(p[s], s));
    } else b.sort((e, s) => s - e), b.forEach(e => {
      r.slidesEl.prepend(n(p[e], e));
    });
    (0, _utilsMin.e)(r.slidesEl, ".swiper-slide, swiper-slide").forEach(e => {
      e.style[v] = w - Math.abs(r.cssOverflowAdjustment()) + "px";
    }), A();
  }
  i("beforeInit", () => {
    if (!r.params.virtual.enabled) return;
    let e;
    if (void 0 === r.passedParams.virtual.slides) {
      const s = [...r.slidesEl.children].filter(e => e.matches(`.${r.params.slideClass}, swiper-slide`));
      s && s.length && (r.virtual.slides = [...s], e = !0, s.forEach((e, s) => {
        e.setAttribute("data-swiper-slide-index", s), r.virtual.cache[s] = e, e.remove();
      }));
    }
    e || (r.virtual.slides = r.params.virtual.slides), r.classNames.push(`${r.params.containerModifierClass}virtual`), r.params.watchSlidesProgress = !0, r.originalParams.watchSlidesProgress = !0, r.params.initialSlide || o();
  }), i("setTranslate", () => {
    r.params.virtual.enabled && (r.params.cssMode && !r._immediateVirtual ? (clearTimeout(s), s = setTimeout(() => {
      o();
    }, 100)) : o());
  }), i("init update resize", () => {
    r.params.virtual.enabled && r.params.cssMode && (0, _utilsMin.s)(r.wrapperEl, "--swiper-virtual-size", `${r.virtualSize}px`);
  }), Object.assign(r.virtual, {
    appendSlide: function (e) {
      if ("object" == typeof e && "length" in e) for (let s = 0; s < e.length; s += 1) e[s] && r.virtual.slides.push(e[s]);else r.virtual.slides.push(e);
      o(!0);
    },
    prependSlide: function (e) {
      const s = r.activeIndex;
      let t = s + 1,
        i = 1;
      if (Array.isArray(e)) {
        for (let s = 0; s < e.length; s += 1) e[s] && r.virtual.slides.unshift(e[s]);
        t = s + e.length, i = e.length;
      } else r.virtual.slides.unshift(e);
      if (r.params.virtual.cache) {
        const e = r.virtual.cache,
          s = {};
        Object.keys(e).forEach(r => {
          const t = e[r],
            l = t.getAttribute("data-swiper-slide-index");
          l && t.setAttribute("data-swiper-slide-index", parseInt(l, 10) + i), s[parseInt(r, 10) + i] = t;
        }), r.virtual.cache = s;
      }
      o(!0), r.slideTo(t, 0);
    },
    removeSlide: function (e) {
      if (null == e) return;
      let s = r.activeIndex;
      if (Array.isArray(e)) for (let t = e.length - 1; t >= 0; t -= 1) r.virtual.slides.splice(e[t], 1), r.params.virtual.cache && delete r.virtual.cache[e[t]], e[t] < s && (s -= 1), s = Math.max(s, 0);else r.virtual.slides.splice(e, 1), r.params.virtual.cache && delete r.virtual.cache[e], e < s && (s -= 1), s = Math.max(s, 0);
      o(!0), r.slideTo(s, 0);
    },
    removeAllSlides: function () {
      r.virtual.slides = [], r.params.virtual.cache && (r.virtual.cache = {}), o(!0), r.slideTo(0, 0);
    },
    update: o
  });
}

},{"../shared/ssr-window.esm.min.mjs":33,"../shared/utils.min.mjs":35}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Zoom;
var _ssrWindowEsmMin = require("../shared/ssr-window.esm.min.mjs");
var _utilsMin = require("../shared/utils.min.mjs");
function Zoom(e) {
  let {
    swiper: t,
    extendParams: i,
    on: a,
    emit: r
  } = e;
  const s = (0, _ssrWindowEsmMin.a)();
  i({
    zoom: {
      enabled: !1,
      maxRatio: 3,
      minRatio: 1,
      toggle: !0,
      containerClass: "swiper-zoom-container",
      zoomedSlideClass: "swiper-slide-zoomed"
    }
  }), t.zoom = {
    enabled: !1
  };
  let o,
    n,
    l = 1,
    m = !1;
  const c = [],
    d = {
      originX: 0,
      originY: 0,
      slideEl: void 0,
      slideWidth: void 0,
      slideHeight: void 0,
      imageEl: void 0,
      imageWrapEl: void 0,
      maxRatio: 3
    },
    u = {
      isTouched: void 0,
      isMoved: void 0,
      currentX: void 0,
      currentY: void 0,
      minX: void 0,
      minY: void 0,
      maxX: void 0,
      maxY: void 0,
      width: void 0,
      height: void 0,
      startX: void 0,
      startY: void 0,
      touchesStart: {},
      touchesCurrent: {}
    },
    p = {
      x: void 0,
      y: void 0,
      prevPositionX: void 0,
      prevPositionY: void 0,
      prevTime: void 0
    };
  let g = 1;
  function h() {
    if (c.length < 2) return 1;
    const e = c[0].pageX,
      t = c[0].pageY,
      i = c[1].pageX,
      a = c[1].pageY;
    return Math.sqrt((i - e) ** 2 + (a - t) ** 2);
  }
  function E(e) {
    const i = t.isElement ? "swiper-slide" : `.${t.params.slideClass}`;
    return !!e.target.matches(i) || t.slides.filter(t => t.contains(e.target)).length > 0;
  }
  function v(e) {
    if ("mouse" === e.pointerType && c.splice(0, c.length), !E(e)) return;
    const i = t.params.zoom;
    if (o = !1, n = !1, c.push(e), !(c.length < 2)) {
      if (o = !0, d.scaleStart = h(), !d.slideEl) {
        d.slideEl = e.target.closest(`.${t.params.slideClass}, swiper-slide`), d.slideEl || (d.slideEl = t.slides[t.activeIndex]);
        let a = d.slideEl.querySelector(`.${i.containerClass}`);
        if (a && (a = a.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]), d.imageEl = a, d.imageWrapEl = a ? (0, _utilsMin.a)(d.imageEl, `.${i.containerClass}`)[0] : void 0, !d.imageWrapEl) return void (d.imageEl = void 0);
        d.maxRatio = d.imageWrapEl.getAttribute("data-swiper-zoom") || i.maxRatio;
      }
      if (d.imageEl) {
        const [e, t] = function () {
          if (c.length < 2) return {
            x: null,
            y: null
          };
          const e = d.imageEl.getBoundingClientRect();
          return [(c[0].pageX + (c[1].pageX - c[0].pageX) / 2 - e.x) / l, (c[0].pageY + (c[1].pageY - c[0].pageY) / 2 - e.y) / l];
        }();
        d.originX = e, d.originY = t, d.imageEl.style.transitionDuration = "0ms";
      }
      m = !0;
    }
  }
  function f(e) {
    if (!E(e)) return;
    const i = t.params.zoom,
      a = t.zoom,
      r = c.findIndex(t => t.pointerId === e.pointerId);
    r >= 0 && (c[r] = e), c.length < 2 || (n = !0, d.scaleMove = h(), d.imageEl && (a.scale = d.scaleMove / d.scaleStart * l, a.scale > d.maxRatio && (a.scale = d.maxRatio - 1 + (a.scale - d.maxRatio + 1) ** .5), a.scale < i.minRatio && (a.scale = i.minRatio + 1 - (i.minRatio - a.scale + 1) ** .5), d.imageEl.style.transform = `translate3d(0,0,0) scale(${a.scale})`));
  }
  function x(e) {
    if (!E(e)) return;
    if ("mouse" === e.pointerType && "pointerout" === e.type) return;
    const i = t.params.zoom,
      a = t.zoom,
      r = c.findIndex(t => t.pointerId === e.pointerId);
    r >= 0 && c.splice(r, 1), o && n && (o = !1, n = !1, d.imageEl && (a.scale = Math.max(Math.min(a.scale, d.maxRatio), i.minRatio), d.imageEl.style.transitionDuration = `${t.params.speed}ms`, d.imageEl.style.transform = `translate3d(0,0,0) scale(${a.scale})`, l = a.scale, m = !1, a.scale > 1 && d.slideEl ? d.slideEl.classList.add(`${i.zoomedSlideClass}`) : a.scale <= 1 && d.slideEl && d.slideEl.classList.remove(`${i.zoomedSlideClass}`), 1 === a.scale && (d.originX = 0, d.originY = 0, d.slideEl = void 0)));
  }
  function X(e) {
    if (!E(e) || !function (e) {
      const i = `.${t.params.zoom.containerClass}`;
      return !!e.target.matches(i) || [...t.hostEl.querySelectorAll(i)].filter(t => t.contains(e.target)).length > 0;
    }(e)) return;
    const i = t.zoom;
    if (!d.imageEl) return;
    if (!u.isTouched || !d.slideEl) return;
    u.isMoved || (u.width = d.imageEl.offsetWidth, u.height = d.imageEl.offsetHeight, u.startX = (0, _utilsMin.h)(d.imageWrapEl, "x") || 0, u.startY = (0, _utilsMin.h)(d.imageWrapEl, "y") || 0, d.slideWidth = d.slideEl.offsetWidth, d.slideHeight = d.slideEl.offsetHeight, d.imageWrapEl.style.transitionDuration = "0ms");
    const a = u.width * i.scale,
      r = u.height * i.scale;
    if (a < d.slideWidth && r < d.slideHeight) return;
    u.minX = Math.min(d.slideWidth / 2 - a / 2, 0), u.maxX = -u.minX, u.minY = Math.min(d.slideHeight / 2 - r / 2, 0), u.maxY = -u.minY, u.touchesCurrent.x = c.length > 0 ? c[0].pageX : e.pageX, u.touchesCurrent.y = c.length > 0 ? c[0].pageY : e.pageY;
    if (Math.max(Math.abs(u.touchesCurrent.x - u.touchesStart.x), Math.abs(u.touchesCurrent.y - u.touchesStart.y)) > 5 && (t.allowClick = !1), !u.isMoved && !m) {
      if (t.isHorizontal() && (Math.floor(u.minX) === Math.floor(u.startX) && u.touchesCurrent.x < u.touchesStart.x || Math.floor(u.maxX) === Math.floor(u.startX) && u.touchesCurrent.x > u.touchesStart.x)) return void (u.isTouched = !1);
      if (!t.isHorizontal() && (Math.floor(u.minY) === Math.floor(u.startY) && u.touchesCurrent.y < u.touchesStart.y || Math.floor(u.maxY) === Math.floor(u.startY) && u.touchesCurrent.y > u.touchesStart.y)) return void (u.isTouched = !1);
    }
    e.cancelable && e.preventDefault(), e.stopPropagation(), u.isMoved = !0;
    const s = (i.scale - l) / (d.maxRatio - t.params.zoom.minRatio),
      {
        originX: o,
        originY: n
      } = d;
    u.currentX = u.touchesCurrent.x - u.touchesStart.x + u.startX + s * (u.width - 2 * o), u.currentY = u.touchesCurrent.y - u.touchesStart.y + u.startY + s * (u.height - 2 * n), u.currentX < u.minX && (u.currentX = u.minX + 1 - (u.minX - u.currentX + 1) ** .8), u.currentX > u.maxX && (u.currentX = u.maxX - 1 + (u.currentX - u.maxX + 1) ** .8), u.currentY < u.minY && (u.currentY = u.minY + 1 - (u.minY - u.currentY + 1) ** .8), u.currentY > u.maxY && (u.currentY = u.maxY - 1 + (u.currentY - u.maxY + 1) ** .8), p.prevPositionX || (p.prevPositionX = u.touchesCurrent.x), p.prevPositionY || (p.prevPositionY = u.touchesCurrent.y), p.prevTime || (p.prevTime = Date.now()), p.x = (u.touchesCurrent.x - p.prevPositionX) / (Date.now() - p.prevTime) / 2, p.y = (u.touchesCurrent.y - p.prevPositionY) / (Date.now() - p.prevTime) / 2, Math.abs(u.touchesCurrent.x - p.prevPositionX) < 2 && (p.x = 0), Math.abs(u.touchesCurrent.y - p.prevPositionY) < 2 && (p.y = 0), p.prevPositionX = u.touchesCurrent.x, p.prevPositionY = u.touchesCurrent.y, p.prevTime = Date.now(), d.imageWrapEl.style.transform = `translate3d(${u.currentX}px, ${u.currentY}px,0)`;
  }
  function Y() {
    const e = t.zoom;
    d.slideEl && t.activeIndex !== t.slides.indexOf(d.slideEl) && (d.imageEl && (d.imageEl.style.transform = "translate3d(0,0,0) scale(1)"), d.imageWrapEl && (d.imageWrapEl.style.transform = "translate3d(0,0,0)"), d.slideEl.classList.remove(`${t.params.zoom.zoomedSlideClass}`), e.scale = 1, l = 1, d.slideEl = void 0, d.imageEl = void 0, d.imageWrapEl = void 0, d.originX = 0, d.originY = 0);
  }
  function y(e) {
    const i = t.zoom,
      a = t.params.zoom;
    if (!d.slideEl) {
      e && e.target && (d.slideEl = e.target.closest(`.${t.params.slideClass}, swiper-slide`)), d.slideEl || (t.params.virtual && t.params.virtual.enabled && t.virtual ? d.slideEl = (0, _utilsMin.e)(t.slidesEl, `.${t.params.slideActiveClass}`)[0] : d.slideEl = t.slides[t.activeIndex]);
      let i = d.slideEl.querySelector(`.${a.containerClass}`);
      i && (i = i.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]), d.imageEl = i, d.imageWrapEl = i ? (0, _utilsMin.a)(d.imageEl, `.${a.containerClass}`)[0] : void 0;
    }
    if (!d.imageEl || !d.imageWrapEl) return;
    let r, o, n, m, c, p, g, h, E, v, f, x, X, Y, y, z, C, w;
    t.params.cssMode && (t.wrapperEl.style.overflow = "hidden", t.wrapperEl.style.touchAction = "none"), d.slideEl.classList.add(`${a.zoomedSlideClass}`), void 0 === u.touchesStart.x && e ? (r = e.pageX, o = e.pageY) : (r = u.touchesStart.x, o = u.touchesStart.y);
    const M = "number" == typeof e ? e : null;
    1 === l && M && (r = void 0, o = void 0), i.scale = M || d.imageWrapEl.getAttribute("data-swiper-zoom") || a.maxRatio, l = M || d.imageWrapEl.getAttribute("data-swiper-zoom") || a.maxRatio, !e || 1 === l && M ? (g = 0, h = 0) : (C = d.slideEl.offsetWidth, w = d.slideEl.offsetHeight, n = (0, _utilsMin.b)(d.slideEl).left + s.scrollX, m = (0, _utilsMin.b)(d.slideEl).top + s.scrollY, c = n + C / 2 - r, p = m + w / 2 - o, E = d.imageEl.offsetWidth, v = d.imageEl.offsetHeight, f = E * i.scale, x = v * i.scale, X = Math.min(C / 2 - f / 2, 0), Y = Math.min(w / 2 - x / 2, 0), y = -X, z = -Y, g = c * i.scale, h = p * i.scale, g < X && (g = X), g > y && (g = y), h < Y && (h = Y), h > z && (h = z)), M && 1 === i.scale && (d.originX = 0, d.originY = 0), d.imageWrapEl.style.transitionDuration = "300ms", d.imageWrapEl.style.transform = `translate3d(${g}px, ${h}px,0)`, d.imageEl.style.transitionDuration = "300ms", d.imageEl.style.transform = `translate3d(0,0,0) scale(${i.scale})`;
  }
  function z() {
    const e = t.zoom,
      i = t.params.zoom;
    if (!d.slideEl) {
      t.params.virtual && t.params.virtual.enabled && t.virtual ? d.slideEl = (0, _utilsMin.e)(t.slidesEl, `.${t.params.slideActiveClass}`)[0] : d.slideEl = t.slides[t.activeIndex];
      let e = d.slideEl.querySelector(`.${i.containerClass}`);
      e && (e = e.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]), d.imageEl = e, d.imageWrapEl = e ? (0, _utilsMin.a)(d.imageEl, `.${i.containerClass}`)[0] : void 0;
    }
    d.imageEl && d.imageWrapEl && (t.params.cssMode && (t.wrapperEl.style.overflow = "", t.wrapperEl.style.touchAction = ""), e.scale = 1, l = 1, d.imageWrapEl.style.transitionDuration = "300ms", d.imageWrapEl.style.transform = "translate3d(0,0,0)", d.imageEl.style.transitionDuration = "300ms", d.imageEl.style.transform = "translate3d(0,0,0) scale(1)", d.slideEl.classList.remove(`${i.zoomedSlideClass}`), d.slideEl = void 0, d.originX = 0, d.originY = 0);
  }
  function C(e) {
    const i = t.zoom;
    i.scale && 1 !== i.scale ? z() : y(e);
  }
  function w() {
    return {
      passiveListener: !!t.params.passiveListeners && {
        passive: !0,
        capture: !1
      },
      activeListenerWithCapture: !t.params.passiveListeners || {
        passive: !1,
        capture: !0
      }
    };
  }
  function M() {
    const e = t.zoom;
    if (e.enabled) return;
    e.enabled = !0;
    const {
      passiveListener: i,
      activeListenerWithCapture: a
    } = w();
    t.wrapperEl.addEventListener("pointerdown", v, i), t.wrapperEl.addEventListener("pointermove", f, a), ["pointerup", "pointercancel", "pointerout"].forEach(e => {
      t.wrapperEl.addEventListener(e, x, i);
    }), t.wrapperEl.addEventListener("pointermove", X, a);
  }
  function W() {
    const e = t.zoom;
    if (!e.enabled) return;
    e.enabled = !1;
    const {
      passiveListener: i,
      activeListenerWithCapture: a
    } = w();
    t.wrapperEl.removeEventListener("pointerdown", v, i), t.wrapperEl.removeEventListener("pointermove", f, a), ["pointerup", "pointercancel", "pointerout"].forEach(e => {
      t.wrapperEl.removeEventListener(e, x, i);
    }), t.wrapperEl.removeEventListener("pointermove", X, a);
  }
  Object.defineProperty(t.zoom, "scale", {
    get: () => g,
    set(e) {
      if (g !== e) {
        const t = d.imageEl,
          i = d.slideEl;
        r("zoomChange", e, t, i);
      }
      g = e;
    }
  }), a("init", () => {
    t.params.zoom.enabled && M();
  }), a("destroy", () => {
    W();
  }), a("touchStart", (e, i) => {
    t.zoom.enabled && function (e) {
      const i = t.device;
      if (!d.imageEl) return;
      if (u.isTouched) return;
      i.android && e.cancelable && e.preventDefault(), u.isTouched = !0;
      const a = c.length > 0 ? c[0] : e;
      u.touchesStart.x = a.pageX, u.touchesStart.y = a.pageY;
    }(i);
  }), a("touchEnd", (e, i) => {
    t.zoom.enabled && function () {
      const e = t.zoom;
      if (!d.imageEl) return;
      if (!u.isTouched || !u.isMoved) return u.isTouched = !1, void (u.isMoved = !1);
      u.isTouched = !1, u.isMoved = !1;
      let i = 300,
        a = 300;
      const r = p.x * i,
        s = u.currentX + r,
        o = p.y * a,
        n = u.currentY + o;
      0 !== p.x && (i = Math.abs((s - u.currentX) / p.x)), 0 !== p.y && (a = Math.abs((n - u.currentY) / p.y));
      const l = Math.max(i, a);
      u.currentX = s, u.currentY = n;
      const m = u.width * e.scale,
        c = u.height * e.scale;
      u.minX = Math.min(d.slideWidth / 2 - m / 2, 0), u.maxX = -u.minX, u.minY = Math.min(d.slideHeight / 2 - c / 2, 0), u.maxY = -u.minY, u.currentX = Math.max(Math.min(u.currentX, u.maxX), u.minX), u.currentY = Math.max(Math.min(u.currentY, u.maxY), u.minY), d.imageWrapEl.style.transitionDuration = `${l}ms`, d.imageWrapEl.style.transform = `translate3d(${u.currentX}px, ${u.currentY}px,0)`;
    }();
  }), a("doubleTap", (e, i) => {
    !t.animating && t.params.zoom.enabled && t.zoom.enabled && t.params.zoom.toggle && C(i);
  }), a("transitionEnd", () => {
    t.zoom.enabled && t.params.zoom.enabled && Y();
  }), a("slideChange", () => {
    t.zoom.enabled && t.params.zoom.enabled && t.params.cssMode && Y();
  }), Object.assign(t.zoom, {
    enable: M,
    disable: W,
    in: y,
    out: z,
    toggle: C
  });
}

},{"../shared/ssr-window.esm.min.mjs":33,"../shared/utils.min.mjs":35}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.c = classesToSelector;
function classesToSelector(e) {
  return void 0 === e && (e = ""), `.${e.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`;
}

},{}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.c = createElementIfNotDefined;
var _utilsMin = require("./utils.min.mjs");
function createElementIfNotDefined(e, t, n, a) {
  return e.params.createElements && Object.keys(a).forEach(l => {
    if (!n[l] && !0 === n.auto) {
      let r = (0, _utilsMin.e)(e.el, `.${a[l]}`)[0];
      r || (r = (0, _utilsMin.c)("div", a[l]), r.className = a[l], e.el.append(r)), n[l] = r, t[l] = r;
    }
  }), n;
}

},{"./utils.min.mjs":35}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.c = createShadow;
var _utilsMin = require("./utils.min.mjs");
function createShadow(e, t, r) {
  const s = `swiper-slide-shadow${r ? `-${r}` : ""}${e ? ` swiper-slide-shadow-${e}` : ""}`,
    a = (0, _utilsMin.k)(t);
  let i = a.querySelector(`.${s.split(" ").join(".")}`);
  return i || (i = (0, _utilsMin.c)("div", s.split(" ")), a.append(i)), i;
}

},{"./utils.min.mjs":35}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.e = effectInit;
function effectInit(e) {
  const {
    effect: s,
    swiper: a,
    on: t,
    setTranslate: r,
    setTransition: i,
    overwriteParams: n,
    perspective: o,
    recreateShadows: f,
    getEffectParams: l
  } = e;
  let c;
  t("beforeInit", () => {
    if (a.params.effect !== s) return;
    a.classNames.push(`${a.params.containerModifierClass}${s}`), o && o() && a.classNames.push(`${a.params.containerModifierClass}3d`);
    const e = n ? n() : {};
    Object.assign(a.params, e), Object.assign(a.originalParams, e);
  }), t("setTranslate", () => {
    a.params.effect === s && r();
  }), t("setTransition", (e, t) => {
    a.params.effect === s && i(t);
  }), t("transitionEnd", () => {
    if (a.params.effect === s && f) {
      if (!l || !l().slideShadows) return;
      a.slides.forEach(e => {
        e.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(e => e.remove());
      }), f();
    }
  }), t("virtualUpdate", () => {
    a.params.effect === s && (a.slides.length || (c = !0), requestAnimationFrame(() => {
      c && a.slides && a.slides.length && (r(), c = !1);
    }));
  });
}

},{}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.e = effectTarget;
var _utilsMin = require("./utils.min.mjs");
function effectTarget(e, i) {
  const t = (0, _utilsMin.k)(i);
  return t !== i && (t.style.backfaceVisibility = "hidden", t.style["-webkit-backface-visibility"] = "hidden"), t;
}

},{"./utils.min.mjs":35}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.e = effectVirtualTransitionEnd;
var _utilsMin = require("./utils.min.mjs");
function effectVirtualTransitionEnd(e) {
  let {
    swiper: t,
    duration: n,
    transformElements: r,
    allSlides: i
  } = e;
  const {
    activeIndex: a
  } = t;
  if (t.params.virtualTranslate && 0 !== n) {
    let e,
      n = !1;
    e = i ? r : r.filter(e => {
      const n = e.classList.contains("swiper-slide-transform") ? (e => {
        if (!e.parentElement) return t.slides.filter(t => t.shadowRoot && t.shadowRoot === e.parentNode)[0];
        return e.parentElement;
      })(e) : e;
      return t.getSlideIndex(n) === a;
    }), e.forEach(e => {
      (0, _utilsMin.i)(e, () => {
        if (n) return;
        if (!t || t.destroyed) return;
        n = !0, t.animating = !1;
        const e = new window.CustomEvent("transitionend", {
          bubbles: !0,
          cancelable: !0
        });
        t.wrapperEl.dispatchEvent(e);
      });
    });
  }
}

},{"./utils.min.mjs":35}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.a = getWindow;
exports.g = getDocument;
function isObject(e) {
  return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object;
}
function extend(e, t) {
  void 0 === e && (e = {}), void 0 === t && (t = {}), Object.keys(t).forEach(n => {
    void 0 === e[n] ? e[n] = t[n] : isObject(t[n]) && isObject(e[n]) && Object.keys(t[n]).length > 0 && extend(e[n], t[n]);
  });
}
const ssrDocument = {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: {
    blur() {},
    nodeName: ""
  },
  querySelector: () => null,
  querySelectorAll: () => [],
  getElementById: () => null,
  createEvent: () => ({
    initEvent() {}
  }),
  createElement: () => ({
    children: [],
    childNodes: [],
    style: {},
    setAttribute() {},
    getElementsByTagName: () => []
  }),
  createElementNS: () => ({}),
  importNode: () => null,
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  }
};
function getDocument() {
  const e = "undefined" != typeof document ? document : {};
  return extend(e, ssrDocument), e;
}
const ssrWindow = {
  document: ssrDocument,
  navigator: {
    userAgent: ""
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  },
  history: {
    replaceState() {},
    pushState() {},
    go() {},
    back() {}
  },
  CustomEvent: function () {
    return this;
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle: () => ({
    getPropertyValue: () => ""
  }),
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia: () => ({}),
  requestAnimationFrame: e => "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
  cancelAnimationFrame(e) {
    "undefined" != typeof setTimeout && clearTimeout(e);
  }
};
function getWindow() {
  const e = "undefined" != typeof window ? window : {};
  return extend(e, ssrWindow), e;
}

},{}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.d = exports.S = void 0;
var _ssrWindowEsmMin = require("./ssr-window.esm.min.mjs");
var _utilsMin = require("./utils.min.mjs");
let support, deviceCached, browser;
function calcSupport() {
  const e = (0, _ssrWindowEsmMin.a)(),
    t = (0, _ssrWindowEsmMin.g)();
  return {
    smoothScroll: t.documentElement && t.documentElement.style && "scrollBehavior" in t.documentElement.style,
    touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch)
  };
}
function getSupport() {
  return support || (support = calcSupport()), support;
}
function calcDevice(e) {
  let {
    userAgent: t
  } = void 0 === e ? {} : e;
  const s = getSupport(),
    i = (0, _ssrWindowEsmMin.a)(),
    r = i.navigator.platform,
    a = t || i.navigator.userAgent,
    n = {
      ios: !1,
      android: !1
    },
    l = i.screen.width,
    o = i.screen.height,
    d = a.match(/(Android);?[\s\/]+([\d.]+)?/);
  let c = a.match(/(iPad).*OS\s([\d_]+)/);
  const p = a.match(/(iPod)(.*OS\s([\d_]+))?/),
    u = !c && a.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
    h = "Win32" === r;
  let m = "MacIntel" === r;
  return !c && m && s.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(`${l}x${o}`) >= 0 && (c = a.match(/(Version)\/([\d.]+)/), c || (c = [0, 1, "13_0_0"]), m = !1), d && !h && (n.os = "android", n.android = !0), (c || u || p) && (n.os = "ios", n.ios = !0), n;
}
function getDevice(e) {
  return void 0 === e && (e = {}), deviceCached || (deviceCached = calcDevice(e)), deviceCached;
}
function calcBrowser() {
  const e = (0, _ssrWindowEsmMin.a)();
  let t = !1;
  function s() {
    const t = e.navigator.userAgent.toLowerCase();
    return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0;
  }
  if (s()) {
    const s = String(e.navigator.userAgent);
    if (s.includes("Version/")) {
      const [e, i] = s.split("Version/")[1].split(" ")[0].split(".").map(e => Number(e));
      t = e < 16 || 16 === e && i < 2;
    }
  }
  return {
    isSafari: t || s(),
    needPerspectiveFix: t,
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)
  };
}
function getBrowser() {
  return browser || (browser = calcBrowser()), browser;
}
function Resize(e) {
  let {
    swiper: t,
    on: s,
    emit: i
  } = e;
  const r = (0, _ssrWindowEsmMin.a)();
  let a = null,
    n = null;
  const l = () => {
      t && !t.destroyed && t.initialized && (i("beforeResize"), i("resize"));
    },
    o = () => {
      t && !t.destroyed && t.initialized && i("orientationchange");
    };
  s("init", () => {
    t.params.resizeObserver && void 0 !== r.ResizeObserver ? t && !t.destroyed && t.initialized && (a = new ResizeObserver(e => {
      n = r.requestAnimationFrame(() => {
        const {
          width: s,
          height: i
        } = t;
        let r = s,
          a = i;
        e.forEach(e => {
          let {
            contentBoxSize: s,
            contentRect: i,
            target: n
          } = e;
          n && n !== t.el || (r = i ? i.width : (s[0] || s).inlineSize, a = i ? i.height : (s[0] || s).blockSize);
        }), r === s && a === i || l();
      });
    }), a.observe(t.el)) : (r.addEventListener("resize", l), r.addEventListener("orientationchange", o));
  }), s("destroy", () => {
    n && r.cancelAnimationFrame(n), a && a.unobserve && t.el && (a.unobserve(t.el), a = null), r.removeEventListener("resize", l), r.removeEventListener("orientationchange", o);
  });
}
function Observer(e) {
  let {
    swiper: t,
    extendParams: s,
    on: i,
    emit: r
  } = e;
  const a = [],
    n = (0, _ssrWindowEsmMin.a)(),
    l = function (e, s) {
      void 0 === s && (s = {});
      const i = new (n.MutationObserver || n.WebkitMutationObserver)(e => {
        if (t.__preventObserver__) return;
        if (1 === e.length) return void r("observerUpdate", e[0]);
        const s = function () {
          r("observerUpdate", e[0]);
        };
        n.requestAnimationFrame ? n.requestAnimationFrame(s) : n.setTimeout(s, 0);
      });
      i.observe(e, {
        attributes: void 0 === s.attributes || s.attributes,
        childList: void 0 === s.childList || s.childList,
        characterData: void 0 === s.characterData || s.characterData
      }), a.push(i);
    };
  s({
    observer: !1,
    observeParents: !1,
    observeSlideChildren: !1
  }), i("init", () => {
    if (t.params.observer) {
      if (t.params.observeParents) {
        const e = (0, _utilsMin.a)(t.hostEl);
        for (let t = 0; t < e.length; t += 1) l(e[t]);
      }
      l(t.hostEl, {
        childList: t.params.observeSlideChildren
      }), l(t.wrapperEl, {
        attributes: !1
      });
    }
  }), i("destroy", () => {
    a.forEach(e => {
      e.disconnect();
    }), a.splice(0, a.length);
  });
}
var eventsEmitter = {
  on(e, t, s) {
    const i = this;
    if (!i.eventsListeners || i.destroyed) return i;
    if ("function" != typeof t) return i;
    const r = s ? "unshift" : "push";
    return e.split(" ").forEach(e => {
      i.eventsListeners[e] || (i.eventsListeners[e] = []), i.eventsListeners[e][r](t);
    }), i;
  },
  once(e, t, s) {
    const i = this;
    if (!i.eventsListeners || i.destroyed) return i;
    if ("function" != typeof t) return i;
    function r() {
      i.off(e, r), r.__emitterProxy && delete r.__emitterProxy;
      for (var s = arguments.length, a = new Array(s), n = 0; n < s; n++) a[n] = arguments[n];
      t.apply(i, a);
    }
    return r.__emitterProxy = t, i.on(e, r, s);
  },
  onAny(e, t) {
    const s = this;
    if (!s.eventsListeners || s.destroyed) return s;
    if ("function" != typeof e) return s;
    const i = t ? "unshift" : "push";
    return s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s;
  },
  offAny(e) {
    const t = this;
    if (!t.eventsListeners || t.destroyed) return t;
    if (!t.eventsAnyListeners) return t;
    const s = t.eventsAnyListeners.indexOf(e);
    return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
  },
  off(e, t) {
    const s = this;
    return !s.eventsListeners || s.destroyed ? s : s.eventsListeners ? (e.split(" ").forEach(e => {
      void 0 === t ? s.eventsListeners[e] = [] : s.eventsListeners[e] && s.eventsListeners[e].forEach((i, r) => {
        (i === t || i.__emitterProxy && i.__emitterProxy === t) && s.eventsListeners[e].splice(r, 1);
      });
    }), s) : s;
  },
  emit() {
    const e = this;
    if (!e.eventsListeners || e.destroyed) return e;
    if (!e.eventsListeners) return e;
    let t, s, i;
    for (var r = arguments.length, a = new Array(r), n = 0; n < r; n++) a[n] = arguments[n];
    "string" == typeof a[0] || Array.isArray(a[0]) ? (t = a[0], s = a.slice(1, a.length), i = e) : (t = a[0].events, s = a[0].data, i = a[0].context || e), s.unshift(i);
    return (Array.isArray(t) ? t : t.split(" ")).forEach(t => {
      e.eventsAnyListeners && e.eventsAnyListeners.length && e.eventsAnyListeners.forEach(e => {
        e.apply(i, [t, ...s]);
      }), e.eventsListeners && e.eventsListeners[t] && e.eventsListeners[t].forEach(e => {
        e.apply(i, s);
      });
    }), e;
  }
};
function updateSize() {
  const e = this;
  let t, s;
  const i = e.el;
  t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : i.clientWidth, s = void 0 !== e.params.height && null !== e.params.height ? e.params.height : i.clientHeight, 0 === t && e.isHorizontal() || 0 === s && e.isVertical() || (t = t - parseInt((0, _utilsMin.l)(i, "padding-left") || 0, 10) - parseInt((0, _utilsMin.l)(i, "padding-right") || 0, 10), s = s - parseInt((0, _utilsMin.l)(i, "padding-top") || 0, 10) - parseInt((0, _utilsMin.l)(i, "padding-bottom") || 0, 10), Number.isNaN(t) && (t = 0), Number.isNaN(s) && (s = 0), Object.assign(e, {
    width: t,
    height: s,
    size: e.isHorizontal() ? t : s
  }));
}
function updateSlides() {
  const e = this;
  function t(t) {
    return e.isHorizontal() ? t : {
      width: "height",
      "margin-top": "margin-left",
      "margin-bottom ": "margin-right",
      "margin-left": "margin-top",
      "margin-right": "margin-bottom",
      "padding-left": "padding-top",
      "padding-right": "padding-bottom",
      marginRight: "marginBottom"
    }[t];
  }
  function s(e, s) {
    return parseFloat(e.getPropertyValue(t(s)) || 0);
  }
  const i = e.params,
    {
      wrapperEl: r,
      slidesEl: a,
      size: n,
      rtlTranslate: l,
      wrongRTL: o
    } = e,
    d = e.virtual && i.virtual.enabled,
    c = d ? e.virtual.slides.length : e.slides.length,
    p = (0, _utilsMin.e)(a, `.${e.params.slideClass}, swiper-slide`),
    u = d ? e.virtual.slides.length : p.length;
  let h = [];
  const m = [],
    f = [];
  let v = i.slidesOffsetBefore;
  "function" == typeof v && (v = i.slidesOffsetBefore.call(e));
  let g = i.slidesOffsetAfter;
  "function" == typeof g && (g = i.slidesOffsetAfter.call(e));
  const w = e.snapGrid.length,
    S = e.slidesGrid.length;
  let T = i.spaceBetween,
    b = -v,
    x = 0,
    E = 0;
  if (void 0 === n) return;
  "string" == typeof T && T.indexOf("%") >= 0 ? T = parseFloat(T.replace("%", "")) / 100 * n : "string" == typeof T && (T = parseFloat(T)), e.virtualSize = -T, p.forEach(e => {
    l ? e.style.marginLeft = "" : e.style.marginRight = "", e.style.marginBottom = "", e.style.marginTop = "";
  }), i.centeredSlides && i.cssMode && ((0, _utilsMin.s)(r, "--swiper-centered-offset-before", ""), (0, _utilsMin.s)(r, "--swiper-centered-offset-after", ""));
  const y = i.grid && i.grid.rows > 1 && e.grid;
  let C;
  y && e.grid.initSlides(u);
  const M = "auto" === i.slidesPerView && i.breakpoints && Object.keys(i.breakpoints).filter(e => void 0 !== i.breakpoints[e].slidesPerView).length > 0;
  for (let r = 0; r < u; r += 1) {
    let a;
    if (C = 0, p[r] && (a = p[r]), y && e.grid.updateSlide(r, a, u, t), !p[r] || "none" !== (0, _utilsMin.l)(a, "display")) {
      if ("auto" === i.slidesPerView) {
        M && (p[r].style[t("width")] = "");
        const n = getComputedStyle(a),
          l = a.style.transform,
          o = a.style.webkitTransform;
        if (l && (a.style.transform = "none"), o && (a.style.webkitTransform = "none"), i.roundLengths) C = e.isHorizontal() ? (0, _utilsMin.f)(a, "width", !0) : (0, _utilsMin.f)(a, "height", !0);else {
          const e = s(n, "width"),
            t = s(n, "padding-left"),
            i = s(n, "padding-right"),
            r = s(n, "margin-left"),
            l = s(n, "margin-right"),
            o = n.getPropertyValue("box-sizing");
          if (o && "border-box" === o) C = e + r + l;else {
            const {
              clientWidth: s,
              offsetWidth: n
            } = a;
            C = e + t + i + r + l + (n - s);
          }
        }
        l && (a.style.transform = l), o && (a.style.webkitTransform = o), i.roundLengths && (C = Math.floor(C));
      } else C = (n - (i.slidesPerView - 1) * T) / i.slidesPerView, i.roundLengths && (C = Math.floor(C)), p[r] && (p[r].style[t("width")] = `${C}px`);
      p[r] && (p[r].swiperSlideSize = C), f.push(C), i.centeredSlides ? (b = b + C / 2 + x / 2 + T, 0 === x && 0 !== r && (b = b - n / 2 - T), 0 === r && (b = b - n / 2 - T), Math.abs(b) < .001 && (b = 0), i.roundLengths && (b = Math.floor(b)), E % i.slidesPerGroup == 0 && h.push(b), m.push(b)) : (i.roundLengths && (b = Math.floor(b)), (E - Math.min(e.params.slidesPerGroupSkip, E)) % e.params.slidesPerGroup == 0 && h.push(b), m.push(b), b = b + C + T), e.virtualSize += C + T, x = C, E += 1;
    }
  }
  if (e.virtualSize = Math.max(e.virtualSize, n) + g, l && o && ("slide" === i.effect || "coverflow" === i.effect) && (r.style.width = `${e.virtualSize + T}px`), i.setWrapperSize && (r.style[t("width")] = `${e.virtualSize + T}px`), y && e.grid.updateWrapperSize(C, h, t), !i.centeredSlides) {
    const t = [];
    for (let s = 0; s < h.length; s += 1) {
      let r = h[s];
      i.roundLengths && (r = Math.floor(r)), h[s] <= e.virtualSize - n && t.push(r);
    }
    h = t, Math.floor(e.virtualSize - n) - Math.floor(h[h.length - 1]) > 1 && h.push(e.virtualSize - n);
  }
  if (d && i.loop) {
    const t = f[0] + T;
    if (i.slidesPerGroup > 1) {
      const s = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / i.slidesPerGroup),
        r = t * i.slidesPerGroup;
      for (let e = 0; e < s; e += 1) h.push(h[h.length - 1] + r);
    }
    for (let s = 0; s < e.virtual.slidesBefore + e.virtual.slidesAfter; s += 1) 1 === i.slidesPerGroup && h.push(h[h.length - 1] + t), m.push(m[m.length - 1] + t), e.virtualSize += t;
  }
  if (0 === h.length && (h = [0]), 0 !== T) {
    const s = e.isHorizontal() && l ? "marginLeft" : t("marginRight");
    p.filter((e, t) => !(i.cssMode && !i.loop) || t !== p.length - 1).forEach(e => {
      e.style[s] = `${T}px`;
    });
  }
  if (i.centeredSlides && i.centeredSlidesBounds) {
    let e = 0;
    f.forEach(t => {
      e += t + (T || 0);
    }), e -= T;
    const t = e - n;
    h = h.map(e => e <= 0 ? -v : e > t ? t + g : e);
  }
  if (i.centerInsufficientSlides) {
    let e = 0;
    if (f.forEach(t => {
      e += t + (T || 0);
    }), e -= T, e < n) {
      const t = (n - e) / 2;
      h.forEach((e, s) => {
        h[s] = e - t;
      }), m.forEach((e, s) => {
        m[s] = e + t;
      });
    }
  }
  if (Object.assign(e, {
    slides: p,
    snapGrid: h,
    slidesGrid: m,
    slidesSizesGrid: f
  }), i.centeredSlides && i.cssMode && !i.centeredSlidesBounds) {
    (0, _utilsMin.s)(r, "--swiper-centered-offset-before", -h[0] + "px"), (0, _utilsMin.s)(r, "--swiper-centered-offset-after", e.size / 2 - f[f.length - 1] / 2 + "px");
    const t = -e.snapGrid[0],
      s = -e.slidesGrid[0];
    e.snapGrid = e.snapGrid.map(e => e + t), e.slidesGrid = e.slidesGrid.map(e => e + s);
  }
  if (u !== c && e.emit("slidesLengthChange"), h.length !== w && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), m.length !== S && e.emit("slidesGridLengthChange"), i.watchSlidesProgress && e.updateSlidesOffset(), !(d || i.cssMode || "slide" !== i.effect && "fade" !== i.effect)) {
    const t = `${i.containerModifierClass}backface-hidden`,
      s = e.el.classList.contains(t);
    u <= i.maxBackfaceHiddenSlides ? s || e.el.classList.add(t) : s && e.el.classList.remove(t);
  }
}
function updateAutoHeight(e) {
  const t = this,
    s = [],
    i = t.virtual && t.params.virtual.enabled;
  let r,
    a = 0;
  "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
  const n = e => i ? t.slides[t.getSlideIndexByData(e)] : t.slides[e];
  if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1) {
    if (t.params.centeredSlides) (t.visibleSlides || []).forEach(e => {
      s.push(e);
    });else for (r = 0; r < Math.ceil(t.params.slidesPerView); r += 1) {
      const e = t.activeIndex + r;
      if (e > t.slides.length && !i) break;
      s.push(n(e));
    }
  } else s.push(n(t.activeIndex));
  for (r = 0; r < s.length; r += 1) if (void 0 !== s[r]) {
    const e = s[r].offsetHeight;
    a = e > a ? e : a;
  }
  (a || 0 === a) && (t.wrapperEl.style.height = `${a}px`);
}
function updateSlidesOffset() {
  const e = this,
    t = e.slides,
    s = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0;
  for (let i = 0; i < t.length; i += 1) t[i].swiperSlideOffset = (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) - s - e.cssOverflowAdjustment();
}
function updateSlidesProgress(e) {
  void 0 === e && (e = this && this.translate || 0);
  const t = this,
    s = t.params,
    {
      slides: i,
      rtlTranslate: r,
      snapGrid: a
    } = t;
  if (0 === i.length) return;
  void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
  let n = -e;
  r && (n = e), i.forEach(e => {
    e.classList.remove(s.slideVisibleClass);
  }), t.visibleSlidesIndexes = [], t.visibleSlides = [];
  let l = s.spaceBetween;
  "string" == typeof l && l.indexOf("%") >= 0 ? l = parseFloat(l.replace("%", "")) / 100 * t.size : "string" == typeof l && (l = parseFloat(l));
  for (let e = 0; e < i.length; e += 1) {
    const o = i[e];
    let d = o.swiperSlideOffset;
    s.cssMode && s.centeredSlides && (d -= i[0].swiperSlideOffset);
    const c = (n + (s.centeredSlides ? t.minTranslate() : 0) - d) / (o.swiperSlideSize + l),
      p = (n - a[0] + (s.centeredSlides ? t.minTranslate() : 0) - d) / (o.swiperSlideSize + l),
      u = -(n - d),
      h = u + t.slidesSizesGrid[e];
    (u >= 0 && u < t.size - 1 || h > 1 && h <= t.size || u <= 0 && h >= t.size) && (t.visibleSlides.push(o), t.visibleSlidesIndexes.push(e), i[e].classList.add(s.slideVisibleClass)), o.progress = r ? -c : c, o.originalProgress = r ? -p : p;
  }
}
function updateProgress(e) {
  const t = this;
  if (void 0 === e) {
    const s = t.rtlTranslate ? -1 : 1;
    e = t && t.translate && t.translate * s || 0;
  }
  const s = t.params,
    i = t.maxTranslate() - t.minTranslate();
  let {
    progress: r,
    isBeginning: a,
    isEnd: n,
    progressLoop: l
  } = t;
  const o = a,
    d = n;
  if (0 === i) r = 0, a = !0, n = !0;else {
    r = (e - t.minTranslate()) / i;
    const s = Math.abs(e - t.minTranslate()) < 1,
      l = Math.abs(e - t.maxTranslate()) < 1;
    a = s || r <= 0, n = l || r >= 1, s && (r = 0), l && (r = 1);
  }
  if (s.loop) {
    const s = t.getSlideIndexByData(0),
      i = t.getSlideIndexByData(t.slides.length - 1),
      r = t.slidesGrid[s],
      a = t.slidesGrid[i],
      n = t.slidesGrid[t.slidesGrid.length - 1],
      o = Math.abs(e);
    l = o >= r ? (o - r) / n : (o + n - a) / n, l > 1 && (l -= 1);
  }
  Object.assign(t, {
    progress: r,
    progressLoop: l,
    isBeginning: a,
    isEnd: n
  }), (s.watchSlidesProgress || s.centeredSlides && s.autoHeight) && t.updateSlidesProgress(e), a && !o && t.emit("reachBeginning toEdge"), n && !d && t.emit("reachEnd toEdge"), (o && !a || d && !n) && t.emit("fromEdge"), t.emit("progress", r);
}
function updateSlidesClasses() {
  const e = this,
    {
      slides: t,
      params: s,
      slidesEl: i,
      activeIndex: r
    } = e,
    a = e.virtual && s.virtual.enabled,
    n = e => (0, _utilsMin.e)(i, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
  let l;
  if (t.forEach(e => {
    e.classList.remove(s.slideActiveClass, s.slideNextClass, s.slidePrevClass);
  }), a) {
    if (s.loop) {
      let t = r - e.virtual.slidesBefore;
      t < 0 && (t = e.virtual.slides.length + t), t >= e.virtual.slides.length && (t -= e.virtual.slides.length), l = n(`[data-swiper-slide-index="${t}"]`);
    } else l = n(`[data-swiper-slide-index="${r}"]`);
  } else l = t[r];
  if (l) {
    l.classList.add(s.slideActiveClass);
    let e = (0, _utilsMin.m)(l, `.${s.slideClass}, swiper-slide`)[0];
    s.loop && !e && (e = t[0]), e && e.classList.add(s.slideNextClass);
    let i = (0, _utilsMin.o)(l, `.${s.slideClass}, swiper-slide`)[0];
    s.loop && 0 === !i && (i = t[t.length - 1]), i && i.classList.add(s.slidePrevClass);
  }
  e.emitSlidesClasses();
}
const processLazyPreloader = (e, t) => {
    if (!e || e.destroyed || !e.params) return;
    const s = t.closest(e.isElement ? "swiper-slide" : `.${e.params.slideClass}`);
    if (s) {
      const t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
      t && t.remove();
    }
  },
  unlazy = (e, t) => {
    if (!e.slides[t]) return;
    const s = e.slides[t].querySelector('[loading="lazy"]');
    s && s.removeAttribute("loading");
  },
  preload = e => {
    if (!e || e.destroyed || !e.params) return;
    let t = e.params.lazyPreloadPrevNext;
    const s = e.slides.length;
    if (!s || !t || t < 0) return;
    t = Math.min(t, s);
    const i = "auto" === e.params.slidesPerView ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView),
      r = e.activeIndex;
    if (e.params.grid && e.params.grid.rows > 1) {
      const s = r,
        a = [s - t];
      return a.push(...Array.from({
        length: t
      }).map((e, t) => s + i + t)), void e.slides.forEach((t, s) => {
        a.includes(t.column) && unlazy(e, s);
      });
    }
    const a = r + i - 1;
    if (e.params.rewind || e.params.loop) for (let i = r - t; i <= a + t; i += 1) {
      const t = (i % s + s) % s;
      (t < r || t > a) && unlazy(e, t);
    } else for (let i = Math.max(r - t, 0); i <= Math.min(a + t, s - 1); i += 1) i !== r && (i > a || i < r) && unlazy(e, i);
  };
function getActiveIndexByTranslate(e) {
  const {
      slidesGrid: t,
      params: s
    } = e,
    i = e.rtlTranslate ? e.translate : -e.translate;
  let r;
  for (let e = 0; e < t.length; e += 1) void 0 !== t[e + 1] ? i >= t[e] && i < t[e + 1] - (t[e + 1] - t[e]) / 2 ? r = e : i >= t[e] && i < t[e + 1] && (r = e + 1) : i >= t[e] && (r = e);
  return s.normalizeSlideIndex && (r < 0 || void 0 === r) && (r = 0), r;
}
function updateActiveIndex(e) {
  const t = this,
    s = t.rtlTranslate ? t.translate : -t.translate,
    {
      snapGrid: i,
      params: r,
      activeIndex: a,
      realIndex: n,
      snapIndex: l
    } = t;
  let o,
    d = e;
  const c = e => {
    let s = e - t.virtual.slidesBefore;
    return s < 0 && (s = t.virtual.slides.length + s), s >= t.virtual.slides.length && (s -= t.virtual.slides.length), s;
  };
  if (void 0 === d && (d = getActiveIndexByTranslate(t)), i.indexOf(s) >= 0) o = i.indexOf(s);else {
    const e = Math.min(r.slidesPerGroupSkip, d);
    o = e + Math.floor((d - e) / r.slidesPerGroup);
  }
  if (o >= i.length && (o = i.length - 1), d === a) return o !== l && (t.snapIndex = o, t.emit("snapIndexChange")), void (t.params.loop && t.virtual && t.params.virtual.enabled && (t.realIndex = c(d)));
  let p;
  p = t.virtual && r.virtual.enabled && r.loop ? c(d) : t.slides[d] ? parseInt(t.slides[d].getAttribute("data-swiper-slide-index") || d, 10) : d, Object.assign(t, {
    previousSnapIndex: l,
    snapIndex: o,
    previousRealIndex: n,
    realIndex: p,
    previousIndex: a,
    activeIndex: d
  }), t.initialized && preload(t), t.emit("activeIndexChange"), t.emit("snapIndexChange"), n !== p && t.emit("realIndexChange"), (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
}
function updateClickedSlide(e) {
  const t = this,
    s = t.params,
    i = e.closest(`.${s.slideClass}, swiper-slide`);
  let r,
    a = !1;
  if (i) for (let e = 0; e < t.slides.length; e += 1) if (t.slides[e] === i) {
    a = !0, r = e;
    break;
  }
  if (!i || !a) return t.clickedSlide = void 0, void (t.clickedIndex = void 0);
  t.clickedSlide = i, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(i.getAttribute("data-swiper-slide-index"), 10) : t.clickedIndex = r, s.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide();
}
var update = {
  updateSize: updateSize,
  updateSlides: updateSlides,
  updateAutoHeight: updateAutoHeight,
  updateSlidesOffset: updateSlidesOffset,
  updateSlidesProgress: updateSlidesProgress,
  updateProgress: updateProgress,
  updateSlidesClasses: updateSlidesClasses,
  updateActiveIndex: updateActiveIndex,
  updateClickedSlide: updateClickedSlide
};
function getSwiperTranslate(e) {
  void 0 === e && (e = this.isHorizontal() ? "x" : "y");
  const {
    params: t,
    rtlTranslate: s,
    translate: i,
    wrapperEl: r
  } = this;
  if (t.virtualTranslate) return s ? -i : i;
  if (t.cssMode) return i;
  let a = (0, _utilsMin.h)(r, e);
  return a += this.cssOverflowAdjustment(), s && (a = -a), a || 0;
}
function setTranslate(e, t) {
  const s = this,
    {
      rtlTranslate: i,
      params: r,
      wrapperEl: a,
      progress: n
    } = s;
  let l = 0,
    o = 0;
  let d;
  s.isHorizontal() ? l = i ? -e : e : o = e, r.roundLengths && (l = Math.floor(l), o = Math.floor(o)), s.previousTranslate = s.translate, s.translate = s.isHorizontal() ? l : o, r.cssMode ? a[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -l : -o : r.virtualTranslate || (s.isHorizontal() ? l -= s.cssOverflowAdjustment() : o -= s.cssOverflowAdjustment(), a.style.transform = `translate3d(${l}px, ${o}px, 0px)`);
  const c = s.maxTranslate() - s.minTranslate();
  d = 0 === c ? 0 : (e - s.minTranslate()) / c, d !== n && s.updateProgress(e), s.emit("setTranslate", s.translate, t);
}
function minTranslate() {
  return -this.snapGrid[0];
}
function maxTranslate() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function translateTo(e, t, s, i, r) {
  void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), void 0 === i && (i = !0);
  const a = this,
    {
      params: n,
      wrapperEl: l
    } = a;
  if (a.animating && n.preventInteractionOnTransition) return !1;
  const o = a.minTranslate(),
    d = a.maxTranslate();
  let c;
  if (c = i && e > o ? o : i && e < d ? d : e, a.updateProgress(c), n.cssMode) {
    const e = a.isHorizontal();
    if (0 === t) l[e ? "scrollLeft" : "scrollTop"] = -c;else {
      if (!a.support.smoothScroll) return (0, _utilsMin.p)({
        swiper: a,
        targetPosition: -c,
        side: e ? "left" : "top"
      }), !0;
      l.scrollTo({
        [e ? "left" : "top"]: -c,
        behavior: "smooth"
      });
    }
    return !0;
  }
  return 0 === t ? (a.setTransition(0), a.setTranslate(c), s && (a.emit("beforeTransitionStart", t, r), a.emit("transitionEnd"))) : (a.setTransition(t), a.setTranslate(c), s && (a.emit("beforeTransitionStart", t, r), a.emit("transitionStart")), a.animating || (a.animating = !0, a.onTranslateToWrapperTransitionEnd || (a.onTranslateToWrapperTransitionEnd = function (e) {
    a && !a.destroyed && e.target === this && (a.wrapperEl.removeEventListener("transitionend", a.onTranslateToWrapperTransitionEnd), a.onTranslateToWrapperTransitionEnd = null, delete a.onTranslateToWrapperTransitionEnd, s && a.emit("transitionEnd"));
  }), a.wrapperEl.addEventListener("transitionend", a.onTranslateToWrapperTransitionEnd))), !0;
}
var translate = {
  getTranslate: getSwiperTranslate,
  setTranslate: setTranslate,
  minTranslate: minTranslate,
  maxTranslate: maxTranslate,
  translateTo: translateTo
};
function setTransition(e, t) {
  const s = this;
  s.params.cssMode || (s.wrapperEl.style.transitionDuration = `${e}ms`), s.emit("setTransition", e, t);
}
function transitionEmit(e) {
  let {
    swiper: t,
    runCallbacks: s,
    direction: i,
    step: r
  } = e;
  const {
    activeIndex: a,
    previousIndex: n
  } = t;
  let l = i;
  if (l || (l = a > n ? "next" : a < n ? "prev" : "reset"), t.emit(`transition${r}`), s && a !== n) {
    if ("reset" === l) return void t.emit(`slideResetTransition${r}`);
    t.emit(`slideChangeTransition${r}`), "next" === l ? t.emit(`slideNextTransition${r}`) : t.emit(`slidePrevTransition${r}`);
  }
}
function transitionStart(e, t) {
  void 0 === e && (e = !0);
  const s = this,
    {
      params: i
    } = s;
  i.cssMode || (i.autoHeight && s.updateAutoHeight(), transitionEmit({
    swiper: s,
    runCallbacks: e,
    direction: t,
    step: "Start"
  }));
}
function transitionEnd(e, t) {
  void 0 === e && (e = !0);
  const s = this,
    {
      params: i
    } = s;
  s.animating = !1, i.cssMode || (s.setTransition(0), transitionEmit({
    swiper: s,
    runCallbacks: e,
    direction: t,
    step: "End"
  }));
}
var transition = {
  setTransition: setTransition,
  transitionStart: transitionStart,
  transitionEnd: transitionEnd
};
function slideTo(e, t, s, i, r) {
  void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), "string" == typeof e && (e = parseInt(e, 10));
  const a = this;
  let n = e;
  n < 0 && (n = 0);
  const {
    params: l,
    snapGrid: o,
    slidesGrid: d,
    previousIndex: c,
    activeIndex: p,
    rtlTranslate: u,
    wrapperEl: h,
    enabled: m
  } = a;
  if (a.animating && l.preventInteractionOnTransition || !m && !i && !r) return !1;
  const f = Math.min(a.params.slidesPerGroupSkip, n);
  let v = f + Math.floor((n - f) / a.params.slidesPerGroup);
  v >= o.length && (v = o.length - 1);
  const g = -o[v];
  if (l.normalizeSlideIndex) for (let e = 0; e < d.length; e += 1) {
    const t = -Math.floor(100 * g),
      s = Math.floor(100 * d[e]),
      i = Math.floor(100 * d[e + 1]);
    void 0 !== d[e + 1] ? t >= s && t < i - (i - s) / 2 ? n = e : t >= s && t < i && (n = e + 1) : t >= s && (n = e);
  }
  if (a.initialized && n !== p) {
    if (!a.allowSlideNext && (u ? g > a.translate && g > a.minTranslate() : g < a.translate && g < a.minTranslate())) return !1;
    if (!a.allowSlidePrev && g > a.translate && g > a.maxTranslate() && (p || 0) !== n) return !1;
  }
  let w;
  if (n !== (c || 0) && s && a.emit("beforeSlideChangeStart"), a.updateProgress(g), w = n > p ? "next" : n < p ? "prev" : "reset", u && -g === a.translate || !u && g === a.translate) return a.updateActiveIndex(n), l.autoHeight && a.updateAutoHeight(), a.updateSlidesClasses(), "slide" !== l.effect && a.setTranslate(g), "reset" !== w && (a.transitionStart(s, w), a.transitionEnd(s, w)), !1;
  if (l.cssMode) {
    const e = a.isHorizontal(),
      s = u ? g : -g;
    if (0 === t) {
      const t = a.virtual && a.params.virtual.enabled;
      t && (a.wrapperEl.style.scrollSnapType = "none", a._immediateVirtual = !0), t && !a._cssModeVirtualInitialSet && a.params.initialSlide > 0 ? (a._cssModeVirtualInitialSet = !0, requestAnimationFrame(() => {
        h[e ? "scrollLeft" : "scrollTop"] = s;
      })) : h[e ? "scrollLeft" : "scrollTop"] = s, t && requestAnimationFrame(() => {
        a.wrapperEl.style.scrollSnapType = "", a._immediateVirtual = !1;
      });
    } else {
      if (!a.support.smoothScroll) return (0, _utilsMin.p)({
        swiper: a,
        targetPosition: s,
        side: e ? "left" : "top"
      }), !0;
      h.scrollTo({
        [e ? "left" : "top"]: s,
        behavior: "smooth"
      });
    }
    return !0;
  }
  return a.setTransition(t), a.setTranslate(g), a.updateActiveIndex(n), a.updateSlidesClasses(), a.emit("beforeTransitionStart", t, i), a.transitionStart(s, w), 0 === t ? a.transitionEnd(s, w) : a.animating || (a.animating = !0, a.onSlideToWrapperTransitionEnd || (a.onSlideToWrapperTransitionEnd = function (e) {
    a && !a.destroyed && e.target === this && (a.wrapperEl.removeEventListener("transitionend", a.onSlideToWrapperTransitionEnd), a.onSlideToWrapperTransitionEnd = null, delete a.onSlideToWrapperTransitionEnd, a.transitionEnd(s, w));
  }), a.wrapperEl.addEventListener("transitionend", a.onSlideToWrapperTransitionEnd)), !0;
}
function slideToLoop(e, t, s, i) {
  if (void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), "string" == typeof e) {
    e = parseInt(e, 10);
  }
  const r = this;
  let a = e;
  return r.params.loop && (r.virtual && r.params.virtual.enabled ? a += r.virtual.slidesBefore : a = r.getSlideIndexByData(a)), r.slideTo(a, t, s, i);
}
function slideNext(e, t, s) {
  void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
  const i = this,
    {
      enabled: r,
      params: a,
      animating: n
    } = i;
  if (!r) return i;
  let l = a.slidesPerGroup;
  "auto" === a.slidesPerView && 1 === a.slidesPerGroup && a.slidesPerGroupAuto && (l = Math.max(i.slidesPerViewDynamic("current", !0), 1));
  const o = i.activeIndex < a.slidesPerGroupSkip ? 1 : l,
    d = i.virtual && a.virtual.enabled;
  if (a.loop) {
    if (n && !d && a.loopPreventsSliding) return !1;
    i.loopFix({
      direction: "next"
    }), i._clientLeft = i.wrapperEl.clientLeft;
  }
  return a.rewind && i.isEnd ? i.slideTo(0, e, t, s) : i.slideTo(i.activeIndex + o, e, t, s);
}
function slidePrev(e, t, s) {
  void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
  const i = this,
    {
      params: r,
      snapGrid: a,
      slidesGrid: n,
      rtlTranslate: l,
      enabled: o,
      animating: d
    } = i;
  if (!o) return i;
  const c = i.virtual && r.virtual.enabled;
  if (r.loop) {
    if (d && !c && r.loopPreventsSliding) return !1;
    i.loopFix({
      direction: "prev"
    }), i._clientLeft = i.wrapperEl.clientLeft;
  }
  function p(e) {
    return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
  }
  const u = p(l ? i.translate : -i.translate),
    h = a.map(e => p(e));
  let m = a[h.indexOf(u) - 1];
  if (void 0 === m && r.cssMode) {
    let e;
    a.forEach((t, s) => {
      u >= t && (e = s);
    }), void 0 !== e && (m = a[e > 0 ? e - 1 : e]);
  }
  let f = 0;
  if (void 0 !== m && (f = n.indexOf(m), f < 0 && (f = i.activeIndex - 1), "auto" === r.slidesPerView && 1 === r.slidesPerGroup && r.slidesPerGroupAuto && (f = f - i.slidesPerViewDynamic("previous", !0) + 1, f = Math.max(f, 0))), r.rewind && i.isBeginning) {
    const r = i.params.virtual && i.params.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1;
    return i.slideTo(r, e, t, s);
  }
  return i.slideTo(f, e, t, s);
}
function slideReset(e, t, s) {
  void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
  return this.slideTo(this.activeIndex, e, t, s);
}
function slideToClosest(e, t, s, i) {
  void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === i && (i = .5);
  const r = this;
  let a = r.activeIndex;
  const n = Math.min(r.params.slidesPerGroupSkip, a),
    l = n + Math.floor((a - n) / r.params.slidesPerGroup),
    o = r.rtlTranslate ? r.translate : -r.translate;
  if (o >= r.snapGrid[l]) {
    const e = r.snapGrid[l];
    o - e > (r.snapGrid[l + 1] - e) * i && (a += r.params.slidesPerGroup);
  } else {
    const e = r.snapGrid[l - 1];
    o - e <= (r.snapGrid[l] - e) * i && (a -= r.params.slidesPerGroup);
  }
  return a = Math.max(a, 0), a = Math.min(a, r.slidesGrid.length - 1), r.slideTo(a, e, t, s);
}
function slideToClickedSlide() {
  const e = this,
    {
      params: t,
      slidesEl: s
    } = e,
    i = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
  let r,
    a = e.clickedIndex;
  const n = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
  if (t.loop) {
    if (e.animating) return;
    r = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10), t.centeredSlides ? a < e.loopedSlides - i / 2 || a > e.slides.length - e.loopedSlides + i / 2 ? (e.loopFix(), a = e.getSlideIndex((0, _utilsMin.e)(s, `${n}[data-swiper-slide-index="${r}"]`)[0]), (0, _utilsMin.n)(() => {
      e.slideTo(a);
    })) : e.slideTo(a) : a > e.slides.length - i ? (e.loopFix(), a = e.getSlideIndex((0, _utilsMin.e)(s, `${n}[data-swiper-slide-index="${r}"]`)[0]), (0, _utilsMin.n)(() => {
      e.slideTo(a);
    })) : e.slideTo(a);
  } else e.slideTo(a);
}
var slide = {
  slideTo: slideTo,
  slideToLoop: slideToLoop,
  slideNext: slideNext,
  slidePrev: slidePrev,
  slideReset: slideReset,
  slideToClosest: slideToClosest,
  slideToClickedSlide: slideToClickedSlide
};
function loopCreate(e) {
  const t = this,
    {
      params: s,
      slidesEl: i
    } = t;
  if (!s.loop || t.virtual && t.params.virtual.enabled) return;
  (0, _utilsMin.e)(i, `.${s.slideClass}, swiper-slide`).forEach((e, t) => {
    e.setAttribute("data-swiper-slide-index", t);
  }), t.loopFix({
    slideRealIndex: e,
    direction: s.centeredSlides ? void 0 : "next"
  });
}
function loopFix(e) {
  let {
    slideRealIndex: t,
    slideTo: s = !0,
    direction: i,
    setTranslate: r,
    activeSlideIndex: a,
    byController: n,
    byMousewheel: l
  } = void 0 === e ? {} : e;
  const o = this;
  if (!o.params.loop) return;
  o.emit("beforeLoopFix");
  const {
    slides: d,
    allowSlidePrev: c,
    allowSlideNext: p,
    slidesEl: u,
    params: h
  } = o;
  if (o.allowSlidePrev = !0, o.allowSlideNext = !0, o.virtual && h.virtual.enabled) return s && (h.centeredSlides || 0 !== o.snapIndex ? h.centeredSlides && o.snapIndex < h.slidesPerView ? o.slideTo(o.virtual.slides.length + o.snapIndex, 0, !1, !0) : o.snapIndex === o.snapGrid.length - 1 && o.slideTo(o.virtual.slidesBefore, 0, !1, !0) : o.slideTo(o.virtual.slides.length, 0, !1, !0)), o.allowSlidePrev = c, o.allowSlideNext = p, void o.emit("loopFix");
  const m = "auto" === h.slidesPerView ? o.slidesPerViewDynamic() : Math.ceil(parseFloat(h.slidesPerView, 10));
  let f = h.loopedSlides || m;
  f % h.slidesPerGroup != 0 && (f += h.slidesPerGroup - f % h.slidesPerGroup), o.loopedSlides = f;
  const v = [],
    g = [];
  let w = o.activeIndex;
  void 0 === a ? a = o.getSlideIndex(o.slides.filter(e => e.classList.contains(h.slideActiveClass))[0]) : w = a;
  const S = "next" === i || !i,
    T = "prev" === i || !i;
  let b = 0,
    x = 0;
  if (a < f) {
    b = Math.max(f - a, h.slidesPerGroup);
    for (let e = 0; e < f - a; e += 1) {
      const t = e - Math.floor(e / d.length) * d.length;
      v.push(d.length - t - 1);
    }
  } else if (a > o.slides.length - 2 * f) {
    x = Math.max(a - (o.slides.length - 2 * f), h.slidesPerGroup);
    for (let e = 0; e < x; e += 1) {
      const t = e - Math.floor(e / d.length) * d.length;
      g.push(t);
    }
  }
  if (T && v.forEach(e => {
    o.slides[e].swiperLoopMoveDOM = !0, u.prepend(o.slides[e]), o.slides[e].swiperLoopMoveDOM = !1;
  }), S && g.forEach(e => {
    o.slides[e].swiperLoopMoveDOM = !0, u.append(o.slides[e]), o.slides[e].swiperLoopMoveDOM = !1;
  }), o.recalcSlides(), "auto" === h.slidesPerView && o.updateSlides(), h.watchSlidesProgress && o.updateSlidesOffset(), s) if (v.length > 0 && T) {
    if (void 0 === t) {
      const e = o.slidesGrid[w],
        t = o.slidesGrid[w + b] - e;
      l ? o.setTranslate(o.translate - t) : (o.slideTo(w + b, 0, !1, !0), r && (o.touches[o.isHorizontal() ? "startX" : "startY"] += t, o.touchEventsData.currentTranslate = o.translate));
    } else r && (o.slideToLoop(t, 0, !1, !0), o.touchEventsData.currentTranslate = o.translate);
  } else if (g.length > 0 && S) if (void 0 === t) {
    const e = o.slidesGrid[w],
      t = o.slidesGrid[w - x] - e;
    l ? o.setTranslate(o.translate - t) : (o.slideTo(w - x, 0, !1, !0), r && (o.touches[o.isHorizontal() ? "startX" : "startY"] += t, o.touchEventsData.currentTranslate = o.translate));
  } else o.slideToLoop(t, 0, !1, !0);
  if (o.allowSlidePrev = c, o.allowSlideNext = p, o.controller && o.controller.control && !n) {
    const e = {
      slideRealIndex: t,
      slideTo: !1,
      direction: i,
      setTranslate: r,
      activeSlideIndex: a,
      byController: !0
    };
    Array.isArray(o.controller.control) ? o.controller.control.forEach(t => {
      !t.destroyed && t.params.loop && t.loopFix(e);
    }) : o.controller.control instanceof o.constructor && o.controller.control.params.loop && o.controller.control.loopFix(e);
  }
  o.emit("loopFix");
}
function loopDestroy() {
  const e = this,
    {
      params: t,
      slidesEl: s
    } = e;
  if (!t.loop || e.virtual && e.params.virtual.enabled) return;
  e.recalcSlides();
  const i = [];
  e.slides.forEach(e => {
    const t = void 0 === e.swiperSlideIndex ? 1 * e.getAttribute("data-swiper-slide-index") : e.swiperSlideIndex;
    i[t] = e;
  }), e.slides.forEach(e => {
    e.removeAttribute("data-swiper-slide-index");
  }), i.forEach(e => {
    s.append(e);
  }), e.recalcSlides(), e.slideTo(e.realIndex, 0);
}
var loop = {
  loopCreate: loopCreate,
  loopFix: loopFix,
  loopDestroy: loopDestroy
};
function setGrabCursor(e) {
  const t = this;
  if (!t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode) return;
  const s = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
  t.isElement && (t.__preventObserver__ = !0), s.style.cursor = "move", s.style.cursor = e ? "grabbing" : "grab", t.isElement && requestAnimationFrame(() => {
    t.__preventObserver__ = !1;
  });
}
function unsetGrabCursor() {
  const e = this;
  e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.isElement && (e.__preventObserver__ = !0), e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "", e.isElement && requestAnimationFrame(() => {
    e.__preventObserver__ = !1;
  }));
}
var grabCursor = {
  setGrabCursor: setGrabCursor,
  unsetGrabCursor: unsetGrabCursor
};
function closestElement(e, t) {
  return void 0 === t && (t = this), function t(s) {
    if (!s || s === (0, _ssrWindowEsmMin.g)() || s === (0, _ssrWindowEsmMin.a)()) return null;
    s.assignedSlot && (s = s.assignedSlot);
    const i = s.closest(e);
    return i || s.getRootNode ? i || t(s.getRootNode().host) : null;
  }(t);
}
function onTouchStart(e) {
  const t = this,
    s = (0, _ssrWindowEsmMin.g)(),
    i = (0, _ssrWindowEsmMin.a)(),
    r = t.touchEventsData;
  r.evCache.push(e);
  const {
    params: a,
    touches: n,
    enabled: l
  } = t;
  if (!l) return;
  if (!a.simulateTouch && "mouse" === e.pointerType) return;
  if (t.animating && a.preventInteractionOnTransition) return;
  !t.animating && a.cssMode && a.loop && t.loopFix();
  let o = e;
  o.originalEvent && (o = o.originalEvent);
  let d = o.target;
  if ("wrapper" === a.touchEventsTarget && !t.wrapperEl.contains(d)) return;
  if ("which" in o && 3 === o.which) return;
  if ("button" in o && o.button > 0) return;
  if (r.isTouched && r.isMoved) return;
  const c = !!a.noSwipingClass && "" !== a.noSwipingClass,
    p = e.composedPath ? e.composedPath() : e.path;
  c && o.target && o.target.shadowRoot && p && (d = p[0]);
  const u = a.noSwipingSelector ? a.noSwipingSelector : `.${a.noSwipingClass}`,
    h = !(!o.target || !o.target.shadowRoot);
  if (a.noSwiping && (h ? closestElement(u, d) : d.closest(u))) return void (t.allowClick = !0);
  if (a.swipeHandler && !d.closest(a.swipeHandler)) return;
  n.currentX = o.pageX, n.currentY = o.pageY;
  const m = n.currentX,
    f = n.currentY,
    v = a.edgeSwipeDetection || a.iOSEdgeSwipeDetection,
    g = a.edgeSwipeThreshold || a.iOSEdgeSwipeThreshold;
  if (v && (m <= g || m >= i.innerWidth - g)) {
    if ("prevent" !== v) return;
    e.preventDefault();
  }
  Object.assign(r, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0
  }), n.startX = m, n.startY = f, r.touchStartTime = (0, _utilsMin.d)(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, a.threshold > 0 && (r.allowThresholdMove = !1);
  let w = !0;
  d.matches(r.focusableElements) && (w = !1, "SELECT" === d.nodeName && (r.isTouched = !1)), s.activeElement && s.activeElement.matches(r.focusableElements) && s.activeElement !== d && s.activeElement.blur();
  const S = w && t.allowTouchMove && a.touchStartPreventDefault;
  !a.touchStartForcePreventDefault && !S || d.isContentEditable || o.preventDefault(), a.freeMode && a.freeMode.enabled && t.freeMode && t.animating && !a.cssMode && t.freeMode.onTouchStart(), t.emit("touchStart", o);
}
function onTouchMove(e) {
  const t = (0, _ssrWindowEsmMin.g)(),
    s = this,
    i = s.touchEventsData,
    {
      params: r,
      touches: a,
      rtlTranslate: n,
      enabled: l
    } = s;
  if (!l) return;
  if (!r.simulateTouch && "mouse" === e.pointerType) return;
  let o = e;
  if (o.originalEvent && (o = o.originalEvent), !i.isTouched) return void (i.startMoving && i.isScrolling && s.emit("touchMoveOpposite", o));
  const d = i.evCache.findIndex(e => e.pointerId === o.pointerId);
  d >= 0 && (i.evCache[d] = o);
  const c = i.evCache.length > 1 ? i.evCache[0] : o,
    p = c.pageX,
    u = c.pageY;
  if (o.preventedByNestedSwiper) return a.startX = p, void (a.startY = u);
  if (!s.allowTouchMove) return o.target.matches(i.focusableElements) || (s.allowClick = !1), void (i.isTouched && (Object.assign(a, {
    startX: p,
    startY: u,
    prevX: s.touches.currentX,
    prevY: s.touches.currentY,
    currentX: p,
    currentY: u
  }), i.touchStartTime = (0, _utilsMin.d)()));
  if (r.touchReleaseOnEdges && !r.loop) if (s.isVertical()) {
    if (u < a.startY && s.translate <= s.maxTranslate() || u > a.startY && s.translate >= s.minTranslate()) return i.isTouched = !1, void (i.isMoved = !1);
  } else if (p < a.startX && s.translate <= s.maxTranslate() || p > a.startX && s.translate >= s.minTranslate()) return;
  if (t.activeElement && o.target === t.activeElement && o.target.matches(i.focusableElements)) return i.isMoved = !0, void (s.allowClick = !1);
  if (i.allowTouchCallbacks && s.emit("touchMove", o), o.targetTouches && o.targetTouches.length > 1) return;
  a.currentX = p, a.currentY = u;
  const h = a.currentX - a.startX,
    m = a.currentY - a.startY;
  if (s.params.threshold && Math.sqrt(h ** 2 + m ** 2) < s.params.threshold) return;
  if (void 0 === i.isScrolling) {
    let e;
    s.isHorizontal() && a.currentY === a.startY || s.isVertical() && a.currentX === a.startX ? i.isScrolling = !1 : h * h + m * m >= 25 && (e = 180 * Math.atan2(Math.abs(m), Math.abs(h)) / Math.PI, i.isScrolling = s.isHorizontal() ? e > r.touchAngle : 90 - e > r.touchAngle);
  }
  if (i.isScrolling && s.emit("touchMoveOpposite", o), void 0 === i.startMoving && (a.currentX === a.startX && a.currentY === a.startY || (i.startMoving = !0)), i.isScrolling || s.zoom && s.params.zoom && s.params.zoom.enabled && i.evCache.length > 1) return void (i.isTouched = !1);
  if (!i.startMoving) return;
  s.allowClick = !1, !r.cssMode && o.cancelable && o.preventDefault(), r.touchMoveStopPropagation && !r.nested && o.stopPropagation();
  let f = s.isHorizontal() ? h : m,
    v = s.isHorizontal() ? a.currentX - a.previousX : a.currentY - a.previousY;
  r.oneWayMovement && (f = Math.abs(f) * (n ? 1 : -1), v = Math.abs(v) * (n ? 1 : -1)), a.diff = f, f *= r.touchRatio, n && (f = -f, v = -v);
  const g = s.touchesDirection;
  s.swipeDirection = f > 0 ? "prev" : "next", s.touchesDirection = v > 0 ? "prev" : "next";
  const w = s.params.loop && !r.cssMode;
  if (!i.isMoved) {
    if (w && s.loopFix({
      direction: s.swipeDirection
    }), i.startTranslate = s.getTranslate(), s.setTransition(0), s.animating) {
      const e = new window.CustomEvent("transitionend", {
        bubbles: !0,
        cancelable: !0
      });
      s.wrapperEl.dispatchEvent(e);
    }
    i.allowMomentumBounce = !1, !r.grabCursor || !0 !== s.allowSlideNext && !0 !== s.allowSlidePrev || s.setGrabCursor(!0), s.emit("sliderFirstMove", o);
  }
  let S;
  i.isMoved && g !== s.touchesDirection && w && Math.abs(f) >= 1 && (s.loopFix({
    direction: s.swipeDirection,
    setTranslate: !0
  }), S = !0), s.emit("sliderMove", o), i.isMoved = !0, i.currentTranslate = f + i.startTranslate;
  let T = !0,
    b = r.resistanceRatio;
  if (r.touchReleaseOnEdges && (b = 0), f > 0 ? (w && !S && i.currentTranslate > (r.centeredSlides ? s.minTranslate() - s.size / 2 : s.minTranslate()) && s.loopFix({
    direction: "prev",
    setTranslate: !0,
    activeSlideIndex: 0
  }), i.currentTranslate > s.minTranslate() && (T = !1, r.resistance && (i.currentTranslate = s.minTranslate() - 1 + (-s.minTranslate() + i.startTranslate + f) ** b))) : f < 0 && (w && !S && i.currentTranslate < (r.centeredSlides ? s.maxTranslate() + s.size / 2 : s.maxTranslate()) && s.loopFix({
    direction: "next",
    setTranslate: !0,
    activeSlideIndex: s.slides.length - ("auto" === r.slidesPerView ? s.slidesPerViewDynamic() : Math.ceil(parseFloat(r.slidesPerView, 10)))
  }), i.currentTranslate < s.maxTranslate() && (T = !1, r.resistance && (i.currentTranslate = s.maxTranslate() + 1 - (s.maxTranslate() - i.startTranslate - f) ** b))), T && (o.preventedByNestedSwiper = !0), !s.allowSlideNext && "next" === s.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !s.allowSlidePrev && "prev" === s.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), s.allowSlidePrev || s.allowSlideNext || (i.currentTranslate = i.startTranslate), r.threshold > 0) {
    if (!(Math.abs(f) > r.threshold || i.allowThresholdMove)) return void (i.currentTranslate = i.startTranslate);
    if (!i.allowThresholdMove) return i.allowThresholdMove = !0, a.startX = a.currentX, a.startY = a.currentY, i.currentTranslate = i.startTranslate, void (a.diff = s.isHorizontal() ? a.currentX - a.startX : a.currentY - a.startY);
  }
  r.followFinger && !r.cssMode && ((r.freeMode && r.freeMode.enabled && s.freeMode || r.watchSlidesProgress) && (s.updateActiveIndex(), s.updateSlidesClasses()), r.freeMode && r.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(), s.updateProgress(i.currentTranslate), s.setTranslate(i.currentTranslate));
}
function onTouchEnd(e) {
  const t = this,
    s = t.touchEventsData,
    i = s.evCache.findIndex(t => t.pointerId === e.pointerId);
  if (i >= 0 && s.evCache.splice(i, 1), ["pointercancel", "pointerout", "pointerleave"].includes(e.type)) {
    if (!("pointercancel" === e.type && (t.browser.isSafari || t.browser.isWebView))) return;
  }
  const {
    params: r,
    touches: a,
    rtlTranslate: n,
    slidesGrid: l,
    enabled: o
  } = t;
  if (!o) return;
  if (!r.simulateTouch && "mouse" === e.pointerType) return;
  let d = e;
  if (d.originalEvent && (d = d.originalEvent), s.allowTouchCallbacks && t.emit("touchEnd", d), s.allowTouchCallbacks = !1, !s.isTouched) return s.isMoved && r.grabCursor && t.setGrabCursor(!1), s.isMoved = !1, void (s.startMoving = !1);
  r.grabCursor && s.isMoved && s.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
  const c = (0, _utilsMin.d)(),
    p = c - s.touchStartTime;
  if (t.allowClick) {
    const e = d.path || d.composedPath && d.composedPath();
    t.updateClickedSlide(e && e[0] || d.target), t.emit("tap click", d), p < 300 && c - s.lastClickTime < 300 && t.emit("doubleTap doubleClick", d);
  }
  if (s.lastClickTime = (0, _utilsMin.d)(), (0, _utilsMin.n)(() => {
    t.destroyed || (t.allowClick = !0);
  }), !s.isTouched || !s.isMoved || !t.swipeDirection || 0 === a.diff || s.currentTranslate === s.startTranslate) return s.isTouched = !1, s.isMoved = !1, void (s.startMoving = !1);
  let u;
  if (s.isTouched = !1, s.isMoved = !1, s.startMoving = !1, u = r.followFinger ? n ? t.translate : -t.translate : -s.currentTranslate, r.cssMode) return;
  if (r.freeMode && r.freeMode.enabled) return void t.freeMode.onTouchEnd({
    currentPos: u
  });
  let h = 0,
    m = t.slidesSizesGrid[0];
  for (let e = 0; e < l.length; e += e < r.slidesPerGroupSkip ? 1 : r.slidesPerGroup) {
    const t = e < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
    void 0 !== l[e + t] ? u >= l[e] && u < l[e + t] && (h = e, m = l[e + t] - l[e]) : u >= l[e] && (h = e, m = l[l.length - 1] - l[l.length - 2]);
  }
  let f = null,
    v = null;
  r.rewind && (t.isBeginning ? v = r.virtual && r.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (f = 0));
  const g = (u - l[h]) / m,
    w = h < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
  if (p > r.longSwipesMs) {
    if (!r.longSwipes) return void t.slideTo(t.activeIndex);
    "next" === t.swipeDirection && (g >= r.longSwipesRatio ? t.slideTo(r.rewind && t.isEnd ? f : h + w) : t.slideTo(h)), "prev" === t.swipeDirection && (g > 1 - r.longSwipesRatio ? t.slideTo(h + w) : null !== v && g < 0 && Math.abs(g) > r.longSwipesRatio ? t.slideTo(v) : t.slideTo(h));
  } else {
    if (!r.shortSwipes) return void t.slideTo(t.activeIndex);
    t.navigation && (d.target === t.navigation.nextEl || d.target === t.navigation.prevEl) ? d.target === t.navigation.nextEl ? t.slideTo(h + w) : t.slideTo(h) : ("next" === t.swipeDirection && t.slideTo(null !== f ? f : h + w), "prev" === t.swipeDirection && t.slideTo(null !== v ? v : h));
  }
}
function onResize() {
  const e = this,
    {
      params: t,
      el: s
    } = e;
  if (s && 0 === s.offsetWidth) return;
  t.breakpoints && e.setBreakpoint();
  const {
      allowSlideNext: i,
      allowSlidePrev: r,
      snapGrid: a
    } = e,
    n = e.virtual && e.params.virtual.enabled;
  e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses();
  const l = n && t.loop;
  !("auto" === t.slidesPerView || t.slidesPerView > 1) || !e.isEnd || e.isBeginning || e.params.centeredSlides || l ? e.params.loop && !n ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0) : e.slideTo(e.slides.length - 1, 0, !1, !0), e.autoplay && e.autoplay.running && e.autoplay.paused && (clearTimeout(e.autoplay.resizeTimeout), e.autoplay.resizeTimeout = setTimeout(() => {
    e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume();
  }, 500)), e.allowSlidePrev = r, e.allowSlideNext = i, e.params.watchOverflow && a !== e.snapGrid && e.checkOverflow();
}
function onClick(e) {
  const t = this;
  t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation())));
}
function onScroll() {
  const e = this,
    {
      wrapperEl: t,
      rtlTranslate: s,
      enabled: i
    } = e;
  if (!i) return;
  let r;
  e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop, 0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
  const a = e.maxTranslate() - e.minTranslate();
  r = 0 === a ? 0 : (e.translate - e.minTranslate()) / a, r !== e.progress && e.updateProgress(s ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1);
}
function onLoad(e) {
  const t = this;
  processLazyPreloader(t, e.target), t.params.cssMode || "auto" !== t.params.slidesPerView && !t.params.autoHeight || t.update();
}
let dummyEventAttached = !1;
function dummyEventListener() {}
const events = (e, t) => {
  const s = (0, _ssrWindowEsmMin.g)(),
    {
      params: i,
      el: r,
      wrapperEl: a,
      device: n
    } = e,
    l = !!i.nested,
    o = "on" === t ? "addEventListener" : "removeEventListener",
    d = t;
  r[o]("pointerdown", e.onTouchStart, {
    passive: !1
  }), s[o]("pointermove", e.onTouchMove, {
    passive: !1,
    capture: l
  }), s[o]("pointerup", e.onTouchEnd, {
    passive: !0
  }), s[o]("pointercancel", e.onTouchEnd, {
    passive: !0
  }), s[o]("pointerout", e.onTouchEnd, {
    passive: !0
  }), s[o]("pointerleave", e.onTouchEnd, {
    passive: !0
  }), (i.preventClicks || i.preventClicksPropagation) && r[o]("click", e.onClick, !0), i.cssMode && a[o]("scroll", e.onScroll), i.updateOnWindowResize ? e[d](n.ios || n.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, !0) : e[d]("observerUpdate", onResize, !0), r[o]("load", e.onLoad, {
    capture: !0
  });
};
function attachEvents() {
  const e = this,
    t = (0, _ssrWindowEsmMin.g)(),
    {
      params: s
    } = e;
  e.onTouchStart = onTouchStart.bind(e), e.onTouchMove = onTouchMove.bind(e), e.onTouchEnd = onTouchEnd.bind(e), s.cssMode && (e.onScroll = onScroll.bind(e)), e.onClick = onClick.bind(e), e.onLoad = onLoad.bind(e), dummyEventAttached || (t.addEventListener("touchstart", dummyEventListener), dummyEventAttached = !0), events(e, "on");
}
function detachEvents() {
  events(this, "off");
}
var events$1 = {
  attachEvents: attachEvents,
  detachEvents: detachEvents
};
const isGridEnabled = (e, t) => e.grid && t.grid && t.grid.rows > 1;
function setBreakpoint() {
  const e = this,
    {
      realIndex: t,
      initialized: s,
      params: i,
      el: r
    } = e,
    a = i.breakpoints;
  if (!a || a && 0 === Object.keys(a).length) return;
  const n = e.getBreakpoint(a, e.params.breakpointsBase, e.el);
  if (!n || e.currentBreakpoint === n) return;
  const l = (n in a ? a[n] : void 0) || e.originalParams,
    o = isGridEnabled(e, i),
    d = isGridEnabled(e, l),
    c = i.enabled;
  o && !d ? (r.classList.remove(`${i.containerModifierClass}grid`, `${i.containerModifierClass}grid-column`), e.emitContainerClasses()) : !o && d && (r.classList.add(`${i.containerModifierClass}grid`), (l.grid.fill && "column" === l.grid.fill || !l.grid.fill && "column" === i.grid.fill) && r.classList.add(`${i.containerModifierClass}grid-column`), e.emitContainerClasses()), ["navigation", "pagination", "scrollbar"].forEach(t => {
    if (void 0 === l[t]) return;
    const s = i[t] && i[t].enabled,
      r = l[t] && l[t].enabled;
    s && !r && e[t].disable(), !s && r && e[t].enable();
  });
  const p = l.direction && l.direction !== i.direction,
    u = i.loop && (l.slidesPerView !== i.slidesPerView || p);
  p && s && e.changeDirection(), (0, _utilsMin.q)(e.params, l);
  const h = e.params.enabled;
  Object.assign(e, {
    allowTouchMove: e.params.allowTouchMove,
    allowSlideNext: e.params.allowSlideNext,
    allowSlidePrev: e.params.allowSlidePrev
  }), c && !h ? e.disable() : !c && h && e.enable(), e.currentBreakpoint = n, e.emit("_beforeBreakpoint", l), u && s && (e.loopDestroy(), e.loopCreate(t), e.updateSlides()), e.emit("breakpoint", l);
}
function getBreakpoint(e, t, s) {
  if (void 0 === t && (t = "window"), !e || "container" === t && !s) return;
  let i = !1;
  const r = (0, _ssrWindowEsmMin.a)(),
    a = "window" === t ? r.innerHeight : s.clientHeight,
    n = Object.keys(e).map(e => {
      if ("string" == typeof e && 0 === e.indexOf("@")) {
        const t = parseFloat(e.substr(1));
        return {
          value: a * t,
          point: e
        };
      }
      return {
        value: e,
        point: e
      };
    });
  n.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
  for (let e = 0; e < n.length; e += 1) {
    const {
      point: a,
      value: l
    } = n[e];
    "window" === t ? r.matchMedia(`(min-width: ${l}px)`).matches && (i = a) : l <= s.clientWidth && (i = a);
  }
  return i || "max";
}
var breakpoints = {
  setBreakpoint: setBreakpoint,
  getBreakpoint: getBreakpoint
};
function prepareClasses(e, t) {
  const s = [];
  return e.forEach(e => {
    "object" == typeof e ? Object.keys(e).forEach(i => {
      e[i] && s.push(t + i);
    }) : "string" == typeof e && s.push(t + e);
  }), s;
}
function addClasses() {
  const e = this,
    {
      classNames: t,
      params: s,
      rtl: i,
      el: r,
      device: a
    } = e,
    n = prepareClasses(["initialized", s.direction, {
      "free-mode": e.params.freeMode && s.freeMode.enabled
    }, {
      autoheight: s.autoHeight
    }, {
      rtl: i
    }, {
      grid: s.grid && s.grid.rows > 1
    }, {
      "grid-column": s.grid && s.grid.rows > 1 && "column" === s.grid.fill
    }, {
      android: a.android
    }, {
      ios: a.ios
    }, {
      "css-mode": s.cssMode
    }, {
      centered: s.cssMode && s.centeredSlides
    }, {
      "watch-progress": s.watchSlidesProgress
    }], s.containerModifierClass);
  t.push(...n), r.classList.add(...t), e.emitContainerClasses();
}
function removeClasses() {
  const {
    el: e,
    classNames: t
  } = this;
  e.classList.remove(...t), this.emitContainerClasses();
}
var classes = {
  addClasses: addClasses,
  removeClasses: removeClasses
};
function checkOverflow() {
  const e = this,
    {
      isLocked: t,
      params: s
    } = e,
    {
      slidesOffsetBefore: i
    } = s;
  if (i) {
    const t = e.slides.length - 1,
      s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
    e.isLocked = e.size > s;
  } else e.isLocked = 1 === e.snapGrid.length;
  !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked), !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked), t && t !== e.isLocked && (e.isEnd = !1), t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
}
var checkOverflow$1 = {
    checkOverflow: checkOverflow
  },
  defaults = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: .5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: .85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopedSlides: null,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1
  };
exports.d = defaults;
function moduleExtendParams(e, t) {
  return function (s) {
    void 0 === s && (s = {});
    const i = Object.keys(s)[0],
      r = s[i];
    "object" == typeof r && null !== r ? (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 && !0 === e[i] && (e[i] = {
      auto: !0
    }), i in e && "enabled" in r ? (!0 === e[i] && (e[i] = {
      enabled: !0
    }), "object" != typeof e[i] || "enabled" in e[i] || (e[i].enabled = !0), e[i] || (e[i] = {
      enabled: !1
    }), (0, _utilsMin.q)(t, s)) : (0, _utilsMin.q)(t, s)) : (0, _utilsMin.q)(t, s);
  };
}
const prototypes = {
    eventsEmitter: eventsEmitter,
    update: update,
    translate: translate,
    transition: transition,
    slide: slide,
    loop: loop,
    grabCursor: grabCursor,
    events: events$1,
    breakpoints: breakpoints,
    checkOverflow: checkOverflow$1,
    classes: classes
  },
  extendedDefaults = {};
class Swiper {
  constructor() {
    let e, t;
    for (var s = arguments.length, i = new Array(s), r = 0; r < s; r++) i[r] = arguments[r];
    1 === i.length && i[0].constructor && "Object" === Object.prototype.toString.call(i[0]).slice(8, -1) ? t = i[0] : [e, t] = i, t || (t = {}), t = (0, _utilsMin.q)({}, t), e && !t.el && (t.el = e);
    const a = (0, _ssrWindowEsmMin.g)();
    if (t.el && "string" == typeof t.el && a.querySelectorAll(t.el).length > 1) {
      const e = [];
      return a.querySelectorAll(t.el).forEach(s => {
        const i = (0, _utilsMin.q)({}, t, {
          el: s
        });
        e.push(new Swiper(i));
      }), e;
    }
    const n = this;
    n.__swiper__ = !0, n.support = getSupport(), n.device = getDevice({
      userAgent: t.userAgent
    }), n.browser = getBrowser(), n.eventsListeners = {}, n.eventsAnyListeners = [], n.modules = [...n.__modules__], t.modules && Array.isArray(t.modules) && n.modules.push(...t.modules);
    const l = {};
    n.modules.forEach(e => {
      e({
        params: t,
        swiper: n,
        extendParams: moduleExtendParams(t, l),
        on: n.on.bind(n),
        once: n.once.bind(n),
        off: n.off.bind(n),
        emit: n.emit.bind(n)
      });
    });
    const o = (0, _utilsMin.q)({}, defaults, l);
    return n.params = (0, _utilsMin.q)({}, o, extendedDefaults, t), n.originalParams = (0, _utilsMin.q)({}, n.params), n.passedParams = (0, _utilsMin.q)({}, t), n.params && n.params.on && Object.keys(n.params.on).forEach(e => {
      n.on(e, n.params.on[e]);
    }), n.params && n.params.onAny && n.onAny(n.params.onAny), Object.assign(n, {
      enabled: n.params.enabled,
      el: e,
      classNames: [],
      slides: [],
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      isHorizontal: () => "horizontal" === n.params.direction,
      isVertical: () => "vertical" === n.params.direction,
      activeIndex: 0,
      realIndex: 0,
      isBeginning: !0,
      isEnd: !1,
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: !1,
      cssOverflowAdjustment() {
        return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
      },
      allowSlideNext: n.params.allowSlideNext,
      allowSlidePrev: n.params.allowSlidePrev,
      touchEventsData: {
        isTouched: void 0,
        isMoved: void 0,
        allowTouchCallbacks: void 0,
        touchStartTime: void 0,
        isScrolling: void 0,
        currentTranslate: void 0,
        startTranslate: void 0,
        allowThresholdMove: void 0,
        focusableElements: n.params.focusableElements,
        lastClickTime: 0,
        clickTimeout: void 0,
        velocities: [],
        allowMomentumBounce: void 0,
        startMoving: void 0,
        evCache: []
      },
      allowClick: !0,
      allowTouchMove: n.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      imagesToLoad: [],
      imagesLoaded: 0
    }), n.emit("_swiper"), n.params.init && n.init(), n;
  }
  getSlideIndex(e) {
    const {
        slidesEl: t,
        params: s
      } = this,
      i = (0, _utilsMin.e)(t, `.${s.slideClass}, swiper-slide`),
      r = (0, _utilsMin.g)(i[0]);
    return (0, _utilsMin.g)(e) - r;
  }
  getSlideIndexByData(e) {
    return this.getSlideIndex(this.slides.filter(t => 1 * t.getAttribute("data-swiper-slide-index") === e)[0]);
  }
  recalcSlides() {
    const {
      slidesEl: e,
      params: t
    } = this;
    this.slides = (0, _utilsMin.e)(e, `.${t.slideClass}, swiper-slide`);
  }
  enable() {
    const e = this;
    e.enabled || (e.enabled = !0, e.params.grabCursor && e.setGrabCursor(), e.emit("enable"));
  }
  disable() {
    const e = this;
    e.enabled && (e.enabled = !1, e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"));
  }
  setProgress(e, t) {
    const s = this;
    e = Math.min(Math.max(e, 0), 1);
    const i = s.minTranslate(),
      r = (s.maxTranslate() - i) * e + i;
    s.translateTo(r, void 0 === t ? 0 : t), s.updateActiveIndex(), s.updateSlidesClasses();
  }
  emitContainerClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const t = e.el.className.split(" ").filter(t => 0 === t.indexOf("swiper") || 0 === t.indexOf(e.params.containerModifierClass));
    e.emit("_containerClasses", t.join(" "));
  }
  getSlideClasses(e) {
    const t = this;
    return t.destroyed ? "" : e.className.split(" ").filter(e => 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass)).join(" ");
  }
  emitSlidesClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const t = [];
    e.slides.forEach(s => {
      const i = e.getSlideClasses(s);
      t.push({
        slideEl: s,
        classNames: i
      }), e.emit("_slideClass", s, i);
    }), e.emit("_slideClasses", t);
  }
  slidesPerViewDynamic(e, t) {
    void 0 === e && (e = "current"), void 0 === t && (t = !1);
    const {
      params: s,
      slides: i,
      slidesGrid: r,
      slidesSizesGrid: a,
      size: n,
      activeIndex: l
    } = this;
    let o = 1;
    if (s.centeredSlides) {
      let e,
        t = i[l] ? i[l].swiperSlideSize : 0;
      for (let s = l + 1; s < i.length; s += 1) i[s] && !e && (t += i[s].swiperSlideSize, o += 1, t > n && (e = !0));
      for (let s = l - 1; s >= 0; s -= 1) i[s] && !e && (t += i[s].swiperSlideSize, o += 1, t > n && (e = !0));
    } else if ("current" === e) for (let e = l + 1; e < i.length; e += 1) {
      (t ? r[e] + a[e] - r[l] < n : r[e] - r[l] < n) && (o += 1);
    } else for (let e = l - 1; e >= 0; e -= 1) {
      r[l] - r[e] < n && (o += 1);
    }
    return o;
  }
  update() {
    const e = this;
    if (!e || e.destroyed) return;
    const {
      snapGrid: t,
      params: s
    } = e;
    function i() {
      const t = e.rtlTranslate ? -1 * e.translate : e.translate,
        s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
      e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
    }
    let r;
    if (s.breakpoints && e.setBreakpoint(), [...e.el.querySelectorAll('[loading="lazy"]')].forEach(t => {
      t.complete && processLazyPreloader(e, t);
    }), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), s.freeMode && s.freeMode.enabled && !s.cssMode) i(), s.autoHeight && e.updateAutoHeight();else {
      if (("auto" === s.slidesPerView || s.slidesPerView > 1) && e.isEnd && !s.centeredSlides) {
        const t = e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
        r = e.slideTo(t.length - 1, 0, !1, !0);
      } else r = e.slideTo(e.activeIndex, 0, !1, !0);
      r || i();
    }
    s.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update");
  }
  changeDirection(e, t) {
    void 0 === t && (t = !0);
    const s = this,
      i = s.params.direction;
    return e || (e = "horizontal" === i ? "vertical" : "horizontal"), e === i || "horizontal" !== e && "vertical" !== e || (s.el.classList.remove(`${s.params.containerModifierClass}${i}`), s.el.classList.add(`${s.params.containerModifierClass}${e}`), s.emitContainerClasses(), s.params.direction = e, s.slides.forEach(t => {
      "vertical" === e ? t.style.width = "" : t.style.height = "";
    }), s.emit("changeDirection"), t && s.update()), s;
  }
  changeLanguageDirection(e) {
    const t = this;
    t.rtl && "rtl" === e || !t.rtl && "ltr" === e || (t.rtl = "rtl" === e, t.rtlTranslate = "horizontal" === t.params.direction && t.rtl, t.rtl ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`), t.el.dir = "rtl") : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`), t.el.dir = "ltr"), t.update());
  }
  mount(e) {
    const t = this;
    if (t.mounted) return !0;
    let s = e || t.params.el;
    if ("string" == typeof s && (s = document.querySelector(s)), !s) return !1;
    s.swiper = t, s.parentNode && s.parentNode.host && "SWIPER-CONTAINER" === s.parentNode.host.nodeName && (t.isElement = !0);
    const i = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let r = (() => {
      if (s && s.shadowRoot && s.shadowRoot.querySelector) {
        return s.shadowRoot.querySelector(i());
      }
      return (0, _utilsMin.e)(s, i())[0];
    })();
    return !r && t.params.createElements && (r = (0, _utilsMin.c)("div", t.params.wrapperClass), s.append(r), (0, _utilsMin.e)(s, `.${t.params.slideClass}`).forEach(e => {
      r.append(e);
    })), Object.assign(t, {
      el: s,
      wrapperEl: r,
      slidesEl: t.isElement && !s.parentNode.host.slideSlots ? s.parentNode.host : r,
      hostEl: t.isElement ? s.parentNode.host : s,
      mounted: !0,
      rtl: "rtl" === s.dir.toLowerCase() || "rtl" === (0, _utilsMin.l)(s, "direction"),
      rtlTranslate: "horizontal" === t.params.direction && ("rtl" === s.dir.toLowerCase() || "rtl" === (0, _utilsMin.l)(s, "direction")),
      wrongRTL: "-webkit-box" === (0, _utilsMin.l)(r, "display")
    }), !0;
  }
  init(e) {
    const t = this;
    if (t.initialized) return t;
    return !1 === t.mount(e) || (t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.loop && t.virtual && t.params.virtual.enabled ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.params.loop && t.loopCreate(), t.attachEvents(), [...t.el.querySelectorAll('[loading="lazy"]')].forEach(e => {
      e.complete ? processLazyPreloader(t, e) : e.addEventListener("load", e => {
        processLazyPreloader(t, e.target);
      });
    }), preload(t), t.initialized = !0, preload(t), t.emit("init"), t.emit("afterInit")), t;
  }
  destroy(e, t) {
    void 0 === e && (e = !0), void 0 === t && (t = !0);
    const s = this,
      {
        params: i,
        el: r,
        wrapperEl: a,
        slides: n
      } = s;
    return void 0 === s.params || s.destroyed || (s.emit("beforeDestroy"), s.initialized = !1, s.detachEvents(), i.loop && s.loopDestroy(), t && (s.removeClasses(), r.removeAttribute("style"), a.removeAttribute("style"), n && n.length && n.forEach(e => {
      e.classList.remove(i.slideVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass), e.removeAttribute("style"), e.removeAttribute("data-swiper-slide-index");
    })), s.emit("destroy"), Object.keys(s.eventsListeners).forEach(e => {
      s.off(e);
    }), !1 !== e && (s.el.swiper = null, (0, _utilsMin.r)(s)), s.destroyed = !0), null;
  }
  static extendDefaults(e) {
    (0, _utilsMin.q)(extendedDefaults, e);
  }
  static get extendedDefaults() {
    return extendedDefaults;
  }
  static get defaults() {
    return defaults;
  }
  static installModule(e) {
    Swiper.prototype.__modules__ || (Swiper.prototype.__modules__ = []);
    const t = Swiper.prototype.__modules__;
    "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
  }
  static use(e) {
    return Array.isArray(e) ? (e.forEach(e => Swiper.installModule(e)), Swiper) : (Swiper.installModule(e), Swiper);
  }
}
exports.S = Swiper;
Object.keys(prototypes).forEach(e => {
  Object.keys(prototypes[e]).forEach(t => {
    Swiper.prototype[t] = prototypes[e][t];
  });
}), Swiper.use([Resize, Observer]);

},{"./ssr-window.esm.min.mjs":33,"./utils.min.mjs":35}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.a = elementParents;
exports.b = elementOffset;
exports.c = createElement;
exports.d = now;
exports.e = elementChildren;
exports.f = elementOuterSize;
exports.g = elementIndex;
exports.h = getTranslate;
exports.i = elementTransitionEnd;
exports.j = isObject;
exports.k = getSlideTransformEl;
exports.l = elementStyle;
exports.m = elementNextAll;
exports.n = nextTick;
exports.o = elementPrevAll;
exports.p = animateCSSModeScroll;
exports.q = extend;
exports.r = deleteProps;
exports.s = setCSSProperty;
var _ssrWindowEsmMin = require("./ssr-window.esm.min.mjs");
function deleteProps(e) {
  const t = e;
  Object.keys(t).forEach(e => {
    try {
      t[e] = null;
    } catch (e) {}
    try {
      delete t[e];
    } catch (e) {}
  });
}
function nextTick(e, t) {
  return void 0 === t && (t = 0), setTimeout(e, t);
}
function now() {
  return Date.now();
}
function getComputedStyle(e) {
  const t = (0, _ssrWindowEsmMin.a)();
  let n;
  return t.getComputedStyle && (n = t.getComputedStyle(e, null)), !n && e.currentStyle && (n = e.currentStyle), n || (n = e.style), n;
}
function getTranslate(e, t) {
  void 0 === t && (t = "x");
  const n = (0, _ssrWindowEsmMin.a)();
  let r, o, l;
  const s = getComputedStyle(e);
  return n.WebKitCSSMatrix ? (o = s.transform || s.webkitTransform, o.split(",").length > 6 && (o = o.split(", ").map(e => e.replace(",", ".")).join(", ")), l = new n.WebKitCSSMatrix("none" === o ? "" : o)) : (l = s.MozTransform || s.OTransform || s.MsTransform || s.msTransform || s.transform || s.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), r = l.toString().split(",")), "x" === t && (o = n.WebKitCSSMatrix ? l.m41 : 16 === r.length ? parseFloat(r[12]) : parseFloat(r[4])), "y" === t && (o = n.WebKitCSSMatrix ? l.m42 : 16 === r.length ? parseFloat(r[13]) : parseFloat(r[5])), o || 0;
}
function isObject(e) {
  return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1);
}
function isNode(e) {
  return "undefined" != typeof window && void 0 !== window.HTMLElement ? e instanceof HTMLElement : e && (1 === e.nodeType || 11 === e.nodeType);
}
function extend() {
  const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
    t = ["__proto__", "constructor", "prototype"];
  for (let n = 1; n < arguments.length; n += 1) {
    const r = n < 0 || arguments.length <= n ? void 0 : arguments[n];
    if (null != r && !isNode(r)) {
      const n = Object.keys(Object(r)).filter(e => t.indexOf(e) < 0);
      for (let t = 0, o = n.length; t < o; t += 1) {
        const o = n[t],
          l = Object.getOwnPropertyDescriptor(r, o);
        void 0 !== l && l.enumerable && (isObject(e[o]) && isObject(r[o]) ? r[o].__swiper__ ? e[o] = r[o] : extend(e[o], r[o]) : !isObject(e[o]) && isObject(r[o]) ? (e[o] = {}, r[o].__swiper__ ? e[o] = r[o] : extend(e[o], r[o])) : e[o] = r[o]);
      }
    }
  }
  return e;
}
function setCSSProperty(e, t, n) {
  e.style.setProperty(t, n);
}
function animateCSSModeScroll(e) {
  let {
    swiper: t,
    targetPosition: n,
    side: r
  } = e;
  const o = (0, _ssrWindowEsmMin.a)(),
    l = -t.translate;
  let s,
    i = null;
  const a = t.params.speed;
  t.wrapperEl.style.scrollSnapType = "none", o.cancelAnimationFrame(t.cssModeFrameID);
  const c = n > l ? "next" : "prev",
    m = (e, t) => "next" === c && e >= t || "prev" === c && e <= t,
    u = () => {
      s = new Date().getTime(), null === i && (i = s);
      const e = Math.max(Math.min((s - i) / a, 1), 0),
        c = .5 - Math.cos(e * Math.PI) / 2;
      let p = l + c * (n - l);
      if (m(p, n) && (p = n), t.wrapperEl.scrollTo({
        [r]: p
      }), m(p, n)) return t.wrapperEl.style.overflow = "hidden", t.wrapperEl.style.scrollSnapType = "", setTimeout(() => {
        t.wrapperEl.style.overflow = "", t.wrapperEl.scrollTo({
          [r]: p
        });
      }), void o.cancelAnimationFrame(t.cssModeFrameID);
      t.cssModeFrameID = o.requestAnimationFrame(u);
    };
  u();
}
function getSlideTransformEl(e) {
  return e.querySelector(".swiper-slide-transform") || e.shadowRoot && e.shadowRoot.querySelector(".swiper-slide-transform") || e;
}
function elementChildren(e, t) {
  return void 0 === t && (t = ""), [...e.children].filter(e => e.matches(t));
}
function createElement(e, t) {
  void 0 === t && (t = []);
  const n = document.createElement(e);
  return n.classList.add(...(Array.isArray(t) ? t : [t])), n;
}
function elementOffset(e) {
  const t = (0, _ssrWindowEsmMin.a)(),
    n = (0, _ssrWindowEsmMin.g)(),
    r = e.getBoundingClientRect(),
    o = n.body,
    l = e.clientTop || o.clientTop || 0,
    s = e.clientLeft || o.clientLeft || 0,
    i = e === t ? t.scrollY : e.scrollTop,
    a = e === t ? t.scrollX : e.scrollLeft;
  return {
    top: r.top + i - l,
    left: r.left + a - s
  };
}
function elementPrevAll(e, t) {
  const n = [];
  for (; e.previousElementSibling;) {
    const r = e.previousElementSibling;
    t ? r.matches(t) && n.push(r) : n.push(r), e = r;
  }
  return n;
}
function elementNextAll(e, t) {
  const n = [];
  for (; e.nextElementSibling;) {
    const r = e.nextElementSibling;
    t ? r.matches(t) && n.push(r) : n.push(r), e = r;
  }
  return n;
}
function elementStyle(e, t) {
  return (0, _ssrWindowEsmMin.a)().getComputedStyle(e, null).getPropertyValue(t);
}
function elementIndex(e) {
  let t,
    n = e;
  if (n) {
    for (t = 0; null !== (n = n.previousSibling);) 1 === n.nodeType && (t += 1);
    return t;
  }
}
function elementParents(e, t) {
  const n = [];
  let r = e.parentElement;
  for (; r;) t ? r.matches(t) && n.push(r) : n.push(r), r = r.parentElement;
  return n;
}
function elementTransitionEnd(e, t) {
  t && e.addEventListener("transitionend", function n(r) {
    r.target === e && (t.call(e, r), e.removeEventListener("transitionend", n));
  });
}
function elementOuterSize(e, t, n) {
  const r = (0, _ssrWindowEsmMin.a)();
  return n ? e["width" === t ? "offsetWidth" : "offsetHeight"] + parseFloat(r.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-right" : "margin-top")) + parseFloat(r.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-left" : "margin-bottom")) : e.offsetWidth;
}

},{"./ssr-window.esm.min.mjs":33}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Swiper", {
  enumerable: true,
  get: function () {
    return _swiperCoreMin.S;
  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _swiperCoreMin.S;
  }
});
var _swiperCoreMin = require("./shared/swiper-core.min.mjs");
var _virtualMin = _interopRequireDefault(require("./modules/virtual.min.mjs"));
var _keyboardMin = _interopRequireDefault(require("./modules/keyboard.min.mjs"));
var _mousewheelMin = _interopRequireDefault(require("./modules/mousewheel.min.mjs"));
var _navigationMin = _interopRequireDefault(require("./modules/navigation.min.mjs"));
var _paginationMin = _interopRequireDefault(require("./modules/pagination.min.mjs"));
var _scrollbarMin = _interopRequireDefault(require("./modules/scrollbar.min.mjs"));
var _parallaxMin = _interopRequireDefault(require("./modules/parallax.min.mjs"));
var _zoomMin = _interopRequireDefault(require("./modules/zoom.min.mjs"));
var _controllerMin = _interopRequireDefault(require("./modules/controller.min.mjs"));
var _a11yMin = _interopRequireDefault(require("./modules/a11y.min.mjs"));
var _historyMin = _interopRequireDefault(require("./modules/history.min.mjs"));
var _hashNavigationMin = _interopRequireDefault(require("./modules/hash-navigation.min.mjs"));
var _autoplayMin = _interopRequireDefault(require("./modules/autoplay.min.mjs"));
var _thumbsMin = _interopRequireDefault(require("./modules/thumbs.min.mjs"));
var _freeModeMin = _interopRequireDefault(require("./modules/free-mode.min.mjs"));
var _gridMin = _interopRequireDefault(require("./modules/grid.min.mjs"));
var _manipulationMin = _interopRequireDefault(require("./modules/manipulation.min.mjs"));
var _effectFadeMin = _interopRequireDefault(require("./modules/effect-fade.min.mjs"));
var _effectCubeMin = _interopRequireDefault(require("./modules/effect-cube.min.mjs"));
var _effectFlipMin = _interopRequireDefault(require("./modules/effect-flip.min.mjs"));
var _effectCoverflowMin = _interopRequireDefault(require("./modules/effect-coverflow.min.mjs"));
var _effectCreativeMin = _interopRequireDefault(require("./modules/effect-creative.min.mjs"));
var _effectCardsMin = _interopRequireDefault(require("./modules/effect-cards.min.mjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Swiper 10.1.0
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2023 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: August 1, 2023
 */

const modules = [_virtualMin.default, _keyboardMin.default, _mousewheelMin.default, _navigationMin.default, _paginationMin.default, _scrollbarMin.default, _parallaxMin.default, _zoomMin.default, _controllerMin.default, _a11yMin.default, _historyMin.default, _hashNavigationMin.default, _autoplayMin.default, _thumbsMin.default, _freeModeMin.default, _gridMin.default, _manipulationMin.default, _effectFadeMin.default, _effectCubeMin.default, _effectFlipMin.default, _effectCoverflowMin.default, _effectCreativeMin.default, _effectCardsMin.default];
_swiperCoreMin.S.use(modules);

},{"./modules/a11y.min.mjs":4,"./modules/autoplay.min.mjs":5,"./modules/controller.min.mjs":6,"./modules/effect-cards.min.mjs":7,"./modules/effect-coverflow.min.mjs":8,"./modules/effect-creative.min.mjs":9,"./modules/effect-cube.min.mjs":10,"./modules/effect-fade.min.mjs":11,"./modules/effect-flip.min.mjs":12,"./modules/free-mode.min.mjs":13,"./modules/grid.min.mjs":14,"./modules/hash-navigation.min.mjs":15,"./modules/history.min.mjs":16,"./modules/keyboard.min.mjs":17,"./modules/manipulation.min.mjs":18,"./modules/mousewheel.min.mjs":19,"./modules/navigation.min.mjs":20,"./modules/pagination.min.mjs":21,"./modules/parallax.min.mjs":22,"./modules/scrollbar.min.mjs":23,"./modules/thumbs.min.mjs":24,"./modules/virtual.min.mjs":25,"./modules/zoom.min.mjs":26,"./shared/swiper-core.min.mjs":34}],37:[function(require,module,exports){
"use strict";

var _jquery = _interopRequireDefault(require("jquery"));
var _variables = require("../variables/variables.js");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
(0, _jquery.default)(() => {
  // Create a phone mask
  (() => {
    const TEL_MASK = '+7 (000) 000-00-00';
    (0, _jquery.default)('.field__text[type="tel"]').attr('maxlength', TEL_MASK.length).on('input', function () {
      let val = this.value,
        selectionEnd = this.selectionEnd;
      if (-1 !== TEL_MASK.indexOf('+7') && /^8/.test(val)) {
        val = val.replace('8', '7');
      }
      val = val.split('');
      for (let i = 0; i < TEL_MASK.length; i++) {
        if (!val[i]) {
          break;
        }
        const IS_MASK_INT = '0' === TEL_MASK[i],
          IS_VAL_INT = /\d/g.test(val[i]) && (IS_MASK_INT || val[i] !== TEL_MASK[i]);
        if (IS_MASK_INT) {
          if (!IS_VAL_INT) {
            val.splice(i, 1);
            i--;
          }
        } else {
          if (IS_VAL_INT) {
            val.splice(i, 0, TEL_MASK[i]);
            if (i <= selectionEnd && 1 <= selectionEnd - i) {
              selectionEnd++;
            }
          } else {
            val[i] = TEL_MASK[i];
          }
        }
      }
      this.value = val.join('').substring(0, TEL_MASK.length);
      this.selectionStart = this.selectionEnd = selectionEnd;
    });
  })();

  // Increase/decrease a number
  _variables.$wrapper.on('plus minus', '.field__number', function (e) {
    let $el = (0, _jquery.default)(this),
      val = +$el.val().replace(',', '.');
    const OLD_VAL = val,
      IS_PLUS = 'plus' === e.type,
      MIN = +$el.attr('data-min'),
      MAX = +$el.attr('data-max'),
      STEP = +$el.attr('data-step') || 1,
      DIGITS = ('' + STEP).replace(/^.+\./, '').length || 0,
      NOT_MAX = !MAX || !val || val + STEP <= MAX,
      NOT_MIN = !MIN || !val || MIN <= val - STEP;
    if (MIN && MAX && MIN > MAX) {
      val = IS_PLUS ? MIN : MAX;
      $el.val(+val.toFixed(DIGITS));
      return;
    }
    if (IS_PLUS && NOT_MAX) {
      val = MIN && !val ? MIN > MAX ? MAX : MIN : val + STEP;
      val = MIN && val < MIN ? MIN : val;
    }
    if (!IS_PLUS && NOT_MIN) {
      val = MIN && !val ? MIN : val - STEP;
      val = MAX && val > MAX ? MAX : val;
    }
    val = +val.toFixed(DIGITS);
    val = ('' + val).replace('.', ',');
    $el.val(val);
    if (OLD_VAL !== +val) {
      $el.trigger('change');
    }
  });

  // Input only the numbers
  _variables.$wrapper.on('input keydown contextmenu', '.field__number', function (e) {
    const $el = (0, _jquery.default)(this);
    let val = $el.val().replace(',', '.').replace(/\s/g, '');
    const MAX = $el.attr('data-max'),
      IS_CORRECT_LENGTH = !MAX || val.length <= MAX.length,
      STEP = $el.attr('data-step'),
      IS_STEP_FLOAT = STEP ? +STEP % 1 !== 0 : false,
      patternNumper = IS_STEP_FLOAT ? /^$|^[0-9.,+-]+$/ : /^$|^[0-9+-]+$/;
    if (/Up|Down/g.test(e.key) && !/Page/g.test(e.key)) {
      e.preventDefault();
      $el.trigger(/Up/g.test(e.key) ? 'plus' : 'minus');
      return;
    }
    if (patternNumper.test(val) && IS_CORRECT_LENGTH) {
      let offset = $el[0].oldVal ? $el[0].oldVal.substring(0, $el[0].oldStart).replace(/\S/g, '').length : 0;
      if (+val && $el.hasClass('field__number_price')) {
        val = (+val).toLocaleString().split(',')[0];
      }
      if ($el[0].oldVal) {
        offset = val.substring(0, $el[0].oldStart).replace(/\S/g, '').length - offset;
      }
      $el.val(val);
      if ('input' === e.type && val === $el[0].oldVal) {
        $el[0].selectionStart = $el[0].selectionEnd = $el[0].oldStart + offset;
      }
      $el[0].oldVal = val;
      $el[0].oldStart = $el[0].selectionStart;
      $el[0].oldEnd = $el[0].selectionEnd;
    } else if ($el[0].hasOwnProperty('oldVal')) {
      const START = $el[0].oldStart,
        END = $el[0].oldEnd,
        LENGTH = $el[0].oldVal.length;
      val = $el[0].oldVal.substring(0, START) + $el[0].oldVal.substring(END, LENGTH);
      $el.val(val);
      $el[0].selectionStart = $el[0].selectionEnd = START;
    }
  });

  // If on focusout or on change value above/below the limit then set the limit
  _variables.$wrapper.on('focusout change', '.field__number', function () {
    const $input = (0, _jquery.default)(this),
      VAL = $input.val().replace(/\s/g, ''),
      MIN = +$input.attr('data-min'),
      MAX = +$input.attr('data-max'),
      IS_PRICE = $input.hasClass('field__number_price');
    if ('' === VAL) {
      return;
    }
    if (+VAL < MIN) {
      $input.val(IS_PRICE ? MIN.toLocaleString().split(',')[0] : MIN);
    }
    if (MAX < +VAL) {
      $input.val(IS_PRICE ? MAX.toLocaleString().split(',')[0] : MAX);
    }
  });
});

},{"../variables/variables.js":49,"jquery":1}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrollTo = scrollTo;
exports.validate = validate;
var _jquery = _interopRequireDefault(require("jquery"));
var _variables = require("../variables/variables.js");
var _loader = _interopRequireDefault(require("../loader/loader.js"));
var popup = _interopRequireWildcard(require("../popup/popup.js"));
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function (nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
function addError($el, text) {
  removeError($el);
  if (text) {
    $el.addClass('form__error-control').parent().append('<span class="form__error-text">' + text + '</span>');
  }
  _variables.$window.trigger('resize');
}
function removeError($el) {
  if ($el.hasClass('form__error-control')) {
    $el.removeClass('form__error-control').each(function () {
      (0, _jquery.default)(this).parent().children('.form__error-text').remove();
    });
    _variables.$window.trigger('resize');
  }
}
function isComplete($el) {
  if ('checkbox' === $el.attr('type')) {
    return $el.filter(':checked').length;
  }
  return ($el.val() || '').trim();
}
function isValid($el) {
  const patternEmail = /^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
  const TYPE = $el.attr('type'),
    VAL = $el.val(),
    IS_EMAIL = 'email' === TYPE,
    IS_TEL = 'tel' === TYPE,
    IS_EMAIL_VALID = patternEmail.test(VAL),
    IS_TEL_VALID = /^\+\d\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/.test(VAL);
  if (IS_EMAIL && !IS_EMAIL_VALID || IS_TEL && !IS_TEL_VALID) {
    return false;
  }
  return true;
}
function validate(success, error) {
  return function (e) {
    let $form = (0, _jquery.default)(this),
      $els = (0, _jquery.default)('[data-required]:visible, [data-error]:visible', this),
      isValidAll = true;
    $els.each(function () {
      let $input = (0, _jquery.default)(this),
        $inputRequired = $input.filter('[data-required]'),
        $inputError = $input.filter('[data-error]'),
        IS_COMPLETE = $inputRequired.length ? isComplete($inputRequired) : true,
        IS_VALID = $inputError.length ? !isComplete($inputError) || isValid($inputError) : true;
      if (!IS_COMPLETE) {
        isValidAll = false;
        addError($inputRequired, $inputRequired.attr('data-required'));
        return;
      }
      if (!IS_VALID) {
        isValidAll = false;
        addError($inputError, $inputError.attr('data-error'));
      }
    });
    if (!isValidAll) {
      e.preventDefault();
      scrollTo($form.find('.form__error-control:visible'));
      error = error ? error : function () {};
      error.call(this, e);
      return;
    }
    success = success ? success : function () {};
    success.call(this, e);
  };
}
function scrollTo($el, transition) {
  if (!$el.length) {
    return;
  }
  setTimeout(function () {
    let $popup = $el.closest('.popup__wrapper'),
      $parent = $popup.length ? $popup : (0, _jquery.default)('html, body');
    const OFFSET_TOP = $popup.length ? popup.getOffset($el).top : $el.offset().top,
      SCROLL_TOP = OFFSET_TOP - (innerHeight - $el.height()) / 2;
    if (SCROLL_TOP) {
      transition = undefined !== transition ? transition : _variables.TRANSITION;
      $parent.animate({
        scrollTop: SCROLL_TOP
      }, transition);
    }
  }, _variables.MIN_DELAY);
}
(0, _jquery.default)(() => {
  scrollTo((0, _jquery.default)('.form__error-control:visible'), 0);

  // Remove errors after changing value.
  _variables.$wrapper.on('input change', '[data-required], [data-error]', function () {
    removeError((0, _jquery.default)(this));
  });

  // Send form.
  (0, _jquery.default)('.form_send').trigger('reset').on('submit', validate(function (e) {
    const $form = (0, _jquery.default)(this);
    $form.addClass('lock');
    e.preventDefault();
    _jquery.default.ajax({
      type: 'post',
      url: wp_data.admin_ajax,
      data: $form.serialize()
    }).done((0, _loader.default)($form, () => {
      popup.open({
        id: $form.attr('data-success'),
        closeID: '#' + (0, _jquery.default)('.popup_active').attr('id'),
        onOpen: () => {
          $form.trigger('reset').removeClass('lock');
        }
      });
    }));
  }));
});

},{"../loader/loader.js":43,"../popup/popup.js":45,"../variables/variables.js":49,"jquery":1}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = debounce;
var _jquery = _interopRequireDefault(require("jquery"));
var _variables = require("../variables/variables.js");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
function debounce(cb) {
  let timeoutID;
  return () => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(cb, _variables.MIN_DELAY);
  };
}

},{"../variables/variables.js":49,"jquery":1}],40:[function(require,module,exports){
"use strict";

var _jquery = _interopRequireDefault(require("jquery"));
var _variables = require("../variables/variables.js");
var _functions = require("../functions/functions.js");
var page = _interopRequireWildcard(require("../page/page.js"));
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function (nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
let $header;
(0, _jquery.default)(() => {
  $header = (0, _jquery.default)('.header');
  function toggleShadow() {
    const SHADOW_SCROLL_TOP = 10;
    if (!page.isScroll) {
      return;
    }
    if (SHADOW_SCROLL_TOP < _variables.$window.scrollTop()) {
      $header.addClass('header_shadow');
    } else {
      $header.removeClass('header_shadow');
    }
  }
  toggleShadow();
  _variables.$window.on('scroll', toggleShadow);
  const togglePanel = (() => {
    let toggleScrollTop = $header.innerHeight(),
      oldInnerHeight = innerHeight,
      oldScrollTop;
    _variables.$window.on('resizeWidth', (0, _functions.debounce)(() => {
      toggleScrollTop = $header.innerHeight();
    }));
    return () => {
      const SCROLL_TOP = _variables.$window.scrollTop(),
        HAS_SCROLL = SCROLL_TOP !== oldScrollTop,
        IS_TOGGLE_SCROLL_TOP = toggleScrollTop < SCROLL_TOP,
        IS_RESIZE_HEIGHT = innerHeight !== oldInnerHeight;
      if (!page.isScroll || !HAS_SCROLL) {
        return;
      }
      $header.removeClass('header_active-menu');
      if (IS_TOGGLE_SCROLL_TOP && !IS_RESIZE_HEIGHT) {
        const IS_SCROLL_UP = SCROLL_TOP < oldScrollTop;

        // So that it is fixed on the desktop when loading.
        if (!_variables.breakpoint.isTablet) {
          $header.addClass('header_fixed');
        }
        if (IS_SCROLL_UP) {
          // So that it is fixed on the mobile when scroll up.
          if (_variables.breakpoint.isTablet) {
            $header.addClass('header_fixed');
          }
          $header.removeClass('header_out');
        } else {
          $header.addClass('header_out');
        }
      }
      if (!IS_TOGGLE_SCROLL_TOP) {
        $header.removeClass('header_out');
        setTimeout(() => {
          $header.addClass('header_fixed');
        }, _variables.TRANSITION);
      }
      oldScrollTop = SCROLL_TOP;
      oldInnerHeight = innerHeight;
    };
  })();
  togglePanel();
  _variables.$window.on('scroll', togglePanel);

  // The menu on the mobile.
  (() => {
    //  Show/hide.
    (0, _jquery.default)('.header__toggle').on('click', () => {
      if (_variables.breakpoint.isTablet) {
        $header.toggleClass('header_active-menu');
        page.scrollToggle();
      }
    });

    // Hide when click outside.
    _variables.$wrapper.on('click', e => {
      if (_variables.breakpoint.isTablet && $header.hasClass('header_active-menu') && !(0, _jquery.default)(e.target).closest('.header__toggle, .header__menu').length) {
        page.scrollOn();
        $header.removeClass('header_active-menu');
      }
    });

    // Enable/disable the scroll page when changing the window width.
    _variables.$window.on('resizeWidth', (0, _functions.debounce)(() => {
      const IS_ACTIVE_MENU = $header.hasClass('header_active-menu'),
        IS_ENABLE_SCROLL_DESKTOP = IS_ACTIVE_MENU && !page.isScroll && !_variables.breakpoint.isTablet,
        IS_DISABLE_SCROLL_MOBILE = IS_ACTIVE_MENU && page.isScroll && _variables.breakpoint.isTablet;
      if (IS_ENABLE_SCROLL_DESKTOP || IS_DISABLE_SCROLL_MOBILE) {
        page.scrollToggle();
      }
    }));
  })();
});

},{"../functions/functions.js":39,"../page/page.js":44,"../variables/variables.js":49,"jquery":1}],41:[function(require,module,exports){
"use strict";

var _jquery = _interopRequireDefault(require("jquery"));
var _swiperBundle = _interopRequireDefault(require("swiper/swiper-bundle.min"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
(0, _jquery.default)(() => {
  if (!(0, _jquery.default)('.home').length) {
    return;
  }
});

},{"jquery":1,"swiper/swiper-bundle.min":36}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.observe = observe;
var _jquery = _interopRequireDefault(require("jquery"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
let $elems,
  observers = [];
function observe($el, cb) {
  if (window.IntersectionObserver) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cb();
          observer.unobserve($el[0]);
        }
      });
    });
    observer.observe($el[0]);
  } else {
    cb();
  }
}
function load($elem) {
  if ($elem[0].dataset.src) {
    $elem.attr('src', $elem[0].dataset.src);
  }
  if ($elem[0].dataset.bg) {
    $elem.css('background-image', 'url(' + $elem[0].dataset.bg + ')');
  }
}
function init() {
  observers.forEach(function (observer, i) {
    observer.unobserve($elems.eq(i)[0]);
  });
  $elems = (0, _jquery.default)('[data-src], [data-bg]');
  observers = [];
  $elems.each(function () {
    const $elem = (0, _jquery.default)(this);
    observe($elem, () => {
      load($elem);
    });
  });
}
(0, _jquery.default)(() => {
  init();
});

},{"jquery":1}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jquery = _interopRequireDefault(require("jquery"));
var _variables = require("../variables/variables.js");
var _page = require("../page/page.js");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
function addDataTimeoutID($loader, timeoutID) {
  let timeoutIDs = $loader.data('timeoutIDs') || [];
  timeoutIDs.push(timeoutID);
  $loader.data('timeoutIDs', timeoutIDs);
}
var _default = ($parent, callback) => {
  const $loader = $parent.find('.loader');
  let delay = new Date().getTime();
  let timeoutIDs = $loader.data('timeoutIDs') || [];
  while (timeoutIDs.length) {
    clearTimeout(timeoutIDs.shift());
  }
  $loader.addClass('loader_animate');
  const TIMEOUT_ID1 = setTimeout(() => {
    $loader.addClass('loader_active');
  }, _variables.MIN_DELAY);
  addDataTimeoutID($loader, TIMEOUT_ID1);
  return function () {
    const callArguments = arguments;
    const MIN_DELAY = 700;
    delay = MIN_DELAY - (new Date().getTime() - delay);
    delay = Math.max(delay, 0);
    const TIMEOUT_ID2 = setTimeout(() => {
      callback.apply(null, callArguments);
      $loader.removeClass('loader_animate');
      let TIMEOUT_ID3 = setTimeout(() => {
        $loader.removeClass('loader_active');
      }, _variables.TRANSITION + 1);
      addDataTimeoutID($loader, TIMEOUT_ID3);
    }, delay);
    addDataTimeoutID($loader, TIMEOUT_ID2);
  };
};
exports.default = _default;

},{"../page/page.js":44,"../variables/variables.js":49,"jquery":1}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isScroll = exports.$el = void 0;
exports.scrollOff = scrollOff;
exports.scrollOn = scrollOn;
exports.scrollToggle = scrollToggle;
var _jquery = _interopRequireDefault(require("jquery"));
var _variables = require("../variables/variables.js");
var _functions = require("../functions/functions.js");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
const patternApple = /iPhone|iPad|iPod|Mac/i;
let isScroll = true,
  isIOS = patternApple.test(navigator.platform) && navigator.maxTouchPoints > 1,
  $el,
  scrollTop;
exports.$el = $el;
exports.isScroll = isScroll;
const compensateScrollbar = function () {
  const getScrollbarWidth = (() => {
    const $outer = (0, _jquery.default)('<div>'),
      $inner = (0, _jquery.default)('<div>');
    return () => {
      $outer.css('overflow-y', 'scroll');
      $inner.appendTo($outer);
      $outer.appendTo($el);
      const RESULT = $el.height() !== _variables.$wrapper.height() ? $outer.width() - $inner.width() : 0;
      $outer.remove();
      return RESULT;
    };
  })();
  const $paddingElems = (0, _jquery.default)('.page__compensate-scrollbar').filter(function () {
    return -1 === ['absolute', 'fixed'].indexOf((0, _jquery.default)(this).css('position'));
  });
  const $marginElems = (0, _jquery.default)('.page__compensate-scrollbar').not($paddingElems);
  return () => {
    $paddingElems.each(function () {
      const $paddingElem = (0, _jquery.default)(this),
        $popup = $paddingElem.closest('.popup'),
        IS_ACTIVE_POPUP = $popup.hasClass('popup_active');
      if (!IS_ACTIVE_POPUP) {
        $popup.addClass('popup_active');
      }
      var HAS_SCROLLBAR = 1 < Math.abs($paddingElem.outerHeight() - $paddingElem[0].scrollHeight);
      if (isScroll || HAS_SCROLLBAR) {
        $paddingElem.css('padding-right', 0);
      } else {
        $paddingElem.css('padding-right', getScrollbarWidth());
      }
      if (!IS_ACTIVE_POPUP) {
        $popup.removeClass('popup_active');
      }
    });
    $marginElems.css('margin-right', isScroll ? 0 : getScrollbarWidth());
  };
}();
function scrollOn() {
  if (!isScroll) {
    exports.isScroll = isScroll = true;
    compensateScrollbar();
    $el.attr('style', '');

    // On the desktop also need, since when the window shrinks then the page offsets, so forsed set the scroll page position.
    _variables.$window.scrollTop(scrollTop);
    if (isIOS) {
      setTimeout(() => {
        _variables.$window.scrollTop(scrollTop);
      }, _variables.MIN_DELAY);
    }
  }
}
function fixed() {
  $el.css({
    position: 'fixed',
    top: -scrollTop,
    left: 0,
    right: 0
  });
}
function scrollOff() {
  if (isScroll) {
    scrollTop = _variables.$window.scrollTop();
    exports.isScroll = isScroll = false;
    compensateScrollbar();
    if (!isIOS) {
      $el.css('overflow', 'hidden');

      // On the desktop when the window shrinks then the page offsets, so forsed set the scroll page position.
      _variables.$window.scrollTop(scrollTop);
    } else {
      // Sometimes on the Safari IOS jumps to the top of the page which is why needs a delay.
      fixed();
      setTimeout(fixed, _variables.MIN_DELAY);
    }
  }
}
function scrollToggle() {
  if (isScroll) {
    scrollOff();
  } else {
    scrollOn();
  }
}
(0, _jquery.default)(() => {
  exports.$el = $el = (0, _jquery.default)('.page');
  _variables.$window.on('resize', (0, _functions.debounce)(() => {
    isIOS = patternApple.test(navigator.platform) && navigator.maxTouchPoints > 1;
    compensateScrollbar();
  }));

  // Disable css transition on resize/
  _variables.$window.on('resize', (0, _functions.debounce)(() => {
    $el.addClass('trans-off');
    setTimeout(() => {
      $el.removeClass('trans-off');
    }, _variables.MIN_DELAY);
  }));
  function toggleMobile() {
    if (_variables.isMobile) {
      $el.addClass('page_mobile');
    } else {
      $el.removeClass('page_mobile');
    }
  }
  toggleMobile();
  _variables.$window.on('resize', (0, _functions.debounce)(toggleMobile));

  // Prevent the selection of elemnts by double clicking.
  (() => {
    const CLICK_DELAY = 1000;
    let timeoutID;
    $el.on('dblclick', () => {
      $el.css('user-select', 'none');
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        $el.css('user-select', 'unset');
      }, CLICK_DELAY);
    });
  })();
});

},{"../functions/functions.js":39,"../variables/variables.js":49,"jquery":1}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGallery = createGallery;
exports.getOffset = getOffset;
exports.open = open;
var _jquery = _interopRequireDefault(require("jquery"));
var _photoswipeEsm = _interopRequireDefault(require("photoswipe/dist/photoswipe.esm.min"));
var _photoswipeLightboxEsm = _interopRequireDefault(require("photoswipe/dist/photoswipe-lightbox.esm.min"));
var _variables = require("../variables/variables.js");
var page = _interopRequireWildcard(require("../page/page.js"));
var _svgUseExternal = require("../svg-use-external/svg-use-external.js");
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function (nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
function close($el) {
  $el.removeClass('popup_animate');
  setTimeout(function () {
    $el.removeClass('popup_active');
    if (!(0, _jquery.default)('.popup_active').length) {
      page.scrollOn();
    }
  }, _variables.TRANSITION);
}
function open(options) {
  options = _jquery.default.extend({
    id: null,
    closeID: null,
    position: 0,
    onOpen: () => {}
  }, options);
  const $popup = (0, _jquery.default)(options.id),
    $popupClose = (0, _jquery.default)(options.closeID),
    DELAY = $popupClose.length ? _variables.TRANSITION : 0;
  if ($popupClose.length) {
    close($popupClose);
  } else {
    page.scrollOff();
  }
  $popup.addClass('popup_active');
  setTimeout(() => {
    options.onOpen();
    setTimeout(() => {
      $popup.addClass('popup_animate');
    }, _variables.MIN_DELAY);
  }, DELAY);
  const $popupTitle = $popup.find('.popup__title'),
    $inputTitle = $popup.find('[name="title"]');
  const POPUP_TITLE = options.title || $popupTitle.attr('data-title');
  if (POPUP_TITLE) {
    $popupTitle.text(POPUP_TITLE);
    $inputTitle.val(POPUP_TITLE);
  }
}
function getOffset($el) {
  let $parent = $el.offsetParent();
  const $box = $el.closest('.popup__box'),
    result = $el.position();
  if ($parent[0] !== $box[0] && !_jquery.default.contains($box[0], $parent[0])) {
    return;
  }
  result.top += parseFloat($box.parent('.popup__content').css('padding-top'));
  while ($parent[0] !== $box[0]) {
    let position = $parent.position();
    result.top += position.top;
    result.left += position.left;
    $parent = $parent.offsetParent();
  }
  return result;
}
function createGallery(opts) {
  const lightbox = new _photoswipeLightboxEsm.default(_jquery.default.extend({
    showHideAnimationType: 'fade',
    tapAction: 'close',
    loop: false,
    pswpModule: _photoswipeEsm.default
  }, opts));
  lightbox.init();
  if (opts.dataSource) {
    lightbox.loadAndOpen(0);
  }
}
(0, _jquery.default)(() => {
  // Open the popup on click.
  _variables.$wrapper.on('click', '.open-popup', function (e) {
    const $button = (0, _jquery.default)(this),
      $closePopup = (0, _jquery.default)('.popup_active'),
      DELAY = +$button.attr('data-delay') || 0;
    if ($button.hasClass('open-popup_active')) {
      return;
    }
    $button.addClass('open-popup_active');
    e.preventDefault();
    setTimeout(() => {
      open({
        id: $button.attr('href'),
        closeID: $closePopup.length ? '#' + $closePopup.attr('id') : null,
        title: $button.attr('data-title')
      });
      $button.removeClass('open-popup_active');
    }, DELAY);
  });

  // Close the popup on click Esc on the mouseboard.
  _variables.$wrapper.on('keydown', function (e) {
    if (-1 !== ('' + e.key).indexOf('Esc')) {
      (0, _jquery.default)('.popup_active .popup__close').trigger('click');
    }
  });

  // Close the popup.
  _variables.$wrapper.on('click', '.popup', function (e) {
    const $target = (0, _jquery.default)(e.target),
      IS_CLOSE = $target.closest('.popup__close').length,
      IS_BOX = $target.closest('.popup__box').length,
      IS_SLIDER = $target.closest('.popup__slider').length;
    if (!IS_BOX && !IS_SLIDER || IS_CLOSE) {
      close($target.closest('.popup'));
    }
  });

  // Create a gallery.
  createGallery({
    gallery: '.popup-gallery',
    children: '[data-pswp-width][data-pswp-height]'
  });
});

},{"../page/page.js":44,"../svg-use-external/svg-use-external.js":47,"../variables/variables.js":49,"jquery":1,"photoswipe/dist/photoswipe-lightbox.esm.min":2,"photoswipe/dist/photoswipe.esm.min":3}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
var _jquery = _interopRequireDefault(require("jquery"));
var _variables = require("../variables/variables.js");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
class Select {
  constructor(el) {
    this.$el = (0, _jquery.default)(el);
    this.$default = this.$el.children('.select__default');
    this.$head = this.$el.children('.select__head');
    this.iSelected = 0;
    this.$el.addClass('select_init');
    this.toggleEventMobile();
    this.addEventHead();
    this.createItems();
    this.addEventsItems();
    this.addEventOutside();
    this.addEventDefault();
  }
  toggleEventMobile() {
    let isSelectMobile = false;
    var toggle = () => {
      if (_variables.isMobile && !isSelectMobile) {
        this.$el.addClass('select_mobile');
        isSelectMobile = true;
      }
      if (!_variables.isMobile && isSelectMobile) {
        this.$el.removeClass('select_mobile');
        isSelectMobile = false;
      }
    };
    toggle();
    _variables.$window.on('resize', toggle);
  }
  addEventHead() {
    this.$head.on('click', () => {
      this.$el.toggleClass('select_active');
      this.$items.removeClass('select__item_active');
      this.$items.eq(this.iSelected).addClass('select__item_active');
    });
  }
  createItems() {
    let self = this,
      $options = self.$default.children('option'),
      $selected = $options.filter('[selected]'),
      list = '<ul class="select__list">';
    $selected = $selected.length ? $selected : $options.filter(':not([disabled])').eq(0);
    this.$head.text($selected.text());
    $options.each(function () {
      let $option = (0, _jquery.default)(this),
        attrClass = 'select__item',
        attrValue = $option.attr('value');
      if ($option.attr('disabled')) {
        attrClass += ' select__item_disable';
      }
      if ($option.attr('selected')) {
        attrClass += ' select__item_active';
        self.iSelected = $option.index();
      }
      attrValue = attrValue ? 'data-value="' + attrValue + '"' : '';
      list += '<li class="' + attrClass + '"' + attrValue + '>' + $option.text() + '</li>';
    });
    list += '</ul>';
    this.$el.append(list);
    this.$items = this.$el.find('.select__item');
  }
  addEventsItems() {
    let self = this;
    self.$items.on('mouseenter', function () {
      let $item = (0, _jquery.default)(this);
      if (!$item.hasClass('select__item_disable')) {
        self.$items.removeClass('select__item_active');
        $item.addClass('select__item_active');
      }
    }).on('click', function () {
      let $item = (0, _jquery.default)(this),
        val = $item.attr('data-value') || $item.text();
      if (!$item.hasClass('select__item_disable')) {
        self.iSelected = $item.index();
        if (val !== self.$default.val()) {
          self.$default.val(val).trigger('change');
        }
        self.$el.removeClass('select_active');
      }
    });
  }
  addEventOutside() {
    (0, _jquery.default)('body').on('click', e => {
      if (this.$el.hasClass('select_active') && !(0, _jquery.default)(e.target).closest(this.$el).length) {
        this.$el.removeClass('select_active');
        this.$items.removeClass('select__item_active');
        this.$items.eq(this.iSelected).addClass('select__item_active');
      }
    });
  }
  addEventDefault() {
    let self = this;
    function reinit() {
      self.$default.prop('selectedIndex', -1).trigger('change');
      self.$el.find('.select__list').remove();
      self.createItems();
      self.addEventsItems();
    }
    self.$default.on('change changeVal', function () {
      // Delay is needed because when the page loads the value of the select is not defidned.
      setTimeout(() => {
        const VAL = self.$default.val();
        if (!VAL) {
          self.$el.addClass('select_empty');
        } else {
          self.$el.removeClass('select_empty');
        }
        self.$items.each(function (i) {
          let $item = (0, _jquery.default)(this),
            text = $item.text();
          if (VAL === $item.attr('data-value') || VAL === text || !VAL && $item.hasClass('select__item_disable')) {
            self.iSelected = i;
            self.$head.text(text);
            self.$items.removeClass('select__item_active');
            $item.addClass('select__item_active');
          }
        });
      }, _variables.MIN_DELAY);
    }).on('changeHtml', reinit).closest('form').on('reset', reinit);
  }
}
function init() {
  (0, _jquery.default)('.select:not(.select_init)').each(function () {
    new Select(this);
  });
}
(0, _jquery.default)(() => {
  init();
});

},{"../variables/variables.js":49,"jquery":1}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
var _jquery = _interopRequireDefault(require("jquery"));
var _variables = require("../variables/variables.js");
var _functions = require("../functions/functions.js");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
function init() {
  if (/MSIE|trident/i.test(navigator.userAgent)) {
    let $uses = (0, _jquery.default)('use');
    if (!$uses.length) {
      return;
    }
    const SPRITE_HREF = $uses.attr('xlink:href').split('#').shift();
    _jquery.default.get(SPRITE_HREF, sprite => {
      $uses.each(function () {
        let $use = (0, _jquery.default)(this);
        const ID = $use.attr('xlink:href').split('#').pop();
        let svg = sprite.getElementById(ID);
        if (-1 === $use.attr('xlink:href').indexOf(SPRITE_HREF)) {
          return;
        }
        if (svg) {
          svg = svg.cloneNode(true);
          svg.removeAttribute('id');
          $use.replaceWith(svg);
        } else {
          $use.remove();
        }
      });
      init();
    });
  }
}
(0, _jquery.default)(() => {
  init();
  _variables.$window.on('resizeWidth', (0, _functions.debounce)(() => {
    setTimeout(init, _variables.MIN_DELAY);
  }));
});

},{"../functions/functions.js":39,"../variables/variables.js":49,"jquery":1}],48:[function(require,module,exports){
"use strict";

var _jquery = _interopRequireDefault(require("jquery"));
var _variables = require("../variables/variables.js");
var _functions = require("../functions/functions.js");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
(0, _jquery.default)(() => {
  let tag = '<a',
    oldTag = tag;
  function replace() {
    tag = _variables.isMobile ? '<a' : '<div';
    if (tag === oldTag) {
      return;
    }
    (0, _jquery.default)('.tel').each(function () {
      let $tel = (0, _jquery.default)(this),
        content = $tel.html(),
        wrapper = (0, _jquery.default)('<div>').append($tel.html('').clone()).html();
      wrapper = wrapper.replace(oldTag, tag);
      wrapper = wrapper.replace(oldTag.replace('<', '</'), tag.replace('<', '</'));
      wrapper = (0, _jquery.default)(wrapper).html(content);
      $tel.replaceWith(wrapper);
    });
    oldTag = tag;
  }
  replace();
  _variables.$window.on('resize', (0, _functions.debounce)(replace));
});

},{"../functions/functions.js":39,"../variables/variables.js":49,"jquery":1}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMobile = exports.breakpoint = exports.TRANSITION = exports.PREV_ARROW = exports.NEXT_ARROW = exports.MIN_DELAY = exports.$wrapper = exports.$window = void 0;
var _jquery = _interopRequireDefault(require("jquery"));
var _functions = require("../functions/functions.js");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
const PREV_ARROW = `<button type="button" class="slick-prev">
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 14">
		<rect transform="rotate(42)" x="4.5799" y="3.3533" width="10.9" height="2.1" ry="1.1"/>
		<rect transform="rotate(-42)" x="-4.7985" y="4.9413" width="10.9" height="2.1" ry="1.1"/>
	</svg>
</button>`;
exports.PREV_ARROW = PREV_ARROW;
const NEXT_ARROW = PREV_ARROW.replace('prev', 'next'),
  TRANSITION = 300,
  MIN_DELAY = 50,
  // The minimum delay at which the function in setTimeout is called earlier than the main code.
  regDevices = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
exports.MIN_DELAY = MIN_DELAY;
exports.TRANSITION = TRANSITION;
exports.NEXT_ARROW = NEXT_ARROW;
let isMobile = regDevices.test(navigator.userAgent),
  oldWindowWidth = innerWidth,
  $window,
  $wrapper;
exports.$wrapper = $wrapper;
exports.$window = $window;
exports.isMobile = isMobile;
const breakpoint = {
  TABLET: 1280,
  PHONE: 600,
  setState: () => {
    breakpoint.isTablet = innerWidth <= breakpoint.TABLET;
    breakpoint.isPhone = innerWidth <= breakpoint.PHONE;
  }
};
exports.breakpoint = breakpoint;
breakpoint.setState();
(0, _jquery.default)(() => {
  exports.$window = $window = (0, _jquery.default)(window);
  exports.$wrapper = $wrapper = (0, _jquery.default)('.page__wrapper');
  $window.on('resize', (0, _functions.debounce)(() => {
    exports.isMobile = isMobile = regDevices.test(navigator.userAgent);
    if (oldWindowWidth !== innerWidth) {
      oldWindowWidth = innerWidth;
      $window.trigger('resizeWidth');
    }
  })).on('resizeWidth', (0, _functions.debounce)(breakpoint.setState));
});

},{"../functions/functions.js":39,"jquery":1}],50:[function(require,module,exports){
"use strict";

require("../components/tel/tel.js");
require("../components/field/field.js");
require("../components/select/select.js");
require("../components/form/form.js");
require("../components/lazyload/lazyload.js");
require("../components/popup/popup.js");
require("../components/header/header.js");
require("../components/home/home.js");
require("../components/svg-use-external/svg-use-external.js");

},{"../components/field/field.js":37,"../components/form/form.js":38,"../components/header/header.js":40,"../components/home/home.js":41,"../components/lazyload/lazyload.js":42,"../components/popup/popup.js":45,"../components/select/select.js":46,"../components/svg-use-external/svg-use-external.js":47,"../components/tel/tel.js":48}]},{},[50])

//# sourceMappingURL=main.js.map
