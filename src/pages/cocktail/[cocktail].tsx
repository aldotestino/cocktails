import { ListItem, UnorderedList, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { prisma } from '../../common/prisma';
import PageTitle from '../../components/PageTitle';

interface CocktailPageProps {
  cocktail: {
    name: string
    ingredients: string[]
    user: {
      username: string
    }
  }
}


function CocktailPage({ cocktail }: CocktailPageProps) {
  
  return (
    <>
      {cocktail && 
          <VStack w="full" align="start" spacing={6}>
            <PageTitle title={cocktail.name} subtitle={`by ${cocktail.user.username}`} />
            <UnorderedList listStylePosition="inside" mt={6} spacing={2}>
              {cocktail.ingredients.map((ing, i) => <ListItem key={i} fontSize={['lg', 'lg', '2xl']}>{ing}</ListItem>)}
            </UnorderedList>
          </VStack>
      }
    </>
  );
}

export const getServerSideProps: GetServerSideProps<any, {cocktail: string}> = async (context) => {
  const cocktailName = context.params?.cocktail;

  const cocktail = await prisma.cocktail.findFirst({
    where: {
      name: cocktailName
    },
    select: {
      name: true,
      ingredients: true,
      user: {
        select: {
          username: true
        }
      }
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