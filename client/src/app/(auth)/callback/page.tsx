"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CognitoCallback() {
  const params = useSearchParams();
