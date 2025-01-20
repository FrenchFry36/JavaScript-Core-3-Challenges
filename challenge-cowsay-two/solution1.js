let saying = process.argv.slice(2).join(" ");
let topLine = "_".repeat(saying.length + 2);
let bottomLine = "-".repeat(saying.length + 2);

function cowsay(saying) {
  return `
  ${topLine}
< ${saying} > 
  ${bottomLine}
        \\    ^__^
          \\  (oo)\\_______
             (__)\\       )\\/\\
                 ||----w |
                 ||     ||
`;
}

if (!saying) {
  console.log("Please provide a message for the cow");
} else {
  console.log(cowsay(saying));
}
