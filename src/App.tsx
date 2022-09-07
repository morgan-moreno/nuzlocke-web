import { Box, Button, Flex, Spinner, VStack } from '@chakra-ui/react';
import { useGetEncountersForActiveAttempt } from './api/encounters';
import { Encounter } from './api/models/Encounter';
import { CreateEncounterModal } from './components/CreateEncounterModal';
import { EncounterCard } from './components/EncounterCard';
import { Converter } from './util/Converter';

export const App = () => {
	const { data, isLoading } = useGetEncountersForActiveAttempt();

	const handleCopyAllSets = async (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();

		const sets = Converter.convertManyEncountersToSmogonSet(
			data.data.encounters ?? []
		);

		try {
			await navigator.clipboard.writeText(sets);

			console.log('Contents copied to clipboard');
		} catch (error) {
			console.error('Error copying contents to clipboard');
		}
	};

	return (
		<VStack
			h='100vh'
			w='100vw'
			backgroundColor='AppWorkspace'
		>
			{isLoading ? (
				<Spinner />
			) : (
				<Box w='100%'>
					<Flex
						justify='space-between'
						flexDirection='row'
						px={4}
					>
						<div />
						<Button onClick={handleCopyAllSets}>Copy all sets</Button>
						<CreateEncounterModal />
					</Flex>
					<Flex
						flexWrap='wrap'
						gap={2}
						p={5}
					>
						{data &&
							data.data.encounters.map((encounter: Encounter) => (
								<EncounterCard
									key={encounter.id}
									encounter={encounter}
								/>
							))}
					</Flex>
				</Box>
			)}
		</VStack>
	);
};
