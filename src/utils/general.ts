export const truncateHash = (value) => {
    if (Number(value)) {
        return value;
    }
    if (!value || value.length < 6) {
        return '';
    }

    const firstHalf = value.substring(0, 6);
    const secondHalf = value.slice(-6);
    return `${firstHalf}...${secondHalf}`;
};

export const splitHash = (value) => {
    const result = [];
    value.split('').forEach((e, i) => {
        if (i % 6 === 0) {
            result.push(value.slice(i, i + 6));
        }
    });
    return result;
};
