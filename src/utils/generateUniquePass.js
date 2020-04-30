const bcrypt = require ('bcrypt');

module.exports = {

   generateUniquePass(pass){
    var salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(pass, salt)
  },

  verification(pass, passdb){
    if (!bcrypt.compareSync(pass, passdb)) {
      return 1;
    }else{return 0;}
  }

};