const fs = require("fs");
const readline = require("readline");

const COEFFICIENTS_PATH = './data/coefficients.txt';
const DIRECTORY_PATH = './data/directory.txt';

const DEFAULT_COEFFICIENTS = {
  red: 0.000650000001769513,
  green: 0.00188100000377744,
  blue: 8.49999996717088e-5,
};

const MODIFIED_DEFAULT_COEFFICIENTS = {
  red: 0.0027234,
  green: 0.001831,
  blue: -0.000083096,
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const log = [];

function logAndPrint(message) {
  log.push(message);
  console.log(message);
}

function init() {
  if (!fs.existsSync(COEFFICIENTS_PATH)) {
    fs.writeFileSync(COEFFICIENTS_PATH, JSON.stringify(DEFAULT_COEFFICIENTS, null, 2));
  }

  if (fs.existsSync(DIRECTORY_PATH)) {
    const folder = fs.readFileSync(DIRECTORY_PATH, "utf8");
    logAndPrint(`FlightSimulator.exe is located at: ${folder}`);
    proceedWithBufferOperations(folder);
  } else {
    promptForFolder();
  }
}

function promptForFolder() {
  rl.question(
    "Please enter the FOLDER where FlightSimulator.exe is located (e.g. C:\\Users\\YOURUSERNAME\\Desktop): ",
    (inputFolder) => {
      logAndPrint(`FlightSimulator.exe is located at: ${inputFolder}`);
      fs.writeFileSync(DIRECTORY_PATH, inputFolder);
      proceedWithBufferOperations(inputFolder);
    }
  );
}

function proceedWithBufferOperations(folder) {
  const file = `${folder}/FlightSimulator.exe`;

  if (!fs.existsSync(file)) {
    logAndPrint("FlightSimulator.exe not found. Please check the folder path and try again.");
    rl.close();
    return;
  }

  const buffer = fs.readFileSync(file);

  rl.question(
    "Enter 1 for default coefficients, 2 for modified default coefficients, or 3 for custom coefficients (use at your own risk): ",
    (choice) => {
      let replacements;
      switch (choice) {
        case "1":
          replacements = DEFAULT_COEFFICIENTS;
          break;
        case "2":
          replacements = MODIFIED_DEFAULT_COEFFICIENTS;
          break;
        case "3":
          return promptForCustomCoefficients(buffer, file);
      }
      updateBuffer(buffer, file, replacements);
    }
  );
}

function promptForCustomCoefficients(buffer, file) {
  rl.question("Enter the ozone absorption coefficient for red: ", (red) => {
    rl.question("Enter the ozone absorption coefficient for green: ", (green) => {
      rl.question("Enter the ozone absorption coefficient for blue: ", (blue) => {
        const replacements = {
          red: parseFloat(red),
          green: parseFloat(green),
          blue: parseFloat(blue),
        };
        updateBuffer(buffer, file, replacements);
      });
    });
  });
}

function searchOffsets(buffer) {
  // Check the magic number of an executable (MZ for DOS executables)
  if (buffer[0] !== 0x4d || buffer[1] !== 0x5a) {
    logAndPrint("Error: FlightSimulator.exe is encrypted");
    return null;
  }

  const baselineCoefficients = JSON.parse(fs.readFileSync(COEFFICIENTS_PATH));
  const valuesToFind = Object.values(baselineCoefficients);

  let offsetsFound = [];

  valuesToFind.forEach((value) => {
    let floatBuffer = Buffer.alloc(4);
    floatBuffer.writeFloatLE(value);

    let offset = buffer.indexOf(floatBuffer);
    while (offset !== -1) {
      offsetsFound.push({ offset, value });

      offset = buffer.indexOf(floatBuffer, offset + 1);  // start from next position
    }
  });

  if (offsetsFound.length === 0) {
    logAndPrint("Error: No offsets found");
    return null;
  }

  return offsetsFound;
}


function updateBufferWithNewValues(buffer, offsets, replacements) {
  const replacementValues = Object.values(replacements);
  const valuesToFind = Object.values(JSON.parse(fs.readFileSync(COEFFICIENTS_PATH)));

  for (const { offset, value } of offsets) {
    const index = valuesToFind.indexOf(value);
    const newValue = replacementValues[index];

    const floatBuffer = Buffer.alloc(4);
    floatBuffer.writeFloatLE(newValue);

    buffer.write(floatBuffer.toString('hex'), offset, 'hex');

    logAndPrint(`Replaced value ${value} with ${newValue} at offset: ${offset}`);
  }
}

function updateBuffer(buffer, file, replacements) {
  const offsets = searchOffsets(buffer);
  if (!offsets) {
    fs.writeFileSync("./log.txt", log.join("\n"));
    rl.close();
    return;
  }

  const backupFile = `${file.replace('FlightSimulator.exe', 'FlightSimulator_Backup.exe')}`;
  fs.copyFileSync(file, backupFile);

  updateBufferWithNewValues(buffer, offsets, replacements);
  fs.writeFileSync(file, buffer);
  fs.writeFileSync(COEFFICIENTS_PATH, JSON.stringify(replacements, null, 2));

  logAndPrint("Complete");
  fs.writeFileSync("./log.txt", log.join("\n"));
  rl.close();
}

init();