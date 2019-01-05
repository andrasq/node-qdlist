qdlist
======

Quick doubly-linked list.

Nodes are kept on a circular list, with the list itself being the terminal node.


Api
---

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

### unshift( value )
### push( value )

Append a new value to the head / tail of the list, respectively.  Returns the `node` that
contains the value.  The returned node has properties `value` containing the call argument
and `value2` with initial contents not specified.

### unshift2( value, value2 )
### push2( value, value2 )

Add a new pair of items to the head / tail of the list, respectively.  Returns the `node` that
contains the item with properties `node.value` set to `value` and `node.value2` set to `value2`.

### shift( )
### pop( )

Remove and return the first / last stored value from the list.  Returns `undefined` if the
list is empty.  If necessary, use `isEmpty` to distinguish the `undefined` value from an
empty list.

### isEmpty( )

Returns boolean `true` if the list is empty, else `false`.

### unlink( node )

Remove the node from the list.

### head( )
### tail( )

Return the first / last node on the list, or `undefined` if the list is empty.

Note that head / tail / push / unshift return nodes, but shift / pop return values.

### moveToHead( node )
### moveToTail( node )

Move the given node to the head / tail of the list.  The node may be unlinked, or may still
be on the list.

### forEach( handler(node) )

Call the handler with each node on the list, in list order.

### toArray( [limit] )

Return up to `limit` values from the list, in list order.  The default `limit` is Infinity,
all values.  Useful for testing or inspection.

    l.push(1);
    l.push(2);
    l.toArray();        // => [1, 2]

Changelog
---------

- 0.0.1 - first working version


Related Work
------------
