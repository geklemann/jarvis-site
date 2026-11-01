export const XML_DEMO=[{id:"aud-amostra-demo-01-correta",empresa:"emp-demo-1",tipo:"nfe",entrada:"captura",mostra:"NF-e correta: nenhum apontamento",xml:`<?xml version="1.0" encoding="UTF-8"?>
<!-- NOTA DE DEMONSTRAÇÃO (fictícia, do CRIVO, ajustada para a demonstração do Jarvis). Sem valor fiscal. -->
<nfeProc xmlns="http://www.portalfiscal.inf.br/nfe" versao="4.00">
  <NFe>
    <infNFe Id="NFe42261011222333000181550010000071011123456782" versao="4.00">
      <ide>
        <cUF>42</cUF><cNF>12345678</cNF><natOp>Venda de produção do estabelecimento</natOp><mod>55</mod><serie>1</serie>
        <nNF>7101</nNF><dhEmi>2026-10-20T10:00:00-03:00</dhEmi><tpNF>1</tpNF><idDest>2</idDest><cMunFG>4208906</cMunFG>
        <tpImp>1</tpImp><tpEmis>1</tpEmis><cDV>2</cDV><tpAmb>1</tpAmb><finNFe>1</finNFe><indFinal>0</indFinal><indPres>9</indPres>
      </ide>
      <emit>
        <CNPJ>11222333000181</CNPJ><xNome>INDUSTRIA DEMONSTRACAO LTDA</xNome>
        <enderEmit><xLgr>Rua Exemplo</xLgr><nro>100</nro><xBairro>Centro</xBairro><cMun>4208906</cMun><xMun>Jaragua do Sul</xMun><UF>SC</UF></enderEmit>
        <IE>255555555</IE><CRT>3</CRT>
      </emit>
      <dest>
        <CNPJ>31415926000171</CNPJ><xNome>LOJA MODELO COMÉRCIO ELETRÔNICO LTDA</xNome>
        <enderDest><xLgr>Av. Exemplo</xLgr><nro>200</nro><xBairro>Centro</xBairro><cMun>3550308</cMun><xMun>Sao Paulo</xMun><UF>SP</UF></enderDest>
        <indIEDest>1</indIEDest><IE>110042490114</IE>
      </dest>
      <det nItem="1">
        <prod>
          <cProd>MOT-5CV</cProd><cEAN>SEM GTIN</cEAN><xProd>Motor eletrico trifasico 5 CV</xProd><NCM>85015210</NCM><CFOP>6101</CFOP>
          <uCom>UN</uCom><qCom>2.0000</qCom><vUnCom>1500.0000000000</vUnCom><vProd>3000.00</vProd><indTot>1</indTot>
        </prod>
        <imposto>
          <ICMS><ICMS00><orig>0</orig><CST>00</CST><modBC>3</modBC><vBC>3000.00</vBC><pICMS>12.00</pICMS><vICMS>360.00</vICMS></ICMS00></ICMS>
          <IPI><cEnq>999</cEnq><IPITrib><CST>50</CST><vBC>3000.00</vBC><pIPI>5.00</pIPI><vIPI>150.00</vIPI></IPITrib></IPI>
          <PIS><PISAliq><CST>01</CST><vBC>3000.00</vBC><pPIS>1.65</pPIS><vPIS>49.50</vPIS></PISAliq></PIS>
          <COFINS><COFINSAliq><CST>01</CST><vBC>3000.00</vBC><pCOFINS>7.60</pCOFINS><vCOFINS>228.00</vCOFINS></COFINSAliq></COFINS>
          <IBSCBS>
            <CST>000</CST><cClassTrib>000001</cClassTrib>
            <gIBSCBS>
              <vBC>2362.50</vBC>
              <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>2.36</vIBSUF></gIBSUF>
              <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>
              <vIBS>2.36</vIBS>
              <gCBS><pCBS>0.9000</pCBS><vCBS>21.26</vCBS></gCBS>
            </gIBSCBS>
          </IBSCBS>
        </imposto>
      </det>
      <det nItem="2">
        <prod>
          <cProd>PNL-01</cProd><cEAN>SEM GTIN</cEAN><xProd>Painel de comando</xProd><NCM>85371090</NCM><CFOP>6101</CFOP>
          <uCom>UN</uCom><qCom>1.0000</qCom><vUnCom>800.0000000000</vUnCom><vProd>800.00</vProd><indTot>1</indTot>
        </prod>
        <imposto>
          <ICMS><ICMS00><orig>0</orig><CST>00</CST><modBC>3</modBC><vBC>800.00</vBC><pICMS>12.00</pICMS><vICMS>96.00</vICMS></ICMS00></ICMS>
          <IPI><cEnq>999</cEnq><IPITrib><CST>50</CST><vBC>800.00</vBC><pIPI>5.00</pIPI><vIPI>40.00</vIPI></IPITrib></IPI>
          <PIS><PISAliq><CST>01</CST><vBC>800.00</vBC><pPIS>1.65</pPIS><vPIS>13.20</vPIS></PISAliq></PIS>
          <COFINS><COFINSAliq><CST>01</CST><vBC>800.00</vBC><pCOFINS>7.60</pCOFINS><vCOFINS>60.80</vCOFINS></COFINSAliq></COFINS>
          <IBSCBS>
            <CST>000</CST><cClassTrib>000001</cClassTrib>
            <gIBSCBS>
              <vBC>630.00</vBC>
              <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>0.63</vIBSUF></gIBSUF>
              <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>
              <vIBS>0.63</vIBS>
              <gCBS><pCBS>0.9000</pCBS><vCBS>5.67</vCBS></gCBS>
            </gIBSCBS>
          </IBSCBS>
        </imposto>
      </det>
      <total>
        <ICMSTot>
          <vBC>3800.00</vBC><vICMS>456.00</vICMS><vICMSDeson>0.00</vICMSDeson><vFCP>0.00</vFCP><vBCST>0.00</vBCST><vST>0.00</vST>
          <vFCPST>0.00</vFCPST><vFCPSTRet>0.00</vFCPSTRet><vProd>3800.00</vProd><vFrete>0.00</vFrete><vSeg>0.00</vSeg><vDesc>0.00</vDesc>
          <vII>0.00</vII><vIPI>190.00</vIPI><vIPIDevol>0.00</vIPIDevol><vPIS>62.70</vPIS><vCOFINS>288.80</vCOFINS><vOutro>0.00</vOutro><vNF>3990.00</vNF>
        </ICMSTot>
        <IBSCBSTot>
          <vBCIBSCBS>2992.50</vBCIBSCBS>
          <gIBS><gIBSUF><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSUF>2.99</vIBSUF></gIBSUF><gIBSMun><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSMun>0.00</vIBSMun></gIBSMun><vIBS>2.99</vIBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gIBS>
          <gCBS><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vCBS>26.93</vCBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gCBS>
        </IBSCBSTot>
      </total>
    </infNFe>
  </NFe>
  <protNFe versao="4.00">
    <infProt><tpAmb>1</tpAmb><verAplic>DEMO</verAplic><chNFe>42261011222333000181550010000071011123456782</chNFe><dhRecbto>2026-10-20T10:00:05-03:00</dhRecbto><nProt>342260000000001</nProt><cStat>100</cStat><xMotivo>Autorizado o uso da NF-e</xMotivo></infProt>
  </protNFe>
</nfeProc>
`},{id:"aud-amostra-demo-02-com-divergencias",empresa:"emp-demo-1",tipo:"nfe",entrada:"importacao",mostra:"NF-e com 10 erros plantados (chave, CFOP, alíquota, NCM, ICMS, cClassTrib, CBS, total, protocolo)",xml:`<?xml version="1.0" encoding="UTF-8"?>
<!-- NOTA DE DEMONSTRAÇÃO (fictícia, do CRIVO, ajustada para a demonstração do Jarvis). Sem valor fiscal. -->
<NFe xmlns="http://www.portalfiscal.inf.br/nfe">
  <infNFe Id="NFe42261011222333000181550010000071021876543214" versao="4.00">
    <ide>
      <cUF>42</cUF><cNF>87654321</cNF><natOp>Venda de mercadoria</natOp><mod>55</mod><serie>1</serie>
      <nNF>7102</nNF><dhEmi>2026-10-21T15:30:00-03:00</dhEmi><tpNF>1</tpNF><idDest>2</idDest><cMunFG>4208906</cMunFG>
      <tpImp>1</tpImp><tpEmis>1</tpEmis><cDV>4</cDV><tpAmb>1</tpAmb><finNFe>1</finNFe><indFinal>0</indFinal><indPres>9</indPres>
    </ide>
    <emit>
      <CNPJ>11222333000181</CNPJ><xNome>INDUSTRIA DEMONSTRACAO LTDA</xNome>
      <enderEmit><xLgr>Rua Exemplo</xLgr><nro>100</nro><xBairro>Centro</xBairro><cMun>4208906</cMun><xMun>Jaragua do Sul</xMun><UF>SC</UF></enderEmit>
      <IE>255555555</IE><CRT>3</CRT>
    </emit>
    <dest>
      <CNPJ>31415926000171</CNPJ><xNome>LOJA MODELO COMÉRCIO ELETRÔNICO LTDA</xNome>
      <enderDest><xLgr>Av. Exemplo</xLgr><nro>200</nro><xBairro>Centro</xBairro><cMun>3550308</cMun><xMun>Sao Paulo</xMun><UF>SP</UF></enderDest>
      <indIEDest>1</indIEDest><IE>110042490114</IE>
    </dest>
    <det nItem="1">
      <prod>
        <cProd>ROL-6205</cProd><cEAN>SEM GTIN</cEAN><xProd>Rolamento de esferas importado</xProd><NCM>84821010</NCM><CFOP>5102</CFOP>
        <uCom>UN</uCom><qCom>100.0000</qCom><vUnCom>10.0000000000</vUnCom><vProd>1000.00</vProd><indTot>1</indTot>
      </prod>
      <imposto>
        <ICMS><ICMS00><orig>1</orig><CST>00</CST><modBC>3</modBC><vBC>1000.00</vBC><pICMS>12.00</pICMS><vICMS>120.00</vICMS></ICMS00></ICMS>
        <PIS><PISAliq><CST>01</CST><vBC>1000.00</vBC><pPIS>1.65</pPIS><vPIS>16.50</vPIS></PISAliq></PIS>
        <COFINS><COFINSAliq><CST>01</CST><vBC>1000.00</vBC><pCOFINS>7.60</pCOFINS><vCOFINS>76.00</vCOFINS></COFINSAliq></COFINS>
        <IBSCBS>
          <CST>000</CST><cClassTrib>200034</cClassTrib>
          <gIBSCBS>
            <vBC>787.50</vBC>
            <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>0.79</vIBSUF></gIBSUF>
            <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>
            <vIBS>0.79</vIBS>
            <gCBS><pCBS>1.0000</pCBS><vCBS>7.88</vCBS></gCBS>
          </gIBSCBS>
        </IBSCBS>
      </imposto>
    </det>
    <det nItem="2">
      <prod>
        <cProd>COR-B45</cProd><cEAN>SEM GTIN</cEAN><xProd>Correia transportadora</xProd><NCM>4010190</NCM><CFOP>6102</CFOP>
        <uCom>UN</uCom><qCom>3.0000</qCom><vUnCom>250.0000000000</vUnCom><vProd>750.00</vProd><indTot>1</indTot>
      </prod>
      <imposto>
        <ICMS><ICMS00><orig>0</orig><CST>00</CST><modBC>3</modBC><vBC>750.00</vBC><pICMS>12.00</pICMS><vICMS>95.00</vICMS></ICMS00></ICMS>
        <PIS><PISAliq><CST>01</CST><vBC>750.00</vBC><pPIS>1.65</pPIS><vPIS>12.38</vPIS></PISAliq></PIS>
        <COFINS><COFINSAliq><CST>01</CST><vBC>750.00</vBC><pCOFINS>7.60</pCOFINS><vCOFINS>57.00</vCOFINS></COFINSAliq></COFINS>
        <IBSCBS>
          <CST>000</CST><cClassTrib>000001</cClassTrib>
          <gIBSCBS>
            <vBC>585.62</vBC>
            <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>0.59</vIBSUF></gIBSUF>
            <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>
            <vIBS>0.59</vIBS>
            <gCBS><pCBS>0.9000</pCBS><vCBS>5.27</vCBS></gCBS>
          </gIBSCBS>
        </IBSCBS>
      </imposto>
    </det>
    <total>
      <ICMSTot>
        <vBC>1750.00</vBC><vICMS>215.00</vICMS><vICMSDeson>0.00</vICMSDeson><vFCP>0.00</vFCP><vBCST>0.00</vBCST><vST>0.00</vST>
        <vFCPST>0.00</vFCPST><vFCPSTRet>0.00</vFCPSTRet><vProd>1750.00</vProd><vFrete>0.00</vFrete><vSeg>0.00</vSeg><vDesc>0.00</vDesc>
        <vII>0.00</vII><vIPI>0.00</vIPI><vIPIDevol>0.00</vIPIDevol><vPIS>28.88</vPIS><vCOFINS>133.00</vCOFINS><vOutro>0.00</vOutro><vNF>1760.00</vNF>
      </ICMSTot>
      <IBSCBSTot>
        <vBCIBSCBS>1373.12</vBCIBSCBS>
        <gIBS><gIBSUF><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSUF>1.38</vIBSUF></gIBSUF><gIBSMun><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSMun>0.00</vIBSMun></gIBSMun><vIBS>1.38</vIBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gIBS>
        <gCBS><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vCBS>13.15</vCBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gCBS>
      </IBSCBSTot>
    </total>
  </infNFe>
</NFe>
`},{id:"aud-amostra-demo-03-simples-sem-ibs-cbs",empresa:"emp-demo-1",tipo:"nfe",entrada:"importacao",mostra:"NF-e emitida pela empresa (Simples) sem IBS/CBS",xml:`<?xml version="1.0" encoding="UTF-8"?>
<!-- NOTA DE DEMONSTRAÇÃO (fictícia, do CRIVO, ajustada para a demonstração do Jarvis). Sem valor fiscal. -->
<nfeProc xmlns="http://www.portalfiscal.inf.br/nfe" versao="4.00">
  <NFe>
    <infNFe Id="NFe42261031415926000171550010000071031112233447" versao="4.00">
      <ide>
        <cUF>42</cUF><cNF>11223344</cNF><natOp>Venda de producao</natOp><mod>55</mod><serie>1</serie>
        <nNF>7103</nNF><dhEmi>2026-10-22T09:15:00-03:00</dhEmi><tpNF>1</tpNF><idDest>1</idDest><cMunFG>4208906</cMunFG>
        <tpImp>1</tpImp><tpEmis>1</tpEmis><cDV>7</cDV><tpAmb>1</tpAmb><finNFe>1</finNFe><indFinal>0</indFinal><indPres>9</indPres>
      </ide>
      <emit>
        <CNPJ>31415926000171</CNPJ><xNome>LOJA MODELO COMÉRCIO ELETRÔNICO LTDA</xNome>
        <enderEmit><xLgr>Rua Exemplo</xLgr><nro>300</nro><xBairro>Centro</xBairro><cMun>4208906</cMun><xMun>Jaragua do Sul</xMun><UF>SC</UF></enderEmit>
        <IE>256666666</IE><CRT>1</CRT>
      </emit>
      <dest>
        <CNPJ>11222333000181</CNPJ><xNome>INDUSTRIA DEMONSTRACAO LTDA</xNome>
        <enderDest><xLgr>Rua Exemplo</xLgr><nro>100</nro><xBairro>Centro</xBairro><cMun>4208906</cMun><xMun>Jaragua do Sul</xMun><UF>SC</UF></enderDest>
        <indIEDest>1</indIEDest><IE>255555555</IE>
      </dest>
      <det nItem="1">
        <prod>
          <cProd>PEC-200</cProd><cEAN>SEM GTIN</cEAN><xProd>Peca usinada sob encomenda</xProd><NCM>84879000</NCM><CFOP>5101</CFOP>
          <uCom>UN</uCom><qCom>20.0000</qCom><vUnCom>25.0000000000</vUnCom><vProd>500.00</vProd><indTot>1</indTot>
        </prod>
        <imposto>
          <ICMS><ICMSSN102><orig>0</orig><CSOSN>102</CSOSN></ICMSSN102></ICMS>
          <PIS><PISOutr><CST>99</CST><vBC>0.00</vBC><pPIS>0.00</pPIS><vPIS>0.00</vPIS></PISOutr></PIS>
          <COFINS><COFINSOutr><CST>99</CST><vBC>0.00</vBC><pCOFINS>0.00</pCOFINS><vCOFINS>0.00</vCOFINS></COFINSOutr></COFINS>
        </imposto>
      </det>
      <total>
        <ICMSTot>
          <vBC>0.00</vBC><vICMS>0.00</vICMS><vICMSDeson>0.00</vICMSDeson><vFCP>0.00</vFCP><vBCST>0.00</vBCST><vST>0.00</vST>
          <vFCPST>0.00</vFCPST><vFCPSTRet>0.00</vFCPSTRet><vProd>500.00</vProd><vFrete>0.00</vFrete><vSeg>0.00</vSeg><vDesc>0.00</vDesc>
          <vII>0.00</vII><vIPI>0.00</vIPI><vIPIDevol>0.00</vIPIDevol><vPIS>0.00</vPIS><vCOFINS>0.00</vCOFINS><vOutro>0.00</vOutro><vNF>500.00</vNF>
        </ICMSTot>
      </total>
    </infNFe>
  </NFe>
  <protNFe versao="4.00">
    <infProt><tpAmb>1</tpAmb><verAplic>DEMO</verAplic><chNFe>42261031415926000171550010000071031112233447</chNFe><dhRecbto>2026-10-22T09:15:04-03:00</dhRecbto><nProt>342260000000077</nProt><cStat>100</cStat><xMotivo>Autorizado o uso da NF-e</xMotivo></infProt>
  </protNFe>
</nfeProc>
`},{id:"aud-amostra-demo-04-cte",empresa:"emp-demo-1",tipo:"cte",entrada:"captura",mostra:"CT-e correto",xml:`<?xml version="1.0" encoding="UTF-8"?>

<cteProc xmlns="http://www.portalfiscal.inf.br/cte" versao="4.00">
  <CTe>
    <infCte versao="4.00" Id="CTe42261011222333000181570010000071041123456781">
      <ide>
        <cUF>42</cUF>
        <cCT>12345678</cCT>
        <CFOP>6353</CFOP>
        <natOp>PRESTACAO DE SERVICO DE TRANSPORTE</natOp>
        <mod>57</mod>
        <serie>1</serie>
        <nCT>7104</nCT>
        <dhEmi>2026-10-15T10:00:00-03:00</dhEmi>
        <tpImp>1</tpImp>
        <tpEmis>1</tpEmis>
        <cDV>1</cDV>
        <tpAmb>2</tpAmb>
        <tpCTe>0</tpCTe>
        <procEmi>0</procEmi>
        <verProc>EXEMPLO1</verProc>
        <cMunEnv>4205407</cMunEnv>
        <xMunEnv>FLORIANOPOLIS</xMunEnv>
        <UFEnv>SC</UFEnv>
        <modal>01</modal>
        <tpServ>0</tpServ>
        <cMunIni>4205407</cMunIni>
        <xMunIni>FLORIANOPOLIS</xMunIni>
        <UFIni>SC</UFIni>
        <cMunFim>4106902</cMunFim>
        <xMunFim>CURITIBA</xMunFim>
        <UFFim>PR</UFFim>
        <retira>1</retira>
        <indIEToma>1</indIEToma>
        <toma3><toma>0</toma></toma3>
      </ide>
      <emit>
        <CNPJ>11222333000181</CNPJ>
        <IE>123456789</IE>
        <xNome>TRANSPORTADORA EXEMPLO LTDA</xNome>
        <enderEmit>
          <xLgr>RUA FICTICIA</xLgr><nro>100</nro><xBairro>CENTRO</xBairro>
          <cMun>4205407</cMun><xMun>FLORIANOPOLIS</xMun><CEP>88010000</CEP><UF>SC</UF>
        </enderEmit>
        <CRT>3</CRT>
      </emit>
      <rem>
        <CNPJ>31415926000171</CNPJ>
        <IE>987654321</IE>
        <xNome>LOJA MODELO COMÉRCIO ELETRÔNICO LTDA</xNome>
        <enderReme>
          <xLgr>AV FICTICIA</xLgr><nro>200</nro><xBairro>CENTRO</xBairro>
          <cMun>4205407</cMun><xMun>FLORIANOPOLIS</xMun><CEP>88015000</CEP><UF>SC</UF>
        </enderReme>
      </rem>
      <dest>
        <CPF>11144477735</CPF>
        <xNome>CTE EMITIDO EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL</xNome>
        <enderDest>
          <xLgr>RUA EXEMPLO</xLgr><nro>300</nro><xBairro>CENTRO</xBairro>
          <cMun>4106902</cMun><xMun>CURITIBA</xMun><CEP>80010000</CEP><UF>PR</UF>
        </enderDest>
      </dest>
      <vPrest>
        <vTPrest>1000.00</vTPrest>
        <vRec>1000.00</vRec>
        <Comp><xNome>FRETE PESO</xNome><vComp>900.00</vComp></Comp>
        <Comp><xNome>PEDAGIO</xNome><vComp>100.00</vComp></Comp>
      </vPrest>
      <imp>
        <ICMS>
          <ICMS00><CST>00</CST><vBC>1000.00</vBC><pICMS>12.00</pICMS><vICMS>120.00</vICMS></ICMS00>
        </ICMS>
        <IBSCBS>
          <CST>000</CST>
          <cClassTrib>000001</cClassTrib>
          <gIBSCBS>
            <vBC>880.00</vBC>
            <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>0.88</vIBSUF></gIBSUF>
            <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>
            <vIBS>0.88</vIBS>
            <gCBS><pCBS>0.9000</pCBS><vCBS>7.92</vCBS></gCBS>
          </gIBSCBS>
        </IBSCBS>
        <vTotDFe>1000.00</vTotDFe>
      </imp>
      <infCTeNorm>
        <infCarga>
          <vCarga>50000.00</vCarga>
          <proPred>PECAS</proPred>
          <infQ><cUnid>01</cUnid><tpMed>PESO BRUTO</tpMed><qCarga>1000.0000</qCarga></infQ>
        </infCarga>
        <infDoc>
          <infNFe><chave>42261031415926000171550010000004561876543219</chave></infNFe>
        </infDoc>
        <infModal versaoModal="4.00">
          <rodo><RNTRC>12345678</RNTRC></rodo>
        </infModal>
      </infCTeNorm>
    </infCte>
    <infCTeSupl>
      <qrCodCTe>https://dfe-portal.svrs.rs.gov.br/cte/qrCode?chCTe=42261011222333000181570010000071041123456781&amp;tpAmb=2</qrCodCTe>
    </infCTeSupl>
    <Signature xmlns="http://www.w3.org/2000/09/xmldsig#"><SignedInfo><CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/><SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/><Reference URI="#CTe42261011222333000181570010000071041123456781"><Transforms><Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/><Transform Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/></Transforms><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/><DigestValue>AAAAAAAAAAAAAAAAAAAAAAAAAAA=</DigestValue></Reference></SignedInfo><SignatureValue>AAAA</SignatureValue><KeyInfo><X509Data><X509Certificate>AAAA</X509Certificate></X509Data></KeyInfo></Signature>
  </CTe>
  <protCTe versao="4.00">
    <infProt>
      <tpAmb>2</tpAmb>
      <verAplic>EXEMPLO</verAplic>
      <chCTe>42261011222333000181570010000071041123456781</chCTe>
      <dhRecbto>2026-10-15T10:00:05-03:00</dhRecbto>
      <nProt>342260000000001</nProt>
      <digVal>AAAAAAAAAAAAAAAAAAAAAAAAAAA=</digVal>
      <cStat>100</cStat>
      <xMotivo>Autorizado o uso do CT-e</xMotivo>
    </infProt>
  </protCTe>
</cteProc>
`},{id:"aud-amostra-demo-05-nfse",empresa:"emp-demo-1",tipo:"nfse",entrada:"importacao",mostra:"NFS-e correta",xml:`<?xml version="1.0" encoding="UTF-8"?>

<NFSe xmlns="http://www.sped.fazenda.gov.br/nfse" versao="1.01">
  <infNFSe Id="NFS42054072211222333000181000000000000126101234567890">
    <xLocEmi>Florianopolis</xLocEmi>
    <xLocPrestacao>Florianopolis</xLocPrestacao>
    <nNFSe>1</nNFSe>
    <cLocIncid>4205407</cLocIncid>
    <xLocIncid>Florianopolis</xLocIncid>
    <xTribNac>Analise e desenvolvimento de sistemas.</xTribNac>
    <xNBS>Servicos de projeto e desenvolvimento de aplicativos personalizados</xNBS>
    <verAplic>EXEMPLO1</verAplic>
    <ambGer>2</ambGer>
    <tpEmis>1</tpEmis>
    <procEmi>1</procEmi>
    <cStat>100</cStat>
    <dhProc>2026-10-15T10:00:05-03:00</dhProc>
    <nDFSe>1</nDFSe>
    <emit>
      <CNPJ>11222333000181</CNPJ>
      <xNome>PRESTADORA EXEMPLO LTDA</xNome>
      <enderNac>
        <xLgr>RUA FICTICIA</xLgr><nro>100</nro><xBairro>CENTRO</xBairro>
        <cMun>4205407</cMun><UF>SC</UF><CEP>88010000</CEP>
      </enderNac>
    </emit>
    <valores>
      <vBC>1000.00</vBC>
      <pAliqAplic>2.00</pAliqAplic>
      <vISSQN>20.00</vISSQN>
      <vTotalRet>15.00</vTotalRet>
      <vLiq>985.00</vLiq>
    </valores>
    <IBSCBS>
      <cLocalidadeIncid>4106902</cLocalidadeIncid>
      <xLocalidadeIncid>Curitiba</xLocalidadeIncid>
      <valores>
        <vBC>943.50</vBC>
        <uf><pIBSUF>0.10</pIBSUF><pAliqEfetUF>0.10</pAliqEfetUF></uf>
        <mun><pIBSMun>0.00</pIBSMun><pAliqEfetMun>0.00</pAliqEfetMun></mun>
        <fed><pCBS>0.90</pCBS><pAliqEfetCBS>0.90</pAliqEfetCBS></fed>
      </valores>
      <totCIBS>
        <vTotNF>985.00</vTotNF>
        <gIBS>
          <vIBSTot>0.94</vIBSTot>
          <gIBSUFTot><vIBSUF>0.94</vIBSUF></gIBSUFTot>
          <gIBSMunTot><vIBSMun>0.00</vIBSMun></gIBSMunTot>
        </gIBS>
        <gCBS><vCBS>8.49</vCBS></gCBS>
      </totCIBS>
    </IBSCBS>
    <DPS versao="1.01">
      <infDPS Id="DPS420540721122233300018100001000000000000001">
        <tpAmb>2</tpAmb>
        <dhEmi>2026-10-15T10:00:00-03:00</dhEmi>
        <verAplic>EXEMPLO1</verAplic>
        <serie>1</serie>
        <nDPS>1</nDPS>
        <dCompet>2026-10-15</dCompet>
        <tpEmit>1</tpEmit>
        <cLocEmi>4205407</cLocEmi>
        <prest>
          <CNPJ>11222333000181</CNPJ>
          <regTrib><opSimpNac>1</opSimpNac><regEspTrib>0</regEspTrib></regTrib>
        </prest>
        <toma>
          <CNPJ>31415926000171</CNPJ>
          <xNome>LOJA MODELO COMÉRCIO ELETRÔNICO LTDA</xNome>
          <end>
            <endNac><cMun>4106902</cMun><CEP>80010000</CEP></endNac>
            <xLgr>AV FICTICIA</xLgr><nro>200</nro><xBairro>CENTRO</xBairro>
          </end>
        </toma>
        <serv>
          <locPrest><cLocPrestacao>4205407</cLocPrestacao></locPrest>
          <cServ>
            <cTribNac>010101</cTribNac>
            <xDescServ>Desenvolvimento de sistema sob encomenda (descricao ficticia)</xDescServ>
            <cNBS>115022000</cNBS>
          </cServ>
        </serv>
        <valores>
          <vServPrest><vServ>1000.00</vServ></vServPrest>
          <trib>
            <tribMun><tribISSQN>1</tribISSQN><tpRetISSQN>1</tpRetISSQN></tribMun>
            <tribFed>
              <piscofins>
                <CST>01</CST>
                <vBCPisCofins>1000.00</vBCPisCofins>
                <pAliqPis>0.65</pAliqPis>
                <pAliqCofins>3.00</pAliqCofins>
                <vPis>6.50</vPis>
                <vCofins>30.00</vCofins>
                <tpRetPisCofins>0</tpRetPisCofins>
              </piscofins>
              <vRetIRRF>15.00</vRetIRRF>
            </tribFed>
            <totTrib><indTotTrib>0</indTotTrib></totTrib>
          </trib>
        </valores>
        <IBSCBS>
          <finNFSe>0</finNFSe>
          <cIndOp>100301</cIndOp>
          <indDest>0</indDest>
          <valores>
            <trib>
              <gIBSCBS><CST>000</CST><cClassTrib>000001</cClassTrib></gIBSCBS>
            </trib>
          </valores>
        </IBSCBS>
      </infDPS>
    </DPS>
  </infNFSe>
  <Signature xmlns="http://www.w3.org/2000/09/xmldsig#"><SignedInfo><CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/><SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/><Reference URI="#NFS42054072211222333000181000000000000126101234567890"><Transforms><Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/><Transform Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/></Transforms><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/><DigestValue>AAAAAAAAAAAAAAAAAAAAAAAAAAA=</DigestValue></Reference></SignedInfo><SignatureValue>AAAA</SignatureValue><KeyInfo><X509Data><X509Certificate>AAAA</X509Certificate></X509Data></KeyInfo></Signature>
</NFSe>
`},{id:"aud-gabarito-16",empresa:"emp-demo-1",tipo:"nfe",entrada:"captura",mostra:"CLA-05 e RTC-55",xml:`<?xml version="1.0" encoding="UTF-8"?>\r
<!-- NOTA DE DEMONSTRAÇÃO (fictícia, do CRIVO, ajustada para a demonstração do Jarvis). Sem valor fiscal. -->\r
<nfeProc xmlns="http://www.portalfiscal.inf.br/nfe" versao="4.00">\r
  <NFe>\r
    <infNFe Id="NFe42261011222333000181550010000071051123456781" versao="4.00">\r
      <ide>\r
        <cUF>42</cUF><cNF>12345678</cNF><natOp>Venda de produção do estabelecimento</natOp><mod>55</mod><serie>1</serie>\r
        <nNF>7105</nNF><dhEmi>2026-10-20T10:00:00-03:00</dhEmi><tpNF>1</tpNF><idDest>2</idDest><cMunFG>4208906</cMunFG>\r
        <tpImp>1</tpImp><tpEmis>1</tpEmis><cDV>1</cDV><tpAmb>1</tpAmb><finNFe>1</finNFe><indFinal>0</indFinal><indPres>9</indPres>\r
      </ide>\r
      <emit>\r
        <CNPJ>11222333000181</CNPJ><xNome>INDUSTRIA DEMONSTRACAO LTDA</xNome>\r
        <enderEmit><xLgr>Rua Exemplo</xLgr><nro>100</nro><xBairro>Centro</xBairro><cMun>1302603</cMun><xMun>Manaus</xMun><UF>AM</UF></enderEmit>\r
        <IE>255555555</IE><ISUFEmit>123</ISUFEmit><CRT>3</CRT>\r
      </emit>\r
      <dest>\r
        <CNPJ>31415926000171</CNPJ><xNome>LOJA MODELO COMÉRCIO ELETRÔNICO LTDA</xNome>\r
        <enderDest><xLgr>Av. Exemplo</xLgr><nro>200</nro><xBairro>Centro</xBairro><cMun>1303569</cMun><xMun>Destino</xMun><UF>AM</UF></enderDest>\r
        <indIEDest>1</indIEDest><IE>110042490114</IE>\r
      </dest>\r
      <det nItem="1">\r
        <prod>\r
          <cProd>MOT-5CV</cProd><cEAN>SEM GTIN</cEAN><xProd>Motor eletrico trifasico 5 CV</xProd><NCM>22030000</NCM><CFOP>6101</CFOP>\r
          <uCom>UN</uCom><qCom>2.0000</qCom><vUnCom>1500.0000000000</vUnCom><vProd>3000.00</vProd><indTot>1</indTot>\r
        </prod>\r
        <imposto>\r
          <ICMS><ICMS00><orig>0</orig><CST>00</CST><modBC>3</modBC><vBC>3000.00</vBC><pICMS>12.00</pICMS><vICMS>360.00</vICMS></ICMS00></ICMS>\r
          <IPI><cEnq>999</cEnq><IPITrib><CST>50</CST><vBC>3000.00</vBC><pIPI>5.00</pIPI><vIPI>150.00</vIPI></IPITrib></IPI>\r
          <PIS><PISAliq><CST>01</CST><vBC>3000.00</vBC><pPIS>1.65</pPIS><vPIS>49.50</vPIS></PISAliq></PIS>\r
          <COFINS><COFINSAliq><CST>01</CST><vBC>3000.00</vBC><pCOFINS>7.60</pCOFINS><vCOFINS>228.00</vCOFINS></COFINSAliq></COFINS>\r
          <IBSCBS>\r
            <CST>000</CST><cClassTrib>000001</cClassTrib>\r
            <gIBSCBS>\r
              <vBC>2362.50</vBC>\r
              <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>2.36</vIBSUF></gIBSUF>\r
              <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>\r
              <vIBS>2.36</vIBS>\r
              <gCBS><pCBS>0.9000</pCBS><gALCZFMCBS><tpALCZFMCBS>1</tpALCZFMCBS></gALCZFMCBS><vCBS>21.26</vCBS></gCBS>\r
            </gIBSCBS>\r
          </IBSCBS>\r
        </imposto>\r
      </det>\r
      <det nItem="2">\r
        <prod>\r
          <cProd>PNL-01</cProd><cEAN>SEM GTIN</cEAN><xProd>Painel de comando</xProd><NCM>85371090</NCM><CFOP>6101</CFOP>\r
          <uCom>UN</uCom><qCom>1.0000</qCom><vUnCom>800.0000000000</vUnCom><vProd>800.00</vProd><indTot>1</indTot>\r
        </prod>\r
        <imposto>\r
          <ICMS><ICMS00><orig>0</orig><CST>00</CST><modBC>3</modBC><vBC>800.00</vBC><pICMS>12.00</pICMS><vICMS>96.00</vICMS></ICMS00></ICMS>\r
          <IPI><cEnq>999</cEnq><IPITrib><CST>50</CST><vBC>800.00</vBC><pIPI>5.00</pIPI><vIPI>40.00</vIPI></IPITrib></IPI>\r
          <PIS><PISAliq><CST>01</CST><vBC>800.00</vBC><pPIS>1.65</pPIS><vPIS>13.20</vPIS></PISAliq></PIS>\r
          <COFINS><COFINSAliq><CST>01</CST><vBC>800.00</vBC><pCOFINS>7.60</pCOFINS><vCOFINS>60.80</vCOFINS></COFINSAliq></COFINS>\r
          <IBSCBS>\r
            <CST>000</CST><cClassTrib>000001</cClassTrib>\r
            <gIBSCBS>\r
              <vBC>630.00</vBC>\r
              <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>0.63</vIBSUF></gIBSUF>\r
              <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>\r
              <vIBS>0.63</vIBS>\r
              <gCBS><pCBS>0.9000</pCBS><vCBS>5.67</vCBS></gCBS>\r
            </gIBSCBS>\r
          </IBSCBS>\r
        </imposto>\r
      </det>\r
      <total>\r
        <ICMSTot>\r
          <vBC>3800.00</vBC><vICMS>456.00</vICMS><vICMSDeson>0.00</vICMSDeson><vFCP>0.00</vFCP><vBCST>0.00</vBCST><vST>0.00</vST>\r
          <vFCPST>0.00</vFCPST><vFCPSTRet>0.00</vFCPSTRet><vProd>3800.00</vProd><vFrete>0.00</vFrete><vSeg>0.00</vSeg><vDesc>0.00</vDesc>\r
          <vII>0.00</vII><vIPI>190.00</vIPI><vIPIDevol>0.00</vIPIDevol><vPIS>62.70</vPIS><vCOFINS>288.80</vCOFINS><vOutro>0.00</vOutro><vNF>3990.00</vNF>\r
        </ICMSTot>\r
        <IBSCBSTot>\r
          <vBCIBSCBS>2992.50</vBCIBSCBS>\r
          <gIBS><gIBSUF><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSUF>2.99</vIBSUF></gIBSUF><gIBSMun><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSMun>0.00</vIBSMun></gIBSMun><vIBS>2.99</vIBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gIBS>\r
          <gCBS><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vCBS>26.93</vCBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gCBS>\r
        </IBSCBSTot>\r
      </total>\r
    </infNFe>\r
  </NFe>\r
  <protNFe versao="4.00">\r
    <infProt><tpAmb>1</tpAmb><verAplic>DEMO</verAplic><chNFe>42261011222333000181550010000071051123456781</chNFe><dhRecbto>2026-10-20T10:00:05-03:00</dhRecbto><nProt>342260000000001</nProt><cStat>100</cStat><xMotivo>Autorizado o uso da NF-e</xMotivo></infProt>\r
  </protNFe>\r
</nfeProc>\r
`},{id:"aud-gabarito-37",empresa:"emp-demo-1",tipo:"nfe",entrada:"captura",mostra:"RTC-10, RTC-19 e RTC-31",xml:`<?xml version="1.0" encoding="UTF-8"?>\r
<!-- NOTA DE DEMONSTRAÇÃO (fictícia, do CRIVO, ajustada para a demonstração do Jarvis). Sem valor fiscal. -->\r
<nfeProc xmlns="http://www.portalfiscal.inf.br/nfe" versao="4.00">\r
  <NFe>\r
    <infNFe Id="NFe42261011222333000181550010000071061123456789" versao="4.00">\r
      <ide>\r
        <cUF>42</cUF><cNF>12345678</cNF><natOp>Venda de produção do estabelecimento</natOp><mod>55</mod><serie>1</serie>\r
        <nNF>7106</nNF><dhEmi>2026-10-20T10:00:00-03:00</dhEmi><tpNF>1</tpNF><idDest>2</idDest><cMunFG>4208906</cMunFG>\r
        <tpImp>1</tpImp><tpEmis>1</tpEmis><cDV>9</cDV><tpAmb>1</tpAmb><finNFe>1</finNFe><indFinal>0</indFinal><indPres>9</indPres>\r
      </ide>\r
      <emit>\r
        <CNPJ>11222333000181</CNPJ><xNome>INDUSTRIA DEMONSTRACAO LTDA</xNome>\r
        <enderEmit><xLgr>Rua Exemplo</xLgr><nro>100</nro><xBairro>Centro</xBairro><cMun>4208906</cMun><xMun>Jaragua do Sul</xMun><UF>SC</UF></enderEmit>\r
        <IE>255555555</IE><CRT>3</CRT>\r
      </emit>\r
      <dest>\r
        <CNPJ>31415926000171</CNPJ><xNome>LOJA MODELO COMÉRCIO ELETRÔNICO LTDA</xNome>\r
        <enderDest><xLgr>Av. Exemplo</xLgr><nro>200</nro><xBairro>Centro</xBairro><cMun>3550308</cMun><xMun>Sao Paulo</xMun><UF>SP</UF></enderDest>\r
        <indIEDest>1</indIEDest><IE>110042490114</IE>\r
      </dest>\r
      <det nItem="1">\r
        <prod>\r
          <cProd>MOT-5CV</cProd><cEAN>SEM GTIN</cEAN><xProd>Motor eletrico trifasico 5 CV</xProd><NCM>85015210</NCM><CFOP>6101</CFOP>\r
          <uCom>UN</uCom><qCom>2.0000</qCom><vUnCom>1500.0000000000</vUnCom><vProd>3000.00</vProd><indTot>1</indTot>\r
        </prod>\r
        <imposto>\r
          <ICMS><ICMS00><orig>0</orig><CST>00</CST><modBC>3</modBC><vBC>3000.00</vBC><pICMS>12.00</pICMS><vICMS>360.00</vICMS></ICMS00></ICMS>\r
          <IPI><cEnq>999</cEnq><IPITrib><CST>50</CST><vBC>3000.00</vBC><pIPI>5.00</pIPI><vIPI>150.00</vIPI></IPITrib></IPI>\r
          <PIS><PISAliq><CST>01</CST><vBC>3000.00</vBC><pPIS>1.65</pPIS><vPIS>49.50</vPIS></PISAliq></PIS>\r
          <COFINS><COFINSAliq><CST>01</CST><vBC>3000.00</vBC><pCOFINS>7.60</pCOFINS><vCOFINS>228.00</vCOFINS></COFINSAliq></COFINS>\r
          <IBSCBS>\r
            <CST>410</CST><cClassTrib>410016</cClassTrib>\r
            <gIBSCBS>\r
              <vBC>2362.50</vBC>\r
              <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>2.36</vIBSUF></gIBSUF>\r
              <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>\r
              <vIBS>2.36</vIBS>\r
              <gCBS><pCBS>0.9000</pCBS><vCBS>21.26</vCBS></gCBS>\r
            </gIBSCBS>\r
          <gCredPresOper><cCredPres>03</cCredPres><gIBSCredPres><pCredPres>0.0000</pCredPres><vCredPres>0.00</vCredPres></gIBSCredPres></gCredPresOper></IBSCBS>\r
        </imposto>\r
      </det>\r
      <det nItem="2">\r
        <prod>\r
          <cProd>PNL-01</cProd><cEAN>SEM GTIN</cEAN><xProd>Painel de comando</xProd><NCM>85371090</NCM><CFOP>6101</CFOP>\r
          <uCom>UN</uCom><qCom>1.0000</qCom><vUnCom>800.0000000000</vUnCom><vProd>800.00</vProd><indTot>1</indTot>\r
        </prod>\r
        <imposto>\r
          <ICMS><ICMS00><orig>0</orig><CST>00</CST><modBC>3</modBC><vBC>800.00</vBC><pICMS>12.00</pICMS><vICMS>96.00</vICMS></ICMS00></ICMS>\r
          <IPI><cEnq>999</cEnq><IPITrib><CST>50</CST><vBC>800.00</vBC><pIPI>5.00</pIPI><vIPI>40.00</vIPI></IPITrib></IPI>\r
          <PIS><PISAliq><CST>01</CST><vBC>800.00</vBC><pPIS>1.65</pPIS><vPIS>13.20</vPIS></PISAliq></PIS>\r
          <COFINS><COFINSAliq><CST>01</CST><vBC>800.00</vBC><pCOFINS>7.60</pCOFINS><vCOFINS>60.80</vCOFINS></COFINSAliq></COFINS>\r
          <IBSCBS>\r
            <CST>000</CST><cClassTrib>000001</cClassTrib>\r
            <gIBSCBS>\r
              <vBC>630.00</vBC>\r
              <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>0.63</vIBSUF></gIBSUF>\r
              <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>\r
              <vIBS>0.63</vIBS>\r
              <gCBS><pCBS>0.9000</pCBS><vCBS>5.67</vCBS></gCBS>\r
            </gIBSCBS>\r
          </IBSCBS>\r
        </imposto>\r
      </det>\r
      <total>\r
        <ICMSTot>\r
          <vBC>3800.00</vBC><vICMS>456.00</vICMS><vICMSDeson>0.00</vICMSDeson><vFCP>0.00</vFCP><vBCST>0.00</vBCST><vST>0.00</vST>\r
          <vFCPST>0.00</vFCPST><vFCPSTRet>0.00</vFCPSTRet><vProd>3800.00</vProd><vFrete>0.00</vFrete><vSeg>0.00</vSeg><vDesc>0.00</vDesc>\r
          <vII>0.00</vII><vIPI>190.00</vIPI><vIPIDevol>0.00</vIPIDevol><vPIS>62.70</vPIS><vCOFINS>288.80</vCOFINS><vOutro>0.00</vOutro><vNF>3990.00</vNF>\r
        </ICMSTot>\r
        <IBSCBSTot>\r
          <vBCIBSCBS>2992.50</vBCIBSCBS>\r
          <gIBS><gIBSUF><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSUF>2.99</vIBSUF></gIBSUF><gIBSMun><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSMun>0.00</vIBSMun></gIBSMun><vIBS>2.99</vIBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gIBS>\r
          <gCBS><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vCBS>26.93</vCBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gCBS>\r
        </IBSCBSTot>\r
      </total>\r
    </infNFe>\r
  </NFe>\r
  <protNFe versao="4.00">\r
    <infProt><tpAmb>1</tpAmb><verAplic>DEMO</verAplic><chNFe>42261011222333000181550010000071061123456789</chNFe><dhRecbto>2026-10-20T10:00:05-03:00</dhRecbto><nProt>342260000000001</nProt><cStat>100</cStat><xMotivo>Autorizado o uso da NF-e</xMotivo></infProt>\r
  </protNFe>\r
</nfeProc>\r
`},{id:"aud-gabarito-56",empresa:"emp-demo-1",tipo:"nfe",entrada:"captura",mostra:"CAL-08",xml:`<?xml version="1.0" encoding="UTF-8"?>\r
<!-- NOTA DE DEMONSTRAÇÃO (fictícia, do CRIVO, ajustada para a demonstração do Jarvis). Sem valor fiscal. -->\r
<nfeProc xmlns="http://www.portalfiscal.inf.br/nfe" versao="4.00">\r
  <NFe>\r
    <infNFe Id="NFe42261011222333000181550010000071071123456786" versao="4.00">\r
      <ide>\r
        <cUF>42</cUF><cNF>12345678</cNF><natOp>Venda de produção do estabelecimento</natOp><mod>55</mod><serie>1</serie>\r
        <nNF>7107</nNF><dhEmi>2026-10-20T10:00:00-03:00</dhEmi><tpNF>1</tpNF><idDest>2</idDest><cMunFG>4208906</cMunFG>\r
        <tpImp>1</tpImp><tpEmis>1</tpEmis><cDV>6</cDV><tpAmb>1</tpAmb><finNFe>1</finNFe><indFinal>0</indFinal><indPres>9</indPres>\r
      </ide>\r
      <emit>\r
        <CNPJ>11222333000181</CNPJ><xNome>INDUSTRIA DEMONSTRACAO LTDA</xNome>\r
        <enderEmit><xLgr>Rua Exemplo</xLgr><nro>100</nro><xBairro>Centro</xBairro><cMun>4208906</cMun><xMun>Jaragua do Sul</xMun><UF>SC</UF></enderEmit>\r
        <IE>255555555</IE><CRT>3</CRT>\r
      </emit>\r
      <dest>\r
        <CNPJ>31415926000171</CNPJ><xNome>LOJA MODELO COMÉRCIO ELETRÔNICO LTDA</xNome>\r
        <enderDest><xLgr>Av. Exemplo</xLgr><nro>200</nro><xBairro>Centro</xBairro><cMun>3550308</cMun><xMun>Sao Paulo</xMun><UF>SP</UF></enderDest>\r
        <indIEDest>1</indIEDest><IE>110042490114</IE>\r
      </dest>\r
      <det nItem="1">\r
        <prod>\r
          <cProd>MOT-5CV</cProd><cEAN>SEM GTIN</cEAN><xProd>Motor eletrico trifasico 5 CV</xProd><NCM>85015210</NCM><CFOP>6101</CFOP>\r
          <uCom>UN</uCom><qCom>2.0000</qCom><vUnCom>1500.0000000000</vUnCom><vProd>3000.00</vProd><indTot>1</indTot>\r
        </prod>\r
        <imposto>\r
          <ICMS><ICMS00><orig>0</orig><CST>00</CST><modBC>3</modBC><vBC>3000.00</vBC><pICMS>12.00</pICMS><vICMS>360.00</vICMS><vICMSDeson>100.00</vICMSDeson><indDeduzDeson>1</indDeduzDeson></ICMS00></ICMS>\r
          <IPI><cEnq>999</cEnq><IPITrib><CST>50</CST><vBC>3000.00</vBC><pIPI>5.00</pIPI><vIPI>150.00</vIPI></IPITrib></IPI>\r
          <PIS><PISAliq><CST>01</CST><vBC>3000.00</vBC><pPIS>1.65</pPIS><vPIS>49.50</vPIS></PISAliq></PIS>\r
          <COFINS><COFINSAliq><CST>01</CST><vBC>3000.00</vBC><pCOFINS>7.60</pCOFINS><vCOFINS>228.00</vCOFINS></COFINSAliq></COFINS>\r
          <IBSCBS>\r
            <CST>000</CST><cClassTrib>000001</cClassTrib>\r
            <gIBSCBS>\r
              <vBC>2362.50</vBC>\r
              <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>2.36</vIBSUF></gIBSUF>\r
              <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>\r
              <vIBS>2.36</vIBS>\r
              <gCBS><pCBS>0.9000</pCBS><vCBS>21.26</vCBS></gCBS>\r
            </gIBSCBS>\r
          </IBSCBS>\r
        </imposto>\r
      </det>\r
      <det nItem="2">\r
        <prod>\r
          <cProd>PNL-01</cProd><cEAN>SEM GTIN</cEAN><xProd>Painel de comando</xProd><NCM>85371090</NCM><CFOP>6101</CFOP>\r
          <uCom>UN</uCom><qCom>1.0000</qCom><vUnCom>800.0000000000</vUnCom><vProd>800.00</vProd><indTot>1</indTot>\r
        </prod>\r
        <imposto>\r
          <ICMS><ICMS00><orig>0</orig><CST>00</CST><modBC>3</modBC><vBC>800.00</vBC><pICMS>12.00</pICMS><vICMS>96.00</vICMS></ICMS00></ICMS>\r
          <IPI><cEnq>999</cEnq><IPITrib><CST>50</CST><vBC>800.00</vBC><pIPI>5.00</pIPI><vIPI>40.00</vIPI></IPITrib></IPI>\r
          <PIS><PISAliq><CST>01</CST><vBC>800.00</vBC><pPIS>1.65</pPIS><vPIS>13.20</vPIS></PISAliq></PIS>\r
          <COFINS><COFINSAliq><CST>01</CST><vBC>800.00</vBC><pCOFINS>7.60</pCOFINS><vCOFINS>60.80</vCOFINS></COFINSAliq></COFINS>\r
          <IBSCBS>\r
            <CST>000</CST><cClassTrib>000001</cClassTrib>\r
            <gIBSCBS>\r
              <vBC>630.00</vBC>\r
              <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>0.63</vIBSUF></gIBSUF>\r
              <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>\r
              <vIBS>0.63</vIBS>\r
              <gCBS><pCBS>0.9000</pCBS><vCBS>5.67</vCBS></gCBS>\r
            </gIBSCBS>\r
          </IBSCBS>\r
        </imposto>\r
      </det>\r
      <total>\r
        <ICMSTot>\r
          <vBC>3800.00</vBC><vICMS>456.00</vICMS><vICMSDeson>100.00</vICMSDeson><vFCP>0.00</vFCP><vBCST>0.00</vBCST><vST>0.00</vST>\r
          <vFCPST>0.00</vFCPST><vFCPSTRet>0.00</vFCPSTRet><vProd>3800.00</vProd><vFrete>0.00</vFrete><vSeg>0.00</vSeg><vDesc>0.00</vDesc>\r
          <vII>0.00</vII><vIPI>190.00</vIPI><vIPIDevol>0.00</vIPIDevol><vPIS>62.70</vPIS><vCOFINS>288.80</vCOFINS><vOutro>0.00</vOutro><vNF>3990.00</vNF>\r
        </ICMSTot>\r
        <IBSCBSTot>\r
          <vBCIBSCBS>2992.50</vBCIBSCBS>\r
          <gIBS><gIBSUF><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSUF>2.99</vIBSUF></gIBSUF><gIBSMun><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSMun>0.00</vIBSMun></gIBSMun><vIBS>2.99</vIBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gIBS>\r
          <gCBS><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vCBS>26.93</vCBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gCBS>\r
        </IBSCBSTot>\r
      </total>\r
    </infNFe>\r
  </NFe>\r
  <protNFe versao="4.00">\r
    <infProt><tpAmb>1</tpAmb><verAplic>DEMO</verAplic><chNFe>42261011222333000181550010000071071123456786</chNFe><dhRecbto>2026-10-20T10:00:05-03:00</dhRecbto><nProt>342260000000001</nProt><cStat>100</cStat><xMotivo>Autorizado o uso da NF-e</xMotivo></infProt>\r
  </protNFe>\r
</nfeProc>\r
`},{id:"aud-gabarito-106",empresa:"emp-demo-1",tipo:"nfe",entrada:"captura",mostra:"CAL-07 e RTC-06 (diferença de valor)",xml:`<?xml version="1.0" encoding="UTF-8"?>\r
<!-- NOTA DE DEMONSTRAÇÃO (fictícia, do CRIVO, ajustada para a demonstração do Jarvis). Sem valor fiscal. -->\r
<nfeProc xmlns="http://www.portalfiscal.inf.br/nfe" versao="4.00">\r
  <NFe>\r
    <infNFe Id="NFe42261011222333000181550010000071081123456783" versao="4.00">\r
      <ide>\r
        <cUF>42</cUF><cNF>12345678</cNF><natOp>Venda de produção do estabelecimento</natOp><mod>55</mod><serie>1</serie>\r
        <nNF>7108</nNF><dhEmi>2026-10-20T10:00:00-03:00</dhEmi><tpNF>1</tpNF><idDest>2</idDest><cMunFG>4208906</cMunFG>\r
        <tpImp>1</tpImp><tpEmis>1</tpEmis><cDV>3</cDV><tpAmb>1</tpAmb><finNFe>1</finNFe><indFinal>0</indFinal><indPres>9</indPres>\r
      </ide>\r
      <emit>\r
        <CNPJ>11222333000181</CNPJ><xNome>INDUSTRIA DEMONSTRACAO LTDA</xNome>\r
        <enderEmit><xLgr>Rua Exemplo</xLgr><nro>100</nro><xBairro>Centro</xBairro><cMun>4208906</cMun><xMun>Jaragua do Sul</xMun><UF>SC</UF></enderEmit>\r
        <IE>255555555</IE><CRT>3</CRT>\r
      </emit>\r
      <dest>\r
        <CNPJ>31415926000171</CNPJ><xNome>LOJA MODELO COMÉRCIO ELETRÔNICO LTDA</xNome>\r
        <enderDest><xLgr>Av. Exemplo</xLgr><nro>200</nro><xBairro>Centro</xBairro><cMun>3550308</cMun><xMun>Sao Paulo</xMun><UF>SP</UF></enderDest>\r
        <indIEDest>1</indIEDest><IE>110042490114</IE>\r
      </dest>\r
      <det nItem="1">\r
        <prod>\r
          <cProd>MOT-5CV</cProd><cEAN>SEM GTIN</cEAN><xProd>Motor eletrico trifasico 5 CV</xProd><NCM>85015210</NCM><CFOP>6101</CFOP>\r
          <uCom>UN</uCom><qCom>2.0000</qCom><vUnCom>1500.0000000000</vUnCom><vProd>3000.00</vProd><indTot>1</indTot>\r
        </prod>\r
        <imposto>\r
          <ICMS><ICMS02><orig>0</orig><CST>02</CST></ICMS02></ICMS>\r
          <IPI><cEnq>999</cEnq><IPITrib><CST>50</CST><vBC>3000.00</vBC><pIPI>5.00</pIPI><vIPI>150.00</vIPI></IPITrib></IPI>\r
          <PIS><PISAliq><CST>01</CST><vBC>3000.00</vBC><pPIS>1.65</pPIS><vPIS>49.50</vPIS></PISAliq></PIS>\r
          <COFINS><COFINSAliq><CST>01</CST><vBC>3000.00</vBC><pCOFINS>7.60</pCOFINS><vCOFINS>228.00</vCOFINS></COFINSAliq></COFINS>\r
          <IBSCBS>\r
            <CST>000</CST><cClassTrib>000001</cClassTrib>\r
            <gIBSCBS>\r
              <vBC>2362.50</vBC>\r
              <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>2.36</vIBSUF></gIBSUF>\r
              <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>\r
              <vIBS>2.36</vIBS>\r
              <gCBS><pCBS>0.9000</pCBS><vCBS>21.26</vCBS></gCBS>\r
            </gIBSCBS>\r
          </IBSCBS>\r
        </imposto>\r
      </det>\r
      <det nItem="2">\r
        <prod>\r
          <cProd>PNL-01</cProd><cEAN>SEM GTIN</cEAN><xProd>Painel de comando</xProd><NCM>85371090</NCM><CFOP>6101</CFOP>\r
          <uCom>UN</uCom><qCom>1.0000</qCom><vUnCom>800.0000000000</vUnCom><vProd>800.00</vProd><indTot>1</indTot>\r
        </prod>\r
        <imposto>\r
          <ICMS><ICMS00><orig>0</orig><CST>00</CST><modBC>3</modBC><vBC>800.00</vBC><pICMS>12.00</pICMS><vICMS>96.00</vICMS></ICMS00></ICMS>\r
          <IPI><cEnq>999</cEnq><IPITrib><CST>50</CST><vBC>800.00</vBC><pIPI>5.00</pIPI><vIPI>40.00</vIPI></IPITrib></IPI>\r
          <PIS><PISAliq><CST>01</CST><vBC>800.00</vBC><pPIS>1.65</pPIS><vPIS>13.20</vPIS></PISAliq></PIS>\r
          <COFINS><COFINSAliq><CST>01</CST><vBC>800.00</vBC><pCOFINS>7.60</pCOFINS><vCOFINS>60.80</vCOFINS></COFINSAliq></COFINS>\r
          <IBSCBS>\r
            <CST>000</CST><cClassTrib>000001</cClassTrib>\r
            <gIBSCBS>\r
              <vBC>630.00</vBC>\r
              <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>0.63</vIBSUF></gIBSUF>\r
              <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>\r
              <vIBS>0.63</vIBS>\r
              <gCBS><pCBS>0.9000</pCBS><vCBS>5.67</vCBS></gCBS>\r
            </gIBSCBS>\r
          </IBSCBS>\r
        </imposto>\r
      </det>\r
      <total>\r
        <ICMSTot>\r
          <vBC>3800.00</vBC><vICMS>456.00</vICMS><vICMSDeson>0.00</vICMSDeson><vFCP>0.00</vFCP><vBCST>0.00</vBCST><vST>0.00</vST>\r
          <vFCPST>0.00</vFCPST><vFCPSTRet>0.00</vFCPSTRet><vProd>3800.00</vProd><vFrete>0.00</vFrete><vSeg>0.00</vSeg><vDesc>0.00</vDesc>\r
          <vII>0.00</vII><vIPI>190.00</vIPI><vIPIDevol>0.00</vIPIDevol><vPIS>62.70</vPIS><vCOFINS>288.80</vCOFINS><vOutro>0.00</vOutro><vNF>3990.00</vNF>\r
        </ICMSTot>\r
        <IBSCBSTot>\r
          <vBCIBSCBS>2992.50</vBCIBSCBS>\r
          <gIBS><gIBSUF><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSUF>2.99</vIBSUF></gIBSUF><gIBSMun><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSMun>0.00</vIBSMun></gIBSMun><vIBS>2.99</vIBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gIBS>\r
          <gCBS><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vCBS>26.93</vCBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gCBS>\r
        </IBSCBSTot>\r
      </total>\r
    </infNFe>\r
  </NFe>\r
  <protNFe versao="4.00">\r
    <infProt><tpAmb>1</tpAmb><verAplic>DEMO</verAplic><chNFe>42261011222333000181550010000071081123456783</chNFe><dhRecbto>2026-10-20T10:00:05-03:00</dhRecbto><nProt>342260000000001</nProt><cStat>100</cStat><xMotivo>Autorizado o uso da NF-e</xMotivo></infProt>\r
  </protNFe>\r
</nfeProc>\r
`},{id:"aud-gabarito-229",empresa:"emp-demo-1",tipo:"nfe",entrada:"captura",mostra:"ICM-02, ICM-03, CAL-10",xml:`<?xml version="1.0" encoding="UTF-8"?>\r
<!-- NOTA DE DEMONSTRAÇÃO (fictícia, do CRIVO, ajustada para a demonstração do Jarvis). Sem valor fiscal. -->\r
<nfeProc xmlns="http://www.portalfiscal.inf.br/nfe" versao="4.00">\r
  <NFe>\r
    <infNFe Id="NFe42261011222333000181550010000071091123456780" versao="4.00">\r
      <ide>\r
        <cUF>42</cUF><cNF>12345678</cNF><natOp>Venda de produção do estabelecimento</natOp><mod>55</mod><serie>1</serie>\r
        <nNF>7109</nNF><dhEmi>2026-10-20T10:00:00-03:00</dhEmi><tpNF>1</tpNF><idDest>2</idDest><cMunFG>4208906</cMunFG>\r
        <tpImp>1</tpImp><tpEmis>1</tpEmis><cDV>0</cDV><tpAmb>1</tpAmb><finNFe>1</finNFe><indFinal>1</indFinal><indPres>9</indPres>\r
      </ide>\r
      <emit>\r
        <CNPJ>11222333000181</CNPJ><xNome>INDUSTRIA DEMONSTRACAO LTDA</xNome>\r
        <enderEmit><xLgr>Rua Exemplo</xLgr><nro>100</nro><xBairro>Centro</xBairro><cMun>4208906</cMun><xMun>Jaragua do Sul</xMun><UF>SC</UF></enderEmit>\r
        <IE>255555555</IE><CRT>3</CRT>\r
      </emit>\r
      <dest>\r
        <CNPJ>31415926000171</CNPJ><xNome>LOJA MODELO COMÉRCIO ELETRÔNICO LTDA</xNome>\r
        <enderDest><xLgr>Av. Exemplo</xLgr><nro>200</nro><xBairro>Centro</xBairro><cMun>3550308</cMun><xMun>Sao Paulo</xMun><UF>SP</UF></enderDest>\r
        <indIEDest>9</indIEDest>\r
      </dest>\r
      <det nItem="1">\r
        <prod>\r
          <cProd>MOT-5CV</cProd><cEAN>SEM GTIN</cEAN><xProd>Motor eletrico trifasico 5 CV</xProd><NCM>85015210</NCM><CFOP>6101</CFOP>\r
          <uCom>UN</uCom><qCom>2.0000</qCom><vUnCom>1500.0000000000</vUnCom><vProd>3000.00</vProd><indTot>1</indTot>\r
        </prod>\r
        <imposto>\r
          <ICMS><ICMS00><orig>0</orig><CST>00</CST><modBC>3</modBC><vBC>3000.00</vBC><pICMS>12.00</pICMS><vICMS>360.00</vICMS></ICMS00></ICMS>\r
          <ICMSUFDest><vBCUFDest>3150.00</vBCUFDest><pFCPUFDest>2.00</pFCPUFDest><pICMSUFDest>18.00</pICMSUFDest><pICMSInter>7.00</pICMSInter><pICMSInterPart>100.00</pICMSInterPart><vFCPUFDest>63.00</vFCPUFDest><vICMSUFDest>346.50</vICMSUFDest><vICMSUFRemet>0.00</vICMSUFRemet></ICMSUFDest><IPI><cEnq>999</cEnq><IPITrib><CST>50</CST><vBC>3000.00</vBC><pIPI>5.00</pIPI><vIPI>150.00</vIPI></IPITrib></IPI>\r
          <PIS><PISAliq><CST>01</CST><vBC>3000.00</vBC><pPIS>1.65</pPIS><vPIS>49.50</vPIS></PISAliq></PIS>\r
          <COFINS><COFINSAliq><CST>01</CST><vBC>3000.00</vBC><pCOFINS>7.60</pCOFINS><vCOFINS>228.00</vCOFINS></COFINSAliq></COFINS>\r
          <IBSCBS>\r
            <CST>000</CST><cClassTrib>000001</cClassTrib>\r
            <gIBSCBS>\r
              <vBC>2362.50</vBC>\r
              <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>2.36</vIBSUF></gIBSUF>\r
              <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>\r
              <vIBS>2.36</vIBS>\r
              <gCBS><pCBS>0.9000</pCBS><vCBS>21.26</vCBS></gCBS>\r
            </gIBSCBS>\r
          </IBSCBS>\r
        </imposto>\r
      </det>\r
      <det nItem="2">\r
        <prod>\r
          <cProd>PNL-01</cProd><cEAN>SEM GTIN</cEAN><xProd>Painel de comando</xProd><NCM>85371090</NCM><CFOP>6101</CFOP>\r
          <uCom>UN</uCom><qCom>1.0000</qCom><vUnCom>800.0000000000</vUnCom><vProd>800.00</vProd><indTot>1</indTot>\r
        </prod>\r
        <imposto>\r
          <ICMS><ICMS00><orig>0</orig><CST>00</CST><modBC>3</modBC><vBC>800.00</vBC><pICMS>12.00</pICMS><vICMS>96.00</vICMS></ICMS00></ICMS>\r
          <IPI><cEnq>999</cEnq><IPITrib><CST>50</CST><vBC>800.00</vBC><pIPI>5.00</pIPI><vIPI>40.00</vIPI></IPITrib></IPI>\r
          <PIS><PISAliq><CST>01</CST><vBC>800.00</vBC><pPIS>1.65</pPIS><vPIS>13.20</vPIS></PISAliq></PIS>\r
          <COFINS><COFINSAliq><CST>01</CST><vBC>800.00</vBC><pCOFINS>7.60</pCOFINS><vCOFINS>60.80</vCOFINS></COFINSAliq></COFINS>\r
          <IBSCBS>\r
            <CST>000</CST><cClassTrib>000001</cClassTrib>\r
            <gIBSCBS>\r
              <vBC>630.00</vBC>\r
              <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>0.63</vIBSUF></gIBSUF>\r
              <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>\r
              <vIBS>0.63</vIBS>\r
              <gCBS><pCBS>0.9000</pCBS><vCBS>5.67</vCBS></gCBS>\r
            </gIBSCBS>\r
          </IBSCBS>\r
        </imposto>\r
      </det>\r
      <total>\r
        <ICMSTot>\r
          <vBC>3800.00</vBC><vICMS>456.00</vICMS><vICMSDeson>0.00</vICMSDeson><vFCP>0.00</vFCP><vBCST>0.00</vBCST><vST>0.00</vST>\r
          <vFCPST>0.00</vFCPST><vFCPSTRet>0.00</vFCPSTRet><vProd>3800.00</vProd><vFrete>0.00</vFrete><vSeg>0.00</vSeg><vDesc>0.00</vDesc>\r
          <vII>0.00</vII><vIPI>190.00</vIPI><vIPIDevol>0.00</vIPIDevol><vPIS>62.70</vPIS><vCOFINS>288.80</vCOFINS><vOutro>0.00</vOutro><vNF>3990.00</vNF>\r
        </ICMSTot>\r
        <IBSCBSTot>\r
          <vBCIBSCBS>2992.50</vBCIBSCBS>\r
          <gIBS><gIBSUF><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSUF>2.99</vIBSUF></gIBSUF><gIBSMun><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSMun>0.00</vIBSMun></gIBSMun><vIBS>2.99</vIBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gIBS>\r
          <gCBS><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vCBS>26.93</vCBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gCBS>\r
        </IBSCBSTot>\r
      </total>\r
    </infNFe>\r
  </NFe>\r
  <protNFe versao="4.00">\r
    <infProt><tpAmb>1</tpAmb><verAplic>DEMO</verAplic><chNFe>42261011222333000181550010000071091123456780</chNFe><dhRecbto>2026-10-20T10:00:05-03:00</dhRecbto><nProt>342260000000001</nProt><cStat>100</cStat><xMotivo>Autorizado o uso da NF-e</xMotivo></infProt>\r
  </protNFe>\r
</nfeProc>\r
`},{id:"aud-gabarito-214",empresa:"emp-demo-1",tipo:"nfe",entrada:"captura",mostra:"CLA-04, CLA-10, RTC-34",xml:`<?xml version="1.0" encoding="UTF-8"?>\r
<!-- NOTA DE DEMONSTRAÇÃO (fictícia, do CRIVO, ajustada para a demonstração do Jarvis). Sem valor fiscal. -->\r
<nfeProc xmlns="http://www.portalfiscal.inf.br/nfe" versao="4.00">\r
  <NFe>\r
    <infNFe Id="NFe42261011222333000181550010000071101123456781" versao="4.00">\r
      <ide>\r
        <cUF>42</cUF><cNF>12345678</cNF><natOp>Venda de produção do estabelecimento</natOp><mod>55</mod><serie>1</serie>\r
        <nNF>7110</nNF><dhEmi>2026-10-20T10:00:00-03:00</dhEmi><tpNF>1</tpNF><idDest>2</idDest><cMunFG>4208906</cMunFG>\r
        <tpImp>1</tpImp><tpEmis>1</tpEmis><cDV>1</cDV><tpAmb>1</tpAmb><finNFe>1</finNFe><indFinal>0</indFinal><indPres>9</indPres>\r
      </ide>\r
      <emit>\r
        <CNPJ>11222333000181</CNPJ><xNome>INDUSTRIA DEMONSTRACAO LTDA</xNome>\r
        <enderEmit><xLgr>Rua Exemplo</xLgr><nro>100</nro><xBairro>Centro</xBairro><cMun>4208906</cMun><xMun>Jaragua do Sul</xMun><UF>SC</UF></enderEmit>\r
        <IE>255555555</IE><CRT>3</CRT>\r
      </emit>\r
      <dest>\r
        <CNPJ>31415926000171</CNPJ><xNome>LOJA MODELO COMÉRCIO ELETRÔNICO LTDA</xNome>\r
        <enderDest><xLgr>Av. Exemplo</xLgr><nro>200</nro><xBairro>Centro</xBairro><cMun>3550308</cMun><xMun>Sao Paulo</xMun><UF>SP</UF></enderDest>\r
        <indIEDest>1</indIEDest><IE>110042490114</IE>\r
      </dest>\r
      <det nItem="1">\r
        <prod>\r
          <cProd>MOT-5CV</cProd><cEAN>SEM GTIN</cEAN><xProd>Motor eletrico trifasico 5 CV</xProd><NCM>85015210</NCM><CFOP>7101</CFOP>\r
          <uCom>UN</uCom><qCom>2.0000</qCom><vUnCom>1500.0000000000</vUnCom><vProd>3000.00</vProd><indTot>1</indTot>\r
        </prod>\r
        <imposto>\r
          <ICMS><ICMS00><orig>0</orig><CST>00</CST><modBC>3</modBC><vBC>3000.00</vBC><pICMS>12.00</pICMS><vICMS>360.00</vICMS></ICMS00></ICMS>\r
          <IPI><cEnq>999</cEnq><IPITrib><CST>50</CST><vBC>3000.00</vBC><pIPI>5.00</pIPI><vIPI>150.00</vIPI></IPITrib></IPI>\r
          <PIS><PISAliq><CST>01</CST><vBC>3000.00</vBC><pPIS>1.65</pPIS><vPIS>49.50</vPIS></PISAliq></PIS>\r
          <COFINS><COFINSAliq><CST>01</CST><vBC>3000.00</vBC><pCOFINS>7.60</pCOFINS><vCOFINS>228.00</vCOFINS></COFINSAliq></COFINS>\r
          <IBSCBS>\r
            <CST>000</CST><cClassTrib>000001</cClassTrib>\r
            <gIBSCBS>\r
              <vBC>2362.50</vBC>\r
              <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>2.36</vIBSUF></gIBSUF>\r
              <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>\r
              <vIBS>2.36</vIBS>\r
              <gCBS><pCBS>0.9000</pCBS><vCBS>21.26</vCBS></gCBS>\r
            </gIBSCBS>\r
          </IBSCBS>\r
        </imposto>\r
      </det>\r
      <det nItem="2">\r
        <prod>\r
          <cProd>PNL-01</cProd><cEAN>SEM GTIN</cEAN><xProd>Painel de comando</xProd><NCM>85371090</NCM><CFOP>6101</CFOP>\r
          <uCom>UN</uCom><qCom>1.0000</qCom><vUnCom>800.0000000000</vUnCom><vProd>800.00</vProd><indTot>1</indTot>\r
        </prod>\r
        <imposto>\r
          <ICMS><ICMS00><orig>0</orig><CST>00</CST><modBC>3</modBC><vBC>800.00</vBC><pICMS>12.00</pICMS><vICMS>96.00</vICMS></ICMS00></ICMS>\r
          <IPI><cEnq>999</cEnq><IPITrib><CST>50</CST><vBC>800.00</vBC><pIPI>5.00</pIPI><vIPI>40.00</vIPI></IPITrib></IPI>\r
          <PIS><PISAliq><CST>01</CST><vBC>800.00</vBC><pPIS>1.65</pPIS><vPIS>13.20</vPIS></PISAliq></PIS>\r
          <COFINS><COFINSAliq><CST>01</CST><vBC>800.00</vBC><pCOFINS>7.60</pCOFINS><vCOFINS>60.80</vCOFINS></COFINSAliq></COFINS>\r
          <IBSCBS>\r
            <CST>000</CST><cClassTrib>000001</cClassTrib>\r
            <gIBSCBS>\r
              <vBC>630.00</vBC>\r
              <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>0.63</vIBSUF></gIBSUF>\r
              <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>\r
              <vIBS>0.63</vIBS>\r
              <gCBS><pCBS>0.9000</pCBS><vCBS>5.67</vCBS></gCBS>\r
            </gIBSCBS>\r
          </IBSCBS>\r
        </imposto>\r
      </det>\r
      <total>\r
        <ICMSTot>\r
          <vBC>3800.00</vBC><vICMS>456.00</vICMS><vICMSDeson>0.00</vICMSDeson><vFCP>0.00</vFCP><vBCST>0.00</vBCST><vST>0.00</vST>\r
          <vFCPST>0.00</vFCPST><vFCPSTRet>0.00</vFCPSTRet><vProd>3800.00</vProd><vFrete>0.00</vFrete><vSeg>0.00</vSeg><vDesc>0.00</vDesc>\r
          <vII>0.00</vII><vIPI>190.00</vIPI><vIPIDevol>0.00</vIPIDevol><vPIS>62.70</vPIS><vCOFINS>288.80</vCOFINS><vOutro>0.00</vOutro><vNF>3990.00</vNF>\r
        </ICMSTot>\r
        <IBSCBSTot>\r
          <vBCIBSCBS>2992.50</vBCIBSCBS>\r
          <gIBS><gIBSUF><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSUF>2.99</vIBSUF></gIBSUF><gIBSMun><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSMun>0.00</vIBSMun></gIBSMun><vIBS>2.99</vIBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gIBS>\r
          <gCBS><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vCBS>26.93</vCBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gCBS>\r
        </IBSCBSTot>\r
      </total>\r
    </infNFe>\r
  </NFe>\r
  <protNFe versao="4.00">\r
    <infProt><tpAmb>1</tpAmb><verAplic>DEMO</verAplic><chNFe>42261011222333000181550010000071101123456781</chNFe><dhRecbto>2026-10-20T10:00:05-03:00</dhRecbto><nProt>342260000000001</nProt><cStat>100</cStat><xMotivo>Autorizado o uso da NF-e</xMotivo></infProt>\r
  </protNFe>\r
</nfeProc>\r
`},{id:"aud-gabarito-211",empresa:"emp-demo-8",tipo:"nfe",entrada:"captura",mostra:"ICM-04",xml:`<?xml version="1.0" encoding="UTF-8"?>\r
<!-- NOTA DE DEMONSTRAÇÃO (fictícia, do CRIVO, ajustada para a demonstração do Jarvis). Sem valor fiscal. -->\r
<nfeProc xmlns="http://www.portalfiscal.inf.br/nfe" versao="4.00">\r
  <NFe>\r
    <infNFe Id="NFe42261011222333000181550010000071111123456789" versao="4.00">\r
      <ide>\r
        <cUF>42</cUF><cNF>12345678</cNF><natOp>Venda de produção do estabelecimento</natOp><mod>55</mod><serie>1</serie>\r
        <nNF>7111</nNF><dhEmi>2026-10-20T10:00:00-03:00</dhEmi><tpNF>1</tpNF><idDest>2</idDest><cMunFG>4208906</cMunFG>\r
        <tpImp>1</tpImp><tpEmis>1</tpEmis><cDV>9</cDV><tpAmb>1</tpAmb><finNFe>1</finNFe><indFinal>0</indFinal><indPres>9</indPres>\r
      </ide>\r
      <emit>\r
        <CNPJ>11222333000181</CNPJ><xNome>INDUSTRIA DEMONSTRACAO LTDA</xNome>\r
        <enderEmit><xLgr>Rua Exemplo</xLgr><nro>100</nro><xBairro>Centro</xBairro><cMun>4208906</cMun><xMun>Jaragua do Sul</xMun><UF>SC</UF></enderEmit>\r
        <IE>255555555</IE><CRT>3</CRT>\r
      </emit>\r
      <dest>\r
        <CNPJ>40057895000115</CNPJ><xNome>CONSTRUTORA HORIZONTE LTDA</xNome>\r
        <enderDest><xLgr>Av. Exemplo</xLgr><nro>200</nro><xBairro>Centro</xBairro><cMun>3550308</cMun><xMun>Sao Paulo</xMun><UF>SP</UF></enderDest>\r
        <indIEDest>1</indIEDest><IE>110042490114</IE>\r
      </dest>\r
      <det nItem="1">\r
        <prod>\r
          <cProd>MOT-5CV</cProd><cEAN>SEM GTIN</cEAN><xProd>Motor eletrico trifasico 5 CV</xProd><NCM>85015210</NCM><CFOP>6101</CFOP>\r
          <uCom>UN</uCom><qCom>2.0000</qCom><vUnCom>1500.0000000000</vUnCom><vProd>3000.00</vProd><indTot>1</indTot>\r
        </prod>\r
        <imposto>\r
          <ICMS><ICMS00><orig>0</orig><CST>40</CST><modBC>3</modBC><vBC>3000.00</vBC><pICMS>12.00</pICMS><vICMS>360.00</vICMS></ICMS00></ICMS>\r
          <IPI><cEnq>999</cEnq><IPITrib><CST>50</CST><vBC>3000.00</vBC><pIPI>5.00</pIPI><vIPI>150.00</vIPI></IPITrib></IPI>\r
          <PIS><PISAliq><CST>01</CST><vBC>3000.00</vBC><pPIS>1.65</pPIS><vPIS>49.50</vPIS></PISAliq></PIS>\r
          <COFINS><COFINSAliq><CST>01</CST><vBC>3000.00</vBC><pCOFINS>7.60</pCOFINS><vCOFINS>228.00</vCOFINS></COFINSAliq></COFINS>\r
          <IBSCBS>\r
            <CST>000</CST><cClassTrib>000001</cClassTrib>\r
            <gIBSCBS>\r
              <vBC>2362.50</vBC>\r
              <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>2.36</vIBSUF></gIBSUF>\r
              <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>\r
              <vIBS>2.36</vIBS>\r
              <gCBS><pCBS>0.9000</pCBS><vCBS>21.26</vCBS></gCBS>\r
            </gIBSCBS>\r
          </IBSCBS>\r
        </imposto>\r
      </det>\r
      <det nItem="2">\r
        <prod>\r
          <cProd>PNL-01</cProd><cEAN>SEM GTIN</cEAN><xProd>Painel de comando</xProd><NCM>85371090</NCM><CFOP>6101</CFOP>\r
          <uCom>UN</uCom><qCom>1.0000</qCom><vUnCom>800.0000000000</vUnCom><vProd>800.00</vProd><indTot>1</indTot>\r
        </prod>\r
        <imposto>\r
          <ICMS><ICMS00><orig>0</orig><CST>00</CST><modBC>3</modBC><vBC>800.00</vBC><pICMS>12.00</pICMS><vICMS>96.00</vICMS></ICMS00></ICMS>\r
          <IPI><cEnq>999</cEnq><IPITrib><CST>50</CST><vBC>800.00</vBC><pIPI>5.00</pIPI><vIPI>40.00</vIPI></IPITrib></IPI>\r
          <PIS><PISAliq><CST>01</CST><vBC>800.00</vBC><pPIS>1.65</pPIS><vPIS>13.20</vPIS></PISAliq></PIS>\r
          <COFINS><COFINSAliq><CST>01</CST><vBC>800.00</vBC><pCOFINS>7.60</pCOFINS><vCOFINS>60.80</vCOFINS></COFINSAliq></COFINS>\r
          <IBSCBS>\r
            <CST>000</CST><cClassTrib>000001</cClassTrib>\r
            <gIBSCBS>\r
              <vBC>630.00</vBC>\r
              <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>0.63</vIBSUF></gIBSUF>\r
              <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>\r
              <vIBS>0.63</vIBS>\r
              <gCBS><pCBS>0.9000</pCBS><vCBS>5.67</vCBS></gCBS>\r
            </gIBSCBS>\r
          </IBSCBS>\r
        </imposto>\r
      </det>\r
      <total>\r
        <ICMSTot>\r
          <vBC>3800.00</vBC><vICMS>456.00</vICMS><vICMSDeson>0.00</vICMSDeson><vFCP>0.00</vFCP><vBCST>0.00</vBCST><vST>0.00</vST>\r
          <vFCPST>0.00</vFCPST><vFCPSTRet>0.00</vFCPSTRet><vProd>3800.00</vProd><vFrete>0.00</vFrete><vSeg>0.00</vSeg><vDesc>0.00</vDesc>\r
          <vII>0.00</vII><vIPI>190.00</vIPI><vIPIDevol>0.00</vIPIDevol><vPIS>62.70</vPIS><vCOFINS>288.80</vCOFINS><vOutro>0.00</vOutro><vNF>3990.00</vNF>\r
        </ICMSTot>\r
        <IBSCBSTot>\r
          <vBCIBSCBS>2992.50</vBCIBSCBS>\r
          <gIBS><gIBSUF><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSUF>2.99</vIBSUF></gIBSUF><gIBSMun><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSMun>0.00</vIBSMun></gIBSMun><vIBS>2.99</vIBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gIBS>\r
          <gCBS><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vCBS>26.93</vCBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gCBS>\r
        </IBSCBSTot>\r
      </total>\r
    </infNFe>\r
  </NFe>\r
  <protNFe versao="4.00">\r
    <infProt><tpAmb>1</tpAmb><verAplic>DEMO</verAplic><chNFe>42261011222333000181550010000071111123456789</chNFe><dhRecbto>2026-10-20T10:00:05-03:00</dhRecbto><nProt>342260000000001</nProt><cStat>100</cStat><xMotivo>Autorizado o uso da NF-e</xMotivo></infProt>\r
  </protNFe>\r
</nfeProc>\r
`},{id:"aud-gabarito-237",empresa:"emp-demo-8",tipo:"nfe",entrada:"captura",mostra:"CAL-07, PIS-02, RTC-06",xml:`<?xml version="1.0" encoding="UTF-8"?>\r
<!-- NOTA DE DEMONSTRAÇÃO (fictícia, do CRIVO, ajustada para a demonstração do Jarvis). Sem valor fiscal. -->\r
<nfeProc xmlns="http://www.portalfiscal.inf.br/nfe" versao="4.00">\r
  <NFe>\r
    <infNFe Id="NFe42261011222333000181550010000071121123456786" versao="4.00">\r
      <ide>\r
        <cUF>42</cUF><cNF>12345678</cNF><natOp>Venda de produção do estabelecimento</natOp><mod>55</mod><serie>1</serie>\r
        <nNF>7112</nNF><dhEmi>2026-10-20T10:00:00-03:00</dhEmi><tpNF>1</tpNF><idDest>2</idDest><cMunFG>4208906</cMunFG>\r
        <tpImp>1</tpImp><tpEmis>1</tpEmis><cDV>6</cDV><tpAmb>1</tpAmb><finNFe>1</finNFe><indFinal>0</indFinal><indPres>9</indPres>\r
      </ide>\r
      <emit>\r
        <CNPJ>11222333000181</CNPJ><xNome>INDUSTRIA DEMONSTRACAO LTDA</xNome>\r
        <enderEmit><xLgr>Rua Exemplo</xLgr><nro>100</nro><xBairro>Centro</xBairro><cMun>4208906</cMun><xMun>Jaragua do Sul</xMun><UF>SC</UF></enderEmit>\r
        <IE>255555555</IE><CRT>3</CRT>\r
      </emit>\r
      <dest>\r
        <CNPJ>40057895000115</CNPJ><xNome>CONSTRUTORA HORIZONTE LTDA</xNome>\r
        <enderDest><xLgr>Av. Exemplo</xLgr><nro>200</nro><xBairro>Centro</xBairro><cMun>3550308</cMun><xMun>Sao Paulo</xMun><UF>SP</UF></enderDest>\r
        <indIEDest>1</indIEDest><IE>110042490114</IE>\r
      </dest>\r
      <det nItem="1">\r
        <prod>\r
          <cProd>MOT-5CV</cProd><cEAN>SEM GTIN</cEAN><xProd>Motor eletrico trifasico 5 CV</xProd><NCM>85015210</NCM><CFOP>6101</CFOP>\r
          <uCom>UN</uCom><qCom>2.0000</qCom><vUnCom>1500.0000000000</vUnCom><vProd>3000.00</vProd><indTot>1</indTot>\r
        </prod>\r
        <imposto>\r
          <ICMS><ICMS00><orig>0</orig><CST>00</CST><modBC>3</modBC><vBC>3000.00</vBC><pICMS>12.00</pICMS><vICMS>360.00</vICMS></ICMS00></ICMS>\r
          <IPI><cEnq>999</cEnq><IPITrib><CST>50</CST><vBC>3000.00</vBC><pIPI>5.00</pIPI><vIPI>150.00</vIPI></IPITrib></IPI>\r
          <PIS><PISAliq><CST>01</CST><vBC>3000.00</vBC><pPIS>1.65</pPIS><vPIS>49.50</vPIS></PISAliq></PIS>\r
          <COFINS><COFINSAliq><CST>01</CST><vBC>3000.00</vBC><pCOFINS>3.00</pCOFINS><vCOFINS>90.00</vCOFINS></COFINSAliq></COFINS>\r
          <IBSCBS>\r
            <CST>000</CST><cClassTrib>000001</cClassTrib>\r
            <gIBSCBS>\r
              <vBC>2362.50</vBC>\r
              <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>2.36</vIBSUF></gIBSUF>\r
              <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>\r
              <vIBS>2.36</vIBS>\r
              <gCBS><pCBS>0.9000</pCBS><vCBS>21.26</vCBS></gCBS>\r
            </gIBSCBS>\r
          </IBSCBS>\r
        </imposto>\r
      </det>\r
      <det nItem="2">\r
        <prod>\r
          <cProd>PNL-01</cProd><cEAN>SEM GTIN</cEAN><xProd>Painel de comando</xProd><NCM>85371090</NCM><CFOP>6101</CFOP>\r
          <uCom>UN</uCom><qCom>1.0000</qCom><vUnCom>800.0000000000</vUnCom><vProd>800.00</vProd><indTot>1</indTot>\r
        </prod>\r
        <imposto>\r
          <ICMS><ICMS00><orig>0</orig><CST>00</CST><modBC>3</modBC><vBC>800.00</vBC><pICMS>12.00</pICMS><vICMS>96.00</vICMS></ICMS00></ICMS>\r
          <IPI><cEnq>999</cEnq><IPITrib><CST>50</CST><vBC>800.00</vBC><pIPI>5.00</pIPI><vIPI>40.00</vIPI></IPITrib></IPI>\r
          <PIS><PISAliq><CST>01</CST><vBC>800.00</vBC><pPIS>1.65</pPIS><vPIS>13.20</vPIS></PISAliq></PIS>\r
          <COFINS><COFINSAliq><CST>01</CST><vBC>800.00</vBC><pCOFINS>7.60</pCOFINS><vCOFINS>60.80</vCOFINS></COFINSAliq></COFINS>\r
          <IBSCBS>\r
            <CST>000</CST><cClassTrib>000001</cClassTrib>\r
            <gIBSCBS>\r
              <vBC>630.00</vBC>\r
              <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>0.63</vIBSUF></gIBSUF>\r
              <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>\r
              <vIBS>0.63</vIBS>\r
              <gCBS><pCBS>0.9000</pCBS><vCBS>5.67</vCBS></gCBS>\r
            </gIBSCBS>\r
          </IBSCBS>\r
        </imposto>\r
      </det>\r
      <total>\r
        <ICMSTot>\r
          <vBC>3800.00</vBC><vICMS>456.00</vICMS><vICMSDeson>0.00</vICMSDeson><vFCP>0.00</vFCP><vBCST>0.00</vBCST><vST>0.00</vST>\r
          <vFCPST>0.00</vFCPST><vFCPSTRet>0.00</vFCPSTRet><vProd>3800.00</vProd><vFrete>0.00</vFrete><vSeg>0.00</vSeg><vDesc>0.00</vDesc>\r
          <vII>0.00</vII><vIPI>190.00</vIPI><vIPIDevol>0.00</vIPIDevol><vPIS>62.70</vPIS><vCOFINS>288.80</vCOFINS><vOutro>0.00</vOutro><vNF>3990.00</vNF>\r
        </ICMSTot>\r
        <IBSCBSTot>\r
          <vBCIBSCBS>2992.50</vBCIBSCBS>\r
          <gIBS><gIBSUF><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSUF>2.99</vIBSUF></gIBSUF><gIBSMun><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSMun>0.00</vIBSMun></gIBSMun><vIBS>2.99</vIBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gIBS>\r
          <gCBS><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vCBS>26.93</vCBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gCBS>\r
        </IBSCBSTot>\r
      </total>\r
    </infNFe>\r
  </NFe>\r
  <protNFe versao="4.00">\r
    <infProt><tpAmb>1</tpAmb><verAplic>DEMO</verAplic><chNFe>42261011222333000181550010000071121123456786</chNFe><dhRecbto>2026-10-20T10:00:05-03:00</dhRecbto><nProt>342260000000001</nProt><cStat>100</cStat><xMotivo>Autorizado o uso da NF-e</xMotivo></infProt>\r
  </protNFe>\r
</nfeProc>\r
`},{id:"aud-gabarito-122",empresa:"emp-demo-8",tipo:"nfe",entrada:"captura",mostra:"CAL-07, ICM-06, RTC-06",xml:`<?xml version="1.0" encoding="UTF-8"?>\r
<!-- NOTA DE DEMONSTRAÇÃO (fictícia, do CRIVO, ajustada para a demonstração do Jarvis). Sem valor fiscal. -->\r
<nfeProc xmlns="http://www.portalfiscal.inf.br/nfe" versao="4.00">\r
  <NFe>\r
    <infNFe Id="NFe42261011222333000181550010000071131123456783" versao="4.00">\r
      <ide>\r
        <cUF>42</cUF><cNF>12345678</cNF><natOp>Venda de produção do estabelecimento</natOp><mod>55</mod><serie>1</serie>\r
        <nNF>7113</nNF><dhEmi>2026-10-20T10:00:00-03:00</dhEmi><tpNF>1</tpNF><idDest>2</idDest><cMunFG>4208906</cMunFG>\r
        <tpImp>1</tpImp><tpEmis>1</tpEmis><cDV>3</cDV><tpAmb>1</tpAmb><finNFe>1</finNFe><indFinal>0</indFinal><indPres>9</indPres>\r
      </ide>\r
      <emit>\r
        <CNPJ>11222333000181</CNPJ><xNome>INDUSTRIA DEMONSTRACAO LTDA</xNome>\r
        <enderEmit><xLgr>Rua Exemplo</xLgr><nro>100</nro><xBairro>Centro</xBairro><cMun>4208906</cMun><xMun>Jaragua do Sul</xMun><UF>SC</UF></enderEmit>\r
        <IE>255555555</IE><CRT>3</CRT>\r
      </emit>\r
      <dest>\r
        <CNPJ>40057895000115</CNPJ><xNome>CONSTRUTORA HORIZONTE LTDA</xNome>\r
        <enderDest><xLgr>Av. Exemplo</xLgr><nro>200</nro><xBairro>Centro</xBairro><cMun>3550308</cMun><xMun>Sao Paulo</xMun><UF>SP</UF></enderDest>\r
        <indIEDest>1</indIEDest><IE>110042490114</IE>\r
      </dest>\r
      <det nItem="1">\r
        <prod>\r
          <cProd>MOT-5CV</cProd><cEAN>SEM GTIN</cEAN><xProd>Motor eletrico trifasico 5 CV</xProd><NCM>85015210</NCM><CFOP>6101</CFOP>\r
          <uCom>UN</uCom><qCom>2.0000</qCom><vUnCom>1500.0000000000</vUnCom><vProd>3000.00</vProd><indTot>1</indTot>\r
        <comb><cProdANP>210203001</cProdANP><descANP>GLP</descANP><UFCons>SC</UFCons></comb></prod>\r
        <imposto>\r
          <ICMS><ICMS02><orig>0</orig><CST>02</CST><qBCMono>10</qBCMono><adRemICMS>1.3900</adRemICMS><vICMSMono>14.70</vICMSMono></ICMS02></ICMS>\r
          <IPI><cEnq>999</cEnq><IPITrib><CST>50</CST><vBC>3000.00</vBC><pIPI>5.00</pIPI><vIPI>150.00</vIPI></IPITrib></IPI>\r
          <PIS><PISAliq><CST>01</CST><vBC>3000.00</vBC><pPIS>1.65</pPIS><vPIS>49.50</vPIS></PISAliq></PIS>\r
          <COFINS><COFINSAliq><CST>01</CST><vBC>3000.00</vBC><pCOFINS>7.60</pCOFINS><vCOFINS>228.00</vCOFINS></COFINSAliq></COFINS>\r
          <IBSCBS>\r
            <CST>000</CST><cClassTrib>000001</cClassTrib>\r
            <gIBSCBS>\r
              <vBC>2362.50</vBC>\r
              <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>2.36</vIBSUF></gIBSUF>\r
              <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>\r
              <vIBS>2.36</vIBS>\r
              <gCBS><pCBS>0.9000</pCBS><vCBS>21.26</vCBS></gCBS>\r
            </gIBSCBS>\r
          </IBSCBS>\r
        </imposto>\r
      </det>\r
      <det nItem="2">\r
        <prod>\r
          <cProd>PNL-01</cProd><cEAN>SEM GTIN</cEAN><xProd>Painel de comando</xProd><NCM>85371090</NCM><CFOP>6101</CFOP>\r
          <uCom>UN</uCom><qCom>1.0000</qCom><vUnCom>800.0000000000</vUnCom><vProd>800.00</vProd><indTot>1</indTot>\r
        </prod>\r
        <imposto>\r
          <ICMS><ICMS00><orig>0</orig><CST>00</CST><modBC>3</modBC><vBC>800.00</vBC><pICMS>12.00</pICMS><vICMS>96.00</vICMS></ICMS00></ICMS>\r
          <IPI><cEnq>999</cEnq><IPITrib><CST>50</CST><vBC>800.00</vBC><pIPI>5.00</pIPI><vIPI>40.00</vIPI></IPITrib></IPI>\r
          <PIS><PISAliq><CST>01</CST><vBC>800.00</vBC><pPIS>1.65</pPIS><vPIS>13.20</vPIS></PISAliq></PIS>\r
          <COFINS><COFINSAliq><CST>01</CST><vBC>800.00</vBC><pCOFINS>7.60</pCOFINS><vCOFINS>60.80</vCOFINS></COFINSAliq></COFINS>\r
          <IBSCBS>\r
            <CST>000</CST><cClassTrib>000001</cClassTrib>\r
            <gIBSCBS>\r
              <vBC>630.00</vBC>\r
              <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>0.63</vIBSUF></gIBSUF>\r
              <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>\r
              <vIBS>0.63</vIBS>\r
              <gCBS><pCBS>0.9000</pCBS><vCBS>5.67</vCBS></gCBS>\r
            </gIBSCBS>\r
          </IBSCBS>\r
        </imposto>\r
      </det>\r
      <total>\r
        <ICMSTot>\r
          <vBC>3800.00</vBC><vICMS>456.00</vICMS><vICMSDeson>0.00</vICMSDeson><vFCP>0.00</vFCP><vBCST>0.00</vBCST><vST>0.00</vST>\r
          <vFCPST>0.00</vFCPST><vFCPSTRet>0.00</vFCPSTRet><vProd>3800.00</vProd><vFrete>0.00</vFrete><vSeg>0.00</vSeg><vDesc>0.00</vDesc>\r
          <vII>0.00</vII><vIPI>190.00</vIPI><vIPIDevol>0.00</vIPIDevol><vPIS>62.70</vPIS><vCOFINS>288.80</vCOFINS><vOutro>0.00</vOutro><vNF>3990.00</vNF>\r
        </ICMSTot>\r
        <IBSCBSTot>\r
          <vBCIBSCBS>2992.50</vBCIBSCBS>\r
          <gIBS><gIBSUF><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSUF>2.99</vIBSUF></gIBSUF><gIBSMun><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSMun>0.00</vIBSMun></gIBSMun><vIBS>2.99</vIBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gIBS>\r
          <gCBS><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vCBS>26.93</vCBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gCBS>\r
        </IBSCBSTot>\r
      </total>\r
    </infNFe>\r
  </NFe>\r
  <protNFe versao="4.00">\r
    <infProt><tpAmb>1</tpAmb><verAplic>DEMO</verAplic><chNFe>42261011222333000181550010000071131123456783</chNFe><dhRecbto>2026-10-20T10:00:05-03:00</dhRecbto><nProt>342260000000001</nProt><cStat>100</cStat><xMotivo>Autorizado o uso da NF-e</xMotivo></infProt>\r
  </protNFe>\r
</nfeProc>\r
`},{id:"aud-gabarito-7",empresa:"emp-demo-8",tipo:"nfse",entrada:"importacao",mostra:"NFS-e: NFS-21, NFS-15, NFS-27",xml:`<?xml version="1.0" encoding="UTF-8"?>\r
\r
<NFSe xmlns="http://www.sped.fazenda.gov.br/nfse" versao="1.01">\r
  <infNFSe Id="NFS42054072211222333000181000000000000126101234567890">\r
    <xLocEmi>Florianopolis</xLocEmi>\r
    <xLocPrestacao>Florianopolis</xLocPrestacao>\r
    <nNFSe>1</nNFSe>\r
    <cLocIncid>4205407</cLocIncid>\r
    <xLocIncid>Florianopolis</xLocIncid>\r
    <xTribNac>Analise e desenvolvimento de sistemas.</xTribNac>\r
    <xNBS>Servicos de projeto e desenvolvimento de aplicativos personalizados</xNBS>\r
    <verAplic>EXEMPLO1</verAplic>\r
    <ambGer>2</ambGer>\r
    <tpEmis>1</tpEmis>\r
    <procEmi>1</procEmi>\r
    <cStat>100</cStat>\r
    <dhProc>2026-10-15T10:00:05-03:00</dhProc>\r
    <nDFSe>1</nDFSe>\r
    <emit>\r
      <CNPJ>11222333000181</CNPJ>\r
      <xNome>PRESTADORA EXEMPLO LTDA</xNome>\r
      <enderNac>\r
        <xLgr>RUA FICTICIA</xLgr><nro>100</nro><xBairro>CENTRO</xBairro>\r
        <cMun>4205407</cMun><UF>SC</UF><CEP>88010000</CEP>\r
      </enderNac>\r
    </emit>\r
    <valores>\r
      <vBC>1000.00</vBC>\r
      <pAliqAplic>2.00</pAliqAplic>\r
      <vISSQN>0.00</vISSQN>\r
      <vTotalRet>15.00</vTotalRet>\r
      <vLiq>985.00</vLiq>\r
    </valores>\r
    <IBSCBS>\r
      <cLocalidadeIncid>4106902</cLocalidadeIncid>\r
      <xLocalidadeIncid>Curitiba</xLocalidadeIncid>\r
      <valores>\r
        <vBC>943.50</vBC>\r
        <uf><pIBSUF>0.10</pIBSUF><pAliqEfetUF>0.10</pAliqEfetUF></uf>\r
        <mun><pIBSMun>0.00</pIBSMun><pAliqEfetMun>0.00</pAliqEfetMun></mun>\r
        <fed><pCBS>0.90</pCBS><pAliqEfetCBS>0.90</pAliqEfetCBS></fed>\r
      </valores>\r
      <totCIBS>\r
        <vTotNF>985.00</vTotNF>\r
        <gIBS>\r
          <vIBSTot>0.94</vIBSTot>\r
          <gIBSUFTot><vIBSUF>0.94</vIBSUF></gIBSUFTot>\r
          <gIBSMunTot><vIBSMun>0.00</vIBSMun></gIBSMunTot>\r
        </gIBS>\r
        <gCBS><vCBS>8.49</vCBS></gCBS>\r
      </totCIBS>\r
    </IBSCBS>\r
    <DPS versao="1.01">\r
      <infDPS Id="DPS420540721122233300018100001000000000000001">\r
        <tpAmb>2</tpAmb>\r
        <dhEmi>2026-10-15T10:00:00-03:00</dhEmi>\r
        <verAplic>EXEMPLO1</verAplic>\r
        <serie>1</serie>\r
        <nDPS>1</nDPS>\r
        <dCompet>2026-10-15</dCompet>\r
        <tpEmit>1</tpEmit>\r
        <cLocEmi>4205407</cLocEmi>\r
        <prest>\r
          <CNPJ>11222333000181</CNPJ>\r
          <regTrib><opSimpNac>1</opSimpNac><regEspTrib>0</regEspTrib></regTrib>\r
        </prest>\r
        <toma>\r
          <CNPJ>40057895000115</CNPJ>\r
          <xNome>CONSTRUTORA HORIZONTE LTDA</xNome>\r
          <end>\r
            <endNac><cMun>4106902</cMun><CEP>80010000</CEP></endNac>\r
            <xLgr>AV FICTICIA</xLgr><nro>200</nro><xBairro>CENTRO</xBairro>\r
          </end>\r
        </toma>\r
        <serv>\r
          <locPrest><cLocPrestacao>4205407</cLocPrestacao></locPrest>\r
          <cServ>\r
            <cTribNac>010101</cTribNac>\r
            <xDescServ>Desenvolvimento de sistema sob encomenda (descricao ficticia)</xDescServ>\r
            <cNBS>115022000</cNBS>\r
          </cServ>\r
        </serv>\r
        <valores>\r
          <vServPrest><vServ>1000.00</vServ></vServPrest>\r
          <trib>\r
            <tribMun><tribISSQN>1</tribISSQN><tpRetISSQN>1</tpRetISSQN></tribMun>\r
            <tribFed>\r
              <piscofins>\r
                <CST>01</CST>\r
                <vBCPisCofins>1000.00</vBCPisCofins>\r
                <pAliqPis>0.65</pAliqPis>\r
                <pAliqCofins>3.00</pAliqCofins>\r
                <vPis>6.50</vPis>\r
                <vCofins>30.00</vCofins>\r
                <tpRetPisCofins>0</tpRetPisCofins>\r
              </piscofins>\r
              <vRetIRRF>15.00</vRetIRRF>\r
            </tribFed>\r
            <totTrib><indTotTrib>0</indTotTrib></totTrib>\r
          </trib>\r
        </valores>\r
        <IBSCBS>\r
          <finNFSe>0</finNFSe>\r
          <cIndOp>100301</cIndOp>\r
          <indDest>0</indDest>\r
          <valores>\r
            <trib>\r
              <gIBSCBS><CST>000</CST><cClassTrib>000001</cClassTrib></gIBSCBS>\r
            </trib>\r
          </valores>\r
        </IBSCBS>\r
      </infDPS>\r
    </DPS>\r
  </infNFSe>\r
  <Signature xmlns="http://www.w3.org/2000/09/xmldsig#"><SignedInfo><CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/><SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/><Reference URI="#NFS42054072211222333000181000000000000126101234567890"><Transforms><Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/><Transform Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/></Transforms><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/><DigestValue>AAAAAAAAAAAAAAAAAAAAAAAAAAA=</DigestValue></Reference></SignedInfo><SignatureValue>AAAA</SignatureValue><KeyInfo><X509Data><X509Certificate>AAAA</X509Certificate></X509Data></KeyInfo></Signature>\r
</NFSe>\r
`},{id:"aud-gabarito-60",empresa:"emp-demo-8",tipo:"cte",entrada:"captura",mostra:"CT-e: CTE-13",xml:`<?xml version="1.0" encoding="UTF-8"?>\r
\r
<cteProc xmlns="http://www.portalfiscal.inf.br/cte" versao="4.00">\r
  <CTe>\r
    <infCte versao="4.00" Id="CTe42261011222333000181570010000071141123456788">\r
      <ide>\r
        <cUF>42</cUF>\r
        <cCT>12345678</cCT>\r
        <CFOP>6353</CFOP>\r
        <natOp>PRESTACAO DE SERVICO DE TRANSPORTE</natOp>\r
        <mod>57</mod>\r
        <serie>1</serie>\r
        <nCT>7114</nCT>\r
        <dhEmi>2026-10-15T10:00:00-03:00</dhEmi>\r
        <tpImp>1</tpImp>\r
        <tpEmis>1</tpEmis>\r
        <cDV>8</cDV>\r
        <tpAmb>2</tpAmb>\r
        <tpCTe>0</tpCTe>\r
        <procEmi>0</procEmi>\r
        <verProc>EXEMPLO1</verProc>\r
        <cMunEnv>4205407</cMunEnv>\r
        <xMunEnv>FLORIANOPOLIS</xMunEnv>\r
        <UFEnv>SC</UFEnv>\r
        <modal>01</modal>\r
        <tpServ>0</tpServ>\r
        <cMunIni>4205407</cMunIni>\r
        <xMunIni>FLORIANOPOLIS</xMunIni>\r
        <UFIni>SC</UFIni>\r
        <cMunFim>4106902</cMunFim>\r
        <xMunFim>CURITIBA</xMunFim>\r
        <UFFim>PR</UFFim>\r
        <retira>1</retira>\r
        <indIEToma>1</indIEToma>\r
        <toma3><toma>0</toma></toma3>\r
      </ide>\r
      <emit>\r
        <CNPJ>11222333000181</CNPJ>\r
        <IE>123456789</IE>\r
        <xNome>TRANSPORTADORA EXEMPLO LTDA</xNome>\r
        <enderEmit>\r
          <xLgr>RUA FICTICIA</xLgr><nro>100</nro><xBairro>CENTRO</xBairro>\r
          <cMun>4205407</cMun><xMun>FLORIANOPOLIS</xMun><CEP>88010000</CEP><UF>SC</UF>\r
        </enderEmit>\r
        <CRT>3</CRT>\r
      </emit>\r
      <rem>\r
        <CNPJ>40057895000115</CNPJ>\r
        <IE>987654321</IE>\r
        <xNome>CONSTRUTORA HORIZONTE LTDA</xNome>\r
        <enderReme>\r
          <xLgr>AV FICTICIA</xLgr><nro>200</nro><xBairro>CENTRO</xBairro>\r
          <cMun>4205407</cMun><xMun>FLORIANOPOLIS</xMun><CEP>88015000</CEP><UF>SC</UF>\r
        </enderReme>\r
      </rem>\r
      <dest>\r
        <CPF>11144477735</CPF>\r
        <xNome>CTE EMITIDO EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL</xNome>\r
        <enderDest>\r
          <xLgr>RUA EXEMPLO</xLgr><nro>300</nro><xBairro>CENTRO</xBairro>\r
          <cMun>4106902</cMun><xMun>CURITIBA</xMun><CEP>80010000</CEP><UF>PR</UF>\r
        </enderDest>\r
      </dest>\r
      <vPrest>\r
        <vTPrest>1000.00</vTPrest>\r
        <vRec>1000.00</vRec>\r
        <Comp><xNome>FRETE PESO</xNome><vComp>900.00</vComp></Comp>\r
        <Comp><xNome>PEDAGIO</xNome><vComp>100.00</vComp></Comp>\r
      </vPrest>\r
      <imp>\r
        <ICMS>\r
          <ICMS60><CST>60</CST><vBCSTRet>1000.00</vBCSTRet><vICMSSTRet>120.00</vICMSSTRet><pICMSSTRet>12.00</pICMSSTRet><vCred>24.00</vCred></ICMS60>\r
        </ICMS>\r
        <IBSCBS>\r
          <CST>000</CST>\r
          <cClassTrib>000001</cClassTrib>\r
          <gIBSCBS>\r
            <vBC>880.00</vBC>\r
            <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>0.88</vIBSUF></gIBSUF>\r
            <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>\r
            <vIBS>0.88</vIBS>\r
            <gCBS><pCBS>0.9000</pCBS><vCBS>7.92</vCBS></gCBS>\r
          </gIBSCBS>\r
        </IBSCBS>\r
        <vTotDFe>1000.00</vTotDFe>\r
      </imp>\r
      <infCTeNorm>\r
        <infCarga>\r
          <vCarga>50000.00</vCarga>\r
          <proPred>PECAS</proPred>\r
          <infQ><cUnid>01</cUnid><tpMed>PESO BRUTO</tpMed><qCarga>1000.0000</qCarga></infQ>\r
        </infCarga>\r
        <infDoc>\r
          <infNFe><chave>42261040057895000115550010000004561876543219</chave></infNFe>\r
        </infDoc>\r
        <infModal versaoModal="4.00">\r
          <rodo><RNTRC>12345678</RNTRC></rodo>\r
        </infModal>\r
      </infCTeNorm>\r
    </infCte>\r
    <infCTeSupl>\r
      <qrCodCTe>https://dfe-portal.svrs.rs.gov.br/cte/qrCode?chCTe=42261011222333000181570010000071141123456788&amp;tpAmb=2</qrCodCTe>\r
    </infCTeSupl>\r
    <Signature xmlns="http://www.w3.org/2000/09/xmldsig#"><SignedInfo><CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/><SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/><Reference URI="#CTe42261011222333000181570010000071141123456788"><Transforms><Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/><Transform Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/></Transforms><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/><DigestValue>AAAAAAAAAAAAAAAAAAAAAAAAAAA=</DigestValue></Reference></SignedInfo><SignatureValue>AAAA</SignatureValue><KeyInfo><X509Data><X509Certificate>AAAA</X509Certificate></X509Data></KeyInfo></Signature>\r
  </CTe>\r
  <protCTe versao="4.00">\r
    <infProt>\r
      <tpAmb>2</tpAmb>\r
      <verAplic>EXEMPLO</verAplic>\r
      <chCTe>42261011222333000181570010000071141123456788</chCTe>\r
      <dhRecbto>2026-10-15T10:00:05-03:00</dhRecbto>\r
      <nProt>342260000000001</nProt>\r
      <digVal>AAAAAAAAAAAAAAAAAAAAAAAAAAA=</digVal>\r
      <cStat>100</cStat>\r
      <xMotivo>Autorizado o uso do CT-e</xMotivo>\r
    </infProt>\r
  </protCTe>\r
</cteProc>\r
`},{id:"aud-gabarito-235",empresa:"emp-demo-real",tipo:"nfe",entrada:"captura",mostra:"CAL-07, ICM-05, RTC-06",xml:`<?xml version="1.0" encoding="UTF-8"?>\r
<!-- NOTA DE DEMONSTRAÇÃO (fictícia, do CRIVO, ajustada para a demonstração do Jarvis). Sem valor fiscal. -->\r
<nfeProc xmlns="http://www.portalfiscal.inf.br/nfe" versao="4.00">\r
  <NFe>\r
    <infNFe Id="NFe42261011222333000181550010000071151123456788" versao="4.00">\r
      <ide>\r
        <cUF>42</cUF><cNF>12345678</cNF><natOp>Venda de produção do estabelecimento</natOp><mod>55</mod><serie>1</serie>\r
        <nNF>7115</nNF><dhEmi>2026-10-20T10:00:00-03:00</dhEmi><tpNF>1</tpNF><idDest>2</idDest><cMunFG>4208906</cMunFG>\r
        <tpImp>1</tpImp><tpEmis>1</tpEmis><cDV>8</cDV><tpAmb>1</tpAmb><finNFe>1</finNFe><indFinal>0</indFinal><indPres>9</indPres>\r
      </ide>\r
      <emit>\r
        <CNPJ>11222333000181</CNPJ><xNome>INDUSTRIA DEMONSTRACAO LTDA</xNome>\r
        <enderEmit><xLgr>Rua Exemplo</xLgr><nro>100</nro><xBairro>Centro</xBairro><cMun>4208906</cMun><xMun>Jaragua do Sul</xMun><UF>SC</UF></enderEmit>\r
        <IE>255555555</IE><CRT>3</CRT>\r
      </emit>\r
      <dest>\r
        <CNPJ>27182818000129</CNPJ><xNome>ZÊNITE DISTRIBUIDORA DE ALIMENTOS LTDA</xNome>\r
        <enderDest><xLgr>Av. Exemplo</xLgr><nro>200</nro><xBairro>Centro</xBairro><cMun>3550308</cMun><xMun>Sao Paulo</xMun><UF>SP</UF></enderDest>\r
        <indIEDest>1</indIEDest><IE>110042490114</IE>\r
      </dest>\r
      <det nItem="1">\r
        <prod>\r
          <cProd>MOT-5CV</cProd><cEAN>SEM GTIN</cEAN><xProd>Motor eletrico trifasico 5 CV</xProd><NCM>85015210</NCM><CFOP>6101</CFOP>\r
          <uCom>UN</uCom><qCom>2.0000</qCom><vUnCom>1500.0000000000</vUnCom><vProd>3000.00</vProd><indTot>1</indTot>\r
        </prod>\r
        <imposto>\r
          <ICMS><ICMS00><orig>0</orig><CST>00</CST><modBC>3</modBC><vBC>3000.00</vBC><pICMS>12.00</pICMS><vICMS>360.00</vICMS><pFCP>3.00</pFCP><vFCP>90.00</vFCP></ICMS00></ICMS>\r
          <IPI><cEnq>999</cEnq><IPITrib><CST>50</CST><vBC>3000.00</vBC><pIPI>5.00</pIPI><vIPI>150.00</vIPI></IPITrib></IPI>\r
          <PIS><PISAliq><CST>01</CST><vBC>3000.00</vBC><pPIS>1.65</pPIS><vPIS>49.50</vPIS></PISAliq></PIS>\r
          <COFINS><COFINSAliq><CST>01</CST><vBC>3000.00</vBC><pCOFINS>7.60</pCOFINS><vCOFINS>228.00</vCOFINS></COFINSAliq></COFINS>\r
          <IBSCBS>\r
            <CST>000</CST><cClassTrib>000001</cClassTrib>\r
            <gIBSCBS>\r
              <vBC>2362.50</vBC>\r
              <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>2.36</vIBSUF></gIBSUF>\r
              <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>\r
              <vIBS>2.36</vIBS>\r
              <gCBS><pCBS>0.9000</pCBS><vCBS>21.26</vCBS></gCBS>\r
            </gIBSCBS>\r
          </IBSCBS>\r
        </imposto>\r
      </det>\r
      <det nItem="2">\r
        <prod>\r
          <cProd>PNL-01</cProd><cEAN>SEM GTIN</cEAN><xProd>Painel de comando</xProd><NCM>85371090</NCM><CFOP>6101</CFOP>\r
          <uCom>UN</uCom><qCom>1.0000</qCom><vUnCom>800.0000000000</vUnCom><vProd>800.00</vProd><indTot>1</indTot>\r
        </prod>\r
        <imposto>\r
          <ICMS><ICMS00><orig>0</orig><CST>00</CST><modBC>3</modBC><vBC>800.00</vBC><pICMS>12.00</pICMS><vICMS>96.00</vICMS></ICMS00></ICMS>\r
          <IPI><cEnq>999</cEnq><IPITrib><CST>50</CST><vBC>800.00</vBC><pIPI>5.00</pIPI><vIPI>40.00</vIPI></IPITrib></IPI>\r
          <PIS><PISAliq><CST>01</CST><vBC>800.00</vBC><pPIS>1.65</pPIS><vPIS>13.20</vPIS></PISAliq></PIS>\r
          <COFINS><COFINSAliq><CST>01</CST><vBC>800.00</vBC><pCOFINS>7.60</pCOFINS><vCOFINS>60.80</vCOFINS></COFINSAliq></COFINS>\r
          <IBSCBS>\r
            <CST>000</CST><cClassTrib>000001</cClassTrib>\r
            <gIBSCBS>\r
              <vBC>630.00</vBC>\r
              <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>0.63</vIBSUF></gIBSUF>\r
              <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>\r
              <vIBS>0.63</vIBS>\r
              <gCBS><pCBS>0.9000</pCBS><vCBS>5.67</vCBS></gCBS>\r
            </gIBSCBS>\r
          </IBSCBS>\r
        </imposto>\r
      </det>\r
      <total>\r
        <ICMSTot>\r
          <vBC>3800.00</vBC><vICMS>456.00</vICMS><vICMSDeson>0.00</vICMSDeson><vFCP>0.00</vFCP><vBCST>0.00</vBCST><vST>0.00</vST>\r
          <vFCPST>0.00</vFCPST><vFCPSTRet>0.00</vFCPSTRet><vProd>3800.00</vProd><vFrete>0.00</vFrete><vSeg>0.00</vSeg><vDesc>0.00</vDesc>\r
          <vII>0.00</vII><vIPI>190.00</vIPI><vIPIDevol>0.00</vIPIDevol><vPIS>62.70</vPIS><vCOFINS>288.80</vCOFINS><vOutro>0.00</vOutro><vNF>3990.00</vNF>\r
        </ICMSTot>\r
        <IBSCBSTot>\r
          <vBCIBSCBS>2992.50</vBCIBSCBS>\r
          <gIBS><gIBSUF><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSUF>2.99</vIBSUF></gIBSUF><gIBSMun><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSMun>0.00</vIBSMun></gIBSMun><vIBS>2.99</vIBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gIBS>\r
          <gCBS><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vCBS>26.93</vCBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gCBS>\r
        </IBSCBSTot>\r
      </total>\r
    </infNFe>\r
  </NFe>\r
  <protNFe versao="4.00">\r
    <infProt><tpAmb>1</tpAmb><verAplic>DEMO</verAplic><chNFe>42261011222333000181550010000071151123456788</chNFe><dhRecbto>2026-10-20T10:00:05-03:00</dhRecbto><nProt>342260000000001</nProt><cStat>100</cStat><xMotivo>Autorizado o uso da NF-e</xMotivo></infProt>\r
  </protNFe>\r
</nfeProc>\r
`},{id:"aud-gabarito-252",empresa:"emp-demo-real",tipo:"nfe",entrada:"captura",mostra:"CAL-07, ICM-03, RTC-06",xml:`<?xml version="1.0" encoding="UTF-8"?>\r
<!-- NOTA DE DEMONSTRAÇÃO (fictícia, do CRIVO, ajustada para a demonstração do Jarvis). Sem valor fiscal. -->\r
<nfeProc xmlns="http://www.portalfiscal.inf.br/nfe" versao="4.00">\r
  <NFe>\r
    <infNFe Id="NFe42261011222333000181550010000071161123456785" versao="4.00">\r
      <ide>\r
        <cUF>42</cUF><cNF>12345678</cNF><natOp>Venda de produção do estabelecimento</natOp><mod>55</mod><serie>1</serie>\r
        <nNF>7116</nNF><dhEmi>2026-10-20T10:00:00-03:00</dhEmi><tpNF>1</tpNF><idDest>2</idDest><cMunFG>4208906</cMunFG>\r
        <tpImp>1</tpImp><tpEmis>1</tpEmis><cDV>5</cDV><tpAmb>1</tpAmb><finNFe>1</finNFe><indFinal>0</indFinal><indPres>9</indPres>\r
      </ide>\r
      <emit>\r
        <CNPJ>11222333000181</CNPJ><xNome>INDUSTRIA DEMONSTRACAO LTDA</xNome>\r
        <enderEmit><xLgr>Rua Exemplo</xLgr><nro>100</nro><xBairro>Centro</xBairro><cMun>4208906</cMun><xMun>Jaragua do Sul</xMun><UF>SC</UF></enderEmit>\r
        <IE>255555555</IE><CRT>3</CRT>\r
      </emit>\r
      <dest>\r
        <CNPJ>27182818000129</CNPJ><xNome>ZÊNITE DISTRIBUIDORA DE ALIMENTOS LTDA</xNome>\r
        <enderDest><xLgr>Av. Exemplo</xLgr><nro>200</nro><xBairro>Centro</xBairro><cMun>3550308</cMun><xMun>Sao Paulo</xMun><UF>SP</UF></enderDest>\r
        <indIEDest>1</indIEDest><IE>110042490114</IE>\r
      </dest>\r
      <det nItem="1">\r
        <prod>\r
          <cProd>MOT-5CV</cProd><cEAN>SEM GTIN</cEAN><xProd>Motor eletrico trifasico 5 CV</xProd><NCM>85015210</NCM><CFOP>6101</CFOP>\r
          <uCom>UN</uCom><qCom>2.0000</qCom><vUnCom>1500.0000000000</vUnCom><vProd>3000.00</vProd><indTot>1</indTot>\r
        </prod>\r
        <imposto>\r
          <ICMS><ICMS00><orig>0</orig><CST>00</CST><modBC>3</modBC><vBC>2900.00</vBC><pICMS>12.00</pICMS><vICMS>348.00</vICMS></ICMS00></ICMS>\r
          <IPI><cEnq>999</cEnq><IPITrib><CST>50</CST><vBC>3000.00</vBC><pIPI>5.00</pIPI><vIPI>150.00</vIPI></IPITrib></IPI>\r
          <PIS><PISAliq><CST>01</CST><vBC>3000.00</vBC><pPIS>1.65</pPIS><vPIS>49.50</vPIS></PISAliq></PIS>\r
          <COFINS><COFINSAliq><CST>01</CST><vBC>3000.00</vBC><pCOFINS>7.60</pCOFINS><vCOFINS>228.00</vCOFINS></COFINSAliq></COFINS>\r
          <IBSCBS>\r
            <CST>000</CST><cClassTrib>000001</cClassTrib>\r
            <gIBSCBS>\r
              <vBC>2362.50</vBC>\r
              <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>2.36</vIBSUF></gIBSUF>\r
              <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>\r
              <vIBS>2.36</vIBS>\r
              <gCBS><pCBS>0.9000</pCBS><vCBS>21.26</vCBS></gCBS>\r
            </gIBSCBS>\r
          </IBSCBS>\r
        </imposto>\r
      </det>\r
      <det nItem="2">\r
        <prod>\r
          <cProd>PNL-01</cProd><cEAN>SEM GTIN</cEAN><xProd>Painel de comando</xProd><NCM>85371090</NCM><CFOP>6101</CFOP>\r
          <uCom>UN</uCom><qCom>1.0000</qCom><vUnCom>800.0000000000</vUnCom><vProd>800.00</vProd><indTot>1</indTot>\r
        </prod>\r
        <imposto>\r
          <ICMS><ICMS00><orig>0</orig><CST>00</CST><modBC>3</modBC><vBC>800.00</vBC><pICMS>12.00</pICMS><vICMS>96.00</vICMS></ICMS00></ICMS>\r
          <IPI><cEnq>999</cEnq><IPITrib><CST>50</CST><vBC>800.00</vBC><pIPI>5.00</pIPI><vIPI>40.00</vIPI></IPITrib></IPI>\r
          <PIS><PISAliq><CST>01</CST><vBC>800.00</vBC><pPIS>1.65</pPIS><vPIS>13.20</vPIS></PISAliq></PIS>\r
          <COFINS><COFINSAliq><CST>01</CST><vBC>800.00</vBC><pCOFINS>7.60</pCOFINS><vCOFINS>60.80</vCOFINS></COFINSAliq></COFINS>\r
          <IBSCBS>\r
            <CST>000</CST><cClassTrib>000001</cClassTrib>\r
            <gIBSCBS>\r
              <vBC>630.00</vBC>\r
              <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>0.63</vIBSUF></gIBSUF>\r
              <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>\r
              <vIBS>0.63</vIBS>\r
              <gCBS><pCBS>0.9000</pCBS><vCBS>5.67</vCBS></gCBS>\r
            </gIBSCBS>\r
          </IBSCBS>\r
        </imposto>\r
      </det>\r
      <total>\r
        <ICMSTot>\r
          <vBC>3800.00</vBC><vICMS>456.00</vICMS><vICMSDeson>0.00</vICMSDeson><vFCP>0.00</vFCP><vBCST>0.00</vBCST><vST>0.00</vST>\r
          <vFCPST>0.00</vFCPST><vFCPSTRet>0.00</vFCPSTRet><vProd>3800.00</vProd><vFrete>0.00</vFrete><vSeg>0.00</vSeg><vDesc>0.00</vDesc>\r
          <vII>0.00</vII><vIPI>190.00</vIPI><vIPIDevol>0.00</vIPIDevol><vPIS>62.70</vPIS><vCOFINS>288.80</vCOFINS><vOutro>0.00</vOutro><vNF>3990.00</vNF>\r
        </ICMSTot>\r
        <IBSCBSTot>\r
          <vBCIBSCBS>2992.50</vBCIBSCBS>\r
          <gIBS><gIBSUF><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSUF>2.99</vIBSUF></gIBSUF><gIBSMun><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSMun>0.00</vIBSMun></gIBSMun><vIBS>2.99</vIBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gIBS>\r
          <gCBS><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vCBS>26.93</vCBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gCBS>\r
        </IBSCBSTot>\r
      </total>\r
    </infNFe>\r
  </NFe>\r
  <protNFe versao="4.00">\r
    <infProt><tpAmb>1</tpAmb><verAplic>DEMO</verAplic><chNFe>42261011222333000181550010000071161123456785</chNFe><dhRecbto>2026-10-20T10:00:05-03:00</dhRecbto><nProt>342260000000001</nProt><cStat>100</cStat><xMotivo>Autorizado o uso da NF-e</xMotivo></infProt>\r
  </protNFe>\r
</nfeProc>\r
`},{id:"aud-gabarito-38",empresa:"emp-demo-real",tipo:"nfe",entrada:"captura",mostra:"RTC-05, RTC-10, RTC-11",xml:`<?xml version="1.0" encoding="UTF-8"?>\r
<!-- NOTA DE DEMONSTRAÇÃO (fictícia, do CRIVO, ajustada para a demonstração do Jarvis). Sem valor fiscal. -->\r
<nfeProc xmlns="http://www.portalfiscal.inf.br/nfe" versao="4.00">\r
  <NFe>\r
    <infNFe Id="NFe42261011222333000181550010000071171123456782" versao="4.00">\r
      <ide>\r
        <cUF>42</cUF><cNF>12345678</cNF><natOp>Venda de produção do estabelecimento</natOp><mod>55</mod><serie>1</serie>\r
        <nNF>7117</nNF><dhEmi>2026-10-20T10:00:00-03:00</dhEmi><tpNF>1</tpNF><idDest>2</idDest><cMunFG>4208906</cMunFG>\r
        <tpImp>1</tpImp><tpEmis>1</tpEmis><cDV>2</cDV><tpAmb>1</tpAmb><finNFe>1</finNFe><indFinal>0</indFinal><indPres>9</indPres>\r
      </ide>\r
      <emit>\r
        <CNPJ>11222333000181</CNPJ><xNome>INDUSTRIA DEMONSTRACAO LTDA</xNome>\r
        <enderEmit><xLgr>Rua Exemplo</xLgr><nro>100</nro><xBairro>Centro</xBairro><cMun>4208906</cMun><xMun>Jaragua do Sul</xMun><UF>SC</UF></enderEmit>\r
        <IE>255555555</IE><CRT>3</CRT>\r
      </emit>\r
      <dest>\r
        <CNPJ>27182818000129</CNPJ><xNome>ZÊNITE DISTRIBUIDORA DE ALIMENTOS LTDA</xNome>\r
        <enderDest><xLgr>Av. Exemplo</xLgr><nro>200</nro><xBairro>Centro</xBairro><cMun>3550308</cMun><xMun>Sao Paulo</xMun><UF>SP</UF></enderDest>\r
        <indIEDest>1</indIEDest><IE>110042490114</IE>\r
      </dest>\r
      <det nItem="1">\r
        <prod>\r
          <cProd>MOT-5CV</cProd><cEAN>SEM GTIN</cEAN><xProd>Motor eletrico trifasico 5 CV</xProd><NCM>85015210</NCM><CFOP>6101</CFOP>\r
          <uCom>UN</uCom><qCom>2.0000</qCom><vUnCom>1500.0000000000</vUnCom><vProd>3000.00</vProd><indTot>1</indTot>\r
        </prod>\r
        <imposto>\r
          <ICMS><ICMS00><orig>0</orig><CST>00</CST><modBC>3</modBC><vBC>3000.00</vBC><pICMS>12.00</pICMS><vICMS>360.00</vICMS></ICMS00></ICMS>\r
          <IPI><cEnq>999</cEnq><IPITrib><CST>50</CST><vBC>3000.00</vBC><pIPI>5.00</pIPI><vIPI>150.00</vIPI></IPITrib></IPI>\r
          <PIS><PISAliq><CST>01</CST><vBC>3000.00</vBC><pPIS>1.65</pPIS><vPIS>49.50</vPIS></PISAliq></PIS>\r
          <COFINS><COFINSAliq><CST>01</CST><vBC>3000.00</vBC><pCOFINS>7.60</pCOFINS><vCOFINS>228.00</vCOFINS></COFINSAliq></COFINS>\r
          <IBSCBS>\r
            <CST>000</CST><cClassTrib>000001</cClassTrib>\r
            <gIBSCBS>\r
              <vBC>2362.50</vBC>\r
              <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>2.36</vIBSUF></gIBSUF>\r
              <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>\r
              <vIBS>2.36</vIBS>\r
              <gCBS><pCBS>0.9000</pCBS><gRed><pRedAliq>60.0000</pRedAliq><pAliqEfet>0.3600</pAliqEfet></gRed><vCBS>8.51</vCBS></gCBS>\r
            </gIBSCBS>\r
          </IBSCBS>\r
        </imposto>\r
      </det>\r
      <det nItem="2">\r
        <prod>\r
          <cProd>PNL-01</cProd><cEAN>SEM GTIN</cEAN><xProd>Painel de comando</xProd><NCM>85371090</NCM><CFOP>6101</CFOP>\r
          <uCom>UN</uCom><qCom>1.0000</qCom><vUnCom>800.0000000000</vUnCom><vProd>800.00</vProd><indTot>1</indTot>\r
        </prod>\r
        <imposto>\r
          <ICMS><ICMS00><orig>0</orig><CST>00</CST><modBC>3</modBC><vBC>800.00</vBC><pICMS>12.00</pICMS><vICMS>96.00</vICMS></ICMS00></ICMS>\r
          <IPI><cEnq>999</cEnq><IPITrib><CST>50</CST><vBC>800.00</vBC><pIPI>5.00</pIPI><vIPI>40.00</vIPI></IPITrib></IPI>\r
          <PIS><PISAliq><CST>01</CST><vBC>800.00</vBC><pPIS>1.65</pPIS><vPIS>13.20</vPIS></PISAliq></PIS>\r
          <COFINS><COFINSAliq><CST>01</CST><vBC>800.00</vBC><pCOFINS>7.60</pCOFINS><vCOFINS>60.80</vCOFINS></COFINSAliq></COFINS>\r
          <IBSCBS>\r
            <CST>000</CST><cClassTrib>000001</cClassTrib>\r
            <gIBSCBS>\r
              <vBC>630.00</vBC>\r
              <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>0.63</vIBSUF></gIBSUF>\r
              <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>\r
              <vIBS>0.63</vIBS>\r
              <gCBS><pCBS>0.9000</pCBS><vCBS>5.67</vCBS></gCBS>\r
            </gIBSCBS>\r
          </IBSCBS>\r
        </imposto>\r
      </det>\r
      <total>\r
        <ICMSTot>\r
          <vBC>3800.00</vBC><vICMS>456.00</vICMS><vICMSDeson>0.00</vICMSDeson><vFCP>0.00</vFCP><vBCST>0.00</vBCST><vST>0.00</vST>\r
          <vFCPST>0.00</vFCPST><vFCPSTRet>0.00</vFCPSTRet><vProd>3800.00</vProd><vFrete>0.00</vFrete><vSeg>0.00</vSeg><vDesc>0.00</vDesc>\r
          <vII>0.00</vII><vIPI>190.00</vIPI><vIPIDevol>0.00</vIPIDevol><vPIS>62.70</vPIS><vCOFINS>288.80</vCOFINS><vOutro>0.00</vOutro><vNF>3990.00</vNF>\r
        </ICMSTot>\r
        <IBSCBSTot>\r
          <vBCIBSCBS>2992.50</vBCIBSCBS>\r
          <gIBS><gIBSUF><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSUF>2.99</vIBSUF></gIBSUF><gIBSMun><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSMun>0.00</vIBSMun></gIBSMun><vIBS>2.99</vIBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gIBS>\r
          <gCBS><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vCBS>26.93</vCBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gCBS>\r
        </IBSCBSTot>\r
      </total>\r
    </infNFe>\r
  </NFe>\r
  <protNFe versao="4.00">\r
    <infProt><tpAmb>1</tpAmb><verAplic>DEMO</verAplic><chNFe>42261011222333000181550010000071171123456782</chNFe><dhRecbto>2026-10-20T10:00:05-03:00</dhRecbto><nProt>342260000000001</nProt><cStat>100</cStat><xMotivo>Autorizado o uso da NF-e</xMotivo></infProt>\r
  </protNFe>\r
</nfeProc>\r
`},{id:"aud-gabarito-65",empresa:"emp-demo-real",tipo:"nfe",entrada:"captura",mostra:"RTC-01 e RTC-05",xml:`<?xml version="1.0" encoding="UTF-8"?>\r
<!-- NOTA DE DEMONSTRAÇÃO (fictícia, do CRIVO, ajustada para a demonstração do Jarvis). Sem valor fiscal. -->\r
<nfeProc xmlns="http://www.portalfiscal.inf.br/nfe" versao="4.00">\r
  <NFe>\r
    <infNFe Id="NFe42261011222333000181550010000071181123456780" versao="4.00">\r
      <ide>\r
        <cUF>42</cUF><cNF>12345678</cNF><natOp>Venda de produção do estabelecimento</natOp><mod>55</mod><serie>1</serie>\r
        <nNF>7118</nNF><dhEmi>2026-10-20T10:00:00-03:00</dhEmi><tpNF>1</tpNF><idDest>2</idDest><cMunFG>4208906</cMunFG>\r
        <tpImp>1</tpImp><tpEmis>1</tpEmis><cDV>0</cDV><tpAmb>1</tpAmb><finNFe>1</finNFe><indFinal>0</indFinal><indPres>9</indPres>\r
      </ide>\r
      <emit>\r
        <CNPJ>11222333000181</CNPJ><xNome>INDUSTRIA DEMONSTRACAO LTDA</xNome>\r
        <enderEmit><xLgr>Rua Exemplo</xLgr><nro>100</nro><xBairro>Centro</xBairro><cMun>4208906</cMun><xMun>Jaragua do Sul</xMun><UF>SC</UF></enderEmit>\r
        <IE>255555555</IE><CRT>3</CRT>\r
      </emit>\r
      <dest>\r
        <CNPJ>27182818000129</CNPJ><xNome>ZÊNITE DISTRIBUIDORA DE ALIMENTOS LTDA</xNome>\r
        <enderDest><xLgr>Av. Exemplo</xLgr><nro>200</nro><xBairro>Centro</xBairro><cMun>3550308</cMun><xMun>Sao Paulo</xMun><UF>SP</UF></enderDest>\r
        <indIEDest>1</indIEDest><IE>110042490114</IE>\r
      </dest>\r
      <det nItem="1">\r
        <prod>\r
          <cProd>MOT-5CV</cProd><cEAN>SEM GTIN</cEAN><xProd>Motor eletrico trifasico 5 CV</xProd><NCM>85015210</NCM><CFOP>6101</CFOP>\r
          <uCom>UN</uCom><qCom>2.0000</qCom><vUnCom>1500.0000000000</vUnCom><vProd>3000.00</vProd><indTot>1</indTot>\r
        </prod>\r
        <imposto>\r
          <ICMS><ICMS00><orig>0</orig><CST>00</CST><modBC>3</modBC><vBC>3000.00</vBC><pICMS>12.00</pICMS><vICMS>360.00</vICMS></ICMS00></ICMS>\r
          <IPI><cEnq>999</cEnq><IPITrib><CST>50</CST><vBC>3000.00</vBC><pIPI>5.00</pIPI><vIPI>150.00</vIPI></IPITrib></IPI>\r
          <PIS><PISAliq><CST>01</CST><vBC>3000.00</vBC><pPIS>1.65</pPIS><vPIS>49.50</vPIS></PISAliq></PIS>\r
          <COFINS><COFINSAliq><CST>01</CST><vBC>3000.00</vBC><pCOFINS>7.60</pCOFINS><vCOFINS>228.00</vCOFINS></COFINSAliq></COFINS>\r
          \r
        </imposto>\r
      </det>\r
      <det nItem="2">\r
        <prod>\r
          <cProd>PNL-01</cProd><cEAN>SEM GTIN</cEAN><xProd>Painel de comando</xProd><NCM>85371090</NCM><CFOP>6101</CFOP>\r
          <uCom>UN</uCom><qCom>1.0000</qCom><vUnCom>800.0000000000</vUnCom><vProd>800.00</vProd><indTot>1</indTot>\r
        </prod>\r
        <imposto>\r
          <ICMS><ICMS00><orig>0</orig><CST>00</CST><modBC>3</modBC><vBC>800.00</vBC><pICMS>12.00</pICMS><vICMS>96.00</vICMS></ICMS00></ICMS>\r
          <IPI><cEnq>999</cEnq><IPITrib><CST>50</CST><vBC>800.00</vBC><pIPI>5.00</pIPI><vIPI>40.00</vIPI></IPITrib></IPI>\r
          <PIS><PISAliq><CST>01</CST><vBC>800.00</vBC><pPIS>1.65</pPIS><vPIS>13.20</vPIS></PISAliq></PIS>\r
          <COFINS><COFINSAliq><CST>01</CST><vBC>800.00</vBC><pCOFINS>7.60</pCOFINS><vCOFINS>60.80</vCOFINS></COFINSAliq></COFINS>\r
          <IBSCBS>\r
            <CST>000</CST><cClassTrib>000001</cClassTrib>\r
            <gIBSCBS>\r
              <vBC>630.00</vBC>\r
              <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>0.63</vIBSUF></gIBSUF>\r
              <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>\r
              <vIBS>0.63</vIBS>\r
              <gCBS><pCBS>0.9000</pCBS><vCBS>5.67</vCBS></gCBS>\r
            </gIBSCBS>\r
          </IBSCBS>\r
        </imposto>\r
      </det>\r
      <total>\r
        <ICMSTot>\r
          <vBC>3800.00</vBC><vICMS>456.00</vICMS><vICMSDeson>0.00</vICMSDeson><vFCP>0.00</vFCP><vBCST>0.00</vBCST><vST>0.00</vST>\r
          <vFCPST>0.00</vFCPST><vFCPSTRet>0.00</vFCPSTRet><vProd>3800.00</vProd><vFrete>0.00</vFrete><vSeg>0.00</vSeg><vDesc>0.00</vDesc>\r
          <vII>0.00</vII><vIPI>190.00</vIPI><vIPIDevol>0.00</vIPIDevol><vPIS>62.70</vPIS><vCOFINS>288.80</vCOFINS><vOutro>0.00</vOutro><vNF>3990.00</vNF>\r
        </ICMSTot>\r
        <IBSCBSTot>\r
          <vBCIBSCBS>2992.50</vBCIBSCBS>\r
          <gIBS><gIBSUF><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSUF>2.99</vIBSUF></gIBSUF><gIBSMun><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSMun>0.00</vIBSMun></gIBSMun><vIBS>2.99</vIBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gIBS>\r
          <gCBS><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vCBS>26.93</vCBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gCBS>\r
        </IBSCBSTot>\r
      </total>\r
    </infNFe>\r
  </NFe>\r
  <protNFe versao="4.00">\r
    <infProt><tpAmb>1</tpAmb><verAplic>DEMO</verAplic><chNFe>42261011222333000181550010000071181123456780</chNFe><dhRecbto>2026-10-20T10:00:05-03:00</dhRecbto><nProt>342260000000001</nProt><cStat>100</cStat><xMotivo>Autorizado o uso da NF-e</xMotivo></infProt>\r
  </protNFe>\r
</nfeProc>\r
`},{id:"aud-gabarito-23",empresa:"emp-demo-real",tipo:"cte",entrada:"captura",mostra:"CT-e: CTE-37, CTE-08, CTE-34, CTE-35",xml:`<?xml version="1.0" encoding="UTF-8"?>\r
\r
<cteProc xmlns="http://www.portalfiscal.inf.br/cte" versao="4.00">\r
  <CTe>\r
    <infCte versao="4.00" Id="CTe42261011222333000181570010000071191123456784">\r
      <ide>\r
        <cUF>42</cUF>\r
        <cCT>12345678</cCT>\r
        <CFOP>6353</CFOP>\r
        <natOp>PRESTACAO DE SERVICO DE TRANSPORTE</natOp>\r
        <mod>57</mod>\r
        <serie>1</serie>\r
        <nCT>7119</nCT>\r
        <dhEmi>2027-02-15T10:00:00-03:00</dhEmi>\r
        <tpImp>1</tpImp>\r
        <tpEmis>1</tpEmis>\r
        <cDV>4</cDV>\r
        <tpAmb>2</tpAmb>\r
        <tpCTe>0</tpCTe>\r
        <procEmi>0</procEmi>\r
        <verProc>EXEMPLO1</verProc>\r
        <cMunEnv>4205407</cMunEnv>\r
        <xMunEnv>FLORIANOPOLIS</xMunEnv>\r
        <UFEnv>SC</UFEnv>\r
        <modal>01</modal>\r
        <tpServ>0</tpServ>\r
        <cMunIni>4205407</cMunIni>\r
        <xMunIni>FLORIANOPOLIS</xMunIni>\r
        <UFIni>SC</UFIni>\r
        <cMunFim>4106902</cMunFim>\r
        <xMunFim>CURITIBA</xMunFim>\r
        <UFFim>PR</UFFim>\r
        <retira>1</retira>\r
        <indIEToma>1</indIEToma>\r
        <toma3><toma>0</toma></toma3>\r
      </ide>\r
      <emit>\r
        <CNPJ>11222333000181</CNPJ>\r
        <IE>123456789</IE>\r
        <xNome>TRANSPORTADORA EXEMPLO LTDA</xNome>\r
        <enderEmit>\r
          <xLgr>RUA FICTICIA</xLgr><nro>100</nro><xBairro>CENTRO</xBairro>\r
          <cMun>4205407</cMun><xMun>FLORIANOPOLIS</xMun><CEP>88010000</CEP><UF>SC</UF>\r
        </enderEmit>\r
        <CRT>3</CRT>\r
      </emit>\r
      <rem>\r
        <CNPJ>27182818000129</CNPJ>\r
        <IE>987654321</IE>\r
        <xNome>ZÊNITE DISTRIBUIDORA DE ALIMENTOS LTDA</xNome>\r
        <enderReme>\r
          <xLgr>AV FICTICIA</xLgr><nro>200</nro><xBairro>CENTRO</xBairro>\r
          <cMun>4205407</cMun><xMun>FLORIANOPOLIS</xMun><CEP>88015000</CEP><UF>SC</UF>\r
        </enderReme>\r
      </rem>\r
      <dest>\r
        <CPF>11144477735</CPF>\r
        <xNome>CTE EMITIDO EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL</xNome>\r
        <enderDest>\r
          <xLgr>RUA EXEMPLO</xLgr><nro>300</nro><xBairro>CENTRO</xBairro>\r
          <cMun>4106902</cMun><xMun>CURITIBA</xMun><CEP>80010000</CEP><UF>PR</UF>\r
        </enderDest>\r
      </dest>\r
      <vPrest>\r
        <vTPrest>1000.00</vTPrest>\r
        <vRec>1000.00</vRec>\r
        <Comp><xNome>FRETE PESO</xNome><vComp>900.00</vComp></Comp>\r
        <Comp><xNome>PEDAGIO</xNome><vComp>100.00</vComp></Comp>\r
      </vPrest>\r
      <imp>\r
        <ICMS>\r
          <ICMS00><CST>00</CST><vBC>1000.00</vBC><pICMS>12.00</pICMS><vICMS>120.00</vICMS></ICMS00>\r
        </ICMS>\r
        <IBSCBS>\r
          <CST>000</CST>\r
          <cClassTrib>000001</cClassTrib>\r
          <gIBSCBS>\r
            <vBC>1000.00</vBC>\r
            <gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>0.88</vIBSUF></gIBSUF>\r
            <gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun>\r
            <vIBS>0.88</vIBS>\r
            <gCBS><pCBS>0.9000</pCBS><vCBS>7.92</vCBS></gCBS>\r
          </gIBSCBS>\r
        </IBSCBS>\r
        <vTotDFe>1000.00</vTotDFe>\r
      </imp>\r
      <infCTeNorm>\r
        <infCarga>\r
          <vCarga>50000.00</vCarga>\r
          <proPred>PECAS</proPred>\r
          <infQ><cUnid>01</cUnid><tpMed>PESO BRUTO</tpMed><qCarga>1000.0000</qCarga></infQ>\r
        </infCarga>\r
        <infDoc>\r
          <infNFe><chave>42261027182818000129550010000004561876543219</chave></infNFe>\r
        </infDoc>\r
        <infModal versaoModal="4.00">\r
          <rodo><RNTRC>12345678</RNTRC></rodo>\r
        </infModal>\r
      </infCTeNorm>\r
    </infCte>\r
    <infCTeSupl>\r
      <qrCodCTe>https://dfe-portal.svrs.rs.gov.br/cte/qrCode?chCTe=42261011222333000181570010000071191123456784&amp;tpAmb=2</qrCodCTe>\r
    </infCTeSupl>\r
    <Signature xmlns="http://www.w3.org/2000/09/xmldsig#"><SignedInfo><CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/><SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/><Reference URI="#CTe42261011222333000181570010000071191123456784"><Transforms><Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/><Transform Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/></Transforms><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/><DigestValue>AAAAAAAAAAAAAAAAAAAAAAAAAAA=</DigestValue></Reference></SignedInfo><SignatureValue>AAAA</SignatureValue><KeyInfo><X509Data><X509Certificate>AAAA</X509Certificate></X509Data></KeyInfo></Signature>\r
  </CTe>\r
  <protCTe versao="4.00">\r
    <infProt>\r
      <tpAmb>2</tpAmb>\r
      <verAplic>EXEMPLO</verAplic>\r
      <chCTe>42261011222333000181570010000071191123456784</chCTe>\r
      <dhRecbto>2026-10-15T10:00:05-03:00</dhRecbto>\r
      <nProt>342260000000001</nProt>\r
      <digVal>AAAAAAAAAAAAAAAAAAAAAAAAAAA=</digVal>\r
      <cStat>100</cStat>\r
      <xMotivo>Autorizado o uso do CT-e</xMotivo>\r
    </infProt>\r
  </protCTe>\r
</cteProc>\r
`}];
