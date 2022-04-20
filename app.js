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
    let type = levelChars[ch]; //determines if a specific character will translate into a static background piece or get pushed into the startActors array for moving parts
    if (typeof type == "string") return type;
    this.startActors.push(
     type.create(new Vec(x, y), ch));
     return "empty";
   });
  });
 }
}

class State { // this keeps track of the state of a running game so events like actors disappearing and player movement will be tracked by this class
 constructor(level, actors, status){
  this.level = level;
  this.actors = actors;
  this.status = status;
 }
 static start(level){
  return new State(level, level.startActors, "playing");
 }
 get player(){
  return this.actors.find(a => a.type == 'player')
 }
}

class Vec {
 constructor(x, y) {
  this.x = x;
  this.y = y;
 }
 plus(other) {
  return new Vec(this.x + other.x, this.y + other.y);
 }
 times(factor) {
  return new Vec(this.x * factor, this.y * factor);
 }
}

class Player {
 constructor(pos, speed) {
  this.pos = pos;
  this.speed = speed;
 }
 
 get type() { return 'player'; }

 static create(pos) {
  return new Player(pos.plus(new Vec(0, -0.5)),
                       new Vec(0, 0));
 }
}

Player.prototype.size = new Vec(0.8, 1.5);


class Lava {
 constructor(pos, speed, reset) {
   this.pos = pos;
   this.speed = speed;
   this.reset = reset;
 }
 get type() { return 'lava'; }

 static create(pos, ch) {
  if (ch == "=") {
   return new Lava(pos, new Vec(2,0));
  } else if (ch == "|"){
   return new Lava(pos, new Vec(0,2));
  } else if (ch == "v"){
   return new Lava(pos, new Vec(0,3))
  }
 }
}

Lava.prototype.size = new Vec(1,1);

class Coin {
 constructor(pos, basePos, wobble) {
  this.pos = pos;
  this.basePos = basePos;
  this.wobble = wobble;
 }
 get type() { return "coin"; }

 static create(pos) {
  let basePos = pos.plus(new Vec(0.2, 0.1));
  return new Coin(basePos, basePos,
                  Math.random() * Math.PI *2);
 }
}

Coin.prototype.size = new Vec(0.6, 0.6);

const levelChars = {
 ".": "empty", "#": "wall", "+": "lava", "@": Player, "o": Coin, "=": Lava, "|": Lava, "v": Lava
};

let simpleLevel = new Level(simpleLevelPlan);
console.log(`${simpleLevel.width} by ${simpleLevel.height}`);

// let exampleArray = [
//  ['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.'],
//  ['.','.','#','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','#','.','.'],
//  ['.','.','#','.','.','.','.','.','.','.','.','.','.','.','.','.','.','=','.','#','.','.'],
// ]

//the example array helps visualize how the iterator .map on the variable rows works. each row of the string becomes an array and each character inside of it becomes its own dimension giving us x,y coordiates 0,0 being the first dot in the first array 2,21 being the last dot in the 3rd array