import {
    SimpleGrid,
    Heading
} from '@chakra-ui/react';

import Item from './Item';

export default function ItemList({ items }) {

    if (items.length < 1) {
        return (
            <Heading size="lg" fontSize="50px">
                No items found.
            </Heading>
        )
    };

    return (
        <SimpleGrid mx='20px' minChildWidth="400px" spacing="50px">
            {items.map(item => {
                return <Item
                    title={item.title}
                    subtitle={item.subtitle}
                    description={item.subtitle}
                    price={item.price} />
            })}
        </ SimpleGrid>
    )
};