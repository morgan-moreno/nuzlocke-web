import { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { api } from '../../lib/axios';
import { Encounter } from '../models/Encounter';
import { CreateEncounterBody } from './types';

export const useCreateEncounter = () => {
	const mutation = useMutation(
		'createEncounter',
		async (body: CreateEncounterBody) => {
			const response: AxiosResponse<{ encounter: Encounter }> =
				await api.post('/encounters', body);

			return response.data;
		}
	);

	return {
		...mutation,
		createEncounter: mutation.mutate,
	};
};
