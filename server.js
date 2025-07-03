import { PORT } from "./src/config.js";
import app from "./src/app.js";
import { connectDB } from "./src/bd.js";

app.listen(PORT, () => {
  connectDB();
  console.log(`Example app listening on port http://localhost:${PORT}!`);
});
