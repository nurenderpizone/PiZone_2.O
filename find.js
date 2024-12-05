console.time('Start');
const users = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Jane', age: 30 },
    { id: 3, name: 'Smith', age: 20 }
];

const user = users.find(user => user.id === 2);
console.timeEnd('Start');


console.time('code refactor 1');

const users1 = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Jane', age: 30 },
    { id: 3, name: 'Smith', age: 20 }
];

const user1 = users1.forEach(user => {
    return user.id == 2;
});


console.timeEnd('code refactor 1');

console.time('code refactor 2');
const users2 = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Jane', age: 30 },
    { id: 3, name: 'Smith', age: 20 }
];

const user3 = users2.findIndex(user => user.id === 2);
console.timeEnd('code refactor 2');