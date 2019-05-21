import * as React from 'react'
import { NFTType } from '../../types'
import { ListItem, List, IconButton } from '@material-ui/core'
import ExpandMore from '@material-ui/icons/ExpandMore'
import InViewDetailLayout from './InViewDetailLayout'
import FlexContainer from './FlexContainer'
import styled from 'styled-components'
import { get } from 'lodash'

type PropTypes = {
  data: NFTType[]
  fetching: boolean
}

type StateProps = {
  selectedNft: NFTType | null
}

class NFTList extends React.PureComponent<PropTypes, StateProps> {
  state = {
    selectedNft: null,
  }
  handleExpandMore = (selectedNft: NFTType) => {
    this.setState({ selectedNft })
  }

  render() {
    return (
      <InViewDetailLayout
        detailTitle="NFT detail"
        renderDetail={() => (
          <p>{get(this.state.selectedNft, 'name', 'noname')}</p>
        )}
      >
        {({ showDetail }) => (
          <List disablePadding>
            {this.props.data.map((nft, i) => (
              <ListItem
                style={{ padding: '0 8px' }}
                divider={i !== this.props.data.length - 1}
                key={`${nft.domain}-${nft.name}`}
              >
                <FlexContainer
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <FlexContainer
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <div className="everitoken-mono">{nft.domain}</div>
                    <div className="everitoken-mono">{nft.name}</div>
                  </FlexContainer>
                  <IconButton
                    onClick={() => {
                      this.handleExpandMore(nft)
                      showDetail()
                    }}
                  >
                    <ExpandMore />
                  </IconButton>
                </FlexContainer>
              </ListItem>
            ))}
          </List>
        )}
      </InViewDetailLayout>
    )
  }
}

export default NFTList
