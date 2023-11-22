import { useLoaderData, Link, useSearchParams, useNavigate } from "react-router-dom";
import Ratings from "../components/Ratings";


// the loader function runs before the component function is mounted in the browser
export const loader = async () => {
    

    try {
        // use & instead of ? if ? exist in api route
        let response = await fetch(`http://localhost:4000/api/v1/classes`, {
            // standard method is GET for fetch
        })

        return await response.json()
        
    } catch (error) {
        return error;
    }

};

const Classes = () => {


    let classes = useLoaderData();
    
    /*React uses key prop to identify different elements*/

    const noOfClasses = classes.length;

    const randomClass = Math.floor(Math.random() * noOfClasses);

    
    return (
        <>
            <div className="fixed left-0 top-[6rem]">

                <section className="h-[404px] w-[335px] mx-auto rounded-xl overflow-hidden relative">
                    <Link to={`/class/${classes[randomClass].id}`}>
                        <img className="w-full h-full object-cover" src={classes[randomClass].asset.url} alt="" />
                        <h2 className="absolute bottom-0 left-0 bg-[#F1C40E] p-4 pr-8 rounded-tr-[3rem] font-semibold">
                            {classes[randomClass].className}
                            <Ratings singleClassId={classes[randomClass].id}/>
                        </h2>
                    </Link>
                </section>
                


                <h1 className="text-[20px] font-bold ml-4 mt-12">Classes for you</h1>
                <section className="flex overflow-x-scroll gap-4 scrollbar-hide ml-4 mt-4">
                    {classes.map(singleClass => (
                        <Link to={`/class/${singleClass.id}`} className="basis-[128px] grow-0 shrink-0 h-[145px] relative" key={singleClass.id}>
                            <div>
                                <img className=" object-cover h-[145px] rounded-xl" src={singleClass.asset.url} alt={singleClass.className} />
                                <div className="overlay absolute bottom-0">
                                    <div className="rounded-tr-[3rem] rounded-bl-xl bg-[#F1C40E] p-2 w-[110px] h-[80px] relative">
                                        <div className="absolute bottom-1 left-2">
                                            <p className="text-[12px] font-bold ">{singleClass.className}</p>
                                            <Ratings singleClassId={singleClass.id}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </section>
            </div>
        </>
    );
}
 
export default Classes;