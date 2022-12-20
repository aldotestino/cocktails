import { Box, Button, Divider, FormControl, FormErrorMessage, FormLabel, HStack, useToast, VStack } from '@chakra-ui/react';
import { CreatableSelect } from 'chakra-react-select';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { trpc } from '../common/client/trpc';
import { requireAuth } from '../common/requireAuth';
import { cocktailSchema, CocktailSchema } from '../common/validation/cocktail';
import { ingredientsOptions } from '../common/vars';
import PageTitle from '../components/PageTitle';
import TextField from '../components/TextField';

const initialValues: CocktailSchema = {
  name: '',
  ingredients: []
};

function AddCocktailPage() {

  const toast = useToast();
  const router = useRouter();

  const addCocktail = trpc.useMutation(['cocktail.add']);

  async function onSubmit(values: CocktailSchema) {
    try {
      const res = await addCocktail.mutateAsync(values);
      console.log(res);
      router.push(`/cocktail/${res.data.cocktail.name}`);
      toast({
        title: 'Successo',
        description: res.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
    }catch(e: any) {
      console.log(e);
      toast({
        title: 'Si è verificato un errore',
        description: e.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
    }
  }

  return (
    <VStack w="full" align="start" spacing={6}>
      <PageTitle title="Crea cocktail" />
      <Box w="full" maxW="xl">
        <Formik
          initialValues={initialValues}
          validateOnBlur={false}
          validationSchema={toFormikValidationSchema(cocktailSchema)}
          onSubmit={onSubmit}
        >
          {({ errors, touched, setValues }) =>
            <Form>
              <VStack spacing={5} background={['transparent', 'transparent', 'white']} py={[0, 0, 5]} borderRadius="lg" boxShadow={['none', 'none', 'md']}>
                <VStack spacing={2} px={[0, 0, 5]} w="full">
                  <TextField name='name' isInvalid={Boolean(errors.name && touched.name)} errorMessage={errors.name} label="Nome del cocktail" placeholder="Daiquiri" />
                  <FormControl isInvalid={Boolean(errors.ingredients && touched.ingredients)}>
                    <FormLabel>Ingredienti del cocktail</FormLabel>
                    <CreatableSelect 
                      formatCreateLabel={(o) => <span>Crea "{o}"</span>}
                      options={ingredientsOptions}
                      name="ingredients"
                      defaultValue={initialValues.ingredients.map(i => ({ label: i, value: i }))}
                      isMulti
                      placeholder="Seleziona ingredienti"
                      onChange={arr => setValues(pv => ({ ...pv, ingredients: arr.map(a => a.value) }))}
                      focusBorderColor="purple.400"
                      selectedOptionStyle='check'
                    />
                    {Boolean(errors.name && touched.name) &&<FormErrorMessage>{errors.ingredients }</FormErrorMessage>}
                  </FormControl>
                </VStack>
                <Divider />
                <HStack w="full" justify="end" spacing={4} px={[0, 0, 5]}>
                  <NextLink href="/" passHref>
                    <Button colorScheme="red" variant="outline" as="a">Annulla</Button>
                  </NextLink>
                  <Button colorScheme="purple" type="submit" isLoading={addCocktail.isLoading}>Aggiungi</Button>
                </HStack>
              </VStack>
            </Form>
          }
        </Formik>
      </Box>
    </VStack>
  );
}

export default AddCocktailPage;

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});
