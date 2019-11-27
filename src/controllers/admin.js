import User from '../models/admin';


// Conseguir datos de un user
function getAdmin(req, res){
    var userId = req.params.id;

    User.findById(userId, (err, user) => {
        if(err)return res.status(500).send({message: 'Error en la petición'});
if(!user) return res.status(404).send({message: 'EL usuario no existe'});
followThisUser(req.user.sub, userId).then((value) => {
            user.password = undefined;
            return res.status(200).send({
                user,
                following: value.following,
                followed: value.followed
            });
        });
        
    });
}