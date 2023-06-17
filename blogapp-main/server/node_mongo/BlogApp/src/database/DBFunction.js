import User from "../models/User";
import Blog from "../models/Blog";

class DBFunction {
  static async AddNewUser(userName) {
    const user = new User({ name: userName });
    return await user.save();
  }

  static async AddNewBlog(title, description, userId) {
    const blog = new Blog({
      title: title,
      description: description,
      userId: userId,
    });
    return await blog.save();
  }

  static async GetAllBlogs(userId) {
    let AllUserBlogList = [];
    let LoginUserBlogList = [];

    const users = await User.find({});
    const blogs = await Blog.find({});

    users.forEach(function (user) {
      blogs.forEach(async function (blog) {
        if (user._id.toString() == blog.userId) {
          let userDetails = {
            blogId: blog._id,
            bloggerName: user.name,
            title: blog.title,
            description: blog.description,
            dateTime: blog.dateTime,
          };

          AllUserBlogList.push(userDetails);

          if (blog.userId == userId) {
            LoginUserBlogList.push(userDetails);
          }
        }
      });
    });

    return {
      AllUserBlogList: AllUserBlogList,
      LoginUserBlogList: LoginUserBlogList,
    };
  }
}

export default DBFunction;
