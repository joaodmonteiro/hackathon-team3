const fetchRoutes = async (from, to) => {
  const results = await Promise.all([
    getDrivingData(from, to),
    getTransitData(from, to),
    getBicycleData(from, to),
  ]);

  return { driving: results[0], transit: results[1], bicycle: results[2] };
};

const getDrivingData = async (from, to) => {
  const responseDriving = await fetch(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${from}&destination=${to}&mode=DRIVING&key=${process.env.REACT_APP_GOOGLE_MAPS_API}`
  );
  const drivingData = await responseDriving.json();

  return {
    drivingDistance: drivingData.routes[0].legs[0].distance.text.split(" ")[0],
    drivingDuration: drivingData.routes[0].legs[0].duration.text,
  };
};

const getTransitData = async (from, to) => {
  const responseTransit = await fetch(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${from}&destination=${to}&mode=transit&key=${process.env.REACT_APP_GOOGLE_MAPS_API}`
  );
  const transitData = await responseTransit.json();

  return {
    transitDistance: transitData.routes[0].legs[0].distance.text.split(" ")[0],
    transitDuration: transitData.routes[0].legs[0].duration.text,
  };
};

const getBicycleData = async (from, to) => {
  const responseBicycle = await fetch(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${from}&destination=${to}&mode=bicycling&key=${process.env.REACT_APP_GOOGLE_MAPS_API}`
  );
  const bicycleData = await responseBicycle.json();

  return {
    bicycleDistance: bicycleData.routes[0].legs[0].distance.text.split(" ")[0],
    bicycleDuration: bicycleData.routes[0].legs[0].duration.text,
  };
};

export default fetchRoutes;
