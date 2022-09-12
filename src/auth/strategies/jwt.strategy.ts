import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";

import { ExtractJwt, Strategy } from "passport-jwt";
import { Model } from "mongoose";

import { User } from "../../users/entities";
import { JwtPayload } from "../interfaces";

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {
    constructor(
        @InjectModel( User.name )
        private readonly userModel: Model<User>,

        private readonly configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    async validate( payload: JwtPayload ): Promise<User> {

        const { id } = payload;

        const user = await this.userModel.findById( id );

        if ( !user )
            throw new UnauthorizedException('Invalid token');

        if ( !user.isActive )
            throw new UnauthorizedException('User is inactive, talk with an admin');

        return user;
    }
}


