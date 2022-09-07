import { AxiosResponse } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { api } from '../../lib/axios';
import { Encounter } from '../models/Encounter';
import { UpdateEncounterBody } from './types';

type UseUpdateEncounterOptions = UseMutationOptions<any, any, any>;

export const useUpdateEncounter = (
	options?: UseUpdateEncounterOptions
) => {
	const mutation = useMutation(
		'updateEncounter',
		async (body: UpdateEncounterBody) => {
			const response: AxiosResponse<{
				success: boolean;
				encounter: Encounter;
			}> = await api.put(
				`/encounters/${body.id}`,
				JSON.stringify(body)
			);

			return response.data;
		},
		options
	);

	return {
		...mutation,
		updateEncounter: mutation.mutateAsync,
	};
};
