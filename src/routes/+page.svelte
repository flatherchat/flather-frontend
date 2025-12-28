<script lang="ts">
	import { conversation, content } from "$lib/store";
	import { renderMarkdown, writeEvent } from "$lib/utils";

</script>

{#each $conversation as msg }
<div id='chat'>
	<b>{msg.username}</b> · {msg.timestamp}<br>
	<div id='chat-content'>	
	{@html renderMarkdown(msg.content)}
	</div>
	<hr>
</div>
{/each}
<input placeholder="Username"/>
<hr>
<div contenteditable="true" id='text-input' on:input={writeEvent}></div>
<button><i class="ph ph-paper-plane-tilt"></i> Send</button>

<br>
<button><i class='ph ph-paperclip'></i> Upload</button>

<div id='upload-modal'>
	<i class='ph ph-upload-simple'></i><br>
	Drop files here or <a href='?'>select files</a>
	<div id='small-text'>150MB Maximum</div>
</div>

<div class='footer'>
You are currently using an experimental service. Please note that we are not responsible for any data loss, data leakage as this system is meant for beta use.<br>
 © 2025 Flather Communications. All rights reserved.<br>
</div>
