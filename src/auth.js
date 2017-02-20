import qs from 'qs';

function getAuthService() {
  const pathname = document.location.pathname;
  const path = pathname.substring(1).replace('.html', '').split('/');
  return path[1];
}

function redirect() {
  const hash = qs.parse(document.location.hash.substring(1));
  const query = qs.parse(document.location.search.substring(1));
  const service = getAuthService();

  switch (service) {

    case 'spotify':
      document.location = `/#/auth/spotify?${qs.stringify(hash)}`;
      break;

    case 'lastfm':
      document.location = `/#/auth/lastfm?${qs.stringify(query)}`;
      break;

    default:
      document.location = '/';
      break;

  }
}

redirect();
