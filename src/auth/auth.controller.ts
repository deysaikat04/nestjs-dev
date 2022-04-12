import { Controller, Post } from "@nestjs/common";
import { stringify } from "querystring";
import { AuthService } from "./auth.service";

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup() {
        
    }

    @Post('signin')
    signin() {

    }
}