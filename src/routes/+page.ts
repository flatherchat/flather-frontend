export const ssr = false;

import { writable } from 'svelte/store';
import { io } from "socket.io-client";
import * as store from '$lib/store';
import '@project/global.css';

// const socket = io("https://ws-betaapp.flather.online");
console.log('does this do anything?')

let userName = '';
let userContent = '';