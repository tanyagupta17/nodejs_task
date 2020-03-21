const fs=require('fs')
const chalk=require('chalk')



const addNotes=(roll,s1,s2,s3)=>{
    const notes=loadNotes()
    
    const duplicate=notes.find((note)=> note.roll===roll)

    if (!duplicate){
        notes.push({
            roll: roll,
            s1: s1,
            s2:s2,
            s3:s3,
          
        })
       

        saveNotes(notes)
        console.log(chalk.green.inverse('new note added'))

    }else{
        console.log(chalk.red.inverse('roll taken'))
    }
    
}


const removeNotes=(roll)=>{
    const notes=loadNotes()
    
    const notesToKeep=notes.filter((note)=> note.roll!==roll)
    if (notes.length>notesToKeep.length){
        console.log(chalk.green.inverse('note removed'))
        saveNotes(notesToKeep)

    }else{
        console.log(chalk.red.inverse('note not found'))
    }
    

}

const listNotes=()=>{
    const notes=loadNotes()
    console.log(chalk.inverse('your list'))
    notes.forEach((note)=>{
        console.log('roll number ' + note.roll)
        console.log('marks in subject1 '+ note.s1)
        console.log( 'marks in subject2 '+ note.s2)
        console.log( 'marks in subject3 '+ note.s3)
        

    })

}

const readNotes=(roll)=>{
    const notes=loadNotes()
    const note=notes.find((note)=> note.roll===roll)

    if(note){
        console.log(chalk.inverse(note.roll))
        console.log('marks in subject1 '+note.s1)
        console.log('marks in subject2 '+note.s2)
        console.log('marks in subject3 '+note.s3)

    }else{
        console.log(chalk.red.inverse('note not found'))
    

    }

}



const saveNotes=(notes)=>{
    const dataJSON=JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
   
}
const loadNotes=()=>{
    try{
        const dataBuffer=fs.readFileSync('notes.json')
    const dataJSON=dataBuffer.toString()
    return JSON.parse(dataJSON)

    }catch(e){
        return [] 

    }
    
}

module.exports={
   
     addNotes: addNotes,
     removeNotes:removeNotes,
     listNotes:listNotes,
     readNotes:readNotes
}