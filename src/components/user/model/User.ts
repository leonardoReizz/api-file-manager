import mongoose, { Schema } from "mongoose";

export type UserProps = {
  _id: string;
  fullName: string;
  email: string;
  hashedPassword: string;
};

export const UserSchemaProps = new Schema<Omit<UserProps, "_id">>(
  {
    fullName: String,
    email: String,
    hashedPassword: String,
  },
  {
    timestamps: true,
  }
);

export const DBUSER = mongoose.model<Omit<UserProps, "_id">>(
  "users",
  UserSchemaProps,
  "users"
);
