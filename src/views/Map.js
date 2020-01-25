import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';

import Header from '../components/Header';
// import LoginContext from '../context/Login';
// const { isLoginIn } = useContext(LoginContext);

import '../scss/Map.scss';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaWwwMDUyNCIsImEiOiJjazV0amd0NXYwNjA5M2VvYTE1ZmU4dThyIn0.Zn65a2N1HP929vgwZeimNQ';

const Maps = ({ setPage }) => {
    let mapContainer = React.createRef();

    useEffect(() => {
        new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-74.5, 40],
            zoom: 9,
        });
    }, [mapContainer]);

    return (
        <section className='map'>
            <Header setPage={setPage} />
            <div id="map" ref={el => mapContainer = el}></div>
        </section>
    );
}

Maps.propTypes = {
    setPage: PropTypes.func,
}

Maps.contextTypes = {
    isLoginIn: PropTypes.bool,
};

export default Maps;
