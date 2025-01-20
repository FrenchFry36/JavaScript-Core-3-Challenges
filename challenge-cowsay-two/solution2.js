// =================
// Stripped down cowsayer CLI,
// no libraries or arguments
// https://nodejs.dev/learn/accept-input-from-the-command-line-in-nodejs
// =================

// 1. Make  a command line interface.
// 2. Make supplies for our speech bubble
const saying = process.argv.slice(2).join(" ");
const border = "=".repeat(saying.length);
const CLInterface = `
${border}
${saying}
${border}
        \\    ^__^
          \\  (oo)\\_______
             (__)\\       )\\/\\
                 ||----w |
                 ||     ||
`;

// 3. Make a cow that takes a string

const cow = (saying) => {
  if (!saying) {
    return "Please provide a message";
  } else {
    return CLInterface;
  }
};

// 4. Use readline to get a string from the terminal
// (with a prompt so it's clearer what we want)
console.log(cow(saying));
