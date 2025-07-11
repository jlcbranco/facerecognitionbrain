import './ImageLinkForm.css'

export default function ImageLinkFor({ handleInput, handleButton }) {
    return (
        <div>
            <p className='f3'>
                { 'This Magic Brain will detect faces in your pictures. Give it a try!' }
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input type="text" className='f4 pa2 w-70 center' onChange={handleInput} />
                    <button className='f4 grow w-30 link ph3 pv2 dib white bg-light-purple' onClick={handleButton}>Detect</button>
                </div>
            </div>
        </div>
    )
}