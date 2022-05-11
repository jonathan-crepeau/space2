
// SECTION - VARIABLES

let humanPlayer;



// SECTION - CLASSES

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
  accuracy = 0.7;
  constructor(name) {
    super(name);
  }
  greet() {
    console.log("Hello!");
  }
}

class BorgSphere extends Starship {
  hull = Math.floor(Math.random() * (6 - 3 + 1) + 3);
  firepower = Math.floor(Math.random() * (4 - 2 + 1) + 2);
  accuracy = Math.random() * (0.8 - 0.6 + 1) + 0.6;
  constructor(name) {
    super(name);
  }
  greet() {
    console.log('Resistance is futile.');
  }
}



// SECTION - FUNCTIONS

function playGame() {
  createShips();
  while (humanPlayer.hull > 0 && game.spheres.length > 0) {
    game.attackPrompt();
  }
  game.endOfGame();
}

function createShips() {
  humanPlayer = new Intrepid('Voyager-J');
  for (let a = 0; a < 6; a++) {
    game.spheres.push(new BorgSphere('Ship ' + (a + 1)));
  }
}



// SECTION - GAME OBJECT
game = {
  spheres: [],
  attackPrompt() {
    let userResponse = prompt('Attack?').toLowerCase();
    if (userResponse.match(/yes/)) {
      game.userAttack();
    } else if (userResponse.match(/no/)) {
      game.retreat();
    } else if (userResponse.match(/report/)) {
      console.log(humanPlayer);
      game.attackPrompt();
    } else {
      console.log('Response not recognized');
      setTimeout(() => {game.attackPrompt();}, 2000);
    }
  },
  userAttack() {
    if (Math.random() < humanPlayer.accuracy) {
      console.log("===== HIT ON BORG =====");
      game.spheres[0].hull -= humanPlayer.firepower;
      console.log('-----------------------')
      if (game.spheres[0].hull <= 0 && game.spheres.length > 1) {
        console.log("===== SPHERE DESTROYED =====");
        game.spheres.splice(0, 1);
        game.retreat();
      } else if (game.spheres[0].hull <= 0) {
        console.log("===== ALL SHIPS DESTROYED =====");
        game.spheres.splice(0, 1);
      } else {
        game.alienAttack();
      }
    } else {
      console.log("===== MISS ON BORG =====");
      game.alienAttack();
    }
  },
  alienAttack() {
    if (Math.random() < game.spheres[0].accuracy) {
      console.log("===== HIT ON VOYAGER-J =====");
      humanPlayer.hull -= game.spheres[0].firepower;
      game.attackPrompt();
    } else {
      console.log("===== MISS ON VOYAGER-J =====");
      game.attackPrompt();
    }
  },
  retreat() {
    let userResponse = prompt('Retreat?').toLowerCase();
    if (userResponse.match(/yes/)) {
      console.log('Retreated!');
      humanPlayer.hull = 0;
    } else if (userResponse.match(/no/)) {
      game.attackPrompt();
    } else if (userResponse.match(/report/)) {
      console.log(game.spheres.length + ' Borg spheres remain.');
      game.retreat();
    } else {
      console.log('Response not recognized, please try again:');
      game.retreat();
    }
  },
  endOfGame() {
    if (humanPlayer.hull <= 0) {
      console.log('Borg won.');
    } else {
      console.log('You won.');
    }
  }
}