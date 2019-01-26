/*
 * ES6 iterator
 * In a separate file to be able to catch parse errors under older node.
 *
 * Copyright (C) 2019 Andras Radics
 * Licensed under the Apache License, Version  2.0.
 *
 * 2019-01-26 - AR.
 */

'use strict';

module.exports = {
    setMethods: function( prototype ) {
        prototype[Symbol.iterator] = function() {
            var list = this;
            var node = this;
            // convention: iterators that can be run only once return self,
            // iterators that can be run many times must return a new iterator each time
            // The iterator object has a next() method that returns { value, done }.
            return {
                next: function() {
                    node = node.next;
                    return { value: node, done: node === list };
                }
            }
        };
    }
}
