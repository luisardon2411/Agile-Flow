import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { auth, provider } from "../../utils/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged, User, signInWithRedirect } from "firebase/auth";


interface AuthContextType {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<{ error?: string; }>;
  signOut: () => Promise<void>;
  isAuhenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [ isAuhenticated, setIsAuthenticated ] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { error: undefined };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      let errorMessage = "Ha ocurrido un error inesperado.";
      if (error.code === 'auth/invalid-credential') {
        errorMessage = "correo electrónico o contraseña inválidos.";
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "Contraseña incorrecta.";
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = "No se encontró una cuenta con ese correo electrónico.";
      }
      else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Demasiados intentos de inicio de sesión fallidos. Intente de nuevo más tarde.";
      }
      return { error: errorMessage };
    }
  };

  const signOut = async () => {
    await auth.signOut();
    setUser(null);
  };

  const value = { user, signInWithGoogle, signInWithEmail, signOut, isAuhenticated };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
