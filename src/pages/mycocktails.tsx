import { Center, SimpleGrid, VStack } from '@chakra-ui/react';
import { Cocktail } from '@prisma/client';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import { prisma } from '../common/prisma';
import { requireAuth } from '../common/requireAuth';
import CocktailCard from '../components/CocktailCard';
import PageTitle from '../components/PageTitle';

interface MyCocktailsPageProps {
  cocktails?: Cocktail[]
}

function MyCocktailsPage(props: MyCocktailsPageProps)  {

  const [cocktails, setCocktails] = useState(props.cocktails);

  function onRemove(cocktailId: string) {
    setCocktails(pcs => pcs?.filter(c => c.id !== cocktailId));
  }
  
  return (
    <VStack w="full" align="start" spacing={6}>
      <PageTitle title="My cocktails" />
      <Center w="full">
        <SimpleGrid columns={[1, 1, 2, 3]} spacingX={20} spacingY={4}>
          {cocktails?.map(c => (
            <CocktailCard key={c.id} cocktail={c} onRemove={onRemove} />
          ))}
        </SimpleGrid>
      </Center>
    </VStack>
  );
}

export default MyCocktailsPage;

export const getServerSideProps = requireAuth(async (ctx) => {

  const session = await getSession(ctx);

  const cocktails = await prisma.cocktail.findMany({
    where: {
      userId: session!.user!.id
    }
  });
  
  return { 
    props: {
      cocktails
    } 
  };
});
