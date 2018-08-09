import {TestCase} from "./TestCase";

export class TestCaseBuilder {
    private m_resource: string = "";
    private m_method: string = "";
    private m_name: string = "";

    constructor (builder?: TestCaseBuilder) {
        if(builder) {
            this.m_resource = builder.resource;
            this.m_method = builder.method;
        }
    }

    getTestCase() {

        const testCase: TestCase = new TestCase();
        testCase.resource = this.resource;
        testCase.method = this.method;

        return testCase;
    }

    getTestCaseBuilder() {
        return new TestCaseBuilder(this);
    }

    set resource(resource: string) {
        this.m_resource = resource
    }

    get resource() {
        return this.m_resource
    }

    set method(method: string) {
        this.m_method = method
    }

    get method() {
        return this.m_method;
    }



}