const mongoose = require("mongoose");

const dotenv = requiure("dotenv").config();

const connect = () => {
  mongoose
    .connect(
      process.env.DB_URL,
      {
        dbName : 'node_lv1',
      },
    )
    //mongodb가 연결중에 에러가 발생하면 아래의 코드로 감
    .then(() => console.log('MongoDB 연결에 성공하였습니다.'))
    .catch((err) => console.log(`MongoDB 연결에 실패하였습니다. ${err}`));
};

// mongodb가 연결된 후에 에러가 났을 경우
mongoose.connection.on("error", err => {
  console.error("MongoDB 연결 에러", err);
});

module.exports = connect;