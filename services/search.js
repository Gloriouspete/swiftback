import { createRequire } from "module";
const requirer = createRequire(import.meta.url);
const NodeGeocoder = requirer("node-geocoder");
const options = {
  provider: "openstreetmap",
};
const geocoder = NodeGeocoder(options);
export default async function Search(ip) {
  try {
    const location = await geocoder.geocoder(ip);

    if (location) {
      return location;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
