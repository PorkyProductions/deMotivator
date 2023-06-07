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

abstract class __Constants implements Constants {
    private static readonly __PROD: boolean =
        process.env.NODE_ENV === "production";
    private static readonly __name: string = "(de)Motivator";
    private static readonly __shortName: string = "deMotivator";
    private static readonly __parentCompany: string = "PorkyProductions";
    private static readonly __version: string = pkg.version;
    private static readonly __url: string = this.__PROD ? "https://demotivator.web.app/" : "http://localhost:5173/";
    private static readonly __banner: string = `
        Copyright (c) 2020-${year}, ${parentCompany}, and contributors
        This software is licensed under the ISC License.
    `;
    public static readonly PROD: boolean = this.__PROD;
    public static readonly appName: string = this.__name;
    public static readonly shortName: string = this.__shortName;
    public static readonly parentCompany: string = this.__parentCompany;
    public static readonly version: string = this.__version;
    public static readonly url: string = this.__url;
    public static readonly banner: string = this.__banner;
}

export class Constants extends __Constants {
    private constructor() {
        super();
    }
    private static readonly __instance: Constants = new Constants();
    public static getInstance() {
        return this.__instance;
    }
}