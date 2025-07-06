import { z } from 'zod'

export const LoginSchema = z.object({
    username: z
        .string()
        .trim()
        .min(1, { message: '아이디를 입력하세요.' }),
    password: z
        .string()
        .min(1, { message: '비밀번호를 입력하세요.' }),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>