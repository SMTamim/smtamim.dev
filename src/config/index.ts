export default {
  db_url: process.env.DB_CONNECTION_STRING,
  api_url: process.env.NEXT_PUBLIC_API_URL,
  public_url: process.env.NEXT_PUBLIC_URL,
  next_auth_secret: process.env.AUTH_SECRET,
  NODE_ENV: process.env.NODE_ENV
};
