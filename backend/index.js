const express = require("express");
const cors = require("cors")
const rootRouter = require("./routes/index");
const userRouter = require("./routes/user")
const accountRouter = require("./routes/account");

const app = express();
app.listen(8080)

app.use(cors())
app.use(express.json())
app.use("/api/v1", rootRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);

app.listen(3000, () => {
    console.log("✅ Server is running on http://localhost:8080");
});