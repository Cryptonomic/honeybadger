export const truncateHash = (value: string) => {
    if (!value) { return ''; }
    if (value.length < 12) { return value; }
    if (!value.startsWith('tz')) { return value; }

    const firstHalf = value.substring(0, 6);
    const secondHalf = value.slice(-6);

    return `${firstHalf}...${secondHalf}`;
};

export const splitHash = (value: string) => {
    let result: string[] = [];

    value.split('').forEach((e, i) => {
        if (i % 6 === 0) {
            result.push(value.slice(i, i + 6));
        }
    });

    return result;
};
