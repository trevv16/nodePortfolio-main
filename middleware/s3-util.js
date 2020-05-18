const AWS = require('aws-sdk');
const fs = require('fs');
// const date_help = require('../utils/date_helpers');
// const moment = require('moment');
// const fileKey = `fileName_userID_${date_help.toDateTimeString(moment())}.png`

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION,
});


module.exports = {
  uploadUserFile:(userImg, fileKey) => {
    const s3 = new AWS.S3();
    s3.putObject({
      Bucket: process.env.USER_UPLOAD_BUCKET,
      Body: fs.readFileSync(userImg),
      Key: fileKey,
    })
        .promise()
        .then((response) => {
          console.log(`done! - `, response);
          const imgLink = s3.getSignedUrl('getObject', {
            Bucket: process.env.USER_UPLOAD_BUCKET,
            Key: fileKey,
          });
          console.log(`The URL is ${imgLink}`);
        })
        .catch((err) => {
          console.log('failed:', err);
          req.flash('S3 Error', err);
        });

        return imgLink;
    },
    downloadUserFile:(fileKey) => {
        const params = {
            Bucket: process.env.USER_UPLOAD_BUCKET,
            Key: fileKey
        };
        res.attachment(fileKey);
        s3.getObject(params, (err, data) => {
            if (err === null) {
                res.attachment('file.ext'); // or whatever your logic needs
                res.send(data.Body);
                console.log(`${fileKey} has been created!`);
            } else {
                req.flash('S3 Error', err);
            }
        });
    }
};
