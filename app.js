const express = require("express");
const dotenv = require("dotenv");
const indexRouter = require("./routes/index.routes");

dotenv.config();

const PORT = process.env.PORT || 3030;
const app = express();
app.use(express.json());

app.use('/api',indexRouter);

app.listen(PORT, () => {
  console.log(`Server started at: http://localhost:${PORT}`);
});
