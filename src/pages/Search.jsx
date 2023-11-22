import { useLoaderData, Link, useSearchParams } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import Ratings from "../components/Ratings";
import SingleClass from "./SingleClass";
import Trainer from "../components/Trainer";

export const loader = async ( { request } ) => {
    let url = new URL(request.url)
    let params = url.searchParams.get("q")

    try {
        let response = await fetch(`http://localhost:4000/api/v1/classes`, {
            // standard method is GET for fetch
        })

        let result =  await response.json()
        //console.log(result);

        if (!params) {
            return result;
        }

        let filtered = result.filter(singleClass => 
            singleClass.className.toLowerCase().includes(params.toLowerCase()) || 
            singleClass.classDay.toLowerCase().includes(params.toLowerCase()) || 
            singleClass.trainer.trainerName.toLowerCase().includes(params.toLowerCase()) || 
            singleClass.classDescription.toLowerCase().includes(params.toLowerCase()) || 
            singleClass.classTime.toLowerCase().includes(params.toLowerCase())
        );

        return filtered;

    } catch (error) {
        return error;
    }

};

const Search = () => {

    let classes = useLoaderData();
    console.log(classes);
    
    return (
        <>
            <div className="fixed left-0 top-[6rem]">

                <SearchBox />

                {classes.length === 0 ? 
                    <p className="text-[20px] font-bold ml-4 mt-4">Your search did not give any results. Try to search for something else...</p> : 

                    <div>
                        <h1 className="text-[20px] font-bold ml-4 mt-4">Popular classes</h1>
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
                        
                        <h1 className="text-[20px] font-bold ml-4 mt-4">Popular Trainers</h1>
                        <section className="ml-4 mt-4">
                                {classes.map(singleClass => (
                                    <article className="mt-4" key={singleClass.id}>
                                        <div className="flex gap-4">
                                            <Trainer trainerId={singleClass.trainer.id}/>
                                            <p className="pt-4 font-semibold ">{singleClass.trainer.trainerName}</p>
                                        </div>
                                    </article>
                                ))}
                        </section>
                    </div>
                }

            </div>
        </>
    );
}
 
export default Search;
