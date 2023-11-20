import { useState } from "react";
import Cookies from "js-cookie";
import { useLoaderData, useNavigate } from "react-router-dom";
//http://localhost:4000/api/v1/users/3


export const loader = async () => {
    let token = Cookies.get("token");
    let userId = Cookies.get("userId");
    //console.log(token, userId);

    try {
        let response = await fetch(`http://localhost:4000/api/v1/users/${userId}`, {
            // standard method is GET for fetch
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        
        return await response.json()
    } catch (error) {
        return error;
    }

};


const MySchedule = () => {
    const data = useLoaderData();
    console.log(data);
    // const navigate = useNavigate();
    
    return ( 
        <>
            <h1>My Shedule</h1>
            {data.classes.length ? data.classes.map(singleClass => (
                <article className="border-solid rounded-lg border-2 border-sky-500" key={singleClass.id}>
                    <p>Class name: {singleClass.className}</p>
                    <p>Class day: {singleClass.classDay}</p>
                    <p>Class time: {singleClass.classTime}</p>
                </article>
            )) : (<p>You don't have any booked workouts...</p>)}
        </>
    );
}
 
export default MySchedule;