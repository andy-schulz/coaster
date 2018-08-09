import  "jasmine";
import {RequestParameterQuery} from "../../scr/model/RequestParameterQuery";
import {OASParameter, OASParameterQueryStyle} from "../../scr/openAPI/OASDocument";
import {NotImplementedError} from "../../scr/model/NotImplementedError";

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

       // default style = form
       // default explode = false

       it('should have an empty parameterText - (test case id: aa3e0d3b)',() => {
            const param = new RequestParameterQuery(query_parameter);
            expect(param.parameterText).toBe("");
       });

       it('should have a number query parameter - (test case id: 02fd2ed2)',() => {
           const param = new RequestParameterQuery(query_parameter);
           param.value = 6;
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

           expect(param.parameterText).toBe("?id=1,2,3,4");

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

           const assign = function() {
               param.value = [1,2,3,4]
           };

           expect( () => param.value = [1,2,3,4] ).toThrow(new NotImplementedError("Style 'deepObject' is not defined for value type 'array'"));

           // expect(param.parameterText).toBe("?id=1,2,3,4");

       });

       // it('should ', () => {
       //     const oasparameter = query_array_parameter;
       //     //paramForm.style = "something";
       // });
   })
});
