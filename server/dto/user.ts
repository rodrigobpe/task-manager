export class User{
    id:string;
    name:string;
    email:string;
    password:string
}

export class CreateUserDto{
    name:string;
    email:string;
    password:string;
}

export class AuthUserResDto{
    user: {
        id:string,
        name: string,
        email: string
    }
    token: string
}

export class AuthUserDto{
    email:string;
    password:string;
}