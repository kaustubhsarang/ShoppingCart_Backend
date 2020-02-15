const express = require("express");
const { pool, config, queryData, connectSql } = require("./database");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");

// MySQLStore
const MySQLStore = require("express-mysql-session")(session);
// new MySQLStore({adapter: "mysql"}, conn);

// app
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "SESSION_SECRET",
  store: new MySQLStore({}, pool)
}));


app.get("/query/:q", (req, res, next) => {
    return connectSql(req.params.q, req, res);
  });

app.get("/", (req, res, next) => {
    // return res.sendFile(__dirname + '/public/index.html');
    return res.send('Hello World');
});


app.listen(app.get("port"), () => {
    console.log(
      "  App is running at http://localhost:%d in %s mode",
      app.get("port"),
      app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
  });