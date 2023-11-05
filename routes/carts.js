const express = require("express");
const router = express.Router();

const Cart = require("../schemas/cart.js");
const Goods = require("../schemas/goods.js");

//localhost:3000/api/carts GET Method
router.get("/carts",async(req, res)=>{
    const carts = await Cart.find({})
    // carts 의 결과물
    // [
    //  {goodsId, quantity},
    //  {goodsId, quantity},
    //  {goodsId, quantity},
    // ]
    const goodsIds = carts.map((cart)=>{
        return cart.goodsId;
        // goodsIds === [gooddsId1,gooddsId2,gooddsId3,...]
    })
    // find 뒤의 key까지는 알겠는는데 value 부분은 배열의 형태 아닌가? 어떻게 비교하는거지?
    // 아래의 find는 mongoose의 find
    const goods = await Goods.find({goodsId : goodsIds});
    // Goods에 해당하는 모든 정보를 가지고 올건데,
    // 만약 goodsIds 변수 안에 존재하는 값일 때에만 조회하라.
    // 결과값이 배열로 나오나봄. (내생각)

    const results = carts.map((cart)=>{
        return {
            "quantity" : carts.quantity,
            // 아래의 find는 array.find
            // 그런데 이미 위의 find에서 goodsId가 같은 값들로만 갖고 온 거 아닌가?
            // 왜 다시 한번 더 필터 해주는거지? 
            // 첫 find에서의 goodsId는 Goods의 goodsId이고 goodsIds는 Cart의 goodsId여서 이미 비교 끝난거잖아?
            "goods" : goods.find((item)=>item.goodsId === cart.goodsId),
        }
    })

    res.json({
        "carts" : results,
    })

});

module.exports = router;