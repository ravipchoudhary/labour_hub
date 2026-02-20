import { connection, collectionName } from "../config/db.js"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from "bcrypt";
import nodemailer from 'nodemailer';
import { ObjectId } from "mongodb";
import {OAuth2Client} from "google-auth-library";


dotenv.config();

const secretKey = process.env.SECRET_KEY;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};



export const adminLogin = async (req, resp) => {
  try {
    const { email, password } = req.body;
    const db = await connection();

    if (!email) {
      return resp.status(400).send({
        success: false,
        message: "Email is required"
      });
    }

    if (!password) {
      return resp.status(401).send({
        success: false,
        message: "Password is required"
      });
    }

    if (!isValidEmail(email)) {
      return resp.status(400).send({
        success: false,
        message: "Invalid email format"
      });
    }

    if (password.length < 6) {
      return resp.status(401).send({
        success: false,
        message: "Password must be at least 6 characters"
      });
    }

    const user = await db.collection(collectionName).findOne({ email });

    if (!user) {
      return resp.status(404).send({
        success: false,
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return resp.status(401).send({
        success: false,
        field:"password",
        message: "Wrong Password"
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      secretKey,
      { expiresIn: "50d" }
    );

    return resp.status(200).send({
    const token = jwt.sign({ id: result.insertedId, email: userData.email }, secretKey, { expiresIn: "50d" })
    resp.status(201).send({
      success: true,
      message: "Login success",
      token
    });

  } catch (error) {
    return resp.status(500).send({
      success: false,
      message: "Server error"
    });
  }
};

export const googleAdminLogin = async (req, resp) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    const db = await connection();

    let user = await db.collection(collectionName).findOne({ email });

    if (!user) {
      const result = await db.collection(collectionName).insertOne({
        name,
        email,
        googleLogin: true,
        createdAt: new Date(),
      });

      user = {
        _id: result.insertedId,
        email,
      };
    }

    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      secretKey,
      { expiresIn: "50d" }
    );

    return resp.status(200).send({
      success: true,
      token: jwtToken,
    });
  } catch (error) {
    return resp.status(401).send({
      success: false,
      message: "Google authentication failed",
    });
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
    const { email, mobile, password,confirmPassword} = req.body;

    if (!email || !mobile || !password || !confirmPassword) {
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

    if (password !== confirmPassword) {
      return resp.status(400).send({
        success: false,
        message: "Password do not match "
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
      message: "server error"
    })
  }
}

export const getAllUsers = async (req, resp) => {
  try {
    const { role, status, search } = req.query;

    const db = await connection();

    let filter = {};
    if (role && role !== "all") {
      filter.role = role.toLowerCase();
    }
    if (status && status !== "all") {
      filter.status = status;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ]
    }
    const users = await db.collection("labour").find(filter).sort({ createdAt: -1 }).toArray();
    resp.status(200).send({
      success: true, users
    })
  }
  catch (error) {
    resp.status(500).send({
      success: false,
      message: "Failed to fetch users"
      message: "Server error",
    });
  }
};

export const updateUserStatus = async (req, resp) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const db = await connection();

    await db.collection("labour").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );
    resp.status(200).send({
      success: true,
      message: "Status updated"
    })
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Update failed"
    })
  }
}

export const getLabourVerification = async(req,resp)=> {
  try {
    const db = await connection();
    const labours = await db.collection("labour").find({
      role:"labour",status:"pending"}).sort({createdAt:-1}).toArray();

      resp.status(200).send({
        success:true,
        data:labours
      })
  } catch(error)  {
    resp.status(500).send({
      success:false
    })
  }
}

export const updateLabourVerificationStatus=async(req,resp)=> {
  try {
    const {id} = req.params;
    const {status} = req.body;

    const db = await connection();

    await db.collection("labour").updateOne({
      _id:new ObjectId(id)},
    {$set:{status}})

    resp.status(200).send({
      success:true,
      message:"Status updated"
    })
  } catch (error) {
    resp.status(500).send({
      success:false
    })
  }
}
