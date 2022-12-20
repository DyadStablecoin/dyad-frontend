import { useEffect, useState } from "react";
import { SAFETY_MODE_THRESHOLD } from "../consts/consts";

export default function useSafetyModeActivated(cr) {
  const [isSafetyModeActivated, setIsSafetyModeActivated] = useState(false);

  useEffect(() => {
    cr && setIsSafetyModeActivated(cr < SAFETY_MODE_THRESHOLD);
  }, [cr]);

  return { isSafetyModeActivated };
}
