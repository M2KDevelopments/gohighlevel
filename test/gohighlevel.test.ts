require('dotenv').config();
const { Gohighlevel } = require('../src/index');
const APIKEY = process.env.TEST_GHL_API_KEY

describe('Gohighlevel API Test', () => {

    test('API key should exist', () => expect(APIKEY).toBeDefined())

    test('OAuth URL Test', () => {
        const ghl = new Gohighlevel({ apiKey: APIKEY })
        const url = ghl.oauth.getOAuthURL()
        expect(typeof url).toBe('string')
    })

    test('GET Contacts API Endpoints', async () => {
        const ghl = new Gohighlevel({ apiKey: APIKEY })
        const contacts = await ghl.contacts.search("martin")
        expect(contacts.total).toBeDefined()
        expect(contacts.contacts).toBeDefined()
        expect(typeof contacts.total).toBe('number');
        expect(Array.isArray(contacts.contacts)).toBe(true);
        if (contacts.contacts.length) {
            const notes = await ghl.contacts.notes.getAll(contacts.contacts[0].id)
            expect(Array.isArray(notes)).toBe(true);
        }
    })

    test('GET Blogs API Endpoints', async () => {
        const ghl = new Gohighlevel({ apiKey: APIKEY })
        const auth = await ghl.getAuth();
        if (auth.useAPIKey) return;
        const locationId = auth.locationId;
        const authors = await ghl.blogs.getAllAuthors(locationId)
        const isSlugUrlExists = await ghl.blogs.isSlugUrlExists(locationId, 'blog')
        expect(Array.isArray(authors)).toBe(true)
        expect(typeof isSlugUrlExists).toBe('boolean')

    })

    test('GET Business API Endpoints', async () => {
        const ghl = new Gohighlevel({ apiKey: APIKEY })
        const auth = await ghl.getAuth();
        if (auth.useAPIKey) return;
        const locationId = auth.locationId;
        const businesses = await ghl.businesses.getAll(locationId)
        expect(Array.isArray(businesses)).toBe(true)
    })

    test('GET Surveys API Endpoints', async () => {
        const ghl = new Gohighlevel({ apiKey: APIKEY })
        const surveys = await ghl.surveys.getAll();
        const auth = await ghl.getAuth();
        if (auth.useAPIKey){
            expect(surveys.surveys).toBeDefined()
            expect(Array.isArray(surveys.surveys)).toBe(true);
        }else{
            expect(surveys.total).toBeDefined()
            expect(surveys.surveys).toBeDefined()
            expect(typeof surveys.total).toBe('number');
            expect(Array.isArray(surveys.surveys)).toBe(true);
        }
    })

    test('GET Links API Endpoints', async () => {
        const ghl = new Gohighlevel({ apiKey: APIKEY })
        const auth = await ghl.getAuth();
        if (auth.useAPIKey) return;
        const links = await ghl.links.getAll()
        expect(Array.isArray(links)).toBe(true)
    })

    test('GET Forms API Endpoints', async () => {
        const ghl = new Gohighlevel({ apiKey: APIKEY })
        const auth = await ghl.getAuth();
        if (auth.useAPIKey) {
            const forms = await ghl.forms.getAll() 
            expect(forms.forms).toBeDefined()
            expect(Array.isArray(forms.forms)).toBe(true);
        } else {
            const locationId = auth.locationId;
            const forms = await ghl.forms.getAll(locationId)
            expect(forms.total).toBeDefined()
            expect(forms.forms).toBeDefined()
            expect(typeof forms.total).toBe('number');
            expect(Array.isArray(forms.forms)).toBe(true);
        }

    })
 
    test('GET Calendar API Endpoints', async () => {
        const ghl = new Gohighlevel({ apiKey: APIKEY })
        const auth = await ghl.getAuth();
        if (auth.useAPIKey) return;
        const locationId = auth.locationId;
        const calendars = await ghl.calendar.getAll(locationId)
        const rooms = await ghl.calendar.resources.getAll("rooms")
        const equipments = await ghl.calendar.resources.getAll("equipments")
        const groups = await ghl.calendar.groups.getAll()
        expect(Array.isArray(calendars)).toBe(true)
        expect(Array.isArray(rooms)).toBe(true)
        expect(Array.isArray(equipments)).toBe(true)
        expect(Array.isArray(groups)).toBe(true)
    })


    test('GET Subaccount API Endpoints', async () => {
        const ghl = new Gohighlevel({ apiKey: APIKEY  })
        const auth =  await ghl.getAuth();
        if (auth.useAPIKey) return;
        const locationId = auth.locationId;
        const timezones = await  ghl.subaccounts.getTimezones(locationId)
        const customFields = await ghl.subaccounts.customFields.getAll()
        const customValues = await ghl.subaccounts.customValues.getAll()
        const subaccounts = await ghl.subaccounts.search(4)
        expect(Array.isArray(timezones)).toBe(true)
        expect(Array.isArray(customFields)).toBe(true)
        expect(Array.isArray(customValues)).toBe(true)
        expect(Array.isArray(subaccounts)).toBe(true)
    })
})