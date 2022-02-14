interface MegaInterface {
    cvalue: number | string | undefined | MegaType
}
type MegaType = Record<string, undefined | MegaInterface>;

interface BigObject {
    [a: string]: { cvalue: number | string | undefined | BigObject } | undefined;
}

function summ(a: MegaType) {
    const x = Object.keys(a).map((k) => {
        const elem = a[k];
        if (typeof elem === 'undefined') return 2022;
        if (typeof elem.cvalue === 'string') return +elem.cvalue || 2022;
        if (typeof elem.cvalue === 'object') return summ(elem.cvalue);
        return elem.cvalue;
    });
    let sum = 0;
    for (let i = 0; i < x.length; i++) {
        sum += x[i];
    }
    return sum;
}

let a = summ({ hello: { cvalue: 1 }, world: { cvalue: { yay: { cvalue: { ceivo: { cvalue: '5' }, toivo: { cvalue: 'abrakadabra' }, pryvit: {cvalue: 3 } } } } } });
console.log(a); // 2028

let b = summ({ hello: { cvalue: '200' }, draste: { cvalue: 35 } });
console.log(b); // 2023

let c = summ({ hello: undefined });
console.log(c); // 2022

