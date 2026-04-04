export interface RegisterData {
    username: string,
    email: string,
    password:string
}

export interface LoginData {
    username:string,
    password:string
}

export interface AuthResponse {
    access:string,
    refresh:string
}