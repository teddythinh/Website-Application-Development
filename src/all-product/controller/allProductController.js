const getProductList = require('../model/getProductList');
const getCategoryList = require('../model/getCategoryList');
const getBrandList = require('../model/getBrandList');

module.exports = (req, res) => {
  (async () => {
    const category_list = await getCategoryList(req);
    const brand_list = await getBrandList(req);
    //GET QUERY PARAMETER
    const {cat} = req.query;
    const {p_s, p_e} = req.query
    const {brd} = req.query;
    const {search} = req.query;
    const {sortBy, sortOrder} = req.query;
    //CREATE QUERY STATE 
    var filter_state = ""; var first_fil = false;
    if (cat){
      filter_state = filter_state + `cat=${cat}`;
      first_fil = true;
    }
    if (p_s && p_e){
      if (first_fil){
        filter_state = filter_state + '&';
      }
      filter_state = filter_state + `p_s=${p_s}&p_e=${p_e}` ;
      first_fil = true;
    }
    if (brd){
      if (first_fil){
        filter_state = filter_state + '&';
      }
      filter_state = filter_state + `brd=${brd}`;
    }
    var order_state = "";
    //CREATE SORT STATE AND DECIDE WHICH MODEL TO RUN
    if (sortBy)
      order_state = `sortBy=${sortBy}&sortOrder=${sortOrder}`;

    res.render("all-product", {category_list, brand_list, filter_state, order_state});
  })();
};