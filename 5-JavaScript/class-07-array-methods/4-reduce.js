// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

const array = [1, 2, 3, 4, 5];
console.log(array.reduce((a, b) => a + b, 100));
console.log(array.reduce((a, b) => a * b, 100));

const students = [
  { id: 1, name: "Emanuel", salary: 8000, cite: "Jucás" },
  { id: 2, name: "Maikel", salary: 9000, cite: "Jucás" },
  { id: 3, name: "Luiza", salary: 8000, cite: "Cariús" },
  { id: 4, name: "Natanael", salary: 7000, cite: "Cariús" },
  { id: 5, name: "Odilon", salary: 6000, cite: "Ju´cas" },
];

console.log(students.reduce((a, b) => a + b.salary, 0));

const groupeByCity = students.reduce((acc, student) => {
  if (!acc[student.cite]) {
    acc[student.cite] = [];
  }
  acc[student.cite].push(student);
  return acc;
}, {});

console.log(groupeByCity);

const arrayLetters = ["A", "A", "B", "C", "C", "C"];

const countLetters = arrayLetters.reduce((prev, letter) => {
  prev[letter] ? prev[letter]++ : (prev[letter] = 1);
  return prev;
}, {});

console.log(countLetters);
