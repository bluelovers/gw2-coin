"use strict";
/**
 * Created by user on 2017/10/26/026.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Coin {
    constructor(options = {}) {
        this.defaultOptions = {
            unit: 2,
            unit_level: 3,
            unit_names: [
                'G',
                'S',
                'C',
            ],
        };
        this.options = this._options(options);
    }
    _options(options = {}) {
        return Object.assign({}, this.defaultOptions, options);
    }
    toCoinObject(num, options = {}) {
        options = Object.assign({}, this.options, options);
        if (typeof options.unit == 'number') {
            options.unit = (new Array(options.unit_level)).fill(options.unit);
        }
        num = num.toString();
        let j = 0;
        let a = [];
        for (let i = (options.unit.length - 1); i > 0; i--) {
            j = j - options.unit[i];
            let c = num.substr(j, options.unit[i]);
            a[i] = c;
        }
        let c = num.substr(0, num.length + j);
        a[0] = c;
        return new CoinObject(a.map(i => parseInt(i)), options);
    }
    static init(options = {}) {
        return (new this(options)).toCoinObject;
    }
    static padStr(n, len) {
        n = n.toString();
        if (n.length < len) {
            n = '0'.repeat(len - n.length) + n;
        }
        return n;
    }
}
exports.Coin = Coin;
class CoinObject {
    constructor(data, options = {}) {
        this.data = data;
        this.options = options;
    }
    toObject(pad = false) {
        let ret = {};
        for (let i = 0; i < this.options.unit_names.length; i++) {
            ret[this.options.unit_names[i]] = pad ? Coin.padStr(this.data[i], this.options.unit[i]) : this.data[i];
        }
        return ret;
    }
    toJSON(pad = false) {
        return this.toObject(pad);
    }
    toNumber() {
        let self = this;
        let n = this.data.map((n, i) => {
            return Coin.padStr(n, self.options.unit[i]);
        }).join('');
        return parseInt(n);
    }
    toString(pad = false) {
        if (this.options.toStringNumber == true) {
            return this.toNumber();
        }
        return this.toStringUnit(pad);
    }
    toStringUnit(pad = false) {
        let c = [];
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i]) {
                let n = this.data[i];
                if (pad) {
                    n = Coin.padStr(n, this.options.unit[i]);
                }
                c.push(`${n} ${this.options.unit_names[i]}`);
            }
        }
        return c.join(' ');
    }
    toArray() {
        return this.data.slice();
    }
}
exports.CoinObject = CoinObject;
function init(options = {}, objclass = Coin) {
    return objclass.init(options);
}
exports.init = init;
exports.default = exports;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiRDovVXNlcnMvRG9jdW1lbnRzL1RoZSBQcm9qZWN0L0dhbWUvR3VpbGQgV2FycyAyL2d3Mi1jb2luLyIsInNvdXJjZXMiOlsiaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOztBQVlIO0lBZUMsWUFBWSxVQUF3QixFQUFFO1FBWi9CLG1CQUFjLEdBQUc7WUFDdkIsSUFBSSxFQUFFLENBQUM7WUFDUCxVQUFVLEVBQUUsQ0FBQztZQUNiLFVBQVUsRUFBRTtnQkFDWCxHQUFHO2dCQUNILEdBQUc7Z0JBQ0gsR0FBRzthQUNIO1NBQ2UsQ0FBQztRQU1qQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVPLFFBQVEsQ0FBQyxVQUF3QixFQUFFO1FBRTFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxZQUFZLENBQUMsR0FBVSxFQUFFLFVBQXdCLEVBQUU7UUFFbEQsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFbkQsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFPLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxDQUNwQyxDQUFDO1lBQ0EsT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkUsQ0FBQztRQUVELEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsSUFBSSxDQUFDLEdBQUcsRUFB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Q0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVELE9BQU87UUFFTixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMxQixDQUFDO0NBQ0Q7QUE3RUQsZ0NBNkVDO0FBRUQsY0FBcUIsVUFBd0IsRUFBRSxFQUFFLFFBQVEsR0FBRyxJQUFJO0lBRS9ELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUFIRCxvQkFHQztBQUVELGtCQUFlLE9BQU8sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTcvMTAvMjYvMDI2LlxuICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvaW5PcHRpb25zXG57XG5cdHVuaXQ/OiB2Q29pbiB8IHZDb2luW107XG5cdHVuaXRfbGV2ZWw/OiBudW1iZXI7XG5cdHVuaXRfbmFtZXM/OiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IHR5cGUgdkJvb2wgPSBudW1iZXIgfCBib29sZWFuO1xuZXhwb3J0IHR5cGUgdkNvaW4gPSBudW1iZXIgfCBzdHJpbmc7XG5cbmV4cG9ydCBjbGFzcyBDb2luXG57XG5cblx0cHVibGljIGRlZmF1bHRPcHRpb25zID0ge1xuXHRcdHVuaXQ6IDIsXG5cdFx0dW5pdF9sZXZlbDogMyxcblx0XHR1bml0X25hbWVzOiBbXG5cdFx0XHQnRycsXG5cdFx0XHQnUycsXG5cdFx0XHQnQycsXG5cdFx0XSxcblx0fSBhcyBJQ29pbk9wdGlvbnM7XG5cblx0cHVibGljIG9wdGlvbnM6IElDb2luT3B0aW9ucztcblxuXHRjb25zdHJ1Y3RvcihvcHRpb25zOiBJQ29pbk9wdGlvbnMgPSB7fSlcblx0e1xuXHRcdHRoaXMub3B0aW9ucyA9IHRoaXMuX29wdGlvbnMob3B0aW9ucyk7XG5cdH1cblxuXHRwcml2YXRlIF9vcHRpb25zKG9wdGlvbnM6IElDb2luT3B0aW9ucyA9IHt9KVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuXHR9XG5cblx0dG9Db2luT2JqZWN0KG51bTogdkNvaW4sIG9wdGlvbnM6IElDb2luT3B0aW9ucyA9IHt9KVxuXHR7XG5cdFx0b3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG5cblx0XHRpZiAodHlwZW9mIG9wdGlvbnMudW5pdCA9PSAnbnVtYmVyJylcblx0XHR7XG5cdFx0XHRvcHRpb25zLnVuaXQgPSAobmV3IEFycmF5KG9wdGlvbnMudW5pdF9sZXZlbCkpLmZpbGwob3B0aW9ucy51bml0KTtcblx0XHR9XG5cblx0XHRudW0gPSBudW0udG9TdHJpbmcoKTtcblxuXHRcdGxldCBqID0gMDtcblx0XHRsZXQgYSA9IFtdO1xuXG5cdFx0Zm9yIChsZXQgaSA9IChvcHRpb25zLnVuaXQubGVuZ3RoIC0gMSk7IGkgPiAwOyBpLS0pXG5cdFx0e1xuXHRcdFx0aiA9IGogLSAob3B0aW9ucy51bml0W2ldIGFzIG51bWJlcik7XG5cblx0XHRcdGxldCBjID0gbnVtLnN1YnN0cihqLCBvcHRpb25zLnVuaXRbaV0gYXMgbnVtYmVyKTtcblxuXHRcdFx0YVtpXSA9IGM7XG5cdFx0fVxuXG5cdFx0bGV0IGMgPSBudW0uc3Vic3RyKDAsIG51bS5sZW5ndGggKyBqKTtcblx0XHRhWzBdID0gYztcblxuXHRcdHJldHVybiBuZXcgQ29pbk9iamVjdChhLm1hcChpID0+IHBhcnNlSW50KGkpKSwgb3B0aW9ucyk7XG5cdH1cblxuXHRzdGF0aWMgaW5pdChvcHRpb25zOiBJQ29pbk9wdGlvbnMgPSB7fSlcblx0e1xuXHRcdHJldHVybiAobmV3IHRoaXMob3B0aW9ucykpLnRvQ29pbk9iamVjdDtcblx0fVxuXG5cdHN0YXRpYyBwYWRTdHIobiwgbGVuKVxuXHR7XG5cdFx0biA9IG4udG9TdHJpbmcoKTtcblxuXHRcdGlmIChuLmxlbmd0aCA8IGxlbilcblx0XHR7XG5cdFx0XHRuID0gJzAnLnJlcGVhdChsZW4gLSBuLmxlbmd0aCkgKyBuO1xuXHRcdH1cblxuXHRcdHJldHVybiBuO1xuXHR9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvaW5PYmplY3RPcHRpb25zIGV4dGVuZHMgSUNvaW5PcHRpb25zXG57XG5cdHRvU3RyaW5nTnVtYmVyPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIENvaW5PYmplY3Rcbntcblx0cHVibGljIG9wdGlvbnM6IElDb2luT2JqZWN0T3B0aW9ucztcblx0cHJpdmF0ZSBkYXRhOiB2Q29pbltdO1xuXG5cdGNvbnN0cnVjdG9yKGRhdGEsIG9wdGlvbnM6IElDb2luT2JqZWN0T3B0aW9ucyA9IHt9KVxuXHR7XG5cdFx0dGhpcy5kYXRhID0gZGF0YTtcblx0XHR0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXHR9XG5cblx0dG9PYmplY3QocGFkOiB2Qm9vbCA9IGZhbHNlKVxuXHR7XG5cdFx0bGV0IHJldCA9IHt9O1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9wdGlvbnMudW5pdF9uYW1lcy5sZW5ndGg7IGkrKylcblx0XHR7XG5cdFx0XHRyZXRbdGhpcy5vcHRpb25zLnVuaXRfbmFtZXNbaV1dID0gcGFkID8gQ29pbi5wYWRTdHIodGhpcy5kYXRhW2ldLCB0aGlzLm9wdGlvbnMudW5pdFtpXSkgOiB0aGlzLmRhdGFbaV07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJldDtcblx0fVxuXG5cdHRvSlNPTihwYWQ6IHZCb29sID0gZmFsc2UpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy50b09iamVjdChwYWQpO1xuXHR9XG5cblx0dG9OdW1iZXIoKTogbnVtYmVyXG5cdHtcblx0XHRsZXQgc2VsZiA9IHRoaXM7XG5cblx0XHRsZXQgbiA9IHRoaXMuZGF0YS5tYXAoKG4sIGkpID0+XG5cdFx0e1xuXHRcdFx0cmV0dXJuIENvaW4ucGFkU3RyKG4sIHNlbGYub3B0aW9ucy51bml0W2ldKTtcblx0XHR9KS5qb2luKCcnKTtcblxuXHRcdHJldHVybiBwYXJzZUludChuKTtcblx0fVxuXG5cdHRvU3RyaW5nKHBhZDogdkJvb2wgPSBmYWxzZSlcblx0e1xuXHRcdGlmICh0aGlzLm9wdGlvbnMudG9TdHJpbmdOdW1iZXIgPT0gdHJ1ZSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gdGhpcy50b051bWJlcigpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLnRvU3RyaW5nVW5pdChwYWQpO1xuXHR9XG5cblx0dG9TdHJpbmdVbml0KHBhZDogdkJvb2wgPSBmYWxzZSk6IHN0cmluZ1xuXHR7XG5cdFx0bGV0IGMgPSBbXTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhLmxlbmd0aDsgaSsrKVxuXHRcdHtcblx0XHRcdGlmICh0aGlzLmRhdGFbaV0pXG5cdFx0XHR7XG5cdFx0XHRcdGxldCBuID0gdGhpcy5kYXRhW2ldO1xuXG5cdFx0XHRcdGlmIChwYWQpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuID0gQ29pbi5wYWRTdHIobiwgdGhpcy5vcHRpb25zLnVuaXRbaV0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Yy5wdXNoKGAke259ICR7dGhpcy5vcHRpb25zLnVuaXRfbmFtZXNbaV19YCk7XG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gYy5qb2luKCcgJyk7XG5cdH1cblxuXHR0b0FycmF5KClcblx0e1xuXHRcdHJldHVybiB0aGlzLmRhdGEuc2xpY2UoKTtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdChvcHRpb25zOiBJQ29pbk9wdGlvbnMgPSB7fSwgb2JqY2xhc3MgPSBDb2luKVxue1xuXHRyZXR1cm4gb2JqY2xhc3MuaW5pdChvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZXhwb3J0cztcbiJdfQ==