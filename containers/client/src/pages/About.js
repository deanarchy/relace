import { Avatar, Box, Stack, Text, useColorModeValue } from '@chakra-ui/react';

export default function About() {
    return (
        <Stack
            bg={useColorModeValue('gray.50', 'gray.800')}
            py={16}
            px={8}
            spacing={{ base: 8, md: 10 }}
            align={'center'}
            direction={'column'}>
            <Text
                fontSize={{ base: 'xl', md: '2xl' }}
                textAlign={'center'}
                maxW={'3xl'}>
                Do in nulla voluptate laborum et deserunt mollit pariatur dolore ea eu esse Lorem commodo. Cillum id pariatur laboris non sunt dolor labore eiusmod ipsum deserunt ad velit. Non id voluptate Lorem veniam id nulla minim veniam adipisicing. Incididunt aute eu ad commodo consequat tempor duis. Anim sunt veniam occaecat do in dolore duis laborum nostrud nulla ipsum mollit sint qui. Cupidatat nostrud consequat fugiat ullamco deserunt velit tempor. Dolore ipsum sit id tempor minim est ut nisi incididunt dolore.

                Proident nulla ut ex aliquip cupidatat. Officia deserunt ad est ipsum. Est voluptate dolore pariatur aliquip qui enim cupidatat sunt irure esse anim duis ad. Id duis ad sit eu pariatur.
            </Text>
            <Box textAlign={'center'}>
                <Avatar
                    src={
                        'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
                    }
                    alt={'Jenny Wilson'}
                    mb={2}
                />

                <Text fontWeight={600}>Jenny Wilson</Text>
                <Text fontSize={'sm'} color={useColorModeValue('gray.400', 'gray.400')}>
                    Vice President
                </Text>
            </Box>
        </Stack>
    );
}