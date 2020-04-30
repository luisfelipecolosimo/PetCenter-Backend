const connection = require('../database/connection');
const generateUniquePass = require('../utils/generateUniquePass');

module.exports = {

  async create(req, res) {
      const { email, password } = req.body;

      const user = await connection('user')
          .where('email', email)
          .select('*')
          .first();

      if (!user) {
          return res.status(400).json({ error: 'no user found with this email' })
      }

      var result = generateUniquePass.verification(password,user.password);
        if(result==1){
            return res.status(400).json({ error: 'no user found' })
        }

      var ret = {
        name:user.name,
        id: user.id,
        verification: user.verification

      }

      return res.json(ret);
  },


  async delete(req, res) {
      const { id } = req.params;
      const user_id = req.headers.authorization;

      const incident = await connection('incidents').where('id', id).select('user_id').first();

      if (incident.user_id != user_id) {
          return res.status(401).json({ error: 'Operation not permitted.' });
      }
      await connection('incidents').where('id', id).delete();
      return res.status(204).send();
  },


};