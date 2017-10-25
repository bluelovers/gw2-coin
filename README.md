# gw2-coin

> convert number to game unit currency (default: gw2)

## Install

```
npm install gw2-coin
```

## defaultOptions

```
{
    unit: 2,
    unit_level: 3,
    unit_names: [
        'G',
        'S',
        'C',
    ],
}
```

## Usage

```
import Coin from 'gw2-coin';

let n = 123450709;

let options = {};

let a = (new Coin(options)).toCoinObject(n);

console.log(a, a + '');

console.log(b.toString(1));
console.log(b.toJSON(1));
console.log(b.toNumber());
console.log(b.toArray());

```
