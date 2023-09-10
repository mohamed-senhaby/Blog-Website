import express from "express";
import bodyParser from "body-parser";
import _ from "lodash";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

const homeContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const aboutContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const contactContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const blogSchema = new mongoose.Schema({
  title: String,
  post: String,
});
const BlogPost = mongoose.model("Blog", blogSchema);

app.get("/", async (req, res) => {
  try {
    const blog = await BlogPost.find();
    res.render("main.ejs", {
      intialContant: homeContent,
      content: blog,
    });
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.redirect("/");
  }
});

app.get("/about", (req, res) => {
  res.render("about.ejs", {
    content: aboutContent,
  });
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs", {
    content: contactContent,
  });
});

app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});

app.post("/compose", async (req, res) => {
  try {
    const addBlog = new BlogPost({
      title: req.body.title,
      post: req.body.post,
    });

    await addBlog.save();
    res.redirect("/");
  } catch (error) {
    console.error("Error creating item:", error);
    res.redirect("/");
  }
});

app.get("/posts/:postNumber", async (req, res) => {
  // var requestRoute = _.lowerCase(req.params.postNumber);

  try {
    const blog = await BlogPost.findOne({ title: req.params.postNumber });
    res.render("posts.ejs", {
      title: blog.title,
      content: blog.post,
      readMore: `/posts/${blog.title}`,
    });
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

connectToDatabase();
