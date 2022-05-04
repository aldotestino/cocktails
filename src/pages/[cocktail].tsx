import { Heading, ListItem, UnorderedList, Flex, Box, IconButton, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Cocktail } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import prisma from '../lib/prisma';

function CocktailPage({ cocktail }: {cocktail: Cocktail}) {

  const router = useRouter();
  
  return (
    <Box minH="100vh" px={[4, 10, 40]} pt={40}>
      <Flex alignItems="center" justifyContent={['center', 'start']}>
        <IconButton onClick={() => router.back()} color="purple.500" mr={2} variant="unstyled" aria-label='go back' icon={<ArrowBackIcon w={6} h={6} />}></IconButton>
        <Heading size="2xl" textTransform='capitalize' color="purple.500">{cocktail.name.replaceAll('-', ' ')}</Heading>{cocktail.addedby && <Text ml={4} fontSize="lg" alignSelf="flex-end">by {cocktail.addedby}</Text>}
      </Flex>
      <UnorderedList listStylePosition="inside" mt={6} spacing={2}>
        {cocktail.ingredients.map((ing, i) => <ListItem key={i} fontSize='2xl' textTransform='capitalize'>{ing}</ListItem>)}
      </UnorderedList>
    </Box> 
  );
}

export const getServerSideProps: GetServerSideProps<unknown, {cocktail: string}> = async (context) => {
  const cocktailName = context.params.cocktail;

  const cocktail = await prisma.cocktail.findFirst({
    where: {
      name: cocktailName
    }
  });

  return {
    props: {
      cocktail
    }
  };
};

export default CocktailPage;