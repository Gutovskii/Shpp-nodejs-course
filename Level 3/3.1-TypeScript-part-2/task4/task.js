function mapObject(obj, transformer) {
    var resultObj = {};
    for (var key in obj) {
        resultObj[key] = transformer(obj[key]);
    }
    return resultObj;
}
console.log(mapObject({ "roma": 5, "vasya": 2 }, function (x) { return x + 3; }));
console.log(mapObject({ "roma": 5, "vasya": 2 }, function (x) { return x > 2; }));
console.log(mapObject({ "roma": 5, "vasya": 2 }, function (x) { return [1, 2, 3]; }));
