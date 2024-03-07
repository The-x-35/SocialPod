import { z } from "zod";

export const SignupValidation = z.object({
    name: z.string().min(2,{message: 'Too short, must be greater than 2 characters.'}).max(50,{message: 'Too long, must be less than 50 characters.'}),
    username: z.string().min(2,{message: 'Too short, must be greater than 2 characters.'}).max(50,{message: 'Too long, must be less than 50 characters.'}),
    email: z.string().min(2,{message: 'Too short, must be greater than 2 characters.'}).max(320,{message: 'Too long, must be less than 320 characters.'}),
    password: z.string().min(8,{message: 'Too short, passwords must be at least 8 characters.'}).max(256,{message: 'Too long, must be less than 256 characters.'}),
  })

  export const SigninValidation = z.object({
    email: z.string().min(2,{message: 'Too short, must be greater than 2 characters.'}).max(320,{message: 'Too long, must be less than 320 characters.'}),
    password: z.string().min(8,{message: 'Too short, passwords must be at least 8 characters.'}).max(256,{message: 'Too long, must be less than 256 characters.'}),
  })

  export const PostValidation = z.object({
    caption: z.string().min(2,{message: 'Too short, must be greater than 2 characters.'}).max(2200,{message: 'Too long, must be less than 2200 characters.'}),
    file: z.custom<File[]>(),
    location: z.string().min(2,{message: 'Too short, must be greater than 2 characters.'}).max(2200,{message: 'Too long, must be less than 2200 characters.'}),
    tags: z.string().min(2,{message: 'Too short, must be greater than 2 characters.'}).max(2200,{message: 'Too long, must be less than 2200 characters.'}),
  })