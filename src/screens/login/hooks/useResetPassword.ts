import { AuthContext } from "@/src/context/AuthProvider";
import * as Linking from "expo-linking";
import { use, useEffect } from "react";
import { setSession } from "../api/auth";

export default function useResetPassword() {
  const url = Linking.useLinkingURL();
  const { setAuthIntent } = use(AuthContext);

  useEffect(() => {
    if (!url) return;

    const parsedUrl = Linking.parse(url.replaceAll("#", "?"));

    if (parsedUrl.queryParams) {
      const { access_token, refresh_token } = parsedUrl.queryParams;

      setAuthIntent?.("password-reset");
      setSession(access_token as string, refresh_token as string);
    }
  }, [url, setAuthIntent]);
}
