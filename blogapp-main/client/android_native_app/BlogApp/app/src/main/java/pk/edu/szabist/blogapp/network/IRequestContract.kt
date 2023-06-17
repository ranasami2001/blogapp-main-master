package pk.edu.szabist.blogapp.network

import pk.edu.szabist.blogapp.contract.Request
import pk.edu.szabist.blogapp.contract.Response
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface IRequestContract {
   @POST("service.php")
   fun makeApiCall(@Body request: Request):Call<Response>
}