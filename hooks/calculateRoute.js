const calculateRoute = async (origin, destination) => {
  const results = await Promise.all([
    getDrivingResults(origin, destination),
    getBycicleResults(origin, destination),
    getTransitResults(origin, destination),
  ]);
};

const getDrivingResults = async (origin, destination) => {
  const directionsService = new google.maps.DirectionsService();
  return await directionsService.route({
    origin: origin.current.value,
    destination: destination.current.value,
    travelMode: google.maps.TravelMode.DRIVING,
  });
};

const getBycicleResults = async (origin, destination) => {
  const directionsService = new google.maps.DirectionsService();
  return await directionsService.route({
    origin: origin.current.value,
    destination: destination.current.value,
    travelMode: google.maps.TravelMode.BICYCLING,
  });
};

const getTransitResults = async (origin, destination) => {
  const directionsService = new google.maps.DirectionsService();
  return await directionsService.route({
    origin: origin.current.value,
    destination: destination.current.value,
    travelMode: google.maps.TravelMode.TRANSIT,
  });
};

export default calculateRoute;
