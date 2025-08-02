chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "abrirConversa") {
        chrome.tabs.query({ url: "https://web.whatsapp.com/*" }, (tabs) => {
            if (tabs.length > 0) {
                // Injetar um script na aba existente para iniciar a conversa sem recarregar a página
                chrome.tabs.update(tabs[0].id, { active: true }, () => {
                    chrome.scripting.executeScript({
                        target: { tabId: tabs[0].id },
                        function: iniciarConversa,
                        args: [request.phoneNumber]
                    });
                });

                // Isso aqui funciona perfeitamente
                // chrome.scripting.executeScript({
                //     target: { tabId: tabs[0].id },
                //     function: iniciarConversa,
                //     args: [request.phoneNumber]
                // });
            } else {
                // Se não houver aba aberta, crie uma nova com a URL de conversa
                chrome.tabs.create({ url: 'https://web.whatsapp.com/send?phone=' + request.phoneNumber });
            }
        });
    }
});

// Função a ser injetada na aba aberta
function iniciarConversa(phoneNumber) {
    const chatUrl = 'https://web.whatsapp.com/send?phone=' + phoneNumber;
    const linkElement = document.createElement('a');
    linkElement.href = chatUrl;
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
}