/*
 * Copyright (C) 2019 Andras Radics
 * Licensed under the Apache License, Version  2.0.
 */

'use strict';

var qdlist = require('./');

function testIterate(list) {
    var values = [];
    try { eval("for (var node of list) values.push(node.value);") } catch (e) { return e }
    return values;
}

module.exports = {
    'iterator': function(t) {
        var list = qdlist(), values, node;

        if (testIterate(list) instanceof Error) {
            console.log("Iterators not supported on node version %s", process.version);
            t.skip();
        }

        list = qdlist();
        values = testIterate(list);
        t.deepEqual(values, []);

        list.fromArray([1]);
        values = testIterate(list);
        t.deepEqual(values, [1]);

        list.fromArray([1, 2, 3, 4]);
        values = testIterate(list);
        t.deepEqual(values, [1, 2, 3, 4]);

        t.done();
    },
}
