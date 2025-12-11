<script lang="ts">
	let userMessage: string = '';
    let userName: string = '';

    let websocketStatus: string = '';
    let ws: WebSocket;

    let Conversation: string[] = [];

    // kill me
    function initWebsocket()
    {
        websocketStatus = 'Connecting...';
        ws = new WebSocket(`wss://ws-betaapp.flather.online`);

        if (!ws) {
            return
        }

        ws.onclose = () => {
            websocketStatus = "Connection Terminated. I'm sorry to interrupt you Elizabeth, if you still even remember that name. But I'm afraid you've been misinformed. You are not here to receive a gift, nor have you been called here by the individual you assume. Although you have indeed been called."
        };

        ws.onopen = () => {
            websocketStatus = 'Connected successfuly!'
        };

        ws.onerror = (err) => {
            websocketStatus = err.toString();
        }

        ws.onmessage = (msg) => {
            Conversation = [...Conversation, msg.data];
        }
    }

    function sendMessageHandler()
    {
        ws.send(`${userName}: ${userMessage}`)
        userMessage = '';
    }

    initWebsocket();
</script>

<p>NOTE: This project is in early beta. Also you will lose the conversation history if you refresh. Good luck, and thank you for testing! - Flather Communications 2025</p>
<p>{websocketStatus}</p>
<div>
    {#each Conversation as chat }
        {chat}<br>
    {/each}
</div>
<input bind:value={userName} placeholder='ur username here ig' type='text' required><br>
<input bind:value={userMessage} placeholder='Send a message...' type='text' required><br>
<button id='sendAction' on:click={sendMessageHandler}>Send</button>