const { google } = require("googleapis"),
  path = require("path"),
  fetch = require("node-fetch");

const SCOPES = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive.appdata",
];

const team_tlvl_credentials = require(path.resolve(
  __dirname,
  "..",
  "config",
  "team_tlvl.credentials.json"
));

const team_tlvl_client = new google.auth.JWT(
  team_tlvl_credentials.client_email,
  null,
  team_tlvl_credentials.private_key,
  SCOPES,
  null
);

const tlvl_credentials = require(path.resolve(
  __dirname,
  "..",
  "config",
  "tlvl.credentials.json"
));

const tlvl_client = new google.auth.JWT(
  tlvl_credentials.client_email,
  null,
  tlvl_credentials.private_key,
  SCOPES,
  null
);

module.exports = {
  team_tlvl: team_tlvl_client,
  tlvl: tlvl_client,
};
