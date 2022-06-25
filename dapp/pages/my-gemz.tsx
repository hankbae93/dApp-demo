import { Box, Button, Grid, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { MINT_GEM_TOKEN_ADDRESS, SALE_GEM_TOKEN_ADDRESS } from "../caverConfig";
import MyGemCard from "../components/MyGemCard";
import { useAccount, useCaver } from "../hooks";
import { GemTokenData } from "../interfaces";

const MyGemz: FC = () => {
	const { caver, mintGemTokenContract, saleGemTokenContract } = useCaver();
	const { account } = useAccount();
	const [myGemTokens, setMyGemTokens] = useState<GemTokenData[] | undefined>();
	const [saleStatus, setSaleStatus] = useState<boolean>(false);

	const getGemTokens = async () => {
		try {
			if (!account || !saleGemTokenContract) return;

			const response = await saleGemTokenContract.methods
				.getGemTokens(account)
				.call();

			console.log(response);

			setMyGemTokens(response);
		} catch (error) {
			console.error(error);
		}
	};

	const getSaleStatus = async () => {
		try {
			if (!account || !mintGemTokenContract) return;

			const response = await mintGemTokenContract.methods
				.isApprovedForAll(account, SALE_GEM_TOKEN_ADDRESS)
				.call();
			console.log(response);
			setSaleStatus(response);
		} catch (error) {
			console.error(error);
		}
	};

	const onClickSaleStatusToggle = async () => {
		try {
			if (!account || !caver || !mintGemTokenContract) return;

			const response = await caver.klay.sendTransaction({
				type: "SMART_CONTRACT_EXECUTION",
				from: account,
				to: MINT_GEM_TOKEN_ADDRESS,
				gas: "3000000",
				data: mintGemTokenContract.methods
					.setApprovalForAll(SALE_GEM_TOKEN_ADDRESS, !saleStatus)
					.encodeABI(),
			});

			if (response.status) {
				setSaleStatus(!saleStatus);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getGemTokens();
	}, [account, saleGemTokenContract]);
	useEffect(() => {
		getSaleStatus();
	}, [account, mintGemTokenContract]);

	return (
		<Box p={12} minH='100vh'>
			<Box py={4} textAlign='center'>
				<Text display='inline-block'>
					Sale Status : {saleStatus ? "True" : "False"}
				</Text>
				<Button
					size='xs'
					ml={2}
					colorScheme={saleStatus ? "red" : "blue"}
					onClick={onClickSaleStatusToggle}
				>
					{saleStatus ? "Cancel" : "Approve"}
				</Button>
			</Box>
			<Grid
				templateColumns='repeat(4, 1fr)'
				py={4}
				maxW='container.lg'
				mx='auto'
				justifyItems='center'
			>
				{myGemTokens?.map((v, i) => {
					return <MyGemCard key={i} gemTokenData={v} />;
				})}
			</Grid>
		</Box>
	);
};

export default MyGemz;
