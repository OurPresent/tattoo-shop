const express = require("express");
const cors = require("cors");
const {} = require("./utils");
const { signIn, signUp, signOut } = require("./auth");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 80;

app.use(cors());

app.post("/login", async (req, res) => {
  const loginData = await signIn(req.body);
  if (loginData.success == false) {
    res
      .status(loginData.error.status)
      .json({ message: loginData.error.message });
  } else {
    res.json(loginData);
  }
});

app.post("/register", async (req, res) => {
  const registerData = await signUp(req.body);
  if (registerData.success == false) {
    res
      .status(registerData.error.status)
      .json({ message: registerData.error.message });
  } else {
    res.json(registerData);
  }
});

app.post("/logout", async (req, res) => {
  const logout = await signOut();
  if (logout.success == false) {
    res.status(logout.error.status).json({ message: logout.error.message });
  } else {
    res.json(logout);
  }
});

app.listen(PORT, () => {
  console.log(`Server está ejecutando en el puerto ${PORT}`);
});
