import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environment.ts/environment.js';
import { ApiResponse } from '../models/api.model.js';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { AuthService } from './auth.service.js';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

    private http: HttpClient = inject(HttpClient);  

    async particpatantUpdate(idSubevent: number, idStatus: number): Promise<number> {        
        const result = await firstValueFrom(this.http.post<ApiResponse<any>>(environment.apiUrl+'subevents/'+idSubevent+"/participants", {
            participationStatusId: idStatus
        }));   
        if (result.data <= 0)
            return 0;            
        return result.data;
    }

    
}