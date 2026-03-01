import "dotenv/config";
import app from "./app.ts";

const PORT = process.env.PORT || 5000;

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server running on port ${PORT}`);
  } else {
    console.error("Failed to start server:", error);
  }
});
