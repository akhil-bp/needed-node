let localTime1 = moment(shopData.startDate).format('YYYY-MM-DD');
let proposedDate1 = localTime1 + "T00:00:00.000Z";

let localTime2 = moment(shopData.endDate).format('YYYY-MM-DD');
let proposedDate2 = localTime2 + "T00:00:00.000Z";

let ShopCollection = Dailyorders.getDataSource().connector.collection(Dailyorders.modelName);
let data = await ShopCollection.aggregate([
    { $match: { $and: [{ date: { $gte: proposedDate1, $lt: proposedDate2 } }, { "city.name": shopData.cityId }, { shop_name: { $regex: '.*' + shopData.search + '.*', $options: 'i' } }] } },
    {
        $group: {
            _id: "$shop_id",
            deal_amount: { $sum: "$deal_amount" },
            commission_amount: { $sum: "$commission_amount" },
            calls_received: { $sum: "$calls_received" },
            overall_call_duration: { $sum: "$overall_call_duration" },
            deals_made: { $sum: "$deals_made" },
            shop_name: { $first: "$shop_name" },
            city: { $first: "$city" }
        }
    },
    { $sort: { [shopData.orderDataName]: shopData.orderDataType } },
    { "$limit": shopData.skip + shopData.limit },
    { "$skip": shopData.skip }
]).toArray()

=====================================================================
function getAverageRatting(id) {
    var ShopratingCollection = Shoprating.getDataSource().connector.collection(Shoprating.modelName);
    var shopId = Shoprating.getDataSource().ObjectID(id);

    return ShopratingCollection.aggregate([
        { $match: { shop_id: shopId } },
        {
            $group: {
                _id: "$shop_id",
                avg_rating: { $avg: "$rating" }
            }
        }
    ]).toArray()
}
