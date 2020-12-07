# Usage
1. Clone this repository to your local machine. 
2. Open a terminal and CD into the project folder or open the project in an IDE (vscode) with integrated terminal.
3. Run the command `npm install` to install dependencies.
4. Create a new directory named config in the root directory of the project.
## Get Credentials
### For gmail
* Log in to [Google Developer Console](https://console.cloud.google.com/) using the gmail address.
* From the navigation bar, select the project named "Talville Root".
* From the left hand panel, select APIs & Services > Credentials.
* Click on the service account or just click the edit(pencil) icon on the right hand side of the serivce account row.
* Select Add Key > Create New Key. On the pop up window, make sure that the JSON option is selected.
* Click create to download the json file.
* Move or directly store the file inside the config directory.
* rename the file to `team_tlvl.credentials.json`.

### For talville
* Log in to [Google Developer Console](https://console.cloud.google.com/) using your talville email address.
* From the navigation bar, select the project named "Migrate".
* From the left hand panel, select APIs & Services > Credentials.
* Click on the service account or just click the edit(pencil) icon on the right hand side of the serivce account row.
* Select Add Key > Create New Key. On the pop up window, make sure that the JSON option is selected.
* Click create to download the json file.
* Move or directly store the file inside the config directory.
* rename the file to `tlvl.credentials.json`.

## Set inputs
* Go to [Google Drive](drive.google.com) using gmail address.
* Locate a folder named "Dump" and open the Spreadsheet named "Resume Migration" inside that folder.
* On the "To be Processed" sheet, all the inputs are stored.
* Already processed inputs are colored green and currently processing inputs are colored yellow.
* Copy a good number of rows, make sure that rows are white to avoid duplication.
* Each input will take around 3 - 4 seconds to process so select the number of rows according to the time in your hand.
* Paste all the inputs on the "Inputs" sheet. Make sure that you are not overwriting other inputs or the First row.
* Fill all the rows you copied with the yellow color, to mark them under processing.

## Run the program
* On a terminal, CD into the root of the project.
* Run the command `node .`
* Wait for the program to finish or press `ctrl + c` to quit the program prematurely.

## Finish Up
* Check the "Outputs" sheet on the "Resume Migration" spreadsheet. All the inputs should have been processed and stored as ID - Resume URL pairs over here.
* Make sure that the ID of the last row on outputs is the same as the ID of the last row of the inputs you had copied. If they do not match, note the last ID on the outputs sheet. This is the last input that has been processed.
* On the Inputs sheet, color all the processed rows green. In case there are pending inputs colored yellow, color them white.
* That's all.
