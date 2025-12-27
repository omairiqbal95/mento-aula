"use client";

import useGSAPAnimations from "@/hooks/useGSAPAnimations"
import type { ReactNode } from "react";

type AnimationProviderProps = { children: ReactNode };

const AnimationProvider = ({ children }: AnimationProviderProps) => {
  useGSAPAnimations();
  return <>{children}</>;
};

export default AnimationProvider;