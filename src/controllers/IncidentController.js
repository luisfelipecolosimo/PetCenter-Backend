const connection = require("../database/connection");

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

    return res.json(incidents);
  },

  async create(req, res) {
    const { title, description, location } = req.body;
    const {path = "" } = req.file;
    const user_id = req.headers.authorization;
    const verification = req.headers.verification;
    const [count] = await connection('user').where('id',user_id).where('verification',verification).count();
    if(count!=1){
      return res.json({ msg: 'acesso negado' });
    }
    const [id] = await connection("incidents").insert({
      title,
      description,
      location,
      photoPath: path,
      user_id,
    });
//{	"title":"Titulo foto1",	"description":"Corpo test 4",	"location":"sao joao"}

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
      .select("user_id")
      .first();

    if (incident.user_id != user_id) {
      return res.status(401).json({ error: "Operation not permitted." });
    }
    await connection("incidents").where("id", id).delete();
    return res.status(204).send();
  },
};
