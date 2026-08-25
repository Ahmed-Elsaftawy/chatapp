import { ZodObject, ZodRawShape } from "zod";

interface EnvOptions {
    source?:NodeJS.ProcessEnv,
    serviceName?: string
}


type SchemaOutPut <TSchema extends ZodRawShape> = ZodObject<TSchema>["_output"]

export const createEnv = <TSchema extends ZodRawShape> (schema:ZodObject<TSchema>,options:EnvOptions = {}): SchemaOutPut<TSchema> => {
    const {source = process.env, serviceName = 'service'} = options
    const parse = schema.safeParse(source)


    if(!parse.success) {
        const formattedError = parse.error.format()
        throw new Error(`${serviceName} Failed, There is a Problem with environment varibales ${JSON.stringify(formattedError)}`)
    }
    return parse.data
}
export type EnvSchema<TShape extends ZodRawShape> = ZodObject<TShape>;