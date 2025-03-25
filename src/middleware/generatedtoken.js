import jwt from "jsonwebtoken"
export const generated = (id) => {
    return jwt.sign(id, process.env.SECRET_KEY)
}