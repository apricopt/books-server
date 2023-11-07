import { Injectable } from '@nestjs/common';
import { LoginDTO, PurchasedBookDto, SignupDto } from './user.dto';
import { User } from 'src/Models/User';
import {
  sendVerificationCode,
  verifyVerificationCode,
} from '../../helper-functions/twilio';
import { getToken } from 'src/helper-functions/getToken';


@Injectable()
export class UserService {
  async getAll() {
    let users = await User.find({});
    return { status: 200, data: users };
  }

  async signup(obj: SignupDto) {
    let already = await User.findOne({ phone: obj.phone });
    if (already) {
      return { status: 200, message: 'User already exists' };
    }
    let user = new User(obj);
    await user.save();

    return { status: 200, message: 'User Sign up successful' };
  }

  async  getUserInfo(phone) {
    let user = await User.findOne({ phone });
    return { status :200 , data :user }
  }

  async getCheatToken(phone) {
    let user = await User.findOne({ phone });
    if(user == null) {

      return {status : 500 , message : "User Not found"}
    }
     let token = await getToken(phone);
     
     return { status :200 , message: "approved", token }
  }

  async login(obj: LoginDTO) {
        let user = await User.findOne({ phone: obj.mobile });
        if (user == null) {
          let user = new User(obj);
          user.userType = "STUDENT";
          await user.save();
        }
    
        const response = await sendVerificationCode(obj.mobile);
        return { ...response };
  }

  async loginDirect(obj: LoginDTO) {
    let user = await User.findOne({ phone: obj.mobile });

    if (user == null) {
      return { status: 500, message: 'user doesnot exist' };
    }

    return { status: 200, message: 'approved' };
  }

  async purchasedBooks(obj: PurchasedBookDto) {
    try {
      const filter = { phone: obj.phone };
      const update = { purchasedBooks: obj.bookIdies };
  
      const result = await User.findOneAndUpdate(filter, update);
  
      if (!result) {
        return { status: 200, message: "User Not found" };
      }
  
      return { status: 200, message: "Purchased Books updated for user!" };
    } catch (error) {
      return { status: 500, message: "Internal Server Error" };
    }
  }
  
  async getByPhone(req) {

    const phone = req.params.phone;

    let userData = await (await User.findOne({phone})).populate("purchasedBooks")
    if(userData) {
      return {status: 200, data: userData};
    }else {
      return {status:200, data:{}}
    }
  }
}
