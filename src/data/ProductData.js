class CampaignService {
  async getProductList(requestBody) {
    return [
      {
        productId: 1,
        productName: "one",
        category: "A",
        price: "200",
      },
      {
        productId: 2,
        productName: "one",
        category: "A",
        price: "200",
      },
    ];
  }
}

export default new CampaignService();
