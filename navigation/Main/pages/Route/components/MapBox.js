import React from 'react';

export const MapBox = ({points, data, screen, numbersImg = () => {}}) => {
    const handlerImage = (value) => {
        return value.images.length > 0 ?
            {uri: value.images[0].path} :
            require('../../../../../assets/image/Church.png')
    }


    return (<></>)
}