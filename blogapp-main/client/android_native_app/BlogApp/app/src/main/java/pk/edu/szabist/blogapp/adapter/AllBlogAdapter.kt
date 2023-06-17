package pk.edu.szabist.blogapp.adapter

    import android.content.Context
    import android.view.LayoutInflater
    import android.view.View
    import android.view.ViewGroup
    import androidx.recyclerview.widget.RecyclerView
    import kotlinx.android.synthetic.main.it_all_blog.view.*
    import pk.edu.szabist.blogapp.R
    import pk.edu.szabist.blogapp.contract.Blog

    class AllBlogAdapter(var context:Context, var dataSource:MutableList<Blog>): RecyclerView.Adapter<AllBlogAdapter.AllBlogViewHolder>() {

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AllBlogViewHolder {
            val view = LayoutInflater.from(context).inflate(R.layout.it_all_blog,parent,false)
            return AllBlogViewHolder(view)
        }

        override fun getItemCount(): Int {
            return dataSource.size
        }

        override fun onBindViewHolder(holder: AllBlogViewHolder, position: Int) {
            val blog = dataSource[position]
            holder.title.text = blog.title
            holder.description.text = blog.description
            holder.blogger.text = blog.bloggerName
            holder.dateTime.text = blog.dateTime
        }

        class AllBlogViewHolder(view: View):RecyclerView.ViewHolder(view){
            var title = view.title
            var description = view.description
            var blogger = view.blogger
            var dateTime = view.dateTime
        }


    }