const connection = require('../database/connection');

module.exports = {

    async index(req, res) {
        const user_id = req.headers.authorization;
        const incidents = await connection('incidents').where('user_id', user_id).select('*');
        res.header("X-count", incidents.length);
        return res.json(incidents);
    },

};