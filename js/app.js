// console.log('Fear is the mind killer.');

// SECTION - Classes:

class Starship {
  hull;
  firepower;
  accuracy;
  constructor(name) {
  this.name = name;
  }
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

// const user = new Intrepid('Voyager-J');
// const testShip = new BorgSphere('The Jenny');
// const testShip2 = new BorgSphere('The Betty');
// console.log(user);
// console.log(testShip);
// console.log(testShip2);

let humanPlayer;

// SECTION - game Object:

game = {
  alienShips: [],
  start() {
    humanPlayer = new Intrepid('Voyager-J');
    for (let a = 0; a < 6; a++) {
      let alienShip = new BorgSphere('Ship ' + a);
      game.alienShips.push(alienShip);
    }
  },
  battle() {
    // if (user.hull <= 0) { // run userAttack, alienAttack, etc. }
  },
  userAttack() {
      if ((prompt('Ready to attack? Enter (Yes / No)')).toLowerCase().match(/yes/)) {
      return console.log('Yes!');
    } else {
      return console.log(`call 'retreat()' method.`)
    }
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

game.start();
console.log(humanPlayer);
console.log(game.alienShips);
game.userAttack();