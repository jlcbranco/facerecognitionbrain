import './FaceRecognition.css'

export default function FaceRecognition({ imageUrl, imageBox }) {
    if(imageUrl) {
        return (
            <div className='center ma'>
                <div className='absolute mt2'>
                    <img id='inputimage' src={imageUrl} width='500px' height='auto' alt="image" />
                    <div 
                        className='bounding-box' 
                        style={
                            { 
                                top: imageBox.topRow, 
                                right: imageBox.rightCol,
                                bottom: imageBox.bottomRow,
                                left: imageBox.leftCol
                             }
                        }>
                    </div>
                </div>
            </div>
        )
    }
}