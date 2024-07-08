import {createRequire} from 'module';
const requirer = createRequire(import.meta.url)
const { ipToGeolocation } = requirer("location-from-ip");
const geoip = requirer('geoip-lite');
const lookup = requirer("country-code-lookup")

export default async function Location(ip) {
    try{
       const response = await geoip.lookup(ip);
       const location = lookup.byIso(response?.country)
       
       if(location){
        return location
       }
    }
    catch(error){
        console.log(error)
        throw error

    }
}