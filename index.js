const humanizeDuration = require("humanize-duration"),
  colors = require("colors/safe");
const { getUploadParams, uploadFileToDrive } = require("./file.api"),
  { getInputs, setOutput } = require("./io.api"),
  { calcTime } = require("./util");

const resumeDestinationFolderId = "13_svHlRFMI2jo5m8Z_jyw5k0RprFlUdE";

const main = async () => {
  try {
    console.log(colors.yellow("\nAttempting to read inputs.\n"));
    const inputs = await getInputs();
    const totalInputs = inputs.length;
    if (totalInputs === 0) {
      return console.log(colors.red("No inputs found.\n"));
    }
    console.log(
      colors.green(
        `${totalInputs} inputs found. It will take approximately ${humanizeDuration(
          totalInputs * 5000
        )} to process these\n`
      )
    );
    console.log(
      colors.brightCyan(
        `Process expected to end at ${calcTime(
          5.5 + (totalInputs * 5000) / 3600000
        )}\n`
      )
    );
    console.log(colors.green("...\n"));
    for (var i = 0; i < totalInputs; i++) {
      let input = inputs[i];
      const uploadParams = await getUploadParams(
        input,
        resumeDestinationFolderId
      );
      const fileUrl = await uploadFileToDrive(uploadParams);
      await setOutput(input[0], fileUrl);
    }
    console.log(colors.green("\n..."));
    console.log(colors.brightCyan(`\nProcess ended at ${calcTime(5.5)}\n`));
    console.log(colors.green(`Successfully processed ${totalInputs} inputs.\n`))
  } catch (error) {
    console.error(error);
  }
};

main();
