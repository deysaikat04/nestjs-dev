import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) {
        
    }
    signin() {

    }

    async signup(dto: AuthDto) {
        try {
            //generate the hased password
            const hash = await argon.hash(dto.password);

            // save user to db
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash
                },
                select: {
                    id: true,
                    email: true,
                    createdAt: true
                }
            })
            
            // return saved user
            return user;
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError) {
                // check for unique key code error
                if( error.code === 'P2002') {
                    throw new ForbiddenException('Credentails taken')
                }
            }
        }
        
    }
}