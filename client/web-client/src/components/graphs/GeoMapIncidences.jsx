import { scaleQuantize } from 'd3-scale';
import PropTypes, { number } from 'prop-types';
import {
  ComposableMap, Geographies, Geography,
} from 'react-simple-maps';

const geoUrl = '/assets/gadm36_FRA_1.json';

const mapIdToRegion = {
  11: 'Île-de-France',
  '01': 'Guadeloupe',
  '02': 'Martinique',
  '03': 'Guyane',
  '04': 'Réunion',
  '06': 'Mayotte',
  24: 'Centre-Val de Loire',
  27: 'Bourgogne-Franche-Comté',
  28: 'Normandie',
  32: 'Hauts-de-France',
  44: 'Grand Est',
  52: 'Pays de la Loire',
  53: 'Bretagne',
  75: 'Nouvelle-Aquitaine',
  76: 'Occitanie',
  84: 'Auvergne-Rhône-Alpes',
  93: 'Provence-Alpes-Côte d\'Azur',
  94: 'Corse',
  975: 'Miquelon-Langlade et Saint Pierre',
  977: 'Saint-Barthélemy',
  978: 'Saint-Martin',
};

const colorScale = scaleQuantize()
  .domain([1, 100])
  .range([
    '#ffedea',
    '#ffcec5',
    '#ffad9f',
    '#ff8a75',
    '#ff5533',
    '#e2492d',
    '#be3d26',
    '#9a311f',
    '#782618',
  ]);

export const GeoMapIncidences = ({ data, setTooltipContent }) => {
  return (
    <ComposableMap
      data-tip=""
      projection="geoAzimuthalEqualArea"
      projectionConfig={{
        scale: 2000,
        center: [3, 43],
      }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) => geographies.map((geo) => {
          const cur = data.regions.find((s) => mapIdToRegion[s.reg] === geo.properties.NAME_1);
          return (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill={cur ? colorScale(cur.tx_std) : '#c6c6c6'}
              onMouseEnter={() => {
                setTooltipContent(`${geo.properties.NAME_1} - ${cur ? parseFloat(cur.tx_std).toFixed(2) : 'Pas de données'}`);
              }}
              onMouseLeave={() => {
                setTooltipContent('');
              }}
              style={{
                hover: {
                  fill: '#207cd8',
                  outline: 'none',
                },
              }}
            />
          );
        })}
      </Geographies>
    </ComposableMap>
  );
};

GeoMapIncidences.defaultProps = {
  data: [],
};

GeoMapIncidences.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.string,
    regions: PropTypes.arrayOf(
      PropTypes.shape({
        // Region
        reg: PropTypes.string,
        // Standardized incidence rate
        tx_std: PropTypes.number,
        count: number,
      }),
    ),
  }),
  setTooltipContent: PropTypes.func.isRequired,
};
