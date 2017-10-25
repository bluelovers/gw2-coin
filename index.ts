/**
 * Created by user on 2017/10/26/026.
 */

export interface ICoinOptions
{
	unit?: vCoin | vCoin[];
	unit_level?: number;
	unit_names?: string[];
}

export type vBool = number | boolean;
export type vCoin = number | string;

export class Coin
{

	public defaultOptions = {
		unit: 2,
		unit_level: 3,
		unit_names: [
			'G',
			'S',
			'C',
		],
	} as ICoinOptions;

	public options: ICoinOptions;

	constructor(options: ICoinOptions = {})
	{
		this.options = this._options(options);
	}

	private _options(options: ICoinOptions = {})
	{
		return Object.assign({}, this.defaultOptions, options);
	}

	toCoinObject(num: vCoin, options: ICoinOptions = {})
	{
		options = Object.assign({}, this.options, options);

		if (typeof options.unit == 'number')
		{
			options.unit = (new Array(options.unit_level)).fill(options.unit);
		}

		num = num.toString();

		let j = 0;
		let a = [];

		for (let i = (options.unit.length - 1); i > 0; i--)
		{
			j = j - (options.unit[i] as number);

			let c = num.substr(j, options.unit[i] as number);

			a[i] = c;
		}

		let c = num.substr(0, num.length + j);
		a[0] = c;

		return new CoinObject(a.map(i => parseInt(i)), options);
	}

	static padStr(n, len)
	{
		n = n.toString();

		if (n.length < len)
		{
			n = '0'.repeat(len - n.length) + n;
		}

		return n;
	}
}

export class CoinObject
{
	public options: ICoinOptions;
	private data: vCoin[];

	constructor(data, options: ICoinOptions = {})
	{
		this.data = data;
		this.options = options;
	}

	toObject(pad: vBool = false)
	{
		let ret = {};

		for (let i = 0; i < this.options.unit_names.length; i++)
		{
			ret[this.options.unit_names[i]] = pad ? Coin.padStr(this.data[i], this.options.unit[i]) : this.data[i];
		}

		return ret;
	}

	toJSON(pad: vBool = false)
	{
		return this.toObject(pad);
	}

	toNumber()
	{
		let self = this;

		let n = this.data.map((n, i) =>
		{
			return Coin.padStr(n, self.options.unit[i]);
		}).join('');

		return parseInt(n);
	}

	toString(pad: vBool = false)
	{
		let c = [];

		for (let i = 0; i < this.data.length; i++)
		{
			if (this.data[i])
			{
				let n = this.data[i];

				if (pad)
				{
					n = Coin.padStr(n, this.options.unit[i]);
				}

				c.push(`${n} ${this.options.unit_names[i]}`);
			}

		}

		return c.join(' ');
	}

	toArray()
	{
		return this.data.slice();
	}
}

export default exports;
