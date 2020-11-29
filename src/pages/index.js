import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from 'components/Layout';
import Container from 'components/Container';
import Map from 'components/Map';
import axios from 'axios';

const IndexPage = () => {

  async function mapEffect({ leafletElement: map } = {}) {
	// Create variable for use in our API request (Can't do inside the loop).
	let response;
	
    // API request to disease.sh country database
    try {
      response = await axios.get('https://disease.sh/v3/covid-19/states');
      } catch(e) {;
        console.log(`Failed to fetch data: ${e.message}`, e);
        return;
      }
	  
	// Save our response into an array
    const { data = [] } = response;

	// Cleanse some of our input we don't want
	data.splice(51,62)
	
	
	// Print the data we just obtained
	console.log("Printing data from API response");
	console.log(data);
	
	// All coordinates we need for our states.
	const usStateCoordinates = {
		'Texas': [31.054487,-97.563461], 'California': [36.116203,-119.681564], 'Florida': [27.766279,-81.686783],
		'Illinois': [40.349457,-88.986137], 'New York': [42.165726,-74.948051], 'Georgia': [33.040619,-83.643074],
		'Ohio': [40.388783,-82.764915], 'Wisconsin': [44.268543,-89.616508], 'Michigan': [43.326618,-84.536095],
		'Tennessee': [35.747845,-86.692345], 'North Carolina': [35.630066,-79.806419], 'Pennsylvania': [40.590752,-77.209755],
		'New Jersey': [40.298904,-74.521011], 'Indiana': [39.849426,-86.258278], 'Arizona': [33.729759,-111.431221],
		'Missouri': [38.456085,-92.288368], 'Minnesota': [45.694454,-93.900192], 'Alabama': [32.806671,-86.791130],
		'Virginia': [37.769337,-78.169968], 'Louisiana': [31.169546,-91.867805], 'Iowa': [42.011539,-93.210526],
		'Colorado': [39.059811,-105.311104], 'Massachusetts': [42.230171,-71.530106], 'South Carolina': [33.856892,-80.945007],
		'Maryland': [39.063946,-76.802101], 'Oklahoma': [35.565342,-96.928917], 'Utah': [40.150032,-111.862434],
		'Kentucky': [37.668140,-84.670067], 'Washington': [47.400902,-121.490494], 'Kansas': [38.526600,-96.726486],
		'Arkansas': [34.969704,-92.373123], 'Mississippi': [32.741646,-89.678696], 'Nevada': [38.313515,-117.055374],
		'Nebraska': [41.125370,-98.268082], 'Connecticut': [41.597782,-72.755371], 'Idaho': [44.240459,-114.478828],
		'New Mexico': [34.840515,-106.248482], 'South Dakota': [44.299782,-99.438828], 'North Dakota': [47.528912,-99.784012],
		'Oregon': [44.572021,-122.070938], 'Montana': [46.921925,-110.454353], 'West Virginia': [38.491226,-80.954453],
		'Delaware': [39.318523,-75.507141], 'District Of Columbia': [38.897438,-77.026817], 'New Hampshire': [43.452492,-71.563896],
		'Hawaii': [21.094318,-157.498337], 'Maine': [44.693947,-69.381927], 'Vermont': [44.045876,-72.710686],
		'Alaska': [61.370716,-152.404419], 'Wyoming': [42.755966,-107.302490], 'Rhode Island': [41.680893,-71.511780],
	}

	// Add lat, long values we are missing from data.
	for (var i = 0; i < 51; i++) {
		var latlong = usStateCoordinates[data[i]['state']];
		data[i]["lat"] = latlong[0];
		data[i]["long"] = latlong[1];
	}

	// Make geoJson objects with the long and lat of our data objects.
	const geoJson = {
		type: 'FeatureCollection',
		features: data.map((state = {}) => {
			return {
				type: 'Feature',
				properties: {...state},
				geometry: {type: 'Point', coordinates: [state['long'], state['lat']]}
			}
		})
	}
	
	// Print the geoJson objects we just created
	console.log("Printing geoJson");
	console.log(geoJson);
  }

  const mapSettings = {
    center: [50, 0],
    zoom: 2,
    mapEffect,
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <Map  {...mapSettings}>
      </Map>
      <Container type="content" className="text-center home-start">
        <h2>Coronavirus-Dashboard</h2>
        <p>ITSC-3155 Group 14</p>
      </Container>
    </Layout>
  );
};
export default IndexPage;