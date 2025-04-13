import React from 'react';
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../Utils/Firebase';

const SignIn = () => {
  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      console.log(user)
      await createUserDocumentFromAuth(user);
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
    </div>
  );
};

export default SignIn;