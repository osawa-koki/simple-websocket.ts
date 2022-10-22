const sock = new WebSocket("ws://127.0.0.1:8787");

document.getElementById("send")?.addEventListener("click", function() {
	const user = (document.getElementById("user") as HTMLInputElement)?.value;
	const message = (document.getElementById("message") as HTMLInputElement)?.value;
	sock.send(JSON.stringify({
		user: user,
		message: message,
	}));
});


sock.addEventListener("open", e => {
	console.log("接続が開かれたときに呼び出されるイベント");
});

sock.addEventListener("message", e => {
	console.log("サーバーからメッセージを受信したときに呼び出されるイベント");
	const {user, message} = JSON.parse(e.data);
	const li = document.createElement("li");
	li.textContent = `${user} send ${message}`;
	document.getElementById("messageContainer")?.appendChild(li);
});

sock.addEventListener("close", e => {
	console.log("接続が閉じられたときに呼び出されるイベント");
});

sock.addEventListener("error", e => {
	console.log("エラーが発生したときに呼び出されるイベント");
});
