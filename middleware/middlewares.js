export const validImg = (value) => {
    if(value &&  value?.images &&  value?.images.length > 0 && value?.images[0]?.path){
        return {uri: value.images[0].path}
    }
    return require('../assets/image/Church.png')
}
export const validImages = (value) => {
    if(value &&  value?.images &&  value?.images.length > 0 && value?.images[0]?.path){
        return value.images.map((item, index) => item?.path && ({image: item.path, id: index}))
    }
    return [require('../assets/image/Church.png'),require('../assets/image/Church.png'),require('../assets/image/Church.png'),]
}
export const validPointsImages = (value) => {
    if(value &&  value?.points &&  value.points?.length > 0){
        return value.points.filter(item => item.point_type === 'stop').map((item, index) =>
            ({image: {uri: item.images[0].path}, id: index, title: item.name, order: item.order}))
    }
    return [
        {
            image: require('../assets/image/Church.png'),
            title: 'Test 1',
            id: 0
        },
        {
            image: require('../assets/image/Church.png'),
            title: 'Test 2',
            id: 1
        },
        {
            image: require('../assets/image/Church.png'),
            title: 'Test 3',
            id: 2
        }
    ]
}

export function randomName(length = 20) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}