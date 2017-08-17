import { Injectable } from '@angular/core';
import { Utils } from '../../app/services/utils';

@Injectable()
export class SessionStorageService {

  types = {
        OBJECT: 'OBJECT',
        NUMBER: 'NUMBER',
        STRING: 'STRING',
        OTHER: 'OTHER'
    };
  constructor() {
  }

    public setItem(key: string, value) {
        if (Utils.isNotEmpty(key)) {
            const obj = { value: value, type: this.types.OTHER };
            if (Utils.isObject(value)) {
                obj.type = this.types.OBJECT;
            } else if (Utils.isNumber(value)) {
                obj.type = this.types.NUMBER;
            } else if (Utils.isString(value)) {
                obj.type = this.types.STRING;
            } else {
                obj.type = this.types.OTHER;
            }

            localStorage.setItem(key, JSON.stringify(obj));
        }
    }

    public getItem(key: string) {
        let value;
        try {
            const obj = JSON.parse(localStorage.getItem(key));
            if (obj === this.types.NUMBER) {
                value = parseInt(obj.value, 10);
            } else {
                value = obj.value;
            }
            return value;
        } catch (error) {
            return sessionStorage.getItem(key);
        }
    }

    public removeItem(key: string) {
        sessionStorage.removeItem(key);
    }

    public clear() {
        sessionStorage.clear();
    }
}
