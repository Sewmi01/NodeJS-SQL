import { createRequest } from "./api.requests.js";

const register = async() => {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const contactNo = document.getElementById("contactNo").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const nic = document.getElementById("nic").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const gender = document.getElementById("gender").value;
    const termsAccepted = document.getElementById("terms").checked;

    if (!firstName || !lastName || !contactNo || !email || !address || !city || !state || !nic || !gender || !location || !username || !password) {
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
        username,
        password,
        terms_accepted: termsAccepted
    };

    const result = await createRequest('user/register', requestBody);

    console.log(result);
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("register-btn").addEventListener('click', register);
})