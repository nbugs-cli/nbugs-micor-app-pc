
// 动态替换path（局端和学校菜单完全一致的情况下，可通过该函数在外部包裹一层）
export const funChangePath = (toPath, menus={}) => {
  let routes = []
  if (!toPath || !menus) {
    return !0;
  }

  function Menus(routeList) {
    if (!routeList) return !1;
    routeList.map(item => {
      routes.push({
        ...item,
        path: toPath + item.path
      })
      if (item.routes) {
        Menus(item.routes)
      }
      return !0;
    })
  }
  Menus(menus.routes);

  return { ...menus, routes, path: toPath + menus.path };
}
