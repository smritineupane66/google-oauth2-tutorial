import express from 'express'
import passport from 'passport'
import session from 'express-session'
import './auth.js'

function isLoggedIn(req,res,next){
    req.user ? next() : res.sendStatus(401);
}


const app = express();

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());



app.get('/',(req,res)=>{
    res.send('<a href = "/auth/google">Authenticate with google </a>');

})

app.get('/auth/google',
    passport.authenticate('google',{
        scope:['email','profile'],
        prompt: 'select_account'  // Forces account selection screen
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
    res.send(`hello ${req.user.displayName}`);
})

app.get('/logout',(req,res)=>{
   req.logout((err) => {
       if (err) return next(err);
       req.session.destroy();
       res.send("Logout");
   });
})


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})