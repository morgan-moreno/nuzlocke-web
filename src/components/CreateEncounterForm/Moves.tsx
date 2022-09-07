import {
	Text,
	VStack,
	Center,
	HStack,
	FormControl,
	Input,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { UseInputReturn } from '../../hooks/useInput';

export interface MovesProps {
	movesInput: UseInputReturn<Array<string>>;
}

export const Moves: FC<MovesProps> = ({ movesInput }) => {
	const moves = movesInput.value;

	const onMovesChange = (index: number, value: string) => {
		let newMoves = Array.from(moves);

		newMoves[index] = value;

		movesInput.setValue(newMoves);
	};

	return (
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
							tabIndex={10 + i}
							name={`moves-${i}`}
							type='text'
							value={move}
							onChange={e => onMovesChange(i, e.target.value)}
						/>
					</FormControl>
				))}
			</HStack>
		</VStack>
	);
};
