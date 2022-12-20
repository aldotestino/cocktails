import { Box, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <Box background="gray.50" minH="100vh" px={[2, 4, 10]}>
      <VStack spacing={10} w="full" maxW="container.xl" mx="auto">
        <Navbar />
        {children}
      </VStack>
    </Box>
  );
}

export default Layout;