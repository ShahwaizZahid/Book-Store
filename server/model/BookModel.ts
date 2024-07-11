import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  volumeInfo: {
    price: {
      type: String,
      required: true,
      default: "0",
    },
    title: {
      type: String,
      required: true,
      default: "React Projects",
    },
    category: {
      type: String,
      required: true,
      default: "free",
    },
    subtitle: {
      type: String,
      default:
        "Build 12 real-world applications from scratch using React, React Native, and React 360",
    },
    authors: {
      type: [String],
      default: ["Roy Derks"],
    },
    publisher: {
      type: String,
      default: "Packt Publishing Ltd",
    },
    publishedDate: {
      type: Date,
      default: new Date("2019-12-20"),
    },
    description: {
      type: String,
      required: true,
      default:
        "Build cross-platform applications of varying complexity for the web, mobile, and VR devices using React tooling Key FeaturesBuild React applications at scale using effective React patterns and best practices...",
    },
    pageCount: {
      type: Number,
      required: true,
      default: 465,
    },
    categories: {
      type: [String],
      default: ["Computers"],
    },
    imageLinks: {
      thumbnail: {
        type: String,
        default:
          "http://books.google.com/books/content?id=2HvGDwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      },
    },
    language: {
      type: String,
      default: "en",
    },
  },
  searchInfo: {
    textSnippet: {
      type: String,
      default:
        "Basic knowledge of web development, ECMAScript, and React will assist with understanding key concepts covered in this book.",
    },
  },
});

export const Book = mongoose.model("Book", BookSchema);
