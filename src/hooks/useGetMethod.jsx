import { serverRequest } from "../api/serverRequest";
import { useState, useEffect } from "react";

export default function useGetMethod(url, authToken = null) {
  const [state, setState] = useState({});

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
    })();
    return () => abortController.abort();
  }, [url]);

  return [state, setState];
}
