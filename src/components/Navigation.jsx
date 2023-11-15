import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isShown, setIsShown] = useState(false);
    const [token, setToken] = useState();

    useEffect(() => {
        setToken(Cookies.get("token"));
        setIsShown(false)
    }, [location]);

    const handleLogout = () => {
        Cookies.remove("token");
        Cookies.remove("userId");
        navigate("/");
    }

    const showMenu = () => setIsShown(true)
    const hideMenu = () => setIsShown(false)

    return ( 
        <>
            <nav className={`fixed z-20 top-0 w-full ${isShown ? "left-0 backdrop-blur-sm" : "-left-full"} h-screen bg-white py-32 items-center
                             md:static md:h-auto md:p-4 
                             flex flex-col md:flex-row gap-16
                             `}>
                <button onClick={showMenu} className={`fixed ${isShown && "hidden"} top-3 right-6 text-black text-[3rem] md:hidden`}>&equiv;</button>
                <button onClick={hideMenu} className='absolute top-3 right-6 text-black text-[3rem] md:hidden'>&times;</button>

                <Link to="/">Home</Link>
                {/*<Link to="/blog">Blog</Link>*/}
                {/*token && (<Link to="/users">Users</Link>)*/}
                {token ? <button onClick={handleLogout}>Log out</button> : <Link to="/login">Login</Link>}
            </nav>
        </> 
    );
}
 
export default Navigation;