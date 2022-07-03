const fetchRoutes = async (from, to) => {
  const responseDriving = await fetch(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${from}&destination=${to}&mode=DRIVING&key=${process.env.REACT_APP_GOOGLE_MAPS_API}`
  );
  const drivingData = await responseDriving.json();
  const driving = {
    drivingDistance: drivingData.routes[0].legs[0].distance.text.split(" "),
    drivingDuration: drivingData.routes[0].legs[0].duration.text,
  };

  const responseWalking = await fetch(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${from}&destination=${to}&mode=walking&key=${process.env.REACT_APP_GOOGLE_MAPS_API}`
  );
  const walkingData = await responseWalking.json();

  const walking = {
    walkingDistance: walkingData.routes[0].legs[0].distance.text.split(" "),
    walkingDuration: walkingData.routes[0].legs[0].duration.text,
  };

  const responseTransit = await fetch(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${from}&destination=${to}&mode=transit&key=${process.env.REACT_APP_GOOGLE_MAPS_API}`
  );
  const transitData = await responseTransit.json();

  const transit = {
    transitDistance: transitData.routes[0].legs[0].distance.text.split(" "),
    transitDuration: transitData.routes[0].legs[0].duration.text,
  };

//   console.log(transitData.routes[0].legs)

  const responseBycicle = await fetch(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${from}&destination=${to}&mode=bicycling&key=${process.env.REACT_APP_GOOGLE_MAPS_API}`
  );
  const bycicleData = await responseBycicle.json();

  const bicycle = {
    bicycleDistance: bycicleData.routes[0].legs[0].distance.text.split(" "),
    bicycleDuration: bycicleData.routes[0].legs[0].duration.text,
  };

  return { driving, walking, transit, bicycle };
};

export default fetchRoutes;
