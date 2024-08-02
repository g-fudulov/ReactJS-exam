import serverRequest from "../api/serverRequest";
import { useState, useEffect } from "react";

export default function useGetMethod(initialData = {}, url, authToken = null) {
  const [state, setState] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      const result = await serverRequest(
        url,
        "GET",
        null,
        abortController.signal,
        authToken
      );
      setState(result);
      setIsLoading(false);
    })();
    return () => abortController.abort();
  }, [url]);

  return [state, setState, isLoading];
}
