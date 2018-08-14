import  "jasmine";
import {RequestParameterQuery} from "../../scr/model/RequestParameterQuery";
import {OASParameter} from "../../scr/openAPI/OASDocument";
import {NotImplementedError} from "../../scr/model/error/NotImplementedError";
import {RequestParameterFactory} from "../../scr/model/RequestParameterFactory";
import {RequestParameterPath} from "../../scr/model/RequestParameterPath";

import {configure} from "log4js";
configure('./config/log4js.json');

describe("Given Parameter",() => {
    describe("of type query",() => {
       const query_parameter : OASParameter = {
           name: "username",
           in: "query",
           description: "The user name for login",
           required: true,
           schema: {
               type: "string"
           }
       };

        it('should be returned by the factory - (test case id: 1b535fd1)', () => {
            const param = RequestParameterFactory.getParameter(query_parameter);
            expect(param instanceof RequestParameterQuery).toBeTruthy("param not of type RequestParameterQuery")
        });

       // default style = form
       // default explode = false

       it('should have an empty parameterText - (test case id: aa3e0d3b)',() => {
            const param = new RequestParameterQuery(query_parameter);
            expect(param.parameterText).toBe("");
       });

       it('should have a number query parameter - (test case id: 02fd2ed2)',() => {
           const param = new RequestParameterQuery(query_parameter); param.value = 6;
           expect(param.parameterText).toBe("?username=6", "parameterText is not not exploded as expected");

       });

       it('should have a number query parameter - (test case id: b95de1c9)',() => {
           const param = new RequestParameterQuery(query_parameter);
           param.value = 6;
           expect(param.parameterText).toBe("?username=6", "parameterText is not not exploded as expected");
       });

       it('should have an floating point number query parameter - (test case id: 2c5f4181)',() => {
           const param = new RequestParameterQuery(query_parameter);
           param.value = 6.4;
           expect(param.parameterText).toBe("?username=6.4", "parameterText is not not exploded as expected");
       });

       it('should have a string query parameter - (test case id: a12f2295)',() =>{
           const param = new RequestParameterQuery(query_parameter);
           param.value = "stringParam";
           expect(param.parameterText).toBe("?username=stringParam", "parameterText is not not exploded as expected");
       });




       it('should not explode an array when its a string query parameter - (test case id: e1af0f43)',() =>{
           const param = new RequestParameterQuery(query_parameter);
           param.value = [1,2,3,4];
           expect(param.parameterText).toBe("?username=1,2,3,4", "parameterText is not not exploded as expected");
       });

       const query_array_parameter : OASParameter = {
           name: "id",
           in: "query",
           description: "IDs to search for.",
           required: true,
           schema: {
               type: "array"
           }
       };

       it('should explode to comma separated when style = undef and explode = undef - (test case id: 9dacf9f4)',() =>{
           const param = new RequestParameterQuery(query_array_parameter);
           param.value = [1,2,3,4];
           expect(param.parameterText).toBe("?id=1&id=2&id=3&id=4", "parameterText is not not exploded as expected");

       });

       it('should explode to ampersand(&) separated when explode = undef and style = form - (test case id: 48130b99)', () => {
           const oasparameter = query_array_parameter;
           oasparameter.style = "form";

           const param = new RequestParameterQuery(oasparameter);
           param.value = [1,2,3,4];

           expect(param.parameterText).toBe("?id=1&id=2&id=3&id=4");

       });

       it('should explode to comma separated when explode = false and style = form - (test case id: 5c1182bf)', () => {
           const oasparameter = query_array_parameter;
           oasparameter.style = "form";
           oasparameter.explode = false;

           const param = new RequestParameterQuery(oasparameter);
           param.value = [1,2,3,4];

           expect(param.parameterText).toBe("?id=1,2,3,4", `Given Parameter: ${param.style} - ${param.explode}`);

       });

       it('should explode to & separated property list when explode = true and style = form - (test case id: d296e12e)', () => {
           const oasparameter = query_array_parameter;
           oasparameter.style = "form";
           oasparameter.explode = true;

           const param = new RequestParameterQuery(oasparameter);
           param.value = [1,2,3,4];

           expect(param.parameterText).toBe("?id=1&id=2&id=3&id=4");

       });

       it('should explode to comma(,) separated value list when explode = undef and style = spaceDelimited - (test case id: 4a19d490)', () => {
           const oasparameter = query_array_parameter;
           oasparameter.style = "spaceDelimited";

           const param = new RequestParameterQuery(oasparameter);
           param.value = [1,2,3,4];

           expect(param.parameterText).toBe("?id=1&id=2&id=3&id=4");

       });

       it('should explode to comma(,) separated value list when explode = false and style = spaceDelimited - (test case id: 253db01c)', () => {
           const oasparameter = query_array_parameter;
           oasparameter.style = "spaceDelimited";
           oasparameter.explode = false;

           const param = new RequestParameterQuery(oasparameter);
           param.value = [1,2,3,4];

           expect(param.parameterText).toBe("?id=1%202%203%204");

       });

       it('should explode to space(\\s) separated property list when explode = true and style = spaceDelimited - (test case id: d9b599a5)', () => {
           const oasparameter = query_array_parameter;
           oasparameter.style = "spaceDelimited";
           oasparameter.explode = true;

           const param = new RequestParameterQuery(oasparameter);
           param.value = [1,2,3,4];

           expect(param.parameterText).toBe("?id=1&id=2&id=3&id=4");

       });

       it('should explode to comma(,) separated value list when explode = undef and style = pipeDelimited - (test case id: b827f99e)', () => {
           const oasparameter = query_array_parameter;
           oasparameter.style = "pipeDelimited";

           const param = new RequestParameterQuery(oasparameter);
           param.value = [1,2,3,4];

           expect(param.parameterText).toBe("?id=1&id=2&id=3&id=4");

       });

       it('should explode to comma(,) separated value list when explode = false and style = pipeDelimited - (test case id: c6832785)', () => {
           const oasparameter = query_array_parameter;
           oasparameter.style = "pipeDelimited";
           oasparameter.explode = false;

           const param = new RequestParameterQuery(oasparameter);
           param.value = [1,2,3,4];

           expect(param.parameterText).toBe("?id=1|2|3|4");

       });

       it('should explode to pipe(|) separated property list when explode = true and style = pipeDelimited - (test case id: 93ed86fa)', () => {
           const oasparameter = query_array_parameter;
           oasparameter.style = "pipeDelimited";
           oasparameter.explode = true;

           const param = new RequestParameterQuery(oasparameter);
           param.value = [1,2,3,4];

           expect(param.parameterText).toBe("?id=1&id=2&id=3&id=4");

       });

       it('should explode to comma(,) separated value list when explode = false and style = deepObject - (test case id: 7f79da53)', () => {
           const oasparameter = query_array_parameter;
           oasparameter.style = "deepObject";

           const param = new RequestParameterQuery(oasparameter);

           expect( () => param.value = [1,2,3,4] ).toThrow(new NotImplementedError("Style 'deepObject' is not defined for value type 'array'"));

           // expect(param.parameterText).toBe("?id=1,2,3,4");

       });


       // it('should ', () => {
       //     const oasparameter = query_array_parameter;
       //     //paramForm.style = "something";
       // });
   });
    describe('of type path', () => {
        const path_parameter : OASParameter = {
            name: "elements",
            in: "path",
            description: "elements to return",
            required: true,
            schema: {
                type: "string"
            }
        };
        //
        it('should be returned by the factory - (test case id: 3d5716e3)', () => {
            const param = RequestParameterFactory.getParameter(path_parameter);
            expect(param instanceof RequestParameterPath).toBeTruthy("param not of type RequestParameterPath")
        });

        // default style = form
        // default explode = false

        // TODO Check if this test case is valid
        it('should have an empty parameter - (test case id: 84705749)', () => {
            path_parameter.style = undefined;
            path_parameter.explode = undefined;

            const param = new RequestParameterPath(path_parameter);
            expect(param.parameterText).toBe("");
        });

        it('should return a value equal to  style = simple and explode = false when style and explode are not set. - (test case id: 8386536a)', () => {
            path_parameter.style = "simple";
            path_parameter.explode = true;

            const param = new RequestParameterPath(path_parameter);
            param.value = 6;
            expect(param.parameterText).toBe("6", "parameterText is not not exploded as expected");
        });

        it('should return the given value for default style = simple and explode = true - (test case id: 6faff552)', () => {
            path_parameter.style = "simple";
            path_parameter.explode = true;

            const param = new RequestParameterPath(path_parameter);
            param.value = 6;
            expect(param.parameterText).toBe("6", "parameterText is not not exploded as expected");
        });

        it('should return the given value for default style = simple and explode = false - (test case id: d721cba5)', () => {
            path_parameter.style = "simple";
            path_parameter.explode = false;

            const param = new RequestParameterPath(path_parameter);
            param.value = 6;
            expect(param.parameterText).toBe("6", "parameterText is not not exploded as expected");
        });

        // negative test
        it('should return comma separated value for style = label and explode = true - (test case id: 0116c1c1)', () => {
            path_parameter.style = "label";
            path_parameter.explode = true;

            const param = new RequestParameterPath(path_parameter);
            param.value = ['a','b','c','d'];
            expect(param.parameterText).toBe("a,b,c,d", "parameterText is not not exploded as expected");
        });



        const path_parameter_array : OASParameter = {
            name: "elements",
            in: "path",
            description: "elements to return",
            required: true,
            schema: {
                type: "array"
            }
        };
        // negative test
        it('should return a,b,c,d -(undef, undef, [a,b,c,d]) - (test case id: 1a162b1c)', () => {

            const param = new RequestParameterPath(path_parameter_array);
            param.value = ['a','b','c','d'];
            expect(param.parameterText).toBe("a,b,c,d", "Style: undef, Explode: undef, ['a','b','c','d']");
        });

        it('should return a,b,c,d -(simple, true, [a,b,c,d]) - (test case id: 937ccec7)', () => {
            path_parameter_array.style = "simple";
            path_parameter_array.explode = true;

            const param = new RequestParameterPath(path_parameter_array);
            param.value = ['a','b','c','d'];
            expect(param.parameterText).toBe("a,b,c,d", "Style: undef, Explode: undef, ['a','b','c','d']");
        });

        it('should return a,b,c,d -(simple, false, [a,b,c,d]) - (test case id: 87304c41)', () => {
            path_parameter_array.style = "simple";
            path_parameter_array.explode = false;

            const param = new RequestParameterPath(path_parameter_array);
            param.value = ['a','b','c','d'];
            expect(param.parameterText).toBe("a,b,c,d", "Style: undef, Explode: undef, ['a','b','c','d']");
        });


        it('should return .a.b.c.d (label, true, [a,b,c,d]) - (test case id: 460a9636)', () => {
            path_parameter_array.style = "label";
            path_parameter_array.explode = true;

            const param = new RequestParameterPath(path_parameter_array);
            param.value = ['a','b','c','d'];
            expect(param.parameterText).toBe(".a.b.c.d", "Style: label, Explode: true, ['a','b','c','d']");
        });

        it('should return .a,b,c,d" -(label, false, [a,b,c,d]) - (test case id: 92983b08)', () => {
            path_parameter_array.style = "label";
            path_parameter_array.explode = false;

            const param = new RequestParameterPath(path_parameter_array);
            param.value = ['a','b','c','d'];
            expect(param.parameterText).toBe(".a,b,c,d", "Style: label, Explode: false, ['a','b','c','d']");
        });

        it('should return ;elements=a;elements=b;elements=c;elements=d -(matrix, true, [a,b,c,d]) - (test case id: 870c2f66)', () => {
            path_parameter_array.style = "matrix";
            path_parameter_array.explode = true;

            const param = new RequestParameterPath(path_parameter_array);
            param.value = ['a','b','c','d'];
            expect(param.parameterText).toBe(";elements=a;elements=b;elements=c;elements=d", "Style: matrix, Explode: true, ['a','b','c','d']");
        });

        it('should return ;elements=a,b,c,d -(matrix, false, [a,b,c,d]) - (test case id: 9d740006)', () => {
            path_parameter_array.style = "matrix";
            path_parameter_array.explode = false;

            const param = new RequestParameterPath(path_parameter_array);
            param.value = ['a','b','c','d'];
            expect(param.parameterText).toBe(";elements=a,b,c,d", "Style: matrix, Explode: false, ['a','b','c','d']");
        });

        // negative test
        it('should return a,b,c,d -(simple, false, [a,b,c,d]) - (test case id: 4396ca56)', () => {
            path_parameter_array.style = "simple";
            path_parameter_array.explode = false;

            const param = new RequestParameterPath(path_parameter_array);
            expect( () => param.value = data ).toThrow(new TypeError("schema type of parameter elements should be an array but is: [object Object]."));
        });

        const object_parameter_array : OASParameter = {
            name: "elements",
            in: "path",
            description: "elements to return",
            required: true,
            schema: {
                type: `object`
            }
        };

        const data = {
            one: "one",
            two: 2,
            three: '3',
            "four": 4.1
        };


        /*
        from https://swagger.io/docs/specification/serialization/

        simple  false   one,one,two,2,three,3,four,4.1
        simple	true	one=one,two=2,three=3,four=4.1
        label	false	.one,one,two,2,three,3,four,4.1
        label	true	.one=one.two=2.three=3.four=4.1 ??? Is it possible to pass floating point numbers?
        matrix	false	;elements=one,one,two,2,three,3,four,4.1
        matrix	true	;one=one;two=2;three=3;four=4.1
        */

        it('should return one,one,two,2,three,3,four,4.1 -(simple, false, {object}) - (test case id: 08879512)', () => {
            object_parameter_array.style = "simple";
            object_parameter_array.explode = false;

            const param = new RequestParameterPath(object_parameter_array);
            param.value = data;
            expect(param.parameterText).toBe("one,one,two,2,three,3,four,4.1", "Style: simple, Explode: false, {object}");
        });

        it('should return one,one,two,2,three,3,four,4 -(simple, false, {object}) - (test case id: 7edcd4c1)', () => {
            object_parameter_array.style = "simple";
            object_parameter_array.explode = false;

            const data1 = {
                one: "one",
                two: 2,
                three: '3',
                "four": 4.0
            };

            const param = new RequestParameterPath(object_parameter_array);
            param.value = data1;
            expect(param.parameterText).toBe("one,one,two,2,three,3,four,4", "Style: simple, Explode: false, {object}");
        });

        it('should return one=one,two=2,three=3,four=4.1 -(simple, true, {object}) - (test case id: 04a5f902)', () => {
            object_parameter_array.style = "simple";
            object_parameter_array.explode = true;

            const param = new RequestParameterPath(object_parameter_array);
            param.value = data;
            expect(param.parameterText).toBe("one=one,two=2,three=3,four=4.1", "Style: simple, Explode: true, {object}");
        });

        it('should return .one,one,two,2,three,3,four,4.1 -(label, false, {object}) - (test case id: e1e09c57)', () => {
            object_parameter_array.style = "label";
            object_parameter_array.explode = false;

            const param = new RequestParameterPath(object_parameter_array);
            param.value = data;
            expect(param.parameterText).toBe(".one,one,two,2,three,3,four,4.1", "Style: label, Explode: false, {object}");
        });

        it('should return .one=one.two=2.three=3.four=4.1 -(label, true, {object}) - (test case id: f2fae013)', () => {
            object_parameter_array.style = "label";
            object_parameter_array.explode = true;

            const param = new RequestParameterPath(object_parameter_array);
            param.value = data;
            expect(param.parameterText).toBe(".one=one.two=2.three=3.four=4.1", "Style: label, Explode: true, {object}");
        });

        it('should return ;elements=one,one,two,2,three,3,four,4.1 -(matrix, false, {object}) - (test case id: ccabc5fa)', () => {
            object_parameter_array.style = "matrix";
            object_parameter_array.explode = false;

            const param = new RequestParameterPath(object_parameter_array);
            param.value = data;
            expect(param.parameterText).toBe(";elements=one,one,two,2,three,3,four,4.1", "Style: matrix, Explode: false, {object}");
        });

        it('should return ;one=one;two=2;three=3;four=4.1 -(matrix, true, {object}) - (test case id: 569c2926)', () => {
            object_parameter_array.style = "matrix";
            object_parameter_array.explode = true;

            const param = new RequestParameterPath(object_parameter_array);
            param.value = data;
            expect(param.parameterText).toBe(";one=one;two=2;three=3;four=4.1", "Style: matrix, Explode: true, {object}");
        });


    });
});
