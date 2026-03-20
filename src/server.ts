import "dotenv/config";
import app from "src/app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, (error: any) => {
  if (!error) {
    console.log(`Server running on port ${PORT}`);
  } else {
    console.error("Failed to start server:", error);
  }
});
