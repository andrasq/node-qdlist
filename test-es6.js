/*
 * Copyright (C) 2019 Andras Radics
 * Licensed under the Apache License, Version  2.0.
 */

'use strict';

var qdlist = require('./');

module.exports = {
    'iterator': function(t) {
        var list, values, node;

        list = qdlist();
        values = [];
        for (node of list) values.push(node.value);
        t.deepEqual(values, []);

        list = qdlist().fromArray([1]);
        values = [];
        for (node of list) values.push(node.value);
        t.deepEqual(values, [1]);

        list = qdlist().fromArray([1, 2, 3, 4]);
        values = [];
        for (node of list) values.push(node.value);
        t.deepEqual(values, [1, 2, 3, 4]);

        t.done();
    },
}
