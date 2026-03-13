const express = require("express")
const path = require("path")
const userRouter = require("./routes/user")
const { connecteToMongoDB } = require("./connection")
const cookieParser = require('cookie-parser')
const { checkForAuthenticationCookie } = require('./middleware/authentication')

const app = express()
const PORT = 8000
connecteToMongoDB("mongodb://localhost:27017/blogify")
    .then(e => console.log("MongoDB connected"))

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(checkForAuthenticationCookie('token'))

app.get("/", (req, res) => {
    res.render("home", {
        user: req.user
    })
})

app.use("/user", userRouter)

app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
})