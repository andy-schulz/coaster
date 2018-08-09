export class ParameterInfo {

    constructor(p_name: string, p_position: string, p_value: string) {
        this.name = p_name;
        this.position = p_position;
        this.value = p_value;
    }
    name: string;
    position: string;
    value: string;
    format: string;
}