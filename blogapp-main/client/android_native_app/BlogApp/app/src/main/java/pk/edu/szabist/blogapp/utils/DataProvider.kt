package pk.edu.szabist.blogapp.utils

import pk.edu.szabist.blogapp.contract.Blog
import pk.edu.szabist.blogapp.contract.Response

object DataProvider {
    var response:Response = Response()
    var blog: Blog = Blog()
    lateinit var userId:String
    lateinit var userName:String
}