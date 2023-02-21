import { BaseModel } from './base';

class Token extends BaseModel {
  token_id: string;
  token: string;
  user_id: string;

  constructor({
    token_id,
    token,
    user_id,
  }: Pick<Token, 'token_id' | 'token' | 'user_id'>) {
    super();
    this.token_id = token_id;
    this.token = token;
    this.user_id = user_id;
  }
}

export default Token;
