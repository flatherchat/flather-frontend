<script lang="ts">
    import '@project/styles/global.css';
    import { marked } from 'marked'

    marked.setOptions({
        breaks: true
    });

	let userMessage: string = '';
    let userName: string = '';
    let isConnected: boolean = false;

    let websocketStatus: string = '';
    let websocketAttempts: number = 0;
    let ws: WebSocket;

    let Conversation: any[] = [
    ];

    // kill me
    function initWebsocket()
    {
        if (websocketAttempts >= 20)
        {
            websocketStatus = `Maximum attempts reached. Reload your page to try again.`   
        }
        websocketStatus = `Connecting... (Attempt ${websocketAttempts}/20)`;

        ws = new WebSocket(`wss://ws-betaapp.flather.online`);

        if (!ws) {
            return
        }

        ws.onclose = () => {
            isConnected = false;
            websocketAttempts++;
            initWebsocket()
        };

        ws.onopen = () => {
            websocketStatus = 'Connected successfuly!'
            websocketAttempts = 0;
            isConnected = true;
        };

        ws.onerror = (err) => {
            websocketStatus = err.toString();
        }


        // websockets are great, until they decide to become blobs.
        ws.onmessage = async (msg) => {
            let content;

            if (typeof msg.data === "string") {
                content = msg.data;
            } else if (msg.data instanceof Blob) {
                content = await msg.data.text();
            } else {
                console.warn("Unknown WS data type:", msg.data);
                return;
            }

            content = JSON.parse(content)
            Conversation = [...Conversation, content];
            console.log(content);
        };
    }

    function sendMessageHandler()
    {
        if (isConnected)
        {
        const jsonSend = JSON.stringify(
            {
                user: userName,
                content: userMessage,
            }
        )

        ws.send(jsonSend)
        userMessage = '';
        }
    }

    initWebsocket();
</script>

<p>{websocketStatus}</p>
<div id="chat-container">
    {#each Conversation as chat}
        <b id='username'>{chat.user}</b>{@html marked(chat.content)}
    {/each}
</div>

<input bind:value={userName} placeholder='ur username here ig' type='text' required><br><br>
<textarea bind:value={userMessage} placeholder="Enter markdown here" required></textarea><br>
<button id='pad25' on:click={sendMessageHandler}>Send</button><br>
{@html marked(userMessage)}

<br><br><br>
You are currently using an experimental service. Please note that we are not responsbile for any data loss, data leakage as this system is meant for beta use.<br>
Thank you for testing and improving our services! - © 2025 Flather Communications. All rights reserved.<br>