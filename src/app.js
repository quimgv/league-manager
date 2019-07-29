const express = require("express");
var cors = require("cors");
require("./db/mongoose");
const userRouter = require("./routers/user");
const leagueRouter = require("./routers/league");
const teamRouter = require("./routers/team");
const registrationRouter = require("./routers/registration");
const zoneRouter = require("./routers/zone");
const categoryRouter = require("./routers/category");
const phaseRouter = require("./routers/phase");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/users", userRouter);
app.use("/league", leagueRouter);
app.use("/team", teamRouter);
app.use("/registration", registrationRouter);
app.use("/zone", zoneRouter);
app.use("/category", categoryRouter);
app.use("/phase", phaseRouter);

module.exports = app;
