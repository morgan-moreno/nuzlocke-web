import React, { FC } from 'react';
import {
	Box,
	Button,
	Center,
	ModalBody,
	Text,
	VStack,
} from '@chakra-ui/react';
import { useInput } from '../../hooks/useInput';
import { Details } from './Details';
import { Ivs } from './Ivs';
import { Moves } from './Moves';
import { useCreateEncounter } from '../../api/encounters/useCreateEncounter';
import { CreateEncounterBody } from '../../api/encounters/types';

export interface CreateEncounterFormProps {
	onClose: VoidFunction;
}

export const CreateEncounterForm: FC<CreateEncounterFormProps> = ({
	onClose,
}) => {
	const { createEncounter, isLoading } = useCreateEncounter();

	// TODO: Add form validation support
	const nameInput = useInput<string>('');
	const abilityInput = useInput<string>('');
	const natureInput = useInput<string>('');
	const ivsInput = useInput<any>({
		hp: 0,
		atk: 0,
		def: 0,
		spa: 0,
		spd: 0,
		spe: 0,
	});
	const movesInput = useInput<Array<string>>(['', '', '', '']);

	const handleSaveAndAddAnother = async () => {
		const encounter: CreateEncounterBody = {
			name: nameInput.value,
			ability: abilityInput.value,
			nature: natureInput.value,
			ivs: ivsInput.value,
			moves: movesInput.value,
		};

		console.log('Creating encounter: ', encounter);

		await createEncounter(encounter);

		nameInput.resetValue();
		abilityInput.resetValue();
		natureInput.resetValue();
		ivsInput.resetValue();
		movesInput.resetValue();
	};
	const handleSaveAndClose = async () => {
		const encounter: CreateEncounterBody = {
			name: nameInput.value,
			ability: abilityInput.value,
			nature: natureInput.value,
			ivs: ivsInput.value,
			moves: movesInput.value,
		};

		console.log('Creating encounter: ', encounter);

		await createEncounter(encounter);

		onClose();
	};

	return (
		<ModalBody
			border='1px'
			borderColor='black'
			h='65vh'
			w='50vw'
			rounded='xl'
			shadow='lg'
			as='form'
		>
			<Center
				h='10%'
				borderBottom='1px'
				borderColor='black'
				background='teal.200'
				roundedTopRight='xl'
				roundedTopLeft='xl'
			>
				<Text
					fontSize='18px'
					fontFamily='cursive'
				>
					Add Encounter
				</Text>
			</Center>
			<VStack
				h='80%'
				p='5%'
			>
				<Details
					nameInput={nameInput}
					abilityInput={abilityInput}
					natureInput={natureInput}
				/>
				<Ivs ivsInput={ivsInput} />
				<Moves movesInput={movesInput} />
			</VStack>
			<Center
				h='10%'
				borderTop='1px'
				borderColor='black'
				backgroundColor='teal.200'
				roundedBottomLeft='xl'
				roundedBottomRight='xl'
				flexDirection='row'
				gap='1%'
			>
				<Button
					w='30%'
					bg='white'
					border='4px'
					borderColor='red.300'
					color='red.300'
					rounded='full'
					disabled={isLoading}
					onClick={onClose}
				>
					Cancel
				</Button>
				<Button
					tabIndex={15}
					w='30%'
					bg='white'
					border='4px'
					borderColor='purple.300'
					color='purple.300'
					rounded='full'
					onClick={handleSaveAndClose}
					disabled={isLoading}
				>
					Save & Close
				</Button>
				<Button
					tabIndex={14}
					w='30%'
					bg='white'
					border='4px'
					borderColor='purple.300'
					color='purple.300'
					rounded='full'
					onClick={handleSaveAndAddAnother}
					disabled={isLoading}
				>
					Save & Add Another
				</Button>
			</Center>
		</ModalBody>
	);
};
