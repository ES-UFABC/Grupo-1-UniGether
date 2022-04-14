export class Swipe implements ISwipe {

  constructor(
    public id?: number,
    public user_id1?: number,
    public user_id2?: number,
    public status?: boolean
  ) { }
}

export interface ISwipe {
  id?: number,
  user_id1?: number,
  user_id2?: number,
  status?: boolean,
}
