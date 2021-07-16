import './Sidebar.css';
import logo from './logo.png';
import {Link} from "react-router-dom";
import { SidebarData } from '../../components/SideBarData';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="head">
                <img src={logo} alt='chopsticks' height="44"/>
                <h1>RICE BOWL</h1>
            </div>
            
            <nav className='navbar'>
                <ul className='nav-items'>
                    {SidebarData.map((item, index) =>{
                        return(
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
