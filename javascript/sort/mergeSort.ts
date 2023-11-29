const mergeSort = (arr: number[]): number[] => {
    const startTime = new Date().valueOf();
    const splice_left_right = (left: number[], right: number[]): number[] => {
        if (left.length > 1) {
            const spliceNum = Math.floor(left.length / 2);
            const spliceLeft = left.slice(0, spliceNum)
            const spliceRight = left.slice(spliceNum)
            left = splice_left_right(spliceLeft, spliceRight);
        }
        if (right.length > 1) {
            const spliceNum = Math.floor(right.length / 2);
            const spliceLeft = right.slice(0, spliceNum)
            const spliceRight = right.slice(spliceNum)
            right = splice_left_right(spliceLeft, spliceRight);
        }
        let i = 0, j = 0;
        const result = [];
        while (i < left.length || j < right.length) {
            if (i == left.length) {
                result.push(...right.slice(j))
                j = right.length
            } else if (j == right.length) {
                result.push(...left.slice(i))
                i = left.length
            } else {
                left[i] >= right[j] ? result.push(right[j++]) : result.push(left[i++])
            }
        }
        return result
    }
    let result;
    if (arr.length > 1) {
        const spliceNum = Math.floor(arr.length / 2);
        const spliceLeft = arr.slice(0, spliceNum)
        const spliceRight = arr.slice(spliceNum)
        result = splice_left_right(spliceLeft, spliceRight)
    } else {
        result = arr;
    }
    const endTime = new Date().valueOf();
    console.log('花费时间', endTime - startTime)
    return result
}

console.log(mergeSort([3, 2, 4, 6, 8, 9]))