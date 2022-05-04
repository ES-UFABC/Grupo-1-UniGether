export class ItsMatch implements IItsMatch {

  constructor(
    public id?: number,
    public name: string = '',
    public image_url: string = '',
  ) { }
}

export interface IItsMatch {
  id?: number,
  name: string,
  image_url: string
}
