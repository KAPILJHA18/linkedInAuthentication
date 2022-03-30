import { getDbConnection } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;
    const db = getDbConnection("react-auth-db"); // Database Name
    const user = await db.collection("users").findOne({ email });

    if (user) {
      return res.status(409);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const startingInfo = {
      hairColor: "",
      favoriteFoot: "",
      bio: "",
    };

    const result = await db.collection("users").insertOne({
      email,
      passwordHash,
      info: startingInfo,
      isVerified: false,
    });

    const { insertedId } = result;

    const token = jwt.sign(
      {
        id: insertedId,
        email,
        info: startingInfo,
        isVerified,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      },
      (err, token) => {
        if (err) {
          res.status(500).semd(err);
        }

        res.status(200).json({ token });
      }
    ); // second args is secret / Third arg is configuration expire in
  },
};
