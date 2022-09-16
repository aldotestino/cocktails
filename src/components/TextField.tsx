import { FormControl, FormErrorMessage, FormLabel, Input, InputProps } from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';

export interface InputFieldProps extends InputProps {
  label: string
  errorMessage?: string
}

function TextField({ label, errorMessage, ...rest }: InputFieldProps) {
  return (
    <Field name={rest.name}>
      {({ field }: FieldProps) => 
        <FormControl isInvalid={rest.isInvalid}>
          <FormLabel htmlFor='name'>{label}</FormLabel>
          <Input w="full" focusBorderColor="purple.400" {...field} {...rest}></Input>
          {rest.isInvalid &&<FormErrorMessage>{errorMessage}</FormErrorMessage>}
        </FormControl>}
    </Field>
  );
}

export default TextField;