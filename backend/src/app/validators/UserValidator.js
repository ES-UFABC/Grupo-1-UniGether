import * as Yup from "yup";

class UserValidator{
    async isValid(user){
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            phone: Yup.string(),
            password: Yup.string().min(6).required(),
            confirmPassword: Yup.string().when('password',(password, field)=>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
        });
    
        if (!(await schema.isValid(user))) return false;
        return true;
    } 
}

export {UserValidator}