import { MultiOptionsDinamicContent } from './multioptions-item-dinamicContent.interface';

export interface MultioptionsItem {
  id: string;
  text: string;
  dinamicContent?: MultiOptionsDinamicContent;
}
