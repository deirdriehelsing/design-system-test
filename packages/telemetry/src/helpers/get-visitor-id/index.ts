import Cookies from 'js-cookie';
import { v4 as uuid } from 'uuid';

function getVisitorId() {
  if (!Cookies.get('visitor_id')) {
    Cookies.set('visitor_id', uuid());
  }

  return Cookies.get('visitor_id') ?? '';
}

export default getVisitorId;
