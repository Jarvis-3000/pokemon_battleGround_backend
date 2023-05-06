const player1 = [];
const player2 = [];

const randomGenerator = (i) => {
  // because there are 649 pokemons in this API
  let random = Math.floor(Math.random() * 649) + 1;

  while (
    (player1.indexOf(random) !== -1 && player1.length < 5) ||
    (player2.indexOf(random) !== -1 && player2.length < 5)
  ) {
    random = Math.floor(Math.random() * 649) + 1;
  }

  if (i % 2 == 0) {
    player1.push(random);
  } else {
    player2.push(random);
  }
};

function GetRandomPokArray() {
  for (let i = 0; i < 10; i++) {
    //generating only 10 randoms for 2 player 5-5 each
    randomGenerator(i + 1);
  }

  return { player1: player1, player2: player2 };
}

module.exports = GetRandomPokArray;
