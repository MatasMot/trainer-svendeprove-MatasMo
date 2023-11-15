import { Outlet, useNavigation } from 'react-router-dom';
// import Cookies from 'js-cookie';

import Navigation from './components/Navigation';
import Header from './components/Header';
import Footer from './components/Footer';

const Layout = () => {
    const navigation = useNavigation();
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
            <footer>
                <Footer />
            </footer>
        </> 
    );
}
 
export default Layout;