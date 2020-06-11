
export class MultioptionsText {

  constructor(
      public searchResults: string = MULTIOPTIONSTEXT_DEFAULT.searchResults,
      public clearSelection: string  = MULTIOPTIONSTEXT_DEFAULT.clearSelection,
      public placeholder: string  = MULTIOPTIONSTEXT_DEFAULT.placeholder
  ) {}
}

export const MULTIOPTIONSTEXT_DEFAULT: MultioptionsText = {
    'searchResults' : 'resultados',
    'clearSelection' : 'Quitar selección',
    'placeholder' : 'Buscar'
};
