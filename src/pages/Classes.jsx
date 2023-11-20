import { useLoaderData, Link, useSearchParams, useNavigate } from "react-router-dom";


// the loader function runs before the component function is mounted in the browser
export const loader = async () => {
    // let url = new URL(request.url)
    // let params = url.searchParams.get("q")

    try {
        // use & instead of ? if ? exist in api route
        let response = await fetch(`http://localhost:4000/api/v1/classes`, {
            // standard method is GET for fetch
        })

        
        return await response.json()
        
    } catch (error) {
        return error;
    }

};

const Classes = () => {
    //const [searchParams] = useSearchParams();
    //console.log(searchParams.get("q"));

    // variables contains data returned from the loader function
    let classes = useLoaderData();
    //let navigate = useNavigate();
    
    /*React uses key prop to identify different elements*/
    console.log(classes);
    const noOfClasses = classes.length;
    console.log(noOfClasses);
    const randomClass = Math.floor(Math.random() * noOfClasses);

    return (
        <>
            <h1>Popular Classes</h1>
            <section className="h-[40vh] rounded-2xl overflow-hidden relative">
                <Link to={`/class/${classes[randomClass].id}`}>
                    <img className="w-full h-full object-cover" src={classes[randomClass].asset.url} alt="" />
                    <p className="absolute bottom-0 left-0 bg-red-700 p-4 pr-8 rounded-tr-[3rem]">{classes[randomClass].className}</p>
                    {/*<p className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-red-700 p-4 pr-8 text-center">{posts[randomPost].title}</p>*/}
                </Link>
            </section>
            
            <h1>Classes for you</h1>
            <section className="flex overflow-x-scroll gap-4 scrollbar-hide">
                {classes.map(singleClass => (
                        <article className="basis-[380px] grow-0 shrink-0" key={singleClass.id}>
                            <Link to={`/class/${singleClass.id}`}>
                                <p>Class name: {singleClass.className}</p>
                                <img className="rounded-tl-[5rem]" src={singleClass.asset.url} alt="url" />
                                {/*<p>Author: {classes.author}</p>
                                <p>Comments: {classes.comments.length}</p>
                                <p className="line-clamp-3">{classes.content}</p>
                                <Link to={`/blog/${classes.id}`}>Read More</Link>*/}
                            </Link>
                        </article>
                ))}
            </section>
        </>
    );
}
 
export default Classes;