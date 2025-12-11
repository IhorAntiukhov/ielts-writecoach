import { Session } from "@supabase/supabase-js";
import React, { createContext, useEffect, useState } from "react";
import supabase from "../api/supabase";

type SessionState = Session | null | undefined;

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<SessionState>(undefined);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<SessionState>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
  );
}
