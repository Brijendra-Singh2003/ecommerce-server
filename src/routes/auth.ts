import express from "express";
import passport from "../middlewares/passport.js";

const authRouter = express.Router();

authRouter.get(
  "/signin/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.CLIENT_URL || "http://localhost:3000",
    successRedirect: process.env.CLIENT_URL || "http://localhost:3000",
    session: true,
  })
);

authRouter.get("/signout", (req, res) => {
  req.logout(() => {
    console.log(req.user, " logged out");
  });
  res.redirect(process.env.CLIENT_URL || "http://localhost:3000");
});

authRouter.get("/user", (req, res) => {
  console.log("user: ", req.user, req.isAuthenticated());
  res.json(req.user || {});
});

export default authRouter;