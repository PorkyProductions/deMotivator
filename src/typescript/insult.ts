class Insult {
    length: number
    name: string
    mean?: boolean
    constructor(name: string, length: number, mean?: boolean) {
        this.name = name
        this.length = length
    }
}

class UserInsult extends Insult {
    containsUser: boolean
    constructor(name: string, length: number, containsUser: boolean, mean?: boolean) {
        super(name, length, mean)
        this.name = name
        this.length = length,
        this.containsUser = containsUser,
        this.mean = mean
    }
} 


import { insults } from 'demotivator'
import { isTemplateLiteral } from 'typescript'
import { userInsults } from './insults'

insults.forEach((insult: string ) => {new Insult(insult, insult.length)});
userInsults.forEach((userInsult: string) => new UserInsult(userInsult, userInsult.length, true))

export
{
    Insult,
    UserInsult
}