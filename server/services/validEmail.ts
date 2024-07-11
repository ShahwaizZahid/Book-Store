export function isValidEmail(email: string) {
  return /.+@.+/.test(email);
}
