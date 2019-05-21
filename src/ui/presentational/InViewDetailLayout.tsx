import * as React from 'react'
import { NFTType } from '../../types'
import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import FlexContainer from './FlexContainer'
import styled from 'styled-components'
import { APP_BAR_HEIGHT } from '../../style'
import { HeaderTitle } from './MainLayout'

const Overlay = styled.div`
  display: ${(props: { open: boolean }) => (props.open ? 'block' : 'none')};
  position: absolute;
  background-color: white;
  z-index: 1;
  width: 100%;
  height: 100%;
`

type PropTypes = {
  children: ({ showDetail }: { showDetail: () => void }) => React.ReactNode
  detailTitle: string
  renderDetail: ({
    closeDetail,
  }: {
    closeDetail: () => void
  }) => React.ReactNode
}

type StateProps = {
  detailAreaOpen: boolean
}

class NFTList extends React.PureComponent<PropTypes, StateProps> {
  state = {
    detailAreaOpen: false,
  }

  handleDetailShow = () => {
    this.setState({ detailAreaOpen: true })
  }

  handleDetailClose = () => {
    this.setState({ detailAreaOpen: false })
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <Overlay open={this.state.detailAreaOpen}>
          <div
            style={{
              height: APP_BAR_HEIGHT,
              display: 'flex',
              alignContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <HeaderTitle title={this.props.detailTitle} />
            <IconButton onClick={this.handleDetailClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <FlexContainer>
            {this.props.renderDetail({ closeDetail: this.handleDetailClose })}
          </FlexContainer>
          <div style={{ position: 'absolute', top: 0, right: 0 }} />
        </Overlay>
        {this.props.children({ showDetail: this.handleDetailShow })}
      </div>
    )
  }
}

export default NFTList
