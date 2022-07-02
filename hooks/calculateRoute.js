const calculateRoute = async (origin, destination) => {
  const directionsService = new google.maps.DirectionsService();
  const drivingResults = await directionsService.route({
    origin: origin.current.value,
    destination: destination.current.value,
    travelMode: google.maps.TravelMode.DRIVING,
  });
  const bycicleResults = await directionsService.route({
    origin: origin.current.value,
    destination: destination.current.value,
    travelMode: google.maps.TravelMode.BICYCLING,
  });
  const transitResults = await directionsService.route({
    origin: origin.current.value,
    destination: destination.current.value,
    travelMode: google.maps.TravelMode.TRANSIT,
  });
  const walkingResults = await directionsService.route({
    origin: origin.current.value,
    destination: destination.current.value,
    travelMode: google.maps.TravelMode.WALKING,
  });
  return { drivingResults, bycicleResults, transitResults, walkingResults };
};

export default calculateRoute;
