
import {APIProvider, Map} from '@vis.gl/react-google-maps';

import { MAP_API_KEY } from "../../env"

export const GMap = () => {
  return MAP_API_KEY ? <GoogleMap /> : <div>Map is not available</div>
}

const GoogleMap = () => {
  return(
     <APIProvider apiKey={MAP_API_KEY}>
    <Map
      style={{width: '100vw', height: '100vh'}}
      defaultCenter={{lat: 22.54992, lng: 0}}
      defaultZoom={3}
      gestureHandling='greedy'
      disableDefaultUI
    />
  </APIProvider>
  )
}
