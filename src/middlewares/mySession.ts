import cookieSession from "cookie-session";

const mySession = cookieSession({
    name: "session",
    keys: [process.env.AUTH_SECRET_1 as string],
    maxAge: 7 * 24 * 3600000, // 7 days
});

export default mySession;