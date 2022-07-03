// export default function Results({ data }) {
//     return <div>results: {data.co2e.toFixed(2)}kg</div>;
//   }
//   export async function getServerSideProps(context) {
//     const transportOptions = {
//       transit:
//         "passenger_vehicle-vehicle_type_local_bus-fuel_source_na-distance_na-engine_size_na",
//       driving:
//         "passenger_vehicle-vehicle_type_black_cab-fuel_source_na-distance_na-engine_size_na",
//     };
//     const info = context.params.slug.split("&");
//     const distance = +info[0].split(",")[0];
//     console.log(distance);
//     const transport = info[1];
//     const climateTransport =
//       transport === "driving"
//         ? transportOptions.driving
//         : transportOptions.transit;

//         const data = await resp.json();
//         console.log(data);
//         return {
//           props: {
//             data: data,
//       =======

//         const data = await resp.json();

//         console.log(data);

//         return {
//           props: {
//             co2e: data.co2e.toFixed(2),
//       >>>>>>> origin/result-page
//           },
//         };
//       }

//       <<<<<<< HEAD
//       emission_factor: climateTransport,
// =======
//       emission_factor: transport,
// >>>>>>> origin/result-page
//       parameters: {
//         passengers: 1,
//         distance: distance,
//         distance_unit: "km",
//       },
//     }),
//   });

import React from "react";

export const indexme = () => {
  return <div>indexme</div>;
};
