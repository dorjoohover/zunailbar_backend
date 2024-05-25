//  #     #    #    ### #     #
//  ##   ##   # #    #  ##    #
//  # # # #  #   #   #  # #   #
//  #  #  # #     #  #  #  #  #
//  #     # #######  #  #   # #
//  #     # #     #  #  #    ##
//  #     # #     # ### #     #
const moment = require("moment");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");
const path = require("path");
const http = require("http");
// const { socketio } = require("./utils/socketio");
const axios = require("axios");
const querystring = require("querystring");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { now } = require("./utils/moment");
const session = require("express-session");
//  ######  ####### #     # ####### #######  #####
//  #     # #     # #     #    #    #       #     #
//  #     # #     # #     #    #    #       #
//  ######  #     # #     #    #    #####    #####
//  #   #   #     # #     #    #    #             #
//  #    #  #     # #     #    #    #       #     #
//  #     # #######  #####     #    #######  #####

const customerRoutes = require("./routes/customers");
const managerRoutes = require("./routes/manager");
const serviceRoutes = require("./routes/service");
const artistRoutes = require("./routes/artists");
const bookingRoutes = require("./routes/booking");
const serviceGroupRoutes = require("./routes/service_group");
const artistServicesRoutes = require("./routes/artist_service");
const artistTimetableRoutes = require("./routes/artist_timetable");
const reportRoutes = require("./routes/report");

const { register, login } = require("./controller/user");
const MyError = require("./utils/myError");
//  ######  #######  #####  #     # ### ######  #######
//  #     # #       #     # #     #  #  #     # #
//  #     # #       #     # #     #  #  #     # #
//  ######  #####   #     # #     #  #  ######  #####
//  #   #   #       #   # # #     #  #  #   #   #
//  #    #  #       #    #  #     #  #  #    #  #
//  #     # #######  #### #  #####  ### #     # #######

require("dotenv").config();
require("colors");

//  #     # ### ######  ######  #       ####### ### #     # ######  ####### ######  #######  #####
//  ##   ##  #  #     # #     # #       #        #  ##   ## #     # #     # #     #    #    #     #
//  # # # #  #  #     # #     # #       #        #  # # # # #     # #     # #     #    #    #
//  #  #  #  #  #     # #     # #       #####    #  #  #  # ######  #     # ######     #     #####
//  #     #  #  #     # #     # #       #        #  #     # #       #     # #   #      #          #
//  #     #  #  #     # #     # #       #        #  #     # #       #     # #    #     #    #     #
//  #     # ### ######  ######  ####### ####### ### #     # #       ####### #     #    #     #####

const morgan = require("morgan");
const { logger, accessLogStream } = require("./middlewares/logger");
const errorHandler = require("./middlewares/error");
const injectDb = require("./middlewares/injectDb");
const corsOptionsDelegate = require("./middlewares/corsOption");
//   #####  ####### #     #  #####  #######
//  #     # #     # ##    # #     #    #
//  #       #     # # #   # #          #
//  #       #     # #  #  #  #####     #
//  #       #     # #   # #       #    #
//  #     # #     # #    ## #     #    #
//   #####  ####### #     #  #####     #

const db = require("./models/index.js");
const { protect, authorize } = require("./middlewares/protect");
const app = express();
//  #     # ### ######  ######  #       ####### #     #    #    ######  #######
//  ##   ##  #  #     # #     # #       #       #  #  #   # #   #     # #
//  # # # #  #  #     # #     # #       #       #  #  #  #   #  #     # #
//  #  #  #  #  #     # #     # #       #####   #  #  # #     # ######  #####
//  #     #  #  #     # #     # #       #       #  #  # ####### #   #   #
//  #     #  #  #     # #     # #       #       #  #  # #     # #    #  #
//  #     # ### ######  ######  ####### #######  ## ##  #     # #     # #######

