import { UserPayload } from './userPayload';

export class userPayloadClass {
  userPayload: UserPayload;

  constructor() {
    this.userPayload = {
      kakaoId: '',
      firebaseUid: '',
      email: '',
    };
  }
}
