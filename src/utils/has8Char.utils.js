function has8charUtils (password){
    if (password.length < 8) {
        const error = new Error("Password must have at least 8 character");
        error.statusCode = 404
        throw error
    }
}
export default has8charUtils