import {number, object, string, z} from "zod"

export const signInSchema = object({
    email: string()
        .nonempty('Email is required')
        .email("Invalid email"),
    password: string()
        .nonempty('Password is required')
        .min(6, "Password must be more than 6 characters")
        .max(32, "Password must be less than 32 characters"),
})

export const ingredientSchema = object({
    name: string()
        .nonempty('Name is required'),
    category: z.enum([
        "VEGETABLES",
        "FRUITS",
        "MEAT",
        "DAIRY",
        "SPICES",
        "OTHER"
    ]),
    unit: z.enum(["GRAMS", "KILOGRAMS", "LITERS", "MILLILITERS", "PIECES"]),
    pricePerUnit: number()
        .min(0, "Цена должна быть положительной")
        .nullable(),
    description: z.string().optional(),
})