const heightsArr = [
  10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150,
];

//get height for drone flight
const getHeight = () => {
  if (heightsArr.length > 0) {
    return heightsArr.pop();
  }
};

//manage drone flight
const flightDrone = (drone, height) => {
  drone.landingTimeLeft = Math.floor(Math.random() * 5) + 1; //initial number between 1 - 5 KM distance
  drone.height = height;
  drone.inTheAir = true;
  drone.flightTimeLeft--; //initial flightTimeLeft to zero
  console.log(
    `Drone ${drone.id} flying at a height of ${height} to distance of ${drone.landingTimeLeft} KM`
  );
};

//initial drones array values
const initialDrones = () => {
  //20 drones(1-21)
  for (let i = 1; i < 21; i++) {
    const drone = {
      id: i,
      inTheAir: false,
      landingTimeLeft: 0,
      flightTimeLeft: Math.floor(Math.random() * 15) + 1, //initial number between 1 - 15 minutes for flight
      height: 0,
    };
    dronesArr.push(drone);
  }
  console.log("Initial drones");
};

const dronesArr = [];

function startFly() {
  initialDrones();
  //240 minutus(0-240)
  for (let ticker = 0; ticker < 240; ticker++) {
    console.log(
      "__________________________________________________________________"
    );
    for (drone of dronesArr) {
      //check if drone not in the air
      if (!drone.inTheAir) {
        console.log(`Drone ${drone.id} is not in the air, lets fly!!`);
        if (drone.flightTimeLeft > 1) {
          drone.flightTimeLeft--; //check time left for drone flight (man is arrived)
        } else {
          const height = getHeight();
          //check if drone get height for flight
          if (height) {
            flightDrone(drone, height);
            continue;
          }
        }
      } else {
        console.log(`Please wait.. drone ${drone.id} is flying`);
        if (drone.landingTimeLeft > 1) {
          drone.landingTimeLeft--; //check if drone comes to land
        } else {
          console.log(`Drone ${drone.id} lands`);
          drone.landingTimeLeft--; //initial landingTimeLeft to zero
          drone.inTheAir = false;
          drone.flightTimeLeft = Math.floor(Math.random() * 15) + 1; //initial again number between 1 - 15 minutes for flight
          console.log(`Drone ${drone.id} is ready to fly again`);
          heightsArr.push(drone.height); //drone get back is height to heightsArr
          drone.height = 0;
        }
      }
    }
  }
}

startFly();
