import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { createTransport } from 'nodemailer';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  findOne(filter: {
    where: {
      id?: string;
      username?: string;
      email?: string;
      resetToken?: string;
    };
  }): Promise<User> {
    return this.userModel.findOne({ ...filter });
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<User | { warningMessage: string }> {
    const user = new User();
    const existingByUserName = await this.findOne({
      where: { username: createUserDto.username },
    });
    const existingByEmail = await this.findOne({
      where: { email: createUserDto.email },
    });

    if (existingByUserName) {
      return { warningMessage: 'User with this name already exists' };
    }

    if (existingByEmail) {
      return { warningMessage: 'User with such email already exists' };
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    user.username = createUserDto.username;
    user.password = hashedPassword;
    user.email = createUserDto.email;

    return user.save();
  }

  async resetLink(email: string): Promise<{ status: number; message: string }> {
    try {
      const user = await this.findOne({ where: { email } });

      if (!user) {
        return {
          status: 401,
          message: 'User with such email not found',
        };
      }

      crypto.randomBytes(32, async (err, buffer) => {
        if (err) {
          return {
            status: 401,
            message: 'Something went wrong, try again',
          };
        }

        const token = buffer.toString('hex');

        user.resetToken = token;
        const expirationTime = Date.now() + 180 * 60 * 1000;
        user.resetTokenEXP = new Date(expirationTime);

        await user.save();

        const transporter = createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL,
          to: user.email,
          subject: 'restoring access',
          html: `<h1>Forgot your password?</h1>
            <p>If not, just ignore the letter.</p>
            <p>Otherwise, click on the link below to reset your password.</p>
           <p>Password reset link: <a href="${process.env.CLIENT_URL}/restore-password/${token}">reset a password</a></p>`,
        };

        await transporter.sendMail(mailOptions);
      });

      return {
        status: 200,
        message: 'Password reset link sent',
      };
    } catch (error) {
      console.log(error);
    }
  }

  async resetPassword(
    password: string,
    token: string,
  ): Promise<{ status: number; message: string }> {
    try {
      const user = await this.findOne({ where: { resetToken: token } });

      if (!user) {
        return { status: 401, message: 'Invalid access token' };
      }

      if (user.resetTokenEXP < new Date()) {
        return { status: 401, message: 'Token life time expired' };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      user.password = hashedPassword;
      user.resetToken = null;
      user.resetTokenEXP = null;

      await user.save();

      return { status: 200, message: 'Password changed' };
    } catch (error) {
      console.log(error);
    }
  }
}
