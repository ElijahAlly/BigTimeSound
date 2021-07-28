export const getStringsFromObjects = (arr) => {
    let strs = [];
    arr.forEach((obj) => {
        if (obj.name) {
            strs.push(obj.name);
        } else {
            strs.push(obj.title);
        }
    });

    return strs;
}

export const getObjectFromStr = (str, arrOfObjects) => {
    let matchObj = null;

    arrOfObjects.forEach((obj) => {
        if (obj.name && obj.name === str) {
            matchObj = obj;
            return;
        } else if (obj.title && obj.title === str) {
            matchObj = obj;
            return;
        }
    });

    return matchObj;
}