import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";

export function AuthNavLink() {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) setSignedIn(Boolean(data.session));
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session));
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (signedIn === null) return null;

  return (
    <Link
      to={signedIn ? "/dashboard" : "/auth"}
      className="hidden text-sm font-semibold text-foreground underline-offset-4 hover:underline sm:inline"
    >
      {signedIn ? "Dashboard" : "Sign in"}
    </Link>
  );
}