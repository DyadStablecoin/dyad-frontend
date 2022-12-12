import { useEffect, useState } from "react";
import { SAFETY_MODE_THRESHOLD } from "../consts/consts";
import useCR from "./useCR";

export default function useSafetyModeActivated() {
  const [isSafetyModeActivated, setIsSafetyModeActivated] = useState(false);
  const { cr } = useCR();

  useEffect(() => {
    cr && setIsSafetyModeActivated(cr > SAFETY_MODE_THRESHOLD);
  }, [cr]);

  return { isSafetyModeActivated };
}
