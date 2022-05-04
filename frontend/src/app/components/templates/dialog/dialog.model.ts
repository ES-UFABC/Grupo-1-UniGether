export class Group implements IGroup {

  constructor(
    public id?: number,
    public name: string = '',
    public description: string = '',
    public closed: boolean = false,
  ) { }
}

export interface IGroup {
  id?: number,
  name: string,
  description: string,
  closed: boolean
}
