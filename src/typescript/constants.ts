var year = new Date().getFullYear();
export var PROD: boolean = process.env.NODE_ENV === "production"

import pkg from '../../package.json'

export let name = "(de)Motivator"

if (!PROD) {
    name = "(dev)Motivator"
}

export const version = pkg.version
export const shortName = "deMotivator"
export const parentCompany = "PorkyProductions"
export const url = "https://demotivator.web.app/"
export const banner = `

Copyright (c) 2020-${year}, ${parentCompany}, and contributors

This software is licensed under the ISC License.


`

export default {
    PROD,
    name,
    shortName,
    version,
    parentCompany,
    url,
    banner
}