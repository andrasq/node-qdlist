qdlist
======

Quick doubly-linked list.

Nodes are kept on a circular list, with the list itself being the terminal node.


Api
---

### unshift( value )
### push( value )

Add a new item to the head / tail of the list, respectively.  Returns the `node` that
contains the item.

### shift( )
### pop( )

Remove and return the first / last item from the list.  Returns `undefined` if the
list is empty.

### isEmpty( )

Test whether the list is empty.

### unlink( node )

Remove the specific node from the list.

### moveToHead( node )
### moveToTail( node )

Move the given node to the head / tail of the list.
