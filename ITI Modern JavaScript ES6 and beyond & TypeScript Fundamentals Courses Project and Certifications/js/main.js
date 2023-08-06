// 1 - Alert the sum of 2 numbers, and pass the sum as an argument to alert function (slef-invoking function).
(function () {
    let firstNumber = 90;
    let secondNumber = 100;
    let sum = firstNumber + secondNumber;
    alert("The sum of two numbers is " + sum);
})();

/* 2 - Try for…in, for…of and .foreach() with an array.
       a . What’re the differences between for…in, for…of and .foreach().
*/

const arr = [1, 2, 3];

/* for...in: iterates over the enumerable properties of an object (keys), including inherited properties. It is not recommended to use it with arrays because it can be slow and may not iterate over the elements in the expected order. */
for (const key in arr) {
    console.log(key); // logs "0", "1", "2"
}

console.log('--------------------------');

/* for...of: iterates over the values of an iterable object (such as arrays, strings, maps, sets). It does not iterate over enumerable properties. */
for (const value of arr) {
    console.log(value); // logs 1, 2, 3
}

console.log('--------------------------');

/* .forEach(): iterates over the values of an array. It is a method that is called on an array and takes a callback function as its argument. The callback function is called for each element in the array. */
arr.forEach((value) => {
    console.log(value); // logs 1, 2, 3
});

console.log('--------------------------');

// 3 - Try spread operator with any array of your implementation.
let familyOne = ['abram', 'emad'];
let familyTwo = ['mahrous', 'sehata'];
let allFamily = [...familyOne, ...familyTwo]
console.log(allFamily);

// 4 - Create a student class that contains: name, University, faculty, and final grade.
class Student {
    constructor(name, university, faculty, finalGrade) {
        this.name = name;
        this.university = university;
        this.faculty = faculty;
        this.finalGrade = finalGrade;
    }
}

// 5 - print student data in the console using template literals in this format: {Std_name} is a student in faculty of {fac_name} in university {Uni_name}
const student1 = new Student("Abram Emad", "High Institute for Engineering & Technology - New Minia", "Electrical Engineering", 85);

console.log(`${"std_"}${student1.name} ${`is a student in faculty of`} ${"fac_"}${student1.faculty} ${`in university`} ${"Uni_"}${student1.university}`);

/* 
   6 - Make a page that displays a tip for user every 3 seconds, as the following:
       a . Create a generator that has an array of 10 tips, and loops on the array and each time returns the next tip.
       b . Make a button that loop on the generator and display all tips [Using for…of]
       c . Make another button that uses setInterval (with arrow function) to display a tip every 3 seconds from the generator.[use next()].
*/

// Generator function that returns the next tip from an array
function* tipGenerator() {
    const tips = [
        "Tip 1",
        "Tip 2",
        "Tip 3",
        "Tip 4",
        "Tip 5",
        "Tip 6",
        "Tip 7",
        "Tip 8",
        "Tip 9",
        "Tip 10"
    ];

    let index = 0;
    while (index < tips.length) {
        yield tips[index];
        index++;
    }
}

// Display all tips using for...of loop
const displayAllTips = () => {
    const tipsList = document.getElementById("tipsList");
    tipsList.innerHTML = ""; // Clear previous tips

    // Create the tip generator
    const generator = tipGenerator();

    for (const tip of generator) {
        const li = document.createElement("li");
        li.textContent = tip;
        tipsList.appendChild(li);
    }
};

// Display a tip every 3 seconds using setInterval and next()
const displayTipsInterval = () => {
    const tipsList = document.getElementById("tipsList");
    tipsList.innerHTML = ""; // Clear previous tips

    // Create the tip generator
    const generator = tipGenerator();

    const intervalId = setInterval(() => {
        const li = document.createElement("li");
        li.textContent = generator.next().value;
        tipsList.appendChild(li);
    }, 3000);

    // Stop the interval after all tips have been displayed
    setTimeout(() => {
        clearInterval(intervalId);
    }, 3000 * 10); // Assuming there are 10 tips in the generator (adjust accordingly)
};

// Event listeners for the buttons
document.getElementById("displayTipsBtn").addEventListener("click", displayAllTips);
document.getElementById("displayTipsIntervalBtn").addEventListener("click", displayTipsInterval);



