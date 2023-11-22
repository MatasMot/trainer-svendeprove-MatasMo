import React, { useState, useEffect } from "react";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import Trainer from "../components/Trainer"
import Cookies from "js-cookie";
import Ratings from "../components/Ratings";

export const loader = async ({params}) => {
    
    let token = Cookies.get("token");
    let userId = Cookies.get("userId");


    const [singleClass, schedule] = await Promise.all([
      fetch(`http://localhost:4000/api/v1/classes/${params.id}`).then(res => res.json()),
      token && fetch(`http://localhost:4000/api/v1/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(res => res.json())

    ]);
  
    return { singleClass, schedule };
}


const SingleClass = () => {
    let data = useLoaderData();
    console.log(data);

    const navigate = useNavigate();
    let token = Cookies.get("token");
    
    
    const handleSignUpToClass = async () => {
        let token = Cookies.get("token");
        let userId = Cookies.get("userId");


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

                    console.log('POST request successful');

                } else {

                    console.error('POST request failed:', response.status);

                }
            } catch (error) {
                console.error('Error during POST request:', error.message);
            }
        } else {
            console.log("You need to login first");
            navigate("/login")
        }
    }


    const handleDeleteFromClass = async (classId) => { 
        let token = Cookies.get("token");
        let userId = Cookies.get("userId");


        console.log(classId);

        if (token) {
            try {
                let response = await fetch(`http://localhost:4000/api/v1/users/${userId}/classes/${classId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                console.log(response)

                if (response.ok) {
                    navigate("/mySchedule")

                    console.log('POST request successful');

                } else {

                    console.error('POST request failed:', response.status);

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
                                <button className="py-2 px-8 border-2 rounded-full border-[#F1C40E] font-semibold text-[#F1C40E] ml-[12rem]">RATE</button>
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
                            
                                <article >
    
                                    {
                                        token && data.schedule.classes.some(singleSchedule => singleSchedule.id === data.singleClass.id) ?
                                        <button className="rounded-full border-[1px] border-[#707070] bg-[#F1C40E] font-semibold text-[14px] py-4 px-8 mx-4 mt-4 w-[334px]" onClick={() => handleDeleteFromClass(data.singleClass.id)}>LEAVE</button> :
                                        token && <button className="rounded-full border-[1px] border-[#707070] bg-[#F1C40E] font-semibold text-[14px] py-4 px-8 mx-4 mt-4 w-[334px]" onClick={handleSignUpToClass}>SIGN UP</button>
                                    }
    
                                </article>
                                
                    
                    </div>

                </article>
        </>
    );
}
 
export default SingleClass;