/**
 * qdlist -- quick doubly-linked list
 *
 * Keeps nodes on a circular doubly-linked list, with the list itself also on the list.
 *
 * Copyright (C) 2019 Andras Radics
 * Licensed under the Apache License, Version  2.0.
 *
 * 2019-01-04 - AR.
 */

;(function(module) {

'use strict';

module.exports = DList;


function nodeCreate( prev, next, value ) {
    return { prev: prev, next: next, value: value, value2: null, _linked: true };       // 32 byte struct
    // return { prev: prev, next: next, value: value, _linked: false };                 // 28 byte struct
}

function nodeCreate2( prev, next, value, value2 ) {
    return { prev: prev, next: next, value: value, value2: value2, _linked: true };     // 32 byte struct
    // using the 32-byte struct is 1.5-2% slower, but users of the value2 field run 5% faster, so a net win
    // using the same struct type is as much as 15% faster than mixing two struct sizes
}

function nodeLinkin( node ) {
    node.prev.next = node;
    node.next.prev = node;
    //node._linked = true;      // update manually as needed
    return node;
}

function nodeUnlink( node ) {
    // only ever called on linked nodes
    var prev = node.prev, next = node.next;
    prev.next = next;
    next.prev = prev;
    node._linked = false;
    return node;
}

// the list starts with dl.next (=head), and ends with dl.prev (=tail)
// Inside the list, prev/next have their intuitive meanings.
function DList( ) {
    if (!this || this === global) return new DList();
    this.prev = this;
    this.next = this;
    this.value = undefined;
}

DList.prototype.isEmpty = function isEmpty( ) {
    return this.next === this;
}

DList.prototype.push = function push( value ) {
    var node = nodeCreate(this.prev, this, value);
    return nodeLinkin(node);
}

DList.prototype.shift = function shift( ) {
    return this.next === this ? undefined : nodeUnlink(this.next).value;
}

DList.prototype.unshift = function unshift( value ) {
    var node = nodeCreate(this, this.next, value);
    return nodeLinkin(node);
}

DList.prototype.pop = function pop( ) {
    return this.prev === this ? undefined : nodeUnlink(this.prev).value;
}

DList.prototype.push2 = function push2( value1, value2 ) {
    var node = nodeCreate2(this.prev, this, value1, value2);
    return nodeLinkin(node);
}

DList.prototype.unshift2 = function unshift2( value1, value2 ) {
    var node = nodeCreate2(this, this.next, value1, value2);
    return nodeLinkin(node);
}


DList.prototype.unlink = function unlink( node ) {
    return node._linked ? nodeUnlink(node) : node;
}

DList.prototype.moveToTail = function moveToTail( node ) {
    DList.prototype.unlink(node);
    node.prev = this.prev;
    node.next = this;
    node._linked = true;
    return nodeLinkin(node);
}

DList.prototype.moveToHead = function moveToHead( node ) {
    DList.prototype.unlink(node);
    node.prev = this;
    node.next = this.next;
    node._linked = true;
    return nodeLinkin(node);
}

DList.prototype.head = function head( ) {
    return this.next !== this ? this.next : undefined;
}

DList.prototype.tail = function tail( ) {
    return this.prev !== this ? this.prev : undefined;
}

DList.prototype.forEach = function forEach( handler, limit ) {
    limit = limit || Infinity;
    var n = 0;
    for (var end = this, node = this.next; node !== end && n++ < limit; node = node.next) {
        handler(node);
    }
}

// for testing: return the values in the list, in order,
// but capped by limit to not be pray to broken linkage cycles
DList.prototype.toArray = function toArray( limit ) {
    limit = limit >= 0 ? limit : Infinity;
    var vals = [];
    for (var node = this.next; node !== this && limit-- > 0; node = node.next) {
        vals.push(node.value);
    }
    return vals;
}

DList.prototype.fromArray = function fromArray( array, append ) {
    if (!append) this.prev = this.next = this;
    for (var i = 0; i < array.length; i++) {
        this.push(array[i]);
    }
    return this;
}

// reverse the list by head and tail, then swapping prev/next in each node
DList.prototype.reverse = function reverse( ) {
    swapPrevNext(this);
    for (var node = this.next, prev = node.prev; node !== this; node = prev, prev = node.prev) {
        swapPrevNext(node);
    }
    return this;

    function swapPrevNext(node) { var tmp = node.prev; node.prev = node.next; node.next = tmp }
}

DList.prototype = toStruct(DList.prototype);
function toStruct( obj ) { return toStruct.prototype = obj }

})(module);
