import { Blog } from "./classes/blogs";
import { Business } from "./classes/business";
import { Calendar } from "./classes/calendars";
import { Campaign } from "./classes/campaigns";
import { Company } from "./classes/company";
import { Contacts } from "./classes/contacts";
import { Workflow } from "./classes/contacts.workflows";
import { Conversations } from "./classes/conversations";
import { Course } from "./classes/courses";
import { CustomFields } from "./classes/customfields";
import { CustomMenus } from "./classes/custommenus";
import { Email } from "./classes/email";
import { Form } from "./classes/forms";
import { Location } from "./classes/location";
import { MediaLibrary } from "./classes/medialibrary";
import { OAuth } from "./classes/oauth";
import { Opportunities } from "./classes/opportunities";
import { Products } from "./classes/products";
import { SaaS } from "./classes/saas";
import { Snapshots } from "./classes/snapshots";
import { SubAccount } from "./classes/subaccounts";
import { Survey } from "./classes/surveys";
import { TriggerLink } from "./classes/triggerlinks";
import { User } from "./classes/users";
import { AuthData } from "./interfaces/auth/authdata";
import { Credientials } from "./interfaces/auth/credientials";
import axios from "axios";

const BASE_API_URL = 'https://rest.gohighlevel.com/v1';
const PROD = "https://services.leadconnectorhq.com";
const MOCK = "https://stoplight.io/mocks/highlevel/integrations/39582850";


export class Gohighlevel {

    public credientials: Credientials;
    public oauth: OAuth;
    public calendar : Calendar;
    public contacts: Contacts;
    public conversations: Conversations;
    public medialibrary: MediaLibrary;
    public campaigns: Campaign;
    public company: Company;
    public links: TriggerLink;
    public courses: Course;
    public businesses: Business;
    public workflows: Workflow;
    public surveys: Survey;
    public blogs: Blog;
    public forms: Form;
    public subaccounts: SubAccount;
    public agency : { locations: Location, users:User};
    public customFields: CustomFields;
    public customMenus: CustomMenus;
    public opportunities: Opportunities;
    public products: Products;
    public saas: SaaS;
    public snapshots: Snapshots;
    public email: Email;

    private authData: AuthData;


    constructor(credientials: Credientials) {
        this.credientials = credientials;
        this.oauth = new OAuth(credientials);

        if (credientials.apiKey) {

            this.authData = {
                useAPIKey: true,
                baseurl: BASE_API_URL,
                access_token: credientials.apiKey,
                refresh_token: credientials.apiKey,
                headers: {
                    "Version": "2021-04-15",
                    "Authorization": "Bearer " + credientials.apiKey,
                    "Accept": 'application/json'
                }
            }
            this.contacts = new Contacts(this.authData);
            this.calendar = new Calendar(this.authData);
            this.campaigns = new Campaign(this.authData);
            this.company = new Company(this.authData);
            this.links = new TriggerLink(this.authData);
            this.conversations = new Conversations(this.authData);
            this.courses = new Course(this.authData);
            this.businesses = new Business(this.authData);
            this.workflows = new Workflow(this.authData);
            this.surveys = new Survey(this.authData);
            this.blogs = new Blog(this.authData);
            this.medialibrary = new MediaLibrary(this.authData);
            this.forms = new Form(this.authData);
            this.subaccounts = new SubAccount(this.authData);
            this.agency = {
                locations:new Location(this.authData),
                users:new User(this.authData)
            }
            this.customFields = new CustomFields(this.authData);
            this.customMenus = new CustomMenus(this.authData);
            this.opportunities = new Opportunities(this.authData);
            this.products = new Products(this.authData);
            this.saas = new SaaS(this.authData);
            this.snapshots = new Snapshots(this.authData);
            this.email = new Email(this.authData);
        } else {
            this.contacts = new Contacts();
            this.calendar = new Calendar();
            this.campaigns = new Campaign();
            this.conversations = new Conversations();
            this.company = new Company();
            this.links = new TriggerLink();
            this.courses = new Course();
            this.businesses = new Business();
            this.workflows = new Workflow();
            this.surveys = new Survey();
            this.blogs = new Blog();
            this.forms = new Form();
            this.medialibrary = new MediaLibrary();
            this.subaccounts = new SubAccount();
            this.agency = {
                locations:new Location(),
                users:new User()
            }
            this.customFields = new CustomFields();
            this.customMenus = new CustomMenus();
            this.opportunities = new Opportunities();
            this.products = new Products();
            this.saas = new SaaS();
            this.snapshots = new Snapshots();
            this.email = new Email();
            this.authData = { access_token: "", locationId: "" };
        }
    }


    /**
     * Use mock or live server
     * @param test 
     */
    setTestMode(test: boolean) {
        if (test) this.authData.baseurl = MOCK;
        else this.authData.baseurl = PROD;
    }

    /**
     * Set the Authorization Data for the GHL Account.
     * Set the auth after getting it from the GHL.oauth.getOAuthURL()
     * @param authData 
     */
    setAuth(authData: AuthData) {
        this.authData = authData;
        this.authData.baseurl = PROD;
        this.authData.headers = {
            "Version": authData?.headers?.Version || "2021-04-15",
            "Authorization": authData?.headers?.Authorization || "Bearer " + authData.access_token,
            "Accept": authData?.headers?.Accept || 'application/json'
        }
        this.contacts = new Contacts(authData);
        this.calendar = new Calendar(authData);
        this.campaigns = new Campaign(authData);
        this.conversations = new Conversations(authData);
        this.company = new Company(authData);
        this.links = new TriggerLink(authData);
        this.courses = new Course(authData);
        this.businesses = new Business(authData);
        this.workflows = new Workflow(authData);
        this.surveys = new Survey(authData);
        this.blogs = new Blog(authData);
        this.forms = new Form(authData);
        this.medialibrary = new MediaLibrary(authData);
        this.subaccounts = new SubAccount(authData);
        this.agency = {
            locations: new Location(authData),
            users: new User(authData)
        }
        this.customFields = new CustomFields(authData);
        this.customMenus = new CustomMenus(authData);
        this.opportunities = new Opportunities(authData);
        this.products = new Products(authData);
        this.saas = new SaaS(authData);
        this.snapshots = new Snapshots(authData);
        this.email = new Email(authData);
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
                client_id: this.credientials?.clientId || "",
                client_secret: this.credientials?.clientSecret || "",
                refresh_token: this.authData.refresh_token ?? ""
            })
            const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
            const response = await axios.post(`https://services.leadconnectorhq.com/oauth/token/`, body, { headers });
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