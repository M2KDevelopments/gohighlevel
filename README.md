# Go High Level Node JS

![Static Badge](https://img.shields.io/badge/m2kdevelopments-purple?style=plastic&logo=github&logoColor=purple&label=developer&link=https%3A%2F%2Fgithub.com%2Fm2kdevelopments)
![Static Badge](https://img.shields.io/badge/MIT-green?style=plastic&logo=license&logoColor=green&label=license)
![Static Badge](https://img.shields.io/badge/buy_me_a_coffee-yellow?style=plastic&logo=buymeacoffee&logoColor=yellow&label=support&link=https%3A%2F%2Fwww.buymeacoffee.com%2Fm2kdevelopments)
![Static Badge](https://img.shields.io/badge/paypal-blue?style=plastic&logo=paypal&logoColor=blue&label=support&link=https%3A%2F%2Fpaypal.me%2Fm2kdevelopment)
 
<br/>
<img src="./ghl.jpg" alt="Highlevel" width="420">
<br/>


Go Highlevel Node Js ease of use library implementation to their API. Make sure you've create a Go Highlevel App in the <a href="https://marketplace.gohighlevel.com/" target="_blank">Market Place</a>



## Brief Overview of the Library GHL APP
We recommend that you glance over the official <a href="https://highlevel.stoplight.io/docs/integrations/0443d7d1a4bd0-overview" target="_blank">Go Highlevel Documentation</a>. We have tried to make the library have a corresponding function for each endpoint. Enjoy the intellisense!

## Brief Overview of the Library GHL API Key
We recommend that you glance over the official <a href="https://public-api.gohighlevel.com/#intro" target="_blank">Go Highlevel Documentation</a>. We have tried to make the library have a corresponding function for each endpoint. Enjoy the intellisense!


## Initialization
```javascript
import { Gohighlevel } from 'gohighlevel'; // const { Gohighlevel } = require('gohighlevel');

// Create Instance of Gohighlevel

// if you want to use the OAuth Way
const GHL = new Gohighlevel({
    // App Info from GHL Market Place
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_ID_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    
    isWhiteLabel: true,
    scopes: ["contacts.readonly", "contacts.write", "locations.readonly"]
})

// Or if you just want to an API Key
// How to get API Key - https://www.youtube.com/watch?v=Blr6jTYP3nM&t=3s&pp=ygUeaG93IHRvIGdldCBnb2hpZ2hsZXZlbCBhcGkga2V5
const GHL = new Gohighlevel({ apiKey: process.env.GOHIGHLEVEL_API_KEY })
```



### OAuth URL
```javascript
// use the scopes when initializing -> new Gohighlevel({ ... })
let url = GHL.oauth.getOAuthURL()
    
// or if you want to add scopes this way
url = GHL.oauth
    // you can add the necessary scopes for your 
    // using the Builder Design Pattern
    .scopeBusinessesReadonly()
    .scopeBusinessesWrite()
    .scopeCalendarsReadonly()
    .scopeCalendarsEventsWrite()

    // get the oauth URL
    .getOAuthURL()

```



### OAuth Callback
```javascript
async function callback(req, res){
   // Get Auth Info
   const code = req.query.code;
   const refresh_token = req.query.refresh_token;
   const authInfo = await GHL.oauth.getCallbackAuthTokens({
        code: code,
        refresh_token: refresh_token
    });

   // log token values 
   console.log(authInfo.access_token, authInfo.refresh_token, authInfo.expires_in)
   
   // Set Auth Info
   GHL.setAuth(authInfo);
}
```


### Use the API i.e Getting Contacts
```javascript
// Use GHL API
// Corresponse with the endpoint - https://highlevel.stoplight.io/docs/integrations/ab55933a57f6f-get-contacts
const contacts = await GHL.getContacts();
console.log(contacts);
```



## Support
You can support us with any amount. It's all appreciated.

<a href="https://www.buymeacoffee.com/m2kdevelopments" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" />
</a>

<a href="https://paypal.me/m2kdevelopment" target="_blank">
    <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" alt="PayPal Logo" />
</a>
