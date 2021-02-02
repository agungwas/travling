const AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId: process.env.AccessKeyID,
    secretAccessKey: process.env.SecretAccessKey,
    region: 'ap-southeast-1',
});
const s3 = new AWS.S3()

function uploadFile(source,targetName,res){
  console.log('preparing to upload...');
  fs.readFile(source, function (err, filedata) {
    if (!err) {
      const putParams = {
          Bucket      : 'traviling',
          Key         : targetName,
          Body        : filedata
      };
      s3.putObject(putParams, function(err, data){
        if (err) {
          console.log('Could nor upload the file. Error :',err);
          return res.send({success:false});
        } 
        else{
          fs.unlink(source);// Deleting the file from uploads folder(Optional).Do Whatever you prefer.
          console.log('Successfully uploaded the file');
          return res.send({success:true});
        }
      });
    }
    else{
      console.log({'err':err});
    }
  });
}

//The retrieveFile function
function retrieveFile(filename,res){
  const getParams = {
    Bucket: 'sample-bucket-name',
    Key: filename
  };

  s3.getObject(getParams, function(err, data) {
    if (err){
      return res.status(400).send({success:false,err:err});
    }
    else{
      return res.send(data.Body);
    }
  });
}
module.exports = { uploadFile, retrieveFile }