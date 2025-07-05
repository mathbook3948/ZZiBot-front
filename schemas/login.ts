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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const LoginSchemaType = z.infer<typeof LoginSchema>