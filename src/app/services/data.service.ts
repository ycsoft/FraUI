import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ChartBean } from '../../app/beans/chart-bean';

@Injectable()
export class DataService {
    private baseUrl: string;

    constructor(private http: Http) {
        this.baseUrl = 'http://localhost:4200';
    }

    public search(condition): Promise<ChartBean[]> {
        return this.http.get(`${this.baseUrl}/search/data.json`)
            .toPromise()
            .then(res => res.json() as ChartBean[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
