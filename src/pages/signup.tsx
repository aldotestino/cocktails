import { Box, Button, Divider, HStack, Link, useToast, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import Router from 'next/router';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { trpc } from '../common/client/trpc';
import { signupSchema, SignupSchema } from '../common/validation/auth';
import PageTitle from '../components/PageTitle';
import TextField from '../components/TextField';

const initialValues: SignupSchema = {
  email: '',
  username: '',
  password: ''
};

function SigninPage() {

  const toast = useToast();

  const signup = trpc.useMutation(['user.signup'], {
    onError: (err) => {
      toast({
        title: 'Si è verificato un errore',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
    },
    onSuccess: () => {
      Router.push('/signin');
    }
  });

  return (
    <VStack w="full" align="start" spacing={6}>
      <PageTitle title="Signup" />
      <Box w="full" maxW="xl">
        <Formik
          initialValues={initialValues}
          validateOnBlur={false}
          validationSchema={toFormikValidationSchema(signupSchema)}
          onSubmit={values => signup.mutateAsync(values)}
        >
          {({ errors, touched }) =>
            <Form>
              <VStack spacing={5} background={['transparent', 'transparent', 'white']} py={[0, 0, 5]} borderRadius="lg" boxShadow={['none', 'none', 'md']}>
                <VStack spacing={2} px={[0, 0, 5]} w="full">
                  <TextField name="email" isInvalid={Boolean(errors.email && touched.email)} errorMessage={errors.email} label="Email" placeholder="aldo.testino@libero.it" />
                  <TextField name="username" isInvalid={Boolean(errors.username && touched.username)} errorMessage={errors.username} label="Username" placeholder="aldotestino4" />
                  <TextField type="password" name="password" isInvalid={Boolean(errors.password && touched.password)} errorMessage={errors.password} label="Password" placeholder="******" />
                </VStack>
                <Divider />
                <HStack w="full" justify="space-between" spacing={4} px={[0, 0, 5]}>
                  <NextLink href="/signin" passHref>
                    <Link color="purple.500">Hai già un accoutn?</Link>
                  </NextLink>
                  <Button colorScheme="purple" type="submit" isLoading={signup.isLoading}>Signup</Button>
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