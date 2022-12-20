import { ArrowBackIcon } from '@chakra-ui/icons';
import { Heading, HStack, IconButton, VStack, Text } from '@chakra-ui/react';
import Router from 'next/router';

interface PageTitleProps {
  title: string
  subtitle?: string
}

function PageTitle({ title, subtitle }: PageTitleProps) {
 
  return (
    <VStack align="start">
      <HStack spacing={2} align="center">
        <IconButton onClick={() => Router.back()} size="sm" variant="ghost" aria-label='back' icon={<ArrowBackIcon color="purple.500" w={[4, 4, 6]} h={[4, 4, 6]} />} />
        <Heading size={['lg', 'lg', '2xl']} textTransform='capitalize' color="purple.500">{title}</Heading>     
      </HStack>
      {subtitle ? <Text fontSize={['sm', 'sm', 'lg']}>{subtitle}</Text> : null}
    </VStack>
  );
}

export default PageTitle;