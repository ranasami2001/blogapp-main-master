import DBFunction from "../database/DBFunction";
class BlogAppController {
  static async Execute(req, res) {
    let response = {
      status: false,
      responseCode: 100,
      message: "",
    };

    let isValidRequest = false;

    if (req.body.action != undefined) {
      if (req.body.action == "REGISTER_USER") {
        isValidRequest = true;
        const user = await DBFunction.AddNewUser(req.body.userName);
        if (user != undefined) {
          response.userId = user._id;
          response.status = true;
          response.responseCode = 0;
          response.message = "user registered successfully";
        } else {
          response.status = false;
          response.responseCode = 102;
          response.message = "user registration failed";
        }
      }

      if (req.body.action == "ADD_BLOG") {
        isValidRequest = true;
        const blog = await DBFunction.AddNewBlog(
          req.body.title,
          req.body.description,
          req.body.userId
        );
        if (blog != undefined) {
          response.blogId = blog._id;
          response.status = true;
          response.responseCode = 0;
          response.message = "blog inserted successfully";
        } else {
          response.status = false;
          response.responseCode = 103;
          response.message = "user insertion failed";
        }
      }

      if (req.body.action == "GET_BLOGS") {
        isValidRequest = true;

        const BlogList = await DBFunction.GetAllBlogs(req.body.userId);

        if (
          BlogList.AllUserBlogList != undefined &&
          BlogList.LoginUserBlogList != undefined
        ) {
          response.status = true;
          response.responseCode = 0;
          response.message = "blogs are available";
          response.allBlogs = BlogList.AllUserBlogList;
          response.myBlogs = BlogList.LoginUserBlogList;
        } else {
          response.status = false;
          response.responseCode = 104;
          response.message = "blogs are not available";
        }
      }

      if (!isValidRequest) {
        response.status = false;
        response.responseCode = 101;
        response.message = "Invalid request action";
      }
    } else {
      response.status = false;
      response.responseCode = 100;
      response.message = "Request action not defined";
    }
    res.send(response);
  }
}

export default BlogAppController;
