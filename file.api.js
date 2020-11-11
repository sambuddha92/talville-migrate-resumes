const { google } = require("googleapis"),
  fetch = require("node-fetch");

const util = require("./util");

const team_tlvl = util.client.team_tlvl;
const tlvl = util.client.tlvl;

const getDriveFileByID = async (fileId) => {
  const { access_token } = await tlvl.authorize();
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
  const file = await fetch(url, {
    method: "get",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return file;
};

const getAwsFileByURL = async (url) => {
  const file = await fetch(url);
  return file;
};

const uploadFileToDrive = async ({
  file,
  fileName,
  destination = "13_svHlRFMI2jo5m8Z_jyw5k0RprFlUdE",
}) => {
  // console.log(file, fileName, destination);
  // console.log(file.status);
  // console.log(file.headers.get("content-type"));

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
};

module.exports = {
  getDriveFileByID,
  getAwsFileByURL,
  uploadFileToDrive,
};
