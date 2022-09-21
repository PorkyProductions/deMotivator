class Insult {
    length: number
    name: string
    constructor(name: string, length: number) {
        this.name = name
        this.length = length
    }
}


import {insults} from 'demotivator'

insults.forEach(insult => {
    new Insult(insult, insult.length)
    console.log(Insult)
});