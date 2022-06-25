export interface GemTokenData {
	tokenId: string;
	gemTokenRank: string;
	gemTokenType: string;
	tokenPrice: string;
}

export interface GemTokenMetadata {
	name: string;
	description: string;
	image: string;
	attributes: { trait_type: string; value: number }[];
}
export interface IGem {
	name: string;
	description: string;
	image: string;
	attributes: [
		{ 0: { trait_type: "Rank"; value: number } },
		{ 1: { trait_type: "Type"; value: number } }
	];
}
