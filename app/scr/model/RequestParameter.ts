import { getLogger } from 'log4js';
import {OASParameter} from "../openAPI/OASDocument";


export type ValueType = string | number | boolean |  string[] | number[] | boolean[] | object;
export abstract class RequestParameter {

    protected readonly logger = getLogger(this.constructor.name);
    private m_value: ValueType;
    protected m_parameterText: string = "";
    protected readonly m_parameter: OASParameter;


    protected constructor(parameter: OASParameter) {
        this.m_parameter = parameter;
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

    get style() {
        return this.m_parameter.style;
    }

    get explode() {
        return this.m_parameter.explode;
    }

    protected abstract expand (value: ValueType): string;

}