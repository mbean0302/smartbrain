import React from "react";

const FaceRecognition = ({ imageUrl }) => {
    return (
        <div className='center ma'>
            <div className='mt2'>
                <img id="inputImage" src={imageUrl} alt="facial-recognition" width='500px' height='auto'/>
            </div>
        </div>
    );
};

export default FaceRecognition;
