import { Card } from 'react-bootstrap'
import logo from '../assets/w_logo.png';
import { useAppSelector } from '../redux/hooks'
import { RootState } from '../store';
import { monthMapper } from '../helpers/monthMapper';

const formattedTime = (input: string) => {
    const dateArr = input.split('-')
    const day = dateArr[2]
    const month = dateArr[1] as keyof typeof monthMapper
    const monthValue = monthMapper[month]
    return `${day} ${monthValue}`
}

const Weather = () => {
    const { dailyWeather, unit } = useAppSelector((state: RootState) => state.location);
    return (
        <div className='weather'>
            {dailyWeather?.time?.map((time: string, i: number) => (
                i < 5 && (
                <Card border='dark' key={time}>
                    <Card.Body>
                        <Card.Title>{formattedTime(time)}</Card.Title>
                        <Card.Img variant="top" src={logo} />
                        <Card.Text>
                            <span>
                                <span className='temp-label'>Min temp: </span>
                                {dailyWeather.apparent_temperature_min[i]}{unit}
                            </span>
                            <span>
                                <span className='temp-label'>Max temp: </span>
                                {dailyWeather.apparent_temperature_max[i]}{unit}
                            </span>
                        </Card.Text>
                    </Card.Body>
                </Card>
            )
            ))}
        </div>
    );
}

export default Weather;
