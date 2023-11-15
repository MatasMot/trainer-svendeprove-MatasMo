import { useLoaderData, Link, useSearchParams } from "react-router-dom";
import SearchBox from "../components/SearchBox";

export const loader = async ( { request } ) => {
    let url = new URL(request.url)
    let params = url.searchParams.get("q")

    try {
        // use & instead of ? if ? exist in api route
        let response = await fetch(`http://localhost:4000/blogposts?embed=comments${params ? `&q=${params}` : ""}`, {
            // standard method is GET for fetch
        })

        
        let result =  await response.json()
        // let filtered = await result.filter(singlePost => singlePost.title.includes(params))
        return result;

    } catch (error) {
        return error;
    }

};

const Search = () => {
    //const [searchParams] = useSearchParams();
    //console.log(searchParams.get("q"));
    let posts = useLoaderData();
    
    
    /*React uses key prop to identify different elements*/
   
    return (
        <>
        <SearchBox />
            <h1>Random title</h1>

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
 
export default Search;
