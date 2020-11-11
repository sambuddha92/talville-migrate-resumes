const { getDriveFileByID, getAwsFileByURL, uploadFileToDrive }= require("./file.api");

const main = async () => {
    const file = await getAwsFileByURL("https://talville-resumes.s3.ap-south-1.amazonaws.com/resumes/zez2xeqohrpzbaclpkvpve.pdf");
    const finalUrl = await uploadFileToDrive({
        file,
        fileName: "dumdum"
    })
    console.log(finalUrl);
}

main();