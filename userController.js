const userModel = require('../model/userModel');



exports.createUser = async (req, res) => {
    try {
        const { username, email, bio, image, hash, salt } = req.body;
        const newUser = new userModel({ username, email, bio, image, hash, salt });
        await newUser.save();
        res.status(200).json({message: 'Création réussi', newUser});
    } catch (error) {
        console.log('Une erreur est survenue', error);
        res.status(500).json({errorMessage: error});
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

  // Obtenir un utilisateur par ID
exports.getUserById = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
        return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const doc = await userModel.findOneAndUpdate({_id: req.params.id}, req.body, {
            new: true
        });
        if (!doc) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(doc);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.deleteUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}