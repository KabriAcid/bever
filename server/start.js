const path = require("path");
const { createApp } = require("./src/app");

const dataDir = path.join(__dirname, "data");
const app = createApp({ dataDir });

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Bever server listening on ${port}`));
