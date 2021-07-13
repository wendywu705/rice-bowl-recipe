import Title from '../../components/Header/Title'
import './Home.css'
import {Link} from "react-router-dom";

function Home() {
    return (
        <div>
            <Title/>
            <h1 className='nav'>Navigation</h1>

            <div className='buttons'>
                <Link to="/">
                    <button>
                        Home
                    </button>
                </Link>
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
