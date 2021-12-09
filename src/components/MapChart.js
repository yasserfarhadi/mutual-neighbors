import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation,
  Line,
} from 'react-simple-maps';

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const anotationOptions = {
  dx: -50,
  dy: -20,
  connectorProps: {
    stroke: '#cd84f1',
    strokeWidth: 1,
    strokeLinecap: 'round',
  },
};
const lineOptions = {
  stroke: '#FF5533',
  strokeWidth: 1,
  strokeLinecap: 'round',
};

const MapChart = ({ countries, mutual }) => {
  return (
    <ComposableMap
      projection="geoAzimuthalEqualArea"
      projectionConfig={{
        rotate: [-20.0, -52.0, 0],
        scale: 150,
      }}
    >
      <Geographies
        geography={geoUrl}
        fill="#D6D6DA"
        stroke="#FFFFFF"
        strokeWidth={0.5}
      >
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
      {countries.map((country) => {
        return (
          <Annotation
            key={Math.random()}
            subject={[
              Number(country.location.lng),
              Number(country.location.lat),
            ]}
            {...anotationOptions}
          >
            <text
              x="-8"
              textAnchor="end"
              alignmentBaseline="middle"
              fill="#F53"
              fontSize="12"
            >
              {country.name}
            </text>
          </Annotation>
        );
      })}
      {mutual &&
        mutual.map((match) => {
          return (
            <Line
              key={Math.random()}
              from={[match.from.location.lng, match.from.location.lat]}
              to={[match.to.location.lng, match.to.location.lat]}
              {...lineOptions}
            />
          );
        })}
    </ComposableMap>
  );
};

export default MapChart;
