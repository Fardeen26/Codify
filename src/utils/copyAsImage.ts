/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function copyAsImage(node: HTMLElement) {
    if (!node) return;

    try {
        const { toBlob } = await import('html-to-image');
        const blob = await toBlob(node, { quality: 0.89 });
        if (!blob) throw new Error('Failed to generate image blob');

        const ClipboardItemCtor = (window as any).ClipboardItem || (window as any).clipboardItem;
        if (!ClipboardItemCtor || !navigator.clipboard || !(navigator.clipboard as any).write) {
            throw new Error('Clipboard API not supported');
        }

        const item = new ClipboardItemCtor({ [blob.type]: blob });
        await (navigator.clipboard as any).write([item]);
    } catch (err) {
        console.error('Could not copy image to clipboard', err);
        throw err;
    }
}

