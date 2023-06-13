'use client'
import {useState, useEffect} from "react"
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import firebaseInitialize from "@/firebase/firebase.init";

// inilialize firebase app
firebaseInitialize();

const useFirebase = () => {
    const [user, setUser] = useState<any>();
    const auth = getAuth();
    const google_provider = new GoogleAuthProvider()
    // handle google login
    const LoginWithGoogle = () => {
          signInWithPopup(auth, google_provider)
          .then((result) => {
            console.log(result?.user)
          })
          .catch(error => console.log(error))
    }
    return{
        LoginWithGoogle
    };
}
export default useFirebase;