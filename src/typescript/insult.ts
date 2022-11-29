
import { insults } from 'demotivator'
import { userInsults } from './insults'
import type {bool, _Insult, _UserInsult} from './types'
class Insult implements _Insult {
    length: number
    name: string
    mean?: bool
    constructor(name: string, length: number, mean?: bool) {
        this.name = name
        this.length = length
        this.mean = mean
    }
}

class UserInsult extends Insult implements _UserInsult {
    containsUser: bool
    constructor(name: string, length: number, containsUser: bool, mean?: bool) {
        super(name, length, mean)
        this.name = name
        this.length = length,
        this.containsUser = containsUser,
        this.mean = mean
    }
} 


insults.forEach((insult: string ) => new Insult(insult, insult.length));
userInsults.forEach((userInsult: string) => new UserInsult(userInsult, userInsult.length, true))

export
{
    Insult,
    UserInsult
}