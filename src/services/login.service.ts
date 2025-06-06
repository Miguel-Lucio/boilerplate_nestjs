import { sign } from "jsonwebtoken";
import { TLoginRequest } from "../interfaces/login.interface";
import { companyRepo } from "../repositories";
import { compare } from "bcryptjs";
import { loginReturnSchema } from "../schemas/login.schema";

export class LoginService {
  async generateToken(data: TLoginRequest) {
    const { cnpj, password } = data;

    const foundCompany = await companyRepo.findOne({
      where: { cnpj },
    });
    if (!foundCompany) {
      const content = {
        statusCode: 401,
        res: { message: "Invalid credentials." },
      };
      return content;
    }

    const matchPassword = await compare(password, foundCompany.password);
    if (!matchPassword) {
      const content = {
        statusCode: 401,
        res: { message: "Invalid credentials." },
      };
      return content;
    }
    const token: string = sign({}, process.env.SECRET_KEY!, {
      subject: foundCompany.id,
      expiresIn: "3h",
    });
    const content = {
      statusCode: 200,
      res: loginReturnSchema.parse({ token }),
    };

    return content;
  }
}
