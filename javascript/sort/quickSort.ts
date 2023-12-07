// 快排的思想 以一个位置为基准,进行双指针移动,移动的是非基准所处的那个指针
const quickSort = (arr: number[]): number[] => {
    const startTime = new Date().valueOf();
    let i = 0;
    let j = arr.length - 1;
    debugger
    const sort = (arr: number[], left: number, right: number) => {
        const baseVal = arr[right]; //以j的值为基准
        while (left < right) {
            while (left < right && arr[left] <= baseVal) {
                left++
            }
            arr[left] = arr[right];
            right--;
            while (left < right && arr[right] >= baseVal) {
                right--
            }
            arr[right] = arr[left];
            left++
        }
        console.log('基准值', left, right, baseVal)
        sort(arr, 0, left - 1)
        sort(arr, left + 1, right)
    }
    sort(arr, i, j)
    const endTime = new Date().valueOf();
    console.log('花费时间', endTime - startTime)
    return arr;
}
console.log(quickSort([3, 2, 4, 6, 8, 9]))