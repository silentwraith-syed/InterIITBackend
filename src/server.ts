import app from "./app";
import { env } from "./env";

const PORT = env.PORT;
const HOST = '0.0.0.0'; // Listen on all network interfaces for Railway

app.listen(PORT, HOST, () => {
  console.log(`API running on http://${HOST}:${PORT}`);
});