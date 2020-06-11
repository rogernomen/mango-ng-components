import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {
  PAGINATOR_MODULE_CONFIG,
  PaginatorModuleConfig
} from '../ngc-paginator.module.config';

@Component({
  selector: 'ngc-paginator',
  templateUrl: './ngc-paginator.component.html',
  styleUrls: ['./ngc-paginator.component.scss']
})
export class NgcPaginatorComponent implements OnInit, OnChanges {

  @Input() totalPages: number;
  @Input() actualPage: number;
  @Output() changePage: EventEmitter<number> = new EventEmitter();

  public morePagesOnRightSide = false;
  public morePagesOnLeftSide = false;
  public pages: number[] = [];
  public firstPage = this.paginatorModuleConfig.CONSTANTS.FIRST_PAGE;

  constructor(@Inject(PAGINATOR_MODULE_CONFIG) private paginatorModuleConfig: PaginatorModuleConfig) {}

  ngOnInit() {
    this.buildPaginator();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.buildPaginator();
  }

  private buildPaginator() {
    let firstAndLastPage;
    if (this.totalPages <= this.paginatorModuleConfig.CONSTANTS.MAX_PAGES_TO_SHOW_BEFORE_SPLIT_PAGINATOR) {
      firstAndLastPage = this.getFirstAndLastPageOfPaginator(this.totalPages, this.actualPage);
      this.showFirstAndLastPages(firstAndLastPage);
      this.setPages(this.paginatorModuleConfig.CONSTANTS.FIRST_PAGE, this.totalPages);
    } else if (this.actualPage <= this.paginatorModuleConfig.CONSTANTS.MAX_PAGES_TO_SHOW_BEFORE_SPLIT_PAGINATOR) {
      firstAndLastPage = this.getFirstAndLastPageOfPaginator(this.totalPages, this.actualPage);
      this.showFirstAndLastPages(firstAndLastPage);
      this.setPages(firstAndLastPage.first, firstAndLastPage.last);
    } else if (this.actualPage <= this.totalPages - this.paginatorModuleConfig.CONSTANTS.MAX_PAGES_TO_SHOW_BEFORE_SPLIT_PAGINATOR) {
      firstAndLastPage = this.getFirstAndLastPageOfPaginator(this.totalPages, this.actualPage);
      this.showFirstAndLastPages(firstAndLastPage);
      this.setPages(firstAndLastPage.first, firstAndLastPage.last);
    } else if (this.actualPage >= this.totalPages - this.paginatorModuleConfig.CONSTANTS.MAX_PAGES_TO_SHOW_BEFORE_SPLIT_PAGINATOR) {
      this.showFirstAndLastPages();
      this.setPages(this.totalPages - this.paginatorModuleConfig.CONSTANTS.MAX_PAGES_TO_SHOW_BEFORE_SPLIT_PAGINATOR, this.totalPages);
    }
  }

  private setPages(startPage: number, endPage: number) {
    const splitedPaginator = [];
    for (let i = startPage; i < endPage + 1; i++) {
      splitedPaginator.push(i);
    }
    this.pages = splitedPaginator;
  }

  private showFirstAndLastPages(firstAndLastPage?: any) {
    if (firstAndLastPage) {
      if (firstAndLastPage.last === this.paginatorModuleConfig.CONSTANTS.MAX_PAGES_TO_SHOW_BEFORE_SPLIT_PAGINATOR) {
        this.showMorePagesOnLeftSide(false);
      }
      if (firstAndLastPage.first > this.paginatorModuleConfig.CONSTANTS.FIRST_PAGE) {
        this.showMorePagesOnLeftSide(true);
      }
      if (firstAndLastPage.last < this.totalPages) {
        this.showMorePagesOnRightSide(true);
      } else {
        this.showMorePagesOnRightSide(false);
      }
    } else {
      this.showMorePagesOnRightSide(false);
      this.showMorePagesOnLeftSide(true);
    }
  }

  private showMorePagesOnRightSide(hasToBeShown: boolean) {
    this.morePagesOnRightSide = hasToBeShown;
  }

  private showMorePagesOnLeftSide(hasToBeShown: boolean) {
    this.morePagesOnLeftSide = hasToBeShown;
  }

  private getFirstAndLastPageOfPaginator(totalPages: number, currentPage: number, moreItems: number = 5) {
    const firstAndLastPage = {
      first: this.paginatorModuleConfig.CONSTANTS.FIRST_PAGE,
      last: moreItems
    };
    const nextPage = +currentPage;
    if (nextPage >= moreItems) {
      if (nextPage + 2 < totalPages) {
        firstAndLastPage.first = currentPage - 2;
        firstAndLastPage.last = nextPage + 2;
      } else {
        firstAndLastPage.first = totalPages - this.paginatorModuleConfig.CONSTANTS.MAX_PAGES_TO_SHOW_BEFORE_SPLIT_PAGINATOR;
        firstAndLastPage.last = totalPages;
      }
    }
    return firstAndLastPage;
  }

  onClickPreviusItem() {
    if (this.actualPage - 1 >= this.paginatorModuleConfig.CONSTANTS.FIRST_PAGE) {
      --this.actualPage;
      this.changePage.emit(this.actualPage);
      this.buildPaginator();
    }
  }

  onClickNextItem(): void {
    if (this.actualPage + 1 <= this.totalPages) {
      ++this.actualPage;
      this.changePage.emit(this.actualPage);
      this.buildPaginator();
    }
  }

  onClickItem(page: number) {
    if (page < this.paginatorModuleConfig.CONSTANTS.FIRST_PAGE || page > this.totalPages) {
      return;
    }
    this.actualPage = page;
    this.changePage.emit(this.actualPage);
    this.buildPaginator();
  }
}
