import { useQuery, UseQueryOptions } from 'react-query';
import { api } from '../../lib/axios';
import { AxiosResponse } from 'axios';
import { Encounter } from '../models/Encounter';

interface ResponseData {
	success: boolean;
	data: any;
}

export const useGetEncountersForActiveAttempt = (
	options?: Omit<
		UseQueryOptions<ResponseData>,
		'queryKey' | 'queryFn'
	>
) => {
	return useQuery(
		'activeAttempt/encounters',
		async () => {
			const response: AxiosResponse<ResponseData> = await api.get(
				'/encounters',
				{
					params: { active: true },
				}
			);

			// TODO: Why do I need to do this?
			return response.data;
		},
		options
	);
};
