/**
 * Created by jiangyun on 2017/3/23.
 */
// 表示全局唯一标识符 (GUID)。
export class Guid {

    arr = [];
    public static newGuid(): string {
        let g = '';
        let i = 32;
        while (i--) {
            g += Math.floor(Math.random() * 16.0).toString(16);
        }

        return new Guid(g).toString();
    }

    constructor(g) {
        // 如果构造函数的参数为字符串
        if (typeof (g) === 'string') {
            this.initByString(this.arr, g);
        } else {
            this.initByOther(this.arr);
        }
    }



    // 返回一个值，该值指示 Guid 的两个实例是否表示同一个值。
    Equals(o) {
        if (o && o.IsGuid) {
            return this.toString() == o.ToString();
        } else {
            return false;
        }

    }

    // Guid对象的标记
    IsGuid() {
    }

    // 返回 Guid 类的此实例值的 String 表示形式。
    toString(format?) {
        if (typeof (format) === 'string') {
            if (format === 'N' || format === 'D' || format === 'B' || format === 'P') {
                return this.toStringWithFormat(this.arr, format);
            } else {
                return this.toStringWithFormat(this.arr, 'D');
            }
        } else {
            return this.toStringWithFormat(this.arr, 'D');
        }
    }

    // 由字符串加载
    initByString(arr, g) {
        g = g.replace(/\{|\(|\)|\}|-/g, '');
        g = g.toLowerCase();
        if (g.length !== 32 || g.search(/[^0-9,a-f]/i) !== -1) {
            this.initByOther(arr);
        } else {
            for (let i = 0; i < g.length; i++) {
                arr.push(g[i]);
            }
        }

    }

    // 由其他类型加载
    initByOther(arrr) {
        let i = 32;
        while (i--) {
            arrr.push('0');
        }
    }

    /*
     根据所提供的格式说明符，返回此 Guid 实例值的 String 表示形式。
     N  32 位： xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
     D  由连字符分隔的 32 位数字 xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
     B  括在大括号中、由连字符分隔的 32 位数字：{xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx}
     P  括在圆括号中、由连字符分隔的 32 位数字：(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
     */
    toStringWithFormat(arr, format) {
        switch (format) {
            case 'N':
                return arr.toString().replace(/,/g, '');
            case 'D': {
                let str = arr.slice(0, 8) + '-';
                str += arr.slice(8, 12) + '-';
                str += arr.slice(12, 16) + '-';
                str += arr.slice(16, 20) + '-';
                str += arr.slice(20, 32);
                str = str.replace(/,/g, '');
                return str;
            }
            // const str = `${arr.slice(0, 8)}-${arr.slice(8, 12)}-${arr.slice(8, 12)}-${arr.slice(12, 16)`;
            case 'B': {
                let str = this.toStringWithFormat(arr, 'D');
                str = '{' + str + '}';
                return str;
            }
            case 'P': {
                let str = this.toStringWithFormat(arr, 'D');
                str = '(' + str + ')';
                return str;
            }
            default:
                return this;
        }
    }
}
