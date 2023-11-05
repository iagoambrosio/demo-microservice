let database = [{ chave1: 'valor1', chave2: 'valorA', outraChave: 'outroValor1' },
{ chave1: 'valor2', chave2: 'valorB', outraChave: 'outroValor2' },
{ chave1: 'valor1', chave2: 'valorA', outraChave: 'outroValor3' },
{ chaveletti: 'valor1', banana: 'valor2', linguica: 'outroValor8' }]

const modify = {
    interacao(metodo,data,query){
        switch (metodo) {
            case 'GET':
                    if (Object.keys(query).length === 0){
                    return database
                  }
                    else {
                          let arrayFiltrado = database.filter(obj =>
                            Object.entries(query).some(([chave, valor]) => obj[chave] === valor)
                          );
                          
                           console.log(arrayFiltrado);
                           return arrayFiltrado
                    }
            case 'POST':
                    database.push(data)
                    return `${data} Created!`
              
            case 'DELETE':
                    if(Object.keys(query).length === 0){
                    database = []
                    return `database deleted!`  
            }    
                    else{
                    let arrayModificado = database.map(obj => Object.entries(query).some(([chave, valor]) => obj[chave] === valor) ? undefined : obj
              );
            database = arrayModificado 
            return arrayModificado
            } 
            case 'PUT':
                let arrayModificado = array.map(obj =>
                    Object.entries(query).some(([chave, valor]) => obj[chave] === valor) ? data : obj
                  );
                database = arrayModificado 
                return arrayModificado
            default:
                return "Método inválido"
          }
    }
}

module.exports = modify