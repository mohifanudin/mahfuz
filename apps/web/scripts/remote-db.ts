/** Select the native-free HTTP/WebSocket client for remote Turso databases. */
export async function openSeedClient() {
  const url = process.env.TURSO_DATABASE_URL || "file:./local.db";
  const { createClient } = url.startsWith("file:") ? await import("@libsql/client") : await import("@libsql/client/web");
  return createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });
}
