export async function greet(name: string): Promise<string> {
  return `Hello, ${name}!`;
}

export async function sendEmail(messageId: string): Promise<{
  success: boolean;
  messageId: string;
  timestamp: number;
}> {
  const timestamp = Date.now();
  return {
    success: true,
    messageId,
    timestamp,
  };
}
