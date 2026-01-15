import { Session } from "@supabase/supabase-js";
import React, { createContext, useEffect, useState } from "react";
import supabase from "../api/supabaseClient";

type SessionState = Session | null | undefined;
type AuthIntent = "normal" | "password-reset";

interface AuthContextProps {
  session: SessionState;
  authIntent: AuthIntent;
  setAuthIntent?: (value: AuthIntent) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  session: undefined,
  authIntent: "normal",
});

export default function AuthProvider({ children }: React.PropsWithChildren) {
  const [session, setSession] = useState<SessionState>();
  const [authIntent, setAuthIntent] = useState<AuthIntent>("normal");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, authIntent, setAuthIntent }}>
      {children}
    </AuthContext.Provider>
  );
}
