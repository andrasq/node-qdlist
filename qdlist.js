/**
 * qdlist -- quick doubly-linked list
 *
 * Keeps nodes on a circular doubly-linked list, with the list itself also on the list.
 *
 * Copyright (C) 2019,2022 Andras Radics
 * Licensed under the Apache License, Version  2.0.
 *
 * 2019-01-04 - AR.
 */

;(function(module) {

'use strict';

module.exports = QDList;
module.exports.fromArray = function fromArray( array ) { return QDList().fromArray(array) };


function nodeCreate( prev, next, value ) {
    return { prev: prev, next: next, value: value, value2: null };
}

function nodeCreate2( prev, next, value, value2 ) {
    return { prev: prev, next: next, value: value, value2: value2 };
}

function nodeLinkin( node ) {
    node.prev.next = node;
    node.next.prev = node;
    return node;
}

function nodeUnlink( node ) {
    var prev = node.prev, next = node.next;
    prev.next = next;
    next.prev = prev;
    node.next = null;
    return node;
}

// the list starts with dl.next (=head), and ends with dl.prev (=tail)
// Inside the list, prev/next have their intuitive meanings.
function QDList( ) {
    if (!this || this === global) return new QDList();
    this.prev = this;
    this.next = this;
    this.value = undefined;
}

QDList.prototype.isEmpty = function isEmpty( ) {
    return this.next === this;
}

QDList.prototype.push = function push( value ) {
    var node = nodeCreate(this.prev, this, value);
    return nodeLinkin(node);
}

QDList.prototype.shift = function shift( ) {
    return this.next === this ? undefined : nodeUnlink(this.next).value;
}

QDList.prototype.unshift = function unshift( value ) {
    var node = nodeCreate(this, this.next, value);
    return nodeLinkin(node);
}

QDList.prototype.pop = function pop( ) {
    return this.prev === this ? undefined : nodeUnlink(this.prev).value;
}

QDList.prototype.push2 = function push2( value1, value2 ) {
    var node = nodeCreate2(this.prev, this, value1, value2);
    return nodeLinkin(node);
}

QDList.prototype.unshift2 = function unshift2( value1, value2 ) {
    var node = nodeCreate2(this, this.next, value1, value2);
    return nodeLinkin(node);
}


QDList.prototype.unlink = function unlink( node ) {
    return node.next ? nodeUnlink(node) : node;
}

QDList.prototype.linkin = function linkin( node, parent ) {
    this.unlink(node);
    node.prev = parent;
    node.next = parent.next;
    return nodeLinkin(node);
}

QDList.prototype.moveToTail = function moveToTail( node ) {
    return this.linkin(nodeUnlink(node), this.prev);
}

QDList.prototype.moveToHead = function moveToHead( node ) {
    return this.linkin(nodeUnlink(node), this);
}

QDList.prototype.findAtPosition = function findPrevious( ix ) {
    if (ix < 0) return null;
    for (var node = this.next; --ix >= 0 && node != this; node = node.next) ;
    return node === this ? null : node;
}

QDList.prototype.findPrevious = function findPrevious( ix ) {
    var node = this.findAtPosition(ix);
    return node ? node.prev : (ix <= 0 ? this : this.prev);
}

QDList.prototype.moveToPosition = function moveToPosition( node, ix ) {
    return this.linkin(nodeUnlink(node), this.findPrevious(ix));
}

QDList.prototype.head = function head( ) {
    return this.next !== this ? this.next : undefined;
}

QDList.prototype.tail = function tail( ) {
    return this.prev !== this ? this.prev : undefined;
}

QDList.prototype.forEach = function forEach( handler, limit ) {
    limit = limit || Infinity;
    var n = 0;
    for (var end = this, node = this.next; node !== end && n++ < limit; node = node.next) {
        handler(node);
    }
}

// for testing: return the values in the list, in order,
// but capped by limit to not be pray to broken linkage cycles
QDList.prototype.toArray = function toArray( limit ) {
    limit = limit >= 0 ? limit : Infinity;
    var vals = [];
    for (var node = this.next; node !== this && limit-- > 0; node = node.next) {
        vals.push(node.value);
    }
    return vals;
}

QDList.prototype.fromArray = function fromArray( array, append ) {
    if (!append) this.prev = this.next = this;
    for (var i = 0; i < array.length; i++) {
        this.push(array[i]);
    }
    return this;
}

// reverse the list by head and tail, then swapping prev/next in each node
QDList.prototype.reverse = function reverse( ) {
    swapPrevNext(this);
    for (var node = this.next, prev = node.prev; node !== this; node = prev, prev = node.prev) {
        swapPrevNext(node);
    }
    return this;

    function swapPrevNext(node) { var tmp = node.prev; node.prev = node.next; node.next = tmp }
}

// Convention: iterators that can be run only once return self,
// those that can be run many times must return a new iterator each time.
// The iterator object has a next() method that returns { value, done }.
// It is faster to reuse the same object for the iterator return value too.
QDList.prototype._iterator = function _iterator() {
    var list = this;
    var node = this;
    return {
        value: null,
        done: false,
        next: function() {
            this.value = (node = node.next);
            this.done = (node === list || !node);
            return this;
        }
    }
};
// install the iterator as Symbol.iterator if the node version supports it
try { eval("QDList.prototype[Symbol.iterator] = QDList.prototype._iterator;") } catch (e) {}

QDList.prototype = toStruct(QDList.prototype);
function toStruct( obj ) { return toStruct.prototype = obj }

})(module);
