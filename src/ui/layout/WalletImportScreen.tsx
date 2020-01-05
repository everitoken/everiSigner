import * as React from 'react'
import styled from 'styled-components'
import CheckCircle from '@material-ui/icons/CheckCircle'

import { NavigationLayout } from '../presentational/MainLayout'
import ConnectedNavigationBackButton from './NavigationButtons'
import FlexContainer from '../presentational/FlexContainer'
import { RootRef } from '@material-ui/core'
import { useDropzone } from 'react-dropzone'
import InfoArea from '../presentational/InfoArea'
import labels from '../../labels'

const DropZoneContainer = styled.div`
  width: 100%;
  padding: 32px 0;
  text-align: center;
  border: 5px #ececec dashed;
  box-sizing: border-box;
  background-color: ${({ isDragActive }: { isDragActive: boolean }) =>
    `rgba(236, 236, 236, ${isDragActive ? '0.4' : '0.8'})`};
`

function PaperDropzone() {
  const [fileContent, setFileContent] = React.useState<string | null>(null)
  const onDrop = React.useCallback(acceptedFiles => {
    const reader = new FileReader()

    reader.onabort = () => alert(labels.IMPORT_WALLET_FAILED)
    reader.onerror = () => alert(labels.IMPORT_WALLET_FAILED)
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result
      setFileContent(String(binaryStr))
    }

    acceptedFiles.forEach((file: any) => reader.readAsBinaryString(file))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  const { ref, ...rootProps } = getRootProps()

  return (
    <RootRef rootRef={ref}>
      <div
        {...rootProps}
        style={{ padding: '8px', width: 'calc(100% - 16px)' }}
      >
        <input {...getInputProps()} />
        <DropZoneContainer isDragActive={isDragActive}>
          {fileContent ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CheckCircle color="primary" />
              <p style={{ paddingLeft: '5px' }}>
                {labels.WALLET_BACKUP_FILE_LOADED}
              </p>
            </div>
          ) : (
            <p>{isDragActive ? labels.FILE_DETECTED : labels.SELECT_OR_DND}</p>
          )}
        </DropZoneContainer>
      </div>
    </RootRef>
  )
}

export default function WalletImportScreen() {
  return (
    <NavigationLayout
      title="导入钱包"
      renderLeft={() => <ConnectedNavigationBackButton />}
    >
      <FlexContainer>
        <div style={{ width: '100%' }}>
          <InfoArea>
            <p style={{ padding: 8 }}>{labels.ACCOUNT_SIGN_DESCRIPTION}</p>
          </InfoArea>
        </div>
        <PaperDropzone />
      </FlexContainer>
    </NavigationLayout>
  )
}
