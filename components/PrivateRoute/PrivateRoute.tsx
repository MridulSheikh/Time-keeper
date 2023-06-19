'use client'
import useAuth from "@/hooks/useAuth";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LoadingModal } from "../LoadingModal";

export const PrivateRoute = ({ children }: any) => {
  const { user, authLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
      if (authLoading) return
      if (!user?.email) {
      router.replace(`/login?from=${pathname}`)
    }
  }, [user]);
  if(authLoading) return <div className="h-screen w-full" />
  return <div>{children}</div>
};
