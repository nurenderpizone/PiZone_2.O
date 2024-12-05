console.time('Start');
var twoSum = function (nums, target) {
    for (let i = 0; i < nums.length; i++) {
        if ((nums[i] + nums[i + 1]) == target) {
            return [i, i + 1];
        }
    }
};
console.log(

    twoSum([2, 7, 11, 15], 9)
);
console.timeEnd('Start');

console.time('Start2');
var twoSum = function (nums, target) {
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }

    throw new Error("No solution found");
};
console.log(

    twoSum([2, 7, 11, 15], 9)
);
console.timeEnd('Start2');