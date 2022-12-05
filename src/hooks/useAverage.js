import { useEffect, useState } from "react";

export default function useAverage(values) {
  const [average, setAverage] = useState(1);

  useEffect(() => {
    if (values) {
      setAverage(values.reduce((a, b) => a + b, 0) / values.length);
    }
  }, [values]);

  return { average };
}
