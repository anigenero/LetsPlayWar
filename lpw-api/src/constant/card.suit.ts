export enum CardSuit {
	SPADE = 'S',
	CLUB = 'C',
	HEART = 'H',
	DIAMOND = 'D',
}

export namespace CardSuit {

	export function fromString(cardSuit: string): CardSuit {
		return (CardSuit as any)[Object.keys(CardSuit).filter((value) => (cardSuit === (CardSuit as any)[value] || cardSuit === value))[0]];
	}

	export function toString(cardSuit: CardSuit): string {
		return Object.keys(CardSuit).filter((value) => cardSuit === (CardSuit as any)[value])[0];
	}

}