import './Title.css';
import chopsticks from './chopsticks.png';

function Title() {
    return (
        <div className="Title">
            <h1>RICE BOWL</h1>
            <img src={chopsticks} alt='chopsticks' height="34"/>
        </div>
    )
}

export default Title
