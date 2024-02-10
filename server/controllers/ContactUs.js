const mailSender = require('../utils/mailSender');

exports.contactUs = async(req, res) => {
   try{
     //data fetch
     const{name, email, description} = req.body;

     //mail to sender
     const senderResponse = await mailSender(email, 'Thank for Contacting', "your response is reached to us");
 
     //mail to owner
     const ownerResponse = await mailSender(`deepakn9944@gmail.com`, `mail from ${name}`, `${description}`);
 
     //response
     return res.status(200).json({
         success:true,
         message: 'Thank You'
     })
   }catch(error){
    return res.status(500).json({
        success:false,
         message: 'Please try again'
    })
   }

}