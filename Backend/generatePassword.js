import bcrypt from "bcrypt";

const hashPassword = async () => {
  const hashed = await bcrypt.hash("admin98", 10);
  console.log("Hashed Password:", hashed);
};

hashPassword();
