"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// 1. 
function getFirstWord(a) {
    return a.split(/ +/)[0].length;
}
console.log(getFirstWord('aboba + biba'));
function getUserNamings(a) {
    return {
        fullname: a.name + " " + a.surname,
        initials: a.name[0] + "." + a.surname[0]
    };
}
console.log(getUserNamings({ name: 'Volodimir', surname: 'Gutovskiy' }));
function getAllProductNames(shop) {
    var _a;
    return ((_a = shop === null || shop === void 0 ? void 0 : shop.products) === null || _a === void 0 ? void 0 : _a.map(prod => prod === null || prod === void 0 ? void 0 : prod.name)) || [];
}
const shop = {
    products: [
        { name: 'Gloves' },
        { name: 'Pants' },
        { name: 'Jacket' },
    ]
};
console.log(getAllProductNames(shop));
function hey(a) {
    return "hey! i'm " + a.name();
}
console.log(hey({ name: () => "roma", cuteness: 100 }));
console.log(hey({ name: () => "vasya", coolness: 100 }));
// 4.2
class Pet {
    constructor(petName) {
        this.petName = petName;
    }
    name() {
        return this.petName;
    }
}
class Cat extends Pet {
    constructor(petName, isCasrated) {
        super(petName);
    }
}
class Dog extends Pet {
    constructor(petName, price) {
        super(petName);
    }
}
function hi(abstractPet) {
    return "hi! i'm " + abstractPet.name();
}
let a = new Cat("myavchik", true);
let b = new Dog("gavchik", 333);
console.log(hi(a));
console.log(hi(b));
function greetings(a) {
    return "greetings! i'm " + a.name()
        + (a.type === "cat" ? (" cuteness: " + a.cuteness) : (" coolness: " + a.coolness));
}
console.log(greetings({ name: () => "roma", type: "cat", cuteness: 100 }));
console.log(greetings({ name: () => "vasya", type: "dog", coolness: 100 }));
function stringEntries(a) {
    return Array.isArray(a) ? a : Object.keys(a);
}
const subjects = {
    vyshmat: { name: 'vyshmat', credits: 8 },
    fizyka: { name: 'fizyka', credits: 4 },
    dyscretna: { name: 'dyscretna', credits: 4 }
};
console.log(stringEntries(subjects));
// 6.
function world(a) {
    return "*".repeat(a);
}
const hello = () => __awaiter(void 0, void 0, void 0, function* () {
    return world(10);
});
hello().then(r => console.log(r)).catch(e => console.log("fail"));
