import { api } from "../utils/index";

const getClients = (limit, offset, order, direction) =>
  api
    .get(`/api/v1/clients/${limit}/${offset}/${order}/${direction}`)
    .then(clients => clients.clients);

const createClient = client =>
  api
    .post("/api/v1/clients/new", { client })
    .then(res => res.id)
    .catch(e => Promise.reject(e));

const clientService = {
  createClient,
  getClients
};

export default clientService;
