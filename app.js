import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import _ from "lodash";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const homeContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const aboutContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const contactContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

let posts = [];

app.get("/", (req, res) => {
  res.render("main.ejs", {
    intialContant: homeContent,
    content: posts,
  });
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
  var data = req.body.newItem;
  res.render("compose.ejs");
});

app.post("/compose", (req, res) => {
  const postData = {
    title: req.body.title,
    post: req.body.post,
  };
  posts.push(postData);

  res.redirect("/");
});

app.get("/posts/:postNumber", (req, res) => {
  var requestRoute = _.lowerCase(req.params.postNumber);

  posts.forEach((e) => {
    const titleElement = _.lowerCase(e.title);
    if (titleElement == requestRoute) {
      res.render("posts.ejs", {
        title: e.title,
        content: e.post,
        readMore: `/posts/${titleElement}`,
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
