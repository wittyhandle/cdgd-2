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

const deleteClients = clientsToDelete => {
  const ids = clientsToDelete.map(c => c.id);
  return api
    .delete("/api/v1/clients/bulk", { data: { toDelete: ids } })
    .then(() => true)
    .catch(() => false);
};

const updateClient = (id, client) => {
  const toUpdate = { ...client };
  delete toUpdate.flair;

  return api
    .put(`/api/v1/clients/update/${id}`, { client: toUpdate })
    .then(res => res.id)
    .catch(e => Promise.reject(e));
};

const clientService = {
  createClient,
  deleteClients,
  updateClient,
  getClients
};

export default clientService;
