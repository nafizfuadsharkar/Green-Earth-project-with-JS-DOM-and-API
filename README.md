<body>
  <h1>Answers of given Questions</h1>
  <h2>1) What is the difference between var, let, and const?</h2>
  <p>
    var → Function-scoped, can be redeclared and updated, hoisted with value undefined.<br>
    let → Block-scoped, cannot be redeclared in the same scope, but can be updated.<br>
    const → Block-scoped, cannot be redeclared or updated (but objects/arrays declared with const can have their contents modified).
  </p>

  <h2>2) What is the difference between map(), forEach(), and filter()?</h2>
  <p>
    forEach() → Iterates over an array, executes a function for each element, does not return anything.<br>
    map() → Iterates and transforms elements, returns a new array with the transformed values.<br>
    filter() → Iterates and checks a condition, returns a new array containing only elements that pass the condition.
  </p>

  <h2>3) What are arrow functions in ES6?</h2>
  <p>
    Arrow functions are a shorter syntax for writing functions in ES6.<br>
    They do not have their own this, arguments, or super (they inherit from the enclosing scope).<br>
    They are useful for callbacks and when you want to avoid binding this.<br>
    Example: const add = (a, b) => a + b
  </p>

  <h2>4) How does destructuring assignment work in ES6?</h2>
  <p>
    Destructuring allows extracting values from arrays or objects into separate variables in a clean, concise way.<br>
    For arrays: [a, b] = [1, 2] → a=1, b=2<br>
    For objects: {x, y} = {x:10, y:20} → x=10, y=20<br>
    It avoids writing repetitive code and improves readability.
  </p>

  <h2>5) Explain template literals in ES6. How are they different from string concatenation?</h2>
  <p>
    Template literals are string literals written using backticks. They allow:<br>
    - String interpolation using ${}<br>
    - Multi-line strings without using \n<br>
    - Embedding expressions directly<br><br>
    Difference:<br>
    Concatenation: 'Hello ' + name + '!'<br>
    Template literal: `Hello ${name}!` which is more readable and flexible.
  </p>
</body>
