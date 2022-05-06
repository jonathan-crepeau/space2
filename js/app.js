// console.log('Fear is the mind killer.');

// SECTION - Classes:

class Starship {
  constructor(name) {
  this.name = name;
  }
  // hull
  // firepower
  // accuracy
}

class Intrepid extends Starship {
  hull = 20;
  firepower = 5;
  accuracy = .7;
  constructor(name){
    super(name);
  }
  greet(){
    console.log('Hello!');
  }
}

class BorgSphere extends Starship {
  constructor(name) {
    super(name);
  }
  hull = Math.floor(Math.random() * (6 - 3 + 1) + 3);
  firepower = Math.floor(Math.random() * (4 - 2 + 1) + 2);
  accuracy = Math.random() * (0.8 - 0.6 + 1) + 0.6;

}

const user = new Intrepid('Voyager-J');
const testShip = new BorgSphere('The Jenny');
const testShip2 = new BorgSphere('The Betty');
console.log(user);
console.log(testShip);
console.log(testShip2);



// SECTION - game Object:

game = {
  alienShips: [],
  start() {
    // create Intrepid USS Voyager-J
    // create 6 alien vessels and populate 'alienShips' array with them.
  },
  battle() {
    // if (user.hull <= 0) {}
  },
  userAttack() {
    // prompt, "ready to attack?", for user reply of 'yes'
    // attack alien ship at [0] index in alienShips
  },
  alienAttack() {
    // alien at [0] index attacks user
  },
  retreatOption() {
    // prompt
    // ask user if they would like to retreat
  },
  endOfGame() {
    // most likely(?) to display game result in console
  }
}