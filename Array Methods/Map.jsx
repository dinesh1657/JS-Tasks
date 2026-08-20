const products = [
    { name: 'Laptop', price: 1000 },
    { name: 'Phone', price: 500 }
];

const promoProducts = products.map(item => ({
    ...item,
    price: item.price * 2
}));

console.log(promoProducts);

