function getRandomLatLng() {
  return [-90 + 180 * Math.random(), -180 + 360 * Math.random()];
}

const markerData: any = [];
const textureData = [
  {
    textureID: `${1}`,
    color: '#0000ff',
  },
];

for (let i = 0; i < 100000; i += 1) {
  const [latitude, longitude] = getRandomLatLng();

  markerData.push({
    latitude,
    longitude,
    textureID: `${1}`,
    color: '#0000ff',
    data: {
      id: `${i + 1}`,
    },
  });
}

export const randomDots = () => {
  return {
    markerData,
    textureData,
  };
};
