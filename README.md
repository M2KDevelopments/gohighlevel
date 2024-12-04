# Go High Level Node JS
Go Highlevel Node Js ease of use library implementation to their API.

## Examples
```
// App Info for GHL
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

// Create Instance of Gohighlevel
const GHL = new Gohighlevel({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_ID_SECRET,
    redirectUri: redirect_uri,
    isWhiteLabel: true,
    scopes: ["contacts.readonly", "contacts.write", "locations.readonly"]
})
```



### OAuth URL
```
function oauth(req, res) {
    const url = GHL.oauth.getOAuthURL()
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
    let contacts = await GHL.getContacts();

    return res.status(200).json(contacts);
}
```

