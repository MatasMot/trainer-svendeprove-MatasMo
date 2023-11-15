import { useLoaderData, Link, useSearchParams } from "react-router-dom";

// the loader function runs before the component function is mounted in the browser
export const loader = async ( { request } ) => {
    let url = new URL(request.url)
    let params = url.searchParams.get("q")

    try {
        // use & instead of ? if ? exist in api route
        let response = await fetch(`http://localhost:4000/blogposts?embed=comments${params ? `&q=${params}` : ""}`, {
            // standard method is GET for fetch
        })

        
        return await response.json()
    } catch (error) {
        return error;
    }

};

const Blog = () => {
    //const [searchParams] = useSearchParams();
    //console.log(searchParams.get("q"));

    // variables contains data returned from the loader function
    let posts = useLoaderData();
    
    /*React uses key prop to identify different elements*/
    console.log(posts);
    const noOfPosts = posts.length
    console.log(noOfPosts);
    const randomPost = Math.floor(Math.random() * noOfPosts);

    return (
        <>
            <h1>Random title</h1>

            <section className="h-[40vh] rounded-2xl overflow-hidden relative">
                <img className="w-full h-full object-cover" src={posts[randomPost].asset.url} alt="" />
                <p className="absolute bottom-0 left-0 bg-red-700 p-4 pr-8 rounded-tr-[3rem]">{posts[randomPost].title}</p>
                {/*<p className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-red-700 p-4 pr-8 text-center">{posts[randomPost].title}</p>*/}
            </section>


            <h1>Blog</h1>
            <section className="flex overflow-x-scroll gap-4 scrollbar-hide">
                {posts.map(post => (
                    
                    <article className="basis-[380px] grow-0 shrink-0" key={post.id}>
                        <p>Title: {post.title}</p>
                        <p>Author: {post.author}</p>
                        <p>Comments: {post.comments.length}</p>
                        <p className="line-clamp-3">{post.content}</p>
                        <Link to={`/blog/${post.id}`}>Read More</Link>
                        <img className="rounded-tl-[5rem]" src={post.asset.url} alt="url" />
                    </article>
                ))}
            </section>
        </>
    );
}
 
export default Blog;
