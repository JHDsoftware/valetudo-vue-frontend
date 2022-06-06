import {isEmpty, isNumber} from "lodash";

export function isNotBlank(val){
    return !isEmpty(val) || isNumber(val)
}


// 特别注意
// isEmpty(1) true **

// isEmpty([]) true
// isEmpty({}) true
// isEmpty(undefine) true
// isEmpty(NaN) true
// isEmpty('') true

// isEmpty([1]) false

