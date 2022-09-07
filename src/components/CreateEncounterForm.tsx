import React, { FC, useState } from 'react';
import {
	Box,
	Button,
	Center,
	FormControl,
	FormHelperText,
	FormLabel,
	HStack,
	Input,
	Text,
	VStack,
} from '@chakra-ui/react';

export interface CreateEncounterFormProps {}

export const CreateEncounterForm: FC<
	CreateEncounterFormProps
> = () => {
	// TODO: Add form validation support
	const [name, setName] = useState<string>('');
	const [ability, setAbility] = useState<string>('');
	const [nature, setNature] = useState<string>('');
	const [ivs, setIvs] = useState<any>({
		hp: 0,
		atk: 0,
		def: 0,
		spa: 0,
		spd: 0,
		spe: 0,
	});
	const [moves, setMoves] = useState<Array<string>>(['', '', '', '']);

	return (
		<Box
			border='1px'
			borderColor='black'
			h='65vh'
			w='50vw'
			rounded='xl'
			shadow='lg'
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
				{/** Name / Ability / Nature */}
				<HStack>
					<FormControl>
						<FormLabel>Name</FormLabel>
						<Input
							type='text'
							value={name}
							onChange={e => setName(e.target.value)}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Ability</FormLabel>
						<Input
							type='text'
							value={ability}
							onChange={e => setAbility(e.target.value)}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Nature</FormLabel>
						<Input
							type='text'
							value={nature}
							onChange={e => setNature(e.target.value)}
						/>
					</FormControl>
				</HStack>

				{/**
				 * todo: Extract to another component
				 * Ivs: hp / atk / def / spa / spd / spe
				 **/}
				<VStack
					id='ivs'
					flexWrap='wrap'
				>
					<Center w='100%'>
						<Text
							fontSize='20px'
							fontFamily='sans-serif'
							borderBottom='1px'
							borderColor='black'
							px='2%'
						>
							Ivs
						</Text>
					</Center>

					<HStack>
						<VStack w='50%'>
							<FormControl id='ivs.hp'>
								<Input
									name='ivs.hp'
									type='number'
									value={ivs.hp}
									onChange={e =>
										setIvs({ ...ivs, hp: Number(e.target.value) })
									}
								/>
								<FormHelperText>Hp</FormHelperText>
							</FormControl>

							<FormControl id='ivs.def'>
								<Input
									name='ivs.def'
									type='number'
									value={ivs.def}
									onChange={e =>
										setIvs({ ...ivs, def: Number(e.target.value) })
									}
								/>
								<FormHelperText>Def</FormHelperText>
							</FormControl>

							<FormControl id='ivs.spd'>
								<Input
									name='ivs.spd'
									type='number'
									value={ivs.spd}
									onChange={e =>
										setIvs({ ...ivs, spd: Number(e.target.value) })
									}
								/>
								<FormHelperText>SpD</FormHelperText>
							</FormControl>
						</VStack>

						<VStack w='50%'>
							<FormControl id='ivs.atk'>
								<Input
									name='ivs.atk'
									type='number'
									value={ivs.atk}
									onChange={e =>
										setIvs({ ...ivs, atk: Number(e.target.value) })
									}
								/>
								<FormHelperText>Atk</FormHelperText>
							</FormControl>
							<FormControl id='ivs.spa'>
								<Input
									name='ivs.spa'
									type='number'
									value={ivs.spa}
									onChange={e =>
										setIvs({ ...ivs, spa: Number(e.target.value) })
									}
								/>
								<FormHelperText>SpA</FormHelperText>
							</FormControl>

							<FormControl id='ivs.spe'>
								<Input
									name='ivs.spe'
									type='number'
									value={ivs.spe}
									onChange={e =>
										setIvs({ ...ivs, spe: Number(e.target.value) })
									}
								/>
								<FormHelperText>Spe</FormHelperText>
							</FormControl>
						</VStack>
					</HStack>
				</VStack>
				{/** Moves */}
				<VStack>
					<Center w='100%'>
						<Text
							fontSize='20px'
							fontFamily='sans-serif'
							borderBottom='1px'
							borderColor='black'
							px='2%'
						>
							Moves
						</Text>
					</Center>

					<HStack id='moves'>
						{moves.map((move, i) => (
							<FormControl
								id={`moves-${i}`}
								key={i}
							>
								<Input
									name={`moves-${i}`}
									type='text'
									value={move}
									onChange={e => {
										let newMoves = Array.from<string>(moves);

										newMoves[i] = e.target.value;

										setMoves(newMoves);
									}}
								/>
							</FormControl>
						))}
					</HStack>
				</VStack>
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
				>
					Cancel
				</Button>
				<Button
					w='30%'
					bg='white'
					border='4px'
					borderColor='purple.300'
					color='purple.300'
					rounded='full'
				>
					Save & Close
				</Button>
				<Button
					w='30%'
					bg='white'
					border='4px'
					borderColor='purple.300'
					color='purple.300'
					rounded='full'
				>
					Save & Add Another
				</Button>
			</Center>
		</Box>
	);
};
