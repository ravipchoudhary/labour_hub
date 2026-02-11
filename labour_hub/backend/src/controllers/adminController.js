import { connection, collectionName } from "../config/db.js"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { error } from "console";
import bcrypt from "bcrypt";
import nodemailer from 'nodemailer';
import { ObjectId } from "mongodb";


dotenv.config();

const secretKey = process.env.SECRET_KEY;
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const adminRegister = async (req, resp) => {

  try {
    const db = await connection();
    const { name, email, mobile, password } = req.body;
    const userData = req.body;
    if (!name, !email, !password) {
      return resp.status(400).send({
        message: "All fields are required",
        success: false,
    })
    }

    if (!mobile) {
      return resp.status(400).send({
        success: false,
        message: "Mobile number is required"
      });
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return resp.status(400).send({
        success: false,
        message: "Invalid mobile number"
      });
    }

    if (!isValidEmail(email)) {
      return resp.status(400).send({
        message: "invalid email",
        success: false
      })
    }

    if (password.length < 6) {
      return resp.status(400).send({
        message: "Password must at least 6 characters or more",
        success: false
      })
    }

    const existingUser = await db.collection(collectionName).findOne({ email });
    if (existingUser) {
      return resp.status(400).send({
        message: "email already registered",
        success: false
      })
    }
    if (userData.password !== userData.confirmPassword) {
      return resp.send({
        success: false,
        message: "password do not match"
      })
    };

    const existingMobile = await db
      .collection(collectionName)
      .findOne({ mobile });

    if (existingMobile) {
      return resp.status(400).send({
        success: false,
        message: "Mobile number already registered"
      });
    }
    delete userData.confirmPassword;
    userData.password = await bcrypt.hash(userData.password, 10)
    const result = await db.collection(collectionName).insertOne(userData);


    const token = jwt.sign({ id: result.insertedId, email: userData.email }, secretKey, { expiresIn: "50d" })
    resp.status(201).send({
      success: true,
      message: "signup success",
      token
    })
  } catch {
    resp.status(500).send({
      message: "User registered failed", error
    })
  }
};



export const adminLogin = async (req, resp) => {
  const { email, password } = req.body;
  const db = await connection();

  const user = await db.collection(collectionName).findOne({ email });

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id:user._id, email: user.email }, secretKey, { expiresIn: "50d" })
      resp.status(200).send({
        success: true,
        message: "login success",
        token:token
      })
    } else {
      resp.status(401).send({
        message: "password invalid",
        success: false
      })
    }
  } else {
    resp.status(404).send({
      message: "User not found", success: false
    })
  }
}




export const verifyForgotPassword = async (req, resp) => {
  try {
    const { email, mobile } = req.body;

    if (!email || !mobile) {
      return resp.status(400).send({
        success: false,
        message: "Email and mobile number are required"
      });
    }

    const db = await connection();

    const admin = await db.collection(collectionName).findOne({ email });

    if (!admin) {
      return resp.status(404).send({
        success: false,
        message: "Admin not found"
      });
    }

    if (admin.mobile !== mobile) {
      return resp.status(400).send({
        success: false,
        message: "Email and mobile number do not match"
      });
    }

    resp.send({
      success: true,
      message: "Verification successful"
    });

  } catch (err) {
    resp.status(500).send({
      success: false,
      message: err.message
    });
  }
};


export const resetPasswordDirect = async (req, resp) => {
  try {
    const { email, mobile, password } = req.body;

    if (!email || !mobile || !password) {
      return resp.status(400).send({
        success: false,
        message: "All fields are required"
      });
    }

    if (password.length < 6) {
      return resp.status(400).send({
        success: false,
        message: "Password must be at least 6 characters"
      });
    }

    const db = await connection();

    const admin = await db.collection(collectionName).findOne({ email });

    if (!admin || admin.mobile !== mobile) {
      return resp.status(400).send({
        success: false,
        message: "Verification failed"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection(collectionName).updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    resp.send({
      success: true,
      message: "Password reset successful"
    });

  } catch (err) {
    resp.status(500).send({
      success: false,
      message: err.message
    });
  }
};


export const getAdminProfile = async (req, resp) => {
  try {
    const db = await connection();
    const adminId = req.admin.id;

    const admin = await db.collection(collectionName).findOne(
      { _id: new ObjectId(adminId) },
      { projection: { password: 0 } }
    );

    if (!admin) {
      return resp.status(404).send({
        success: false,
        message: "Admin not found",
      });
    }

    resp.send({
      success: true,
      data: admin,
    });
  } catch (err) {
    resp.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};


export const updateAdminProfile = async (req, resp) => {
  try {
    const db = await connection();
    const adminId = req.admin.id;
    const { name, mobile } = req.body;

    await db.collection(collectionName).updateOne(
      { _id: new ObjectId(adminId) },
      {
        $set: {
          name,
          mobile,
        },
      }
    );

    resp.send({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (err) {
    resp.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};

export const changeAdminPassword = async (req, resp) => {
  try {
    const db = await connection();
    const adminId = req.admin.id;

    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return resp.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return resp.status(400).send({
        success: false,
        message: "Passwords do not match",
      });
    }

    if (newPassword.length < 6) {
      return resp.status(400).send({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const admin = await db
      .collection(collectionName)
      .findOne({ _id: new ObjectId(adminId) });

    if (!admin) {
      return resp.status(404).send({
        success: false,
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      admin.password
    );

    if (!isMatch) {
      return resp.status(401).send({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.collection(collectionName).updateOne(
      { _id: new ObjectId(adminId) },
      { $set: { password: hashedPassword } }
    );

    resp.send({
      success: true,
      message: "Password updated successfully",
    });

  } catch (err) {
    resp.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};