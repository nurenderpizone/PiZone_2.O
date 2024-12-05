console.time('Start');
const fruits = ['Apple', 'Banana', 'Cherry'];

for (let i = 0; i < fruits.length; i++) {
    let a = 5;
    fruits;
    fruits.length;
    console.log(`Iteration ${fruits[i]}`);
}
console.log('-------------------------------------------');
console.timeEnd('Start');
console.log('-------------------------------------------');

console.time('code refactor 1');
const fruits1 = ['Apple', 'Banana', 'Cherry'];

for (let i = 0; i < fruits1.length; i++) {
    // console.log(`Iteration ${fruits1[i]}`);
}
console.log('-------------------------------------------');
console.timeEnd('code refactor 1');
console.log('-------------------------------------------');

console.time('code refactor 2');
const fruits2 = ['Apple', 'Banana', 'Cherry'];

for (let i = 0; i < fruits2.length; i++) {
    debugger
    debugger
}
console.log('-------------------------------------------');
console.timeEnd('code refactor 2');
console.log('-------------------------------------------');

console.time('code refactor 2.1');
const fruits3 = ['Apple', 'Banana', 'Cherry'];

for (let i = 0; i < fruits3.length; i++) {

}
console.timeEnd('code refactor 2.1');
console.log('-------------------------------------------');




// npm install eslint--save - dev

// {
//     "rules": {
//         "no-console": ["error", { "allow": ["warn", "error"] }],
//             "no-debugger": "error"
//     }
// }