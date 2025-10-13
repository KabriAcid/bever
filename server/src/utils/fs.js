const fs = require("fs").promises;

async function readJson(filePath) {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

async function writeJson(filePath, data) {
  await fs.mkdir(require("path").dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

module.exports = { readJson, writeJson };
