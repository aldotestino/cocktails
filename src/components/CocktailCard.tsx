import { DeleteIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Link } from '@chakra-ui/react';
import { Cocktail } from '@prisma/client';
import NextLink from 'next/link';
import { trpc } from '../common/client/trpc';

interface CocktailCardProps {
  cocktail: Cocktail
  onRemove: (cocktailId: string) => void
}

function CocktailCard({ cocktail, onRemove }: CocktailCardProps) {

  const removeCoktail = trpc.useMutation('cocktail.remove', {
    onSuccess: () => {
      onRemove(cocktail.id);
    }
  });

  return (
    <HStack bg="white" width="xs" justify="space-between" p={4} key={cocktail.id} rounded="lg" shadow="lg">
      <NextLink href={`/cocktail/${cocktail.name}`}>
        <Link _hover={{ color: 'purple.500', textDecoration: 'underline' }} fontSize="lg" fontWeight="semibold">{cocktail.name}</Link>
      </NextLink>
      <IconButton isLoading={removeCoktail.isLoading} onClick={() => removeCoktail.mutateAsync({ cocktailId: cocktail.id })} aria-label={`rimuovi ${cocktail.name}`} icon={<DeleteIcon />} variant="outline" colorScheme="red" />
    </HStack>
  );
}

export default CocktailCard;