//object Destructuring

const user = {
    name : "Dinesh",
    age : 21,
    city : "Madurai"
};
const { name, age , city } = user ;
console.log(name);                      
console.log(age);
console.log(city);

//object destructuring with different variable names

const user1 = {
    name : "Dinesh",
    age : 21,
    city : "Madurai"
};
const { name : userName, age : userAge , city : userCity } = user1 ;
console.log(userName);                      
console.log(userCity);
console.log(userAge);

//object destructuring with default values

const user2 = {
    veg : "Carrot",
    nonVeg : "Chicken"
};
const {veg , nonVeg ,product = "Milk"} = user2 ;
console.log(veg);                      
console.log(nonVeg);
console.log(product);

//Nested object destructuring

const user3 = {
    peru : "Dinesh",
    address : { ooru : "Madurai" , state : "Tamilnadu"}
};
const {peru , address :{ooru, state}} = user3;
console.log(peru);
console.log(ooru);      
console.log(state);

//function parameter destructuring

const books = {
    book : "physics",
    section : 12,
};
const displayBook = ({book,section}) => {
    console.log(book)
    console.log(section)
};
displayBook(books);

