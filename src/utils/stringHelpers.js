export const truncateWords = (text, wordLimit = 5) => {
    if (!text) return "";
    const words = text.trim().split(" ");
    return words.length > wordLimit
        ? words.slice(0, wordLimit).join(" ") + "..."
        : text;
};               