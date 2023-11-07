const express = require("express");
const router = express.Router();
const products = require("../schemas/product.js");

//상품등록
router.get("/products", async (req, res) => {
    const { productName, content, author, password } = req.body;
    const product = await products.find({}).sort((a, b) => b.goodsId - a.goodsId);
    const goodsId = product.length === 0 ? 1 : Number(product[0].goodsId) + 1;
    try{
        await products.create({
            goodsId: goodsId,
            productName,
            content,
            author,
            password,
            status: "FOR_SALE",
            date: new Date(),
        });
        res.json({ message: "판매 상품을 등록하였습니다." });
    } catch(err) {
        console.log(err);
        res.status(400).json({messgae : "데이터 형식이 올바르지 않습니다."})
    }

});

// 상품 목록 조회
router.get("/products", async (req, res) => {
    const product = await products.find({}).sort((a, b) => b.goodsId - a.goodsId);
    res.json({ data: product });
});

// 상품 상세 조회
router.get("/products/:goodsId", async (req, res) => {
    const {goodsId} = req.params;
    try{
        const product = await products.find({goodsId : goodsId});
        if (product.goodsId === req.params) {
            const result = product.map((el) => {
                return {
                    goodsId: el.goodsId,
                    productName: el.productName,
                    content: el.content,
                    author: el.author,
                    status: el.status,
                    date: el.date,
                };
            });
    
            res.json({ data: result });
        }
    } catch(err) {
        console.log(err);
        res.status(400).json({meessgae: "데이터를 불러오지 못했습니다."})
    }

});
module.exports = router;


// 상품 정보 수정
// schemas에 quantity 추가해서 quantity가 0이면 "판매완료"로
router.put("/products/:goodsId", async (req, res) => {
    const { goodsId } = req.params;
    const { productName, content, status, password } = req.body;

    const existsProduct = await products.find({ goodsId: goodsId });
    try{
        if (existsProduct.length) {
            if (existsProduct[0].password === password) {
                await products.updateOne({
                    goodsId: goodsId,
                    $set: {
                        productName,
                        content,
                        status,
                    },
                });
    
                res.json({ message : "상품정보를 수정하였습니다." });
            } else {
                res.status(401).json({message : "상품 정보를 수정할 권한 없습니다."})
            }
        } else {
            res.status(404).json({message : "상품 조회에 실패하였습니다."})
        }
    } catch(err){
        console.log(err);
        res.status(400).json({message : "데이터를 불러오지 못했습니다."})
    }

});

// 상품 삭제
router.delete("/product", async (req, res) => {
    const {goodsId} = req.params;
    const {password} = req.body;

    const existsProduct = await products.find({ goodsId: goodsId });
    try{
        if (existsProduct.length) {
            if (existsProduct[0].password === password) {
                await products.deleteOne({ goodsId: goodsId });
    
                res.status(401).json({ result: "success" });
            } else {
                res.json({ message: "상품을 삭제할 권한이 없습니다" });
            }
        } else {
            res.status(404).json({ message: "상품 조회에 실패했습니다." });
        }
    } catch(err) {
        console.log(err);
        res.status(400).json({ message : "데이터를 불러오지 못했습니다."})
    }

});

module.exports = router;