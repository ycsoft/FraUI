import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../app/services/alert.service';
import { Alert } from '../../../app/beans/alert';
import { AlertType } from '../../../app/beans/alert-type.enum';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class CAlertComponent implements OnInit {

    alerts = [];
    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.alertEvent.subscribe((alert: Alert) => {
            this.alerts.push({ type: this.getType(alert.type), msg: alert.msg });
        });
    }

    getType(alertType: AlertType) {
        switch (alertType) {
            case 0:
                return 'success';
            case 1:
                return 'info';
            case 2:
                return 'warning';
            case 3:
                return 'danger';
            default:
                break;
        }
    }

    close(alert) {
        alert.isClose = true;
    }
}
