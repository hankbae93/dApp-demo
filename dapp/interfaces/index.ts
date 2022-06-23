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
