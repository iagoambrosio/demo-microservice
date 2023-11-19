let paths = require('./restRoutes')
function gerarToken() {
    let caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%*(){}[]+-?!";
    let token = "";
    for (let i = 0; i < 30; i++) {
      token += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return token;
  }
  
class Validator{
    constructor(){
    this.token = gerarToken()
    if (process.env.ENV==='DEV'){
    console.log(this.token)
}}
    search(path,method,name){
        switch (process.env.ENV) {
            case 'DEV':
              let validatepath = Object.values(paths[0]).find(arr => arr.includes(path));
              let validateuser = this.token === name
              let validatormethod = () =>{
                let methodvalidator = Object.keys(paths[0])[Object.values(paths[0]).indexOf(validatepath)]
                if (methodvalidator === 'all'){
                  return true
                } if (methodvalidator === method){return true}
                    else {return false}
              }
            return [validatepath.length>0,validatormethod(),this.token === name];

            case 'PRD':

              default:
                return [true,true,true]
          }
    }
}

module.exports = Validator