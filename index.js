const { getUploadParams, uploadFileToDrive } = require("./file.api");
const { getInputs, setOutput } = require("./io.api");

const resumeDestinationFolderId = "13_svHlRFMI2jo5m8Z_jyw5k0RprFlUdE";
const outputArr = [];

const main = async () => {
  try {
    const inputs = await getInputs();
    if (inputs.length === 0) {
      return console.log("No inputs");
    }
    if (inputs.length === 0) {
      return console.log("Maximum 500 inputs per batch.");
    }

    console.log(`Found ${inputs.length} inputs. Processing...`);

    // inputs.forEach(async (input, index) => {
    //     const uploadParams = await getUploadParams(input, resumeDestinationFolderId);
    //     const fileUrl = await uploadFileToDrive(uploadParams);
    //     outputArr.push([input[0], fileUrl])
    // })

    for (var i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      const uploadParams = await getUploadParams(
        input,
        resumeDestinationFolderId
      );
      const fileUrl = await uploadFileToDrive(uploadParams);
      await setOutput(input[0], fileUrl);
    }
  } catch (error) {
    console.error(error);
  }

  //console.log(outputArr);
};

main();
