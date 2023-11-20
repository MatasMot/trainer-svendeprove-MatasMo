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
            <p>Trainer picture: </p>
            <img src={trainer?.asset.url} alt={trainer?.trainerName} />

        </>
    );
}
 
export default Trainer;