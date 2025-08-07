import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Mini Messageboard",
    messages,
  });
});

app.get("/new", (req, res) => {
  res.render("form", { title: "New Author" });
});

app.post("/new", (req, res) => {
  const { messageText, authorName } = req.body;
  messages.push({ text: messageText, user: authorName, added: new Date() });
  res.redirect("/");
});

app.listen(3000, () => {
  console.log(`Listening on http://localhost:3000`);
});
