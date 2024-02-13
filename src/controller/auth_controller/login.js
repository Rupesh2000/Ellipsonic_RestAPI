let users = require("../../models/userModel.js");

//Get user
module.exports.getAllUser = (req, res) => {
  users
    .find()
    .then((users) => {
      res.json({ status: "SUCCESS", users });
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    });
};

//Create user
module.exports.createuser = (req, res) => {
  const { name, email } = req.body;
  const newUser = new users({ name, email });
  newUser
    .save()
    .then(() => {
      res.json("user created");
    })
    .catch((error) => {
      res.json({ error: error });
    });
};

//update user
module.exports.updateuser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const updateData = {};
  if (name) {
    updateData.name = name;
  }
  if (email) {
    updateData.email = email;
  }

  // Update the user
  users
    .findByIdAndUpdate(id, updateData, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ status: "SUCCESS", user: updatedUser });
    })
    .catch((error) => {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to update user" });
    });
};

//delete user
module.exports.deleteuser = (req, res) => {
  const { id } = req.params;
  users
    .findByIdAndDelete(id, { isActive: false })
    .then(() => res.json({ status: "SUCCESS" }))
    .catch((error) => res.json({ error: error }));
};

//Change Active status
module.exports.deActivate = (req, res) => {
  const { id } = req.params;

  users
    .findByIdAndUpdate(id, { isActive: 0 })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ status: "SUCCESS", user: updatedUser });
    })
    .catch((error) => {
      console.error("Error deactivating user:", error);
      res.status(500).json({ error: "Failed to deactivate user" });
    });
};
