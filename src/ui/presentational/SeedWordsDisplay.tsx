import * as React from 'react'
import Chip from '@material-ui/core/Chip'
import styled from 'styled-components'

const SeedListContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
`

export type PropTypes = {
  words: string
}

function SeedWordsDisplay(props: PropTypes) {
  return (
    <SeedListContainer>
      {props.words.split(' ').map((word, i) => (
        <li key={word} style={{ margin: '0 3px 3px 0' }}>
          <Chip
            label={`${i + 1} ${word}`}
            style={{ fontFamily: 'Roboto Mono' }}
          />
        </li>
      ))}
    </SeedListContainer>
  )
}

export default SeedWordsDisplay
