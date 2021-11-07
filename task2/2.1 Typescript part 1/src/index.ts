// 1. 
function getFirstWord(a: string): number {
	return a.split(/ +/)[0].length;
}

console.log(getFirstWord('aboba + biba'));

// 2. 
interface INameSurname {
    name: string
    surname: string
}

interface IFullnameInitials {
    fullname: string
    initials: string
}

function getUserNamings(a: INameSurname): IFullnameInitials {
    return { 
        fullname: a.name + " " + a.surname, 
        initials: a.name[0] + "." + a.surname[0] 
    };
}

console.log(getUserNamings({name: 'Volodimir', surname: 'Gutovskiy'}));

// 3. 
interface IProduct {
    name: string
}

interface IShop {
    products: IProduct[] 
}

function getAllProductNames(shop: IShop) {
    return shop?.products?.map(prod => prod?.name) || [];
}

const shop: IShop = {
    products: [
        {name: 'Gloves'},
        {name: 'Pants'},
        {name: 'Jacket'},
    ]
}

console.log(getAllProductNames(shop));

// 4.1
// easy way is using 'as' keyword
// hard way is ?...

interface IName {
    name(): string
}

function hey(a: IName) {
    return "hey! i'm " + a.name();
}

console.log(hey({name: () => "roma", cuteness: 100} as IName))
console.log(hey(<IName>{name: () => "vasya", coolness: 100}))

// 4.2
abstract class Pet {
    constructor (petName: string) {
        this.petName = petName
    }

    private petName: string

    public name(): string {
        return this.petName
    }
}

class Cat extends Pet {
    constructor(petName: string, isCasrated: boolean) {
        super(petName)
    }
}

class Dog extends Pet {
    constructor(petName: string, price: number) {
        super(petName)
    }
}

function hi(abstractPet: Pet) {
    return "hi! i'm " + abstractPet.name();
}

let a = new Cat("myavchik", true)
let b = new Dog("gavchik", 333) 

console.log(hi(a))
console.log(hi(b))

// 4.3
type Person = {
    name(): string
    type: string
    coolness?: number
    cuteness?: number
}

function greetings(a: Person) {
    return "greetings! i'm " + a.name()
		 + (a.type === "cat" ? (" cuteness: "+a.cuteness) : (" coolness: "+a.coolness))
}
console.log(greetings({name: () => "roma", type: "cat", cuteness: 100}))
console.log(greetings({name: () => "vasya", type: "dog", coolness: 100}))

// 5.
// google for Record type
interface ISubjectInfo {
    name: string
    credits: number
}

type SubjectName = 'vyshmat' | 'fizyka' | 'dyscretna'

function stringEntries(a: Record<SubjectName, ISubjectInfo>) {
    return Array.isArray(a) ? a : Object.keys(a)
}

const subjects: Record<SubjectName, ISubjectInfo> = {
    vyshmat: {name: 'vyshmat', credits: 8},
    fizyka: {name: 'fizyka', credits: 4},
    dyscretna: {name: 'dyscretna', credits: 4}
}

console.log(stringEntries(subjects))

// 6.

async function world(a: number) {
    return "*".repeat(a)
}
const hello = async (): Promise<string> => {
   return await world(10)
}
hello().then(r => console.log(r)).catch(e => console.log("fail"))