/*! © 2026 GK Soluções Empresariais LTDA (CNPJ 60.180.675/0001-91) · Todos os direitos reservados. Veja LICENSE e AUTORIA.md. */
export*from"../../pessoas/telas/base.js";export const compSomarLoc=(o,r)=>{const[a,m]=o.split("-").map(Number),t=a*12+(m-1)+r;return`${Math.floor(t/12)}-${String(t%12+1).padStart(2,"0")}`};
