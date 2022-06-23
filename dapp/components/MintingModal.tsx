import {
	Box,
	Button,
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { MINT_GEM_TOKEN_ADDRESS } from "../caverConfig";
import { useAccount, useCaver, useMetadata } from "../hooks";
import { GemTokenData } from "../interfaces";

interface MintingModalProps {
	isOpen: boolean;
	onClose: () => void;
	// getRemainGemTokens: () => Promise<void>;
	// getGemTokenCount: () => Promise<void>;
}

const MintingModal: FC<MintingModalProps> = ({ isOpen, onClose }) => {
	const { account } = useAccount();
	const { caver, mintGemTokenContract, saleGemTokenContract } = useCaver();
	const { metadataURI, getMetadata } = useMetadata();

	const onClickMint = async () => {
		try {
			if (!account || !caver || !mintGemTokenContract || !saleGemTokenContract)
				return;

			const response = await caver.klay.sendTransaction({
				type: "SMART_CONTRACT_EXECUTION",
				from: account,
				to: MINT_GEM_TOKEN_ADDRESS,
				value: caver.utils.convertToPeb(1, "KLAY"),
				gas: "3000000",
				data: mintGemTokenContract.methods.mintGemToken().encodeABI(),
			});

			if (response) {
				const latestMintedGemToken: GemTokenData =
					await saleGemTokenContract.methods
						.getLatestMintedGemToken(account)
						.call();

				getMetadata(
					latestMintedGemToken.gemTokenRank,
					latestMintedGemToken.gemTokenType
				);
			}

			console.log(response);
		} catch (error) {
			console.error(error);
		}
	};
	console.log(metadataURI);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Minting</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Text>
						민팅하실? <b>fee: 1 KLAY</b>
					</Text>
				</ModalBody>

				<ModalFooter>
					<Button variant='ghost' colorScheme='blue' onClick={onClickMint}>
						Minting
					</Button>
					<Button ml={2} onClick={onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default MintingModal;
