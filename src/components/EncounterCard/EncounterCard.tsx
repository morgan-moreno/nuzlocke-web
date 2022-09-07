import {
	Text,
	Box,
	Center,
	Flex,
	IconButton,
	FormControl,
	FormLabel,
	Input,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { BiCopy } from 'react-icons/bi';
import { FaBookDead, FaEdit, FaRegSave } from 'react-icons/fa';
import {
	CreateStats,
	UpdateEncounterBody,
} from '../../api/encounters/types';
import { useKillEncounter } from '../../api/encounters/useKillEncounter';
import { useUpdateEncounter } from '../../api/encounters/useUpdateEncounter';
import { Encounter } from '../../api/models/Encounter';
import { useInput } from '../../hooks/useInput';
import { invalidateQuery } from '../../lib/react-query';
import { Converter } from '../../util/Converter';

export interface EncounterCardProps {
	encounter: Encounter;
}

export const EncounterCard: FC<EncounterCardProps> = ({
	encounter,
}) => {
	const { updateEncounter } = useUpdateEncounter({
		onSuccess: async data => {
			console.log('Data: ', data);
			await invalidateQuery('activeAttempt/encounters');
		},
		onError: error => {
			console.error('Error: ', error);
		},
	});
	const { killEncounter } = useKillEncounter();
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const {
		isOpen: isKillModalOpen,
		onOpen: onOpenKillModal,
		onClose: onCloseKillModal,
	} = useDisclosure();

	// TODO: Extract to a form hook w/ validation
	const abilityInput = useInput<string>(encounter.ability);
	const natureInput = useInput<string>(encounter.nature);
	const ivsInput = useInput<CreateStats>(encounter.ivs);
	const evsInput = useInput<CreateStats>(encounter.evs);
	const movesInput = useInput<Array<string>>(encounter.moves);

	// TODO: Extract to a form hook w/ validation
	const descriptionInput = useInput<string>('');

	const handleEditClick = async (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();

		setIsEditing(true);
	};

	const handleSaveClick = async (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();

		const newEncounter: UpdateEncounterBody = {
			id: encounter.id,
			name: encounter.name,
			ability: abilityInput.value,
			nature: natureInput.value,
			ivs: ivsInput.value,
			evs: evsInput.value,
			moves: movesInput.value,
		};

		// Send update request to api
		console.log('Updating encounter: ', newEncounter);

		await updateEncounter(newEncounter);

		setIsEditing(false);
	};

	const handleKillClick = async (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();

		onOpenKillModal();
	};

	const handleKillSubmit = async () => {
		console.log('Killing encounter', {
			name: encounter.name,
			description: descriptionInput.value,
		});

		await killEncounter({
			name: encounter.name,
			description: descriptionInput.value,
		});

		descriptionInput.resetValue();
		onCloseKillModal();
	};

	const handleCopyIndividualSet = async (encounter: Encounter) => {
		const set = Converter.convertEncounterToSmogonSet(encounter);

		try {
			await navigator.clipboard.writeText(set);

			console.log('Copied contents to clipboard!');
		} catch (error) {
			console.log('Error copying to clipboard: ', error);
		}
	};
	return (
		<>
			<Box
				id={`encounter-card-${encounter.id}`}
				key={encounter.id}
				minW='30%'
				maxW='auto'
				minH='25vh'
				maxH='auto'
				border='1px'
				borderColor='black'
				rounded='lg'
				shadow='md'
			>
				{/** Card Header */}
				<Flex
					justify='space-between'
					align='center'
					h='15%'
					borderBottom='1px'
					borderColor='black'
					px={4}
					py={2}
					roundedTopRight='lg'
					roundedTopLeft='lg'
				>
					<Text
						fontSize='18px'
						fontFamily='fantasy'
					>
						{encounter.name}
					</Text>
					<Center>
						<IconButton
							onClick={() => handleCopyIndividualSet(encounter)}
							icon={<BiCopy />}
							background='transparent'
							aria-label={`copy set for ${encounter.name}`}
							_hover={{
								opacity: '60%',
							}}
						/>
						<IconButton
							onClick={handleKillClick}
							icon={<FaBookDead />}
							background='transparent'
							aria-label={`kill ${encounter.name}`}
							_hover={{
								opacity: '60%',
							}}
						/>
						{isEditing ? (
							<IconButton
								onClick={handleSaveClick}
								icon={<FaRegSave />}
								background='transparent'
								aria-label={`edit ${encounter.name}`}
								_hover={{
									opacity: '60%',
								}}
							/>
						) : (
							<IconButton
								onClick={handleEditClick}
								icon={<FaEdit />}
								background='transparent'
								aria-label={`edit ${encounter.name}`}
								_hover={{
									opacity: '60%',
								}}
							/>
						)}
					</Center>
				</Flex>

				{/** Card Body */}
				<Flex
					flexDirection='column'
					h='85%'
					backgroundColor='gray.100'
					roundedBottomRight='lg'
					roundedBottomLeft='lg'
					px={4}
					py={2}
					fontFamily='mono'
					fontWeight='bold'
				>
					{isEditing ? (
						<>
							<FormControl>
								<FormLabel>Ability</FormLabel>
								<Input
									backgroundColor='white'
									type='text'
									value={abilityInput.value}
									onChange={e =>
										abilityInput.setValue(e.target.value)
									}
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Nature</FormLabel>
								<Input
									backgroundColor='white'
									type='text'
									value={natureInput.value}
									onChange={e => natureInput.setValue(e.target.value)}
								/>
							</FormControl>
							<Flex justify='space-evenly'>
								<FormControl w='16%'>
									<FormLabel>Hp</FormLabel>
									<Input
										backgroundColor='white'
										type='number'
										value={ivsInput.value.hp}
										onChange={e =>
											ivsInput.setValue({
												...ivsInput.value,
												hp: Number(e.target.value),
											})
										}
									/>
								</FormControl>
								<FormControl w='16%'>
									<FormLabel>Atk</FormLabel>
									<Input
										backgroundColor='white'
										type='number'
										value={ivsInput.value.atk}
										onChange={e =>
											ivsInput.setValue({
												...ivsInput.value,
												atk: Number(e.target.value),
											})
										}
									/>
								</FormControl>
								<FormControl w='16%'>
									<FormLabel>Def</FormLabel>
									<Input
										backgroundColor='white'
										type='number'
										value={ivsInput.value.def}
										onChange={e =>
											ivsInput.setValue({
												...ivsInput.value,
												def: Number(e.target.value),
											})
										}
									/>
								</FormControl>
								<FormControl w='16%'>
									<FormLabel>SpA</FormLabel>
									<Input
										backgroundColor='white'
										type='number'
										value={ivsInput.value.spa}
										onChange={e =>
											ivsInput.setValue({
												...ivsInput.value,
												spa: Number(e.target.value),
											})
										}
									/>
								</FormControl>
								<FormControl w='16%'>
									<FormLabel>SpD</FormLabel>
									<Input
										backgroundColor='white'
										type='number'
										value={ivsInput.value.spd}
										onChange={e =>
											ivsInput.setValue({
												...ivsInput.value,
												spd: Number(e.target.value),
											})
										}
									/>
								</FormControl>
								<FormControl w='16%'>
									<FormLabel>Spe</FormLabel>
									<Input
										backgroundColor='white'
										type='number'
										value={ivsInput.value.spe}
										onChange={e =>
											ivsInput.setValue({
												...ivsInput.value,
												spe: Number(e.target.value),
											})
										}
									/>
								</FormControl>
							</Flex>
							<Flex justify='space-evenly'>
								<FormControl w='16%'>
									<FormLabel>Hp</FormLabel>
									<Input
										backgroundColor='white'
										type='number'
										value={evsInput.value.hp}
										onChange={e =>
											evsInput.setValue({
												...evsInput.value,
												hp: Number(e.target.value),
											})
										}
									/>
								</FormControl>
								<FormControl w='16%'>
									<FormLabel>Atk</FormLabel>
									<Input
										backgroundColor='white'
										type='number'
										value={evsInput.value.atk}
										onChange={e =>
											evsInput.setValue({
												...evsInput.value,
												atk: Number(e.target.value),
											})
										}
									/>
								</FormControl>
								<FormControl w='16%'>
									<FormLabel>Def</FormLabel>
									<Input
										backgroundColor='white'
										type='number'
										value={evsInput.value.def}
										onChange={e =>
											evsInput.setValue({
												...evsInput.value,
												def: Number(e.target.value),
											})
										}
									/>
								</FormControl>
								<FormControl w='16%'>
									<FormLabel>SpA</FormLabel>
									<Input
										backgroundColor='white'
										type='number'
										value={evsInput.value.spa}
										onChange={e =>
											evsInput.setValue({
												...evsInput.value,
												spa: Number(e.target.value),
											})
										}
									/>
								</FormControl>
								<FormControl w='16%'>
									<FormLabel>SpD</FormLabel>
									<Input
										backgroundColor='white'
										type='number'
										value={evsInput.value.spd}
										onChange={e =>
											evsInput.setValue({
												...evsInput.value,
												spd: Number(e.target.value),
											})
										}
									/>
								</FormControl>
								<FormControl w='16%'>
									<FormLabel>Spe</FormLabel>
									<Input
										backgroundColor='white'
										type='number'
										value={evsInput.value.spe}
										onChange={e =>
											evsInput.setValue({
												...evsInput.value,
												spe: Number(e.target.value),
											})
										}
									/>
								</FormControl>
							</Flex>
							<Flex py={4}>
								{movesInput.value.map((move, index) => (
									<Input
										key={`moves[${index}]`}
										type='text'
										backgroundColor='white'
										value={move}
										onChange={e => {
											let newMoves = Array.from(movesInput.value);

											newMoves[index] = e.target.value;

											movesInput.setValue(newMoves);
										}}
									/>
								))}
							</Flex>
						</>
					) : (
						<>
							<Box id='encounter.ability'>
								<Text>Ability: {encounter.ability}</Text>
							</Box>
							<Box id='encounter.nature'>
								<Text>Nature: {encounter.nature}</Text>
							</Box>
							<Box id='encounter.ivs'>
								<Text>
									Ivs: {encounter.ivs.hp} Hp / {encounter.ivs.atk} Atk
									/ {encounter.ivs.def} Def / {encounter.ivs.spa} SpA
									/ {encounter.ivs.spd} SpD / {encounter.ivs.spe} Spe
								</Text>
							</Box>
							<Box id='encounter.evs'>
								<Text>
									Evs: {encounter.evs.hp} Hp / {encounter.evs.atk} Atk
									/ {encounter.evs.def} Def / {encounter.evs.spa} SpA
									/ {encounter.evs.spd} SpD / {encounter.evs.spe} Spe
								</Text>
							</Box>
							{encounter.moves.map((move, index) => (
								<Box
									id={`encounter.moves[${index}]`}
									key={`encounter.moves[${index}]`}
								>
									<Text>- {move}</Text>
								</Box>
							))}
						</>
					)}
				</Flex>
			</Box>

			<Modal
				isOpen={isKillModalOpen}
				onClose={onCloseKillModal}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalBody>
						<FormControl>
							<FormLabel>Description</FormLabel>
							<Input
								type='text'
								value={descriptionInput.value}
								onChange={e =>
									descriptionInput.setValue(e.target.value)
								}
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button onClick={handleKillSubmit}>Submit</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
