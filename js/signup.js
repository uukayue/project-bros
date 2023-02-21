function Password() { }

function checkpassword() {
    if (password1 != password2.value) {
        alert("密碼不正確,請再次輸入")
        password1.value = "";
        password2.value = "";
    }
}