import { useEffect, useState } from "react";
import { useLoaderData, Link, useSearchParams } from "react-router-dom";



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


    const calculateAverageRating = () => {
        if (!data || data.length === 0) {
            return 0; 
        }

        const allRatings = data.map(rating => rating.rating);
        const sumOfRatings = allRatings.reduce((acc, rating) => acc + rating, 0);
        const averageRating = sumOfRatings / allRatings.length;

        return averageRating;
    };

    return (
        <>
            {loading ? (<p>Loading...</p>) : (
                <p className="text-[12px]">{calculateAverageRating()} / 5 Stars</p>
            )}
            
        </>
    );
}
 
export default Ratings;