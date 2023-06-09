const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true})) 
const moduler = require('./src/routes/default')
const mainPaths = ["/user","/application","/tenant"]
// a nível de rota, o use recebe o caminho e manda para o Route do express
app.get(mainPaths, moduler)
app.post(mainPaths, moduler)
app.put(mainPaths, moduler)
app.delete(mainPaths, moduler)
app.patch(mainPaths, moduler)
console.log(process.env.ENV)
//connect prisma
// infra bind and listener
app.listen(3000)
app.bind("0.0.0.0")