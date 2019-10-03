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


function Transition(props: any) {
  return <Slide direction="up" {...props} />
}

function NFTList(props: PropTypes) {
  const [detailAreaOpen, setDetailAreaOpen] = React.useState(false)

  const handleDetailShow = () => {
    setDetailAreaOpen(true)
  }

  const handleDetailClose = () => {
    setDetailAreaOpen(false)
  }

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={detailAreaOpen}
        onClose={handleDetailClose}
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
          <HeaderTitle title={props.title} />
          <IconButton onClick={handleDetailClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <FlexContainer>
          {props.renderDetail({ closeDetail: handleDetailClose })}
        </FlexContainer>
      </Dialog>
      {props.children({ showDetail: handleDetailShow })}
    </React.Fragment>
  )
}

export default NFTList
