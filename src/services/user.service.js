const { UrlStore } = require("../database/mongodb/url-model");

const getUserUrlsService = async (userId) => {
	const urls = await UrlStore.find({ userId }).sort({ createdAt: -1 });
    return urls;
};

const deleteUserUrlService = async (id, userId)=>{
    const url = await UrlStore.findOne({ _id: id, userId });
    if(!url) throw new Error("url not found");

    await UrlStore.deleteOne({ _id: id, userId });
 }

module.exports = { getUserUrlsService, deleteUserUrlService };
