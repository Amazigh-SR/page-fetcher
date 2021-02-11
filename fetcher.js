const request = require("request");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputCollection = process.argv.slice(2);
const url = inputCollection[0];
const filePath = inputCollection[1];
let data = "";

request(url, (error, response, body) => {
  if (error) {
    console.log(error);
    return process.exit;
  }
  console.log("error:", error); // Print the error if one occurred
  console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
  data = body;

  if (fs.existsSync(filePath)) {
    rl.question(
      "Do you want to overwrite this file? yes or no answers only! ",
      (answer) => {
        if (answer === "yes") {
          fs.writeFile(filePath, data, { encoding: "utf8" }, (err) => {
            if (err) throw err;
            console.log(`Downloaded and saved ${data.length} bytes to`);
          });
        } else {
          process.exit;
        }
        rl.close();
      }
    );
  } else {
    fs.writeFile(filePath, data, { encoding: "utf8" }, (err) => {
      if (err) throw err;
      console.log(`Downloaded and saved ${data.length} bytes to`);
    });
  }
  rl.close();
});
