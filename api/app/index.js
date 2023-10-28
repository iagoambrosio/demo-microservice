const express = require('express')
const Validator = require('./src/services/Validator')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true})) 
const moduler = require('./src/routes/default')
const mainPaths = ["/user","/application","/tenant","/status"]
// a nível de rota, o use recebe o caminho e manda para o Route do express
let validator = new Validator()
app.all(mainPaths, (req, res, next) => {
//url de status
 if(req.path==='/status'){res.send(new Date().toJSON())}
 next()
},(req,res,next)=>{
//autenticação e validação
    validator.search(req.path,req.method,req.query.name)
    console.log("meio")
    next()}, 
//chama o controller
moduler
)
console.log(process.env.ENV)
//connect prisma
// infra bind and listener
app.listen(3000)
app.bind("0.0.0.0")
module.exports = app;