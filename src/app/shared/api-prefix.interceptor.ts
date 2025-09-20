import { HttpInterceptorFn } from '@angular/common/http';
import {enviroment} from '../../../enviroment/enviroment';

export const apiPrefixInterceptor: HttpInterceptorFn = (request, next) => {
  let serverUrl = enviroment.apiUrl;

  // loading static content from assets directory of the frontend
  if (request.url.startsWith('assets')) {
    return next(request);
  }

  // replace possibly existing double slashes
  if (request.url.charAt(0) === serverUrl.charAt(serverUrl.length - 1)) {
    serverUrl = serverUrl.substring(0, serverUrl.length - 1);
  }

  if (!/^(http|https|\/)/i.test(request.url)) {
    request = request.clone({url: serverUrl + request.url});
  }

  return next(request);
};
