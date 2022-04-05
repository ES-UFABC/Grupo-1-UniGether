export class Match implements IMatch {

  constructor(
    public id?: number,
    public name: string = '',
    public university: string = '',
    public course: string = '',
    public age?: number,
    public bio: string = '',
    public image_url: string = '',
  ) { }
}

export interface IMatch {
  id?: number,
  name: string,
  university: string,
  course: string,
  age?: number,
  bio: string,
  image_url: string
}
