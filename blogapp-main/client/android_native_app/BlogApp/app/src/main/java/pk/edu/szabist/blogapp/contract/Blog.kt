package pk.edu.szabist.blogapp.contract

import com.google.gson.annotations.SerializedName

data class Blog (
    @SerializedName("blogId") var blogId:String="",
    @SerializedName("bloggerName") var bloggerName:String="",
    @SerializedName("title") var title:String="",
    @SerializedName("description") var description:String="",
    @SerializedName("dateTime") var dateTime:String=""
)