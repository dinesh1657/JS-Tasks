import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// =========================
// REQUEST INTERCEPTOR
// =========================

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// =========================
// RESPONSE INTERCEPTOR
// =========================

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

// =========================
// TEST BACKEND
// =========================

export async function testBackend() {
    const response = await api.get("/test");

    return response.data;
}

// =========================
// PRODUCTS
// =========================

export async function getProducts() {
    const response = await api.get("/products");

    return response.data;
}

export async function getProductById(id) {
    const response = await api.get(
        `/products/${id}`
    );

    return response.data;
}

// =========================
// AUTH
// =========================

export async function registerUser(
    name,
    email,
    password
) {
    const response = await api.post(
        "/auth/register",
        {
            name,
            email,
            password,
        }
    );

    return response.data;
}

export async function loginUser(
    email,
    password
) {
    const response = await api.post(
        "/auth/login",
        {
            email,
            password,
        }
    );

    return response.data;
}

// =========================
// PROFILE
// =========================

export async function getProfile() {
    const response = await api.get(
        "/auth/profile"
    );

    return response.data;
}

// =========================
// ORDERS
// =========================

export async function createOrder(
    orderData
) {
    const response = await api.post(
        "/orders",
        orderData
    );

    return response.data;
}

export async function getMyOrders() {
    const response = await api.get(
        "/orders/my-orders"
    );

    return response.data;
}

// =========================
// DEFAULT EXPORT
// =========================

export default api;