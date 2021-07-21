export const formatName = (str, maxLength) => {
    if (str.length > maxLength) {
        str = str.slice(0, maxLength-2) + '...';
    }

    return str;
};