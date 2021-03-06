import express from "express";

const app = express();
import connectDB from "./Loaders/db";

//connect DB
connectDB();

app.use(express.json());

// define route
app.use("/api/register", require("./api/register"));
app.use("/api/loadInfo", require("./api/loadInfo"));
app.use("/api/matching", require("./api/matching"));


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "production" ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });

  app
  .listen(5000, () => {
    console.log(`
    ################################################
    🛡️  Server listening on port: 5000 🛡️
    ################################################
  `);
  })
  .on("error", (err) => {
    console.error(err);
    process.exit(1);
  });
