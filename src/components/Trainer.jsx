import React, { useState, useEffect } from "react";

const Trainer = (trainerId) => {

    console.log(trainerId);

    const [trainer, setTrainer] = useState();

    useEffect(() => {
            fetch(`http://localhost:4000/api/v1/trainers/${trainerId.trainerId}`)
            .then(resTrainer => resTrainer.json())
            .then(dataTrainer => setTrainer(dataTrainer))
    }, []);
    
    console.log(trainer);

    return ( 
        <>
            <img className="w-[88px] h-[88px] object-cover rounded-xl" src={trainer?.asset.url} alt={trainer?.trainerName} />
        </>
    );
}
 
export default Trainer;