import React, { useState, useEffect } from "react";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import Trainer from "../components/Trainer"
import Cookies from "js-cookie";
import Ratings from "../components/Ratings";
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
    const navigate = useNavigate();

    
    const handleRateClass = async () => {
        let token = Cookies.get("token");
        let userId = Cookies.get("userId");

        console.log("Rate Class");


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
                    navigate("/mySchedule")
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
            navigate("/login")
        }

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
                    navigate("/mySchedule")
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
            navigate("/login")
        }
    }
    

    return (
        <>
                <article>

                    <div className="relative">
                        <img className="h-[50vh] w-full object-cover" src={data.singleClass.asset.url} alt={data.singleClass.className} />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent h-[215px]">
                            <h2 className="font-bold text-[36px] text-[#F1C40E] ml-4">{data.singleClass.className}</h2>
                            <div className="absolute bottom-8 text-[#F1C40E] font-semibold text-[14px] mx-4 flex items-center">
                                <Ratings singleClassId={data.singleClass.id}/>
                                <button className="py-2 px-8 border-2 rounded-full border-[#F1C40E] font-semibold text-[#F1C40E] ml-[12rem]" onClick={handleRateClass}>RATE</button>
                            </div>
                        </div>
                    </div>

                    <p className="text-[16px] ml-4 mt-4">{data.singleClass.classDay} - {data.singleClass.classTime}</p>

                    <p className="ml-4 mt-4">{data.singleClass.classDescription}</p>

                    <div className="bottom-10 absolute">
                        <h3 className="font-bold text-[20px] ml-4 mt-4">Trainer</h3>

                        <article className="ml-4 mt-4">
                            <div className="flex gap-4">
                                <Trainer trainerId={data.singleClass.trainer.id}/>
                                <p className="pt-4 font-semibold ">{data.singleClass.trainer.trainerName}</p>
                            </div>
                        </article>

                        <button className="rounded-full border-[1px] border-[#707070] bg-[#F1C40E] font-semibold text-[14px] py-4 px-8 mx-4 mt-4 w-[334px]" onClick={handleSignUpToClass}>SIGN UP</button>
                    </div>

                </article>
        </>
    );
}
 
export default SingleClass;