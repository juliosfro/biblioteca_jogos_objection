const CPF_BLACKLIST = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
    '12345678909',
];

const CNPJ_BLACKLIST = [
    '00000000000000',
    '11111111111111',
    '22222222222222',
    '33333333333333',
    '44444444444444',
    '55555555555555',
    '66666666666666',
    '77777777777777',
    '88888888888888',
    '99999999999999',
];

const verifierDigitCNPJ = (numbers: string) => {
    const reverse = numbers.split('').reduce((buffer: Array<number>, number: string) => (
        [Number(number), ...buffer]
    ), []);

    let index = 2;
    const sum = reverse.reduce((buffer, number) => {
        const result = buffer + (number * index);
        index = (index === 9 ? 2 : index + 1);
        return result;
    }, 0);

    const mod = sum % 11;
    return (mod < 2 ? 0 : 11 - mod);
};

export const validateCNPJ = (value: string) => {
    const stripped = (value || '').replace(/[^\d]/g, '');

    if (stripped && stripped.length === 14 && CNPJ_BLACKLIST.indexOf(stripped) === -1) {
        let numbers = stripped.substr(0, 12);
        numbers += verifierDigitCNPJ(numbers);
        numbers += verifierDigitCNPJ(numbers);

        if (numbers.substr(-2) === stripped.substr(-2)) {
            return true;
        }
    }
    return false;
};

const verifierDigitCPF = (value: string) => {
    const numbers = value
        .split('')
        .map(number => Number(number));
    const modulus = numbers.length + 1;
    const multiplied = numbers.map((number, index) => number * (modulus - index));
    const mod = multiplied.reduce((buffer, number) => buffer + number) % 11;
    return (mod < 2 ? 0 : 11 - mod);
};

export const validateCPF = (value: string) => {
    const stripped = (value || '').replace(/[^\d]/g, '');

    if (stripped && stripped.length === 11 && CPF_BLACKLIST.indexOf(stripped) === -1) {
        let numbers = stripped.substr(0, 9);
        numbers += verifierDigitCPF(numbers);
        numbers += verifierDigitCPF(numbers);

        if (numbers.substr(-2) === stripped.substr(-2)) {
            return true;
        }
    }
    return false;
};

export const validadeCpfCnpj = (value: string) => validateCPF(value) || validateCNPJ(value);

export const getDocumentType = (documentNumber: string) => {
    if (!documentNumber) return null;

    if (validateCPF(documentNumber)) return 'CPF';
    if (validateCNPJ(documentNumber)) return 'CNPJ';

    return null;
};

const VALID_SORTER_DIRECTIONS = ['asc', 'ascend', 'desc', 'descend'];

export function isValidOrder(order: [string, string]) {
    const [column, direction] = order;
    return typeof column === 'string' && VALID_SORTER_DIRECTIONS.includes(direction.toLocaleLowerCase());
}

export default {
    abortEarly: false,
    allowUnknown: true,
};
