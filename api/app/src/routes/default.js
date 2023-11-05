const roteador = require('express').Router()
const modify = require('../service/usecases')

const subpaths = ["/user","status"]
//curl -X POST http://localhost:3000/user -H "Content-Type: application/json"  -d '{"name": "linuxize1", "email": "linuxize4@example.c2m", "cel":"11-3232213","tenantName" : "default" }' 
roteador.all(subpaths,async (req,res)=>{
    console.log(req.query)
return res.send(modify.interacao(req.method,req.body,req.query))
})

/*roteador.post(subpaths,async (req,res)=>{
    modify.postDatabase(req.body)
    return res.send(modify.getDatabase())
})

roteador.delete(subpaths,async (req,res)=>{
    
    return res.send(modify.deleteDatabase())
})
*/
module.exports = roteador