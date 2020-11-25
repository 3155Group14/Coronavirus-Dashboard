import React from 'react';
import { Helmet } from 'react-helmet';
import L from 'leaflet';

import Layout from 'components/Layout';
import Container from 'components/Container';
import Map from 'components/Map';
import Snippet from 'components/Snippet';
import axios from 'axios';


const LOCATION = {
  lat: 38.9072,
  lng: -77.0369,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;

const IndexPage = () => {

  /**
   * mapEffect
   * @description Fires a callback once the page renders
   */

  async function mapEffect({ leafletElement: map } = {}) {
   let response;

      try {
        response = await axios.get('https://disease.sh/v3/covid-19/states');
      } catch(e) {
        console.log(`Failed to fetch states: ${e.message}`, e);
        return;
      }

      const { data = [] } = response;
      console.log("Printing requested state data!");
      console.log(data);
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: 'OpenStreetMap',
    zoom: DEFAULT_ZOOM,
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
