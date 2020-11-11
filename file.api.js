const { google } = require("googleapis"),
  fetch = require("node-fetch");

const util = require("./util");

const team_tlvl = util.client.team_tlvl;
const tlvl = util.client.tlvl;

const getDriveFileByID = async (fileId) => {
  try {
    const { access_token } = await tlvl.authorize();
    const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
    const file = await fetch(url, {
      method: "get",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return file;
  } catch (error) {
    console.error(error);
  }
};

const getAwsFileByURL = async (url) => {
  try {
    const file = await fetch(url);
    return file;
  } catch (error) {
    console.error(error);
  }
};

const getUploadParams = async (input, destination) => {
  try {
    let file;
    if (input[1] === "drive") {
      file = await getDriveFileByID(input[2]);
    } else {
      file = await getAwsFileByURL(input[2]);
    }
    const params = {
      file,
      fileName: input[0],
      destination,
    };
    return params;
  } catch (error) {
    console.error(error);
  }
};

const uploadFileToDrive = async ({
  file,
  fileName,
  destination = "13_svHlRFMI2jo5m8Z_jyw5k0RprFlUdE",
}) => {
  try {
    const fileMetadata = {
      name: fileName,
      parents: [destination],
    };

    const media = {
      mimeType: file.headers.get("content-type"),
      body: file.body,
    };

    const drive = google.drive({ version: "v3", auth: team_tlvl });

    const res = await drive.files.create({
      resource: fileMetadata,
      media: media,
    });
    return `https://drive.google.com/file/d/${res.data.id}/view`;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getDriveFileByID,
  getAwsFileByURL,
  getUploadParams,
  uploadFileToDrive,
};
