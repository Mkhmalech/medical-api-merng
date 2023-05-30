export default {
    removeUndefinedFromObject: (obj: { [key: string]: unknown }) => {
        let newObj = obj;
        Object.keys(newObj).forEach(key => {
            if (newObj[key] == undefined || newObj[key] === '')
                delete newObj[key]
        });

        return newObj;
    }
}

export const codifyOrderCode = (orderUniqueNumber: number, uniqueCodeDigits: number) => {
    let orderUniqueCode = new Date().toLocaleDateString('en-GB').split('/').reverse().join('')
    const differenceDigitsNumberLength = uniqueCodeDigits - orderUniqueNumber.toString().length

    if (differenceDigitsNumberLength > 0) {
        return orderUniqueCode + '0'.repeat(differenceDigitsNumberLength) + orderUniqueNumber
    } else {
        return "Number of digits is less than number of orders"
    }
}