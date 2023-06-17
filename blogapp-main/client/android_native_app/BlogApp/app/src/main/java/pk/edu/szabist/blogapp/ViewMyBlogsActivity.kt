package pk.edu.szabist.blogapp

import android.app.Activity
import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import kotlinx.android.synthetic.main.activity_view_my_blogs.*
import pk.edu.szabist.blogapp.adapter.MyBlogAdapter
import pk.edu.szabist.blogapp.contract.Blog
import pk.edu.szabist.blogapp.utils.Constant
import pk.edu.szabist.blogapp.utils.DataProvider

class ViewMyBlogsActivity : AppCompatActivity() {
    lateinit var adapter: MyBlogAdapter
    lateinit var dataSource:MutableList<Blog>
    private lateinit var context: Context
    private lateinit var activity: Activity

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_view_my_blogs)

        context = this
        activity = this
        dataSource = DataProvider.response.myBlogs
        if(dataSource.size>0){
            adapter = MyBlogAdapter(activity,context,dataSource)

            noBlogAvailable.visibility = View.INVISIBLE

            rvMyBlogs.visibility = View.VISIBLE
            rvMyBlogs.adapter = adapter
        }
        else{
            noBlogAvailable.visibility = View.VISIBLE
            rvMyBlogs.visibility = View.INVISIBLE
        }

        add.setOnClickListener {
            Intent(this,AddOrUpdateBlogActivity::class.java).apply {
                putExtra(Constant.KEY_REASON,1) //1 Mean Add
                startActivity(this)
            }
        }
    }
}
