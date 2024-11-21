# Go High Level Node JS
Go Highlevel Node Js ease of use library implementation to their API. Make sure you've create a Go Highlevel App in the <a href="https://marketplace.gohighlevel.com/" target="_blank">Market Place</a>

## Brief Overview of the Library
We recommend that you glance over the official <a href="https://highlevel.stoplight.io/docs/integrations/0443d7d1a4bd0-overview" target="_blank">Go Highlevel Documentation</a>. We have tried to make the library have a corresponding function for each endpoint.


## Initialization
```
// Create Instance of Gohighlevel
const GHL = new Gohighlevel({
    // App Info from GHL Market Place
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_ID_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    
    isWhiteLabel: true,
    scopes: ["calendars.write"]
})
```



### OAuth URL
```
function oauth(req, res) {

    // use the scopes when initializing -> new Gohighlevel({ ... })
    let url = GHL.oauth.getOAuthURL()
    
    // or if you want to add scopes this way
    url = GHL.oauth
                // you can add the necessary scopes for your 
                // add scopes here
                .scopeBusinessesReadonly()
                .scopeBusinessesWrite()
                .scopeCalendarsReadonly()
                .scopeCalendarsEventsWrite()

                // get the oauth URL
                .getOAuthURL()
    

    return res.status(200).redirect(url);
}


```
### OAuth Callback
```
async function callback(req, res) {
    
    // Get Auth Info
    let code = req.query.code;
    let refresh_token = req.query.refresh_token;
    let authInfo = GHL.oauth.getCallbackAuthTokens({
        code: code,
        refresh_token: refresh_token
    });

    // Set Auth Info
    GHL.setAuth(authInfo);


    // Use GHL API
    // Corresponse with the endpoint - https://highlevel.stoplight.io/docs/integrations/ab55933a57f6f-get-contacts
    let contacts = await GHL.getContacts();

    return res.status(200).json(contacts);
}
```

