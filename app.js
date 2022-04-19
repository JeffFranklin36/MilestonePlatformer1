let simpleLevelPlan = `
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................`;

class Level {
 constructor(plan) { // the argument that gets passed into plan is the string that defines a level
  let rows = plan.trim().split("\n").map(l => [...l]); // the string that gets passed in gets mapped into an array of arrays where each row of the string becomes an array exampleArray visualizes this
  this.height = rows.length; // because its now an array rows.length tells us how many rows of the string here are 
  this.width = rows[0].length; // initializing it to only tell you the length of one row will give you the width or amount of characters in a particular row
  this.startActors = []; // creates an array of objects that will hold elements that move on screan 
  this.rows = rows.map((row, y) =>{
   return row.map((ch, x) => {
    let type = levelChars[ch];
    if (typeof type == "string") return type;
    this.startActors.push(
     type.create(new Vec(x, y), ch));
     return "empty";
   });
  });
 }
}

let simpleLevel = new Level(simpleLevelPlan)

// let exampleArray = [
//  ['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.'],
//  ['.','.','#','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','#','.','.'],
//  ['.','.','#','.','.','.','.','.','.','.','.','.','.','.','.','.','.','=','.','#','.','.'],
// ]

//the example array helps visualize how the iterator .map on the variable rows works. each row of the string becomes an array and each character inside of it becomes its own dimension giving us x,y coordiates 0,0 being the first dot in the first array 2,21 being the last dot in the 3rd array