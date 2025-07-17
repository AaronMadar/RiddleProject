import { Collection, MongoClient, ObjectId } from "mongodb";
import dotenv from 'dotenv'

dotenv.config()

const client = new MongoClient(process.env.URI)
const dbname = process.env.dbname
const collecname = process.env.collecname

let db;
let collection;

export async function initializeDb(){
    try{
        await client.connect()
         db = client.db(dbname)
         collection = db.collection(collecname)
    }
    catch(e){
        console.log(`Error happened during the Database Connection :${e} `)
        
    }

}


export async function addRiddle(collection,riddle){
    
   let result = await collection.insertOne(riddle)
    console.log(`Riddle added successfuly , its ID : ${result.insertedId}`);
    return result
    
}


export async function getAllRiddle(collection,filter){
    let result = await collection.find(filter).toArray()
    console.log(`Found ${riddles.length} riddles :`,result);
    return result
    
}


export async function updateRiddle(collection,id,updateObj){

    try{

        let result = await collection.updateOne(
            {_id : new ObjectId(id)},
            {$set : updateObj}
        )
        if (result.matchedCount === 0 ){
            console.log(`No match`);
            return null
            
        }
        console.log(`Riddle successfuly updated`);
        return result
        
    }
    catch(e){
        console.log(`Error try again after ${e}`);   
        
    }


    
    

}


export async function deleteRiddle(collection,id){
    try{

        let result = await collection.deleteOne({_id: new ObjectId(id)})

        if (result.deletedCount === 0 ){
            console.log(`No match with this ID`);
            return false
            
        }
        console.log(`Riddle succcessfuly deleted `);
        return true

        

    }
    catch(e){
        console.log(`Error try later`);
        
    }

}

