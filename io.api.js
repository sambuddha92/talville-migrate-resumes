const { google } = require("googleapis");

const util = require("./util");

const team_tlvl = util.client.team_tlvl;

const getInputs = async () => {
  try {
    const sheets = google.sheets({ version: "v4", auth: team_tlvl });

    const data = await sheets.spreadsheets.values.get({
      spreadsheetId: "1Lg_-7ns1Y48XGvWg0NEzG515ACrEfjyyXDdXM-ZsUC8",
      range: "Inputs!A1:D",
    });

    await sheets.spreadsheets.values.clear({
      spreadsheetId: "1Lg_-7ns1Y48XGvWg0NEzG515ACrEfjyyXDdXM-ZsUC8",
      range: "Inputs!A2:D",
    });

    const inputs = data.data.values;
    inputs.shift();

    return inputs;
  } catch (error) {
    console.error(error);
  }
};

const setOutput = async (id, fileUrl) => {
  const sheets = google.sheets({ version: "v4", auth: team_tlvl });

  await sheets.spreadsheets.values.append({
    spreadsheetId: "1Lg_-7ns1Y48XGvWg0NEzG515ACrEfjyyXDdXM-ZsUC8",
    valueInputOption: "RAW",
    range: "Outputs!A2:B",
    requestBody: {
      values: [[id, fileUrl]],
    },
  });

  console.log(`New resume URL for ${id} is ${fileUrl}.`)
};

module.exports = {
  getInputs,
  setOutput,
};
