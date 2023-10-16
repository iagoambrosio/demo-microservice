const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true})) 
const moduler = require('./src/routes/default')
const mainPaths = ["/user","/application","/tenant","/status"]
// a nível de rota, o use recebe o caminho e manda para o Route do express

app.all(mainPaths, (req, res, next) => {
 if(req.path==='/status'){res.send(new Date().toJSON())}
 next()
},       (req,res,next)=>{
    
    console.log('Validator')
    next()
}
       , (req,res,next)=>
       {
res.send('Se tudo ocorrer como esperado, aqui vai uma resposta de erro, se não ele segue para o próximo roteador')
    }
)


app.all(mainPaths, moduler)


console.log(process.env.ENV)
//connect prisma
// infra bind and listener
app.listen(3000)
app.bind("0.0.0.0")