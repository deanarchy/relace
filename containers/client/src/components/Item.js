import {
  Box,
  Heading,
  Text,
  Stack,
  Avatar,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Item({title, subtitle, description, price}) {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'2xl'}
      rounded={'md'}
      p={6}
      m={2}>
      <Stack>
        <Text
          color={'green.500'}
          textTransform={'uppercase'}
          fontWeight={800}
          fontSize={'sm'}
          letterSpacing={1.1}>
          {subtitle}
        </Text>
        <Heading
          color={useColorModeValue('gray.700', 'white')}
          fontSize={'2xl'}
          fontFamily={'body'}>
          {title}
        </Heading>
        <Text color={'gray.500'}>
          {description}
        </Text>
        <Button variant={'solid'}
          colorScheme={'linkedin'}
          size={'sm'}
          mr={2}>Order for ${price}</Button>
      </Stack>
      <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
        <Avatar
          src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
          alt={'Author'}
        />
        <Stack direction={'column'} spacing={0} fontSize={'sm'}>
          <Text fontWeight={600}>Achim Rolle</Text>
          <Text color={'gray.500'}>Feb 08, 2021 · 6min read</Text>
        </Stack>
      </Stack>
    </Box>
  );
}