const humanizeDuration = require("humanize-duration")
const { getUploadParams, uploadFileToDrive } = require("./file.api");
const { getInputs, setOutput } = require("./io.api");
const { calcTime } = require("./util");

const resumeDestinationFolderId = "13_svHlRFMI2jo5m8Z_jyw5k0RprFlUdE";

const main = async () => {
  try {
    const inputs = await getInputs();
    const totalInputs = inputs.length;
    if (totalInputs === 0) {
      return console.log("No inputs");
    }
    console.log(`${totalInputs} inputs found.`)
    console.log("\n");
    console.log(`It will take approximately ${humanizeDuration(totalInputs*5000)} to process these`)
    console.log("\n");
    console.log(`Process expected to end at ${calcTime(5.5 + totalInputs*5000/3600000)}`);
    console.log("Starting ...")
    console.log("*");
    console.log("*");
    console.log("*");
    console.log("*");
    console.log("*");
    console.log("\n");
    for (var i = 0; i < totalInputs; i++) {
      let input = inputs[i];
      const uploadParams = await getUploadParams(
        input,
        resumeDestinationFolderId
      );
      const fileUrl = await uploadFileToDrive(uploadParams);
      await setOutput(input[0], fileUrl);
    }
    console.log("\n");
    console.log("*");
    console.log("*");
    console.log("*");
    console.log("*");
    console.log("*");
    console.log(`Process ended at ${calcTime(5.5)}`);
  } catch (error) {
    console.error(error);
  }
};

main();
