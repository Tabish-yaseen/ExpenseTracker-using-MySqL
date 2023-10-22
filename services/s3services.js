const AWS=require('aws-sdk')
require('dotenv').config();

const uploadToS3=(data,fileName)=>{
    const BUCKET_NAME="expensetrackingapp98"
   
    let s3bucket=new AWS.S3({
        accessKeyId:process.env.IAM_USER_KEY,
        secretAccessKey:process.env.IAM_USER_SECRET,
       
    })
    
        let params={
            Bucket:BUCKET_NAME,
            Key:fileName,
            Body:data,
            ACL:'public-read'

        }
       return new Promise((resolve,reject)=>{
        s3bucket.upload(params,(err,response)=>{
            if(err){
                reject('something went wrong',err)
            }
            else{
                resolve(response.Location) 

            }
    }) 

       })    
}
module.exports={
    uploadToS3
}