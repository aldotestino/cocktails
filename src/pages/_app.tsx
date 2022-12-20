import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { withTRPC } from '@trpc/next';
import { ServerRouter } from '../server/router';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import Layout from '../components/Layout';

function App({ Component, pageProps }: AppProps<{session: Session}>) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
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
