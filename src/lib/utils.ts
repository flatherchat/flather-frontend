import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function renderMarkdown(input: string, showSymbols = false): string {
    let text = input;

    text = text.replace(/https?:\/\/[^\s]+/g, url => `<a href="${url}">${url}</a>`);

    if (showSymbols) {
        // Use placeholders for stars so subsequent regexes don't pick them up
        text = text.replace(/\*\*\*([^\*]+?)\*\*\*/g, (_, content) =>
            `<strong><em>[STAR3]${content}[STAR3]</em></strong>`
        );
        text = text.replace(/\*\*([^\*]+?)\*\*/g, (_, content) =>
            `<strong>[STAR2]${content}[STAR2]</strong>`
        );
        text = text.replace(/\*([^\*]+?)\*/g, (_, content) =>
            `<em>[STAR1]${content}[STAR1]</em>`
        );

        // Replace placeholders back with actual stars
        text = text.replace(/\[STAR3\]/g, "***");
        text = text.replace(/\[STAR2\]/g, "**");
        text = text.replace(/\[STAR1\]/g, "*");
    } else {
        text = text.replace(/\*\*\*([^\*]+?)\*\*\*/g, (_, content) =>
            `<strong><em>${content}</em></strong>`
        );
        text = text.replace(/\*\*([^\*]+?)\*\*/g, (_, content) =>
            `<strong>${content}</strong>`
        );
        text = text.replace(/\*([^\*]+?)\*/g, (_, content) =>
            `<em>${content}</em>`
        );
    }

    text = text.replace(/\n/g, "<br>");

    return text;
}


function getCaretOffset(el: HTMLDivElement) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return 0;

    const range = selection.getRangeAt(0);
    const preRange = range.cloneRange();

    preRange.selectNodeContents(el);
    preRange.setEnd(range.endContainer, range.endOffset);

    return preRange.toString().length;
}

function setTextCaretOffset(root: HTMLElement, offset: number) {
    const range = document.createRange();
    const sel = window.getSelection();
    if (!sel) return;

    let count = 0;
    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT
    );

    while (walker.nextNode()) {
        const node = walker.currentNode as Text;
        const next = count + node.length;

        if (offset <= next) {
            range.setStart(node, offset - count);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
            return;
        }

        count = next;
    }
}


export function writeEvent(event: Event) {
	const element = event.currentTarget as HTMLDivElement;
	const content = element.innerText;
	const cursor = getCaretOffset(element);

	const rendered = renderMarkdown(content, true)
	element.innerHTML = rendered;

	setTextCaretOffset(element, cursor);
	console.log(content, cursor);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
