console.time('Start');
const fruits = ['Apple', 'Banana', 'Cherry'];

for (let i = 0; i < fruits.length; i++) {
  // console.log(`Iteration ${fruits[i]}`);
}
console.timeEnd('Start');


console.time("code refactor 1");
const fruits2 = ['Apple', 'Banana', 'Cherry'];

fruits2.forEach((fruit, index) => {
  // console.log(`Index ${index}: ${fruit}`);
});
console.timeEnd("code refactor 1");

console.time("code refactor 2");
const fruits3 = ['Apple', 'Banana', 'Cherry'];

for (const fruit of fruits3) {
  // console.log(fruit);
}
console.timeEnd("code refactor 2");