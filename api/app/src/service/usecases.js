let database = [{'user':[{ chave1: 'valor1', chave2: 'valorA', outraChave: 'outroValor1' },
{ chave1: 'valor2', chave2: 'valorB', outraChave: 'outroValor2' },
{ chave1: 'valor1', chave2: 'valorA', outraChave: 'outroValor3' },
{ chaveletti: 'valor1', banana: 'valor2', linguica: 'outroValor8' }],'produto':[]}]

const modify = {
    interacao(metodo,data,query,path){
        switch (metodo) {
            case 'GET':
              if (database[0][path]===undefined){
                return 'No resource Found\n'
              }
              if (Object.keys(query).length === 0){
                return database[0][path]
              }
              else {
                let arrayFiltrado = database[0][path].filter(obj =>
                Object.entries(query).some(([chave, valor]) => obj[chave] === valor)
              );
                return arrayFiltrado
              }
            case 'POST':
              if(database[0][path]===undefined){
                database[0][path]=[]
                console.log("O recurso "+path+" foi Criado!")
              }
                    database[0][path].push(...data)
                    return JSON.stringify(data) + " - Created"
                    //return data.map(item => item.nome);
            case 'DELETE':
                    if(Object.keys(query).length === 0){
                    database[0][path] = []
                    return `database deleted!`  
            }    
                    else{
                    let arrayModificado = database[0][path].map(obj => Object.entries(query).some(([chave, valor]) => obj[chave] === valor) ? undefined : obj
              );
            database[0][path] = arrayModificado 
            return arrayModificado
            } 
            case 'PUT':
              let arrayModificado = database[0][path].map(obj =>
                Object.entries(query).some(([chave, valor]) => obj[chave] === valor) ? {...obj, ...data} : obj
            );
            database[0][path] = arrayModificado;
            return arrayModificado;
            case 'PATCH':
              let array = database[0][path].map(obj =>
                Object.entries(query).some(([chave, valor]) => obj[chave] === valor) ? {...obj, ...Object.keys(data).reduce((o, k) => (k in obj ? {...o, [k]: data[k]} : o), {})} : obj
            );
            database[0][path] = array;
            return array;
              default:
                return "Método inválido"
          }
    }
}

module.exports = modify