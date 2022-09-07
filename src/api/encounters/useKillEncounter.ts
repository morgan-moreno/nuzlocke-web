import { useMutation } from 'react-query';
import { api } from '../../lib/axios';
import { invalidateQuery } from '../../lib/react-query';
import { KillEncounterBody } from './types';

export const useKillEncounter = () => {
	const mutation = useMutation(
		'killEncounter',
		async (body: KillEncounterBody) => {
			const response = await api.post(
				'/encounters/death',
				JSON.stringify(body)
			);

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
		killEncounter: mutation.mutateAsync,
	};
};
