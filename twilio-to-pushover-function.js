exports.handler = function(context, event, callback) {
    // Pushover credentials
    const PUSHOVER_TOKEN = context.PUSHOVER_TOKEN;
    const PUSHOVER_USER = context.PUSHOVER_USER;
    
    // Determine if it's an SMS or a voice call
    const isSMS = event.Body !== undefined;
    
    let message;
    if (isSMS) {
        // It's an SMS
        const from = event.From;
        const body = event.Body;
        const to = event.To;  // This is the Twilio number that received the message
        
        message = `SMS received on ${to}\nFrom: ${from}\nMessage: ${body}`;
    } else {
        // It's a voice call
        const from = event.From;
        const to = event.To;  // This is the Twilio number that was called
        
        message = `Voice call received on ${to}\nFrom: ${from}`;
    }
    
    // Construct the URL with query parameters
    const url = `https://api.pushover.net/1/messages.json?token=${encodeURIComponent(PUSHOVER_TOKEN)}&user=${encodeURIComponent(PUSHOVER_USER)}&message=${encodeURIComponent(message)}`;
    
    // Send request to Pushover
    fetch(url, { method: 'POST' })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Message sent to Pushover');
            if (isSMS) {
                callback(null, 'Message forwarded to Pushover');
            } else {
                // For voice calls, we need to return TwiML
                const twiml = new Twilio.twiml.VoiceResponse();
                twiml.say('Thank you for your call. A notification has been sent.');
                callback(null, twiml);
            }
        })
        .catch(error => {
            console.log('Error sending to Pushover:', error);
            callback(error);
        });
};
