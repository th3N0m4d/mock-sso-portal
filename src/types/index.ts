export type FormType = "login" | "forgot" | "register" | "confirm";
export type FormFields = { username: string; password: string };
export type ConfirmSignUpProps = { confirmationCode: string };
