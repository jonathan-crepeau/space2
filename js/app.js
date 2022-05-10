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
    setTimeout(() => {return game.battle();}, 1000);
  },
  battle() {
    while (humanPlayer.hull > 0) {
      // NOTE - return here means Voyager-J continues even when hull property is/falls below zero.
      game.attackPrompt();
    }
    return game.endOfGame();
  },
  attackPrompt() {
    let userResponse = prompt('Ready to attack? Enter (Yes / No / Report)').toLowerCase();
    if (userResponse.match(/yes/)) {
      console.log("[============ ATTACK ON BORG SPHERE ===============]");
      console.log('Lieutenant, fire photon torpedos!');
      console.log("[===========================]");
      game.userAttack();
    } else if (userResponse.match(/report/)) {
      console.log(humanPlayer);
      game.attackPrompt();
    } else {
      game.retreatOption();
    }
  },
  userAttack() {
    if (Math.random() < humanPlayer.accuracy) {
      game.alienShips[0].hull -= humanPlayer.firepower;
      console.log("[============ DIRECT HIT ON BORG SPHERE ===============]");
      console.log("Direct hit on enemy target, Captain.");
      console.log("[==================
        =========]");
    } else {
      console.log("[============ MISSED ATTACK ===============]");
      console.log("No hit with our torpedos, Captain.");
      console.log("[===========================]");
    }
    if (game.alienShips[0].hull <= 0) {
      console.log("[===========================]");
      console.log(`${game.alienShips[0].name} destroyed!`);
      console.log("[===========================]");
      game.spliceEnemy();
      game.retreatOption();
    } else {
      game.alienAttack()
    }
  },
  spliceEnemy() {
    game.alienShips.splice(0, 1);
  },
  alienAttack() {
    if (Math.random() < game.alienShips[0].accuracy) {
      humanPlayer.hull -= game.alienShips[0].firepower;
      console.log(`[============ ${game.alienShips[0].name}'S ATTACK ON INTREPID ===============]`);
      console.log("Direct hit to our starboard bow, Captain.");
      console.log("[===========================]");
    } else {
      console.log("[===========================]");
      console.log("Enemy's attack missed, Captain.");
      console.log("[===========================]");
    }
    return game.attackPrompt();
  },
  retreatOption() {
    let userResponse = prompt("Would you like to retreat?").toLowerCase();
    if (userResponse.match(/yes/)) {
      console.log("END OF GAME (retreated)");
    } else if (userResponse.match(/report/)) {
      console.log(game.alienShips.length + ' Borg Sphere left.');
      game.retreatOption();
    } else {
      game.attackPrompt();
    }
  },
  endOfGame() {
    console.log("[===========================]");
    console.log(`${humanPlayer.name} Destroyed\nEND OF GAME`);
    console.log("[===========================]");
    // most likely(?) to display game result in console
  }
}

game.start();