const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export function extractCollection(payload, collectionName) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.[collectionName])) {
    return payload[collectionName];
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  return [];
}

export async function fetchCollection(collectionName) {
  const response = await fetch(`${apiBaseUrl}/${collectionName}/`);

  if (!response.ok) {
    throw new Error(`Request failed for ${collectionName}: ${response.status}`);
  }

  const payload = await response.json();

  return extractCollection(payload, collectionName);
}
