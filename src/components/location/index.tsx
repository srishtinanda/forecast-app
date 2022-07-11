import React from 'react'
import { useState, Fragment, useRef } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { useAppDispatch } from '../../redux/hooks'
import { selectedLocation, fetchWeatherByLocation } from '../../redux/locationSlice'
import './location.scss'

const SEARCH_URI = 'https://geocoding-api.open-meteo.com/v1/search?name=';

const LocationField = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<any>([]);
  
  const handleSearch = (query: any) => {
    setIsLoading(true);

    fetch(`${SEARCH_URI}${query}&language=English`)
      .then((resp) => resp.json())
      .then((data) => {
        const options = data?.results?.map((i: any) => ({
          name: i.name,
          id: i.id,
          country: i.country,
          long: i.longitude,
          lat: i.latitude
        }));

        setOptions(options);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const typeaheadRef: any = useRef(null);

  return (
    <div className='location-input'>
    <AsyncTypeahead
      filterBy={() => true}
      id="find-location"
      isLoading={isLoading}
      ref={typeaheadRef}
      labelKey={(options: any) => `${options.name} (${options.country}, latitude: ${options.lat}, longitude: ${options.long})`}
      minLength={3}
      onSearch={handleSearch}
      options={options}
      placeholder="Search for a Location..."
      onChange={(selected) => {
        dispatch(fetchWeatherByLocation(selected[0]))
        dispatch((selectedLocation(selected[0])))
        if (selected.length){
            typeaheadRef.current.clear()
        }
        }}
      renderMenuItemChildren={(options: any, props: any) => (
        <Fragment key={options.id}>
          <span>{`${options.name} (${options.country}, latitude: ${options.lat}, longitude: ${options.long})`}</span>
        </Fragment>
      )}
    />
    </div>
  );
};

export default React.memo(LocationField)
