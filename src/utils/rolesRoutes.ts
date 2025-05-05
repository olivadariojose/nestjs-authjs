// lib/rolesConfig.ts
export const rolePermissions = {
  Auditor: ['/dashboard',"/profile", "/configuration", "/auditor/auditoria", "/auditor/reportes"],
  vendedor: ['/dashboard',"/profile", "/configuration", "/ventas", "/clientes"],
  administrador: ['/dashboard',"/profile", "/configuration", "/usuarios", "/dashboard"],
  policia: ['/dashboard',"/profile", "/configuration", "/seguridad", "/denuncias"],
};



export const linksByRole = {
  Auditor: ["Auditoría", "Reportes"],
  vendedor: ["Ventas", "Clientes"],
  maestro: ["Clases", "Reportes"],
  administrador: ["Usuarios", "Dashboard"],
  policia: ["Seguridad", "Denuncias"],
}