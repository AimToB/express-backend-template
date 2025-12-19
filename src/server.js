import app from "./app.js";

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Connected to the server on port ${PORT}`);
});

const shutdown = (signal) => {
  console.log(`\n${signal} recieved. Shutting down gracefully...`);

  server.close(() => {
    console.log("HTTP server closed.");

    process.exit(0);
  });

  setTimeout(() => {
    console.log("Forced shutdown after timeout.");
    process.exit(1);
  }, 10000);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
