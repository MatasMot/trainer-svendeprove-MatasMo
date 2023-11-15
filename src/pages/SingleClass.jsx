import { useLoaderData, Link } from "react-router-dom";
import Ratings from "../components/Ratings"
// import LeaveComment from "../components/LeaveComment";


export const loader = async ({params}) => {
    //console.log(params)
    try {
        let response = await fetch(`http://localhost:4000/api/v1/classes/${params.id}`, {
            // standard method is GET for fetch
        })

        
        return await response.json()
    } catch (error) {
        return error;
    }
};

const SingleClass = () => {
    let singleClass = useLoaderData();
    //console.log(singleClass);
    return (
        <>
            <h1>Single Class</h1>
                <article key={singleClass.id}>
                    <p>Class Name: {singleClass.className}</p>
                    <img src={singleClass.asset.url} alt="url" />
                    <Ratings />


                    
                </article>
                {/*<LeaveComment blogpostId={post.id}/>*/}
        </>
    );
}
 
export default SingleClass;