const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb+srv://dbscks95:DaDHdQC7ORZuhlmK@cluster0.mtqzt6c.mongodb.net/spa_mall")
    //mongodb가 연결중에 에러가 발생하면 아래의 코드로 감
    .catch(err => console.log(err));
};

// mongodb가 연결된 후에 에러가 났을 경우
mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;