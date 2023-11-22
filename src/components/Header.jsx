import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [headline, setHeadline] = useState();

    useEffect(() => {
        if (location.pathname === "/") {setHeadline("")} 
        else if (location.pathname === "/classes") {setHeadline("Popular Classes")}
        else if (location.pathname === "/search") {setHeadline("Search")}
        else if (location.pathname === "/mySchedule") {setHeadline("My Schedule")}
        else {setHeadline("")}
    }, [location]);

    const handleGoBack = () => {
        navigate("/classes");
    };

    return ( 
        <>
            <header className="flex items-center fixed gap-4 top-3 left-4 text-black">
                <button className="text-[3rem] text-[#898989]" onClick={handleGoBack}>&laquo;</button>
                <h1 className="text-[24px] pt-[10px]">{headline}</h1>
            </header>
        </>
    );
}
 
export default Header;