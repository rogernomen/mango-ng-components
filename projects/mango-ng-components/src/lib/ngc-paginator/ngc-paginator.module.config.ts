import {InjectionToken} from '@angular/core';

export interface PaginatorModuleConfig {
  CONSTANTS: any;
}

export const PAGINATOR_MODULE_CONSTANTS: PaginatorModuleConfig = {
  CONSTANTS: {
    FIRST_PAGE: 1,
    MAX_PAGES_TO_SHOW_BEFORE_SPLIT_PAGINATOR: 5
  }
};

export let PAGINATOR_MODULE_CONFIG = new InjectionToken<PaginatorModuleConfig>('paginator.module.config');
