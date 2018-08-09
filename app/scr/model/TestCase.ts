import * as requestnp from "request-promise-native";

export class TestCase {
    private m_resource: string;
    private m_method: string;


    constructor(testCase?: TestCase) {
        if(testCase) {
            this.m_resource = testCase.resource;
            this.method = testCase.method;
        }
    }


    get resource() {
        return this.m_resource;
    }

    set resource(resource: string) {
        this.m_resource = resource;
    }

    get method() {
        return this.m_method;
    }

    set method(method: string) {
        this.m_method = method;
    }

    public execute() {
        var options = {
            uri: 'http://www.google.de',
            qs: {
                access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true // Automatically parses the JSON string in the response
        };

        requestnp(options)
            .then(function (repos) {
                console.log('User has %d repos', repos.length);
            })
            .catch(function (err) {
                // API call failed...
            });
    }
}