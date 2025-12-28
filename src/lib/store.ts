import { writable } from 'svelte/store';
import type { ConversationBlock } from '$lib/types';

export const conversation = writable<ConversationBlock[]>([
    {
        username: 'scripterblox',
        content: `hi **guys** is this *peak* ***hi*** but uh also\ncheck me out on https://youtube.com/@maxzieblox please\n`,
        attachments: [],
        timestamp: new Date()
    },
    {
        username: 'scripterblox',
        content: 'hi',
        timestamp: new Date()
    }
]);
export const content = writable('');

export const websocketStatus = writable('');
export const connectionStatus = writable(false);
