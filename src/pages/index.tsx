import { Heading, Button, useMediaQuery, VStack, HStack, Image } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import prisma from '../lib/prisma';

interface HomeProps {
  cocktails: string[]
}

const BACKGROUND_IMAGES = [
  'https://images.unsplash.com/photo-1609951651556-5334e2706168?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1563223771-5fe4038fbfc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1592858167090-2473780d894d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1592858321831-dabeabc2dd65?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1618799805265-4f27cb61ede9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1626688445658-c948f32d68ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
];

function Home({ cocktails }: HomeProps) {

  const [isDesktop] = useMediaQuery('(min-width: 1000px)');
  const [bgImage] = useState(BACKGROUND_IMAGES[Math.floor(Math.random()*BACKGROUND_IMAGES.length)]);

  const router = useRouter();
  
  function randomCocktail() {
    const c = cocktails[Math.floor(Math.random()*cocktails.length)];
    router.push(`/${c}`);
  }

  function addCocktailHandler() {
    router.push('/add/newcocktail');
  }

  return (
    <>
      { isDesktop ?
        <HStack>
          <Image src={bgImage} h="100vh"></Image>
          <VStack spacing={6} width="100%">
            <Heading size="4xl" color="purple.500">Coktails</Heading>
            <Button colorScheme="purple" onClick={randomCocktail} >Random Cocktail</Button>
            <Button colorScheme="purple" onClick={addCocktailHandler} >Aggiungi Cocktail</Button>
          </VStack>
        </HStack>
        : 
        <VStack minH="100vh" spacing={6} pt={40} backgroundSize='cover' backgroundRepeat='no-repeat' bgImage={bgImage}>
          <Heading size="4xl" color="purple.500">Coktails</Heading>
          <Button colorScheme="purple" onClick={randomCocktail} >Random Cocktail</Button>
          <Button colorScheme="purple" onClick={addCocktailHandler} >Aggiungi Cocktail</Button>
        </VStack>
      }
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {

  const cocktails = await prisma.cocktail.findMany({
    select: {
      name: true
    }
  });

  const cocktailNames = cocktails.map(c => c.name);
  
  return {
    props: {
      cocktails: cocktailNames
    }
  };
};

export default Home;
