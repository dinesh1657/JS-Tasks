const RATE_PER_KG_PER_KM = 10;
function calculateShippingCost(weight, distance) {
    return weight * distance * RATE_PER_KG_PER_KM;
}
let weight = 5
let distance = 10

let shippingCost = calculateShippingCost(weight, distance);

console.log("Shipping cost: " + shippingCost);