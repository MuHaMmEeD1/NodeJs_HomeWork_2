import fs from "fs";

// fs.writeFile("./text.txt", "Hello, World!", (err) => {
//   if (err) {
//     console.error("Error writing file:", err);
//     return;
//   }
//   console.log("File written successfully");
// });

fs.appendFile("./text2.txt", "\nHello, again!", (err) => {
  if (err) {
    console.error("Error appending to file:", err);
    return;
  }
  console.log("File appended successfully");
});

fs.readFile("./text2.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("File content:", data);
});

const fileExists = fs.existsSync("./text2.txt");
console.log("File exists:", fileExists);

fs.unlink("./text2.txt", (err) => {
  if (err) {
    console.error("Error deleting file:", err);
    return;
  }
  console.log("File deleted successfully");
});

fs.mkdir("./newDir", (err) => {
  if (err) {
    console.error("Error creating directory:", err);
    return;
  }
  console.log("Directory created successfully");
});

fs.rmdir("./newDir", (err) => {
  if (err) {
    console.error("Error deleting directory:", err);
    return;
  }
  console.log("Directory deleted successfully");
});

fs.rename("./text.txt", "./textRenamed.txt", (err) => {
  if (err) {
    console.error("Error renaming file:", err);
    return;
  }
  console.log("File renamed successfully");
});

fs.watchFile("./textRenamed.txt", (curr, prev) => {
  console.log("File changed:", curr, prev);
  console.log("type of file:", typeof curr, typeof prev);
});
