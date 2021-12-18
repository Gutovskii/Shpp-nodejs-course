const Validator = {
    validateEmail(string) {
        const regExp = /^(?![\+\-\.])[a-zA-Z0-9\+\-\.]{2,20}\@(?![\+\-\.])[a-zA-Z0-9\.!$%&’*+\/=?^_-]{1,15}\.[a-zA-Z]{1,5}$/gi
        return regExp.test(string)
    },
    validatePhone(string) {
        const regExp = /^(\+38[\s\-]?|[\s\-]{0,4})?\(?(\d[\s\-\)]{0,2}){3}(\d[\s\-]?){7}$/g
        return regExp.test(string)
    },
    validatorPassword(string) {
        const regExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-z_]{8,}$/g
        return regExp.test(string)
    }
}

console.log('Email: ' + Validator.validateEmail('dancing.cat@gm.aaa.il.com')) // true
console.log('Email: ' + Validator.validateEmail('Cat@c.com')) // true
console.log('Email: ' + Validator.validateEmail('.dancing.cat@+gm.aaa.il.com')) // false
console.log('\n')

console.log('Phone: ' + Validator.validatePhone('--  (099) 567 890-1')) // true
console.log('Phone: ' + Validator.validatePhone('+38 (099) 567 890-1')) // true
console.log('Phone: ' + Validator.validatePhone('+48 (0993) 567 890-1')) // false
console.log('\n')

console.log('Password: ' + Validator.validatorPassword('C00l_Pass')) // true
console.log('Password: ' + Validator.validatorPassword('SupperPas1')) // true
console.log('Password: ' + Validator.validatorPassword('Cool_pass')) // false
console.log('Password: ' + Validator.validatorPassword('C00l')) // false

