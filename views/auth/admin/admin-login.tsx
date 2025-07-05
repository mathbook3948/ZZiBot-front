'use client'

import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {LoginSchema} from '@/schemas/login'
import {z} from 'zod'
import {Form, FormControl, FormField, FormItem, FormMessage} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {signIn} from "next-auth/react";

type LoginSchemaType = z.infer<typeof LoginSchema>

const AdminLogin = () => {
    const form = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    })

    const onSubmit = async (data: LoginSchemaType) => {
        const res = await signIn('credentials', {
            username: data.username,
            password: data.password,
            redirect: false,
        })

        if(res?.error) {
            console.log(res.error)
        }
    }

    return (
        <div className="flex justify-center items-center h-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                    <div className="w-[300px] flex flex-col gap-3">
                        <div className="w-full flex flex-row justify-center gap-2">
                            <div className="text-2xl font-bold text-primary">
                                치봇
                            </div>
                            <div className="text-2xl">
                                관리자 로그인
                            </div>
                        </div>
                        <FormField
                            control={form.control}
                            name="username"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} placeholder="ID"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="password" {...field} placeholder="Password"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            로그인
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
export default AdminLogin
