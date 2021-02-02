const AWS = require('aws-sdk')
const fs = require('fs')

AWS.config.update({
    accessKeyId: process.env.AccessKeyID,
    secretAccessKey: process.env.SecretAccessKey,
    region: 'ap-southeast-1',
});
const s3 = new AWS.S3()

async function uploadFile (source) {
  try {
    const responseData = []
    for (let index = 0; index < source.photo.length; index++) {
      let el = source.photo[index]
      let putParams = {
        ACL: 'public-read',
        Bucket: process.env.BUCKET_NAME,
        Body: fs.createReadStream(el.path),
        Key: `${el.originalname}`
      }
      const data = await s3.upload(putParams).promise()
      responseData.push({ Location: data.Location, Key: data.key})
      fs.unlinkSync(el.path)
    }
    return responseData
  } catch (error) {
    return null
  }
}

async function deleteFile (source) {
  try {
    source = JSON.parse(source)
    for (let index = 0; index < source.length; index++) {
      let delParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: source[index].Key
      }
      await s3.deleteObject(delParams).promise()
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { uploadFile, deleteFile }