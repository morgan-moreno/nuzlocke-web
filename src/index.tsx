import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { App } from './App';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { client } from './lib/react-query';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

// TODO: Extract all providers out into a single provider component
root.render(
	<QueryClientProvider client={client}>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
		<ReactQueryDevtools initialIsOpen={false} />
	</QueryClientProvider>
);
