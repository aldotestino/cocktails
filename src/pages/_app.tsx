import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { withTRPC } from '@trpc/next';
import { ServerRouter } from '../server/router';

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default withTRPC<ServerRouter>({
  config({ ctx }) {
    const url = '/api/trpc';

    return {
      url,
      headers: {
        'x-ssr': '1'
      }
    };
  },
  ssr: true
})(App);
