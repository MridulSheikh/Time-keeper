"use client";
import { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
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
  }, [user?.email]);

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

    //email password auth
    const Signup_password = (email: string, name: null, password: string) => {
      setAuthLoading(true)
      setError(null)
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          save_user(name, res?.user?.email)
          alert("successfully create account")
        })
        .catch((error) => setError(error.message))
        .finally(() => setAuthLoading(false));
    };
    // handle login password
    const loginpassword = (email: string, password: string) => {
      setAuthLoading(true)
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          getuser(user?.email)
        })
        .catch((error) => setError(error.message))
        .finally(() => {
          setAuthLoading(false)
        });
    };

  // get user
  const getuser = async (email : any) =>{
    setError(null)
    setAuthLoading(true)
    axios.get(`https://free-time-server.onrender.com/api/v1/user/${email}`)
    .then(res => setUser(res.data.body))
    .catch(error => {})
    .finally(()=>setAuthLoading(false))
  }

  return {
    LoginWithGoogle,
    authLoading,
    user,
    sign_out, 
    Signup_password, 
    error,
    loginpassword
  };
};
export default useFirebase;
