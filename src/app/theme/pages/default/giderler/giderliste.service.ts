import { Injectable } from '@angular/core';
import { HttpService } from '../../../../shared/http.service';
import { retry } from 'rxjs/operators/retry';

@Injectable()
export class GiderListService {
    constructor(private http: HttpService) {

    }

    get() {
        return this.http.get('comments').map(x => x.json());
    }
}