import { Avatar, Button, HStack, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import NextLink from 'next/link';
import Router from 'next/router';

function Navbar() {

  const { data, status } = useSession();

  return (
    <HStack w="full" justify="end" py={10}>
      {status === 'authenticated' ?
        <HStack spacing={2}>
          <Text>{data.user?.name}</Text>
          <Menu placement="bottom-end">
            <MenuButton cursor="pointer" as={Avatar} src={`https://avatars.dicebear.com/api/avataaars/${data.user?.name}.svg`} />
            <MenuList>
              <MenuItem onClick={() => Router.push('/mycocktails')}>My cocktails</MenuItem>
              <MenuItem onClick={() => Router.push('/profile')}>Delete profile</MenuItem>
              <MenuDivider />
              <MenuItem color="red.500" onClick={() => signOut()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        : 
        <NextLink href="/signin" passHref >
          <Button colorScheme="purple">Signin</Button>
        </NextLink>
      }  
    </HStack>
  );
}

export default Navbar;