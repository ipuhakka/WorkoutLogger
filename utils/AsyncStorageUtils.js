import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Returns json value from async storage
 * @param {string} key 
 */
async function getJsonAsync(key)
{
    const json = await AsyncStorage.getItem(key);

    if (!json)
    {
        return null;
    }

    return JSON.parse(json);
}

export default {
    getJsonAsync
}