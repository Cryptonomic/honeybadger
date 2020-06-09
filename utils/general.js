export const truncateHash = value => {
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
