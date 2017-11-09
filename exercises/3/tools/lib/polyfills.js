if (typeof Promise === 'undefined') {
    // Rejection tracking prevents a common issue where React gets into an
    // inconsistent state due to an error, but it gets swallowed by a Promise,
    // and the user has no idea what causes React's erratic future behavior.
    require('promise/lib/rejection-tracking').enable();
    window.Promise = require('promise/lib/es6-extensions.js');
}

// fetch() polyfill for making API calls.
require('whatwg-fetch');

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');

// polyfills for custom elements
require('document-register-element');
require('reactive-elements');

// polyfills es6 introduced functions, think of Promise and Array helpers
require('babel-polyfill');

// polyfills missing implementation of CustomEvent in ie9/ie10/ie11
require('custom-event-polyfill');
