import {ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withRouterConfig} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {loggingInterceptor} from './shared/interceptors/logging.interceptor';
import {apiPrefixInterceptor} from './shared/interceptors/api-prefix.interceptor';
import {AppInitService} from "./core/app-init.service";

const initializeAppFn = () => {
  const initService = inject(AppInitService);
  return initService.init();
}
export const appConfig: ApplicationConfig = {
  providers: [AppInitService,
    provideAppInitializer(initializeAppFn),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withRouterConfig({paramsInheritanceStrategy: 'always'})),
    provideHttpClient(withInterceptors([loggingInterceptor, apiPrefixInterceptor])),
  ]
};
