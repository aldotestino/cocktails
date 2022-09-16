import { Heading, ListItem, UnorderedList, Flex, IconButton, Text, VStack } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { Cocktail } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { prisma } from '../../common/prisma';
import Layout from '../../components/Layout';

interface CocktailPageProps {
  cocktail: Cocktail
}


function CocktailPage({ cocktail }: CocktailPageProps) {
  
  return (
    <>
      {cocktail && 
        <Layout>
          <VStack w="full" align="start" spacing={6}>
            <Flex align="center">
              <NextLink href="/" passHref>
                <IconButton size="sm" variant="outline" aria-label='back' mr={[2, 2, 4]} icon={<ArrowBackIcon color="purple.500" w={[4, 4, 6]} h={[4, 4, 6]} />} />
              </NextLink>
              <Flex align="baseline">
                <Heading size={['lg', 'lg', '2xl']} textTransform='capitalize' color="purple.500">{cocktail.name}</Heading>
                {cocktail.addedBy && <Text ml={[2, 2, 4]} fontSize={['sm', 'sm', 'lg']}>by {cocktail.addedBy}</Text>}
              </Flex>
            </Flex>
            <UnorderedList listStylePosition="inside" mt={6} spacing={2}>
              {cocktail.ingredients.map((ing, i) => <ListItem key={i} fontSize={['lg', 'lg', '2xl']}>{ing}</ListItem>)}
            </UnorderedList>
          </VStack>
        </Layout>
      }
    </>
  );
}

export const getServerSideProps: GetServerSideProps<any, {cocktail: string}> = async (context) => {
  const cocktailName = context.params?.cocktail;

  const cocktail = await prisma.cocktail.findFirst({
    where: {
      name: cocktailName
    }
  });

  if(!cocktail) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    };
  }else {
    return {
      props: {
        cocktail
      }
    };
  }
};

export default CocktailPage;