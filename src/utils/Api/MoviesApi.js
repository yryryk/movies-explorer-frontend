async function moviesApi() {
  const resolve = await fetch('https://api.nomoreparties.co/beatfilm-movies', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (resolve.ok) {
    return resolve.json();
  }
  return await Promise.reject(`Ошибка: ${resolve.status}`);
}

export default moviesApi
