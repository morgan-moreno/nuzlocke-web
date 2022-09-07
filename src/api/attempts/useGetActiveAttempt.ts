import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { api } from '../../lib/axios';
import { GetActiveAttemptResponse } from './types';

export const useGetActiveAttempt = () => {
	return useQuery('activeAttempt', async () => {
		const response: AxiosResponse<GetActiveAttemptResponse> =
			await api.get('/attempts', {
				params: {
					active: true,
				},
			});

		return response.data;
	});
};
