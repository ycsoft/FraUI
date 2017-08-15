export class Utils {

    static isEmpty(value) {
        return value == null || (Utils.isString(value) && value.length == 0);
    }

    static isNotEmpty(value) {
        return Utils.isString(value) && value.length > 0;
    }

    static isUndefined(value) {
        return typeof value === 'undefined';
    }

    static isDefined(value) {
        return typeof value !== 'undefined';
    }

    static isObject(value) {
        // http://jsperf.com/isobject4
        return value !== null && typeof value === 'object';
    }

    static isBlankObject(value) {
        return value !== null && typeof value === 'object' && !Object.getPrototypeOf(value);
    }

    static isString(value) {
        return typeof value === 'string';
    }

    static isNumber(value) {
        return typeof value === 'number';
    }

    static isDate(value) {
        return Object.prototype.toString.call(value) === '[object Date]';
    }

    static isArray(value) {
        return Array.isArray;
    }

    static isFunction(value) {
        return typeof value === 'function';
    }

    static format(str, args) {
        let reg;
        let formatStr = str;
        if (Utils.isDefined(args) && Utils.isObject(args)) {
            for (const key in args) {
                if (args.hasOwnProperty(key) && args[key] != null) {
                    reg = new RegExp("({" + key + "})", "g");
                    formatStr = formatStr.replace(reg, args[key]);
                }
            }
        }
        return formatStr;
    }

    static getDevice() {
        const u = navigator.userAgent;
        let device = "PC";
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
            device = "ANDROID";
        }
        if (u.indexOf('iPhone') > -1) {
            device = "IOS";
        }

        return device;
    }

    static isOnline() {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.id = "test_is_online";
            img.onload = function () {
                document.body.removeChild(
                    document.getElementById("test_is_online"));
                resolve(true);
            };
            img.onerror = function () {
                document.body.removeChild(
                    document.getElementById("test_is_online"));
                resolve(false);
            };
            img.src = "http://test.i-cambio.com/web/dist//img/test.png";
            img.style.display = "none";
            document.body.appendChild(img);
        });
    }

    static money(m) {
        const numberMoney = Number(m);
        if (isNaN(numberMoney)) {
            return 0
        } else {
            return numberMoney;
        }
    }
}
