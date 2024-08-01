export default async function serverRequest(
  url,
  method = "GET",
  data = null,
  signal = null,
  authToken = null
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
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    if (response.status == 403) {
      alert("No Authorization!");
    } else if (response.status == 204) { // 204 is empty response (successful login)
      return true;
    } else {
      alert("Server Error");
    }
    // throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  return result;
}
