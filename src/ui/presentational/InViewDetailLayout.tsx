import * as React from 'react'
import { IconButton, Slide, Dialog } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import FlexContainer from './FlexContainer'
import { APP_BAR_HEIGHT } from '../../style'
import { HeaderTitle } from './MainLayout'

type PropTypes = {
  children: ({ showDetail }: { showDetail: () => void }) => React.ReactNode
  title: string
  renderDetail: ({
    closeDetail,
  }: {
    closeDetail: () => void
  }) => React.ReactNode
}

type StateProps = {
  detailAreaOpen: boolean
}

function Transition(props: any) {
  return <Slide direction="up" {...props} />
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
      <React.Fragment>
        <Dialog
          fullScreen
          open={this.state.detailAreaOpen}
          onClose={this.handleDetailClose}
          TransitionComponent={Transition}
        >
          <div
            style={{
              height: APP_BAR_HEIGHT,
              display: 'flex',
              alignContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <HeaderTitle title={this.props.title} />
            <IconButton onClick={this.handleDetailClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <FlexContainer>
            {this.props.renderDetail({ closeDetail: this.handleDetailClose })}
          </FlexContainer>
        </Dialog>
        {this.props.children({ showDetail: this.handleDetailShow })}
      </React.Fragment>
    )
  }
}

export default NFTList
