const { Gohighlevel } = require('../src/index')
const {IContact} = require('../src/interfaces/contact');
require('dotenv').config();

const APIKEY = process.env.TEST_GHL_API_KEY

describe('Gohighlevel Test', () => {

    test('API key should exist', () => {
        expect(APIKEY).toBeDefined()
    })

    test('Contacts API Endpoints', async () => {
        const ghl = new Gohighlevel({ apiKey: APIKEY })
        const contacts = await ghl.contacts.search("martin")
        expect(contacts).toBeInstanceOf("total")
        expect(contacts).toBeInstanceOf("contacts")
    })

})