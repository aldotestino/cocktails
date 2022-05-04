import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, FormControl, FormLabel, Heading, IconButton, Input, VStack, useToast } from '@chakra-ui/react';
import { Form, Formik, Field } from 'formik';
import { useRouter } from 'next/router';

function AddCocktailPage() {

  const router = useRouter();

  const toast = useToast();

  async function handleSubmit(values, { resetForm }) {
    const res = await fetch('/api/newcocktail', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(values)
    }).then(r => r.json());

    if(res.error) {
      console.log(res.error);
      toast({
        title: 'Cocktail esistente',
        description: `Il cocktail "${values.name}" è già presente.`,
        status: 'error',
        position: 'top-right'
      });
    }

    resetForm();
  }

  return <Box minH="100vh" px={[4, 10, 40]} pt={40}>
    <Flex alignItems="center" justifyContent={['center', 'start']} mb={6}>
      <IconButton onClick={() => router.back()} color="purple.500" mr={2} variant="unstyled" aria-label='go back' icon={<ArrowBackIcon w={6} h={6} />}></IconButton>
      <Heading size="2xl" textTransform='capitalize' color="purple.500">Aggiungi Cocktail</Heading>
    </Flex>
    <Formik
      initialValues={{ name: '', ingredients: '', addedby: '' }}
      onSubmit={handleSubmit}
    >
      <Form>
        <VStack spacing={2} maxW="lg">
          <Field name='name'>
            {({ field }) => <FormControl>
              <FormLabel htmlFor='name'>Nome del Cocktail</FormLabel>
              <Input {...field} id="name" required type="text"></Input>
            </FormControl>}
          </Field>

          <Field name='ingredients'>
            {({ field }) => <FormControl>
              <FormLabel htmlFor='ingredients'>Ingredienti (separati da ';')</FormLabel>
              <Input {...field} id="ingredients" required type="text"></Input>
            </FormControl>}
          </Field>

          <Field name='addedby'>
            {({ field }) => <FormControl>
              <FormLabel htmlFor='addedby'>Aggiunto da</FormLabel>
              <Input {...field} id="addedby" required type="text"></Input>
            </FormControl>}
          </Field>
          
          <Button type="submit">Aggiungi</Button>
        </VStack>
      </Form>
    </Formik>
  </Box>;
}

export default AddCocktailPage;