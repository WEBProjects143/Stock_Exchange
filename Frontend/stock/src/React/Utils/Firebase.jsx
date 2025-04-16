import {initializeApp} from "firebase/app";
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// getFirestore --- toe get databse information
// doc   --- to document details from databsse (like mongodb)
// getDoc -- to get document data 

// setDoc -- to set document data 
const firebaseConfig = {
    apiKey: "AIzaSyBJ2n6hGnUMIsn850rI2VslMuAN_hqzgKo",
    authDomain: "bhupendra-project-db.firebaseapp.com",
    projectId: "bhupendra-project-db",
    storageBucket: "bhupendra-project-db.firebasestorage.app",
    messagingSenderId: "92405581475",
    appId: "1:92405581475:web:3f4f90395cefbfc8722116",
    databaseURL:"https://bhupendra-project-db-default-rtdb.firebaseio.com"
  };
  
  // Initialize Firebase
  //CRUD operation done by this firebaseapp  in firebase database
  export const firebaseapp = initializeApp(firebaseConfig);// intiliazie firebase app
  
  const provider= new GoogleAuthProvider();
  //setCustomParameters take some config and make sure how GoogleAuthProvider behave
  provider.setCustomParameters({
    prompt: 'select_account',
  });
  ;
  
  export const auth = getAuth();
  export const signInWithGooglePopup=()=>signInWithPopup(auth, provider)
  export const signInWithGoogleRedirect=()=>signInWithRedirect(auth, provider)
  
  //To get documentation ref
  export const db=getFirestore(firebaseapp)//get daabase accesss
  export const createUserDocumentFromAuth=async(userAuth)=>{
    const userDocRef=doc(db,"users",userAuth.uid)
    //UserSnapShot checks Databse exixst or not
    const userSnapshot = await getDoc(userDocRef);
    //UserSnapShot doesnt exist it check it create the database
    console.log("userSnapshot exists:", userSnapshot.exists());
    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
  
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
    return userDocRef
  }  

  