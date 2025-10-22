const API_BASE_URL = "http://localhost:5000/api";

export async function getData(endpoint) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!res.ok) throw new Error(`GET ${endpoint} failed`);
  return res.json();
}

export async function postData(endpoint, data) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`POST ${endpoint} failed`);
  return res.json();
}

export async function patchData(endpoint, data) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`PATCH ${endpoint} failed`);
  return res.json();
}

export async function deleteData(endpoint) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`DELETE ${endpoint} failed`);
  return res.json();
}
