import React, { useState, useEffect } from "react";
import { useLoaderData, Link, Navigate } from "react-router-dom";
import Trainer from "../components/Trainer"
import Cookies from "js-cookie";
// import LeaveComment from "../components/LeaveComment";

export const loader = async ({params}) => {
    // console.log(params)
    const [singleClass, ratings] = await Promise.all([
      fetch(`http://localhost:4000/api/v1/classes/${params.id}`).then(res => res.json()),
      fetch(`http://localhost:4000/api/v1/classes/${params.id}/ratings`).then(res => res.json()),
    ]);
  
    return { singleClass, ratings };
}

/*
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
*/

const SingleClass = () => {
    let data = useLoaderData();
    console.log(data);
    //let classId = data.singleClass.id;

    
    const handleRateClass = async () => {
        console.log("Rate Class");
    }
    
    
    const handleSignUpToClass = async () => { 
        let token = Cookies.get("token");
        let userId = Cookies.get("userId");

        //console.log(token);
        //console.log(userId);
        //console.log(data.singleClass.id);

        if (token) {
            try {
                let response = await fetch(`http://localhost:4000/api/v1/users/${userId}/classes/${data.singleClass.id}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                console.log(response)

                if (response.ok) {
                    //Navigate("/mySchedule")
                    // Request was successful
                    console.log('POST request successful');
                    // Additional actions can be performed here after a successful request
                } else {
                    // Server returned an error status
                    console.error('POST request failed:', response.status);
                    // You can handle the error or throw an exception
                }
            } catch (error) {
                console.error('Error during POST request:', error.message);
            }
        } else {
            console.log("You need to login first");
            //Navigate("/login")
        }
    }
    

    return (
        <>
                <h1>Single Class</h1>
                <article key={data.singleClass.id}>
                    <p>Class Name: {data.singleClass.className}</p>
                    <img src={data.singleClass.asset.url} alt={data.singleClass.className} />

                    <p>All Ratings:</p>
                    {data.ratings.length ? data.ratings.map(rating => (
                        <article key={rating.id}>
                            <p>The rating: {rating.rating}</p>
                        </article>
                    )) : (<p>The Class have no ratings</p>)}

                    <button className="border-solid border-2 border-sky-500" onClick={handleRateClass}>RATE</button>
                    <p>Day: {data.singleClass.classDay}</p>
                    <p>Time: {data.singleClass.classTime}</p>
                    <p>Description: {data.singleClass.classDescription}</p>
                    <h3>Trainer</h3>

                    <Trainer trainerId={data.singleClass.trainer.id} />

                    <p>Trainer Name: {data.singleClass.trainer.trainerName}</p>

                    <button className="border-solid border-2 border-sky-500" onClick={handleSignUpToClass}>SIGN UP</button>
                </article>
                {/*<LeaveComment blogpostId={post.id}/>*/}
        </>
    );
}
 
export default SingleClass;