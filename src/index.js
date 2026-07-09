export default {
  async fetch(request, env) {
    const authHeader = request.headers.get("Authorization");
    const validUser = env.SITE_USERNAME || "ben";
    const validPass = env.SITE_PASSWORD;

    if (authHeader) {
      const [scheme, encoded] = authHeader.split(" ");
      if (scheme === "Basic" && encoded) {
        const [user, pass] = atob(encoded).split(":");
        if (user === validUser && pass === validPass) {
          return env.ASSETS.fetch(request);
        }
      }
    }

    return new Response("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Restricted"' },
    });
  },
};
