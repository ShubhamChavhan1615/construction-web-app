import contact from "../models/contact.model.js";

export const createcontact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log(req.body);
    if (!name || !email || !message) {
      return res.status(400).json({ messahe: "All field require" });
    }
    const contactreg = new contact({
      name,
      email,
      message,
    });
    await contactreg.save();
    res.redirect("/contact");
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "internal server error" });
  }
};

export const getallcontact = async (req, res) => {
  try {
    const contactdata = await contact.find();
    res.status(200).json(contactdata);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "internal server error" });
  }
};
