interface IInstallScope {
  setOptions: (options: any) => any
}

interface ICFAppsWindow extends Window {
  INSTALL_OPTIONS: any | { [prop: string]: any }
  INSTALL_SCOPE: IInstallScope
}