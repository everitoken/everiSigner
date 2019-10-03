import * as React from 'react'
import { NFTType } from '../../types'
import { ListItem, List, IconButton, CircularProgress } from '@material-ui/core'
import ExpandMore from '@material-ui/icons/ExpandMore'
import FlexContainer from './FlexContainer'
import InViewDetailLayout from './InViewDetailLayout'

export type PropTypes = {
  data: NFTType[]
  fetching: boolean
}

function NFTList(props: PropTypes) {
  const [selectedNft, setSelectedNft] = React.useState<NFTType | null>(null)

  const handleExpandMore = (selectedNft: NFTType) => {
    setSelectedNft(selectedNft)
  }

  const { fetching, data } = props

  if (fetching) {
    return (
      <FlexContainer
        alignItems="center"
        justifyContent="center"
        alignSelf="stretch"
      >
        <CircularProgress disableShrink />
      </FlexContainer>
    )
  }

  if (!fetching && data.length === 0) {
    return (
      <FlexContainer alignItems="center" justifyContent="center">
        <p>No domain tokens</p>
      </FlexContainer>
    )
  }

  return (
    <InViewDetailLayout
      title="NFT Detail"
      renderDetail={() => {
        if (!selectedNft) {
          return <p>No NFT is selected</p>
        }
        return (
          <iframe
            style={{ width: '400px', height: '100%', border: 'none' }}
            src={`https://evtscan.io/domain/${selectedNft.domain}`}
          />
        )
      }}
    >
      {({ showDetail }) => (
        <List style={{ width: '100%', padding: 0 }}>
          {data.map(nft => (
            <ListItem
              style={{ padding: '0 0 0 16px' }}
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
                    handleExpandMore(nft)
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

export default NFTList
