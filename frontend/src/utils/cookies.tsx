function getCookie(key: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${key}=`);
  const savedValue = parts.pop()?.split(";").shift();
  return savedValue;
}

export { getCookie };
