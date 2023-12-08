// 快排的思想 以一个位置为基准,进行双指针移动,移动的是非基准所处的那个指针
const quickSort = (arr: number[]): number[] => {
    const startTime = new Date().valueOf();
    let i = 0;
    let j = arr.length - 1;
    const sort = (arr: number[], left: number, right: number) => {
        const startVal = left; //添加此处值的目的记录(划分两个区间)
        const endVal = right;
        if (left > right) return;
        const baseVal = arr[right]; //以j的值为基准
        while (left < right) {
            while (left < right && arr[left] <= baseVal) {
                left++
            }
            // 能走到这一步有两种方式, 方式一就是满足交换条件, 方式二就是left 已经增加到和right一样了
            if (left < right) {
                const median = arr[left];
                arr[left] = arr[right];
                arr[right] = median;
                right--;
            }
            while (left < right && arr[right] >= baseVal) {
                right--
            }
            if (left < right) {
                const median = arr[right];
                arr[right] = arr[left];
                arr[left] = median;
                left++
            }
        }
        // console.log('基准值', left, right, baseVal)
        sort(arr, startVal, left - 1)
        sort(arr, left + 1, endVal)
    }
    sort(arr, i, j)
    const endTime = new Date().valueOf();
    console.log('花费时间', endTime - startTime)
    return arr;
}
console.log(quickSort([11, 2, 8, 3, 6, 9, 15, 0]))