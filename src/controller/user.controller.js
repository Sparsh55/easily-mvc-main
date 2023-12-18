import UserModel from "../model/user.model.js";
import JobModel from "../model/job.model.js";


export default class UserController {

    postLogin(req, res) {

        const { email, password } = req.body;

        if (UserModel.authenticate(email, password)) {

            req.session.userEmail = email;
            
            res.redirect('/jobs');


        } else {
            console.log("Login failed");
            res.redirect('/');
        }

    }

    postRegister(req, res){
        const {name, email, password} = req.body;
        UserModel.add(name, email, password);
        req.session.userEmail = email;
        res.render('home', { user: req.session.userEmail  } );
    }

    logout(req, res) {


        req.session.destroy((err) => {
            if (err) {
              console.error('Error destroying session:', err);
            } else {
              res.redirect('/'); 
            }
        })
       
    }

}