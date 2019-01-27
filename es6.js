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

        // Convention: iterators that can be run only once return self,
        // those that can be run many times must return a new iterator each time.
        // The iterator object has a next() method that returns { value, done }.
        // It is faster to reuse the same object for the iterator return value too.
        prototype.iterator = function iterator() {
            var list = this;
            var node = this;
            var ret = { value: 0, done: 0 };
            return {
                value: null,
                done: false,
                next: function() {
                    node = node.next;
                    //ret.value = node;
                    //ret.done = node === list || !node;
                    //return ret;

                    this.value = node;
                    this.done = node === list || !node;
                    return this;
                }
            }
        };
        try { eval("prototype[Symbol.iterator] = prototype.iterator;") } catch (e) {}

    }
}
