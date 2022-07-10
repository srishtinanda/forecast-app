import { Card, Button } from 'react-bootstrap'
import logo from '../assets/forecast.png'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { addToFav } from '../redux/locationSlice'
import { LocationState } from '../types'
import Weather from './Weather';

const Details = () => {
    const location = useAppSelector((state) => state.location);
    const dispatch = useAppDispatch();

    const findIfExist = location.favorites.find((item: LocationState) => item.id === location?.location.id)

    const handleClick = () => {
        dispatch(addToFav(location.location))
    }
    return (
        <Card className='details'>
            {location.location && Object.keys(location.location).length ? (<div>
                <div className='selected-location-container'>
                    <div>
                        <h2>{`${location.location.name}(${location.location.country})`}</h2>
                        <div>Longitude: {location.location.long}, Latitude: {location.location.lat}</div>
                    </div>
                    <Button disabled={!!findIfExist} variant="secondary" onClick={() => handleClick()}>
                        Add to favorites</Button>
                </div>
                <Weather />
            </div>)

                : (<>
                    <div>
                        <img src={logo} className="App-logo" alt="logo" />
                    </div>
                    <div>
                        <h3> Welcome to MY FORECAST Page !</h3>
                        <div>You can easily check the weather forecast for any location in the World.
                            <br /> Just search for it or select location from your favorite list.</div>
                    </div>
                </>)}
        </Card>
    );
}

export default Details;
