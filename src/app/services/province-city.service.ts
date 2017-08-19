import { Injectable } from '@angular/core';
import { DataResource } from '../../app/resources/data.resource';
import { Province } from '../../app/beans/province';

@Injectable()
export class ProvinceCityService {

    province: Province[] = null;
    constructor(private dataResource: DataResource) {

    }

    initProvice() {
        return new Promise((resolve) => {
            if (this.province === null) {
                return this.dataResource.provinceCity(null, (province: Province[]) => {
                    this.province = province;
                    resolve(this.province);
                });
            } else {
                resolve(this.province);
            }
        });
    }

    getProvice() {
        return new Promise((resolve) => {
            this.initProvice().then(() => {
                const provinces = [];
                this.province.forEach(element => {
                    provinces.push({
                        id: element.name,
                        text: element.name
                    });
                });
                resolve(provinces);
            });
        });
    }

    getCities(provinceName) {
        return new Promise((resolve) => {
            this.initProvice().then(() => {
                const cities = [];
                for (let i = 0; i < this.province.length; i++) {
                    if (provinceName === this.province[i].name) {
                        this.province[i].city.forEach((city) => {
                            cities.push({
                                id: city.name,
                                text: city.name
                            })
                        });
                        break;
                    }
                }
                resolve(cities);
            });
        });
    }

}
