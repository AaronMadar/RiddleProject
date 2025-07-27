import { MongoClient, ObjectId } from "mongodb";
import dotenv from 'dotenv'

dotenv.config()

export async function addRiddle(collection, riddle) {

    let result = await collection.insertOne(riddle)
    console.log(`Riddle added successfuly , its ID : ${result.insertedId}`);
    return result

}

export async function getAllRiddle(collection, filter) {
    let result = await collection.find(filter).toArray()
    console.log(`Found ${result.length} riddles :`, result);
    return result

}

export async function updateRiddle(collection, id, updateObj) {

    try {

        let result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateObj }
        )
        if (result.matchedCount === 0) {
            console.log(`No match`);
            return null

        }
        console.log(`Riddle successfuly updated`);
        return result

    }
    catch (e) {
        console.log(`Error try again after ${e}`);

    }





}

export async function deleteRiddle(collection, id) {
    try {
        let result = await collection.deleteOne({ _id: new ObjectId(id) })
        if (result.deletedCount === 0) {
            console.log(`No match with this ID`);
            return false

        }
        console.log(`Riddle succcessfuly deleted `);
        return result

    } catch (e) {
        console.log(`Error db `);

    }

}

