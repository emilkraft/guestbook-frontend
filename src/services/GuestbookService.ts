import http from "../http-common";

class GuestbookService {
    getAll() {
        return http.get("/guestbook");
    }

    get(id: string) {
        return http.get(`/guestbook/${id}`);
    }

    create(data: any) {
        return http.post("/guestbook", data);
    }

    update(id: string, data: any) {
        return http.put(`/guestbook/${id}`, data);
    }

    delete(id: string) {
        return http.delete(`/guestbook/${id}`);
    }
}

export default new GuestbookService();