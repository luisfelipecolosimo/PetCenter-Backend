const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');
const generateUniquePass = require('../utils/generateUniquePass');


module.exports = {

  async index(req, res) {
      const user = await connection('user').select('*');

      return res.json(user);
  },




  async create(req, res) {
      const { name, password, email, whatsapp } = req.body;

      const user = await connection('user').where('email',email).select('email');
      if(user.length!=0){
        return res.json({error:'Email Ja existe'})
      }
      const verification = generateUniqueId();
      const pass = generateUniquePass.generateUniquePass(password);

      await connection('user').insert({
          name,
          password: pass,
          email,
          whatsapp,
          verification,
      })

      const userId = await connection('user').where('email',email).select('id','verification').first();

      return res.json({ id: userId['id'], verification: userId['verification'] });
  }
};