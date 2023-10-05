// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration

let count = 1; //flag
while (count <= 10) {
  if (count > 2 && count < 8) {
    count++;
    continue;
    // break;
  }

  console.log(count);
  count++; // container
}

let resp = false;
do {
  resp = prompt("Deseja sair?");
} while (resp);

console.log("Running...");