export async function onRequest(context) {
  const { request, env } = context;
  const authHeader = request.headers.get("Authorization");

  const validUser = env.SITE_USERNAME || "family";
  const validPass = env.SITE_PASSWORD;

  if (authHeader) {
    const [scheme, encoded] = authHeader.split(" ");
    if (scheme === "Basic" && encoded) {
      const [user, pass] = atob(encoded).split(":");
      if (user === validUser && pass === validPass) {
        return context.next();
      }
    }
  }

  return new Response("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Restricted"' },
  });
}
