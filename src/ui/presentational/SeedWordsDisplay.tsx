import * as React from 'react'
import Chip from '@material-ui/core/Chip'
import styled from 'styled-components'

const SeedListContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`

export type PropTypes = {
  words: string
}

class SeedWordsDisplay extends React.PureComponent<PropTypes> {
  render() {
    const { props } = this

    return (
      <SeedListContainer>
        {props.words.split(' ').map((word, i) => (
          <li key={word} style={{ margin: 3 }}>
            <Chip label={`${i + 1}. ${word}`} />
          </li>
        ))}
      </SeedListContainer>
    )
  }
}
export default SeedWordsDisplay
