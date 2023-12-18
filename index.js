import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
import HomeController from "./src/controller/home.controller.js";
import {
  uploadImage,
  uploadResume,
} from "./src/middleware/file-upload.middleware.js";
import { ValidateRequest } from "./src/middleware/validation.middleware.js";
import session from "express-session";
import UserController from "./src/controller/user.controller.js";
import { auth } from "./src/middleware/auth.middleware.js";
import cookieParser from "cookie-parser";
import { setlastVisit } from "./src/middleware/lastvisit.middleware.js";
import sendMail from "./src/middleware/sendemail.middleware.js";

const app = express();

// Instantiate controllers
const homeController = new HomeController();
const userController = new UserController();

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Setup view engine
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));
app.use(expressEjsLayouts);

// Static files
app.use(express.static("public"));

// Cookie Parser

app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;

//session middleware

app.use(
  session({
    secret: "thisismysecrctekey",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

// Routes
app.get("/", homeController.getHomepage);
app.get("/jobs", setlastVisit, homeController.getJobsPage);
app.get("/jobdetails/:id", homeController.getJobDetails);
app.get("/updatejob/:id", auth, homeController.getUpdateJob);
app.get("/postjob", auth, homeController.getCreateJob);
app.get("/applicants/:id", auth, homeController.getApplicants);
app.post(
  "/jobs",
  auth,
  uploadImage.single("imageUrl"),
  ValidateRequest,
  homeController.postCreatedJob
);
app.post(
  "/jobdetails/:id",
  auth,
  uploadImage.single("imageUrl"),
  ValidateRequest,
  homeController.postUpdatedJob
);
app.post("/deletejob/:id", auth, homeController.postDeleteJob);
app.post("/apply", uploadResume.single("resume"), sendMail , homeController.postApplicant);
app.post("/", userController.postLogin);
app.post("/register", userController.postRegister);
app.get("/logout", userController.logout);

// Handle 404 error

app.use((req, res, next) => {
  res.status(404).render("404");
});

app.listen(3200, () => {
  console.log("Server is running on port 3200");
});
