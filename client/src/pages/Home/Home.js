import Sidebar from '../../components/Header/Sidebar'
import {Link} from "react-router-dom";
import './Home.css'


function Home() {
    return (
        <div>
            <Sidebar/>
            <div className='hori-bar'>
                <Link to="/new_recipe">
                    <button>
                        New Recipe
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Home;
