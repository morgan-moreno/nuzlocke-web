import { QueryClient } from 'react-query';

export const client = new QueryClient();

export const invalidateQuery = async (queryKey: string) => {
	await client.invalidateQueries(queryKey);
};
