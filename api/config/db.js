import {MongoClient} from 'mongodb'
import {config} from 'dotenv'
config()//Carrega as variáveis do .env

const {MONGODB_URI, MONGODB_DB} = process.env

let client
async function connectToDatabase(){
    if(!client){
        client = new MongoClient(MONGODB_URI)
        await client.connect()
        console.log('🌿Conectado ao MongoDB')
    }
    return client
}
export {connectToDatabase, MONGODB_DB}