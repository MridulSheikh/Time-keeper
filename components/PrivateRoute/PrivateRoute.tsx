'use client'
import useAuth from "@/hooks/useAuth";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export const PrivateRoute = ({ children }: any) => {
  const { user, authLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
      if (!user?.email || authLoading) {
      router.replace(`/login?from=${pathname}`)
    }
  }, [user]);
  return <div>{children}</div>
};
