export function getPhoto(userWord) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const params = new URLSearchParams({
    key: '44400646-52d28046ae8ecec8adffea605',
    q: userWord,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });
  const url = `${BASE_URL}${END_POINT}?${params}`;
  return fetch(url).then(res => res.json());
}
