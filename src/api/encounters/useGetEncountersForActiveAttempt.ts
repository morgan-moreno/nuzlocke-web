import { useQuery } from 'react-query';
import { api } from '../../lib/axios';
import { AxiosResponse } from 'axios';

export const useGetEncountersForActiveAttempt = () => {
	return useQuery(
		'activeAttempt/encounters',
		async () => {
			const response: AxiosResponse = await api.get('/encounters', {
				params: { active: true },
			});

			// TODO: Why do I need to do this?
			return JSON.parse(response.data);
		},
		{
			onSuccess: data => {
				console.log('get encounters for active attempt data: ', data);
			},
			onError: error => {
				console.log('failed to get encounters: ', error);
			},
		}
	);
};
