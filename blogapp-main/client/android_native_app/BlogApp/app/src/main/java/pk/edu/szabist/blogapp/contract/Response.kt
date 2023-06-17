package pk.edu.szabist.blogapp.contract

data class Response (
    var status:Boolean = false,
    var responseCode:Int = -1,
    var message:String = "",
    var userId:String = "",
    var blogId:String = "",
    var allBlogs:MutableList<Blog> = mutableListOf(),
    var myBlogs:MutableList<Blog> = mutableListOf()
)