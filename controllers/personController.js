const Person = require("../models/personModel");

// Utility function to validate required fields
const validatePersonFields = (fields) => {
  const { name, age, gender, mobile } = fields;
  if (!name || !age || !gender || !mobile) {
    throw new Error("All fields (name, age, gender, mobile) are required");
  }
};

// GET /person - Retrieve all people
const handleGetAllPeople = async (req, res) => {
  try {
    const people = await Person.find();
    return res.status(200).json({ success: true, data: people });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// POST /person - Create a new person
const handleCreatePerson = async (req, res) => {
  try {
    validatePersonFields(req.body);

    const newPerson = new Person(req.body);
    const savedPerson = await newPerson.save();

    return res.status(201).json({ success: true, data: savedPerson });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

// PUT /person/:id - Update a person by ID
const handleUpdatePerson = async (req, res) => {
  const { id } = req.params;

  try {
    validatePersonFields(req.body);

    const updatedPerson = await Person.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!updatedPerson) {
      return res.status(404).json({ success: false, message: "Person not found" });
    }

    return res.status(200).json({ success: true, data: updatedPerson });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE /person/:id - Delete a person by ID
const handleDeletePerson = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPerson = await Person.findByIdAndDelete(id);

    if (!deletedPerson) {
      return res.status(404).json({ success: false, message: "Person not found" });
    }

    return res.status(200).json({ success: true, message: "Person deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// Exporting all handlers
module.exports = {
  handleGetAllPeople,
  handleCreatePerson,
  handleUpdatePerson,
  handleDeletePerson,
};
