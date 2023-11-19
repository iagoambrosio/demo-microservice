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
console.log(process.env.ENV)

let validator = new Validator()
app.all(mainPaths[0].all, (req, res, next) => {
//url de status
 if(req.path==='/status'){let status = new Date().toJSON();console.log(status)
   return res.send(status)
}
 next()
},(req,res,next)=>{
//autenticação e validação
    console.log("path: "+req.path,"method: "+req.method,"header: "+req.rawHeaders,"query: "+req.query)
    const validar = validator.search(req.path,req.method,req.header("Authorization"))
    switch (validar.filter(item => item === true).length){
    case 3 :
      return next()
    default:
      res.status(401).send("User or password incorrect")
}

    }, 
//chama o controller
moduler
)


app.listen(3000)
app.bind("0.0.0.0")