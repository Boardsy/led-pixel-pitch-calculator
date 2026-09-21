const calc = require("./pixel-pitch");

console.log(calc.recommendPitch(4));          // closest viewer 4 m
console.log(calc.viewingDistances(1.86));     // P1.86 screen
console.log(calc.screenResolution(3, 2, 2.5)); // 3 m x 2 m wall at P2.5
console.log(calc.screenSize(1920, 1080, 1.5)); // Full HD at P1.5
