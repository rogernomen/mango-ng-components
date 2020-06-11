
export class LoginText {
    
    constructor(
        public userInputPlaceholder: string = LOGINTEXT_DEFAULT.userInputPlaceholder,
        public passwordInputPlaceholder: string  = LOGINTEXT_DEFAULT.passwordInputPlaceholder,
        public submitLabel: string = LOGINTEXT_DEFAULT.submitLabel,
        public errorMessage: string = LOGINTEXT_DEFAULT.errorMessage,
        public keepSessionLabel: string  = LOGINTEXT_DEFAULT.keepSessionLabel,
        public usernameRequiredMessage: string  = LOGINTEXT_DEFAULT.usernameRequiredMessage,
        public passwordRequiredMessage: string  = LOGINTEXT_DEFAULT.passwordRequiredMessage
  ) {}
}

export const LOGINTEXT_DEFAULT: LoginText = 
    {
        "userInputPlaceholder" : "Usuario",
        "passwordInputPlaceholder" : "Pass / Contraseña",
        "submitLabel" : "Acceder",
        "errorMessage":undefined,
        "keepSessionLabel" : "Mantener la sesión iniciada",
        "usernameRequiredMessage" : "Este campo es requirido",
        "passwordRequiredMessage" : "Este campo es requirido"
    };
