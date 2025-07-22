(function StackVM(globalObject) {
  let pointer = 0;

  const program = __PROGRAM__;
  const stack   = [];
  const scopes  = [];

  function readInstruction() {
    return program[pointer++];
  };
  
  function step() {
    switch(readInstruction()) {
      case __STACK_PUSH__:
        stack.push(readInstruction());
        break;
      case __BINARY_ADD__:
        stack.push(stack.pop() + stack.pop());
        break;
      case __BINARY_SUB__:
        stack.push(stack.pop() - stack.pop());
        break;
      case __BINARY_MUL__:
        stack.push(stack.pop() * stack.pop());
        break;
      case __BINARY_DIV__:
        stack.push(stack.pop() / stack.pop());
        break;
      case __BINARY_MOD__:
        stack.push(stack.pop() % stack.pop());
        break;
      case __BINARY_LESS__:
        stack.push(stack.pop() < stack.pop());
        break;
      case __BINARY_LESS_OR_EQUAL__:
        stack.push(stack.pop() <= stack.pop());
        break;
      case __BINARY_GREATER__:
        stack.push(stack.pop() > stack.pop());
        break;
      case __BINARY_GREATER_OR_EQUAL__:
        stack.push(stack.pop() >= stack.pop());
        break;
      case __BINARY_EQUAL__:
        stack.push(stack.pop() == stack.pop());
        break;
      case __BINARY_STRICT_EQUAL__:
        stack.push(stack.pop() === stack.pop());
        break;
      case __BINARY_NOT_EQUAL__:
        stack.push(stack.pop() != stack.pop());
        break;
      case __BINARY_STRICT_NOT_EQUAL__:
        stack.push(stack.pop() !== stack.pop());
        break;
      case __BINARY_BIT_SHIFT_LEFT__:
        stack.push(stack.pop() << stack.pop());
        break;
      case __BINARY_BIT_SHIFT_RIGHT__:
        stack.push(stack.pop() >> stack.pop());
        break;
      case __BINARY_BIT_SHIFT_RIGHT_UNSIGNED__:
        stack.push(stack.pop() >>> stack.pop());
        break;
      case __BINARY_BIT_XOR__:
        stack.push(stack.pop() ^ stack.pop());
        break;
      case __BINARY_BIT_OR__:
        stack.push(stack.pop() | stack.pop());
        break;
      case __BINARY_BIT_AND__:
        stack.push(stack.pop() & stack.pop());
        break;
      case __UNARY_PLUS__:
        stack.push(+stack.pop());
        break;
      case __UNARY_MINUS__:
        stack.push(-stack.pop());
        break;
      case __UNARY_NOT__:
        stack.push(!stack.pop());
        break;
      case __UNARY_BIT_NOT__:
        stack.push(~stack.pop());
        break;
      case __STORE_VARIABLE__:
        var value = stack.pop();
        var scopeId = readInstruction();
        var definitionId = readInstruction();
    
        scopes[scopeId] ??= {};

        scopes[scopeId][definitionId] = value;

        break;
      case __STORE_CONSTANT__:
        var value = stack.pop();
        var scopeId = readInstruction();
        var definitionId = readInstruction();
    
        if(scopes[scopeId] === undefined) {
          scopes[scopeId] = {};
        };
    
        Object.defineProperty(scopes[scopeId], definitionId, {
          get() {
            return value;
          },
          set() {
            throw new Error("Assignment to constant.");
          }
        });
        break;
      case __LOAD_FROM_SCOPE__:
        var scopeId = readInstruction();
        var definitionId = readInstruction();
    
        stack.push(scopes[scopeId][definitionId]);
        break;
      case __LOAD_FROM_GLOBAL__:
        stack.push(globalObject[readInstruction()]);
        break;
      case __ASSIGN_VARIABLE__:
        var value = stack.pop();
        var scopeId = readInstruction();
        var definitionId = readInstruction();

        scopes[scopeId][definitionId] = value;
        break;
      case __BUILD_ARRAY__:
        var arrayLength = readInstruction();
        var array = new Array(arrayLength);

        for(var i = 0; i < arrayLength; i++) {
          array[i] = stack.pop();
        };
        
        stack.push(array);
        break;
      case __BUILD_OBJECT__:
        var pairsLength = readInstruction();
        var object = new Object(pairsLength);

        for(var i = 0; i < pairsLength; i++) {
          var value = stack.pop();
          var key = stack.pop();

          object[key] = value;
        };

        stack.push(object);
        break;
      case __GET_PROPERTY__:
        var key = stack.pop();
        var object = stack.pop();

        stack.push(object[key]);
        break;
      case __SET_PROPERTY__:
        var value = stack.pop();
        var key = stack.pop();
        var object = stack.pop();

        object[key] = value;

        stack.push(object);
        break;
      case __CALL_FUNCTION__:
        var argsLength = readInstruction();
        var args = new Array(argsLength);

        for(var i = 0; i < argsLength; i++) {
          args[i] = stack.pop();
        };

        var fn = stack.pop();

        stack.push(fn(...args));
        break;
      case __CALL_METHOD__:
        var argsLength = readInstruction();
        var args = new Array(argsLength);

        for(var i = 0; i < argsLength; i++) {
          args[i] = stack.pop();
        };

        var key = stack.pop();
        var object = stack.pop();

        stack.push(object[key].apply(object, args));
        break;
      case __JMP__:
        var newPointer = readInstruction();

        pointer = newPointer;
        break;
      case __JMP_IF_TRUE__:
        var newPointer = readInstruction();
        var condition  = stack.pop();

        if(condition)
          pointer = newPointer;
        break;
      case __JMP_IF_FALSE__:
        var newPointer = readInstruction();
        var condition  = stack.pop();

        if(!condition)
          pointer = newPointer;
        break;
    };
  };
  
  function stepWithDebug() {
    if(pointer >= program.length) {
      return;
    };
    
    step();
  
    // console.log(pointer, stack, scopes);

    return true;
  };
  
  while(stepWithDebug());
}(this));