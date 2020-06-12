import nodeFetch from "node-fetch";

export default async function fetchAsync(
  url,
  method = "GET",
  body = undefined,
  headers = {
    "Content-Type": "application/json",
  }
) {
  const fetchingData = await nodeFetch(url, {
    method,
    body: JSON.stringify(body),
    headers,
  });
  const data = await fetchingData.json();
  return data;
}
