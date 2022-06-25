import {
	Box,
	Button,
	Flex,
	Input,
	InputGroup,
	InputRightAddon,
	Text,
} from "@chakra-ui/react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { SALE_GEM_TOKEN_ADDRESS } from "../caverConfig";
import { useAccount, useCaver, useMetadata } from "../hooks";
import { GemTokenData } from "../interfaces";
import GemCard from "./GemCard";

export interface MyGemCardProps {
	gemTokenData: GemTokenData;
}

const MyGemCard: FC<MyGemCardProps> = ({ gemTokenData }) => {
	const { caver, saleGemTokenContract } = useCaver();
	const { account } = useAccount();
	const [sellPrice, setSellPrice] = useState<string>("");
	const [myGemPrice, setMyGemPrice] = useState<string>(gemTokenData.tokenPrice);

	const { metadataURI, getMetadata } = useMetadata();

	const onClickSell = async () => {
		try {
			if (!account || !caver || !saleGemTokenContract) return;

			const response = await caver.klay.sendTransaction({
				type: "SMART_CONTRACT_EXECUTION",
				from: account,
				to: SALE_GEM_TOKEN_ADDRESS,
				gas: "3000000",
				data: saleGemTokenContract.methods
					.setForSaleGemToken(
						gemTokenData.tokenId,
						caver.utils.convertToPeb(sellPrice, "KLAY") // 가스비
					)
					.encodeABI(),
			});

			if (response.status) {
				setMyGemPrice(caver.utils.convertToPeb(sellPrice, "KLAY"));
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getMetadata(gemTokenData.gemTokenRank, gemTokenData.gemTokenType);
	}, []);

	return (
		<Box
			w={200}
			h='fit-content'
			my={2}
			bgColor='white'
			p={3}
			rounded='2xl'
			shadow='lg'
		>
			<GemCard metadataURI={metadataURI} />
			{myGemPrice === "0" ? (
				<Flex>
					<InputGroup size='sm'>
						<Input
							type='number'
							value={sellPrice}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setSellPrice(e.target.value)
							}
						/>
						<InputRightAddon>Klay</InputRightAddon>
					</InputGroup>
					<Button size='sm' onClick={onClickSell} ml={2} colorScheme='yellow'>
						Sell
					</Button>
				</Flex>
			) : (
				<Text>{caver?.utils.convertFromPeb(myGemPrice, "KLAY")} KLAY</Text>
			)}
		</Box>
	);
};

export default MyGemCard;
