//Arrow Function

const add = (a,b) =>{
    return a+b;
}
console.log(add(10, 20));

//Arrow function in no parameter

 const list =() => {
    console.log("Dk");
 }
list();

//Arrow function in one parameter

const list1 = (name) => {
    console.log("Dinesh" + name);
}
list1("kumar");

//Arrow function in one parameter without parentheses

const list2 = name => {
    console.log("kumar" + name);
}
list2("Dinesh");

//Arrow function in multiple parameters

const list3 = (name, age) => {
    console.log("Dinesh" + name + " " + age);
}
list3("kumar", 21);