// Questão 1 (Data Manipulation):
// Adicione a lógica para reverter texto na função abaixo:

// function reverseText(text) {
//   return text;
// }

// console.log(reverseText("Web Development Course"));

function reverseText(text) {
  let revertedText = text.split("").reverse().join("")
  return revertedText;
}

// console.log(reverseText("Web Development Course"));



// Questão 2 (Data Manipulation):
// Adicione a lógica para reverter apenas as letras na função abaixo:

// function reverseLetters(string) {
//   return string;
// }

// console.log(reverseLetters("z<*zj"));
// result: j<*zz

function reverseLetters(string) {
  let revertedString = [...string].map((letter) => letter)
  return revertedString;
}

console.log(reverseLetters("z<*zj"));


// Questão 3 (Asynchronism):
// Corrija o código abaixo para imprimir - respectivamente - Start, Timeout e Finish:

// const deley = () => setTimeout(() => {
//   console.log("Timeout");
// }, 3000);

// async function main() {
//   console.log("Start");
//   await deley();
//   console.log("Finish");
// }

// main();

const deley = new Promise((resolve, reject) => {
  setTimeout(async () => {
    resolve(console.log("Timeout"));
  }, 3000)
}) 

async function main() {
  console.log("Start");
  await deley.finally();
  console.log("Finish");
}

main();