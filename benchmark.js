'use strict'

// npm install qtimeit fast-list yallist qlist

var nitems = 100;

var qtimeit = require('qtimeit');
var fastlist = require('fast-list');
var qdlist = require('./');
var yallist = require('yallist');
var qlist = require('qlist');

var keys = new Array(nitems); for (var i=0; i<nitems; i++) keys[i] = 'hash-key-' + i;

qtimeit.bench.timeGoal = .35;
qtimeit.bench.showRunDetails = false;
qtimeit.bench.visualize = true;
qtimeit.bench.baselineAvg = 200000 * nitems;
qtimeit.bench.opsPerTest = nitems*2;
//qtimeit.bench.forkTests = true;
for (var i=0; i<5; i++) {
    qtimeit.bench.showPlatformInfo = (i == 1);
    qtimeit.bench({
/**
        'qlist push/shift': function(){ testQueueK(new qlist()) },
        'qlist push/pop': function(){ testStackK(new qlist()) },
        'qlist push/unshift/shift/pop': function() { testList(new qlist()) },
**/

//        '[] push/shift num': function() { testQueue([]) },
//        '[] push/pop num': function() { testStack([]) },
        '[] push/shift': function() { testQueueK([]) },
        '[] push/pop': function() { testStackK([]) },
        '[] push/unshift/shift/pop': function() { testList([]) },
        //'Array push/unshift/shift/pop': function() { testList(new Array()) }, // same as []

/**
// yallist halves the measured push/pop and push/shift throughput of all lists
//        'yallist push/shift num': function() { testQueue(new yallist()) },
//        'yallist push/pop num': function() { testStack(new yallist()) },
        'yallist push/shift': function() { testQueueK(new yallist()) },
        'yallist push/pop': function() { testStackK(new yallist()) },
        'yallist push/unshift/shift/pop': function() { testList(new yallist()) },
/**/

//        'fast-list push/shift num': function() { testQueue(new fastlist()) },
//        'fast-list push/pop num': function() { testStack(new fastlist()) },
        'fast-list push/shift': function() { testQueueK(new fastlist()) },
        'fast-list push/pop': function() { testStackK(new fastlist()) },
        'fast-list push/unshift/shift/pop': function() { testList(new fastlist()) },

//        'qdlist push/shift num': function() { testQueue(qdlist()) },
//        'qdlist push/pop num': function() { testStack(qdlist()) },
        'qdlist push/shift': function() { testQueueK(qdlist()) },
        'qdlist push/pop': function() { testStackK(qdlist()) },
        'qdlist push/unshift/shift/pop': function() { testList(qdlist()) },

    })
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
    for (var i=0; i<nitems/4; i++) { l.unshift(i); l.push(i); }
    for (var i=0; i<nitems/2; i++) { l.push(keys[i]); }
    for (var i=0; i<nitems/4; i++) { l.shift(); l.pop() }
    for (var i=0; i<nitems/2; i++) { l.pop() }
}
