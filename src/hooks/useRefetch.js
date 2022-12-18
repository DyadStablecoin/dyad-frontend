import { useState } from "react";

export default function useRefetch() {
  const [trigger, setTrigger] = useState(0);
  const refetch = () => setTrigger((trigger) => trigger + 1);

  return { refetch, trigger };
}
