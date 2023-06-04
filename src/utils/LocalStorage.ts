import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveDataToStorage = async (key: string, data: any) => {
  const value = JSON.stringify(data);
  await AsyncStorage.setItem(key, value);
};

export const isKeyExist = async (key: string) => {
  const keys = await AsyncStorage.getAllKeys();
  return keys.includes(key);
};

export const getDataFromStorage = async (key: string, defualt_value = null) => {
  const value = await AsyncStorage.getItem(key);
  if (value != null) {
    return JSON.parse(value);
  }

  return defualt_value;
};

export const removeDataFromStorage = async (key: string) => {
  await AsyncStorage.removeItem(key);
};
