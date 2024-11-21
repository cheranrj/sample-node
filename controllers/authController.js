const {
  createTable,
  checkRecordExists,
  insertRecord,
} = require("../utils/sqlFunction");

// Get JWT token
const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const login = async (req, res) => {
  console.log("called", req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      status: "error",
      error: "Email or Password fields cannot be empty!",
    });
    return;
  }

  try {
    const existingUser = await checkRecordExists(
      "employees",
      "email_id",
      email
    );

    console.log("existingUser", existingUser);

    if (existingUser) {
      if (!existingUser.password) {
        res.status(401).json({ status: "error", error: "Invalid credentials" });
        return;
      }

      //   const passwordMatch = await bcrypt.compare(
      //     password,
      //     existingUser.password
      //   );

      //   if (passwordMatch) {

      if (password === existingUser.password) {
        res.status(200).json({
          userId: existingUser.id,
          email: existingUser.email_id,
          status: "success",
          //   access_token: generateAccessToken(existingUser.userId),
        });
      } else {
        res.status(401).json({ status: "error", error: "Invalid credentials" });
      }
    } else {
      res.status(401).json({ status: "error", error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

module.exports = {
  login,
};
