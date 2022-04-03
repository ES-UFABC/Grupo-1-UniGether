export class Profile implements IProfile {

  constructor(
    public id?: number,
    public name: string = '',
    public age?: number,
    public initial_year?: number,
    public gender: string = '',
    public shift: string = '',
    public bio: string = '',
    public search_for: string = '',
  ) { }
}

export interface IProfile {
  id?: number,
  name: string,
  age?: number,
  initial_year?: number,
  gender: string,
  shift: string,
  bio: string,
  search_for: string,
}
