const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const product_data = require("./models/productdetails");
const signup_data = require("./models/business_signup_credentials");
const user_signup = require("./models/user_signup_credentials");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { log } = require("console");
const { validateHeaderValue } = require("http");

const JWT_TOKEN = "Arghya@!123!@";

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("Access Denied: No Token Provided");
  }

  try {
    const verified = jwt.verify(token, JWT_TOKEN);
    req.user = verified; // Store decoded token in request
    next(); // Proceed to the next middleware/route
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

// Home route
app.get("/", async function (req, res) {
  const productData = await product_data.find();
  res.render("index", { productData });
});

// Sign-up route (renders the signup page)
app.get("/user_signup", function (req, res) {
  res.render("signup");
});
app.get(`/signup`, function (req, res) {
  res.render("signup");
})

app.post(`/signup_form`, async (req, res) => {
  let { username, email, phone, password } = req.body;

  const salt = await bcrypt.genSalt(15);
  const new_pass = await bcrypt.hash(password, salt);
  await user_signup.create({
    username,
    email,
    phone,
    password: new_pass,
  });

  res.redirect("login");
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.get(`/user_login`, function (req, res) {
  res.render("login")
})

// Business Sign-up form (renders the form)
app.get("/business-signup", function (req, res) {
  res.render("businesssignup");
});

// Handle the form submission for business signup
app.post("/business-signup-form", async (req, res) => {
  let { b_name, username, email, phone, password } = req.body;
  console.log(username);
  
  const salt = await bcrypt.genSalt(15);
  const new_pass = await bcrypt.hash(password, salt);
  await signup_data.create({
    b_name,
    username,
    email,
    phone,
    password: new_pass,
  });
  res.redirect("businesslogin");
});

app.get("/business-login", function (req, res) {
  res.render("businesslogin");
});
app.get("/businesslogin", function (req, res) {
  res.render("businesslogin");
})

// Handle business login
app.post("/business-login", async (req, res) => {
  let { username, password } = req.body;
  console.log(username);
  
  const user = await signup_data.findOne({ username: username });

  if (!user) {
    return res.send("User Not Found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.send("Invalid Credentials");
  }

  const token = jwt.sign({ username: user.username }, JWT_TOKEN, {
    expiresIn: "1h",
  });
  res.cookie("token", token);
  res.redirect("/businessview" );
});

// View business products
app.get("/businessview", verifyToken, async function (req, res) {
  const user = req.user.username;
  const index = 0;
  let products = await product_data.find({ username: user });
  
  res.render("business_view", { products, index, user , message : "Login Successfull !" , success : true });
});

app.get("/cart", (req, res) => {
  res.render("cart");
});

app.get("/add-product", verifyToken, async function (req, res) {
  const user = req.user.username;
  const business = await signup_data.findOne({ username: user })
  const ind = 1;
  const business_name = business.b_name;
  res.render("addproduct", { business_name, ind });
});

// Handle product addition
app.post("/adding-product", verifyToken, async function (req, res) {
  let { business_name, name, price, description, rating, image } = req.body;
  const username = req.user.username;
  console.log(username);
  
  await product_data.create({
    business_name,
    username,
    name,
    price,
    description,
    rating,
    image,
  });
  res.redirect("/businessview");
});

app.get(`/read/:id`, async function (req, res) {
  const product = await product_data.findById(req.params.id);
  res.render(`show`, { product });
})

app.get(`/edit-product/:id`,async (req, res) => {

  const product = await product_data.findById(req.params.id);
  console.log(product);
  
  res.render(`edit` , {product})
})

app.post(`/updated_product/:id`, verifyToken, async (req, res) => {
  let { business_name, name, price, description, rating, image } = req.body;
  const product_id = req.params.id;
  const username = req.user.username;
    const updatedProduct = {
      business_name,
      username,
      name,
      price,
      description,
      rating,
      image,
    };
  await product_data.findByIdAndUpdate(product_id, updatedProduct);
  res.redirect("/businessview");
  
})
app.listen(3000, function () {
  console.log("App is running on port 3000");
});
