/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    if (s == "") return false;
    let isValied = "";
    for (const element of s) {
        if (element == "(" || element == "{" || element == "[") {
            isValied += element;
        } else if (element == ")") {
            console.log(element);

            // isValied += element;
        } else if (element == "}") {
            // console.log(element);
            // isValied += element;

        } else if (element == "]") {
            // console.log(element);
            // isValied += element;

        }
    }
    console.log(isValied);

    if (
        isValied == ""
    ) {
        return true;
    } else {
        return false;
    }
};
// console.log(isValid('()'));
// console.log(isValid('()[]{}'));
// console.log(isValid('(]'));
// console.log(isValid('([])'));
console.log(isValid('([)]'));
console.log(isValid('({[)'));