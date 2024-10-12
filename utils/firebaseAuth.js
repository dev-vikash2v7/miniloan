import { auth } from '../firebase';
import { createUserWithEmailAndPassword  ,signInWithEmailAndPassword} from 'firebase/auth';

const signUp = async (email, password , navigation) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User signed up: ', userCredential.user);

    navigation.navigate('LoanRequest');

    
 
};


const signIn = async (email, password , navigation) => {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // console.log('User signed in: ', userCredential.user);
    navigation.navigate('LoanRequest');

  
  };
  

  const signOut = async (navigation) => {
    try {
      await auth.signOut();
      console.log('User signed out');
    navigation.navigate('Auth');

    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  export {signIn  , signOut ,signUp}