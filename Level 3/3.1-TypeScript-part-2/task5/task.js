var Rectangle = /** @class */ (function () {
    function Rectangle() {
    }
    return Rectangle;
}());
var Circle = /** @class */ (function () {
    function Circle() {
    }
    return Circle;
}());
function produce(ctor, count) {
    var a = [];
    for (var i = 0; i < count; i++) {
        a.push(new ctor);
    }
    return a;
}
console.log(produce(Rectangle, 4));
