import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import { mapbox } from '../constants/tokens';
import '../scss/Map.scss';

import { fetchRouteTaxiRequest } from '../redux/modules/routeTaxi/actions';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Header from '../components/Header';
import useAddressList from '../hooks/useAddressList';

const drawRoute = (map, coordinates = [222]) => {
    map.flyTo({
        center: coordinates[0],
        zoom: 15
    });

    map.addLayer({
        id: "route",
        type: "line",
        source: {
            type: "geojson",
            data: {
                type: "Feature",
                properties: {},
                geometry: {
                    type: "LineString",
                    coordinates
                }
            }
        },
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": "#ffc617",
            "line-width": 8
        }
    });
};

mapboxgl.accessToken = mapbox;
const Map = () => {
    let mapContainer = React.createRef();
    const dispatch = useDispatch();
    const [statusCard, allAddress] = useAddressList();
    const [addressFrom, setAddressFrom] = React.useState(null);
    const [addressTo, setAddressTo] = React.useState(null);
    let filterAllAddress;

    if (allAddress) {
        filterAllAddress = allAddress.filter((e) => e !== addressFrom && e !== addressTo);
    };

    const handlerCallTaxi = (addressFrom, addressTo) => {
        dispatch(fetchRouteTaxiRequest(addressFrom, addressTo));
    };
    // TODO! Сделать required поля выбора адрессов.

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
            <Header />
            <div id="map" ref={el => mapContainer = el}></div>
            {statusCard &&
                <div className="popup-taxi">
                    <form>
                        <div className="from">
                            <Autocomplete
                                id="combo-box-demo"
                                options={filterAllAddress}
                                onChange={(event, newValue) => {
                                    setAddressFrom(newValue);
                                }}
                                getOptionLabel={option => option}
                                style={{ width: 300 }}
                                renderInput={params => (
                                    <TextField {...params} label="Откуда" fullWidth />
                                )}
                            />
                        </div>
                        <div className="to">
                            <Autocomplete
                                id="combo-box-demo"
                                options={filterAllAddress}
                                getOptionLabel={option => option}
                                onChange={(event, newValue) => {
                                    setAddressTo(newValue);
                                }}
                                style={{ width: 300 }}
                                renderInput={params => (
                                    <TextField {...params} label="Куда" fullWidth />
                                )}
                            />
                        </div>
                        <div className="btn">
                            <button onClick={handlerCallTaxi(addressFrom, addressTo)}>Вызвать такси</button>
                        </div>
                    </form>
                </div>
            }
        </section>
    );
}

export default Map;
