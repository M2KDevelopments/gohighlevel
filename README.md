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
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: redirect_uri
});
```

### Authentication
```
function oauth(req, res) {
    const url = GHL.oauth.getOAuthURL()
    return res.status(200).redirect(url);
}
```

### Auth Callback
```
function callback(req, res) {
    const query = req.query;
    const code = query.code;
    const refresh_token = query.refresh_token;
    const authInfo = GHL.oauth.getCallbackAuthTokens({
        code: code,
        refresh_token: refresh_token
    });
}
```

