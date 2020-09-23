const   express = require('express'),
        app     = express(),
        PORT    = 3000

// body parser
app.use(express.urlencoded({ extended: false }))
// setting untuk menggunakan ejs
app.set('view engine', 'ejs')

// menggunakan router di index folder routers
app.use('/', require('./routers'))

// menjalankan sesuai PORT
app.listen(PORT, () => {
    console.log(`🔥🔥🔥 App running on: http://localhost:${PORT}/`)
})