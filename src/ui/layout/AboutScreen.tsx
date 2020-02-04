import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { NavigationLayout } from '../presentational/MainLayout'
import ConnectedNavigationBackButton from './NavigationButtons'
import FlexContainer from '../presentational/FlexContainer'
import Logo from '../presentational/Logo'
import styled from 'styled-components'

const Version = styled.p`
  text-align: center;
  font-family: monospace;
  font-size: 18px;
  color: grey;
  margin-bottom: 2rem;
`
function About() {
  const { t } = useTranslation()
  return (
    <NavigationLayout
      title={t('ABOUT_TITLE')}
      renderLeft={() => <ConnectedNavigationBackButton />}
    >
      <FlexContainer justifyContent="flex-start">
        <div style={{ padding: '2.5rem' }}>
          <Logo />
          <Version>Version: 1.0.0</Version>
          <h2>
            Decentralized signature, identity and authentication system for
            everiToken
          </h2>
          <h3>Find us at:</h3>
          <p></p>
          <ul>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/everitoken/everiSigner"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://everitoken.io"
              >
                everiToken
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://coinmarketcap.com/currencies/everitoken/"
              >
                CoinMarketCap
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://t.me/everitoken"
              >
                Telegram
              </a>
            </li>
          </ul>
        </div>
      </FlexContainer>
    </NavigationLayout>
  )
}

export default About
