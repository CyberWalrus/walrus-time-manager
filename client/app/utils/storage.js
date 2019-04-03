export function getFromStorage(key) {

  if (!key) {

    return null;

  }
  try {

    const valueStr = localStorage.getItem(key);
    if (valueStr) {

      return JSON.parse(valueStr);

    }
    return null;

  } catch (err) {

    return null;

  }

}

export function setInStorage(key, obj) {

  if (!key) {

    console.error(`Error: Key is missing`);

  }
  try {

    localStorage.setItem(key, JSON.stringify(obj));

  } catch (err) {

    console.error(err);

  }

}

export function msToString(ms) {

  try {

    let timeString = new Date(ms).toLocaleTimeString(`en-GB`, {"timeZone": `UTC`}).replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, `$1$3`);
    return timeString;

  } catch (err) {

    return `00:00`;

  }

}