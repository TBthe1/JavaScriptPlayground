import * as _ from 'lodash'

console.log("Koekoek")

async function hello() {
    return 'world';
}

const url = new URL('...')

interface Person {
    first: string;
    last: string;
    [key: string]: any
}

const person: Person = {
    first: 'Jeff',
    last: 'Delaney'
}

const person2: Person = {
    first: 'Usain',
    last: 'Bolt',
    fast: true
}