import * as React from 'react'

import { storiesOf } from '@storybook/react'
import MainLayout, {
  HeaderTitle,
  TopActionBar,
  NavigationLayout,
} from '../src/ui/presentational/MainLayout'
import Container from '../src/ui/presentational/Container'
import NetworkSelect from '../src/ui/presentational/NetworkSelect'
import { IconButton } from '@material-ui/core'
import BackIcon from '@material-ui/icons/ArrowBack'
import CloseIcon from '@material-ui/icons/Close'
import ScreenHeader from '../src/ui/presentational/ScreenHeader'
import BottomButtonGroup from '../src/ui/presentational/BottomButtonGroup'
import FlexContainer from '../src/ui/presentational/FlexContainer'
import PopupLayout from '../src/ui/presentational/PopupLayout'
import labels from '../src/labels'

storiesOf('Layout', module).add('with text header', () => (
  <Container>
    <MainLayout renderHead={() => <HeaderTitle title="Main layout head" />}>
      <p>Body</p>
    </MainLayout>
  </Container>
))

storiesOf('Layout', module).add('navigation layout in main layout', () => (
  <Container>
    <MainLayout renderHead={() => <HeaderTitle title="Main layout head" />}>
      <NavigationLayout
        renderLeft={() => (
          <IconButton>
            <BackIcon fontSize="large" />
          </IconButton>
        )}
        renderRight={() => (
          <IconButton>
            <CloseIcon fontSize="large" />
          </IconButton>
        )}
        title="设置钱包"
      >
        content of navigation layout
      </NavigationLayout>
    </MainLayout>
  </Container>
))

const network1 = {
  name: 'mainnet1',
  url: 'https://mainnet1.everitoken.io/',
  location: 'Hong Kong',
  isProduction: true,
  isCustom: false,
}

const network2 = {
  name: 'mainnet2',
  url: 'https://mainnet2.everitoken.io/',
  location: 'California',
  isProduction: true,
  isCustom: false,
}

const network3 = {
  name: 'mainnet3',
  url: 'https://mainnet3.everitoken.io/',
  location: 'Tokyo',
  isProduction: true,
  isCustom: false,
}

const network4 = {
  name: 'mainnet4',
  url: 'https://mainnet4.everitoken.io/',
  location: 'Frankfurt',
  isProduction: true,
  isCustom: false,
}
const network5 = {
  name: 'mainnet5',
  url: 'https://mainnet5.everitoken.io/',
  location: 'Seoul',
  isProduction: true,
  isCustom: false,
}
const network6 = {
  name: 'mainnet6',
  url: 'https://mainnet6.everitoken.io/',
  location: 'Brazil',
  isProduction: true,
  isCustom: false,
}

const networks = [network1, network2, network3, network4, network5, network6]
storiesOf('Layout', module).add('main header', () => (
  <Container>
    <MainLayout
      renderHead={() => (
        <TopActionBar
          onLogoClick={() => null}
          onMoreClick={() => null}
          renderMiddle={() => (
            <NetworkSelect
              selected={network1}
              onSelect={() => null}
              networks={networks}
            />
          )}
        />
      )}
    >
      <p>Body</p>
    </MainLayout>
  </Container>
))

storiesOf('Layout', module).add('window', () => (
  <Container>
    <PopupLayout
      title="Connect Request"
      bottomButtonGroup={
        <BottomButtonGroup
          onPrimaryButtonClick={() => alert('primary')}
          onSecondaryButtonClick={() => alert('secondary')}
          primaryButtonText={labels.AUTHORIZE_BUTTON_TEXT}
          secondaryButtonText={labels.CANCEL_BUTTON_TEXT}
        />
      }
    >
      <p>whatnot</p>
    </PopupLayout>
  </Container>
))
