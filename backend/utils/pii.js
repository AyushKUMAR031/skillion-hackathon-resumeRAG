function redactPII(text) {
    // Redact emails
    text = text.replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, '[REDACTED_EMAIL]');
    // Redact phone numbers
    text = text.replace(/(\+?\d{1,3})?[\s\-.(]*\d{3}[\s\-.)]*\d{3}[\s\-]*\d{4}/g, '[REDACTED_PHONE]');
    return text;
}

module.exports = { redactPII };
