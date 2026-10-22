export*from"../../pessoas/telas/base.js";export const compSomarLoc=(o,r)=>{const[a,m]=o.split("-").map(Number),t=a*12+(m-1)+r;return`${Math.floor(t/12)}-${String(t%12+1).padStart(2,"0")}`};
