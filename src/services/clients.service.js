import { api } from "../utils/index";

const createClient = client =>
  api
    .post("/api/v1/clients/new", { client })
    .then(res => res.id)
    .catch(e => Promise.reject(e));

const clientService = {
  createClient
};

export default clientService;
