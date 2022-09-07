import React, { FC } from 'react';
import {
	Text,
	VStack,
	Center,
	HStack,
	FormControl,
	Input,
	FormHelperText,
} from '@chakra-ui/react';
import { UseInputReturn } from '../../hooks/useInput';
import { CreateStats } from '../../api/encounters/types';

export interface IvsProps {
	ivsInput: UseInputReturn<CreateStats>;
}

export const Ivs: FC<IvsProps> = ({ ivsInput }) => {
	const ivs = ivsInput.value;

	const onIvChange = (key: keyof CreateStats, value: number) => {
		ivsInput.setValue({
			...ivs,
			[key]: value,
		});
	};

	return (
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
							tabIndex={4}
							name='ivs.hp'
							type='number'
							value={ivs.hp}
							onChange={e => onIvChange('hp', Number(e.target.value))}
						/>
						<FormHelperText>Hp</FormHelperText>
					</FormControl>

					<FormControl id='ivs.def'>
						<Input
							name='ivs.def'
							type='number'
							value={ivs.def}
							onChange={e =>
								onIvChange('def', Number(e.target.value))
							}
							tabIndex={6}
						/>
						<FormHelperText>Def</FormHelperText>
					</FormControl>

					<FormControl id='ivs.spd'>
						<Input
							name='ivs.spd'
							type='number'
							value={ivs.spd}
							onChange={e =>
								onIvChange('spd', Number(e.target.value))
							}
							tabIndex={8}
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
								onIvChange('atk', Number(e.target.value))
							}
							tabIndex={5}
						/>
						<FormHelperText>Atk</FormHelperText>
					</FormControl>
					<FormControl id='ivs.spa'>
						<Input
							name='ivs.spa'
							type='number'
							value={ivs.spa}
							onChange={e =>
								onIvChange('spa', Number(e.target.value))
							}
							tabIndex={7}
						/>
						<FormHelperText>SpA</FormHelperText>
					</FormControl>

					<FormControl id='ivs.spe'>
						<Input
							name='ivs.spe'
							type='number'
							value={ivs.spe}
							onChange={e =>
								onIvChange('spe', Number(e.target.value))
							}
							tabIndex={9}
						/>
						<FormHelperText>Spe</FormHelperText>
					</FormControl>
				</VStack>
			</HStack>
		</VStack>
	);
};
