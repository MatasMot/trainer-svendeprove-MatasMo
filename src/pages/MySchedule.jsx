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

    const navigate = useNavigate();

    const handleDeleteFromClass = async (classId) => { 
        let token = Cookies.get("token");
        let userId = Cookies.get("userId");

        //console.log(token);
        //console.log(userId);
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
            <div className="fixed left-0 top-[6rem] ml-4"> 
                {data.classes.length ? data.classes.map(singleClass => (
                    <article className="border-solid rounded-lg border-2 border-[#D4D4D4] mt-4 w-[335px] h-[100px] bg-[#D4D4D4]" key={singleClass.id}>
                        <p className="font-semibold text-[20px] mx-4 mt-3">{singleClass.className}</p>
                        <div className="flex justify-between items-center mx-4 text-[16px]">
                            <p>{singleClass.classDay} - {singleClass.classTime}</p>
                            <button className="rounded-full bg-red-800 text-white px-4 py-2 text-[1rem]" onClick={() => handleDeleteFromClass(singleClass.id)}>&times;</button>
                        </div>
                    </article>
                )) : (<p>You don't have any booked workouts...</p>)}
            </div>
        </>
    );
}
 
export default MySchedule;