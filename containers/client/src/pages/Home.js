import { Flex } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import axios from 'axios';

import ItemList from "../components/ItemList";
import SearchBar from "../components/SearchBar";

export default function Home() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchItemData() {
            const { data } = await axios.get('/api/items');
            setItems(data);
        };

        try {
            fetchItemData();
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <main>
            <Flex m='20'>
                <SearchBar setItems={setItems} />
            </Flex>
            <ItemList items={items} />
        </main>
    )
};