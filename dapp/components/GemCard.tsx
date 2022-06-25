import { Box, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { FC, useEffect, useState } from "react";

import { GemTokenMetadata, IGem } from "../interfaces";

interface GemCardProps {
	metadataURI: GemTokenMetadata | undefined;
}

const GemCard: FC<GemCardProps> = ({ metadataURI }) => {
	// const [metadataURI, setMetadataURI] = useState<IGem | undefined>(undefined);

	// const getMetadata = async () => {
	// 	try {
	// 		const response = await axios.get(
	// 			`${process.env.NEXT_PUBLIC_METADATA_URI}/${gemRank}/${gemType}.json`
	// 		);

	// 		setMetadataURI(response.data);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	// useEffect(() => {
	// 	getMetadata();
	// }, []);

	return (
		<Box w={200}>
			<Image
				src={metadataURI?.image}
				fallbackSrc='images/loading.png'
				alt='h662GEMz'
			/>
			<Text>{metadataURI?.name}</Text>
			<Text>{metadataURI?.description}</Text>
		</Box>
	);
};

export default GemCard;
