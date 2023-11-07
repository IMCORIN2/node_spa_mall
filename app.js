const express = require('express');
const app = express();
const port = 3000;
// mongodb 연결
const goodsRouter = require('./routes/goods.js');
const cartsRouter = require("./routes/carts.js")
const productRouter = require("./routes/product.js");
//index.js 같은 경우에는 폴더를 가져오는 경우에도 바로 사용되기 때문에 schemas 뒤에 빠져 있다고 봐도 된다.
const connect = require("./schemas");
connect();

app.use(express.json());
app.use("/api",[goodsRouter, cartsRouter, productRouter])

app.post("/", (req,res)=>{
    console.log(req.body);

    res.send("기본 URI에 POST 메소드가 정상적으로 실행되었습니다.")
})

app.get("/", (req,res)=>{
    console.log(req.query);

    res.status(400).json({
        "keykey" : "value 입니다.",
        "이름입니다." : "이름일까요?",
    });
})

app.get("/:id",(req,res)=>{
    console.log(req.params);

    res.send(":id URI에 정상적으로 반환되었습니다.")
})
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// localhose:3000/api -> goodsRouter


app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});