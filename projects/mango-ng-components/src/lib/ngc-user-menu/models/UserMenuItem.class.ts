export class UserMenuItem {
  label?: string;
  routerLink?: string;
  onClick?: Function;
  icon?: string;
  children?: Array<UserMenuItem>;
  sectionTitle?: string;


  constructor(label?: string, routerLink?: string, onClick?: Function, icon?: string,
              children?: Array<UserMenuItem>, sectionTitle?: string) {
    this.label = label;
    this.routerLink = routerLink;
    this.onClick = onClick;
    this.icon = icon;
    this.children = children;
    this.sectionTitle = sectionTitle;
  }
}
