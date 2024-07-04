import cors from "cors";
import express, { Express, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";

import path from "path";
import redployRouter from "./routes/redeploy";

const app: Express = express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// use cors
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [/thienvandanang\.com$/, /devlv\.com$/]
        : true,
    credentials: true,
  })
);

app.use("/redeploy", redployRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.status(404).send("Not found");
  // next(createError(404));
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

export default app;
