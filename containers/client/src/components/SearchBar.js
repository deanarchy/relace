import {
    InputGroup,
    InputLeftElement,
    Input,
} from '@chakra-ui/react'
import {
    SearchIcon,
} from '@chakra-ui/icons'

export default function SearchBar() {
    return (
        <InputGroup>
            <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
            />
            <Input type="tel" placeholder="Search" />
        </InputGroup>
    )
};