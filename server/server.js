const express = require("express");
const next = require("next");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDb = require("./connectDb");


// environmental variables
dotenv.config({ path: `${__dirname}/../.env.local` });

const dev = process.env.NODE_ENV !== "production";
 
const app = next({ dev });
 
const handle = app.getRequestHandler();

   
 

app
  .prepare()
  .then(() => {
    const server = express();

    // body parser, cookie parser, urlencoding
    server.use(express.json());
    server.use(cookieParser());
    server.use(express.urlencoded({ extended: true, limit: "10kb" }));

    // connect db
    connectDb();

    // api routes
    const routes = ["users"];
  
    // handle api requests
    routes.forEach((route) =>
      server.use(`/api/${route}`, require(`${__dirname}/routes/${route}`))
    );
 
    // 404 response for api
    server.all(/^\/api\//, (req, res) =>
      res
        .status(404)
        .json({ status: "Fail", errorMessage: "resource not found" })
    );

    // handle nextJs requests
    server.get("*", (req, res) => handle(req, res));

    //   define port
    const PORT = process.env.PORT || 5000;

    //  start server
    const runningServer = server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`app running on PORT ${PORT}`);
    });

    server.on("error", (err) => {
      console.log("shutting down server on error");
      console.log(err);
      runningServer.close();
      process.exit(1);
    });
  }) 
  .catch((err) => {
    console.log("shutting down server on error");
    console.log(err);
    process.exit(1); 
  });
