import { Card, Badge } from 'react-bootstrap'
import './App.scss';
import Details from './components/details/index'
import Favorites from './components/favorites/index'
import LocationField from './components/location/index'

const App = () => {
  return (
    <div className='app-container'>
      <Card border="dark" className='container-card'>
        <h1>
          <Badge bg="secondary">My Forecast</Badge>
        </h1>
        <div className='location-section'>
          <LocationField />
          <Favorites />
        </div>
        <Details />
      </Card>
    </div>
  );
}

export default App;
