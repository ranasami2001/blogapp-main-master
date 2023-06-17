package pk.edu.szabist.blogapp.contract

import com.google.gson.annotations.SerializedName

data class Request (
    @SerializedName("action") var action:String="",
    @SerializedName("userId") var userId:String="",
    @SerializedName("userName") var userName:String="",
    @SerializedName("blogId") var blogId:String="",
    @SerializedName("title") var title:String="",
    @SerializedName("description") var description:String=""
)