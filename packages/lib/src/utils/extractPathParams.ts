export function extractPathParams(url: string) {
  const regex = /\/:([a-zA-Z0-9_]+)/g; // Match :parameter segments
  const matches = [];
  let match;

  // Use regex to find all matches in the URL
  while ((match = regex.exec(url)) !== null) {
    matches.push(match[1]); // Push the parameter name (without the colon)
  }

  return matches; // Return all matched parameters
}
