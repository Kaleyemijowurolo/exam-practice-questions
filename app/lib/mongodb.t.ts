import mongoose from "mongoose";

// Declare the global namespace to add a custom Mongoose property
declare global {
  // Extend the NodeJS global object to include `mongoose`
  interface Global {
    mongoose: {
      conn: typeof mongoose | null;
      promise: Promise<typeof mongoose> | null;
    };
  }
}

// If this file has no import/export, convert it into a module by adding an empty export statement.
export {};
