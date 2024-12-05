
console.time('Start');
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

Object.assign(target, source);

console.timeEnd('Start');


console.time("code refactor 1");

const target1 = { a: 1, b: 2 };
const source2 = { b: 4, c: 5 };

// Merge source into target
const updatedTarget = { ...target1, ...source2 };

console.timeEnd("code refactor 1");
