let humanPlayer;

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
  constructor(name) {
    super(name);
  }
  hull = Math.floor(Math.random() * (6 - 3 + 1) + 3);
  firepower = Math.floor(Math.random() * (7 - 5 + 1) + 5);
  accuracy = Math.random() * (0.8 - 0.6 + 1) + 0.6;
}



// SECTION - game object.

game = {
  count: 0,
  borgShips: [],
  start() {
    humanPlayer = new Intrepid('Voyager-J');
    for (let a = 0; a < 6; a++) {
      game.borgShips.push(new BorgSphere('Ship ' + (a + 1)));
    };
    game.battle();
  },
  battle() {
    while (humanPlayer.hull > 0 && game.count < 6) {
      game.attackPrompt();
    }
    game.endOfGame();
  },
  attackPrompt() {
    let userResponse = prompt('Attack Borg Sphere? Enter ( YES / NO / REPORT)').toLowerCase();
    if (userResponse.match(/yes/)) {
      console.log('<<<<< ATTACK ON BORG >>>>>');
      console.log('Lieutenant, fire photon torpedos!');
      console.log("<<<<< -------------- >>>>>");
      game.userAttack();
    } else if (userResponse.match(/report/)) {
      console.log(humanPlayer);
      game.attackPrompt();
    } else if (userResponse.match(/no/)) {
      game.retreatOption();
    } else {
      console.log('Not a recognized answer, try again:')
      setTimeout(() => {game.attackPrompt();}, 2000);
    }
  },
  userAttack() {
    if (Math.random() < humanPlayer.accuracy) {
      console.log('<<<<< HIT >>>>>');
      console.log('Direct hit on the Borg vessel, sir.');
      console.log("<<<<< -------------- >>>>>");
      game.borgShips[0].hull -= humanPlayer.firepower;
      game.assessAlienVessel();
    } else {
      console.log("<<<<< NO DAMAGE >>>>>");
      console.log("Their shields are holding, Captain.");
      console.log("<<<<< -------------- >>>>>");
      game.alienAttack();
    }
  },
  alienAttack(){
    if (Math.random() < game.borgShips[0].accuracy) {
      console.log("<<<<< HIT ON VOYAGER-J >>>>>");
      console.log("Captain, incoming fire!");
      console.log("<<<<< -------------- >>>>>");
      humanPlayer.hull -= game.borgShips[0].firepower;
      game.attackPrompt();
    } else {
      console.log("<<<<< MISS ON VOYAGER-J >>>>>");
      console.log("Our shields are holding, Captain.");
      console.log("<<<<< -------------- >>>>>");
      game.attackPrompt();
    }
  },
  assessAlienVessel() {
    if (game.borgShips[0].hull <= 0 && game.count < 5) {
      console.log('<<<<< VESSEL DESTROYED >>>>>')
      console.log(`${game.borgShips[0].name} Destroyed.`);
      console.log("<<<<< -------------- >>>>>");
      game.borgShips.splice(0, 1);
      game.count += 1;
      game.retreatOption();
    } else if (game.borgShips[0].hull <= 0 && game.count == 5) {
      console.log("<<<<< FINAL VESSEL DESTROYED >>>>>");
      console.log(`${game.borgShips[0].name} Destroyed.`);
      console.log("<<<<< -------------- >>>>>");
      // game.borgShips = [];
      game.count += 1;
    } else {
      game.alienAttack();
    }
  },
  retreatOption() {
    let userResponse = prompt('Time to retreat? Enter (YES / NO / REPORT)').toLowerCase();
    if (userResponse.match(/yes/)) {
      game.borgShips = [];
      return console.log('RETREATED!');
    } else if (userResponse.match(/no/)) {
      game.attackPrompt();
    } else if (userResponse.match(/report/)) {
      console.log(game.borgShips.length + ' Borg Spheres remain.');
      game.retreatOption();
    }
  },
  endOfGame() {
    if (humanPlayer.hull <= 0) {
        console.log("<======== END OF GAME ========>");
        console.log(`THE BORG QUEEN WINS!`);
    } else if (game.borgShips.length == 0) {
      console.log('<======== END OF GAME ========>');
      console.log(`${humanPlayer.name} WINS!`)
    }
  },
}

game.start();