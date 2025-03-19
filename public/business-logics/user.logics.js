import { createRequest } from "./api.requests.js";

const login = async() => {
    const email = document.getElementById("mail").value;
    const password = document.getElementById("password").value;

    const result = await createRequest('user/login', {
        email: email,
        password: password
    })

    console.log(result)
}

const register = async() => {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const contactNo = document.getElementById("contactNo").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const nic = document.getElementById("nic").value;
    const gender = document.getElementById("gender").value;
    const accNo = document.getElementById("accNo").value;
    const location = document.getElementById("location").value;
    const acres = document.getElementById("acres").value;
    const compost = document.getElementById("compost").value;
    const harvest = document.getElementById("harvest").value;
    const termsAccepted = document.getElementById("terms").checked;

    if (!firstName || !lastName || !email || !contactNo || !address || !city || !state || !nic || !gender || !accNo || !location || !acres || !compost || !harvest) {
        return alert("All fields are required")
    }

    if (!termsAccepted) {
        return alert("Terms should be accepted");
    }

    const requestBody = {
        first_name: firstName,
        last_name: lastName,
        email,
        contact_no: contactNo,
        address,
        city,
        state,
        nic,
        gender,
        acc_no: accNo,
        location,
        acres,
        compost,
        harvest,
        terms_accepted: termsAccepted
    };

    const result = await createRequest('buyer/register', requestBody);

    console.log(result);
};

document.addEventListener('DOMContentLoaded', () => {
    const login_btn = document.getElementById("login-btn");
    const register_btn = document.getElementById("register-btn");

    if (login_btn) {
        login_btn.addEventListener('click', login);
    }

    if (register_btn) {
        register_btn.addEventListener('click', register);
    }
})