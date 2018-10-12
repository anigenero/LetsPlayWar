import { GraphQLQuery } from '../../../types/graphql.types';
import { CardSuit } from '../../constant/card.suit';
import { transactional } from '../../orm';
import { GameEntity } from '../../orm/entity/game.entity';
import { GameRepository } from '../../orm/repository/game.repository';
import ICard = GQL.ICard;

/**
 * Creates the game
 */
export const createGameMutator: GraphQLQuery<GameEntity> = () =>
	transactional(async (connection) =>
		connection.getCustomRepository(GameRepository).save(new GameEntity({
			deck: JSON.stringify(generateDeck())
		}))
	);

function generateDeck(numOfDecks: number = 4) {

	const suites = [CardSuit.CLUB, CardSuit.DIAMOND, CardSuit.HEART, CardSuit.SPADE];
	const suiteCollection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

	let deck: Array<Partial<ICard>> = [];
	for (let i = 0; i < numOfDecks; i++) {

		deck = deck.concat(...suites.map((suit): Array<Partial<ICard>> => {
			return suiteCollection.map((rank): Partial<ICard> => ({
				suit: CardSuit.fromString(suit) as any,
				rank
			}));
		}));

	}

	const result = shuffleArrayDeck(deck);

	console.dir(result);

	return result;

}

function shuffleArrayDeck(deck: Array<Partial<ICard>>) {

	let random;
	let temp;
	for (let i = deck.length - 1; i > 0; i--) {

		random = Math.floor(Math.random() * (i + 1));
		temp = deck[i];

		deck[i] = deck[random];
		deck[random] = temp;

	}

	return deck;

}
