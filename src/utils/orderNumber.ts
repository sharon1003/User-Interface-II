export const generateOrderNumber = () => {
    const now   = new Date();
    const pad   = (n: number) => n.toString().padStart(2, '0');

    /* 200524-2231-A7   →  20 May 2024 – 22:31 – random A7 */
    const stamp =
        pad(now.getDate()) +
        pad(now.getMonth() + 1) +
        now.getFullYear().toString().slice(-2) +
        '-' +
        pad(now.getHours()) +
        pad(now.getMinutes());

    const rand  = Math.random().toString(36).slice(-2).toUpperCase();

    return `${stamp}-${rand}`;
};