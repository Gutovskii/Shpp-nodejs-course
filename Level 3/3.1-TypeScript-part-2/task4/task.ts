type transformedObj<T> = Record<string, T>;

function mapObject<Prop, Res>(obj: transformedObj<Prop>, transformer: (prop: Prop) => Res) {
    const resultObj: transformedObj<Res> = {};
    for (let key in obj) {
        resultObj[key] = transformer(obj[key]);
    }
    return resultObj;
}

console.log(mapObject({ "roma" : 5, "vasya": 2 }, (x) => x + 3)); // { roma: 8, vasya: 5 }
console.log(mapObject({ "roma" : 5, "vasya": 2 }, (x) => x > 2)); // { roma: true, vasya: false }
console.log(mapObject({ "roma" : 5, "vasya": 2 }, (x) => [1, 2, 3])); // { roma: [ 1, 2, 3 ], vasya: [ 1, 2, 3 ] }