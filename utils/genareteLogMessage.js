import fs from "fs";

const generateLogMessage = (message, status, routeName, type) => {
  const date = new Date();
  const formattedDate = date
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");

  const logMessage = `[${formattedDate}] ${status} ${type} ${routeName}: ${message}\n`;

  fs.appendFile("./logs.txt", logMessage, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
      return;
    }
    console.log("Log entry added successfully");
  });
};

export default generateLogMessage;
