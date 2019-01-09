'use strict'

// npm install qtimeit fast-list yallist qlist

var nitems = 100;

var qtimeit = require('qtimeit');
var fastlist = require('fast-list');
var qdlist = require('./');
var yallist = require('yallist');
var qlist = require('qlist');

var keys = new Array(nitems); for (var i=0; i<nitems; i++) keys[i] = 'hash-key-' + i;

qtimeit.bench.timeGoal = .1;
qtimeit.bench.showRunDetails = false;
qtimeit.bench.visualize = true;
qtimeit.bench.baselineAvg = 200000;
//qtimeit.bench.forkTests = true;
for (var i=0; i<5; i++) {
    qtimeit.bench({
// note: adding qlist to the benchmarks throws off the results of the others
//        'qlist queue str': function(){ testQueueK(new qlist()) },
//        'qlist stack str': function(){ testStackK(new qlist()) },

//        '[] queue num': function() { testQueue([]) },
//        '[] stack num': function() { testStack([]) },
        '[] queue str': function() { testQueueK([]) },
        '[] stack str': function() { testStackK([]) },

//        'yallist queue num': function() { testQueue(new yallist()) },
//        'yallist stack num': function() { testStack(new yallist()) },
        'yallist queue str': function() { testQueueK(new yallist()) },
        'yallist stack str': function() { testStackK(new yallist()) },
        'yallist set/get': function() { testList(new yallist()) },

//        'fast-list queue num': function() { testQueue(new fastlist()) },
//        'fast-list stack num': function() { testStack(new fastlist()) },
        'fast-list queue str': function() { testQueueK(new fastlist()) },
        'fast-list stack str': function() { testStackK(new fastlist()) },
        'fast-list set/get': function() { testList(new fastlist()) },

//        'qdlist queue num': function() { testQueue(qdlist()) },
//        'qdlist stack num': function() { testStack(qdlist()) },
        'qdlist queue str': function() { testQueueK(qdlist()) },
        'qdlist stack str': function() { testStackK(qdlist()) },
        'qdlist set/get': function() { testList(qdlist()) },

    })
    qtimeit.bench.showPlatformInfo = false;
    console.log("");
}

function testQueue( l ) {
    for (var n=0; n<nitems/10; n++) {
        for (var i=0; i<10; i++) l.push(i);
        for (var i=0; i<10; i++) l.shift();
    }
}

function testStack( l ) {
    for (var n=0; n<nitems/10; n++) {
        for (var i=0; i<10; i++) l.push(i);
        for (var i=0; i<10; i++) l.pop();
    }
}

function testQueueK( l ) {
    for (var n=0; n<nitems/10; n++) {
        for (var i=0; i<10; i++) l.push(keys[i]);
        for (var i=0; i<10; i++) l.shift();
    }
}

function testStackK( l ) {
    for (var n=0; n<nitems/10; n++) {
        for (var i=0; i<10; i++) l.push(keys[i]);
        for (var i=0; i<10; i++) l.pop();
    }
}

function testList( l ) {
    for (var i=0; i<keys.length>>1; i++) { l.unshift(i); l.push(i); }
    for (var i=0; i<keys.length>>1; i++) { l.push(keys[i]); }
    for (var i=0; i<keys.length>>1; i++) { l.shift(); l.pop() }
    for (var i=0; i<keys.length>>1; i++) { l.pop() }
}

function testListOverflow( l ) {
    for (var i=0; i<keys.length; i++) { l.push(keys[i]); }
    for (var i=0; i<keys.length; i++) { l.pop() }
}
