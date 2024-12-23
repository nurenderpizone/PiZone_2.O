/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    console.time("Start");
    const checkString = strs[0];
    let returnValue = "";
    for (const element of checkString) {
        let isRunLoop = true;
        for (let index = 0; index < strs.length; index++) {
            const strsElement = strs[index];
            if (strsElement.indexOf(element) != 0) {
                isRunLoop = false;
                break;
            }
            strs[index] = strsElement.slice(1);
        }
        if (isRunLoop) {
            returnValue += element;
        } else {
            break;
        }
    }
    console.timeEnd("Start");
    return returnValue;

};
console.log(longestCommonPrefix(["flower", "flow", "flight"]));
console.log(longestCommonPrefix(["aa", "ab"]));
console.log(longestCommonPrefix(["aa", "aa"]));
console.log(longestCommonPrefix(["c", "acc", "ccc"]));


