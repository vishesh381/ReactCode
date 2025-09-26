export const timestampMiddleware = (store: any) => (next: any) => (action: any) => {
  if (action.type === "ADD_TODO") {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0];
    const timestamp = `Added at ${formattedDate}: `;
    action.payload = `${timestamp}${action.payload}`;
  }
  return next(action);
};