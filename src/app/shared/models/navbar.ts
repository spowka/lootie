import { CasesType } from 'src/app/cases/models';

export class NavbarItem {
  url?: string;
  title: string;
  isActive?: boolean;
  disabled?: boolean;
  submenu?: NavbarItem[];
  icon?: string;
  caseName?: string;
  type?: CasesType;
}
