import * as nodemailer from "nodemailer";


const sendMail = async (req, res, next)=>{

    if(req.body.email){

        const recieverEmail = req.body.email;

        const transporter = nodemailer.createTransport({

            service: 'gmail',
            auth: {
              user: 'codingninjas2k16@gmail.com',
              pass: 'slwvvlczduktvhdj'
            }
          });
        
          const mailOptions = {
            from: 'codingninjas2k16@gmail.com',
            to: recieverEmail,
            subject: 'Applied for a Job',
            text: 'Congratulations you have successfully applied for a job at easily.com! I wish you all the best. Hope you will be shortlisted.'
          }
        
          try {
            const result = await transporter.sendMail(mailOptions);
            console.log("Success: Email sent to ", recieverEmail);
          } catch (err) {
            console.log(err);
          }

    }

    next();

}

export default sendMail