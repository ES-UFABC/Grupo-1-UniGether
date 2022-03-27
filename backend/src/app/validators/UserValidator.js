import * as Yup from "yup";

class UserValidator{
    async isValidCreate(user){
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
            confirmPassword: Yup.string().when('password',(password, field)=>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
        });
    
        if (!(await schema.isValid(user))) return false;
        return true;
    } 
    async isValidUpdate(user){
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            age: Yup.number().positive("O campo deve ser positivo.").integer("O campo deve ser um número inteiro."),
            initialYear: Yup.number().positive("O campo deve ser positivo.").integer("O campo deve ser um número inteiro."),
            gender: Yup.string(),
            searchFor: Yup.string(),
            oldPassword:Yup.string().min(6),
            password: Yup.string().min(6).when('oldPassword',(oldPassword,field)=>
                oldPassword ? field.required() : field
            ),
            confirmPassword: Yup.string().when('password',(password, field)=>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
        });
    
        if (!(await schema.isValid(user))) return false;
        return true;
    } 
}

export {UserValidator}