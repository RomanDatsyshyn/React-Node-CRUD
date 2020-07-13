import http from "../http-common";

class GoodsDataService {
  GetById(id) {
    return http.get(`/${id}`);
  }

  getByName(name) {
    return http.get(`/search/?name=${name}`);
  }

  getAll(page) {
    return http.get(`/?page=${page}&limit=8`);
  }

  create(data) {
    return http.post("/add", data);
  }

  update(id, data) {
    return http.put(`/${id}`, data);
  }

  delete(id) {
    return http.delete(`/${id}/delete`);
  }
}

export default new GoodsDataService();
