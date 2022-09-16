import { Box, Stack } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <Box background="gray.50" px={[2, 4, 10]}>
      <Stack direction={['column', 'column', 'row']} minH="100vh" w="full" maxW="container.xl" mx="auto" align="center" justify={['center', 'center', 'start']}>
        {children}
      </Stack>
    </Box>
  );
}

export default Layout;