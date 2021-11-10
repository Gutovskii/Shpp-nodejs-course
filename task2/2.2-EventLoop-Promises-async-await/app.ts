const path = require('path')
const express = require('express')
const nodeFetch = require('node-fetch')

const app = express()

const PORT: number = 3000

app.set('view engine', 'ejs')
app.set('views', path.resolve('ejs'))

// 1
interface IGetIp {
    ip: string
}

async function getIp(url: string): Promise<IGetIp> {
    const req: Response = await nodeFetch(url)
    const res: IGetIp = await req.json()
    console.log(res.ip)
    return res
}

getIp('https://api.ipify.org/?format=json')

// 3
interface IGetRandomName {
    id: number
    female_first_name: string
    first_name: string
    four_word_name: string
    initials: string
    last_name: string
    male_first_name: string
    middle_name: string
    name: string
    name_with_initials: string
    name_with_middle: string
    prefix: string
    two_word_name: string
    uid: string
}

// request using async/await
async function getRandomNameAsyncAwait(url: string): Promise<IGetRandomName> {
    const req: Response = await nodeFetch(url)
    const res: IGetRandomName = await req.json()
    return res
}

// request using promises
function getRandomNamePromises(url: string) {
    return nodeFetch(url)
            .then((req: Response) => req.json())
            .then((res: IGetRandomName) => res)
}

const reqArray: Promise<IGetRandomName>[] = []
reqArray[0] = getRandomNameAsyncAwait('https://random-data-api.com/api/name/random_name')
reqArray[1] = getRandomNameAsyncAwait('https://random-data-api.com/api/name/random_name')
reqArray[2] = getRandomNameAsyncAwait('https://random-data-api.com/api/name/random_name')

// 3.1
Promise.all(reqArray)
.then((dataArray) => {
    dataArray.forEach((data: IGetRandomName) => {
        console.log('3.1 ' + data.name)
    });
})

// 3.2
async function showNames() {
    for (let i: number = 0; i < reqArray.length; i++) {
        let data: IGetRandomName = await reqArray[i]
        console.log('3.2 ' + data.name)
    }
}
showNames()

// 3.3
for (let i: number = 0; i < reqArray.length; i++) {
    reqArray[i]
    .then((data: IGetRandomName) => {
        console.log('3.3 ' + data.name)
    })
}

// 4

interface IUserData {
    gender: string
}

function femaleChecker(user: IUserData): boolean {
    console.log(user.gender)
    return user.gender === 'Female' ? true : false
}

function getFemaleUserPromises(url: string) {
    let isFemale: boolean = false
    nodeFetch(url)
    .then((req: Response) => req.json())
    .then((res: IUserData) => {
        isFemale = femaleChecker(res)
        if (!isFemale) {
            getFemaleUserPromises(url)
            console.log('Female not found')
        }
        else {
            console.log(res)
            console.log('Female FOUND!')
        }
    })
}

async function getFemaleUserAsyncAwait(url: string) {
    let isFemale: boolean = false
    const req: Response = await nodeFetch(url)
    const res: IUserData = await req.json()
    isFemale = femaleChecker(res)
    if (!isFemale) {
        getFemaleUserAsyncAwait(url)
        console.log('Female not found')
    }
    else {
        console.log(res)
        console.log('Female FOUND!');
    }
}

getFemaleUserPromises('https://random-data-api.com/api/users/random_user')

app.listen(PORT)