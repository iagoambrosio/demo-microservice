const fs = require('node:fs')

class localDatabase {
    constructor(database){
        this.database = database
        this.check(this.database)
        this.count = 0
    }
    check(database){
      if(process.env.ENV === 'prod'){
        return 
      } else {
        if (fs.existsSync(database)) {
            console.log(`a database ${database} Já existe !`)
          } else {
            fs.writeFileSync(database,JSON.stringify([]))
            this.count++
            return console.log(`a database ${database} Foi criada !, modo mockup ativo`)
          }
      }
    }
    write(database,data){
    const temp =  fs.readFileSync(database)
    const fileOpen = JSON.parse(temp)
    fileOpen.push(data)
    fs.writeFileSync(database, JSON.stringify(fileOpen))
    return fileOpen
    }
    find (database,key,value){
      const temp =  fs.readFileSync(database)
      const fileOpen = JSON.parse(temp)
      if ( !key || !value ){
      return fileOpen
    }
      else {
      const result = fileOpen.filter((item)=> item[key] === value)
      return result
      }
    }
    delete (database){
      fs.writeFileSync(database,JSON.stringify([]))
      console.log(`a database ${database} foi excluida`)
    }
    modify (database,key,value,newWord){
      console.log(database,key,value,newWord)
      const temp =  fs.readFileSync(database)
      const fileOpen = JSON.parse(temp)
      const newValue = fileOpen.map((item) => { if (item[key] === value) { return { ...item, [key]: newWord }; } return item; });
      fs.writeFileSync(database, JSON.stringify(newValue))
  }   
}


module.exports = localDatabase
//exemple: 
//const storage = new localDatabase('./data')

//const data = {'name' : 'iago', 'idade' :'2'}

//storage.write('./data',data)