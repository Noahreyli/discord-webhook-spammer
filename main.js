let intervalId;

function startSpam() {
    const webhookUrl = document.getElementById("url").value;
    const username = document.getElementById("username").value || "Captain Hook";
    const avatarUrl = document.getElementById("avatar").value || "https://cdn.discordapp.com/avatars/";
    const message = document.getElementById("message").value || "Hello World";
    const log = document.getElementById("log");

    if (!webhookUrl.startsWith("https://discord.com/api/webhooks/")) {
        log.innerHTML = '<p style="color: white;">URLが無効です</p>';
        return;
    }

    document.getElementById("start").disabled = true;
    document.getElementById("stop").disabled = false;
    log.innerHTML = "";

    intervalId = setInterval(function () {
        sendWebhook(webhookUrl, username, avatarUrl, message, log);
    }, 2000);
}

function stopSpam() {
    clearInterval(intervalId);
    document.getElementById("start").disabled = false;
    document.getElementById("stop").disabled = true;
    const log = document.getElementById("log");
    log.innerHTML += '<p style="color: green;">停止されました</p>';
}

function sendWebhook(webhookUrl, username, avatarUrl, message, log) {
    const payload = {
        username: username,
        avatar_url: avatarUrl,
        content: message,
    };

    fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    .then(response => {
        if (response.ok) {
            log.innerHTML += '<p style="color: green;">メッセージは正常に送信されました</p>';
        } else if (response.status === 429) {
            log.innerHTML += '<p style="color: red;">レート制限にかかりました</p>';
        } else {
            log.innerHTML += `<p style="color: red;">Error: ${response.statusText}</p>`;
        }
    })
    .catch(error => {
        log.innerHTML += `<p style="color: red;">Error: ${error.message}</p>`;
    });
}
