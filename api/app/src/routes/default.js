const roteador = require('express').Router()
const modify = require('../service/usecases')
const subpaths = require('../service/restRoutes.js')


//curl -X POST http://localhost:3000/user -H "Content-Type: application/json"  -d '{"name": "linuxize1", "email": "linuxize4@example.c2m", "cel":"11-3232213","tenantName" : "default" }' 
roteador.all(subpaths[0].all, async (req, res) => {
  try {
    const result = await modify.interacao(req.method, req.body, req.query, req.path.split('/')[1]);
    if (result && typeof result === 'object' && 'status' in result && 'data' in result) {
      return res.status(result.status).json(result.data);
    } else {
      return res.json(result);
    }
  } catch (err) {
    console.error('Erro na rota:', err);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});
/*
roteador.delete(subpaths,async (req,res)=>{
    
    return res.send(modify.deleteDatabase())
})
*/
module.exports = roteador