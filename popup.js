document.getElementById("openWhatsapp").addEventListener("click", () => {
    let phoneNumber = document.getElementById("phoneNumber").value.trim();
    phoneNumber = phoneNumber.replace(/\D/g, '');

    if (!phoneNumber) {
        alert("Digite um número de telefone válido.");
        return;
    }

    chrome.runtime.sendMessage({ action: "abrirConversa", phoneNumber: `55${phoneNumber}` });
});
