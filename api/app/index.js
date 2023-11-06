const express = require('express')
const app = express()
const mainPaths = require('./src/service/restRoutes.js')
const Validator = require('./src/service/Validator')
app.use(express.json())
app.use(express.urlencoded({extended:true})) 
const moduler = require('./src/routes/default')
// a nível de rota, o use recebe o caminho e manda para o Route do express
app.get('/', (req, res) => {res.send('API')})
// a nível de rota, o use recebe o caminho e manda para o Route do express
let validator = new Validator()
app.all(mainPaths[0].all, (req, res, next) => {
//url de status
 if(req.path==='/status'){let status = new Date().toJSON();console.log(status)
   return res.send(status)
}
 next()
},(req,res,next)=>{
//autenticação e validação
    console.log("path: "+req.path,"method: "+req.method,"query: "+req.query.name)
    const validar = validator.search(req.path,req.method,req.query.name)
    //validar.filter((item===true)=>{return item})
    next()}, 
//chama o controller
moduler
)
console.log(process.env.ENV)
//connect prisma
// infra bind and listener
app.listen(3000)
app.bind("0.0.0.0")