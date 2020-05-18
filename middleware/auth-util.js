module.exports = {
    isAuth: (req, res, next) => {
        return (req, res, next) => {
            // console.log(`req.session.passport.user:
            // ${JSON.stringify(req.session.passport)}`);
            if(req.isAuthenticated()) return next();

            // If not authenticated
            res.redirect('/signIn');
        };
    },
    isNotAuth: (req, res, next) => {
        return (req, res, next) => {
            // console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
            if(!req.isAuthenticated()) return next();
            console.log('already authenticated');
            
            // If not authenticated
            res.redirect(`/`);
        };
    },
    authCheck: (req, res, next) => {
        return (req, res, next) => {
            next();
            return req.isAuthenticated() 
        };
    },
};