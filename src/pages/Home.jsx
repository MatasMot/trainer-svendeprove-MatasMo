import { useNavigate } from "react-router-dom";


const Home = () => {

    let navigate = useNavigate();
    //navigate("/classes")

    const handleNavigation = () => {
        navigate("/classes")
    }

    return ( 
        <>
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

            <div className="h-[50vh] overflow-hidden">
                <div className="absolute top-[170px]">
                    <h1 className="text-[#F1C40E] font-bold text-[56px] ml-12">Believe Yourself</h1>
                    <div className="flex items-center gap-4">
                        <div className="bg-white w-8 h-0.5 "></div>
                        <p className="text-white font-bold text-[20px]">Train like a pro</p>
                    </div>
                </div>
                <img className="object-cover object-center h-full w-full" src="public/assets/welcomeBackground.jpg" alt="" />
            </div>

            <div className="h-[50vh] overflow-hidden">
                <div className="absolute bottom-[50px] left-[100px]">
                    <button className="bg-[#F1C40E] rounded-full py-2 px-6 font-semibold text-[14px] w-[178px] h-[50px]" onClick={handleNavigation}>START TRAINING</button>
                </div>

                <img className="object-cover object-center h-full w-full" src="public/assets/welcomeCenter.jpg" alt="" />
            </div>
        </>
    );
}
 
export default Home;