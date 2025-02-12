import {inject} from '@angular/core';
import {HttpInterceptorFn} from '@angular/common/http';

import {AuthService} from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn =
    (request, next) => {
        const authService = inject(AuthService);
        const token = authService.getToken();

        if (token) {
            request = request.clone({
                setHeaders: {Authorization: `Bearer ${token}`}
            });
        }

        return next(request);
    };
