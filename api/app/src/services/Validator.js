class Validator{
    constructor(path,method,user){
        this.path = path
        this.method = method
        this.user = user
    }

    ifExists(path,method,user){
   return console.log(
    [this.path.find((item) => item === path),this.method.find((item) => item === method),this.user.find((item) => item === user)]
)
    }
    pathMethodUserValidator(path,method,user){

    }

}