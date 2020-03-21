
const yargs=require('yargs')

const notes=require('./notes.js')


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
       
        notes.removeNotes(argv.roll)
    }
}) 

//create list
yargs.command({
    command:'list',
    describe:'listing data',
    handler(){
        
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
       
        notes.readNotes(argv.roll)
    }
})
yargs.parse()

