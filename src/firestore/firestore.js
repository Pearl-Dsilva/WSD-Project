// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, addDoc, getFirestore } from "firebase/firestore";
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


async function addData(event) {
    try {
        const docRef = await addDoc(collection(db, "users"), event);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
// export default addData;
export { addData };