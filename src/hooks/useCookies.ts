const useCookies = () => {
  const setCookie = (name: string, value: string | number | boolean) => {
    document.cookie = `${name}=${value}`;
  };

  const getCookie = (name: string) => {
    const allCookies = document.cookie;
    const arr = allCookies.split(';');
    return arr
      .find((item) => item.includes(name))
      ?.split('=')[1]
      ?.trim();
  };

  const deleteCookie = (name: string) => {
    const cookie = getCookie(name);
    if (cookie) {
      document.cookie = `${name}=${cookie}";expires=Thu, 01 Jan 1970 00:00:01 GMT"`;
    }
  };

  const clearCookies = () => {
    const allCookies = document.cookie.split(';');
    for (let i = 0; i < allCookies.length; i += 1) {
      const myCookie = allCookies[i];
      const pos = myCookie.indexOf('=');
      const name = pos > -1 ? myCookie.slice(0, pos) : myCookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  };

  return {
    clearCookies,
    setCookie,
    getCookie,
    deleteCookie,
  };
};

export default useCookies;
