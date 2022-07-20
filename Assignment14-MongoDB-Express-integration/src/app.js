const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/ajaydb")
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => {
    console.error(err);
  });

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: String,
  active: Boolean,
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Course = mongoose.model("Course", courseSchema);

const createDocument = async () => {
  try {
    const tsCourse = new Course({
      name: "TypeScript",
      type: "Superset of JS",
      active: true,
    });
    const htmlCourse = new Course({
      name: "HTML",
      type: "Front End",
      active: true,
    });
    const cssCourse = new Course({
      name: "CSS",
      type: "Front End",
      active: true,
    });

    const result = await Course.insertMany([tsCourse, htmlCourse, cssCourse]);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// createDocument();

const getDocument = async () => {
  const result = await Course.find({ type: "Front End" })
    .select({
      name: 1,
      _id: 0,
    })
    .limit(2)
    .skip(1);
  console.log(result);
};

getDocument();
