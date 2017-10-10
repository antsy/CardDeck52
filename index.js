let seed = 0;

exports.handler = (event, context, callback) => {
    seed = +event.pathParameters.seed;
    
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(fisherYatesKnuth(deck())),
    });
};

/**
 * Deck of cards, unshuffled
 */
function deck(){
	const names = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	const suits = ['H','D','S','C'];

	return suits.reduce((deck, suit) => {
	    deck.push(...names.map((name) => { return {"suit": suit, "name": name}}));
	    return deck;
	    }, []);
}

/**
 * Fisher-Yates-Knuth shuffle
 */
function fisherYatesKnuth(deck) {
  let currentIndex = deck.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = rnd(1, 52);
    --currentIndex;

    temporaryValue = deck[currentIndex];
    deck[currentIndex] = deck[randomIndex];
    deck[randomIndex] = temporaryValue;
  }

  return deck;
}

/**
 * Seeded random number generator
 */
function rnd(min, max) {
    max = max || 1;
    min = min || 0;
 
    seed = (seed * 9301 + 49297) % 233280;

    return Math.floor(min + seed / 233280 * (max - min));
}
