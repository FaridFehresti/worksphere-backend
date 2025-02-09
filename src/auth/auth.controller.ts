import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('')
export class AuthController {
    constructor(private authService: AuthService) {
    }
    @Post('login')
    async login(@Body() body:{email:string, password:string}){
        const user = await this.authService.validateUser(body.email, body.password)
        if(!user){
            return{message:'invalid credentials'}
        }
        return this.authService.login(user)
    }
}
