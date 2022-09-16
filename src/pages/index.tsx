import { Heading, Button, Text, VStack, HStack, Image, Flex, useMediaQuery } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { prisma } from '../common/prisma';
import { getRandomImage } from '../common/vars';
import Layout from '../components/Layout';

interface HomeProps {
  cocktails: string[],
  image: string
}

function Home({ cocktails, image }: HomeProps) {

  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');
    
  function randomCocktail() {
    if(cocktails) {
      return cocktails[Math.floor(Math.random()*cocktails.length)];
    }
  }

  return (
    <Layout>
      <HStack w="full" justify="space-between">
        <VStack align="start" spacing={4}>
          <Heading size="3xl" color="purple.500">Cocktails</Heading>
          <Text fontSize="xl">Il posto giusto per la scelta del tuo cocktail per una serata perfetta</Text>
          <HStack spacing={4}>
            <NextLink href={`/cocktail/${randomCocktail()}`} passHref>
              <Button colorScheme="purple" as="a">Random</Button>
            </NextLink>
            <NextLink href="/add" passHref>
              <Button colorScheme="purple" variant="outline" as="a">Crea cocktail</Button>
            </NextLink>
          </HStack>
        </VStack>
        {isLargerThan1280 && <Flex flex={1} align="center" justify="center">
          <Image src={image} h="md" borderRadius="2xl" boxShadow="md" />
        </Flex>}
      </HStack>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {

  const cocktails = await prisma.cocktail.findMany({
    select: {
      name: true
    }
  });

  const cocktailNames = cocktails.map(c => c.name);

  console.log(cocktailNames);
  
  return {
    props: {
      cocktails: cocktailNames,
      image: getRandomImage()
    }
  };
};

export default Home;
