export class Match implements IMatch {

  constructor(
    public id?: number,
    public name: string = '',
    public age?: number,
    public bio: string = '',
  ) { }
}

export interface IMatch {
  id?: number,
  name: string,
  age?: number,
  bio: string,
}
