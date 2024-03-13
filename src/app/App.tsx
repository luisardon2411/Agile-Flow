import { useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import Home from "../pages/private/home/Home";
import LoginContainer from "../containers/Login/LoginContainer";


const App = () => {

  const [ user, setUser ] = useState<User | null>(null)
  const auth = getAuth();
  // valid if user logged
  onAuthStateChanged( auth, setUser )

  return user ? <Home /> : <LoginContainer />
  
}

export default App