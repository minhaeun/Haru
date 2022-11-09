import { Cookies } from 'react-cookie';

export function Authentication() {
  const backURL = process.env.REACT_APP_BACKURL;
  const emails = process.env.REACT_APP_BACK_TMP_EMAIL;
  const URLNext = 'users/login';
  fetch(backURL + URLNext, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: emails }),
  })
    .then((response) => response.json())
    .then((data) => {
      const cookies = new Cookies();
      cookies.set('accessToken', data.accessToken);
    });
}
