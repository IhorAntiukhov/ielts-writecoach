import React, { createContext, useState } from "react";

type NavigationIntent = "review" | "reactions" | null;

interface EssayFormsContextProps {
  navigationIntent: NavigationIntent;
  setNavigationIntent?: React.Dispatch<React.SetStateAction<NavigationIntent>>;
}

export const EssayNavigationContext = createContext<EssayFormsContextProps>({
  navigationIntent: null,
});

export default function EssayNavigationProvider({
  children,
}: React.PropsWithChildren) {
  const [navigationIntent, setNavigationIntent] =
    useState<NavigationIntent>(null);

  return (
    <EssayNavigationContext.Provider
      value={{ navigationIntent, setNavigationIntent }}
    >
      {children}
    </EssayNavigationContext.Provider>
  );
}
