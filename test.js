const fs=require('fs')
const chalk=require('chalk')

// const getnotes= ()=>{
//     return 'your notes'
// }

const addNotes=(roll,s1,s2,s3)=>{
    const notes=loadNotes()
    // const duplicates=notes.filter(function(note){
    //     return note.roll===roll
    // })
    // const duplicates=notes.filter((note)=> note.roll===roll)
    const duplicate=notes.find((note)=> note.roll===roll)

    if (!duplicate){
        notes.push({
            roll: roll,
            s1: s1,
            s2:s2,
            s3:s3,
          
        })
        // const total=function(){
        //     return this.s1+this.s2+this.s3
        // }


        saveNotes(notes)
        console.log(chalk.green.inverse('new note added'))

    }else{
        console.log(chalk.red.inverse('roll taken'))
    }
    
}


const removeNotes=(roll)=>{
    const notes=loadNotes()
    // const notesToKeep=notes.filter(function(note){
    //     return note.roll!==roll

    // })
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
// module.exports=getnotes
module.exports={
    //  getnotes: getnotes,
     addNotes: addNotes,
     removeNotes:removeNotes,
     listNotes:listNotes,
     readNotes:readNotes
}


//app
// const fs = require('fs')
// fs.writeFileSync('notes.txt','this file')
// fs.appendFileSync('notes.txt','just appending')
// const add=require('./utilis.js')
// // const name = 'tanya'
// const sum=add(4,5)
// // console.log(sum)
// const chalk=require('chalk')
const yargs=require('yargs')
// const validator=require('validator')
 const notes=require('./notes.js')
// const msg=dis()
// console.log(dis())
// console.log(validator.isEmail('tany@gmail.com'))
// console.log(chalk.red.inverse.bold('success'))
// const command=process.argv[2]
// if(command==='add'){
//     console.log('adding notes')
// }else if(command==='remove'){
//     console.log('removing notes')
// }
// console.log(yargs.argv)



//create add command
yargs.command({
    command:'add',
    describe:'add new data',
    builder:{
        roll:{
            describe:'note roll',
            demandOption:true,
            type:'string'

        },
        s1:{
            describe:'note s1',
            demandOption:true,
            type:'string'


        },
        s2:{
            describe:'note s2',
            demandOption:true,
            type:'string'


        },
        s3:{
            describe:'note s3',
            demandOption:true,
            type:'string'


        }

    },
    handler(argv){
        // console.log('roll:'+ argv.roll)
        // console.log('s1'+argv.s1)
        notes.addNotes(argv.roll,argv.s1,argv.s2,argv.s3)
    }
})

//create remove command
yargs.command({
    command:'remove',
    describe:'removing data',
    builder:{
        roll:{
            describe:'note roll',
            demandOption:true,
            type:'string'

        }
    },
    handler(argv){
        // console.log('removed data')
        notes.removeNotes(argv.roll)
    }
}) 

//create list
yargs.command({
    command:'list',
    describe:'listing data',
    handler(){
        // console.log('list data')
        notes.listNotes()
    }
})

//create read
yargs.command({
    command:'read',
    describe:'reading data',
    builder:{
        roll:{
            describe:'note roll',
            demandOption:true,
            type:'string'

        }
    },
    handler(argv){
        // console.log('read data')
        notes.readNotes(argv.roll)
    }
})
yargs.parse()
// console.log(yargs.argv)
