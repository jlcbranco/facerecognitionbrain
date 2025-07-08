import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';

export default function Logo() {
    return (
        <div className="ma4 mt0 flex">
            <Tilt tiltMaxAngleX={55} tiltMaxAngleY={55} className='tilt br2 shadow-2'>
                <div className='pa3'>
                    <img style={{paddingTop: '5px'}} src={brain} alt="brain" />
                </div>
            </Tilt>
        </div>
    )
}