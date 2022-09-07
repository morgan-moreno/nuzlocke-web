import { Axios } from 'axios';

export const api = new Axios({
	baseURL: 'http://localhost:3001',
	headers: {
		'x-nuzlocke-source': 'WEB_CLIENT',
		'Content-Type': 'application/json',
		'Accepts': 'application/json',
	},
});
