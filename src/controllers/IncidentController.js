const connection = require("../database/connection");
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const s3 = new aws.S3();

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await connection("incidents").count();

    const incidents = await connection("incidents")
      .join("user", "user.id", "=", "incidents.user_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select(
        "incidents.*",
        "user.name",
        "user.email",
        "user.whatsapp",
      );
    res.header("X-Total-count", count["count(*)"]);
    res.header("X-count", incidents.length);

    return res.json(incidents);
  },

  async create(req, res) {
    const { title, description, location } = req.body;
    var {key,location:path = "" } = req.file;
     if(path==""){
       path=`${process.env.APP_URL}/files/${key}`;
    }
    console.log(path);
    const user_id = req.headers.authorization;
    const verification = req.headers.verification;
    const [count] = await connection('user').where('id',user_id).where('verification',verification).count();
    console.log(count)
    if(count['count(*)']!=1){
      console.log(`{ msg: 'acesso negado' }`)

      if(process.env.STORAGE_TYPE=='s3'){
         await s3.deleteObject({
          Bucket: process.env.AWS_BUCKET,
          Key:key
        }).promise()
      }
      else{
      await promisify(fs.unlink)(path.resolve(__dirname,'..','..','tmp','uploads',key));
      }
      

      return res.json({ msg: 'acesso negado' });
    }
    const [id] = await connection("incidents").insert({
      title,
      description,
      location,
      photoPath: path,
      user_id,
    });
/*{	"title":"Titulo foto1",	"description":"Corpo test 4",	"location":"sao joao"}*/

  return res.json({ msg: 'ok' });
  },

  async delete(req, res) {
    const { id } = req.params;
    const user_id = req.headers.authorization;
    const verification = req.headers.verification;
    const [count] = await connection('user').where('id',user_id).where('verification',verification).count();
    console.log(count['count(*)'])
    if(count['count(*)']!=1){
      return res.json({ msg: 'acesso negado' });
    }

    const incident = await connection("incidents")
      .where("id", id)
      .select("user_id","photoPath")
      .first();

    if (incident.user_id != user_id) {
      return res.status(401).json({ error: "Operation not permitted." });
    }
  
    if(process.env.STORAGE_TYPE=='s3'){
      console.log(incident.photoPath)
      let key = incident.photoPath;
      key = key.substring(key.indexOf('com/')+4);
      console.log(key)
       await s3.deleteObject({
        Bucket: process.env.AWS_BUCKET,
        Key:key
      }).promise()
    }
    else{
      let key = incident.photoPath;
      key = key.substring(key.indexOf('les/')+4);
    await promisify(fs.unlink)(path.resolve(__dirname,'..','..','tmp','uploads',key));
    }

    await connection("incidents").where("id", id).delete();
    return res.status(204).send();
  },
};
