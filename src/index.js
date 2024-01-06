import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useRefresh} from './hooks'
import {selectRefreshValue} from './slices/refreshSlice'
import {AdaptiveWrapper, CustomRefresh, Header, Producto} from './components'
import {MAX_SWIPE_SCROLL} from './constantes'
import {data} from './data'

export default () => {
    const refreshValue = useSelector(selectRefreshValue)

    const {swipe, handlers} = useRefresh({MAX_SWIPE_SCROLL: MAX_SWIPE_SCROLL})

    useEffect(() => {
        getInformation()
    }, [refreshValue])

    const getInformation = () => {
        console.log('Trae info de API')
    }
    
    return(
        //Pase el Header como Prop para hacer reutilizable el header y que ustedes le pasen el propio
        <CustomRefresh Header={Header} swipe={swipe} handlers={handlers}>
            <AdaptiveWrapper Item={Producto} data={data} margin={20}/>
        </CustomRefresh>
    )
}