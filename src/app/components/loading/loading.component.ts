import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from '../../../app/services/alert.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

    @Input() isShow = false;
    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.loadingEvent.subscribe((isShow: boolean) => {
            this.isShow = isShow;
        });
    }

}
