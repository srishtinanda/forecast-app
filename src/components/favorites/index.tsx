import React from 'react'
import { Form } from 'react-bootstrap'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { fetchWeatherByLocation, selectedLocation } from '../../redux/locationSlice'
import { LocationState } from '../../types'
import './favorites.scss'

const Favorites = () => {
  const favorites = useAppSelector((state) => state.location.favorites);
  const dispatch = useAppDispatch();

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idSelected = e.target.value
    const location = favorites.find((item: LocationState) => item.id.toString() === idSelected)
    console.log(location, 'chcck wevlaie', favorites, idSelected)
    dispatch(fetchWeatherByLocation(location));
    dispatch((selectedLocation(location)))
  }
  return (
    <div className='favourite'>
      <Form.Select onChange={(e) => handleOnChange(e)} defaultValue={'Fav'} disabled={!favorites.length}>
        <option value="Fav" disabled>Favorites...</option>
        {favorites?.map(item => (
          <option key={item.id} value={item.id}>{`${item.name}, ${item.country}`}</option>
        ))}
    </Form.Select>
    </div>
  );
}

export default React.memo(Favorites);
