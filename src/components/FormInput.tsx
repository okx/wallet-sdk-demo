import React from 'react';
import {
    InputGroup,
    InputLeftAddon,
    Input,
    InputRightElement,
    IconButton,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

interface FormInputProps<T> {
    name: string;
    displayName?: string;
    data: T;
    setData: (data: T) => void;
    type?: 'text' | 'number'; // Add this line
}

const FormInput = <T extends { [key: string]: any }>(props: FormInputProps<T>) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        props.setData({
            ...props.data,
            [name]: props.type === 'number' ? Number(value) : value,
        });
    };

    const handleClear = () => {
        props.setData({
            ...props.data,
            [props.name]: "",
        });
    };

    const getName = (): string => {
        if (props.displayName) {
            return props.displayName
        }
        const words = props.name.split(/(?=[A-Z])/);
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        return capitalizedWords.join(' ');
    }

    return (
        <InputGroup >
            <InputLeftAddon minWidth={220}>{getName()}</InputLeftAddon>
            <Input
                id={props.name}
                name={props.name}
                value={props.data[props.name]}
                onChange={handleChange}
                type={props.type || 'text'}
            />
            <InputRightElement>
                <IconButton
                    variant="unstyled"
                    colorScheme="red"
                    aria-label="Clear input"
                    icon={<CloseIcon />}
                    size="sm"
                    onClick={handleClear}
                />
            </InputRightElement>
        </InputGroup>
    );
};

export default FormInput;
