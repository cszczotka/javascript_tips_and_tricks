####A closure is a persistent local variable scope

A closure is a persistent scope which holds on to local variables even after the code execution has moved out of that block. Languages which support closure (such as JavaScript, Swift and Ruby) will allow you to keep a reference to a scope (including its parent scopes), even after the block in which those variables were declared has finished executing, provided you keep a reference to that block or function somewhere.

The scope object, and all its local variables, are tied to the function, and will persist as long as that function persists.

This gives us function portability. We can expect any variables that were in scope when the function was first defined to still be in scope when we later call the function, even if we call the function in a completely different context.
