// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, addDoc, getFirestore, getDocs, query, where, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBTAgy7sYCa2WarWyzZTlKsdSz0Mxb1P9g",
    authDomain: "papevents-f79e0.firebaseapp.com",
    projectId: "papevents-f79e0",
    storageBucket: "papevents-f79e0.appspot.com",
    messagingSenderId: "693269795963",
    appId: "1:693269795963:web:ee703dd6ac9be500663ede",
    measurementId: "G-1QZEK98MFS"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);

async function addData(event, collectionName) {
    try {
        const docRef = await addDoc(collection(db, collectionName), event);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

async function updateData(doc_id, document) {
    await updateDoc(doc(db, "events", doc_id), document);
}

async function getAllDataFromCollection(collectionName) {
    const q = query(collection(db, collectionName), orderBy("date", "asc"))
    const querySnapshot = await getDocs(q);
    return querySnapshot;
}

async function deleteDocument(document_id) {
    await deleteDoc(doc(db, "events", document_id));
}

// export default addData;
export { addData, getAllDataFromCollection, auth, updateData, deleteDocument };