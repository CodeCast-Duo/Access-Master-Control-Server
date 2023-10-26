const Types = {
	String: Symbol("string"),
	Boolean: Symbol("boolean"),
	Number: Symbol("number")
}

const Validators = {
    notNull: Symbol("notNull"),
}

const validateSchema = (schema, object) => {
    return new Promise((resolve, reject) => {
        const keys = Object.keys(object);
        keys.forEach(key => {
            const value = object[key];
            const type = schema[key].type;
            if( validateTypes(type, value)){
                const validators = schema[key].validators;
                if(validators){
                    validators.forEach(validator => {
                        if( !validateValidators(validator, value)){
                            return reject(new Error("Validator not correct"));
                        }
                    });
                }
        
            }else{
                return reject(new Error("Type not correct"));
            }
            
        });
        return resolve(object);
    });
}

const validateTypes = (type, value) => {
    switch (type) {
        case Types.String:
            return typeof value === 'string';
        case Types.Boolean:
            return typeof value === 'boolean';
        case Types.Number:
            return typeof value === 'number';
        default:
            return false;
    }
}

const validateValidators= (validator, value) => {
    switch (validator) {
        case Validators.notNull:
            return value !== null;
        default:
            return false;
    }
}

module.exports = {
    validateSchema,
    Types,
    Validators
}