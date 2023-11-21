import { Outlet, useNavigation, useLocation } from 'react-router-dom';
// import Cookies from 'js-cookie';

import Navigation from './components/Navigation';
import Header from './components/Header';

const Layout = () => {
    const navigation = useNavigation();
    let location = useLocation();
    console.log(location.pathname);
    // const token = Cookies.get("token")

    return ( 
        <>
            <header>
                <Header />
                <Navigation />
            </header>
            <main>
                {navigation.state === "loading" ? <p>Loading...</p> : <Outlet />}
            </main>
        </> 
    );
}
 
export default Layout;