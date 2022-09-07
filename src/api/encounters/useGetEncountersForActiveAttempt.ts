import { useQuery } from 'react-query';
import { api } from '../../lib/axios';
import { AxiosResponse } from 'axios';
import { Encounter } from '../models/Encounter';

export const useGetEncountersForActiveAttempt = () => {
	return useQuery('activeAttempt/encounters', async () => {
		const response: AxiosResponse<{ encounters: Array<Encounter> }> =
			await api.get('/encounters', { params: { active: true } });

		return response.data;
	});
};
