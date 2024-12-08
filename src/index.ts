import { Blog } from "./classes/blogs";
import { Business } from "./classes/business";
import { Campaign } from "./classes/campaigns";
import { Company } from "./classes/company";
import { Contacts } from "./classes/contacts";
import { Workflow } from "./classes/contacts.workflows";
import { Course } from "./classes/courses";
import { Form } from "./classes/forms";
import { OAuth } from "./classes/oauth";
import { Survey } from "./classes/surveys";
import { TriggerLink } from "./classes/triggerlinks";
import { AuthData } from "./interfaces/auth/authdata";
import { Credientials } from "./interfaces/auth/credientials";
import axios from "axios";

export class Gohighlevel {

    public static BASEURL = 'https://services.leadconnectorhq.com';
    public credientials: Credientials;
    public oauth: OAuth;
    public contacts: Contacts;
    public campaigns: Campaign;
    public company: Company;
    public links: TriggerLink;
    public courses: Course;
    public businesses: Business;
    public workflows: Workflow;
    public surveys: Survey;
    public blogs: Blog;
    public forms: Form;

    private authData: AuthData;


    constructor(credientials: Credientials) {
        this.credientials = credientials;
        this.oauth = new OAuth(credientials);
        this.contacts = new Contacts();
        this.campaigns = new Campaign();
        this.company = new Company();
        this.links = new TriggerLink();
        this.courses = new Course();
        this.businesses = new Business();
        this.workflows = new Workflow();
        this.surveys = new Survey();
        this.blogs = new Blog();
        this.forms = new Form();
        this.authData = { access_token: "", locationId: "" };
    }

    /**
     * Set the Authorization Data for the GHL Account.
     * Set the auth after getting it from the GHL.oauth.getOAuthURL()
     * @param authData 
     */
    setAuth(authData: AuthData) {
        this.authData = authData;
        this.authData.headers = {
            "Version": authData?.headers?.Version || "2021-04-15",
            "Authorization": authData?.headers?.Authorization || "Bearer " + authData.access_token,
            "Accept": authData?.headers?.Accept || 'application/json'
        }
        this.contacts = new Contacts(authData);
        this.campaigns = new Campaign(authData);
        this.company = new Company(authData);
        this.links = new TriggerLink(authData);
        this.courses = new Course(authData);
        this.businesses = new Business(authData);
        this.workflows = new Workflow(authData);
        this.surveys = new Survey(authData);
        this.blogs = new Blog(authData);
        this.forms = new Form(authData);
    }

    /**
     * Retrieves the authentication tokens based on the refresh token.
     * If the current token hasn't expired, the current token is returned.
     * Otherwise, the token is refreshed and the new token is returned.
     * If an error occurs when refreshing the token, the current token is returned.
     * @returns The authentication tokens including the access token, refresh token, expires in time, scope, location ID, and user type.
     */
    async getAuth() {
        // Token hasn't expired
        if (this.authData.expires_in && !isNaN(parseInt(this.authData.expires_in.toString())) && parseInt(this.authData.expires_in.toString()) > Date.now()) return this.authData;

        try {
            const body = new URLSearchParams({
                grant_type: "refresh_token",
                client_id: this.credientials.clientId,
                client_secret: this.credientials.clientSecret,
                refresh_token: this.authData.refresh_token ?? ""
            })
            const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
            const response = await axios.post(`https://api.msgsndr.com/oauth/token`, body, { headers });
            const { access_token, expires_in, scope, locationId, userType } = response.data;

            // Todo save this new auth info
            this.authData = { access_token: access_token, locationId: locationId };
            return { access_token, expires_in, scope, locationId, userType } as AuthData;
        } catch (e) {
            return this.authData;
        }
    }

    /**
     * Determines if the given auth data has expired.
     * 
     * @returns True if the token has expired, false otherwise.
     */
    isAuthExpired() {
        // Token hasn't expired
        const stillGood = (this.authData.expires_in && !isNaN(parseInt(this.authData.expires_in.toString())) && parseInt(this.authData.expires_in.toString()) > Date.now())
        return !stillGood;
    }

}
