import axios from 'axios';

export const api = axios.create({
	baseURL: 'http://localhost:3001',
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'x-nuzlocke-source': 'WEB_CLIENT',
	},
});
