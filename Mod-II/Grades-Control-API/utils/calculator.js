// Lib 
export function sum(array){
    const sum = array.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.value
    }, 0);
    return sum;
}

export function media(array){
    const sum = sum(array);
    const media = sum / array.length;
    return media;
}
