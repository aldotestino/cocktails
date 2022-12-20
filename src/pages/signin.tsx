import { Box, Button, Divider, HStack, Link, useToast, VStack } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { signIn } from 'next-auth/react';
import NextLink from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { SigninSchema, signinSchema } from '../common/validation/auth';
import PageTitle from '../components/PageTitle';
import TextField from '../components/TextField';

const initialValues: SigninSchema = {
  username: '',
  password: ''
};

function SigninPage() {

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function onSubmit(values: SigninSchema, { resetForm }: FormikHelpers<SigninSchema>) {
    setIsLoading(true);
    const res = await signIn('credentials', { ...values, redirect: false });
    if(res?.error) {
      toast({
        title: 'Si è verificato un errore',
        description: 'Utente inesistente',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
      resetForm();
    }else {
      Router.push('/');
    }
    setIsLoading(false);
  }

  return (
    <VStack w="full" align="start" spacing={6}>
      <PageTitle title="Signin" />
      <Box w="full" maxW="xl">
        <Formik
          initialValues={initialValues}
          validateOnBlur={false}
          validationSchema={toFormikValidationSchema(signinSchema)}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) =>
            <Form>
              <VStack spacing={5} background={['transparent', 'transparent', 'white']} py={[0, 0, 5]} borderRadius="lg" boxShadow={['none', 'none', 'md']}>
                <VStack spacing={2} px={[0, 0, 5]} w="full">
                  <TextField name="username" isInvalid={Boolean(errors.username && touched.username)} errorMessage={errors.username} label="Username" placeholder="jason" />
                  <TextField type="password" name="password" isInvalid={Boolean(errors.password && touched.password)} errorMessage={errors.password} label="Password" placeholder="******" />
                </VStack>
                <Divider />
                <HStack w="full" justify="space-between" spacing={4} px={[0, 0, 5]}>
                  <NextLink href="/signup" passHref>
                    <Link color="purple.500">Non hai un account?</Link>
                  </NextLink>
                  <Button colorScheme="purple" type="submit" isLoading={isLoading}>Signin</Button>
                </HStack>
              </VStack>
            </Form>
          }
        </Formik>
      </Box>
    </VStack>
  );
}

export default SigninPage;