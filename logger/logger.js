// Logger Middleware
module.exports = () => {
    return (req, res, next) => {
            const time = new Date().toISOString()
            console.log(`[${time}] ${req.method} ${req.url}`)
            next()
        }               
}