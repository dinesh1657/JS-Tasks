//Arrow Destructuring

const fruits = ["Apple", "Banana", "Mango"];

const [fruits1,fruits2,fruits3] = fruits;

console.log(fruits1);
console.log(fruits2);
console.log(fruits3); 

//Remove mid element from array using destructuring

const fruit = ["Apple", "Banana", "Mango"];

const [fruit1, ,fruit3] = fruit;

console.log(fruit1);
console.log(fruit3);

//Default values in destructuring

const number = [10,20];
const [num1,num2,num3=30] = number;

console.log(num1);
console.log(num2);
console.log(num3);  

//Rest with Array Destructuring

const numbers = [10,20,30,40,50];

const [numb1,numb2,...rest] = numbers;

console.log(numb1);
console.log(numb2);
console.log(rest);