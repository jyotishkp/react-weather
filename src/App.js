import React, { Component } from 'react';
import Moment from 'react-moment';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Navbar from 'react-bootstrap/Navbar';

import './css/App.css';
import './css/owfont-regular.min.css';
import getWeather from './api';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      weather: {},
      sunrise: '',
      sunset: '',
      main: '',
      wind: ''
    }
  }

  componentDidMount() {
    let that = this;
    navigator.geolocation.getCurrentPosition(getWeatherData);

    function getWeatherData(position) {
      getWeather(position).then(res => {

        let dayNight = res.data.weather[0].icon.split('')[2] === 'd' ? 'day' : 'night';

        that.setState({
          weather: res.data.weather[0],
          sunrise: res.data.sys.sunrise,
          sunset: res.data.sys.sunset,
          main: res.data.main,
          wind: res.data.wind,
          place: res.data.name,
          dayNight: dayNight
        });
      });
    }
  }

  render() {
    let hasTemp = this.state.main.temp;
    let temp;
    let today = new Date();
    if (!hasTemp) {
      temp = <span>Loading....</span>;
    } else {
      temp = <span className="temp">{Math.round(this.state.main.temp)}&deg;C</span>;
    }

    return (
      <div className="App">
        <Navbar bg="dark" variant="dark" fixed="top">
          <Navbar.Brand>
            <i className='owf owf-201'></i>{' '}
          Weather
            </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {this.state.place}
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        <Container fluid className={this.state.dayNight}>
          <Row>
            <Col sm={12} md={6}>
              <Row >
                <Col>
                  {temp}
                </Col>
              </Row>
              <Row >
                <Col className="weather-icon">
                  <i className={`owf owf-${this.state.weather.id}`}></i>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span className="description">{this.state.weather.description} . </span><Moment format="MMMM Do YYYY . dddd">{today}</Moment>
                </Col>
              </Row>
            </Col>
            <Col sm={12} md={6} className="detail-col">
              <Table className="weather-detail" variant="dark">
                <tbody>
                  <tr>
                    <td>Feels Like</td>
                    <td>{this.state.main.feels_like}&deg;C</td>
                  </tr>
                  <tr>
                    <td>Max</td>
                    <td>{this.state.main.temp_max} &deg;C</td>
                  </tr>
                  <tr>
                    <td>Min</td>
                    <td>{this.state.main.temp_min} &deg;C</td>
                  </tr>
                  <tr>
                    <td>Pressure</td>
                    <td>{this.state.main.pressure} hPa</td>
                  </tr>
                  <tr>
                    <td>Humidity</td>
                    <td>{this.state.main.humidity}%</td>
                  </tr>
                  <tr>
                    <td>Wind Speed</td>
                    <td>{this.state.wind.speed}m/s</td>
                  </tr>
                  <tr>
                    <td>Sunrise</td>
                    <td><Moment unix format="h:mm a">{this.state.sunrise}</Moment></td>
                  </tr>
                  <tr>
                    <td>Sunset</td>
                    <td><Moment unix format="h:mm a">{this.state.sunset}</Moment></td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}


export default App;
