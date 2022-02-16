function mapObject(obj, transformer) {
    var resultObj = {};
    for (var key in obj) {
        resultObj[key] = transformer(obj[key]);
    }
    return resultObj;
}
console.log(mapObject({ "roma": 5, "vasya": 2 }, function (x) { return x + 3; })); // { roma: 8, vasya: 5 }
console.log(mapObject({ "roma": 5, "vasya": 2 }, function (x) { return x > 2; })); // { roma: true, vasya: false }
console.log(mapObject({ "roma": 5, "vasya": 2 }, function (x) { return [1, 2, 3]; })); // { roma: [ 1, 2, 3 ], vasya: [ 1, 2, 3 ] }
