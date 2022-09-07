import React, { FC } from 'react';
import {
	FormControl,
	FormLabel,
	HStack,
	Input,
} from '@chakra-ui/react';
import { UseInputReturn } from '../../hooks/useInput';

export interface DetailsProps {
	nameInput: UseInputReturn<string>;
	abilityInput: UseInputReturn<string>;
	natureInput: UseInputReturn<string>;
}

export const Details: FC<DetailsProps> = ({
	nameInput,
	abilityInput,
	natureInput,
}) => {
	return (
		<HStack>
			<FormControl>
				<FormLabel>Name</FormLabel>
				<Input
					tabIndex={1}
					type='text'
					value={nameInput.value}
					onChange={e => nameInput.setValue(e.target.value)}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Ability</FormLabel>
				<Input
					tabIndex={2}
					type='text'
					value={abilityInput.value}
					onChange={e => abilityInput.setValue(e.target.value)}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Nature</FormLabel>
				<Input
					tabIndex={3}
					type='text'
					value={natureInput.value}
					onChange={e => natureInput.setValue(e.target.value)}
				/>
			</FormControl>
		</HStack>
	);
};
