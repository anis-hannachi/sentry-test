const PORT = process.env.PORT || "8080";
const express = require("express");
const app = express();

const Sentry = require("@sentry/node");

const Tracing = require("@sentry/tracing");

Sentry.init({
  dsn: "https://a41872adf2b74309b12d2e6f0588e5cb@o1067584.ingest.sentry.io/6061704",
  tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
  op: "test",
  name: "My First Test Transaction",
});

setTimeout(() => {
  try {
    foo();
  } catch (e) {
    Sentry.captureException(e);
  } finally {
    transaction.finish();
  }
}, 99);

app.get("/", (req, res) => {
  res.json("Hello World");
});


app.listen(parseInt(PORT, 10), () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});

