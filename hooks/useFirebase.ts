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
  const [token, setToken] = useState<string>();
  const [error, setError] = useState<string | null>();
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const auth = getAuth();
  const google_provider = new GoogleAuthProvider();
  // handle google login
  const LoginWithGoogle = () => {
    signInWithPopup(auth, google_provider)
      .then((result) => {
        result.user.getIdToken().then((tokenId) => {
          if (tokenId) {
            save_user(result.user.email, tokenId);
          }
        });
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken()
        .then((tokenId) => {
          if (tokenId) {
            save_user(user.email, tokenId);
          }
        });
      }
    });
  }, []);

  //sign out user
  const sign_out = () => {
    setAuthLoading(true);
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setAuthLoading(false));
  };

  // save user
  const save_user = async (email: string | null, token = "") => {
    const data = {
      email: email,
    };
    try {
      setAuthLoading(true);
      const postdata = await axios.post(
        "http://localhost:5000/api/v1/user",data,
        {
          headers : {
            'Content-Type': 'application/json',
            'Authorization': "Bearer" +" " + token,
          }
        }
      );
      if (postdata.data.message === "successfully create user") {
        setUser(postdata.data.body._doc);
        setToken(postdata.data.body.token);
        setAuthLoading(false);
      } else if (postdata.data.message === "user successfully found") {
        setUser(postdata.data.body._doc);
        setToken(postdata.data.body.token);
        setAuthLoading(false);
      }
    } catch (error) {
      console.log(error);
      setAuthLoading(false);
    }
  };

  //email password auth
  const Signup_password = (email: string, name: null, password: string) => {
    setAuthLoading(true);
    setError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        result.user.getIdToken().then((tokenId) => {
          if (tokenId) {
            save_user(result.user.email, tokenId);
          }
        });
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          setError("Email already used");
        }
      })
      .finally(() => {
        setAuthLoading(false);
      });
  };
  // handle login password
  const loginpassword = (email: string, password: string) => {
    setAuthLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        result.user.getIdToken().then((tokenId) => {
          if (tokenId) {
            save_user(result.user.email, tokenId);
          }
        });
      })
      .catch((error) => {
        if (error.message) {
          setError("please input right details");
        }
      })
      .finally(() => {
        setAuthLoading(false);
      });
  };

  // // get user
  // const getuser = async (email: any) => {
  //   setError(null);
  //   setAuthLoading(true);
  //   axios
  //     .get(`http://localhost:5000/api/v1/user/${email}`)
  //     .then((res) => setUser(res.data.body))
  //     .catch((error) => setError(error.response.data.messgae))
  //     .finally(() => setAuthLoading(false));
  // };

  return {
    LoginWithGoogle,
    authLoading,
    user,
    sign_out,
    Signup_password,
    error,
    loginpassword,
    token,
    setUser,
  };
};
export default useFirebase;
