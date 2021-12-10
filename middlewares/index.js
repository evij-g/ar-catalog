function isLoggedIn(req, res, next){
if(req.session.currentUser){
    return next();
}  
  return res.redirect('/')
}


function isAnon(req, res, next){
    if(!req.session.currentUser){
       return next();
    } 
    return res.redirect('/private')

    }


function isAdmin(req, res, next){
    if(req.session.currentUser === 'info@evij.de'){
       return next();
    }
       return res.redirect('/private')
    }



module.exports = { isLoggedIn, isAnon, isAdmin }

