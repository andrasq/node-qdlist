qdlist
======
[![Build Status](https://api.travis-ci.org/andrasq/node-qdlist.svg?branch=master)](https://travis-ci.org/andrasq/node-qdlist?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/andrasq/node-qdlist/badge.svg?branch=master)](https://coveralls.io/github/andrasq/node-qdlist?branch=master)

Quicker doubly-linked list.

Items are kept on a circular linked list, with the list itself being the terminal node.


API - List operations
---------------------

### qdlist( )

Construct a new empty list.  Can be called either as a function or as a constructor with
`new qdlist()`.

    const qdlist = require('qdlist');
    const list = qdlist();

    list.push(1);
    list.push(2);
    list.push(3);
    list.moveToTail(list.head());
    list.toArray();
    // => [ 2, 3, 1 ]

### unshift( value ),  push( value )

Append a new value to the head / tail of the list, respectively.  Returns the `node` that
contains the value.  The returned node has properties `prev`, `next`, `value` containing
the call argument and `value2` with initial contents not specified.

Note that push / unshift / head / tail return nodes, but shift / pop return values.

### unshift2( value, value2 ),  push2( value, value2 )

Add a new pair of items to the head / tail of the list, respectively.  Returns the `node` that
contains the item with properties `node.value` set to `value` and `node.value2` set to `value2`.

### shift( ),  pop( )

Remove and return the first / last value on the list.  Returns `undefined` if the
list is empty.  If necessary, use `isEmpty` to distinguish the `undefined` value from an
empty list.

### isEmpty( )

Returns boolean `true` if the list is empty, else `false`.

### toArray( [limit] )

Return up to `limit` values from the list, in list order.  The default `limit` is Infinity,
return all values.  Useful for testing or inspection.

    l.push(1);
    l.push(2);
    l.toArray();        // => [1, 2]

### fromArray( array [,append] )

Set the linked-list contents from the array.  If `append` is truthy the values are appended
to the list, else the existing list contents are replaced with the values from the array.

### reverse( )

Reorder the nodes on the list so that the old tail becomes the first element and the old
head becomes the last.  `reverse` is fairly efficient, it does not create objects just
rearranges the linkages.


API - Node Operations
---------------------

Linkage is via `node`s with properties `prev` and `next` that point to the previous and next
nodes on the list, respectively.  The list is circular, the list itself connecting the first
node to the last:  `prev` of the first node and `next` of the last node point to the list.
A node on the list has `node.next` set, when unlinked `node.next` is cleared.

        +-------+
        |List:  |
        | .prev |-------------------------------------------+
        |       |                                           V
        |       |     +-------+     +-------+            +-------+
        |       |     |node1: |     |node2: |    ...     |nodeN: |
        |       |<----| .prev |<----| .prev |<-----------| .prev |
    +-->| .next |---->| .next |---->| .next |----------->| .next |--+
    |   +-------+     +-------+     +-------+            +-------+  |
    +---------------------------------------------------------------+

    Node: {
        prev: null,
        next: null,
        // value
        // value2
    }

### unlink( node )

Remove the node from the list if linked.  Returns the node.

### head( ),  tail( )

Return the first / last node on the list, or `undefined` if the list is empty.

### moveToHead( node ),  moveToTail( node )

Move the given node to the head / tail of the list.  The node can be still on the list, else
must be unlinked (with `next` cleared).

### forEach( handler(node) )

Call the handler with each node on the list, in list order.
The values are accessible as `node.value` and `node.value2`.


Changelog
---------

- 0.10.3 - speed up by simplifying node layout
- 0.10.2 - faster `pop`, `shift`
- 0.10.1 - faster `toArray`
- 0.10.0 - `fromArray` method, `reverse` method
- 0.9.0 - first release version
- 0.0.1 - first working version


Todo
----

- `toArray` offset,limit mode


Related Work
------------

- [`fast-list`](https://npmjs.org/fast-list)
- [`yallist`](https://npmjs.org/yallist)
