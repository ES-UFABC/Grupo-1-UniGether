export class DadosPessoais implements IDadosPessoais {

  constructor(
    public id?: number,
    public name: string = '',
    public age?: number,
    public initial_year?: number,
    public gender: string = '',
    public shift: string = '',
    public bio: string = '',
    public search_for: string = '',
    public email: string = '',
    public oldPassword: string = '',
    public password: string = '',
    public confirmPassword: string = '',
    public image_url: string = ''
  ) { }
}

export interface IDadosPessoais {
  id?: number,
  name: string,
  age?: number,
  initial_year?: number,
  gender: string,
  shift: string,
  bio: string,
  search_for: string,
  email: string,
  oldPassword: string,
  password: string,
  image_url: string
}
