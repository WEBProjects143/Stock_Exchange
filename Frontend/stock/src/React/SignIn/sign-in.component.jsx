import React,{useEffect}from 'react';
import {getRedirectResult} from "firebase/auth";
import {
  auth,
  signInWithGoogleRedirect,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../Utils/Firebase';

const SignIn = () => {
  useEffect(() => {
    const fetchRedirectResult = async () => {
      const response = await getRedirectResult(auth);
      console.log("Redirect response:", response);
      
      // if (response) {
      //   const userDocRef=await createUserDocumentFromAuth(response.user);
      // }
    };
  
    fetchRedirectResult();
  }, []);
  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      console.log(user)
      const userDocRef=await createUserDocumentFromAuth(user);
      console.log('Signed in user:', user);
    } catch (error) {
      console.error('Google sign-in failed:', error);
      alert('Google Sign-in failed. Please try again.');
    }
  };


  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <button onClick={signInWithGoogleRedirect}>Sign in with Google redirect</button>
    </div>
  );
};

export default SignIn;