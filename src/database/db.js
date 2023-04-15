import {db} from "../util/firebase"
import {addDoc, collection, getDocs, where, query, updateDoc, doc} from "@firebase/firestore"

const WaldoDB = () => {

    const createTable = async(tableName, columns) => {
        try {
            const newCollection = collection(db, tableName);
            const newDoc = await addDoc(newCollection, columns);
            console.log(`New table "${tableName}" created with ID: ${newDoc.id}`);
            return newDoc.id
        } catch (error) {
            console.log(error);
        }
    }

    const getCollection = async(docName, params=null) => {
        try {
            // define the table to be queried
            const colRef = collection(db, docName);
            
            let snapshot;

            if (params) {
                const { field, operator, value } = params;
                // query with parameters
                const q = query(colRef, where(field, operator, value))            
                // wait for results (q is saying to grab the results that match the query)
                snapshot = await getDocs(q)
            } else {
                // col ref is saying to grab ALL the results of the table
                snapshot = await getDocs(colRef);
            }
            // if only one result is returned its returned as itself instead of in a list
            const result = snapshot.docs?.length 
                ? (snapshot.docs.length > 1 
                    ? snapshot.docs.map((doc) => doc.data()) 
                    : snapshot.docs[0]?.data())
                : null;
            console.log(result, "db.js");
            return result
        } catch (error) {
            return error 
        }
    }


    const addDocument = async(docName, params) => {
        try {
            const col = collection(db, docName)
            const {name, uid, time} = params;
            await addDoc(col, {
                name: name, 
                uid: uid,
                time: time,
            })  
        } catch (error) {
            return error
        }
    }

    // const addDocument = async(docName, name, uid, time) => {
    //     try {
    //         const col = collection(db, docName)
    //         await addDoc(col, {
    //             name: name, 
    //             uid: uid,
    //             time: time,
    //         })  
    //     } catch (error) {
    //         return error
    //     }
    // }

    const updateDocument = async(docName, docId, time) => {
        try {
            const col = collection(db, docName)
            await updateDoc(doc(col, docId), {
                time: time 
            })

            console.log("yes")
        } catch (error) {
            return error
        }
    }

    return {getCollection, createTable, addDocument, addDocument, updateDocument}
}

export default WaldoDB