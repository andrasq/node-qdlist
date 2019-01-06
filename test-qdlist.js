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

    'toArray': function(t) {
        var l = qdlist();
        t.deepEqual(l.toArray(), [ ]);
        l.push(1);
        t.deepEqual(l.toArray(), [ 1 ]);
        l.unshift(2);
        t.deepEqual(l.toArray(), [ 2, 1 ]);
        l.push2(3, 4);
        t.deepEqual(l.toArray(), [ 2, 1, 3 ]);
        l.unshift2(4, 5);
        t.deepEqual(l.toArray(), [ 4, 2, 1, 3 ]);
        t.done();
    },

    'forEach': function(t) {
        var l = qdlist();
        var nodes = [];
        var called = 0;
        l.forEach(function(node) { called += 1 });
        t.assert(!called);
        nodes.push(l.push(0));
        nodes.push(l.push(1));
        nodes.push(l.push(2));
        nodes.push(l.push(3));
        l.forEach(function(node) { called += 1; t.equal(node, nodes[node.value]); });
        t.equal(called, 4);
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

    'push2': function(t) {
        var l = qdlist();
        l.push2(1, 11);
        l.push2(2, 22);
        l.push2(3, 33);

        t.equal(l.next.value2, 11);
        t.equal(l.next.next.value2, 22);
        t.equal(l.next.next.next.value2, 33);
        t.equal(l.next.next.next.next, l);
        
        t.done();
    },

    'unshift2': function(t) {
        var l = qdlist();
        l.unshift2(3, 33);
        l.unshift2(2, 22);
        l.unshift2(1, 11);

        t.equal(l.next.value2, 11);
        t.equal(l.next.next.value2, 22);
        t.equal(l.next.next.next.value2, 33);
        t.equal(l.next.next.next.next, l);
        
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

    'tail, moveToTail': function(t) {
        var l = qdlist();
        t.equal(l.tail(), undefined);
        l.unshift(3);
        l.unshift(2);
        l.unshift(1);
        t.equal(l.head().value, 1);
        l.moveToTail(l.head());
        t.equal(l.head().value, 2);
        t.equal(l.tail().value, 1);
        t.done();
    },

    'head, moveToHead': function(t) {
        var l = qdlist();
        t.equal(l.head(), undefined);
        l.push(1);
        l.push(2);
        l.push(3);
        t.equal(l.head().value, 1);
        l.moveToHead(l.tail());
        t.equal(l.head().value, 3);
        t.equal(l.tail().value, 2);
        t.done();
    },

    'speed': function(t) {
        var l = qdlist();
        if (process.env.NODE_COVERAGE === 'Y') return t.skip();
        if (process.env.NODE_SPEED !== 'Y') return t.skip();

for (var j=0; j<3; j++) {
        // for reproducible results restrict to one core, eg `taskset 2 qnit test*`
        var t1 = Date.now();
        for (var n=0; n<1e6; n++) {
            for (var i=0; i<10; i++) l.push(i);
            for (var i=0; i<10; i++) l.pop();
        }
        var t2 = Date.now();
        console.log("1e7 push/pop in %d ms", t2 - t1);

        var t1 = Date.now();
        for (var n=0; n<1e6; n++) {
            for (var i=0; i<10; i++) l.push2(i, i);
            for (var i=0; i<10; i++) l.pop();
        }
        var t2 = Date.now();
        console.log("1e7 push2/pop in %d ms", t2 - t1);
}

        // note: node-v8 12% speed penalty for using the two-value form (but 5% node-v10, and no% node-v5.8)
        // note: but only 2.5% penalty if only one struct is used throughout
        // note: node-v10 60% slower than node-v8 and 100% slower than node-v5.8
        l.push2(1, 2);
        //console.log(l.head());

        t.done();
    },
}
