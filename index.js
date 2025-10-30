import 'dotenv/config';
import express from 'express'
import passport from 'passport'
import session from 'express-session'
import connectDB from './config/database.js'
import './auth.js'

// Connect to database
connectDB();

function isLoggedIn(req,res,next){
    req.user ? next() : res.sendStatus(401);
}


const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 
    }
}));

app.use(passport.initialize());
app.use(passport.session());



app.get('/',(req,res)=>{
    res.send('<a href = "/auth/google">Authenticate with google </a>');
})

app.get('/auth/google',
    passport.authenticate('google',{
        scope:['email','profile'],
        prompt: 'select_account'  
    })
)

app.get('/google/callback',
    passport.authenticate('google',{
        successRedirect:'/protected',
        failureRedirect:'/auth/failure',
    })
)
app.get('/auth/failure',(req,res)=>{
    res.send("something went wrong")
})



app.get('/protected',isLoggedIn,(req,res)=>{
    console.log('User object:', req.user);
    res.send(`
        <h1>Hello ${req.user.name}!</h1>
        <p>Email: ${req.user.email}</p>
        <p>Google ID: ${req.user.googleId}</p>
        <p>Last Login: ${req.user.lastLogin}</p>
        <a href="/logout">Logout</a>
    `);
})

app.get('/logout',(req,res)=>{
   req.logout((err) => {
       if (err) return next(err);
       req.session.destroy();
       res.send("Logout");
   });
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', ()=>{
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment PORT: ${process.env.PORT}`);
})