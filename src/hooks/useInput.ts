import React, { SetStateAction, useState } from 'react';

export interface UseInputReturn<T> {
	value: T;
	setValue: React.Dispatch<SetStateAction<T>>;
	resetValue: VoidFunction;
}

export function useInput<T>(defaultValue: T): UseInputReturn<T> {
	const [value, setValue] = useState<T>(defaultValue);

	return {
		value,
		setValue,
		resetValue: () => setValue(defaultValue),
	};
}
