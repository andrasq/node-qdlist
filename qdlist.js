/**
 * qdlist -- quick doubly-linked list
 *
 * Keeps nodes on a circular doubly-linked list, with the list itself also on the list.
 *
 * 2019-01-04 - AR.
 */

;(function(module) {

'use strict';

module.exports = DList;

function Node( prev, next, value ) {
    this.next = next;   // head, because circular
    this.prev = prev;   // tail
    this.value = value;
    this._linked = false;
}

Node.prototype.linkin = function linkin( ) {
    this.prev.next = this;
    this.next.prev = this;
    this._linked = true;
    return this;
}

Node.prototype.unlink = function unlink( ) {
    if (this._linked) {
        var prev = this.prev, next = this.next;
        prev.next = next;
        next.prev = prev;
        this._linked = false;
    }
    return this;
}

function nodeCreate( prev, next, value ) {
    return { prev: prev, next: next, value: value, _linked: false };
}

function nodeLinkin( node ) {
    node.prev.next = node;
    node.next.prev = node;
    node._linked = true;
    return node;
}

function nodeUnlink( node ) {
    if (node._linked) {
        var prev = node.prev, next = node.next;
        prev.next = next;
        next.prev = prev;
        node._linked = false;
    }
    return node;
}

function DList( ) {
    if (!this || this === global) return new DList();
    this.prev = this;   // head of list, empty if `prev == this`
    this.next = this;   // tail of list, empty if `next == this`
    this.value = undefined;
}

DList.prototype.isEmpty = function isEmpty( ) {
    return this.next === this;
}

DList.prototype.push = function push( value ) {
    var node = nodeLinkin(nodeCreate(this.prev, this, value));
    return node;
}

DList.prototype.shift = function shift( ) {
    return nodeUnlink(this.next).value;
}

DList.prototype.unshift = function unshift( value ) {
    var node = nodeLinkin(nodeCreate(this, this.next, value));
    return node;
}

DList.prototype.pop = function pop( ) {
    return nodeUnlink(this.prev).value;
}

DList.prototype.unlink = function unlink( node ) {
    return nodeUnlink(node);
}

DList.prototype.moveToTail = function moveToTail( node ) {
    nodeUnlink(node);
    node.prev = this.next;
    node.next = this;
    return node.linkin();
}

DList.prototype.moveToHead = function moveToHead( node ) {
    nodeUnlink(node);
    node.prev = this;
    node.next = this.next;
    return node.linkin();
}

DList.prototype.head = function head( ) {
    return this.next !== this ? this.next : undefined;
}

DList.prototype.tail = function tail( ) {
    return this.prev !== this ? this.prev : undefined;
}

DList.prototype = toStruct(DList.prototype);
function toStruct( obj ) { return toStruct.prototype = obj }

})(module);
