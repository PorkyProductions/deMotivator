class Insult {
    length: number
    name: string
    mean?: boolean
    constructor(name: string, length: number, mean?: boolean) {
        this.name = name
        this.length = length
    }
}


import { insults } from 'demotivator'

insults.forEach((insult: string ) => {new Insult(insult, insult.length)});

export default Insult