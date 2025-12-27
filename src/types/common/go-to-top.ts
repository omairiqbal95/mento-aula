export interface GoToTopConfig {
  heightToShow: number;
  scrollBehavior: ScrollBehavior;
  className: string;
  iconClassName: string;
  ariaLabel: string;
}

export interface GoToTopContent {
  config: GoToTopConfig;
}
