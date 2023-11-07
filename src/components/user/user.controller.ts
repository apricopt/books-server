import {
    Body,
    Controller,
    Post,
    Response,
    Request,
    HttpStatus,
    Get,
    UseGuards,
    Query,

} from '@nestjs/common';
import { UserService } from './user.service';
import { sendVerificationCode, verifyVerificationCode } from '../../helper-functions/twilio'
import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiBody,ApiResponse , ApiInternalServerErrorResponse } from '@nestjs/swagger';

import { AuthGuard } from '../../helper-functions/auth.guard';
import { SendVerificationCodeDto, SignupDto, LoginDTO, VerifyVerificationCodeDto, SendVerificationCodeResponse, VerifyVerificationCodeResponse, PurchasedBookDto } from './user.dto';


@ApiTags('user')
@Controller('user')
export class UserController {

    constructor(private readonly service: UserService) { }


    @Post('/login')
    @ApiBody({ type: LoginDTO })   
    async login(@Body() obj: LoginDTO, @Response() res, @Request() req) {
        const response = await this.service.login(obj);

        return res.status(HttpStatus.OK).json({
            ...response
        });
    }


    // @Post('/send-verification-code') 
    // @ApiOkResponse({type:SendVerificationCodeResponse})
    // async sendverificationcode(@Body() dto: SendVerificationCodeDto, @Response() res, @Request() req) {
    //     const response = await sendVerificationCode(dto.mobile);
    //     return res.status(HttpStatus.OK).json({
    //         ...response
    //     });
    // }

    @Post('/verify-verification-code')
    @ApiOkResponse({type: VerifyVerificationCodeResponse})
    async verifyVerificationCode(@Body() obj: VerifyVerificationCodeDto, @Response() res, @Request() req) {
        const response = await verifyVerificationCode(obj.mobile, obj.code);
        return res.status(HttpStatus.OK).json({
            ...response
        });
    }


    @Post('/get-cheat-token')
    @ApiBody({ type: LoginDTO })
    async getCheatToken(@Body() obj: LoginDTO, @Response() res, @Request() req) {
        const response = await this.service.getCheatToken(obj.mobile);
        return res.status(HttpStatus.OK).json({
            ...response
        });
    }

    @Post('/getUserInfo')
    @UseGuards(AuthGuard)
    @ApiBody({ type: LoginDTO })
    async getUserInfo(@Body() obj: LoginDTO, @Response() res, @Request() req) {
        const response = await this.service.getUserInfo(obj.mobile);
        return res.status(HttpStatus.OK).json({
            ...response
        });
    }


    @Post('/signup-admin')
    async signup(@Body() signupObj: SignupDto, @Response() res, @Request() req) {
        const response = await this.service.signup(signupObj);

        return res.status(HttpStatus.OK).json({
            ...response
        });
    }

    @Post('/purchased-books')
    async purchasedBooks(@Body() obj: PurchasedBookDto, @Response() res, @Request() req) {
        const response = await this.service.purchasedBooks(obj);

        return res.status(HttpStatus.OK).json({
            ...response
        });
    }


    @Get('/')
    async get(@Response() res, @Request() req) {
        const response = await this.service.getAll();
        return res.status(HttpStatus.OK).json({
            ...response
        });
    }

    @Get('/:phone')
    async getByPhone(@Response() res, @Request() req) {
        const response = await this.service.getByPhone(req);
        return res.status(HttpStatus.OK).json({
            ...response
        });
    }



   

  

  

}
