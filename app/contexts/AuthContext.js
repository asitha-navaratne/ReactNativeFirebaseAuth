import { createContext, useContext, useReducer } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth/react-native";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { auth, db } from "../auth/config";
import reducer, { initialState } from "../store/reducer";

const AuthContext = createContext(initialState);

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setAuthListener = function () {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const authData = { ...docSnap.data() };

            user.getIdToken().then((idToken) => {
              authData.idToken = idToken;
            });

            dispatch({ type: "SIGN_IN", payload: { ...authData } });
          } else {
            throw new Error(`Error when fetching data for user ID ${user.uid}`);
          }
        } else {
          dispatch({ type: "SIGN_OUT" });
        }
      } catch (err) {
        alert(err.message);
      } finally {
        if (state.isLoading) {
          dispatch({ type: "LOADING_COMPLETE" });
        }
      }
    });

    return unsubscribe;
  };

  const handleSignIn = async function (email, password) {
    dispatch({ type: "LOADING_DATA" });

    return signInWithEmailAndPassword(auth, email, password).finally(() => {
      dispatch({ type: "LOADING_COMPLETE" });
    });
  };

  const handleSignUp = async function (user) {
    dispatch({ type: "LOADING_DATA" });

    return createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredentials) => {
        const newUser = userCredentials.user;

        return setDoc(doc(db, "users", newUser.uid), {
          uid: newUser.uid,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          createdAt: new Date(Date.now()).toLocaleString(),
        });
      })
      .finally(() => {
        dispatch({ type: "LOADING_COMPLETE" });
      });
  };

  const handleSignOut = async function () {
    dispatch({ type: "LOADING_DATA" });

    return signOut(auth).finally(() => {
      dispatch({ type: "LOADING_COMPLETE" });
    });
  };

  const context = {
    ...state,
    setAuthListener,
    handleSignIn,
    handleSignUp,
    handleSignOut,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth hook can only be used within AuthContext");
  }

  return context;
};

export default AuthProvider;
