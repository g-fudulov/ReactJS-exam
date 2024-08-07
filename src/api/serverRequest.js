export default async function serverRequest(
  url,
  method = "GET",
  data = null,
  signal = null,
  authToken = null,
  admin = false
) {
  let options = {
    method: method.toUpperCase(),
    headers: {
      "Content-Type": "application/json",
      ["X-Authorization"]: authToken,
    },
    body: JSON.stringify(data),
    signal,
  };

  if (method.toUpperCase() === "GET") {
    delete options.body;
  }

  if (!signal) {
    delete options.signal;
  }

  if (!authToken) {
    delete options.headers["X-Authorization"];
  } else if (authToken && admin) {
    delete options.headers["X-Authorization"];
    options.headers["X-Admin"] = authToken;
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    if (response.status == 403) {
      alert("No Authorization!");
    } else {
      alert("Server Error!");
      return response;
    }
  } else if (response.status == 204) {
    // 204 is empty response (successful logout)
    return response;
  }

  const result = await response.json();
  return result;
}
