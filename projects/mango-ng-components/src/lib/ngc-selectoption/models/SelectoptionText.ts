
export class SelectoptionText {

  constructor(
      public placeholder: string  = SELECTOPTIONTEXT_DEFAULT.placeholder,
      public noResults: string = SELECTOPTIONTEXT_DEFAULT.noResults
) {}
}

export const SELECTOPTIONTEXT_DEFAULT: SelectoptionText = {
    'placeholder' : 'Busca la opción',
    'noResults' : 'No hay resultados'
  };
