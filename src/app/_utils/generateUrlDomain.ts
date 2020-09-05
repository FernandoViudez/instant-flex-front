import { environment } from 'src/environments/environment'


export const generateBackPath = (path) => {
    return environment.backend + environment.apiHead + path;
} 