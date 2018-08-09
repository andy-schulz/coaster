import { getLogger } from 'log4js';
import {OASParameter} from "../openAPI/OASDocument";


export type ValueType = string | number | boolean |  string[] | number[] | boolean[];
export abstract class RequestParameter {

    protected readonly logger = getLogger(this.constructor.name);

    protected readonly m_type: string;
    protected readonly m_name: string;
    private m_value: ValueType;

    protected m_parameterText: string = "";
    private m_arrayDelimiter = ",";

    protected readonly m_parameter: OASParameter;

    protected m_explode: boolean;

    constructor(parameter: OASParameter) {
        this.m_parameter = parameter;


        switch(parameter.in) {
            case "query": {
                break;
            }
            case "path": {
                //statements;
                break;
            }
            case "header": {
                //statements;
                break;
            }
            case "cookie": {
                //statements;
                break;
            }
            default: {
                const message: string = `Given Parameter ${name} does not have a type of (query | path | header | cookie)`;
                this.logger.error (message);
                throw Error(message);
            }
        }
    }

    set value(value: ValueType) {
        this.m_value = value;

        if(this.iscompatibleToType(value)){
            this.logger.debug(`PARAMETER compatible`);
            this.expand(value);
        } else {
            console.log(`PARAMETER NOT compatible`);
        }

    }

    get parameterText() {
        return this.m_parameterText;
    }

    /**
     * expand the value according to style and explode
     */

    private iscompatibleToType(value: ValueType): boolean {
        const schemaType = this.m_parameter.schema.type;

        if(schemaType == "array") {
            if(value instanceof Array) {

            } else {
                this.logger.warn(`Given parameter value ${value} does not match expected type '${schemaType}'.
                Use parameter value as is (negative test)`);
            }

        } else if(schemaType == "object") {

        } else if(schemaType == "string" || schemaType == "number" || schemaType == "boolean") {

        }

        // TODO implement Type Check for value
        return true;
    }

    protected expandArray(property: string, array: string[] | number[] | boolean[]): string[] {
        let arr: string[] = [];
        for (let elem of array) {
            let text = `${elem}`;
            arr.push(`${property}=${text}`)
        }

        return arr;
    }

    protected abstract expand (value: ValueType): string;

}