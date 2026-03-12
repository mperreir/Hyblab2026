
/**
 * 
 * @param {string} city 
 * @returns {Object} {latitude, longitude}
 */
async function getCoordinates(city) {

    try {
        const url = `https://api-adresse.data.gouv.fr/search/?q=${city}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.features.length === 0) {
            console.log(data)
            console.error("Ville non trouvée");
            return null;
        }

        console.log(data.features[0].geometry.coordinates)
        return data.features[0].geometry.coordinates;


    } catch (e) {
        console.error(e)
    }
}

getCoordinates("Nantes")