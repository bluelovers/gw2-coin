/**
 * Created by user on 2017/10/26/026.
 */
export interface ICoinOptions {
    unit?: vCoin | vCoin[];
    unit_level?: number;
    unit_names?: string[];
}
export declare type vBool = number | boolean;
export declare type vCoin = number | string;
export declare class Coin {
    defaultOptions: ICoinOptions;
    options: ICoinOptions;
    constructor(options?: ICoinOptions);
    private _options(options?);
    toCoinObject(num: vCoin, options?: ICoinOptions): CoinObject;
    static padStr(n: any, len: any): any;
}
export declare class CoinObject {
    options: ICoinOptions;
    private data;
    constructor(data: any, options?: ICoinOptions);
    toObject(pad?: vBool): {};
    toJSON(pad?: vBool): {};
    toNumber(): number;
    toString(pad?: vBool): string;
    toArray(): vCoin[];
}
export default exports;
