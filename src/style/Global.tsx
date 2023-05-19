import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from 'jetswap-uikit-new/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme { }
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }

  .cDZLbJ {
    background: #1d173c !important;
  }
  
  .ixBJwu {
    background-color: #17132b !important;
  }

  .dHMCVW {
    background-color: #17132b !important;
}
  body {
    background-color: #17132B;

    img {
      height: auto;
      max-width: 100%;
    }
    .kNFHwG {
      position: fixed;
      top: 0;
      left: 0;
      -webkit-transition: top 0.2s;
      transition: top 0.2s;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -webkit-justify-content: space-between;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      padding-left: 8px;
      padding-right: 16px;
      width: 100%;
      height: 64px;
      background-color: #17132b !important;
      border-bottom: solid 2px rgba(133,133,133,0.1);
      z-index: 20;
      -webkit-transform: translate3d(0,0,0);
      -ms-transform: translate3d(0,0,0);
      transform: translate3d(0,0,0);
  }
  .ivRoHn {
    background-color: #0b0a1e !important;
}

.hgguQO {
  background-color: #0b0a1e !important;
}

.iROhbT {
  background-color: #0b0a1e !important;
}

.fqaFGU {
  box-shadow: inset 4px 0px 0px #7058da !important;
}

.bDUpZr {
  border-color: #1D173C !important;
  color: #1D173C !important;
}

.doBDFB {
  background-color: #1D173C !important;
}

.evLxHx {
  background-color: #0b0a1e !important;
}

.dhLmza {
  color: #0b0a1e !important;
}

.fqaFGU:hover {
  background-color: #1d173c !important;
}
.cDxYsn:hover {
  background-color: #1d173c !important;
}

.cLaSHU {
  background-color: #7058da !important;
}

.fMuapt {
  background-color: #1d173c !important;
}
.hwQKHW:hover {
  background-color: #0b0e23 !important;
}
.hwQKHW {
  background-color: #17132b !important;
}
.gRvJDz {
  filter: drop-shadow(rgba(25, 19, 38, 0.15) 0px 1px 4px);
  width: 100%;
  background: #17132b !important;
  border-radius: 16px;
  margin: 16px 0px;
}

  }
`

export default GlobalStyle
