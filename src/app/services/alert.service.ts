import { Injectable, EventEmitter } from '@angular/core';
import { Alert } from '../../app/beans/alert';

@Injectable()
export class AlertService {

    public alertEvent = new EventEmitter<Alert>();

    public loadingEvent = new EventEmitter<boolean>();

    constructor() { }

    public alert(alert: Alert) {
        this.alertEvent.emit(alert);
    }

    public loading(isShow: boolean) {
        this.loadingEvent.emit(isShow);
    }
}
