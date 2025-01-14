class BandSiteApi {
  constructor(apiKey) {
    this.baseUrl = 'https://unit-2-project-api-25c1595833b2.herokuapp.com/';
    this.apiKey = apiKey;
  }

  async getComment() {
    try {
      const commentUrl = `${this.baseUrl}comments?api_key=${this.apiKey}`;
      const response = await axios.get(commentUrl);
      response.data.sort((a, b) => b.timestamp - a.timestamp);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async postComment(newComment) {
    try {
      const commentUrl = `${this.baseUrl}comments?api_key=${this.apiKey}`;
      return await axios.post(commentUrl, newComment);
    } catch (error) {
      console.error(error);
    }
  }

  async getShow() {
    try {
      const showUrl = `${this.baseUrl}showdates?api_key=${this.apiKey}`;
      const resp = await axios.get(showUrl);
      resp.data.sort((a, b) => a.date - b.date);
      return resp.data;
    } catch (error) {
      console.error(error);
    }
  }
}
