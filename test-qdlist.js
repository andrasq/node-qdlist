'use strict';

var qdlist = require('./');

function examineNode( node ) {
    var vals = [];
    var limit = 10;
    var node = node.next;
    var first = node;
    do {
        vals.push(node.value);
        node = node.next;
    } while (node !== first && limit-- >= 0);
    return vals;
}

module.exports = {
    'push linkage': function(t) {
        var l = qdlist();

        t.equal(l.next, l);
        t.equal(l.prev, l);

        l.push(1);
        t.equal(l.next.value, 1);       // head
        t.equal(l.prev.value, 1);       // tail

        l.push(2);
        t.equal(l.next.value, 1);       // head
        t.equal(l.next.next.value, 2);
        t.equal(l.prev.value, 2);       // tail

        l.push(3);
        t.equal(l.next.value, 1);       // head
        t.equal(l.next.next.value, 2);
        t.equal(l.next.next.next.value, 3);
        t.equal(l.prev.value, 3);       // tail

        t.done();
    },

    'unshift linkage': function(t) {
        var l = qdlist();

        l.unshift(3);
        t.equal(l.next.value, 3);       // head
        t.equal(l.prev.value, 3);       // tail

        l.unshift(2);
        t.equal(l.next.value, 2);
        t.equal(l.next.next.value, 3);
        t.equal(l.prev.value, 3);

        l.unshift(1);
        t.equal(l.next.value, 1);
        t.equal(l.next.next.value, 2);
        t.equal(l.next.next.next.value, 3);
        t.equal(l.prev.value, 3);

        t.done();
    },

    'shift': function(t) {
        var l = qdlist();
        l.push(1);
        l.push(2);
        l.push(3);

        t.equal(l.shift(), 1);
        t.equal(l.shift(), 2);
        t.equal(l.shift(), 3);
        t.strictEqual(l.shift(), undefined);

        t.equal(l.next, l);
        t.equal(l.prev, l);

        t.done();
    },

    'pop': function(t) {
        var l = qdlist();
        l.push(1);
        l.push(2);
        l.push(3);

        t.equal(l.pop(), 3);
        t.equal(l.pop(), 2);
        t.equal(l.pop(), 1);
        t.strictEqual(l.pop(), undefined);

        t.equal(l.next, l);
        t.equal(l.prev, l);

        t.done();
    },

    'unlink': function(t) {
        var l = qdlist();

        var node = l.push(1);
        l.unlink(node);
        t.strictEqual(l.shift(), undefined);

        l.push(1);
        var node = l.push(2);
        l.unlink(node);
        t.strictEqual(l.pop(), 1);
        t.strictEqual(l.pop(), undefined);

        var node = l.push(1);
        l.unlink(node);
        l.prev = l.next = 'other';
        l.unlink(node);
        t.equal(l.prev, 'other');
        t.equal(l.next, 'other');

        t.done();
    },

    'isEmpty': function(t) {
        var l = qdlist();
        t.ok(l.isEmpty());

        l.push(1);
        t.ok(!l.isEmpty());

        l.pop();
        t.ok(l.isEmpty());

        l.unshift(2);
        t.ok(!l.isEmpty());

        l.shift();
        t.ok(l.isEmpty());

        t.done();
    },

    'speed': function(t) {
        var l = qdlist();

        // for reproducible results restrict to one core, eg `taskset 2 qnit test*`
        var t1 = Date.now();
        for (var n=0; n<1e6; n++) {
            for (var i=0; i<10; i++) l.push(i);
            for (var i=0; i<10; i++) l.pop();
        }
        var t2 = Date.now();
        console.log("1e6 push/pop in %d ms", t2 - t1);

        t.done();
    },
}
