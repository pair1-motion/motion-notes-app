const   express = require('express'),
        app     = express(),
        session = require ('express-session'),
        bcrypt  = require ('bcryptjs'),
        PORT    = process.env.PORT || 3000

// body parser
app.use(express.urlencoded({ extended: false }))
// setting untuk menggunakan ejs
app.set('view engine', 'ejs')

function authChecker(req, res, next) {
    if (
        req.session.isLoggedIn ||
        req.path === '/' ||
        req.path === '/users/login' ||
        req.path === '/users' ||
        req.path === '/users/register'
    ) {
        // console.log ('masuk')
        next();
    } else {
        res.redirect("/")
    }
}


// inisialisasi session
app.use(session({
    // kunci session
    secret: "bestpairever",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}))

//middleware
app.use (authChecker)

// menggunakan router di index folder routers
app.use('/', require('./routers'))


// menjalankan sesuai PORT
app.listen(PORT, () => {
    console.log(`🔥🔥🔥 App running on: http://localhost:${PORT}/`)
})