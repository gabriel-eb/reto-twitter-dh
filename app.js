const express = require('express');
const app = express();
const PORT = process.env.PORT || 3050;
const path = require("path");
const methodOverride = require('method-override');
const morgan = require("morgan");
const session = require("express-session");

const rutaMain = require("./routes/mainRoute");

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(session({
    secret: "secreto123",
    resave: false,
    saveUninitialized: false
}));
app.use(recordarSession);
app.use((req, res, next) => {
    res.locals.sessionId = req.session.userId;
    next();
});

app.use("/", rutaMain);

app.listen(PORT,() => {
    console.log("Escuchando en http://localhost:" + PORT + "/");
});