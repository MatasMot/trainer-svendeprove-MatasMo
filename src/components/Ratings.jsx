import { useEffect, useState } from "react";
import { useLoaderData, Link, useSearchParams } from "react-router-dom";


// the loader function runs before the component function is mounted in the browser
/*
export const loader = async ( {singleClassId} ) => {
    console.log(singleClassId)
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
*/


const Ratings = ({ singleClassId }) => {

    //console.log(singleClassId)

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:4000/api/v1/classes/${singleClassId}/ratings`);
            const result = await response.json();
            setData(result);
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
    }, [singleClassId]);

    //console.log(data);


    // Function to calculate average rating
    const calculateAverageRating = () => {
        if (!data || data.length === 0) {
            return 0; // or any default value
        }

        const allRatings = data.map(rating => rating.rating);
        const sumOfRatings = allRatings.reduce((acc, rating) => acc + rating, 0);
        const averageRating = sumOfRatings / allRatings.length;

        return averageRating;
    };

    /*
    // Assuming data is an array of objects with a 'rating' property
    const allRatings = data.flatMap(item => item.rating || []);
    
    // Check if there are any ratings before calculating average
    if (allRatings.length === 0) {
      return 0; // or any default value
    }

    const sumOfRatings = allRatings.reduce((acc, rating) => acc + rating, 0);
    const averageRating = sumOfRatings / allRatings.length;
    */

    /*
    const sum = data.reduce((acc, current) => acc + current, 0);
    const average = sum / data.length;
    console.log(average);
    */

    //console.log(id);
    //const [searchParams] = useSearchParams();
    //console.log(searchParams.get("q"));

    // variables contains data returned from the loader function
    //let ratings = useLoaderData();
    //console.log(ratings);
    
    /*React uses key prop to identify different elements*/

    //console.log(ratings);

    // const noOfClasses = classes.length;
    // console.log(noOfClasses);
    // const randomClass = Math.floor(Math.random() * noOfClasses);

    return (
        <>
            {loading ? (<p>Loading...</p>) : (
                <p className="text-[12px]">{calculateAverageRating()} / 5 Stars</p>
            )}
            
        </>
    );
}
 
export default Ratings;