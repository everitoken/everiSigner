import * as React from 'react'
import styled from 'styled-components'
import * as style from '../../style'

const Footer = styled.p`
  font-size: 10px;
  text-align: center;
  margin: 0;
  margin-bottom: ${style.padding.standard / 4}px;
`

export default () => <Footer>© 2019 everiToken public chain (EVT)</Footer>
