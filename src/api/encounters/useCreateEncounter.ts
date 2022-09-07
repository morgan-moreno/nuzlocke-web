import { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { api } from '../../lib/axios';
import { invalidateQuery } from '../../lib/react-query';
import { Encounter } from '../models/Encounter';
import { CreateEncounterBody } from './types';

export const useCreateEncounter = () => {
	const mutation = useMutation(
		'createEncounter',
		async (body: CreateEncounterBody) => {
			const response: AxiosResponse<{ encounter: Encounter }> =
				await api.post('/encounters', JSON.stringify(body));

			return response.data;
		},
		{
			onSuccess: async () => {
				await invalidateQuery('activeAttempt/encounters');
			},
		}
	);

	return {
		...mutation,
		createEncounter: mutation.mutateAsync,
	};
};
