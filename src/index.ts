import { OAuth } from "./classes/oauth";
import { Credientials } from "./interfaces/credientials";

export class Gohighlevel {
    public credientials: Credientials;
    public oauth: OAuth;
    constructor(credientials: Credientials) {
        this.credientials = credientials;
        this.oauth = new OAuth(credientials)
    }
}


