import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


const Header = () => {
    const location = useLocation();

    const [headline, setHeadline] = useState();

    useEffect(() => {
        if (location.pathname === "/") {setHeadline("Home")} 
        else if (location.pathname === "/blog") {setHeadline("Blog Posts")}
        else if (location.pathname === "/login") {setHeadline("Log-in")}
        else {setHeadline("")}
    }, [location]);

    return ( 
        <>
            <header className="h-8 mt-10 pl-8">
                <h1 className="text-2xl">{headline}</h1>
            </header>
        </>
    );
}
 
export default Header;