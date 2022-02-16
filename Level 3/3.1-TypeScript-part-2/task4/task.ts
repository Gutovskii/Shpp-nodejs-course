type transformedObj<T> = Record<string, T>;

function mapObject<Prop, Res>(obj: transformedObj<Prop>, transformer: (prop: Prop) => Res) {
    const resultObj: transformedObj<Res> = {};
    for (let key in obj) {
        resultObj[key] = transformer(obj[key]);
    }
    return resultObj;
}

console.log(mapObject({ "roma" : 5, "vasya": 2 }, (x) => x + 3));
console.log(mapObject({ "roma" : 5, "vasya": 2 }, (x) => x > 2));
console.log(mapObject({ "roma" : 5, "vasya": 2 }, (x) => [1,2,3]));