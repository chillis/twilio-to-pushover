# Twilio to Pushover Forwarder

This project contains a Twilio Function that forwards incoming SMS messages and voice calls from Twilio to Pushover. It allows you to receive instant notifications on your devices whenever someone sends an SMS or calls your Twilio number(s).

> Note: This project was created with the assistance of Anthropic's AI model, Claude.

## Prerequisites

- A Twilio account with at least one phone number
- A Pushover account
- Basic knowledge of Twilio Functions

## Setup Instructions

1. **Pushover Setup:**
   - Sign up for a Pushover account if you haven't already.
   - Create a new application in Pushover to get an API Token.
   - Note down your User Key and API Token.

2. **Twilio Function Setup:**
   - Log in to your Twilio account and navigate to Functions.
   - Create a new Function.
   - Copy the code from the `twilio-to-pushover-function.js` file in this repository into your new Function.
   - In the Function configuration, add two environment variables:
     - `PUSHOVER_TOKEN`: Your Pushover API Token
     - `PUSHOVER_USER`: Your Pushover User Key
   - Save the Function and note its path.

3. **Twilio Phone Number Configuration:**
   - Go to your Twilio Phone Numbers settings.
   - For each number you want to use with this Function:
     - Under "Voice Configuration", for "A call comes in", select "Function" from the dropdown.
     - Choose the appropriate Service, Environment, and Function Path for your saved Function.
     - Under "Messaging Configuration", for "A message comes in", again select "Function" and choose the same Service, Environment, and Function Path.

## Usage

Once set up, the Function will automatically:
- Forward any incoming SMS to your Pushover account as a notification.
- Send a notification to Pushover for any incoming voice calls.
- Respond to voice calls with a message saying the call has been noted.

The notifications will include:
- The Twilio phone number that received the message/call.
- The sender's phone number.
- The content of the SMS (for text messages).

## Customization

You can modify the `twilio-to-pushover-function.js` file to customize the behavior, such as:
- Changing the notification format.
- Adding additional logic for different types of messages or calls.
- Integrating with other services.

## Troubleshooting

If you're not receiving notifications:
1. Check your Pushover API Token and User Key in the Function's environment variables.
2. Verify that your Twilio number's configurations are correctly set to use the Function.
3. Check the Twilio Function logs for any error messages.

## Contributing

Feel free to fork this repository and submit pull requests for any enhancements.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

This project was developed with the assistance of Anthropic's AI model, Claude. The AI provided guidance on code structure, README creation, and best practices for Twilio Function implementation.
