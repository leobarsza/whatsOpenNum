window.addEventListener("message", (event) => {
    if (event.source !== window) return;
    if (event.data.type && event.data.type === "OPEN_WHATSAPP") {
        chrome.runtime.sendMessage({ action: "abrirConversa", phoneNumber: event.data.phoneNumber });
    }
});
