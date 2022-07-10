import { Card, Badge } from 'react-bootstrap'
import './App.scss';
import Details from './components/Details';
import Favorites from './components/Favorites';
import LocationField from './components/Location';

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
