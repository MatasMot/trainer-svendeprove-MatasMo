import { useLoaderData, Link, useSearchParams } from "react-router-dom";


// the loader function runs before the component function is mounted in the browser
export const loader = async (id) => {
    console.log(id)
    // let url = new URL(request.url)
    // let params = url.searchParams.get("q")

    try {
        // use & instead of ? if ? exist in api route
        let response = await fetch(`http://localhost:4000/api/v1/classes/2/ratings`, {
            // standard method is GET for fetch
        })

        return await response.json()
        
    } catch (error) {
        return error;
    }
};


const Ratings = ({id}) => {
    console.log(id);
    //const [searchParams] = useSearchParams();
    //console.log(searchParams.get("q"));

    // variables contains data returned from the loader function
    let ratings = useLoaderData(id);
    
    /*React uses key prop to identify different elements*/

    console.log(ratings);

    // const noOfClasses = classes.length;
    // console.log(noOfClasses);
    // const randomClass = Math.floor(Math.random() * noOfClasses);

    return (
        <>
            <h1>Ratings</h1>
            <p>{ratings.classDay}</p>
            
        </>
    );
}
 
export default Ratings;