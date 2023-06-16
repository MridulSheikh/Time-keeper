"use client";
import { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import firebaseInitialize from "@/firebase/firebase.init";
import axios from "axios";

// inilialize firebase app
firebaseInitialize();

const useFirebase = () => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>();
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const auth = getAuth();
  const google_provider = new GoogleAuthProvider();
  // handle google login
  const LoginWithGoogle = () => {
    setAuthLoading(true);
    signInWithPopup(auth, google_provider)
      .then((result) => {
        save_user(result.user.displayName, result.user.email);
      })
      .catch((error) => console.log(error))
      .finally(() => setAuthLoading(false));
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
       getuser(user.email)
      }
    });
  }, []);

  //sign out user
  const sign_out = () => {
    setAuthLoading(true)
    signOut(auth).then(() => {
      setUser(null);
     }).catch((error) => {
       setError(error)
     })
     .finally(() => setAuthLoading(false))
  }

  // save user
  const save_user = async (name: string | null, email: string | null) => {
    const data = {
      name: name,
      email: email,
    };
    const postdata = await axios.post(
      "https://free-time-server.onrender.com/api/v1/user",
      data
    );
    if (postdata.data.message === "successfully create user") {
      setUser(postdata.data.body);
    } else if (postdata.data.message === "user successfully found") {
      setUser(postdata.data.body);
    }
  };

  // get user
  const getuser = async (email : any) =>{
    setAuthLoading(true)
    axios.get(`https://free-time-server.onrender.com/api/v1/user/${email}`)
    .then(res => setUser(res.data.body))
    .finally(()=>setAuthLoading(false))
  }

  return {
    LoginWithGoogle,
    authLoading,
    user,
    sign_out
  };
};
export default useFirebase;