app.use(express.json());
app.enable("trust proxy");
morgan.token("body", (req) => {
  req.body.password = "";
  return JSON.stringify(req.body);
});
app.use(fileupload());
app.use(
  morgan(
    `:remote-addr - :remote-user [:date[clf]] ":method :url :user-agent HTTP/:http-version" :referrer :status :res[content-length]  :body`,
    // ":remote-addr :method :remote-user [:date[clf]] :method :url HTTP/:http-version :referrer :user-agent :url :status :body  ",
    // ":method :url :body",
    // "combined",
    {
      stream: accessLogStream,
    }
  )
);
app.use(logger);
app.use(injectDb(db));
app.use(cors());
// .env deerh whitelist deerh ip aas handalt hiih
app.use(cors(corsOptionsDelegate));
app.use(cookieParser());

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: "secret",
    cookie: { maxAge: 1000 * 60 * 60 * 2 },
  })
);

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "pug");

//  ######  ####### #     # ####### #######  #####
//  #     # #     # #     #    #    #       #     #
//  #     # #     # #     #    #    #       #
//  ######  #     # #     #    #    #####    #####
//  #   #   #     # #     #    #    #             #
//  #    #  #     # #     #    #    #       #     #
//  #     # #######  #####     #    #######  #####

// app.use("/", mainRoutes);

app.use(`/api/${process.env.VERSION}/customers`, customerRoutes);
app.use(`/api/${process.env.VERSION}/managers`, managerRoutes);
app.use(`/api/${process.env.VERSION}/services`, serviceRoutes);
app.use(`/api/${process.env.VERSION}/artists`, artistRoutes);
app.use(`/api/${process.env.VERSION}/bookings`, bookingRoutes);
app.use(`/api/${process.env.VERSION}/service_groups`, serviceGroupRoutes);
app.use(`/api/${process.env.VERSION}/artist_services`, artistServicesRoutes);
app.use(`/api/${process.env.VERSION}/artist_timetables`, artistTimetableRoutes);
app.use(`/api/${process.env.VERSION}/reports`, reportRoutes);

app.use(
  `/api/${process.env.VERSION}/pdf`,
  // protect,
  // authorize("0", "1", "3"),
  express.static(path.join(__dirname, "./pdf"))
);

app.use(
  `/api/${process.env.VERSION}`,
  express.static(path.join(__dirname, "./public"))
);

//  ####### ######  ######  ####### ######  #     #    #    #     # ######  #       ####### ######
//  #       #     # #     # #     # #     # #     #   # #   ##    # #     # #       #       #     #
//  #       #     # #     # #     # #     # #     #  #   #  # #   # #     # #       #       #     #
//  #####   ######  ######  #     # ######  ####### #     # #  #  # #     # #       #####   ######
//  #       #   #   #   #   #     # #   #   #     # ####### #   # # #     # #       #       #   #
//  #       #    #  #    #  #     # #    #  #     # #     # #    ## #     # #       #       #    #
//  ####### #     # #     # ####### #     # #     # #     # #     # ######  ####### ####### #     #

app.use(errorHandler);

//   #####  #     # #     #  #####
//  #     #  #   #  ##    # #     #
//  #         # #   # #   # #
//   #####     #    #  #  # #
//        #    #    #   # # #
//  #     #    #    #    ## #     #
//   #####     #    #     #  #####

db.sequelize
  .sync({
    // force: true  // модель шинээр угсрах || бааз хоослох !!!
  })
  .then(() => {
    console.log("Sequelize sync...".cyan);
  })
  .catch((err) => {
    console.log(err);
  });

//   #####  ####### ####### #     # ######
//  #     # #          #    #     # #     #
//  #       #          #    #     # #     #
//   #####  #####      #    #     # ######
//        # #          #    #     # #
//  #     # #          #    #     # #
//   #####  #######    #     #####  #

const server = http.createServer(app);
// const socketIO = require("socket.io");

// socketio(server);
server.listen(process.env.PORT, () => {
  console.log(
    "Server is running on: " +
      process.env.PORT +
      " with " +
      process.env.NODE_ENV
  );
});

process.on("unhandledRejection", (err, promise) => {
  console.log("unhandledRejection err: ", err);
  /*
    server.close(() => {
        process.restart()
    }); */
});
